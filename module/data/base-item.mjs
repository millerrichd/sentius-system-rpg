import SentiusRPGDataModel from "./base-model.mjs";

export default class SentiusRPGItemBase extends SentiusRPGDataModel {

  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = { required: true, nullable: false, integer: true };
    const schema = {};

    schema.credits = new fields.NumberField({ ...requiredInteger, initial: 1_000, min: 0 });
    schema.description = new fields.StringField({ required: true, blank: true });
    schema.quantity = new fields.NumberField({ ...requiredInteger, initial: 1, min: 1 });
    schema.weight = new fields.NumberField({ ...requiredInteger, initial: 1, min: 0 });

    return schema;
  }

}