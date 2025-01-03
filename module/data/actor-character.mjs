import SentiusRPGActorBase from "./base-actor.mjs";

export default class SentiusRPGCharacter extends SentiusRPGActorBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    schema.attributes = new fields.SchemaField({
      level: new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 1 })
      }),
    });

    // Iterate over ability names and create a new SchemaField for each.
    schema.abilities = new fields.SchemaField(Object.keys(CONFIG.SENTIUS_RPG.abilities).reduce((obj, ability) => {
      obj[ability] = new fields.SchemaField({
        die: new fields.StringField({ required: true, initial: "d10" }),
        bonus: new fields.NumberField({ ...requiredInteger, initial: 2, min: 0, max: 12}),
        hindranceMod: new fields.NumberField({ ...requiredInteger, initial: 0, min: -2, max: 0}),
        traitMod: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0, max: 2}),
        cyberMod: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0, max: 2}),
      });
      return obj;
    }, {}));

    // Iterate over derived ability names and create a new SchemaField for each.
    schema.derivedAbilitiesValue = new fields.SchemaField(Object.keys(CONFIG.SENTIUS_RPG.derivedAbilitiesValue).reduce((obj, ability) => {
      obj[ability] = new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 2, min: 0, max: 12})
      });
      return obj;
    }, {}));

    // Iterate over derived ability names and create a new SchemaField for each.
    schema.derivedAbilitiesPool = new fields.SchemaField(Object.keys(CONFIG.SENTIUS_RPG.derivedAbilitiesPool).reduce((obj, ability) => {
      obj[ability] = new fields.SchemaField({
        value: new fields.StringField({ required: true, initial: "d4" }),
        current: new fields.StringField({ required: true, initial: "" })
      });
      return obj;
    }, {}));

    // Iterate over skill names and create a new SchemaField for each.
    schema.skills = new fields.SchemaField(Object.keys(CONFIG.SENTIUS_RPG.skills).reduce((obj, skill) => {
      let attr1 = 'agi';
      let attr2 = 'qui';
      if (skill === 'animalhandling') {
        attr1 = 'agi';
        attr2 = 'qui';
      } else if (skill === 'athletics') {
        attr1 = 'agi';
        attr2 = 'str';
      } else if (skill === 'combatfire') {
        attr1 = 'agi';
        attr2 = 'int';
      } else if (skill === 'combatgunnery') {
        attr1 = 'agi';
        attr2 = 'rea';
      } else if (skill === 'combatmelee') {
        attr1 = 'agi';
        attr2 = 'str';
      } else if (skill === 'combatmissile') {
        attr1 = 'agi';
        attr2 = 'int';
      } else if (skill === 'computers') {
        attr1 = 'rea';
        attr2 = 'wil';        
      } else if (skill === 'demolitions') {
        attr1 = 'agi';
        attr2 = 'int';
      } else if (skill === 'disguise') {
        attr1 = 'agi';
        attr2 = 'pre';
      } else if (skill === 'drive') {
        attr1 = 'int';
        attr2 = 'qui';
      } else if (skill === 'history') {
        attr1 = 'rea';
        attr2 = 'wil';
      } else if (skill === 'intimidation') {
        attr1 = 'pre';
        attr2 = 'str';
      } else if (skill === 'lockstrapselectronic') {
        attr1 = 'int';
        attr2 = 'rea';
      } else if (skill === 'lockstrapsmechanical') {
        attr1 = 'agi';
        attr2 = 'rea';
      } else if (skill === 'medicine') {
        attr1 = 'agi';
        attr2 = 'int';
      } else if (skill === 'perception') {
        attr1 = 'int';
        attr2 = 'wil';
      } else if (skill === 'performance') {
        attr1 = 'int';
        attr2 = 'pre';
      } else if (skill === 'persuasion') {
        attr1 = 'int';
        attr2 = 'pre';
      } else if (skill === 'pilot') {
        attr1 = 'int';
        attr2 = 'qui';
      } else if (skill === 'resistancediscipline') {
        attr1 = 'pre';
        attr2 = 'wil';
      } else if (skill === 'resistancemagic') {
        attr1 = 'rea';
        attr2 = 'wil';
      } else if (skill === 'resistancepoison') {
        attr1 = 'end';
        attr2 = 'wil';
      } else if (skill === 'resistancereflex') {
        attr1 = 'agi';
        attr2 = 'qui';
      } else if (skill === 'resistancestamina') {
        attr1 = 'end';
        attr2 = 'str';
      } else if (skill === 'stealth') {
        attr1 = 'agi';
        attr2 = 'int';
      } else if (skill === 'survival') {
        attr1 = 'int';
        attr2 = 'rea';
      } else if (skill === 'technicalbiological') {
        attr1 = 'rea';
        attr2 = 'wil';
      } else if (skill === 'technicalcybernetics') {
        attr1 = 'rea';
        attr2 = 'wil';
      } else if (skill === 'technicalelectronic') {
        attr1 = 'rea';
        attr2 = 'wil';
      } else if (skill === 'technicalmechanical') {
        attr1 = 'rea';
        attr2 = 'wil';
      } else if (skill === 'technicalpower') {
        attr1 = 'rea';
        attr2 = 'wil';
      } else if (skill === 'technicalsoftware') {
        attr1 = 'rea';
        attr2 = 'wil';
      }


      obj[skill] = new fields.SchemaField({
        attr1: new fields.StringField({ required: true, initial: attr1 }),
        attr2: new fields.StringField({ required: true, initial: attr2 }),
        maxTrainingStatus: new fields.StringField({ required: true, initial: "untrained" }),
        trainingStatus: new fields.StringField({ required: true, initial: "untrained" }),
        dieBase: new fields.StringField({ required: true, initial: "d12" }),
        dieUp: new fields.StringField({ required: true, initial: "d10" }),
        dieDown: new fields.StringField({ required: true, initial: "d12" }),
        bonusBase: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0, max: 12}),
        bonusUp: new fields.NumberField({ ...requiredInteger, initial: 2, min: 2, max: 14}),
        bonusDown: new fields.NumberField({ ...requiredInteger, initial: -2, min: -2, max: 10}),
        totalBase: new fields.NumberField({ ...requiredInteger, initial: 0}),
        totalUp: new fields.NumberField({ ...requiredInteger, initial: 2}),
        totalDown: new fields.NumberField({ ...requiredInteger, initial: -2}),
        isNegBase: new fields.BooleanField({ required: true, initial: false }),
        isNegUp: new fields.BooleanField({ required: true, initial: false }),
        isNegDown: new fields.BooleanField({ required: true, initial: true }),
        hindranceMod: new fields.NumberField({ ...requiredInteger, initial: 0, min: -2, max: 0}),
        traitMod: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0, max: 2}),
        tickMark: new fields.BooleanField({ required: true, initial: false }),
      });
      return obj;
    }, {}));

    schema.spellActions = new fields.SchemaField(Object.keys(CONFIG.SENTIUS_RPG.spellActions).reduce((obj, spellAction) => {
      obj[spellAction] = new fields.SchemaField({
        attr1: new fields.StringField({ required: true, initial: "rea" }),
        attr2: new fields.StringField({ required: true, initial: "wil" }),
        maxTrainingStatus: new fields.StringField({ required: true, initial: "untrained" }),
        trainingStatus: new fields.StringField({ required: true, initial: "untrained" }),
        dieBase: new fields.StringField({ required: true, initial: "d12" }),
        dieUp: new fields.StringField({ required: true, initial: "d10" }),
        dieDown: new fields.StringField({ required: true, initial: "d12" }),
        bonusBase: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0, max: 12}),
        bonusUp: new fields.NumberField({ ...requiredInteger, initial: 2, min: 2, max: 14}),
        bonusDown: new fields.NumberField({ ...requiredInteger, initial: -2, min: -2, max: 10}),
        totalBase: new fields.NumberField({ ...requiredInteger, initial: 0}),
        totalUp: new fields.NumberField({ ...requiredInteger, initial: 2}),
        totalDown: new fields.NumberField({ ...requiredInteger, initial: -2}),
        isNegBase: new fields.BooleanField({ required: true, initial: false }),
        isNegUp: new fields.BooleanField({ required: true, initial: false }),
        isNegDown: new fields.BooleanField({ required: true, initial: true }),
        hindranceMod: new fields.NumberField({ ...requiredInteger, initial: 0, min: -2, max: 0}),
        traitMod: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0, max: 2}),
        tickMark: new fields.BooleanField({ required: true, initial: false }),
      });
      return obj;
    }, {}));

    schema.spellPowers = new fields.SchemaField(Object.keys(CONFIG.SENTIUS_RPG.spellPowers).reduce((obj, spellPower) => {
      obj[spellPower] = new fields.SchemaField({
        attr1: new fields.StringField({ required: true, initial: "rea" }),
        attr2: new fields.StringField({ required: true, initial: "wil" }),
        maxTrainingStatus: new fields.StringField({ required: true, initial: "untrained" }),
        trainingStatus: new fields.StringField({ required: true, initial: "untrained" }),
        dieBase: new fields.StringField({ required: true, initial: "d12" }),
        dieUp: new fields.StringField({ required: true, initial: "d10" }),
        dieDown: new fields.StringField({ required: true, initial: "d12" }),
        bonusBase: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0, max: 12}),
        bonusUp: new fields.NumberField({ ...requiredInteger, initial: 2, min: 2, max: 14}),
        bonusDown: new fields.NumberField({ ...requiredInteger, initial: -2, min: -2, max: 10}),
        totalBase: new fields.NumberField({ ...requiredInteger, initial: 0}),
        totalUp: new fields.NumberField({ ...requiredInteger, initial: 2}),
        totalDown: new fields.NumberField({ ...requiredInteger, initial: -2}),
        isNegBase: new fields.BooleanField({ required: true, initial: false }),
        isNegUp: new fields.BooleanField({ required: true, initial: false }),
        isNegDown: new fields.BooleanField({ required: true, initial: true }),
        hindranceMod: new fields.NumberField({ ...requiredInteger, initial: 0, min: -2, max: 0}),
        traitMod: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0, max: 2}),
        tickMark: new fields.BooleanField({ required: true, initial: false }),
      });
      return obj;
    }, {}));

    schema.spellTargets = new fields.SchemaField(Object.keys(CONFIG.SENTIUS_RPG.spellTargets).reduce((obj, spellTarget) => {
      obj[spellTarget] = new fields.SchemaField({
        attr1: new fields.StringField({ required: true, initial: "rea" }),
        attr2: new fields.StringField({ required: true, initial: "wil" }),
        maxTrainingStatus: new fields.StringField({ required: true, initial: "untrained" }),
        trainingStatus: new fields.StringField({ required: true, initial: "untrained" }),
        dieBase: new fields.StringField({ required: true, initial: "d12" }),
        dieUp: new fields.StringField({ required: true, initial: "d10" }),
        dieDown: new fields.StringField({ required: true, initial: "d12" }),
        bonusBase: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0, max: 12}),
        bonusUp: new fields.NumberField({ ...requiredInteger, initial: 2, min: 2, max: 14}),
        bonusDown: new fields.NumberField({ ...requiredInteger, initial: -2, min: -2, max: 10}),
        totalBase: new fields.NumberField({ ...requiredInteger, initial: 0}),
        totalUp: new fields.NumberField({ ...requiredInteger, initial: 2}),
        totalDown: new fields.NumberField({ ...requiredInteger, initial: -2}),
        isNegBase: new fields.BooleanField({ required: true, initial: false }),
        isNegUp: new fields.BooleanField({ required: true, initial: false }),
        isNegDown: new fields.BooleanField({ required: true, initial: true }),
        hindranceMod: new fields.NumberField({ ...requiredInteger, initial: 0, min: -2, max: 0}),
        traitMod: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0, max: 2}),
        tickMark: new fields.BooleanField({ required: true, initial: false }),
      });
      return obj;
    }, {}));

    // I need to set all the different abilties for the different skills
    return schema;
  }

  prepareDerivedData() {
    const attributes = this.attributes;

    // CONFIGURE HINDRANCES FOR DERVIVED ABILITIES
    let cyberneticrejection = 0;
    if(attributes.cyberneticrejection) {
      cyberneticrejection = Math.min(attributes.cyberneticrejection.stability.value);
    }
    let manaleakage = 0;
    if(attributes.manaleakage) {
      manaleakage = Math.min(attributes.manaleakage.mana.value);
    }
    let obesepace = 0;
    let obesedie = 0;
    if(attributes.obese) {
      obesepace = Math.min(attributes.obese.pace.value);
      obesedie = Math.min(attributes.obese.pacedie.value);
    }
    let slowpace = 0;
    let slowdie = 0;
    if(attributes.slowminor) {
      slowpace = Math.min(attributes.slowminor.pace.value, slowpace);
      slowdie = Math.min(attributes.slowminor.pacedie.value, slowdie);
    }
    if(attributes.slowsignificant) {
      slowpace = Math.min(attributes.slowsignificant.pace.value, slowpace);
      slowdie = Math.min(attributes.slowsignificant.pacedie.value, slowdie);
    }

    // CONFIGURE TRAITS FOR DERVIVED ABILITIES
    let cyberneticacceptance = 0;
    if(attributes.cyberneticacceptance) {
      cyberneticacceptance = Math.min(attributes.cyberneticacceptance.stability.value);
    }

    // GET ALL STABILITY COSTS
    let stabilityCosts = 0;
    if(attributes.stability) {
      for(let prop in attributes.stability) {
        console.log("STABILITY", prop, attributes.stability[prop].value);
        stabilityCosts += attributes.stability[prop].value;
      }
    }

    // CONFIGURE VALUES
    const stability = Math.max(Math.floor((this.abilities.end.bonus + this.abilities.wil.bonus)/ 2 + cyberneticrejection),0) + cyberneticacceptance;
    const stabilityCurrent = stability - stabilityCosts;

    /* derived abilties - values */
    this.derivedAbilitiesValue = {
      defensemelee: {
        value: Math.floor((this.abilities.agi.bonus + this.abilities.int.bonus )/ 2)
      },
      defenserange: {
        value: Math.floor((this.abilities.qui.bonus + this.abilities.int.bonus )/ 2)
      },
      encumbrance: {
        value: (Math.floor((this.abilities.str.bonus + this.abilities.end.bonus )/ 2) +1) * 10
      },
      fatigue: {
        value: Math.floor((this.abilities.end.bonus + this.abilities.wil.bonus )/ 2)
      },
      initiative: {
        value: Math.floor((this.abilities.int.bonus + this.abilities.qui.bonus )/ 2)
      },
      pace: {
        value: (Math.floor((this.abilities.agi.bonus + this.abilities.qui.bonus )/ 2) + 2 + Math.min(obesepace, slowpace))
      },
      stability: {
        value: stability
      },
      stabilityCurrent: {
        value: stabilityCurrent
      }
    }

    console.log("derivedAbilitiesPool", this);
 
    /* derived abilties - pools */
    const paceDieValue = Math.floor((this.abilities.agi.bonus + this.abilities.qui.bonus )/ 2) + Math.min(obesedie, slowdie);
    let paceDie = "d4";
    if (paceDieValue < 3) {
      paceDie = "d4";
    } else if( paceDieValue === 3 || paceDieValue === 4) {
      paceDie = "d6";
    } else if( paceDieValue === 5 || paceDieValue === 6) {
      paceDie = "d8";
    } else if( paceDieValue === 7 || paceDieValue === 8) {
      paceDie = "d10";
    } else {
      paceDie = "d12";
    }

    const health = Math.floor((this.abilities.end.bonus + this.abilities.wil.bonus )/ 2);
    let healthPool = '';
    if(health < 3) { 
      healthPool = 'd4';
    } else if(health === 3 || health === 4) {
      healthPool = 'd6';
    } else if(health === 5 || health === 6) {
      healthPool = 'd8';
    } else if(health === 7 || health === 8) {
      healthPool = 'd10';
    } else {
      healthPool = 'd12';
    }

    // we'll come back to cybernetic pool and calculate it and modify the health pool later
    const cyberneticPool = 'd0';

    const faith = Math.floor((this.abilities.wil.bonus + this.abilities.int.bonus )/ 2);
    let faithPool = '';
    if(faith < 3) { 
      faithPool = 'd4';
    } else if(faith === 3 || faith === 4) {
      faithPool = 'd6';
    } else if(faith === 5 || faith === 6) {
      faithPool = 'd8';
    } else if(faith === 7 || faith === 8) {
      faithPool = 'd10';
    } else {
      faithPool = 'd12';
    }

    const mana = Math.floor((this.abilities.wil.bonus + this.abilities.rea.bonus )/ 2) + manaleakage;
    let manaPool = '';
    if(mana < 3) { 
      manaPool = 'd4';
    } else if(mana === 3 || mana === 4) {
      manaPool = 'd6';
    } else if(mana === 5 || mana === 6) {
      manaPool = 'd8';
    } else if(mana === 7 || mana === 8) {
      manaPool = 'd10';
    } else {
      manaPool = 'd12';
    }

    const psychic = Math.floor((this.abilities.wil.bonus + this.abilities.pre.bonus )/ 2);
    let psychicPool = '';
    if(psychic < 3) { 
      psychicPool = 'd4';
    } else if(psychic === 3 || psychic === 4) {
      psychicPool = 'd6';
    } else if(psychic === 5 || psychic === 6) {
      psychicPool = 'd8';
    } else if(psychic === 7 || psychic === 8) {
      psychicPool = 'd10';
    } else {
      psychicPool = 'd12';
    }

    let cyberneticCurrent = '';
    if(this.derivedAbilitiesPool.cybernetic.current === '') {
      cyberneticCurrent = cyberneticPool;
    } else {
      cyberneticCurrent = this.derivedAbilitiesPool.cybernetic.current;
    }
    let faithCurrent = '';
    if(this.derivedAbilitiesPool.faith.current === '') {
      faithCurrent = faithPool;
    } else {
      faithCurrent = this.derivedAbilitiesPool.faith.current;
    }
    let healthCurrent = '';
    if(this.derivedAbilitiesPool.health.current === '') {
      healthCurrent = healthPool;
    } else {
      healthCurrent = this.derivedAbilitiesPool.health.current;
    }
    let manaCurrent = '';
    if(this.derivedAbilitiesPool.mana.current === '') {
      manaCurrent = manaPool;
    } else {
      manaCurrent = this.derivedAbilitiesPool.mana.current;
    }
    let psychicCurrent = '';
    if(this.derivedAbilitiesPool.psychic.current === '') {
      psychicCurrent = psychicPool;
    } else {
      psychicCurrent = this.derivedAbilitiesPool.psychic.current;
    }

    /* derived abilities */
    this.derivedAbilitiesPool = {
      cybernetic: { value: cyberneticPool, current: cyberneticCurrent },
      faith: { value: faithPool, current: faithCurrent },
      health: { value: healthPool, current: healthCurrent },
      mana: { value: manaPool, current: manaCurrent },
      psychic: { value: psychicPool, current: psychicCurrent },
      paceDie: { value: paceDie, current: paceDie }
    }
    console.log("DERIVEDABILITIESPOOL", this.derivedAbilitiesPool);
  }

  getRollData() {
    const data = {};

    // Copy the ability scores to the top level, so that rolls can use
    // formulas like `@str.mod + 4`.
    if (this.abilities) {
      for (let [k,v] of Object.entries(this.abilities)) {
        data[k] = foundry.utils.deepClone(v);
      }
    }

    console.log("ROLLDATA", data);

    data.lvl = this.attributes.level.value;

    return data
  }
}