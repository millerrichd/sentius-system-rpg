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
    const flags = actorData.flags.sentiusrpg || {};

    console.log("prepareDerivedDataActor1", actorData);

    /* ====================== HINDRANCES ====================== */

    const hindrance = {
      athletics: 0,
      history: 0,
      intimidation: 0,
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

    console.log("RESULTS ACTOR.MJS", result);

    return result;
  }

}
