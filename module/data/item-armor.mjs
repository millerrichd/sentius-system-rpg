import SentiusRPGItemBase from "./base-item.mjs";

export default class SentiusRPGItem extends SentiusRPGItemBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    // Break down roll formula into three independent fields
    schema.armor = new fields.SchemaField({
      armorRating: new fields.NumberField({ ...requiredInteger, initial: 1, min: 0 }),
      armorDie: new fields.StringField({ initial: "d4" }),
      properties: new fields.StringField({ initial: "Light" }),
      minStrengthBonus: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
      locations: new fields.StringField({ initial: "Torso" }),
      worn: new fields.BooleanField({ initial: false })
    })

    return schema;
  }

  prepareDerivedData() {
    // Build the formula dynamically using string interpolation
    const armor = this.armor;

    this.formula = `${armor.armorDie}`
  }
}