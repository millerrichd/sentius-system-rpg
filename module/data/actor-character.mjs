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
    

    schema.spellWordsCost = new fields.SchemaField({
      spellActionWord: new fields.StringField({ required: true, initial: "armor" }),
      spellPowerWord: new fields.StringField({ required: true, initial: "air" }),
      spellTargetWord: new fields.StringField({ required: true, initial: "it" }), 
      spellActionArmor: new fields.SchemaField({
        costArmorRating: new fields.NumberField({ ...requiredInteger, initial: 3, min: 0}),
        costArmorType: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0}),
        costArmorDuration: new fields.NumberField({ ...requiredInteger, initial: 1, min: 0})
      }),
      spellActionCreate: new fields.SchemaField({
        costCreateSize: new fields.NumberField({ ...requiredInteger, initial: 1, min: 0}),
        costCreateNumber: new fields.NumberField({ ...requiredInteger, initial: 2, min: 0}),
        costCreateDuration: new fields.NumberField({ ...requiredInteger, initial: 1, min: 0})
      }),
      spellActionDestroy: new fields.SchemaField({
        costDestroyNumber: new fields.NumberField({ ...requiredInteger, initial: 1, min: 0}),
        costDestroyType: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0}),
        costDamageResistance: new fields.NumberField({ ...requiredInteger, initial: 1, min: 0})
      }),
      spellActionRepair: new fields.SchemaField({
        costRepairNumber: new fields.NumberField({ ...requiredInteger, initial: 2, min: 0}),
      }),
      spellActionShield: new fields.SchemaField({
        costShieldResistance: new fields.NumberField({ ...requiredInteger, initial: 3, min: 0}),
        costShieldDuration: new fields.NumberField({ ...requiredInteger, initial: 1, min: 0})
      }),
      spellActionTransform: new fields.SchemaField({
        costTransformSize: new fields.NumberField({ ...requiredInteger, initial: 2, min: 0}),
        costTransformDuration: new fields.NumberField({ ...requiredInteger, initial: 1, min: 0})
      }),
      spellActionBanish: new fields.SchemaField({
        costBanishResistance: new fields.NumberField({ ...requiredInteger, initial: 1, min: 0}),
        costBanishSize: new fields.NumberField({ ...requiredInteger, initial: 1, min: 0})
      }),
      spellActionControl: new fields.SchemaField({
        costControlResistance: new fields.NumberField({ ...requiredInteger, initial: 1, min: 0}),
        costControlDuration: new fields.NumberField({ ...requiredInteger, initial: 1, min: 0})
      }),
      spellActionSummon: new fields.SchemaField({
        costSummonSize: new fields.NumberField({ ...requiredInteger, initial: 2, min: 0}),
        costSummonNumber: new fields.NumberField({ ...requiredInteger, initial: 2, min: 0}),
        costSummonDuration: new fields.NumberField({ ...requiredInteger, initial: 1, min: 0}),
        costSummonDisappears: new fields.NumberField({ ...requiredInteger, initial: 1, min: 0})
      }),
      spellPowerAir: new fields.SchemaField({
        costAirDamageDie: new fields.NumberField({ ...requiredInteger, initial: 1, min: 0})
      }),
      spellPowerAnimal: new fields.SchemaField({
        costAnimalShape: new fields.NumberField({ ...requiredInteger, initial: 2, min: 0}),
        costAnimalDamageDie: new fields.NumberField({ ...requiredInteger, initial: 1, min: 0})
      }),
      spellPowerDark: new fields.SchemaField({
        costDarkFieldRange: new fields.NumberField({ ...requiredInteger, initial: 1, min: 0}),
        costDarkDamageDie: new fields.NumberField({ ...requiredInteger, initial: 1, min: 0}),
      }),
      spellPowerEarth: new fields.SchemaField({
        costEarthDamageDie: new fields.NumberField({ ...requiredInteger, initial: 1, min: 0})
      }),
      spellPowerFire: new fields.SchemaField({
        costFireDamageDie: new fields.NumberField({ ...requiredInteger, initial: 1, min: 0})
      }),
      spellPowerForce: new fields.SchemaField({
        costForceDamageDie: new fields.NumberField({ ...requiredInteger, initial: 1, min: 0})
      }),
      spellPowerLight: new fields.SchemaField({
        costLightFieldRange: new fields.NumberField({ ...requiredInteger, initial: 1, min: 0}),
        costLightDamageDie: new fields.NumberField({ ...requiredInteger, initial: 1, min: 0})
      }),
      spellPowerPlant: new fields.SchemaField({
        costPlantShape: new fields.NumberField({ ...requiredInteger, initial: 2, min: 0}),
        costPlantDamageDie: new fields.NumberField({ ...requiredInteger, initial: 1, min: 0})
      }),
      spellPowerWater: new fields.SchemaField({
        costWaterDamageDie: new fields.NumberField({ ...requiredInteger, initial: 1, min: 0})
      }),
      spellPowerAsh: new fields.SchemaField({
        costAshDamageDie: new fields.NumberField({ ...requiredInteger, initial: 1, min: 0}),
        costAshCover: new fields.NumberField({ ...requiredInteger, initial: 4, min: 0})
      }),
      spellPowerFissure: new fields.SchemaField({
        costFissureDamageDie: new fields.NumberField({ ...requiredInteger, initial: 1, min: 0}),
        costFissureWeaken: new fields.NumberField({ ...requiredInteger, initial: 6, min: 0})
      }),
      spellPowerLava: new fields.SchemaField({
        costLavaDamageDie: new fields.NumberField({ ...requiredInteger, initial: 1, min: 0}),
        costLavaWeaken: new fields.NumberField({ ...requiredInteger, initial: 6, min: 0})
      }),
      spellPowerMist: new fields.SchemaField({
        costMistDamageDie: new fields.NumberField({ ...requiredInteger, initial: 1, min: 0}),
        costMistCover: new fields.NumberField({ ...requiredInteger, initial: 4, min: 0})
      }),
      spellPowerMud: new fields.SchemaField({
        costMudDamageDie: new fields.NumberField({ ...requiredInteger, initial: 1, min: 0}),
        costMudReducedSpeed: new fields.NumberField({ ...requiredInteger, initial: 5, min: 0})
      }),
      spellPowerSteam: new fields.SchemaField({
        costSteamDamageDie: new fields.NumberField({ ...requiredInteger, initial: 1, min: 0}),
        costSteamCover: new fields.NumberField({ ...requiredInteger, initial: 4, min: 0})
      }),
      spellPowerAngelic: new fields.SchemaField({
        costAngelicDamageDie: new fields.NumberField({ ...requiredInteger, initial: 1, min: 0})
      }),
      spellPowerDemonic: new fields.SchemaField({
        costDemonicDamageDie: new fields.NumberField({ ...requiredInteger, initial: 1, min: 0})
      }),
      spellPowerSpirit: new fields.SchemaField({
        costSpiritDamageDie: new fields.NumberField({ ...requiredInteger, initial: 1, min: 0})
      }),
      spellTargetIt: new fields.SchemaField({
        costItTarget: new fields.NumberField({ ...requiredInteger, initial: 2, min: 0})
      }),
      spellTargetMe: new fields.SchemaField({
        costMeTarget: new fields.NumberField({ ...requiredInteger, initial: 1, min: 0})
      }),
      spellTargetThem: new fields.SchemaField({
        costThemTarget: new fields.NumberField({ ...requiredInteger, initial: 3, min: 0})
      }),
      spellTargetThere: new fields.SchemaField({
        costThereTarget: new fields.NumberField({ ...requiredInteger, initial: 3, min: 0})
      }),
      spellTargetYou: new fields.SchemaField({
        costYouTarget: new fields.NumberField({ ...requiredInteger, initial: 1, min: 0})
      }),

      spellActionArmorCost: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0}),
      spellActionCreateCost: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0}),
      spellActionDestroyCost: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0}),
      spellActionRepairCost: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0}),
      spellActionShieldCost: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0}),
      spellActionTransformCost: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0}),
      spellActionBanishCost: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0}),
      spellActionControlCost: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0}),
      spellActionBanishCost: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0}),

      spellPowerAirCost: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0}),
      spellPowerAnimalCost: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0}),
      spellPowerDarkCost: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0}),
      spellPowerEarthCost: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0}),
      spellPowerFireCost: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0}),
      spellPowerForceCost: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0}),
      spellPowerLightCost: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0}),
      spellPowerPlantCost: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0}),
      spellPowerWaterCost: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0}),
      spellPowerAshCost: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0}),
      spellPowerFissureCost: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0}),
      spellPowerLavaCost: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0}),
      spellPowerMistCost: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0}),
      spellPowerMudCost: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0}),
      spellPowerSteamCost: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0}),
      spellPowerAngelicCost: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0}),
      spellPowerDemonicCost: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0}),
      spellPowerSpiritCost: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0}),

      spellActionTotalCost: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0}),
      spellPowerTotalCost: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0}),
      spellTargetTotalCost: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0}),
      spellCompleteTotalCost: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0}),
      spellCompleteTotalMana: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0}),
      spellCompleteTotalMarkers: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0}),
    });

    // I need to set all the different abilties for the different skills
    return schema;
  }

  prepareDerivedData() {
    const attributes = this.attributes;
    
    let completeTotal = 0;
    //spell energy costs
    const armorCost = this.spellWordsCost.spellActionArmor.costArmorRating + this.spellWordsCost.spellActionArmor.costArmorType + this.spellWordsCost.spellActionArmor.costArmorDuration;
    const createCost = this.spellWordsCost.spellActionCreate.costCreateSize + this.spellWordsCost.spellActionCreate.costCreateNumber + this.spellWordsCost.spellActionCreate.costCreateDuration;
    const destoryCost = this.spellWordsCost.spellActionDestroy.costDestroyNumber + this.spellWordsCost.spellActionDestroy.costDestroyType + this.spellWordsCost.spellActionDestroy.costDamageResistance;
    const repairCost = this.spellWordsCost.spellActionRepair.costRepairNumber;
    const shieldCost = this.spellWordsCost.spellActionShield.costShieldResistance + this.spellWordsCost.spellActionShield.costShieldDuration;
    const transformCost = this.spellWordsCost.spellActionTransform.costTransformSize + this.spellWordsCost.spellActionTransform.costTransformDuration;
    const banishCost = this.spellWordsCost.spellActionBanish.costBanishResistance + this.spellWordsCost.spellActionBanish.costBanishSize;
    const controlCost = this.spellWordsCost.spellActionControl.costControlResistance + this.spellWordsCost.spellActionControl.costControlDuration;
    const summonCost = this.spellWordsCost.spellActionSummon.costSummonSize + this.spellWordsCost.spellActionSummon.costSummonNumber + this.spellWordsCost.spellActionSummon.costSummonDuration + this.spellWordsCost.spellActionSummon.costSummonDisappears;
    this.spellActionArmorCost = armorCost;
    this.spellActionCreateCost = createCost;
    this.spellActionDestroyCost = destoryCost;
    this.spellActionRepairCost = repairCost;
    this.spellActionShieldCost = shieldCost;
    this.spellActionTransformCost = transformCost;
    this.spellActionBanishCost = banishCost;
    this.spellActionControlCost = controlCost;
    this.spellActionSummonCost = summonCost;

    if(this.spellWordsCost.spellActionWord === 'armor') { 
      this.spellWordsCost.spellActionTotalCost = armorCost;
      completeTotal += armorCost;
    }
    else if (this.spellWordsCost.spellActionWord === 'create') {
      this.spellWordsCost.spellActionTotalCost = createCost;
      completeTotal += createCost;
    }
    else if (this.spellWordsCost.spellActionWord === 'destroy') {
      this.spellWordsCost.spellActionTotalCost = destoryCost;
      completeTotal += destoryCost;
    }
    else if (this.spellWordsCost.spellActionWord === 'repair') {
      this.spellWordsCost.spellActionTotalCost = repairCost;
      completeTotal += repairCost;
    }
    else if (this.spellWordsCost.spellActionWord === 'shield') {
      this.spellWordsCost.spellActionTotalCost = shieldCost;
      completeTotal += shieldCost;
    }
    else if (this.spellWordsCost.spellActionWord === 'transform') {
      this.spellWordsCost.spellActionTotalCost = transformCost;
      completeTotal += transformCost;
    }
    else if (this.spellWordsCost.spellActionWord === 'banish') {
      this.spellWordsCost.spellActionTotalCost = banishCost;
      completeTotal += banishCost;
    }
    else if (this.spellWordsCost.spellActionWord === 'control') {
      this.spellWordsCost.spellActionTotalCost = controlCost;
      completeTotal += controlCost;
    }
    else if (this.spellWordsCost.spellActionWord === 'summon') {
      this.spellWordsCost.spellActionTotalCost = summonCost;
      completeTotal += summonCost;
    }

    const airCost = this.spellWordsCost.spellPowerAir.costAirDamageDie;
    const animalCost = this.spellWordsCost.spellPowerAnimal.costAnimalShape + this.spellWordsCost.spellPowerAnimal.costAnimalDamageDie;
    const darkCost = this.spellWordsCost.spellPowerDark.costDarkFieldRange + this.spellWordsCost.spellPowerDark.costDarkDamageDie;
    const earthCost = this.spellWordsCost.spellPowerEarth.costEarthDamageDie;
    const fireCost = this.spellWordsCost.spellPowerFire.costFireDamageDie;
    const forceCost = this.spellWordsCost.spellPowerForce.costForceDamageDie;
    const lightCost = this.spellWordsCost.spellPowerLight.costLightFieldRange + this.spellWordsCost.spellPowerLight.costLightDamageDie;
    const plantCost = this.spellWordsCost.spellPowerPlant.costPlantShape + this.spellWordsCost.spellPowerPlant.costPlantDamageDie;
    const waterCost = this.spellWordsCost.spellPowerWater.costWaterDamageDie;
    const ashCost = this.spellWordsCost.spellPowerAsh.costAshDamageDie + this.spellWordsCost.spellPowerAsh.costAshCover;
    const fissureCost = this.spellWordsCost.spellPowerFissure.costFissureDamageDie + this.spellWordsCost.spellPowerFissure.costFissureWeaken;
    const lavaCost = this.spellWordsCost.spellPowerLava.costLavaDamageDie + this.spellWordsCost.spellPowerLava.costLavaWeaken;
    const mistCost = this.spellWordsCost.spellPowerMist.costMistDamageDie + this.spellWordsCost.spellPowerMist.costMistCover;
    const mudCost = this.spellWordsCost.spellPowerMud.costMudDamageDie + this.spellWordsCost.spellPowerMud.costMudReducedSpeed;
    const steamCost = this.spellWordsCost.spellPowerSteam.costSteamDamageDie + this.spellWordsCost.spellPowerSteam.costSteamCover;
    const angelicCost = this.spellWordsCost.spellPowerAngelic.costAngelicDamageDie;
    const demonicCost = this.spellWordsCost.spellPowerDemonic.costDemonicDamageDie;
    const spiritCost = this.spellWordsCost.spellPowerSpirit.costSpiritDamageDie;
    this.spellPowerAirCost = airCost;
    this.spellPowerAnimalCost = animalCost;
    this.spellPowerDarkCost = darkCost;
    this.spellPowerEarthCost = earthCost;
    this.spellPowerFireCost = fireCost;
    this.spellPowerForceCost = forceCost;
    this.spellPowerLightCost = lightCost;
    this.spellPowerPlantCost = plantCost;
    this.spellPowerWaterCost = waterCost;
    this.spellPowerAshCost = ashCost;
    this.spellPowerFissureCost = fissureCost;
    this.spellPowerLavaCost = lavaCost;
    this.spellPowerMistCost = mistCost;
    this.spellPowerMudCost = mudCost;
    this.spellPowerSteamCost = steamCost;
    this.spellPowerAngelicCost = angelicCost;
    this.spellPowerDemonicCost = demonicCost;
    this.spellPowerSpiritCost = spiritCost;

    if(this.spellWordsCost.spellPowerWord === 'air') {
      this.spellWordsCost.spellPowerTotalCost = airCost;
      completeTotal += airCost;
    }
    else if (this.spellWordsCost.spellPowerWord === 'animal') {
      this.spellWordsCost.spellPowerTotalCost = animalCost;
      completeTotal += animalCost;
    }
    else if (this.spellWordsCost.spellPowerWord === 'dark') {
      this.spellWordsCost.spellPowerTotalCost = darkCost;
      completeTotal += darkCost;
    }
    else if (this.spellWordsCost.spellPowerWord === 'earth') {
      this.spellWordsCost.spellPowerTotalCost = earthCost;
      completeTotal += earthCost;
    }
    else if (this.spellWordsCost.spellPowerWord === 'fire') {
      this.spellWordsCost.spellPowerTotalCost = fireCost;
      completeTotal += fireCost;
    }
    else if (this.spellWordsCost.spellPowerWord === 'force') {
      this.spellWordsCost.spellPowerTotalCost = forceCost;
      completeTotal += forceCost;
    }
    else if (this.spellWordsCost.spellPowerWord === 'light') {
      this.spellWordsCost.spellPowerTotalCost = lightCost;
      completeTotal += lightCost;
    }
    else if (this.spellWordsCost.spellPowerWord === 'plant') {
      this.spellWordsCost.spellPowerTotalCost = plantCost;
      completeTotal += plantCost;
    }
    else if (this.spellWordsCost.spellPowerWord === 'water') {
      this.spellWordsCost.spellPowerTotalCost = waterCost;
      completeTotal += waterCost;
    }
    else if (this.spellWordsCost.spellPowerWord === 'ash') {
      this.spellWordsCost.spellPowerTotalCost = ashCost;
      completeTotal += ashCost;
    }
    else if (this.spellWordsCost.spellPowerWord === 'fissure') {
      this.spellWordsCost.spellPowerTotalCost = fissureCost;
      completeTotal += fissureCost;
    }
    else if (this.spellWordsCost.spellPowerWord === 'lava') {
      this.spellWordsCost.spellPowerTotalCost = lavaCost;
      completeTotal += lavaCost;
    }
    else if (this.spellWordsCost.spellPowerWord === 'mist') {
      this.spellWordsCost.spellPowerTotalCost = mistCost;
      completeTotal += mistCost;
    }
    else if (this.spellWordsCost.spellPowerWord === 'mud') {
      this.spellWordsCost.spellPowerTotalCost = mudCost;
      completeTotal += mudCost;
    }
    else if (this.spellWordsCost.spellPowerWord === 'steam') {
      this.spellWordsCost.spellPowerTotalCost = steamCost;
      completeTotal += steamCost;
    }
    else if (this.spellWordsCost.spellPowerWord === 'angelic') {
      this.spellWordsCost.spellPowerTotalCost = angelicCost;
      completeTotal += angelicCost;
    }
    else if (this.spellWordsCost.spellPowerWord === 'demonic') {
      this.spellWordsCost.spellPowerTotalCost = demonicCost;
      completeTotal += demonicCost;
    }
    else if (this.spellWordsCost.spellPowerWord === 'spirit') {
      this.spellWordsCost.spellPowerTotalCost = spiritCost;
      completeTotal += spiritCost;
    }

    const itCost = this.spellWordsCost.spellTargetIt.costItTarget;
    const meCost = this.spellWordsCost.spellTargetMe.costMeTarget;
    const themCost = this.spellWordsCost.spellTargetThem.costThemTarget;
    const thereCost = this.spellWordsCost.spellTargetThere.costThereTarget;
    const youCost = this.spellWordsCost.spellTargetYou.costYouTarget;
    this.spellTargetItCost = itCost;
    this.spellTargetMeCost = meCost;
    this.spellTargetThemCost = themCost;
    this.spellTargetThereCost = thereCost;
    this.spellTargetYouCost = youCost;

    if(this.spellWordsCost.spellTargetWord === 'it') {
      this.spellWordsCost.spellTargetTotalCost = itCost;
      completeTotal += itCost;
    }
    else if (this.spellWordsCost.spellTargetWord === 'me') {
      this.spellWordsCost.spellTargetTotalCost = meCost;
      completeTotal += meCost;
    }
    else if (this.spellWordsCost.spellTargetWord === 'them') {
      this.spellWordsCost.spellTargetTotalCost = themCost;
      completeTotal += themCost;
    }
    else if (this.spellWordsCost.spellTargetWord === 'there') {
      this.spellWordsCost.spellTargetTotalCost = thereCost;
      completeTotal += thereCost;
    }
    else if (this.spellWordsCost.spellTargetWord === 'you') {
      this.spellWordsCost.spellTargetTotalCost = youCost;
      completeTotal += youCost;
    }
    
    this.spellWordsCost.spellCompleteTotalCost = completeTotal;
    this.spellWordsCost.spellCompleteTotalMana = Math.floor(completeTotal / 12);
    this.spellWordsCost.spellCompleteTotalMarkers = Math.floor(completeTotal / 6);

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
        value: Math.floor((this.abilities.end.bonus + this.abilities.wil.bonus )/ 2) + 1
      },
      initiative: {
        value: Math.floor((this.abilities.int.bonus + this.abilities.qui.bonus )/ 2) + 1 + (attributes.quick ? attributes.quick.initiativespeed.value : 0)
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

    console.log("ATTRIBUTES", attributes);
    let cyberparts = 0;
    let cyberneticPool = '';

    if (attributes.leftarmagi || attributes.leftarmstr) { cyberparts++; }
    if (attributes.rightarmagi || attributes.rightarmstr) { cyberparts++; }
    if (attributes.leftlegagi || attributes.leftlegstr) { cyberparts++; }
    if (attributes.rightlegagi || attributes.rightlegstr) { cyberparts++; }
    if (attributes.torsoheadreplace) { cyberparts++; }
    console.log("CYBERPARTS", cyberparts);
    if (cyberparts < 1) { cyberneticPool = 'd0'; }
    else if (cyberparts === 1) { cyberneticPool = 'd4'; }
    else if (cyberparts === 2) { cyberneticPool = 'd6'; }
    else if (cyberparts === 3) { cyberneticPool = 'd8'; }
    else if (cyberparts === 4) { cyberneticPool = 'd10'; }
    else { cyberneticPool = 'd12'; }

    const health = Math.floor((this.abilities.end.bonus + this.abilities.wil.bonus )/ 2) - cyberparts * 2;
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