/**
 * Extend the base Actor document by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
export class SentiusRPGActor extends Actor {
  /** @override */
  prepareData() {
    // Prepare data for the actor. Calling the super version of this executes
    // the following, in order: data reset (to clear active effects),
    // prepareBaseData(), prepareEmbeddedDocuments() (including active effects),
    // prepareDerivedData().
    super.prepareData();
  }

  /** @override */
  prepareBaseData() {
    // Data modifications in this step occur before processing embedded
    // documents or derived data.
  }

  /**
   * @override
   * Augment the actor source data with additional dynamic data that isn't 
   * handled by the actor's DataModel. Data calculated in this step should be
   * available both inside and outside of character sheets (such as if an actor
   * is queried and has a roll executed directly from it).
   */
  prepareDerivedData() {
    const actorData = this;
    const attributes = actorData.system.attributes;
    const abilities = actorData.system.abilities;
    const derivedAbilitiesValue = actorData.system.derivedAbilitiesValue;
    const derivedAbilitiesPool = actorData.system.derivedAbilitiesPool;
    const skills = actorData.system.skills;
    const spellActions = actorData.system.spellActions;
    const spellPowers = actorData.system.spellPowers;
    const spellTargets = actorData.system.spellTargets;
    const flags = actorData.flags.sentiusrpg || {};

    console.log("prepareDerivedDataActor1", actorData);

    /* ====================== SKILL MAX TRAINING LEVEL ====================== */
    // console.log("SKILLS", skills)
    for (let prop in skills) {
      if (Object.prototype.hasOwnProperty.call(skills, prop)) {
        // console.log("PROCESSING", prop, skills[prop].attr1, skills[prop].attr2);
        const die1 = abilities[skills[prop].attr1].die;
        const die2 = abilities[skills[prop].attr2].die;
        const mapping = {
          "d12": 0,
          "d10": 1,
          "d8": 2,
          "d6": 3,
          "d4": 4,
          "d2": 5
        }
        const maxDie = Math.max(mapping[die1], mapping[die2]);

        let training = 'Untrained'
        if(maxDie === 0) {
          training = 'Untrained';
        } else if (maxDie === 1) {
          training = 'Apprentice';
        } else if (maxDie === 2) {
          training = 'Professional';
        } else if (maxDie === 3) {
          training = 'Expert';
        } else if (maxDie === 4) {
          training = 'Master';
        } else { 
          training = 'Legendary';
        }
        // console.log("SKILL", prop, "MAX TRAINING LEVEL", training);
        skills[prop].maxTrainingStatus = training;
      }
    }

    /* ====================== Spell Action/Power/Target ====================== */
    for (let prop in spellActions) {
      if (Object.prototype.hasOwnProperty.call(spellActions, prop)) {
        // console.log("PROCESSING", prop, skills[prop].attr1, skills[prop].attr2);
        const die1 = abilities[spellActions[prop].attr1].die;
        const die2 = abilities[spellActions[prop].attr2].die;
        console.log("DICE", die1, die2)
        const mapping = {
          "d12": 0,
          "d10": 1,
          "d8": 2,
          "d6": 3,
          "d4": 4,
          "d2": 5
        }
        const maxDie = Math.max(mapping[die1], mapping[die2]);

        let training = 'Untrained'
        if(maxDie === 0) {
          training = 'Untrained';
        } else if (maxDie === 1) {
          training = 'Apprentice';
        } else if (maxDie === 2) {
          training = 'Professional';
        } else if (maxDie === 3) {
          training = 'Expert';
        } else if (maxDie === 4) {
          training = 'Master';
        } else { 
          training = 'Legendary';
        }
        // console.log("SKILL", prop, "MAX TRAINING LEVEL", training);
        spellActions[prop].maxTrainingStatus = training;
      }
    }
    for (let prop in spellPowers) {
      if (Object.prototype.hasOwnProperty.call(spellPowers, prop)) {
        // console.log("PROCESSING", prop, skills[prop].attr1, skills[prop].attr2);
        const die1 = abilities[spellPowers[prop].attr1].die;
        const die2 = abilities[spellPowers[prop].attr2].die;
        const mapping = {
          "d12": 0,
          "d10": 1,
          "d8": 2,
          "d6": 3,
          "d4": 4,
          "d2": 5
        }
        const maxDie = Math.max(mapping[die1], mapping[die2]);

        let training = 'Untrained'
        if(maxDie === 0) {
          training = 'Untrained';
        } else if (maxDie === 1) {
          training = 'Apprentice';
        } else if (maxDie === 2) {
          training = 'Professional';
        } else if (maxDie === 3) {
          training = 'Expert';
        } else if (maxDie === 4) {
          training = 'Master';
        } else { 
          training = 'Legendary';
        }
        // console.log("SKILL", prop, "MAX TRAINING LEVEL", training);
        spellPowers[prop].maxTrainingStatus = training;
      }
    }
    for (let prop in spellTargets) {
      if (Object.prototype.hasOwnProperty.call(spellTargets, prop)) {
        // console.log("PROCESSING", prop, skills[prop].attr1, skills[prop].attr2);
        const die1 = abilities[spellTargets[prop].attr1].die;
        const die2 = abilities[spellTargets[prop].attr2].die;
        const mapping = {
          "d12": 0,
          "d10": 1,
          "d8": 2,
          "d6": 3,
          "d4": 4,
          "d2": 5
        }
        const maxDie = Math.max(mapping[die1], mapping[die2]);

        let training = 'Untrained'
        if(maxDie === 0) {
          training = 'Untrained';
        } else if (maxDie === 1) {
          training = 'Apprentice';
        } else if (maxDie === 2) {
          training = 'Professional';
        } else if (maxDie === 3) {
          training = 'Expert';
        } else if (maxDie === 4) {
          training = 'Master';
        } else { 
          training = 'Legendary';
        }
        // console.log("SKILL", prop, "MAX TRAINING LEVEL", training);
        spellTargets[prop].maxTrainingStatus = training;
      }
    }



    /* ====================== HINDRANCES ====================== */

    const hindrance = {
      athletics: 0,
      history: 0,
      intimidation: 0,
      perception: 0,
      performance: 0,
      persuasion: 0,
      stealth: 0
    }

    //Clueless Hindrance
    if(attributes.clueless) {
      skills.history.hindranceMod = Math.min(attributes.clueless.history.value, hindrance.history, skills.history.hindranceMod);
      skills.perception.hindranceMod = Math.min(attributes.clueless.perception.value, hindrance.perception, skills.perception.hindranceMod);
      hindrance.history = Math.min(attributes.clueless.history.value, hindrance.history, skills.history.hindranceMod);
      hindrance.perception = Math.min(attributes.clueless.perception.value, hindrance.perception, skills.perception.hindranceMod);
    }
    //Clumsy Hindrance
    if(attributes.clumsy) {
      skills.athletics.hindranceMod = Math.min(attributes.clumsy.athletics.value, hindrance.athletics, skills.athletics.hindranceMod);
      skills.stealth.hindranceMod = Math.min(attributes.clumsy.stealth.value, hindrance.stealth, skills.stealth.hindranceMod);
      hindrance.athletics = Math.min(attributes.clumsy.athletics.value, hindrance.athletics, skills.athletics.hindranceMod);
      hindrance.stealth = Math.min(attributes.clumsy.stealth.value, hindrance.stealth, skills.stealth.hindranceMod);
    }
    // Mild Manner Hindrance
    if(attributes.mildmanner) {
      skills.intimidation.hindranceMod = Math.min(attributes.mildmanner.intimidation.value, hindrance.intimidation, skills.intimidation.hindranceMod);
      hindrance.intimidation = Math.min(attributes.mildmanner.intimidation.value, hindrance.intimidation, skills.intimidation.hindranceMod);
    }
    //Spell Energy Rejection Hindrance
    if(attributes.spellenergyrejection) {
    }
    //TongueTied Hindrance
    if(attributes.tonguetied) {
      skills.intimidation.hindranceMod = Math.min(attributes.tonguetied.intimidation.value, hindrance.intimidation, skills.intimidation.hindranceMod);
      skills.performance.hindranceMod = Math.min(attributes.tonguetied.performance.value, hindrance.performance, skills.performance.hindranceMod);
      skills.persuasion.hindranceMod = Math.min(attributes.tonguetied.persuasion.value, hindrance.persuasion, skills.persuasion.hindranceMod);
      hindrance.intimidation = Math.min(attributes.tonguetied.intimidation.value, hindrance.intimidation, skills.intimidation.hindranceMod);
      hindrance.performance = Math.min(attributes.tonguetied.performance.value, hindrance.performance, skills.performance.hindranceMod);
      hindrance.persuasion = Math.min(attributes.tonguetied.persuasion.value, hindrance.persuasion, skills.persuasion.hindranceMod);
    }
    //Ugly Minor Hindrance
    if(attributes.uglyminor) {
      skills.persuasion.hindranceMod = Math.min(attributes.uglyminor.persuasion.value, hindrance.persuasion, skills.persuasion.hindranceMod);
      hindrance.persuasion = Math.min(attributes.uglyminor.persuasion.value, hindrance.persuasion, skills.persuasion.hindranceMod);
    }
    //Ugly Significant Hindrance
    if(attributes.uglysignificant) {
      skills.persuasion.hindranceMod = Math.min(attributes.uglysignificant.persuasion.value, hindrance.persuasion, skills.persuasion.hindranceMod);
      hindrance.persuasion = Math.min(attributes.uglysignificant.persuasion.value, hindrance.persuasion, skills.persuasion.hindranceMod);
    }
    
    
    /* ====================== TRAITS ====================== */

    const trait = {
      perception: 0,
      performance: 0,
      persuasion: 0,
      resistancediscipline: 0,
      resistancemagic: 0,
      resistancepoison: 0,
      resistancereflex: 0,
      resistancestamina: 0
    }

    //Agile Trait
    if(attributes.agile) {
      skills.resistancereflex.traitMod = Math.max(attributes.agile.resistancereflex.value, trait.resistancereflex, skills.resistancereflex.traitMod);
      trait.resistancereflex = Math.max(attributes.agile.resistancereflex.value, trait.resistancereflex, skills.resistancereflex.traitMod);
    }
    //Agile, Improved Trait
    if(attributes.agile) {
      skills.resistancereflex.traitMod = Math.max(attributes.agileimproved.resistancereflex.value, trait.resistancereflex, skills.resistancereflex.traitMod);
      trait.resistancereflex = Math.max(attributes.agile.resistancereflex.value, trait.resistancereflex, skills.resistancereflex.traitMod);
    }
    //Alertness Trait
    if(attributes.alertness) {
      skills.perception.traitMod = Math.max(attributes.alertness.perception.value, trait.perception, skills.perception.traitMod);
      trait.perception = Math.max(attributes.alertness.perception.value, trait.perception, skills.perception.traitMod);
    }
    //Attractive Trait
    if(attributes.attractive) {
      skills.performance.traitMod = Math.max(attributes.attractive.performance.value, trait.performance, skills.performance.traitMod);
      skills.persuasion.traitMod = Math.max(attributes.attractive.persuasion.value, trait.persuasion, skills.persuasion.traitMod);
      trait.performance = Math.max(attributes.attractive.performance.value, trait.performance, skills.performance.traitMod);
      trait.persuasion = Math.max(attributes.attractive.persuasion.value, trait.persuasion, skills.persuasion.traitMod);
    }
    //Core Trait
    if(attributes.core) {
      skills.resistancestamina.traitMod = Math.max(attributes.core.resistancestamina.value, trait.resistancestamina, skills.resistancestamina.traitMod);
      trait.resistancestamina = Math.max(attributes.core.resistancestamina.value, trait.resistancestamina, skills.resistancestamina.traitMod);
    }
    //Core, Improved Trait
    if(attributes.coreimproved) {
      skills.resistancestamina.traitMod = Math.max(attributes.coreimproved.resistancestamina.value, trait.resistancestamina, skills.resistancestamina.traitMod);
      trait.resistancestamina = Math.max(attributes.coreimproved.resistancestamina.value, trait.resistancestamina, skills.resistancestamina.traitMod);
    }
    //Improved Gut Trait
    if(attributes.improvedgut) {
      skills.resistancepoison.traitMod = Math.max(attributes.improvedgut.resistancepoison.value, trait.resistancepoison, skills.resistancepoison.traitMod);
      trait.resistancepoison = Math.max(attributes.improvedgut.resistancepoison.value, trait.resistancepoison, skills.resistancepoison.traitMod);
    }
    //Iron Gut Trait
    if(attributes.irongut) {
      skills.resistancepoison.traitMod = Math.max(attributes.irongut.resistancepoison.value, trait.resistancepoison, skills.resistancepoison.traitMod);
      trait.resistancepoison = Math.max(attributes.irongut.resistancepoison.value, trait.resistancepoison, skills.resistancepoison.traitMod);
    }
    //Iron Will Trait
    if(attributes.ironwilled) {
      skills.resistancediscipline.traitMod = Math.max(attributes.ironwilled.resistancediscipline.value, trait.resistancediscipline, skills.resistancediscipline.traitMod);
      trait.resistancediscipline = Math.max(attributes.ironwilled.resistancediscipline.value, trait.resistancediscipline, skills.resistancediscipline.traitMod);
    }
    //Spell Energies, Improved Reistance Trait
    if(attributes.spellenergiesimprovedresistance) {
      skills.resistancemagic.traitMod = Math.max(attributes.spellenergiesimprovedresistance.resistancemagic.value, trait.resistancemagic, skills.resistancemagic.traitMod);
      trait.resistancemagic = Math.max(attributes.spellenergiesimprovedresistance.resistancemagic.value, trait.resistancemagic, skills.resistancemagic.traitMod);
    }
    //Spell Energies, Resistance Trait
    if(attributes.spellenergiesresistance) {
      skills.resistancemagic.traitMod = Math.max(attributes.spellenergiesresistance.resistancemagic.value, trait.resistancemagic, skills.resistancemagic.traitMod);
      trait.resistancemagic = Math.max(attributes.spellenergiesresistance.resistancemagic.value, trait.resistancemagic, skills.resistancemagic.traitMod);
    }
    //Strong Willed Trait
    if(attributes.strongwilled) {
      skills.resistancediscipline.traitMod = Math.max(attributes.strongwilled.resistancediscipline.value, trait.resistancediscipline, skills.resistancediscipline.traitMod);
      trait.resistancediscipline = Math.max(attributes.strongwilled.resistancediscipline.value, trait.resistancediscipline, skills.resistancediscipline.traitMod);
    }

    console.log("ATTRIBUTES", attributes);
    console.log("ABILITIES", abilities);
    const cybernetics = {
      agi: 0, str: 0, end: 0, qui: 0, def: 0
    }

    /* ====================== CYBERNETIC BOOSTS ====================== */
    // Agility
    if ( (attributes.leftarmagi && attributes.rightarmagi) && 
         (attributes.leftlegagi && attributes.rightlegagi) &&
          attributes.agiaugmentation) {
      cybernetics.agi = Math.max(attributes.agi.traitMod, 6);
    } else if( ((attributes.leftarmagi && attributes.rightarmagi) && (attributes.leftlegagi && attributes.rightlegagi)) || 
               ((attributes.leftarmagi && attributes.rightarmagi) && attributes.agiaugmentation) ||
               ((attributes.leftlegagi && attributes.rightlegagi) && attributes.agiaugmentation) ) {
      cybernetics.agi = Math.max(abilities.agi.traitMod, 4);
    } else if( (attributes.leftarmagi && attributes.rightarmagi) ||
              (attributes.leftlegagi && attributes.rightlegagi) ||
              attributes.agiaugmentation ) {
      cybernetics.agi = Math.max(abilities.agi.traitMod, 2);
    } else if( attributes.leftarmagi || 
               attributes.rightarmagi ||
               attributes.leftlegagi ||
               attributes.rightlegagi ||
               attributes.agiaugmentation) {
      cybernetics.agi = Math.max(abilities.agi.traitMod, 1);
    }

    // Strength
    if ( (attributes.leftarmstr && attributes.rightarmstr) && 
         (attributes.leftlegstr && attributes.rightlegstr) &&
          attributes.straugmentation) {
      cybernetics.str = Math.max(attributes.str.traitMod, 6);
    } else if( ((attributes.leftarmstr && attributes.rightarmstr) && (attributes.leftlegstr && attributes.rightlegstr)) || 
               ((attributes.leftarmstr && attributes.rightarmstr) && attributes.straugmentation) ||
               ((attributes.leftlegstr && attributes.rightlegstr) && attributes.straugmentation) ) {
      cybernetics.str = Math.max(abilities.str.traitMod, 4);
    } else if( (attributes.leftarmstr && attributes.rightarmstr) ||
              (attributes.leftlegstr && attributes.rightlegstr) ||
              attributes.straugmentation ) {
      cybernetics.str = Math.max(abilities.str.traitMod, 2);
    } else if( attributes.leftarmstr || 
               attributes.rightarmstr ||
               attributes.leftlegstr ||
               attributes.rightlegstr ||
               attributes.straugmentation) {
      cybernetics.str = Math.max(abilities.str.traitMod, 1);
    }

    // Endurance
    if (attributes.organreplace && attributes.torsoheadreplace) {
      cybernetics.end = Math.max(abilities.end.traitMod, 4);
    } else if(attributes.organreplace || attributes.torsoheadreplace) {
      cybernetics.end = Math.max(abilities.end.traitMod, 2);
    }

    // Quickness
    if(attributes.wiredreflex) {
      cybernetics.qui = Math.max(abilities.qui.traitMod, 2);
    }

    // Defense
    if(attributes.handtohandreactiondefense) {
      cybernetics.def = 1;
    }

    abilities.agi.cyberMod = cybernetics.agi;
    abilities.str.cyberMod = cybernetics.str;
    abilities.end.cyberMod = cybernetics.end;
    abilities.qui.cyberMod = cybernetics.qui;
    derivedAbilitiesValue.defensemelee.value += cybernetics.def;
    /* ====================== TOTAL SKILLS BONUS ====================== */

    const totals = {
      // cybernetic bonuses
      lockstrapsmechanical: {
        up: skills.lockstrapsmechanical.bonusUp + (attributes.lockpickfinders ? attributes.lockpickfinders : 0) + (attributes.walkingtoolpackage ? attributes.walkingtoolpackage.value : 0),
        down: skills.lockstrapsmechanical.bonusDown + (attributes.lockpickfinders ? attributes.lockpickfinders : 0) + (attributes.walkingtoolpackage ? attributes.walkingtoolpackage.value : 0),
        base: skills.lockstrapsmechanical.bonusBase + (attributes.lockpickfinders ? attributes.lockpickfinders : 0) + (attributes.walkingtoolpackage ? attributes.walkingtoolpackage.value : 0)
      },
      lockstrapselectronic: {
        up: skills.lockstrapselectronic.bonusUp + (attributes.coreelectronicspackage ? attributes.coreelectronicspackage.value : 0) + (attributes.walkingtoolpackage ? attributes.walkingtoolpackage.value : 0),
        down: skills.lockstrapselectronic.bonusDown + (attributes.coreelectronicspackage ? attributes.coreelectronicspackage.value : 0) + (attributes.walkingtoolpackage ? attributes.walkingtoolpackage.value : 0),
        base: skills.lockstrapselectronic.bonusBase + (attributes.coreelectronicspackage ? attributes.coreelectronicspackage.value : 0) + (attributes.walkingtoolpackage ? attributes.walkingtoolpackage.value : 0)
      },
      technicalelectronic: {
        up: skills.technicalelectronic.bonusUp + (attributes.coreelectronicspackage ? attributes.coreelectronicspackage.value : 0) + (attributes.walkingtoolpackage ? attributes.walkingtoolpackage.value : 0) + (attributes.vehicleinterface ? attributes.vehicleinterface.value : 0),
        down: skills.technicalelectronic.bonusDown + (attributes.coreelectronicspackage ? attributes.coreelectronicspackage.value : 0) + (attributes.walkingtoolpackage ? attributes.walkingtoolpackage.value : 0) + (attributes.vehicleinterface ? attributes.vehicleinterface.value : 0),
        base: skills.technicalelectronic.bonusBase + (attributes.coreelectronicspackage ? attributes.coreelectronicspackage.value : 0) + (attributes.walkingtoolpackage ? attributes.walkingtoolpackage.value : 0) + (attributes.vehicleinterface ? attributes.vehicleinterface.value : 0)
      },
      technicalmechanical: {
        up: skills.technicalmechanical.bonusUp + (attributes.coreelectronicspackage ? attributes.coreelectronicspackage.value : 0) + (attributes.walkingtoolpackage ? attributes.walkingtoolpackage.value : 0),
        down: skills.technicalmechanical.bonusDown + (attributes.coreelectronicspackage ? attributes.coreelectronicspackage.value : 0) + (attributes.walkingtoolpackage ? attributes.walkingtoolpackage.value : 0),
        base: skills.technicalmechanical.bonusBase + (attributes.coreelectronicspackage ? attributes.coreelectronicspackage.value : 0) + (attributes.walkingtoolpackage ? attributes.walkingtoolpackage.value : 0)
      },
      technicalsoftware: {
        up: skills.technicalsoftware.bonusUp + (attributes.coreelectronicspackage ? attributes.coreelectronicspackage.value : 0),
        down: skills.technicalsoftware.bonusDown + (attributes.coreelectronicspackage ? attributes.coreelectronicspackage.value : 0),
        base: skills.technicalsoftware.bonusBase + (attributes.coreelectronicspackage ? attributes.coreelectronicspackage.value : 0)
      },
      combatmelee: {
        up: skills.combatmelee.bonusUp + (attributes.handtohandreactioncombat ? attributes.handtohandreactioncombat.value : 0),
        down: skills.combatmelee.bonusDown + (attributes.handtohandreactioncombat ? attributes.handtohandreactioncombat.value : 0),
        base: skills.combatmelee.bonusBase + (attributes.handtohandreactioncombat ? attributes.handtohandreactioncombat.value : 0)
      },
      combatfire: {
        up: skills.combatfire.bonusUp + (attributes.targetingeye ? attributes.targetingeye.value : 0),
        down: skills.combatfire.bonusDown + (attributes.targetingeye ? attributes.targetingeye.value : 0),
        base: skills.combatfire.bonusBase + (attributes.targetingeye ? attributes.targetingeye.value : 0)
      },
      combatmissile: {
        up: skills.combatmissile.bonusUp + (attributes.targetingeye ? attributes.targetingeye.value : 0),
        down: skills.combatmissile.bonusDown + (attributes.targetingeye ? attributes.targetingeye.value : 0),
        base: skills.combatmissile.bonusBase + (attributes.targetingeye ? attributes.targetingeye.value : 0)
      },
      drive: {
        up: skills.drive.bonusUp + (attributes.vehicleinterface ? attributes.vehicleinterface.value : 0),
        down: skills.drive.bonusDown + (attributes.vehicleinterface ? attributes.vehicleinterface.value : 0),
        base: skills.drive.bonusBase + (attributes.vehicleinterface ? attributes.vehicleinterface.value : 0)
      },
      pilot: {
        up: skills.pilot.bonusUp + (attributes.vehicleinterface ? attributes.vehicleinterface.value : 0),
        down: skills.pilot.bonusDown + (attributes.vehicleinterface ? attributes.vehicleinterface.value : 0),
        base: skills.pilot.bonusBase + (attributes.vehicleinterface ? attributes.vehicleinterface.value : 0)
      },
      survival: {
        up: skills.survival.bonusUp + (attributes.wildernessscout ? attributes.wildernessscout.value : 0),
        down: skills.survival.bonusDown + (attributes.wildernessscout ? attributes.wildernessscout.value : 0),
        base: skills.survival.bonusBase + (attributes.wildernessscout ? attributes.wildernessscout.value : 0)
      },
      perception: {
        up: skills.perception.bonusUp + (attributes.environmentalsensors ? attributes.environmentalsensors.value : 0) + (attributes.expandeddetection ? attributes.expandeddetection.value : 0),
        down: skills.perception.bonusDown + (attributes.environmentalsensors ? attributes.environmentalsensors.value : 0) + (attributes.expandeddetection ? attributes.expandeddetection.value : 0),
        base: skills.perception.bonusBase + (attributes.environmentalsensors ? attributes.environmentalsensors.value : 0) + (attributes.expandeddetection ? attributes.expandeddetection.value : 0)
      },
      // hindrance and trait bonuses
      athletics: {
        up: skills.athletics.bonusUp - (hindrance.athletics ? hindrance.athletics : 0) + (trait.athletics ? trait.athletics : 0),
        down: skills.athletics.bonusDown - (hindrance.athletics ? hindrance.athletics : 0) + (trait.athletics ? trait.athletics : 0),
        base: skills.athletics.bonusBase - (hindrance.athletics ? hindrance.athletics : 0) + (trait.athletics ? trait.athletics : 0)
      },
      history: {
        up: skills.history.bonusUp - (hindrance.history ? hindrance.history : 0) + (trait.history ? trait.history : 0),
        down: skills.history.bonusDown - (hindrance.history ? hindrance.history : 0) + (trait.history ? trait.history : 0),
        base: skills.history.bonusBase - (hindrance.history ? hindrance.history : 0) + (trait.history ? trait.history : 0)
      },
      intimidation: {
        up: skills.intimidation.bonusUp - (hindrance.intimidation ? hindrance.intimidation : 0) + (trait.intimidation ? trait.intimidation : 0),
        down: skills.intimidation.bonusDown - (hindrance.intimidation ? hindrance.intimidation : 0) + (trait.intimidation ? trait.intimidation : 0),
        base: skills.intimidation.bonusBase - (hindrance.intimidation ? hindrance.intimidation : 0) + (trait.intimidation ? trait.intimidation : 0)
      },
      perception: {
        up: skills.perception.bonusUp - (hindrance.perception ? hindrance.perception : 0) + (trait.perception ? trait.perception : 0),
        down: skills.perception.bonusDown - (hindrance.perception ? hindrance.perception : 0) + (trait.perception ? trait.perception : 0),
        base: skills.perception.bonusBase - (hindrance.perception ? hindrance.perception : 0) + (trait.perception ? trait.perception : 0)
      },
      performance: {
        up: skills.performance.bonusUp - (hindrance.performance ? hindrance.performance : 0) + (trait.performance ? trait.performance : 0),
        down: skills.performance.bonusDown - (hindrance.performance ? hindrance.performance : 0) + (trait.performance ? trait.performance : 0),
        base: skills.performance.bonusBase - (hindrance.performance ? hindrance.performance : 0) + (trait.performance ? trait.performance : 0)
      },
      persuasion: {
        up: skills.persuasion.bonusUp - (hindrance.persuasion ? hindrance.persuasion : 0) + (trait.persuasion ? trait.persuasion : 0),
        down: skills.persuasion.bonusDown - (hindrance.persuasion ? hindrance.persuasion : 0) + (trait.persuasion ? trait.persuasion : 0),
        base: skills.persuasion.bonusBase - (hindrance.persuasion ? hindrance.persuasion : 0) + (trait.persuasion ? trait.persuasion : 0)
      },
      resistancediscipline: {
        up: skills.resistancediscipline.bonusUp - (hindrance.resistancediscipline ? hindrance.resistancediscipline : 0) + (trait.resistancediscipline ? trait.resistancediscipline : 0),
        down: skills.resistancediscipline.bonusDown - (hindrance.resistancediscipline ? hindrance.resistancediscipline : 0) + (trait.resistancediscipline ? trait.resistancediscipline : 0),
        base: skills.resistancediscipline.bonusBase - (hindrance.resistancediscipline ? hindrance.resistancediscipline : 0) + (trait.resistancediscipline ? trait.resistancediscipline : 0)
      },
      resistancemagic: {
        up: skills.resistancemagic.bonusUp - (hindrance.resistancemagic ? hindrance.resistancemagic : 0) + (trait.resistancemagic ? trait.resistancemagic : 0),
        down: skills.resistancemagic.bonusDown - (hindrance.resistancemagic ? hindrance.resistancemagic : 0) + (trait.resistancemagic ? trait.resistancemagic : 0),
        base: skills.resistancemagic.bonusBase - (hindrance.resistancemagic ? hindrance.resistancemagic : 0) + (trait.resistancemagic ? trait.resistancemagic : 0)
      },
      resistancepoison: {
        up: skills.resistancepoison.bonusUp - (hindrance.resistancepoison ? hindrance.resistancepoison : 0) + (trait.resistancepoison ? trait.resistancepoison : 0),
        down: skills.resistancepoison.bonusDown - (hindrance.resistancepoison ? hindrance.resistancepoison : 0) + (trait.resistancepoison ? trait.resistancepoison : 0),
        base: skills.resistancepoison.bonusBase - (hindrance.resistancepoison ? hindrance.resistancepoison : 0) + (trait.resistancepoison ? trait.resistancepoison : 0)
      },
      resistancereflex: {
        up: skills.resistancereflex.bonusUp - (hindrance.resistancereflex ? hindrance.resistancereflex : 0) + (trait.resistancereflex ? trait.resistancereflex : 0),
        down: skills.resistancereflex.bonusDown - (hindrance.resistancereflex ? hindrance.resistancereflex : 0) + (trait.resistancereflex ? trait.resistancereflex : 0),
        base: skills.resistancereflex.bonusBase - (hindrance.resistancereflex ? hindrance.resistancereflex : 0) + (trait.resistancereflex ? trait.resistancereflex : 0)
      },
      resistancestamina: {
        up: skills.resistancestamina.bonusUp - (hindrance.resistancestamina ? hindrance.resistancestamina : 0) + (trait.resistancestamina ? trait.resistancestamina : 0),
        down: skills.resistancestamina.bonusDown - (hindrance.resistancestamina ? hindrance.resistancestamina : 0) + (trait.resistancestamina ? trait.resistancestamina : 0),
        base: skills.resistancestamina.bonusBase - (hindrance.resistancestamina ? hindrance.resistancestamina : 0) + (trait.resistancestamina ? trait.resistancestamina : 0)
      },
      stealth: {
        up: skills.stealth.bonusUp - (hindrance.stealth ? hindrance.stealth : 0) + (trait.stealth ? trait.stealth : 0),
        down: skills.stealth.bonusDown - (hindrance.stealth ? hindrance.stealth : 0) + (trait.stealth ? trait.stealth : 0),
        base: skills.stealth.bonusBase - (hindrance.stealth ? hindrance.stealth : 0) + (trait.stealth ? trait.stealth : 0)
      }
    }

    skills.lockstrapsmechanical.totalUp = totals.lockstrapsmechanical.up;
    skills.lockstrapsmechanical.totalDown = totals.lockstrapsmechanical.down;
    skills.lockstrapsmechanical.totalBase = totals.lockstrapsmechanical.base;
    skills.lockstrapsmechanical.isNegUp = totals.lockstrapsmechanical.up < 0;
    skills.lockstrapsmechanical.isNegDown = totals.lockstrapsmechanical.down < 0;
    skills.lockstrapsmechanical.isNegBase = totals.lockstrapsmechanical.base < 0;

    skills.lockstrapselectronic.totalUp = totals.lockstrapselectronic.up;
    skills.lockstrapselectronic.totalDown = totals.lockstrapselectronic.down;
    skills.lockstrapselectronic.totalBase = totals.lockstrapselectronic.base;
    skills.lockstrapselectronic.isNegUp = totals.lockstrapselectronic.up < 0;
    skills.lockstrapselectronic.isNegDown = totals.lockstrapselectronic.down < 0;
    skills.lockstrapselectronic.isNegBase = totals.lockstrapselectronic.base < 0;

    skills.technicalelectronic.totalUp = totals.technicalelectronic.up;
    skills.technicalelectronic.totalDown = totals.technicalelectronic.down;
    skills.technicalelectronic.totalBase = totals.technicalelectronic.base;
    skills.technicalelectronic.isNegUp = totals.technicalelectronic.up < 0;
    skills.technicalelectronic.isNegDown = totals.technicalelectronic.down < 0;
    skills.technicalelectronic.isNegBase = totals.technicalelectronic.base < 0;

    skills.technicalmechanical.totalUp = totals.technicalmechanical.up;
    skills.technicalmechanical.totalDown = totals.technicalmechanical.down;
    skills.technicalmechanical.totalBase = totals.technicalmechanical.base;
    skills.technicalmechanical.isNegUp = totals.technicalmechanical.up < 0;
    skills.technicalmechanical.isNegDown = totals.technicalmechanical.down < 0;
    skills.technicalmechanical.isNegBase = totals.technicalmechanical.base < 0;

    skills.technicalsoftware.totalUp = totals.technicalsoftware.up;
    skills.technicalsoftware.totalDown = totals.technicalsoftware.down;
    skills.technicalsoftware.totalBase = totals.technicalsoftware.base;
    skills.technicalsoftware.isNegUp = totals.technicalsoftware.up < 0;
    skills.technicalsoftware.isNegDown = totals.technicalsoftware.down < 0;
    skills.technicalsoftware.isNegBase = totals.technicalsoftware.base < 0;

    skills.combatmelee.totalUp = totals.combatmelee.up;
    skills.combatmelee.totalDown = totals.combatmelee.down;
    skills.combatmelee.totalBase = totals.combatmelee.base;
    skills.combatmelee.isNegUp = totals.combatmelee.up < 0;
    skills.combatmelee.isNegDown = totals.combatmelee.down < 0;
    skills.combatmelee.isNegBase = totals.combatmelee.base < 0;

    skills.combatfire.totalUp = totals.combatfire.up;
    skills.combatfire.totalDown = totals.combatfire.down;
    skills.combatfire.totalBase = totals.combatfire.base;
    skills.combatfire.isNegUp = totals.combatfire.up < 0;
    skills.combatfire.isNegDown = totals.combatfire.down < 0;
    skills.combatfire.isNegBase = totals.combatfire.base < 0;

    skills.combatmissile.totalUp = totals.combatmissile.up;
    skills.combatmissile.totalDown = totals.combatmissile.down;
    skills.combatmissile.totalBase = totals.combatmissile.base;
    skills.combatmissile.isNegUp = totals.combatmissile.up < 0;
    skills.combatmissile.isNegDown = totals.combatmissile.down < 0;
    skills.combatmissile.isNegBase = totals.combatmissile.base < 0;

    skills.drive.totalUp = totals.drive.up;
    skills.drive.totalDown = totals.drive.down;
    skills.drive.totalBase = totals.drive.base;
    skills.drive.isNegUp = totals.drive.up < 0;
    skills.drive.isNegDown = totals.drive.down < 0;
    skills.drive.isNegBase = totals.drive.base < 0;

    skills.pilot.totalUp = totals.pilot.up;
    skills.pilot.totalDown = totals.pilot.down;
    skills.pilot.totalBase = totals.pilot.base;
    skills.pilot.isNegUp = totals.pilot.up < 0;
    skills.pilot.isNegDown = totals.pilot.down < 0;
    skills.pilot.isNegBase = totals.pilot.base < 0;

    skills.survival.totalUp = totals.survival.up;
    skills.survival.totalDown = totals.survival.down;
    skills.survival.totalBase = totals.survival.base;
    skills.survival.isNegUp = totals.survival.up < 0;
    skills.survival.isNegDown = totals.survival.down < 0;
    skills.survival.isNegBase = totals.survival.base < 0;

    skills.perception.totalUp = totals.perception.up;
    skills.perception.totalDown = totals.perception.down;
    skills.perception.totalBase = totals.perception.base;
    skills.perception.isNegUp = totals.perception.up < 0;
    skills.perception.isNegDown = totals.perception.down < 0;
    skills.perception.isNegBase = totals.perception.base < 0;

    skills.athletics.totalUp = totals.athletics.up;
    skills.athletics.totalDown = totals.athletics.down;
    skills.athletics.totalBase = totals.athletics.base;
    skills.athletics.isNegUp = totals.athletics.up < 0;
    skills.athletics.isNegDown = totals.athletics.down < 0;
    skills.athletics.isNegBase = totals.athletics.base < 0;

    skills.history.totalUp = totals.history.up;
    skills.history.totalDown = totals.history.down;
    skills.history.totalBase = totals.history.base;
    skills.history.isNegUp = totals.history.up < 0;
    skills.history.isNegDown = totals.history.down < 0;
    skills.history.isNegBase = totals.history.base < 0;

    skills.intimidation.totalUp = totals.intimidation.up;
    skills.intimidation.totalDown = totals.intimidation.down;
    skills.intimidation.totalBase = totals.intimidation.base;
    skills.intimidation.isNegUp = totals.intimidation.up < 0;
    skills.intimidation.isNegDown = totals.intimidation.down < 0;
    skills.intimidation.isNegBase = totals.intimidation.base < 0;

    skills.perception.totalUp = totals.perception.up;
    skills.perception.totalDown = totals.perception.down;
    skills.perception.totalBase = totals.perception.base;
    skills.perception.isNegUp = totals.perception.up < 0;
    skills.perception.isNegDown = totals.perception.down < 0;
    skills.perception.isNegBase = totals.perception.base < 0;

    skills.performance.totalUp = totals.performance.up;
    skills.performance.totalDown = totals.performance.down;
    skills.performance.totalBase = totals.performance.base;
    skills.performance.isNegUp = totals.performance.up < 0;
    skills.performance.isNegDown = totals.performance.down < 0;
    skills.performance.isNegBase = totals.performance.base < 0;

    skills.persuasion.totalUp = totals.persuasion.up;
    skills.persuasion.totalDown = totals.persuasion.down;
    skills.persuasion.totalBase = totals.persuasion.base;
    skills.persuasion.isNegUp = totals.persuasion.up < 0;
    skills.persuasion.isNegDown = totals.persuasion.down < 0;
    skills.persuasion.isNegBase = totals.persuasion.base < 0;

    skills.resistancediscipline.totalUp = totals.resistancediscipline.up;
    skills.resistancediscipline.totalDown = totals.resistancediscipline.down;
    skills.resistancediscipline.totalBase = totals.resistancediscipline.base;
    skills.resistancediscipline.isNegUp = totals.resistancediscipline.up < 0;
    skills.resistancediscipline.isNegDown = totals.resistancediscipline.down < 0;
    skills.resistancediscipline.isNegBase = totals.resistancediscipline.base < 0;

    skills.resistancemagic.totalUp = totals.resistancemagic.up;
    skills.resistancemagic.totalDown = totals.resistancemagic.down;
    skills.resistancemagic.totalBase = totals.resistancemagic.base;
    skills.resistancemagic.isNegUp = totals.resistancemagic.up < 0;
    skills.resistancemagic.isNegDown = totals.resistancemagic.down < 0;
    skills.resistancemagic.isNegBase = totals.resistancemagic.base < 0;

    skills.resistancepoison.totalUp = totals.resistancepoison.up;
    skills.resistancepoison.totalDown = totals.resistancepoison.down;
    skills.resistancepoison.totalBase = totals.resistancepoison.base;
    skills.resistancepoison.isNegUp = totals.resistancepoison.up < 0;
    skills.resistancepoison.isNegDown = totals.resistancepoison.down < 0;
    skills.resistancepoison.isNegBase = totals.resistancepoison.base < 0;

    skills.resistancereflex.totalUp = totals.resistancereflex.up;
    skills.resistancereflex.totalDown = totals.resistancereflex.down;
    skills.resistancereflex.totalBase = totals.resistancereflex.base;
    skills.resistancereflex.isNegUp = totals.resistancereflex.up < 0;
    skills.resistancereflex.isNegDown = totals.resistancereflex.down < 0;
    skills.resistancereflex.isNegBase = totals.resistancereflex.base < 0;

    skills.resistancestamina.totalUp = totals.resistancestamina.up;
    skills.resistancestamina.totalDown = totals.resistancestamina.down;
    skills.resistancestamina.totalBase = totals.resistancestamina.base;
    skills.resistancestamina.isNegUp = totals.resistancestamina.up < 0;
    skills.resistancestamina.isNegDown = totals.resistancestamina.down < 0;
    skills.resistancestamina.isNegBase = totals.resistancestamina.base < 0;

    skills.stealth.totalUp = totals.stealth.up;
    skills.stealth.totalDown = totals.stealth.down;
    skills.stealth.totalBase = totals.stealth.base;
    skills.stealth.isNegUp = totals.stealth.up < 0;
    skills.stealth.isNegDown = totals.stealth.down < 0;
    skills.stealth.isNegBase = totals.stealth.base < 0;

    console.log("prepareDerivedDataActor2", actorData);
  }

  /**
   * 
   * @override
   * Augment the actor's default getRollData() method by appending the data object
   * generated by the its DataModel's getRollData(), or null. This polymorphic 
   * approach is useful when you have actors & items that share a parent Document, 
   * but have slightly different data preparation needs.
   */
  getRollData() {
    return { ...super.getRollData(), ...this.system.getRollData?.() ?? null };
  }

  /**
   * Convert the actor document to a plain object.
   * 
   * The built in `toObject()` method will ignore derived data when using Data Models.
   * This additional method will instead use the spread operator to return a simplified
   * version of the data.
   * 
   * @returns {object} Plain object either via deepClone or the spread operator.
   */
  toPlainObject() {
    const result = {...this};

    // Simplify system data.
    result.system = this.system.toPlainObject();

    // Add items.
    result.items = this.items?.size > 0 ? this.items.contents : [];

    // Add effects.
    result.effects = this.effects?.size > 0 ? this.effects.contents : [];

    return result;
  }

}
