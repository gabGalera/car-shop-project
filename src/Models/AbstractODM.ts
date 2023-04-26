import { Schema } from 'mongoose';
import IVehicle from '../Interfaces/IVehicle';

abstract class AbstractODM<T> {
  public schema: Schema<T | IVehicle>;

  constructor() {
    this.schema = new Schema({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: false },
      buyValue: { type: Number, required: true },
    });
  }
}

export default AbstractODM;
