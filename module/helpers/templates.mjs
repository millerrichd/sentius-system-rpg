/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
export const preloadHandlebarsTemplates = async function () {
  return loadTemplates([
    // Actor partials.
    'systems/sentius-rpg/templates/actor/parts/actor-hindrances.hbs',
    'systems/sentius-rpg/templates/actor/parts/actor-skills.hbs',
    'systems/sentius-rpg/templates/actor/parts/actor-spells.hbs',
    'systems/sentius-rpg/templates/actor/parts/actor-traits.hbs',
    'systems/sentius-rpg/templates/actor/parts/actor-effects.hbs',

    // Sub Tabs of Gear
    'systems/sentius-rpg/templates/actor/parts/actor-armor.hbs',
    'systems/sentius-rpg/templates/actor/parts/actor-cybernetics.hbs',
    'systems/sentius-rpg/templates/actor/parts/actor-equipment.hbs',
    'systems/sentius-rpg/templates/actor/parts/actor-powerarmor.hbs',
    'systems/sentius-rpg/templates/actor/parts/actor-vehicle.hbs',
    'systems/sentius-rpg/templates/actor/parts/actor-weapons.hbs',

    // Item partials
    'systems/sentius-rpg/templates/item/parts/item-effects.hbs',
  ]);
};
