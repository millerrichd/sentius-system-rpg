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
  defense: 'SENTIUS_RPG.DerivedAbilityValue.Defense.long',
  fatigue: 'SENTIUS_RPG.DerivedAbilityValue.Fatigue.long',
  initiative: 'SENTIUS_RPG.DerivedAbilityValue.Initiative.long',
  pace: 'SENTIUS_RPG.DerivedAbilityValue.Pace.long',
  stability: 'SENTIUS_RPG.DerivedAbilityValue.Stability.long'
};

SENTIUS_RPG.derivedAbilitiesValueAbbreviations = {
  defense: 'SENTIUS_RPG.DerivedAbilityValue.Def.abbr',
  fatigue: 'SENTIUS_RPG.DerivedAbilityValue.Fat.abbr',
  initiative: 'SENTIUS_RPG.DerivedAbilityValue.Ini.abbr',
  pace: 'SENTIUS_RPG.DerivedAbilityValue.Pac.abbr',
  stability: 'SENTIUS_RPG.DerivedAbilityValue.Sta.abbr'
};

SENTIUS_RPG.derivedAbilitiesPool = {
  faith: 'SENTIUS_RPG.DerivedAbilityPool.Faith.long',
  health: 'SENTIUS_RPG.DerivedAbilityPool.Health.long',
  mana: 'SENTIUS_RPG.DerivedAbilityPool.Mana.long',
  paceDie: 'SENTIUS_RPG.DerivedAbilityPool.PaceDie.long',
  psychic: 'SENTIUS_RPG.DerivedAbilityPool.Psychic.long',
};

SENTIUS_RPG.derivedAbilitiesPoolAbbreviations = {
  faith: 'SENTIUS_RPG.DerivedAbilityPool.Fth.abbr',
  health: 'SENTIUS_RPG.DerivedAbilityPool.Hea.abbr',
  mana: 'SENTIUS_RPG.DerivedAbilityPool.Man.abbr',
  paceDie: 'SENTIUS_RPG.DerivedAbilityPool.PacD.abbr',
  psychic: 'SENTIUS_RPG.DerivedAbilityPool.Psy.abbr',
};
