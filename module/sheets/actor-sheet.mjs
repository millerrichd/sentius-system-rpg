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
    html.on('change', '.training-select-actionspell', this._onTrainingSelectActionSpell.bind(this));
    html.on('change', '.training-select-powerspell', this._onTrainingSelectPowerSpell.bind(this));
    html.on('change', '.training-select-targetspell', this._onTrainingSelectTargetSpell.bind(this));
    // Checkmark for Session tickMark
    html.on('click', '.checkbox-selected', this._onTickMark.bind(this));
    // Pool increase/decrease.
    html.on('click', '.increase-pool', this._onIncreasePool.bind(this));
    html.on('click', '.decrease-pool', this._onDecreasePool.bind(this));
    // RADIO BOXES OF SPELLS
    // ACTIONS
    html.on('change', '.radio-selected-action', this._onSpellEnergyActionRadio.bind(this));
    html.on('change', '.radio-selected-armor-ar', this._onArmorARRadio.bind(this));
    html.on('change', '.radio-selected-armor-at', this._onArmorATRadio.bind(this));
    html.on('change', '.radio-selected-armor-ad', this._onArmorADRadio.bind(this));
    html.on('change', '.radio-selected-create-cs', this._onCreateCSRadio.bind(this));
    html.on('change', '.radio-selected-create-cn', this._onCreateCNRadio.bind(this));
    html.on('change', '.radio-selected-create-cd', this._onCreateCDRadio.bind(this));
    html.on('change', '.radio-selected-destroy-dn', this._onDestroyDNRadio.bind(this));
    html.on('change', '.radio-selected-destroy-dt', this._onDestroyDTRadio.bind(this));
    html.on('change', '.radio-selected-destroy-dr', this._onDestroyDRRadio.bind(this));
    html.on('change', '.radio-selected-repair-rn', this._onRepairHLRadio.bind(this));
    html.on('change', '.radio-selected-shield-sr', this._onShieldSRRadio.bind(this));
    html.on('change', '.radio-selected-shield-sd', this._onShieldSDRadio.bind(this));
    html.on('change', '.radio-selected-transform-ts', this._onTransformTSRadio.bind(this));
    html.on('change', '.radio-selected-transform-td', this._onTransformTDRadio.bind(this));
    html.on('change', '.radio-selected-banish-br', this._onBanishBRRadio.bind(this));
    html.on('change', '.radio-selected-banish-bs', this._onBanishBSRadio.bind(this));
    html.on('change', '.radio-selected-control-cr', this._onControlCRRadio.bind(this));
    html.on('change', '.radio-selected-control-cd', this._onControlCDRadio.bind(this));
    html.on('change', '.radio-selected-summon-ss', this._onSummonSSRadio.bind(this));
    html.on('change', '.radio-selected-summon-sn', this._onSummonSNRadio.bind(this));
    html.on('change', '.radio-selected-summon-sd', this._onSummonSDRadio.bind(this));
    html.on('change', '.radio-selected-summon-sdd', this._onSummonSDDRadio.bind(this));

    // POWERS
    html.on('change', '.radio-selected-power', this._onSpellEnergyPowerRadio.bind(this));
    html.on('change', '.radio-selected-air-ad', this._onAirADRadio.bind(this));
    html.on('change', '.radio-selected-animal-as', this._onAnimalASRadio.bind(this));
    html.on('change', '.radio-selected-animal-ad', this._onAnimalADRadio.bind(this));
    html.on('change', '.radio-selected-dark-df', this._onDarkDFRadio.bind(this));
    html.on('change', '.radio-selected-dark-dd', this._onDarkDDRadio.bind(this));
    html.on('change', '.radio-selected-earth-ed', this._onEarthEDRadio.bind(this));
    html.on('change', '.radio-selected-fire-fd', this._onFireFDRadio.bind(this));
    html.on('change', '.radio-selected-force-fd', this._onForceFDRadio.bind(this));
    html.on('change', '.radio-selected-light-lf', this._onLightLFRadio.bind(this));
    html.on('change', '.radio-selected-light-ld', this._onLightLDRadio.bind(this));
    html.on('change', '.radio-selected-plant-ps', this._onPlantPSRadio.bind(this));
    html.on('change', '.radio-selected-plant-pd', this._onPlantPDRadio.bind(this));
    html.on('change', '.radio-selected-water-wd', this._onWaterWDRadio.bind(this));
    html.on('change', '.radio-selected-ash-ad', this._onAshADRadio.bind(this));
    html.on('change', '.radio-selected-ash-ac', this._onAshACRadio.bind(this));
    html.on('change', '.radio-selected-fissure-fd', this._onFissureFDRadio.bind(this));
    html.on('change', '.radio-selected-fissure-fw', this._onFissureFWRadio.bind(this));
    html.on('change', '.radio-selected-lava-lw', this._onLavaLWRadio.bind(this));
    html.on('change', '.radio-selected-lava-ld', this._onLavaLDRadio.bind(this));
    html.on('change', '.radio-selected-mist-md', this._onMistMDRadio.bind(this));
    html.on('change', '.radio-selected-mist-mc', this._onMistMCRadio.bind(this));
    html.on('change', '.radio-selected-mud-md', this._onMudMDRadio.bind(this));
    html.on('change', '.radio-selected-mud-mr', this._onMudMRRadio.bind(this));
    html.on('change', '.radio-selected-steam-sd', this._onSteamSDRadio.bind(this));
    html.on('change', '.radio-selected-steam-sc', this._onSteamSCRadio.bind(this));
    html.on('change', '.radio-selected-angelic-ad', this._onAngelicADRadio.bind(this));
    html.on('change', '.radio-selected-demonic-dd', this._onDemonicDDRadio.bind(this));
    html.on('change', '.radio-selected-spirit-sd', this._onSpiritSDRadio.bind(this));

    // TARGETS
    html.on('change', '.radio-selected-target', this._onSpellEnergyTargetRadio.bind(this));
    html.on('change', '.radio-selected-it-it', this._onItITRadio.bind(this));
    html.on('change', '.radio-selected-me-mt', this._onMeMTRadio.bind(this));
    html.on('change', '.radio-selected-them-tt', this._onThemTTRadio.bind(this));
    html.on('change', '.radio-selected-there-tt', this._onThereTTRadio.bind(this));
    html.on('change', '.radio-selected-you-yt', this._onYouYTRadio.bind(this));
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
    const cyberMod = actorData.abilities[ability].cyberMod;
    let newDie = '';
    let newBonus = 0;
    if(currentDie === 'd12') { 
      newDie = 'd10';
      newBonus = 2 + hindranceMod + traitMod + cyberMod;
    } else if(currentDie === 'd10') {
      newDie = 'd8';
      newBonus = 4 + hindranceMod + traitMod + cyberMod;
    } else if(currentDie === 'd8') {
      newDie = 'd6';
      newBonus = 6 + hindranceMod + traitMod + cyberMod;
    } else if(currentDie === 'd6') {
      newDie = 'd4';
      newBonus = 8 + hindranceMod + traitMod + cyberMod;
    } else if(currentDie === 'd4') {
      newDie = 'd2';
      newBonus = 10 + hindranceMod + traitMod + cyberMod;
    } else if(currentDie === 'd2') {
      newDie = 'd2';
      newBonus = 10 + hindranceMod + traitMod + cyberMod;
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
    const cyberMod = actorData.abilities[ability].cyberMod;
    let newDie = '';
    let newBonus = 0;
    if(currentDie === 'd2') { 
      newDie = 'd4';
      newBonus = 8 + hindranceMod + traitMod + cyberMod;
    } else if(currentDie === 'd4') {
      newDie = 'd6';
      newBonus = 6 + hindranceMod + traitMod + cyberMod;
    } else if(currentDie === 'd6') {
      newDie = 'd8';
      newBonus = 4 + hindranceMod + traitMod + cyberMod;
    } else if(currentDie === 'd8') {
      newDie = 'd10';
      newBonus = 2 + hindranceMod + traitMod + cyberMod;
    } else if(currentDie === 'd10') {
      newDie = 'd12';
      newBonus = 0 + hindranceMod + traitMod + cyberMod;
    } else if(currentDie === 'd12') {
      newDie = 'd12';
      newBonus = 0 + hindranceMod + traitMod + cyberMod;
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
    console.log("Current Skill", currentSkill);

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

    const totalBase = bonusBase + currentSkill.hindranceMod + currentSkill.traitMod;
    const totalUp = bonusUp + currentSkill.hindranceMod + currentSkill.traitMod;
    const totalDown = bonusDown + currentSkill.hindranceMod + currentSkill.traitMod;

    await this.actor.update({
      [`system.skills.${skill}.trainingStatus`]: newTrainingStatus,
      [`system.skills.${skill}.dieBase`]: dieBase,
      [`system.skills.${skill}.dieUp`]: dieUp,
      [`system.skills.${skill}.dieDown`]: dieDown,
      [`system.skills.${skill}.bonusBase`]: bonusBase,
      [`system.skills.${skill}.bonusUp`]: bonusUp,
      [`system.skills.${skill}.bonusDown`]: bonusDown,
      [`system.skills.${skill}.totalBase`]: totalBase,
      [`system.skills.${skill}.totalUp`]: totalUp,
      [`system.skills.${skill}.totalDown`]: totalDown,
      [`system.skills.${skill}.isNegBase`]: (totalBase < 0),
      [`system.skills.${skill}.isNegUp`]: (totalUp < 0),
      [`system.skills.${skill}.isNegDown`]: (totalDown < 0)

    });
  }

  async _onTrainingSelectActionSpell(event) {
    event.preventDefault();
    console.log("Training Select", event);
    const element = event.currentTarget;
    const spell = element.name;

    const newTrainingStatus = event.currentTarget.value;

    const actorData = this.actor.system;
    const currentSpell = actorData.spellActions[spell];
    console.log("Current Spell", currentSpell);

    let dieBase = '';
    let dieUp = '';
    let dieDown = '';
    let bonusBase = 0;
    let bonusUp = 0;
    let bonusDown = 0;

    if(newTrainingStatus === currentSpell.trainingStatus) return;
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

    const totalBase = bonusBase + currentSpell.hindranceMod + currentSpell.traitMod;
    const totalUp = bonusUp + currentSpell.hindranceMod + currentSpell.traitMod;
    const totalDown = bonusDown + currentSpell.hindranceMod + currentSpell.traitMod;

    await this.actor.update({
      [`system.spellActions.${spell}.trainingStatus`]: newTrainingStatus,
      [`system.spellActions.${spell}.dieBase`]: dieBase,
      [`system.spellActions.${spell}.dieUp`]: dieUp,
      [`system.spellActions.${spell}.dieDown`]: dieDown,
      [`system.spellActions.${spell}.bonusBase`]: bonusBase,
      [`system.spellActions.${spell}.bonusUp`]: bonusUp,
      [`system.spellActions.${spell}.bonusDown`]: bonusDown,
      [`system.spellActions.${spell}.totalBase`]: totalBase,
      [`system.spellActions.${spell}.totalUp`]: totalUp,
      [`system.spellActions.${spell}.totalDown`]: totalDown,
      [`system.spellActions.${spell}.isNegBase`]: (totalBase < 0),
      [`system.spellActions.${spell}.isNegUp`]: (totalUp < 0),
      [`system.spellActions.${spell}.isNegDown`]: (totalDown < 0)
    });
  }

  async _onTrainingSelectPowerSpell(event) {
    event.preventDefault();
    console.log("Training Select", event);
    const element = event.currentTarget;
    const spell = element.name;

    const newTrainingStatus = event.currentTarget.value;

    const actorData = this.actor.system;
    const currentSpell = actorData.spellPowers[spell];
    console.log("Current Spell", currentSpell);

    let dieBase = '';
    let dieUp = '';
    let dieDown = '';
    let bonusBase = 0;
    let bonusUp = 0;
    let bonusDown = 0;

    if(newTrainingStatus === currentSpell.trainingStatus) return;
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

    const totalBase = bonusBase + currentSpell.hindranceMod + currentSpell.traitMod;
    const totalUp = bonusUp + currentSpell.hindranceMod + currentSpell.traitMod;
    const totalDown = bonusDown + currentSpell.hindranceMod + currentSpell.traitMod;

    await this.actor.update({
      [`system.spellPowers.${spell}.trainingStatus`]: newTrainingStatus,
      [`system.spellPowers.${spell}.dieBase`]: dieBase,
      [`system.spellPowers.${spell}.dieUp`]: dieUp,
      [`system.spellPowers.${spell}.dieDown`]: dieDown,
      [`system.spellPowers.${spell}.bonusBase`]: bonusBase,
      [`system.spellPowers.${spell}.bonusUp`]: bonusUp,
      [`system.spellPowers.${spell}.bonusDown`]: bonusDown,
      [`system.spellPowers.${spell}.totalBase`]: totalBase,
      [`system.spellPowers.${spell}.totalUp`]: totalUp,
      [`system.spellPowers.${spell}.totalDown`]: totalDown,
      [`system.spellPowers.${spell}.isNegBase`]: (totalBase < 0),
      [`system.spellPowers.${spell}.isNegUp`]: (totalUp < 0),
      [`system.spellPowers.${spell}.isNegDown`]: (totalDown < 0)
    });
  }

  async _onTrainingSelectTargetSpell(event) {
    event.preventDefault();
    console.log("Training Select", event);
    const element = event.currentTarget;
    const spell = element.name;

    const newTrainingStatus = event.currentTarget.value;

    const actorData = this.actor.system;
    const currentSpell = actorData.spellTargets[spell];
    console.log("Current Spell", currentSpell);

    let dieBase = '';
    let dieUp = '';
    let dieDown = '';
    let bonusBase = 0;
    let bonusUp = 0;
    let bonusDown = 0;

    if(newTrainingStatus === currentSpell.trainingStatus) return;
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

    const totalBase = bonusBase + currentSpell.hindranceMod + currentSpell.traitMod;
    const totalUp = bonusUp + currentSpell.hindranceMod + currentSpell.traitMod;
    const totalDown = bonusDown + currentSpell.hindranceMod + currentSpell.traitMod;

    await this.actor.update({
      [`system.spellTargets.${spell}.trainingStatus`]: newTrainingStatus,
      [`system.spellTargets.${spell}.dieBase`]: dieBase,
      [`system.spellTargets.${spell}.dieUp`]: dieUp,
      [`system.spellTargets.${spell}.dieDown`]: dieDown,
      [`system.spellTargets.${spell}.bonusBase`]: bonusBase,
      [`system.spellTargets.${spell}.bonusUp`]: bonusUp,
      [`system.spellTargets.${spell}.bonusDown`]: bonusDown,
      [`system.spellTargets.${spell}.totalBase`]: totalBase,
      [`system.spellTargets.${spell}.totalUp`]: totalUp,
      [`system.spellTargets.${spell}.totalDown`]: totalDown,
      [`system.spellTargets.${spell}.isNegBase`]: (totalBase < 0),
      [`system.spellTargets.${spell}.isNegUp`]: (totalUp < 0),
      [`system.spellTargets.${spell}.isNegDown`]: (totalDown < 0)
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

  //affect the current healing pools.
  async _onIncreasePool(event) {
    event.preventDefault();
    const abilityName = event.currentTarget.dataset.ability;
    const abilityData = this.actor.system.derivedAbilitiesPool[abilityName];

    const mapping = {
      'd12': 12,
      'd10': 10,
      'd8': 8,
      'd6': 6,
      'd4': 4,
      'd2': 2,
      'd1': 1,
      'd0': 0
    }

    let newCurrent = 'd0';
    if(mapping[abilityData.current] < mapping[abilityData.value] && abilityData.current === 'd0') {
      newCurrent = 'd1';
    } else if(mapping[abilityData.current] < mapping[abilityData.value] && abilityData.current === 'd1') {
      newCurrent = 'd2';
    } else if(mapping[abilityData.current] < mapping[abilityData.value] && abilityData.current === 'd2') {
      newCurrent = 'd4';
    } else if(mapping[abilityData.current] < mapping[abilityData.value] && abilityData.current === 'd4') {
      newCurrent = 'd6';
    } else if(mapping[abilityData.current] < mapping[abilityData.value] && abilityData.current === 'd6') {
      newCurrent = 'd8';
    } else if(mapping[abilityData.current] < mapping[abilityData.value] && abilityData.current === 'd8') {
      newCurrent = 'd10';
    } else if(mapping[abilityData.current] < mapping[abilityData.value] && abilityData.current === 'd10') {
      newCurrent = 'd12';
    } else {
      newCurrent = abilityData.current; 
    }
    const result = await this.actor.update({
      [`system.derivedAbilitiesPool.${abilityName}.current`]: newCurrent
    });
  }
  
  async _onDecreasePool(event) {
    event.preventDefault();
    const abilityName = event.currentTarget.dataset.ability;
    const abilityData = this.actor.system.derivedAbilitiesPool[abilityName];
  
    let newCurrent = 'd12';
    if(abilityData.current === 'd12') {
      newCurrent = 'd10';
    } else if (abilityData.current === 'd10') {
      newCurrent = 'd8';
    } else if (abilityData.current === 'd8') {
      newCurrent = 'd6';
    } else if (abilityData.current === 'd6') {
      newCurrent = 'd4';
    } else if (abilityData.current === 'd4') {
      newCurrent = 'd2';
    } else if (abilityData.current === 'd2') {
      newCurrent = 'd1';
    } else {
      newCurrent = 'd0';
    }
    const result = await this.actor.update({
      [`system.derivedAbilitiesPool.${abilityName}.current`]: newCurrent
    });
  }

  async _onSpellEnergyActionRadio(event) {
    event.preventDefault();
    const data = event.currentTarget.dataset
    console.log("Spell Radio", event);
    console.log("DATA", data);
    console.log("Spell Radio", event.currentTarget.id);
    await this.actor.update({
      [`system.spellWordsCost.spellActionWord`]: data.label
    });
  }
  async _onSpellEnergyPowerRadio(event) {
    event.preventDefault();
    const data = event.currentTarget.dataset
    console.log("Spell Radio", event);
    console.log("DATA", data);
    console.log("Spell Radio", event.currentTarget.id);
    await this.actor.update({
      [`system.spellWordsCost.spellPowerWord`]: data.label
    });
  }
  async _onSpellEnergyTargetRadio(event) {
    event.preventDefault();
    const data = event.currentTarget.dataset
    console.log("Spell Radio", event);
    console.log("DATA", data);
    console.log("Spell Radio", event.currentTarget.id);
    await this.actor.update({
      [`system.spellWordsCost.spellTargetWord`]: data.label
    });
  }

  async _onArmorARRadio(event) {
    event.preventDefault();
    const data = event.currentTarget.dataset

    await this.actor.update({
      [`system.spellWordsCost.spellActionArmor.costArmorRating`]: data.cost,
    });
  }
  async _onArmorATRadio(event) {
    event.preventDefault();
    const data = event.currentTarget.dataset

    await this.actor.update({
      [`system.spellWordsCost.spellActionArmor.costArmorType`]: data.cost,
    });
  }
  async _onArmorADRadio(event) {
    event.preventDefault();
    const data = event.currentTarget.dataset
 
    await this.actor.update({
      [`system.spellWordsCost.spellActionArmor.costArmorDuration`]: data.cost,
    });
  }

  async _onCreateCSRadio(event) {
    event.preventDefault();
    const data = event.currentTarget.dataset

    await this.actor.update({
      [`system.spellWordsCost.spellActionCreate.costCreateSize`]: data.cost,
    });
  }
  async _onCreateCNRadio(event) {
    event.preventDefault();
    const data = event.currentTarget.dataset

    await this.actor.update({
      [`system.spellWordsCost.spellActionCreate.costCreateNumber`]: data.cost,
    });
  }
  async _onCreateCDRadio(event) {
    event.preventDefault();
    const data = event.currentTarget.dataset
 
    await this.actor.update({
      [`system.spellWordsCost.spellActionCreate.costCreateDuration`]: data.cost,
    });
  }

  async _onDestroyDNRadio(event) {
    event.preventDefault();
    const data = event.currentTarget.dataset
 
    await this.actor.update({
      [`system.spellWordsCost.spellActionDestroy.costDestroyNumber`]: data.cost,
    });

  }
  async _onDestroyDTRadio(event) {
    event.preventDefault();
    const data = event.currentTarget.dataset
 
    await this.actor.update({
      [`system.spellWordsCost.spellActionDestroy.costDestroyType`]: data.cost,
    });

  }
  async _onDestroyDRRadio(event) {
    event.preventDefault();
    const data = event.currentTarget.dataset
 
    await this.actor.update({
      [`system.spellWordsCost.spellActionDestroy.costDamageResistance`]: data.cost,
    });

  }

  async _onRepairHLRadio(event) {
    event.preventDefault();
    const data = event.currentTarget.dataset
 
    await this.actor.update({
      [`system.spellWordsCost.spellActionRepair.costRepairNumber`]: data.cost,
    });
  }

  async _onShieldSRRadio(event) {
    event.preventDefault();
    const data = event.currentTarget.dataset
 
    await this.actor.update({
      [`system.spellWordsCost.spellActionShield.costShieldResistance`]: data.cost,
    });
  }
  async _onShieldSDRadio(event) {
    event.preventDefault();
    const data = event.currentTarget.dataset
 
    await this.actor.update({
      [`system.spellWordsCost.spellActionShield.costShieldDuration`]: data.cost,
    });
  }

  async _onTransformTSRadio(event) {
    event.preventDefault();
    const data = event.currentTarget.dataset
 
    await this.actor.update({
      [`system.spellWordsCost.spellActionTransform.costTransformSize`]: data.cost,
    });
  }
  async _onTransformTDRadio(event) {
    event.preventDefault();
    const data = event.currentTarget.dataset
 
    await this.actor.update({
      [`system.spellWordsCost.spellActionTransform.costTransformDuration`]: data.cost,
    });
  }

  async _onBanishBRRadio(event) {
    event.preventDefault();
    const data = event.currentTarget.dataset
 
    await this.actor.update({
      [`system.spellWordsCost.spellActionBanish.costBanishResistance`]: data.cost,
    });
  }
  async _onBanishBSRadio(event) {
    event.preventDefault();
    const data = event.currentTarget.dataset
 
    await this.actor.update({
      [`system.spellWordsCost.spellActionBanish.costBanishSize`]: data.cost,
    });
  }

  async _onControlCRRadio(event) {
    event.preventDefault();
    const data = event.currentTarget.dataset
 
    await this.actor.update({
      [`system.spellWordsCost.spellActionControl.costControlResistance`]: data.cost,
    });
  }
  async _onControlCDRadio(event) {
    event.preventDefault();
    const data = event.currentTarget.dataset
 
    await this.actor.update({
      [`system.spellWordsCost.spellActionControl.costControlDuration`]: data.cost,
    });
  }

  async _onSummonSSRadio(event) {
    event.preventDefault();
    const data = event.currentTarget.dataset
 
    await this.actor.update({
      [`system.spellWordsCost.spellActionSummon.costSummonSize`]: data.cost,
    });
  }
  async _onSummonSNRadio(event) {
    event.preventDefault();
    const data = event.currentTarget.dataset
 
    await this.actor.update({
      [`system.spellWordsCost.spellActionSummon.costSummonNumber`]: data.cost,
    });
  }
  async _onSummonSDRadio(event) {
    event.preventDefault();
    const data = event.currentTarget.dataset
 
    await this.actor.update({
      [`system.spellWordsCost.spellActionSummon.costSummonDuration`]: data.cost,
    });
  }
  async _onSummonSDDRadio(event) {
    event.preventDefault();
    const data = event.currentTarget.dataset
 
    await this.actor.update({
      [`system.spellWordsCost.spellActionSummon.costSummonDisappears`]: data.cost,
    });
  }

  async _onAirADRadio(event) {
    event.preventDefault();
    const data = event.currentTarget.dataset
 
    await this.actor.update({
      [`system.spellWordsCost.spellPowerAir.costAirDamageDie`]: data.cost,
    });
  }

  async _onAnimalASRadio(event) {
    event.preventDefault();
    const data = event.currentTarget.dataset
 
    await this.actor.update({
      [`system.spellWordsCost.spellPowerAnimal.costAnimalShape`]: data.cost,
    });
  }
  async _onAnimalADRadio(event) {
    event.preventDefault();
    const data = event.currentTarget.dataset
 
    await this.actor.update({
      [`system.spellWordsCost.spellPowerAnimal.costAnimalDamageDie`]: data.cost,
    });
  }

  async _onDarkDFRadio(event) {
    event.preventDefault();
    const data = event.currentTarget.dataset
 
    await this.actor.update({
      [`system.spellWordsCost.spellPowerDark.costDarkFieldRange`]: data.cost,
    });
  }
  async _onDarkDDRadio(event) {
    event.preventDefault();
    const data = event.currentTarget.dataset
 
    await this.actor.update({
      [`system.spellWordsCost.spellPowerDark.costDarkDamageDie`]: data.cost,
    });
  }

  async _onEarthEDRadio(event) {
    event.preventDefault();
    const data = event.currentTarget.dataset
 
    await this.actor.update({
      [`system.spellWordsCost.spellPowerEarth.costEarthDamageDie`]: data.cost,
    });
  }

  async _onFireFDRadio(event) {
    event.preventDefault();
    const data = event.currentTarget.dataset
 
    await this.actor.update({
      [`system.spellWordsCost.spellPowerFire.costFireDamageDie`]: data.cost,
    });
  }

  async _onForceFDRadio(event) {
    event.preventDefault();
    const data = event.currentTarget.dataset
 
    await this.actor.update({
      [`system.spellWordsCost.spellPowerForce.costForceDamageDie`]: data.cost,
    });
  }

  async _onLightLFRadio(event) {
    event.preventDefault();
    const data = event.currentTarget.dataset
 
    await this.actor.update({
      [`system.spellWordsCost.spellPowerLight.costLightFieldRange`]: data.cost,
    });
  }
  async _onLightLDRadio(event) {
    event.preventDefault();
    const data = event.currentTarget.dataset
 
    await this.actor.update({
      [`system.spellWordsCost.spellPowerLight.costLightDamageDie`]: data.cost,
    });
  }

  async _onPlantPSRadio(event) {
    event.preventDefault();
    const data = event.currentTarget.dataset
 
    await this.actor.update({
      [`system.spellWordsCost.spellPowerPlant.costPlantShape`]: data.cost,
    });
  }
  async _onPlantPDRadio(event) {
    event.preventDefault();
    const data = event.currentTarget.dataset
 
    await this.actor.update({
      [`system.spellWordsCost.spellPowerPlant.costPlantDamageDie`]: data.cost,
    });
  }

  async _onWaterWDRadio(event) {
    event.preventDefault();
    const data = event.currentTarget.dataset
 
    await this.actor.update({
      [`system.spellWordsCost.spellPowerWater.costWaterDamageDie`]: data.cost,
    });
  }

  async _onAshADRadio(event) {
    event.preventDefault();
    const data = event.currentTarget.dataset
 
    await this.actor.update({
      [`system.spellWordsCost.spellPowerAsh.costAshDamageDie`]: data.cost,
    });
  }
  async _onAshACRadio(event) {
    event.preventDefault();
    const data = event.currentTarget.dataset
 
    await this.actor.update({
      [`system.spellWordsCost.spellPowerAsh.costAshCover`]: data.cost,
    });
  }

  async _onFissureFDRadio(event) {
    event.preventDefault();
    const data = event.currentTarget.dataset
 
    await this.actor.update({
      [`system.spellWordsCost.spellPowerFissure.costFissureDamageDie`]: data.cost,
    });
  }
  async _onFissureFWRadio(event) {
    event.preventDefault();
    const data = event.currentTarget.dataset
 
    await this.actor.update({
      [`system.spellWordsCost.spellPowerFissure.costFissureWeaken`]: data.cost,
    });
  }

  async _onLavaLWRadio(event) {
    event.preventDefault();
    const data = event.currentTarget.dataset
 
    await this.actor.update({
      [`system.spellWordsCost.spellPowerLava.costLavaWeaken`]: data.cost,
    });
  }
  async _onLavaLDRadio(event) {
    event.preventDefault();
    const data = event.currentTarget.dataset
 
    await this.actor.update({
      [`system.spellWordsCost.spellPowerLava.costLavaDamageDie`]: data.cost,
    });
  }

  async _onMistMDRadio(event) {
    event.preventDefault();
    const data = event.currentTarget.dataset
 
    await this.actor.update({
      [`system.spellWordsCost.spellPowerMist.costMistDamageDie`]: data.cost,
    });
  }
  async _onMistMCRadio(event) {
    event.preventDefault();
    const data = event.currentTarget.dataset
 
    await this.actor.update({
      [`system.spellWordsCost.spellPowerMist.costMistCover`]: data.cost,
    });
  }

  async _onMudMDRadio(event) {
    event.preventDefault();
    const data = event.currentTarget.dataset
 
    await this.actor.update({
      [`system.spellWordsCost.spellPowerMud.costMudDamageDie`]: data.cost,
    });
  }
  async _onMudMRRadio(event) {
    event.preventDefault();
    const data = event.currentTarget.dataset
 
    await this.actor.update({
      [`system.spellWordsCost.spellPowerMud.costMudReduceSpeed`]: data.cost,
    });
  }

  async _onSteamSDRadio(event) {
    event.preventDefault();
    const data = event.currentTarget.dataset
 
    await this.actor.update({
      [`system.spellWordsCost.spellPowerSteam.costSteamDamageDie`]: data.cost,
    });
  }
  async _onSteamSCRadio(event) {
    event.preventDefault();
    const data = event.currentTarget.dataset
 
    await this.actor.update({
      [`system.spellWordsCost.spellPowerSteam.costSteamCover`]: data.cost,
    });
  }

  async _onAngelicADRadio(event) {
    event.preventDefault();
    const data = event.currentTarget.dataset
 
    await this.actor.update({
      [`system.spellWordsCost.spellPowerAngelic.costAngelicDamageDie`]: data.cost,
    });
  }

  async _onDemonicDDRadio(event) {
    event.preventDefault();
    const data = event.currentTarget.dataset
 
    await this.actor.update({
      [`system.spellWordsCost.spellPowerDemonic.costDemonicDamageDie`]: data.cost,
    });
  }

  async _onSpiritSDRadio(event) {
    event.preventDefault();
    const data = event.currentTarget.dataset
 
    await this.actor.update({
      [`system.spellWordsCost.spellPowerSpirit.costSpiritDamageDie`]: data.cost,
    });
  }

  async _onItITRadio(event) {
    event.preventDefault();
    const data = event.currentTarget.dataset
 
    await this.actor.update({
      [`system.spellWordsCost.spellPowerIt.costItTarget`]: data.cost,
    });
  }
  async _onMeMTRadio(event) {
    event.preventDefault();
    const data = event.currentTarget.dataset
 
    await this.actor.update({
      [`system.spellWordsCost.spellPowerMe.costMeTarget`]: data.cost,
    });
  }
  async _onThemTTRadio(event) {
    event.preventDefault();
    const data = event.currentTarget.dataset
 
    await this.actor.update({
      [`system.spellWordsCost.spellPowerThem.costThemTarget`]: data.cost,
    });
  }
  async _onThereTTRadio(event) {
    event.preventDefault();
    const data = event.currentTarget.dataset
 
    await this.actor.update({
      [`system.spellWordsCost.spellPowerThere.costThereTarget`]: data.cost,
    });
  }
  async _onYouYTRadio(event) {
    event.preventDefault();
    const data = event.currentTarget.dataset
 
    await this.actor.update({
      [`system.spellWordsCost.spellPowerYou.costYouTarget`]: data.cost,
    });
  }

}