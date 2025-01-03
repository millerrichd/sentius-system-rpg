export const SENTIUS_RPG = {};

/**
 * The set of Ability Scores used within the system.
 * @type {Object}
 */
SENTIUS_RPG.abilities = {
  agi: 'SENTIUS_RPG.Ability.Agi.long',
  end: 'SENTIUS_RPG.Ability.End.long',
  qui: 'SENTIUS_RPG.Ability.Qui.long',
  str: 'SENTIUS_RPG.Ability.Str.long',
  int: 'SENTIUS_RPG.Ability.Int.long',
  pre: 'SENTIUS_RPG.Ability.Pre.long',
  rea: 'SENTIUS_RPG.Ability.Rea.long',
  wil: 'SENTIUS_RPG.Ability.Wil.long'
};

SENTIUS_RPG.abilityAbbreviations = {
  agi: 'SENTIUS_RPG.Ability.Agi.abbr',
  end: 'SENTIUS_RPG.Ability.End.abbr',
  qui: 'SENTIUS_RPG.Ability.Qui.abbr',
  str: 'SENTIUS_RPG.Ability.Str.abbr',
  int: 'SENTIUS_RPG.Ability.Int.abbr',
  pre: 'SENTIUS_RPG.Ability.Pre.abbr',
  rea: 'SENTIUS_RPG.Ability.Rea.abbr',
  wil: 'SENTIUS_RPG.Ability.Wil.abbr'
};

SENTIUS_RPG.derivedAbilitiesValue = {
  defensemelee: 'SENTIUS_RPG.DerivedAbilityValue.DefenseMelee.long',
  defenserange: 'SENTIUS_RPG.DerivedAbilityValue.DefenseRange.long',
  encumbrance: 'SENTIUS_RPG.DerivedAbilityValue.Encumbrance.long',
  fatigue: 'SENTIUS_RPG.DerivedAbilityValue.Fatigue.long',
  initiative: 'SENTIUS_RPG.DerivedAbilityValue.Initiative.long',
  pace: 'SENTIUS_RPG.DerivedAbilityValue.Pace.long',
  stability: 'SENTIUS_RPG.DerivedAbilityValue.Stability.long'
};

SENTIUS_RPG.derivedAbilitiesValueAbbreviations = {
  defensemelee: 'SENTIUS_RPG.DerivedAbilityValue.Dfm.abbr',
  defenserange: 'SENTIUS_RPG.DerivedAbilityValue.Dfr.abbr',
  encumbrance: 'SENTIUS_RPG.DerivedAbilityValue.Enc.abbr',
  fatigue: 'SENTIUS_RPG.DerivedAbilityValue.Fat.abbr',
  initiative: 'SENTIUS_RPG.DerivedAbilityValue.Ini.abbr',
  pace: 'SENTIUS_RPG.DerivedAbilityValue.Pac.abbr',
  stability: 'SENTIUS_RPG.DerivedAbilityValue.Sta.abbr'
};

SENTIUS_RPG.derivedAbilitiesPool = {
  cybernetic: 'SENTIUS_RPG.DerivedAbilityPool.Cybernetic.long',
  faith: 'SENTIUS_RPG.DerivedAbilityPool.Faith.long',
  health: 'SENTIUS_RPG.DerivedAbilityPool.Health.long',
  mana: 'SENTIUS_RPG.DerivedAbilityPool.Mana.long',
  paceDie: 'SENTIUS_RPG.DerivedAbilityPool.PaceDie.long',
  psychic: 'SENTIUS_RPG.DerivedAbilityPool.Psychic.long',
};

SENTIUS_RPG.derivedAbilitiesPoolAbbreviations = {
  cybernetics: 'SENTIUS_RPG.DerivedAbilityPool.Cyb.abbr',
  faith: 'SENTIUS_RPG.DerivedAbilityPool.Fth.abbr',
  health: 'SENTIUS_RPG.DerivedAbilityPool.Hea.abbr',
  mana: 'SENTIUS_RPG.DerivedAbilityPool.Man.abbr',
  paceDie: 'SENTIUS_RPG.DerivedAbilityPool.PacD.abbr',
  psychic: 'SENTIUS_RPG.DerivedAbilityPool.Psy.abbr',
};

SENTIUS_RPG.skills = {
  animalhandling: 'SENTIUS_RPG.Skill.AnimalHandling.long',
  athletics: 'SENTIUS_RPG.Skill.Athletics.long',
  combatfire: 'SENTIUS_RPG.Skill.CombatFirearms.long',
  combatgunnery: 'SENTIUS_RPG.Skill.CombatGunnery.long',
  combatmelee: 'SENTIUS_RPG.Skill.CombatMelee.long',
  combatmissile: 'SENTIUS_RPG.Skill.CombatMissile.long',
  computers: 'SENTIUS_RPG.Skill.Computers.long',
  demolitions: 'SENTIUS_RPG.Skill.Demolitions.long',
  disguise: 'SENTIUS_RPG.Skill.Disguise.long',
  drive: 'SENTIUS_RPG.Skill.Drive.long',
  history: 'SENTIUS_RPG.Skill.History.long',
  intimidation: 'SENTIUS_RPG.Skill.Intimidation.long',
  lockstrapselectronic: 'SENTIUS_RPG.Skill.LockstrapsElectronic.long',
  lockstrapsmechanical: 'SENTIUS_RPG.Skill.LockstrapsMechanical.long',
  medicine: 'SENTIUS_RPG.Skill.Medicine.long',
  perception: 'SENTIUS_RPG.Skill.Perception.long',
  performance: 'SENTIUS_RPG.Skill.Performance.long',
  persuasion: 'SENTIUS_RPG.Skill.Persuasion.long',
  pilot:  'SENTIUS_RPG.Skill.Pilot.long',
  resistancediscipline: 'SENTIUS_RPG.Skill.ResistanceDiscipline.long',
  resistancemagic: 'SENTIUS_RPG.Skill.ResistanceMagic.long',
  resistancepoison: 'SENTIUS_RPG.Skill.ResistancePoison.long',
  resistancereflex: 'SENTIUS_RPG.Skill.ResistanceReflex.long',
  resistancestamina: 'SENTIUS_RPG.Skill.ResistanceStamina.long',
  stealth: 'SENTIUS_RPG.Skill.Stealth.long',
  survival: 'SENTIUS_RPG.Skill.Survival.long',
  technicalbiological: 'SENTIUS_RPG.Skill.TechnicalBiological.long',
  technicalcybernetics: 'SENTIUS_RPG.Skill.TechnicalCybernetics.long',
  technicalelectronic: 'SENTIUS_RPG.Skill.TechnicalElectronic.long',
  technicalmechanical: 'SENTIUS_RPG.Skill.TechnicalMechanical.long',
  technicalpower: 'SENTIUS_RPG.Skill.TechnicalPower.long',
  technicalsoftware: 'SENTIUS_RPG.Skill.TechnicalSoftware.long'
}

SENTIUS_RPG.skillsAbbreviations = {
  animalhandling: 'SENTIUS_RPG.Skill.AnimalHandling.abbr',
  athletics: 'SENTIUS_RPG.Skill.Athletics.abbr',
  combatfire: 'SENTIUS_RPG.Skill.CombatFirearms.abbr',
  combatgunnery: 'SENTIUS_RPG.Skill.CombatGunnery.abbr',
  combatmelee: 'SENTIUS_RPG.Skill.CombatMelee.abbr',
  combatmissile: 'SENTIUS_RPG.Skill.CombatMissile.abbr',
  computers: 'SENTIUS_RPG.Skill.Computers.abbr',
  demolitions: 'SENTIUS_RPG.Skill.Demolitions.abbr',
  disguise: 'SENTIUS_RPG.Skill.Disguise.abbr',
  drive: 'SENTIUS_RPG.Skill.Drive.abbr',
  history: 'SENTIUS_RPG.Skill.History.abbr',
  intimidation: 'SENTIUS_RPG.Skill.Intimidation.abbr',
  lockstrapselectronic: 'SENTIUS_RPG.Skill.LockstrapsElectronic.abbr',
  lockstrapsmechanical: 'SENTIUS_RPG.Skill.LockstrapsMechanical.abbr',
  medicine: 'SENTIUS_RPG.Skill.Medicine.abbr',
  perception: 'SENTIUS_RPG.Skill.Perception.abbr',
  performance: 'SENTIUS_RPG.Skill.Performance.abbr',
  persuasion: 'SENTIUS_RPG.Skill.Persuasion.abbr',
  pilot:  'SENTIUS_RPG.Skill.Pilot.abbr',
  resistancediscipline: 'SENTIUS_RPG.Skill.ResistanceDiscipline.abbr',
  resistancemagic: 'SENTIUS_RPG.Skill.ResistanceMagic.abbr',
  resistancereflex: 'SENTIUS_RPG.Skill.ResistanceReflex.abbr',
  resistancestamina: 'SENTIUS_RPG.Skill.ResistanceStamina.abbr',
  stealth: 'SENTIUS_RPG.Skill.Stealth.abbr',
  survival: 'SENTIUS_RPG.Skill.Survival.abbr',
  technicalbiological: 'SENTIUS_RPG.Skill.TechnicalBiological.abbr',
  technicalcybernetics: 'SENTIUS_RPG.Skill.TechnicalCybernetics.abbr',
  technicalelectronic: 'SENTIUS_RPG.Skill.TechnicalElectronic.abbr',
  technicalmechanical: 'SENTIUS_RPG.Skill.TechnicalMechanical.abbr',
  technicalpower: 'SENTIUS_RPG.Skill.TechnicalPower.abbr',
  technicalsoftware: 'SENTIUS_RPG.Skill.TechnicalSoftware.abbr'
}

SENTIUS_RPG.spellActions = {
  armor: 'SENTIUS_RPG.SpellAction.Armor.long',
  create: 'SENTIUS_RPG.SpellAction.Create.long',
  destroy: 'SENTIUS_RPG.SpellAction.Destroy.long',
  repair: 'SENTIUS_RPG.SpellAction.Repair.long',
  shield: 'SENTIUS_RPG.SpellAction.Shield.long',
  transform: 'SENTIUS_RPG.SpellAction.Transform.long',
  banish: 'SENTIUS_RPG.SpellAction.Banish.long',
  control: 'SENTIUS_RPG.SpellAction.Control.long',
  summon: 'SENTIUS_RPG.SpellAction.Summon.long'
}

SENTIUS_RPG.spellActionsAbbreviations = {
  armor: 'SENTIUS_RPG.SpellAction.Armor.abbr',
  create: 'SENTIUS_RPG.SpellAction.Create.abbr',
  destroy: 'SENTIUS_RPG.SpellAction.Destroy.abbr', 
  repair: 'SENTIUS_RPG.SpellAction.Repair.abbr',
  shield: 'SENTIUS_RPG.SpellAction.Shield.abbr',
  transform: 'SENTIUS_RPG.SpellAction.Transform.abbr',
  banish: 'SENTIUS_RPG.SpellAction.Banish.abbr',
  control: 'SENTIUS_RPG.SpellAction.Control.abbr',
  summon: 'SENTIUS_RPG.SpellAction.Summon.abbr'
}

SENTIUS_RPG.spellPowers = {
  air: 'SENTIUS_RPG.SpellPower.Air.long',
  animal: 'SENTIUS_RPG.SpellPower.Animal.long',
  dark: 'SENTIUS_RPG.SpellPower.Dark.long',
  earth: 'SENTIUS_RPG.SpellPower.Earth.long',
  fire: 'SENTIUS_RPG.SpellPower.Fire.long',
  force: 'SENTIUS_RPG.SpellPower.Force.long',
  light: 'SENTIUS_RPG.SpellPower.Light.long',
  plant: 'SENTIUS_RPG.SpellPower.Plant.long',
  water: 'SENTIUS_RPG.SpellPower.Water.long',
  ash: 'SENTIUS_RPG.SpellPower.Ash.long',
  fissure: 'SENTIUS_RPG.SpellPower.Fissure.long',
  lava: 'SENTIUS_RPG.SpellPower.Lava.long',
  mist: 'SENTIUS_RPG.SpellPower.Mist.long',
  mud: 'SENTIUS_RPG.SpellPower.Mud.long',
  steam: 'SENTIUS_RPG.SpellPower.Steam.long',
  angelic: 'SENTIUS_RPG.SpellPower.Angelic.long',
  demonic: 'SENTIUS_RPG.SpellPower.Demonic.long',
  spirit: 'SENTIUS_RPG.SpellPower.Spirit.long'
}

SENTIUS_RPG.spellPowersAbbreviations = {
  air: 'SENTIUS_RPG.SpellPower.Air.abbr',
  animal: 'SENTIUS_RPG.SpellPower.Animal.abbr',
  dark: 'SENTIUS_RPG.SpellPower.Dark.abbr',
  earth: 'SENTIUS_RPG.SpellPower.Earth.abbr',
  fire: 'SENTIUS_RPG.SpellPower.Fire.abbr',
  force: 'SENTIUS_RPG.SpellPower.Force.abbr',
  light: 'SENTIUS_RPG.SpellPower.Light.abbr',
  plant: 'SENTIUS_RPG.SpellPower.Plant.abbr',
  water: 'SENTIUS_RPG.SpellPower.Water.abbr',
  ash: 'SENTIUS_RPG.SpellPower.Ash.abbr',
  fissure: 'SENTIUS_RPG.SpellPower.Fissure.abbr',
  lava: 'SENTIUS_RPG.SpellPower.Lava.abbr',
  mist: 'SENTIUS_RPG.SpellPower.Mist.abbr',
  mud: 'SENTIUS_RPG.SpellPower.Mud.abbr',
  steam: 'SENTIUS_RPG.SpellPower.Steam.abbr',
  angelic: 'SENTIUS_RPG.SpellPower.Angelic.abbr',
  demonic: 'SENTIUS_RPG.SpellPower.Demonic.abbr',
  spirit: 'SENTIUS_RPG.SpellPower.Spirit.abbr'
}

SENTIUS_RPG.spellTargets = {
  it: 'SENTIUS_RPG.SpellTarget.It.long',
  me: 'SENTIUS_RPG.SpellTarget.Me.long',
  them: 'SENTIUS_RPG.SpellTarget.Them.long',
  there: 'SENTIUS_RPG.SpellTarget.There.long',
  you: 'SENTIUS_RPG.SpellTarget.You.long'
}

SENTIUS_RPG.spellTargetsAbbreviations = {
  it: 'SENTIUS_RPG.SpellTarget.It.abbr',
  me: 'SENTIUS_RPG.SpellTarget.Me.abbr',
  them: 'SENTIUS_RPG.SpellTarget.Them.abbr',
  there: 'SENTIUS_RPG.SpellTarget.There.abbr',
  you: 'SENTIUS_RPG.SpellTarget.You.abbr'
}