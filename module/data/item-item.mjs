import SentiusRPGItemBase from "./base-item.mjs";

export default class SentiusRPGItem extends SentiusRPGItemBase {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = super.defineSchema();

    // Break down roll formula into three independent fields
    schema.gear = new fields.SchemaField({
      resourceDie: new fields.StringField({ initial: "d4" }),
      resourceCurrentDie: new fields.StringField({ initial: "" }),
      properties: new fields.StringField({ initial: "" })
    })

    schema.formula = new fields.StringField({ blank: true });

    return schema;
  }

  prepareDerivedData() {
    // Build the formula dynamically using string interpolation
    const gear = this.gear;

    if (gear.resourceCurrentDie === '') {
      this.gear.resourceCurrentDie = gear.resourceDie;
    } else {
      this.gear.resourceCurrentDie = gear.resourceCurrentDie;
    }

    this.formula = `${gear.resourceDie}`
  }
}