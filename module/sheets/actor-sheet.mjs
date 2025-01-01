import {
  onManageActiveEffect,
  prepareActiveEffectCategories,
} from '../helpers/effects.mjs';

/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class SentiusRPGActorSheet extends ActorSheet {
  /** @override */
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ['sentius-rpg', 'sheet', 'actor'],
      width: 800,
      height: 800,
      tabs: [
        {
          navSelector: '.sheet-tabs',
          contentSelector: '.sheet-body',
          initial: 'abilities'
        },
      ],
    });
  }

  /** @override */
  get template() {
    return `systems/sentius-rpg/templates/actor/actor-${this.actor.type}-sheet.hbs`;
  }

  /* -------------------------------------------- */

  /** @override */
  async getData() {
    // Retrieve the data structure from the base sheet. You can inspect or log
    // the context variable to see the structure, but some key properties for
    // sheets are the actor object, the data object, whether or not it's
    // editable, the items array, and the effects array.
    const context = super.getData();

    // Use a safe clone of the actor data for further operations.
    const actorData = this.document.toPlainObject();

    // Add the actor's data to context.data for easier access, as well as flags.
    context.system = actorData.system;
    context.flags = actorData.flags;

    // Adding a pointer to CONFIG.SENTIUS_RPG
    context.config = CONFIG.SENTIUS_RPG;

    // Prepare character data and items.
    if (actorData.type == 'character') {
      this._prepareItems(context);
      this._prepareCharacterData(context);
    }

    // Prepare NPC data and items.
    if (actorData.type == 'npc') {
      this._prepareItems(context);
    }

    // Enrich biography info for display
    // Enrichment turns text like `[[/r 1d20]]` into buttons
    context.enrichedBiography = await TextEditor.enrichHTML(
      this.actor.system.biography,
      {
        // Whether to show secret blocks in the finished html
        secrets: this.document.isOwner,
        // Necessary in v11, can be removed in v12
        async: true,
        // Data to fill in for inline rolls
        rollData: this.actor.getRollData(),
        // Relative UUID resolution
        relativeTo: this.actor,
      }
    );

    // Prepare active effects
    context.effects = prepareActiveEffectCategories(
      // A generator that returns all effects stored on the actor
      // as well as any items
      this.actor.allApplicableEffects()
    );

    return context;
  }

  /**
   * Character-specific context modifications
   *
   * @param {object} context The context object to mutate
   */
  _prepareCharacterData(context) {
    // This is where you can enrich character-specific editor fields
    // or setup anything else that's specific to this type
  }

  /**
   * Organize and classify Items for Actor sheets.
   *
   * @param {object} context The context object to mutate
   */
  _prepareItems(context) {
    // Initialize containers.
    const gear = [];
    const hindrances = [];
    const traits = [];
    const spells = {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
      6: [],
      7: [],
      8: [],
      9: [],
    };

    // Iterate through items, allocating to containers
    for (let i of context.items) {
      i.img = i.img || Item.DEFAULT_ICON;
      // Append to gear.
      if (i.type === 'item') {
        gear.push(i);
      }
      // Append to hindrances.
      else if (i.type === 'hindrance') {
        hindrances.push(i);
      }
      // Append to traits.
      else if (i.type === 'trait') {
        traits.push(i);
      }
      // Append to spells.
      else if (i.type === 'spell') {
        if (i.system.spellLevel != undefined) {
          spells[i.system.spellLevel].push(i);
        }
      }
    }

    // Assign and return
    context.gear = gear;
    context.hindrances = hindrances.sort((a, b) => a.name.localeCompare(b.name));
    context.traits = traits.sort((a, b) => a.name.localeCompare(b.name));
    context.spells = spells;
  }

  /* -------------------------------------------- */

  /** @override */
  activateListeners(html) {
    super.activateListeners(html);

    // Render the item sheet for viewing/editing prior to the editable check.
    html.on('click', '.item-edit', (ev) => {
      const li = $(ev.currentTarget).parents('.item');
      const item = this.actor.items.get(li.data('itemId'));
      item.sheet.render(true);
    });

    // -------------------------------------------------------------
    // Everything below here is only needed if the sheet is editable
    if (!this.isEditable) return;

    // Add Inventory Item
    html.on('click', '.item-create', this._onItemCreate.bind(this));

    // Delete Inventory Item
    html.on('click', '.item-delete', (ev) => {
      const li = $(ev.currentTarget).parents('.item');
      const item = this.actor.items.get(li.data('itemId'));
      console.log("THEITEM", item)
      console.log("THEITEMSACTOR", this.actor)

      /* THIS IS THE ONLY WAY I KNOW HOW TO RESET THE VALUES OF THE MODIFIERS */
      if (item.name === 'Cybernetic Acceptance') {
        this.actor.IncreaseStability = 0;
      }
      if (item.name === 'Cybernetic Rejection') {
        this.actor.DecreaseStability = 0;
      }
      
      item.delete();
      li.slideUp(200, () => this.render(false));
    });

    // Active Effect management
    html.on('click', '.effect-control', (ev) => {
      const row = ev.currentTarget.closest('li');
      const document =
        row.dataset.parentId === this.actor.id
          ? this.actor
          : this.actor.items.get(row.dataset.parentId);
      onManageActiveEffect(ev, document);
    });

    // Rollable abilities.
    html.on('click', '.rollable', this._onRoll.bind(this));

    // Drag events for macros.
    if (this.actor.isOwner) {
      let handler = (ev) => this._onDragStart(ev);
      html.find('li.item').each((i, li) => {
        if (li.classList.contains('inventory-header')) return;
        li.setAttribute('draggable', true);
        li.addEventListener('dragstart', handler, false);
      });
    }

    // Ability score increase/decrease.
    html.on('click', '.increase-ability', this._onIncreaseAbility.bind(this));
    html.on('click', '.decrease-ability', this._onDecreaseAbility.bind(this));
    // Training select for training status skills
    html.on('change', '.training-select', this._onTrainingSelect.bind(this));
    // Checkmark for Session tickMark
    html.on('click', '.checkbox-selected', this._onTickMark.bind(this));
  }

  /**
   * Handle creating a new Owned Item for the actor using initial data defined in the HTML dataset
   * @param {Event} event   The originating click event
   * @private
   */
  async _onItemCreate(event) {
    event.preventDefault();
    const header = event.currentTarget;
    // Get the type of item to create.
    const type = header.dataset.type;
    // Grab any data associated with this control.
    const data = duplicate(header.dataset);
    // Initialize a default name.
    const name = `New ${type.capitalize()}`;
    // Prepare the item object.
    const itemData = {
      name: name,
      type: type,
      system: data,
    };
    // Remove the type from the dataset since it's in the itemData.type prop.
    delete itemData.system['type'];

    // Finally, create the item!
    return await Item.create(itemData, { parent: this.actor });
  }

  /**
   * Handle clickable rolls.
   * @param {Event} event   The originating click event
   * @private
   */
  _onRoll(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const dataset = element.dataset;

    // Handle item rolls.
    if (dataset.rollType) {
      if (dataset.rollType == 'item') {
        const itemId = element.closest('.item').dataset.itemId;
        const item = this.actor.items.get(itemId);
        if (item) return item.roll();
      }
    }

    // Handle rolls that supply the formula directly.
    if (dataset.roll) {
      let label = dataset.label ? `[ability] ${dataset.label}` : '';
      let roll = new Roll(dataset.roll, this.actor.getRollData());
      roll.toMessage({
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor: label,
        rollMode: game.settings.get('core', 'rollMode'),
      });
      return roll;
    }
  }

  //this._onIncreaseAbility.bind(this)
  async _onIncreaseAbility(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const ability = element.dataset.ability;
    const actorData = this.actor.system;
    const currentDie = actorData.abilities[ability].die;
    const currentBonus = actorData.abilities[ability].bonus;
    const hindranceMod = actorData.abilities[ability].hindranceMod;
    const traitMod = actorData.abilities[ability].traitMod;
    let newDie = '';
    let newBonus = 0;
    if(currentDie === 'd12') { 
      newDie = 'd10';
      newBonus = 2 + hindranceMod + traitMod;
    } else if(currentDie === 'd10') {
      newDie = 'd8';
      newBonus = 4 + hindranceMod + traitMod;
    } else if(currentDie === 'd8') {
      newDie = 'd6';
      newBonus = 6 + hindranceMod + traitMod;
    } else if(currentDie === 'd6') {
      newDie = 'd4';
      newBonus = 8 + hindranceMod + traitMod;
    } else if(currentDie === 'd4') {
      newDie = 'd2';
      newBonus = 10 + hindranceMod + traitMod;
    } else if(currentDie === 'd2') {
      newDie = 'd2';
      newBonus = 10 + hindranceMod + traitMod;
    } else {
      newDie = currentDie;
      newBonus = currentBonus;
    }
    await this.actor.update({
      [`system.abilities.${ability}.die`]: newDie,
      [`system.abilities.${ability}.bonus`]: newBonus,
    });
  }

  //this._onDecreaseAbility.bind(this)
  async _onDecreaseAbility(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const ability = element.dataset.ability;
    const actorData = this.actor.system;
    const currentDie = actorData.abilities[ability].die;
    const currentBonus = actorData.abilities[ability].bonus;
    const hindranceMod = actorData.abilities[ability].hindranceMod;
    const traitMod = actorData.abilities[ability].traitMod;
    let newDie = '';
    let newBonus = 0;
    if(currentDie === 'd2') { 
      newDie = 'd4';
      newBonus = 8 + hindranceMod + traitMod;
    } else if(currentDie === 'd4') {
      newDie = 'd6';
      newBonus = 6 + hindranceMod + traitMod;
    } else if(currentDie === 'd6') {
      newDie = 'd8';
      newBonus = 4 + hindranceMod + traitMod;
    } else if(currentDie === 'd8') {
      newDie = 'd10';
      newBonus = 2 + hindranceMod + traitMod;
    } else if(currentDie === 'd10') {
      newDie = 'd12';
      newBonus = 0 + hindranceMod + traitMod;
    } else if(currentDie === 'd12') {
      newDie = 'd12';
      newBonus = 0 + hindranceMod + traitMod;
    } else {
      newDie = currentDie;
      newBonus = currentBonus;
    }
    await this.actor.update({
      [`system.abilities.${ability}.die`]: newDie,
      [`system.abilities.${ability}.bonus`]: newBonus,
    });
  }

  async _onTrainingSelect(event) {
    event.preventDefault();
    console.log("Training Select", event);
    const element = event.currentTarget;
    const skill = element.name;

    const newTrainingStatus = event.currentTarget.value;

    const actorData = this.actor.system;
    const currentSkill = actorData.skills[skill];

    let dieBase = '';
    let dieUp = '';
    let dieDown = '';
    let bonusBase = 0;
    let bonusUp = 0;
    let bonusDown = 0;

    if(newTrainingStatus === currentSkill.trainingStatus) return;
    if(newTrainingStatus === 'apprentice') {
      dieBase = 'd10';
      dieUp = 'd8';
      dieDown = 'd12';
      bonusBase = 2;
      bonusUp = 4;
      bonusDown = 0;
    } else if(newTrainingStatus === 'professional') {
      dieBase = 'd8';
      dieUp = 'd6';
      dieDown = 'd10';
      bonusBase = 4;
      bonusUp = 6;
      bonusDown = 2;
    } else if(newTrainingStatus === 'expert') {
      dieBase = 'd6';
      dieUp = 'd4';
      dieDown = 'd8';
      bonusBase = 6;
      bonusUp = 8;
      bonusDown = 4;
    } else if(newTrainingStatus === 'master') {
      dieBase = 'd4';
      dieUp = 'd2';
      dieDown = 'd6';
      bonusBase = 8;
      bonusUp = 10;
      bonusDown = 6;
    } else if(newTrainingStatus === 'legendary') {
      dieBase = 'd2';
      dieUp = 'd2';
      dieDown = 'd4';
      bonusBase = 10;
      bonusUp = 12;
      bonusDown = 8;
    } else {
      dieBase = 'd12';
      dieUp = 'd10';
      dieDown = 'd12';
      bonusBase = 0;
      bonusUp = 2;
      bonusDown = -2;
    }

    await this.actor.update({
      [`system.skills.${skill}.trainingStatus`]: newTrainingStatus,
      [`system.skills.${skill}.dieBase`]: dieBase,
      [`system.skills.${skill}.dieUp`]: dieUp,
      [`system.skills.${skill}.dieDown`]: dieDown,
      [`system.skills.${skill}.bonusBase`]: bonusBase,
      [`system.skills.${skill}.bonusUp`]: bonusUp,
      [`system.skills.${skill}.bonusDown`]: bonusDown
    });
  }

  async _onTickMark(event) {
    event.preventDefault();
    const element = event.currentTarget;
    const skill = element.name;

    const newTickMark = event.currentTarget.checked;

    await this.actor.update({
      [`system.skills.${skill}.tickMark`]: newTickMark
    });
  }
}
