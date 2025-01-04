/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export const preloadHandlebarsTemplates = async function () {
  return loadTemplates([
    // Actor partials.
    'systems/sentius-rpg/templates/actor/parts/actor-header.hbs',
    'systems/sentius-rpg/templates/actor/parts/actor-abilities.hbs',
    'systems/sentius-rpg/templates/actor/parts/actor-hindrances.hbs',
    'systems/sentius-rpg/templates/actor/parts/actor-skills.hbs',
    'systems/sentius-rpg/templates/actor/parts/actor-spells.hbs',
    'systems/sentius-rpg/templates/actor/parts/actor-traits.hbs',
    'systems/sentius-rpg/templates/actor/parts/actor-effects.hbs',

    // Sub Tabs of Gear
    'systems/sentius-rpg/templates/actor/parts/actor-combo-wapa.hbs',
    'systems/sentius-rpg/templates/actor/parts/actor-cybernetics.hbs',
    'systems/sentius-rpg/templates/actor/parts/actor-equipment.hbs',
    'systems/sentius-rpg/templates/actor/parts/actor-vehicle.hbs',

    // Spell Energies Partials
    // Actions
    'systems/sentius-rpg/templates/actor/parts/spellenergies/actor-spellenergy-armor.hbs',
    'systems/sentius-rpg/templates/actor/parts/spellenergies/actor-spellenergy-create.hbs',
    'systems/sentius-rpg/templates/actor/parts/spellenergies/actor-spellenergy-destroy.hbs',
    'systems/sentius-rpg/templates/actor/parts/spellenergies/actor-spellenergy-repair.hbs',
    'systems/sentius-rpg/templates/actor/parts/spellenergies/actor-spellenergy-shield.hbs',
    'systems/sentius-rpg/templates/actor/parts/spellenergies/actor-spellenergy-transform.hbs',
    'systems/sentius-rpg/templates/actor/parts/spellenergies/actor-spellenergy-banish.hbs',
    'systems/sentius-rpg/templates/actor/parts/spellenergies/actor-spellenergy-control.hbs',
    'systems/sentius-rpg/templates/actor/parts/spellenergies/actor-spellenergy-summon.hbs',
    // Powers
    'systems/sentius-rpg/templates/actor/parts/spellenergies/actor-spellenergy-air.hbs',
    'systems/sentius-rpg/templates/actor/parts/spellenergies/actor-spellenergy-animal.hbs',
    'systems/sentius-rpg/templates/actor/parts/spellenergies/actor-spellenergy-dark.hbs',
    'systems/sentius-rpg/templates/actor/parts/spellenergies/actor-spellenergy-earth.hbs',
    'systems/sentius-rpg/templates/actor/parts/spellenergies/actor-spellenergy-fire.hbs',
    'systems/sentius-rpg/templates/actor/parts/spellenergies/actor-spellenergy-force.hbs',
    'systems/sentius-rpg/templates/actor/parts/spellenergies/actor-spellenergy-light.hbs',
    'systems/sentius-rpg/templates/actor/parts/spellenergies/actor-spellenergy-plant.hbs',
    'systems/sentius-rpg/templates/actor/parts/spellenergies/actor-spellenergy-water.hbs',
    'systems/sentius-rpg/templates/actor/parts/spellenergies/actor-spellenergy-ash.hbs',
    'systems/sentius-rpg/templates/actor/parts/spellenergies/actor-spellenergy-fissure.hbs',
    'systems/sentius-rpg/templates/actor/parts/spellenergies/actor-spellenergy-lava.hbs',
    'systems/sentius-rpg/templates/actor/parts/spellenergies/actor-spellenergy-mist.hbs',
    'systems/sentius-rpg/templates/actor/parts/spellenergies/actor-spellenergy-mud.hbs',
    'systems/sentius-rpg/templates/actor/parts/spellenergies/actor-spellenergy-steam.hbs',
    'systems/sentius-rpg/templates/actor/parts/spellenergies/actor-spellenergy-angelic.hbs',
    'systems/sentius-rpg/templates/actor/parts/spellenergies/actor-spellenergy-demonic.hbs',
    'systems/sentius-rpg/templates/actor/parts/spellenergies/actor-spellenergy-spirit.hbs',
    // Targets
    'systems/sentius-rpg/templates/actor/parts/spellenergies/actor-spellenergy-it.hbs',
    'systems/sentius-rpg/templates/actor/parts/spellenergies/actor-spellenergy-me.hbs',
    'systems/sentius-rpg/templates/actor/parts/spellenergies/actor-spellenergy-them.hbs',
    'systems/sentius-rpg/templates/actor/parts/spellenergies/actor-spellenergy-there.hbs',
    'systems/sentius-rpg/templates/actor/parts/spellenergies/actor-spellenergy-you.hbs',

    // Item partials
    'systems/sentius-rpg/templates/item/parts/item-effects.hbs',
  ]);
};
