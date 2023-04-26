import { Model, model, models } from 'mongoose';
import IMotorcycle from '../Interfaces/IMotorcycle';
import AbstractODM from './AbstractODM';

class MotorcycleODM extends AbstractODM<IMotorcycle> {
  private model: Model<IMotorcycle>;
  constructor() {
    super();
    this.schema = this.schema.add({
      category: { type: String, required: true },
      engineCapacity: { type: Number, required: true },
    });

    this.model = models.Motorcycle || model('Motorcycle', this.schema);
  }

  public async create(moto: IMotorcycle): Promise<IMotorcycle | null> {
    await this.model.create({ ...moto });
    const newMoto = await this.model.findOne({
      model: moto.model,
      year: moto.year,
      color: moto.color,
      status: moto.status,
      buyValue: moto.buyValue,
      doorsQty: moto.category,
      seatsQty: moto.engineCapacity,
    });

    return newMoto;
  }

  public async findAll(): Promise<IMotorcycle[] | null> {
    return this.model.find();
  }

  public async findById(id: string): Promise<IMotorcycle | null> {
    return this.model.findOne({
      _id: id,
    });
  }
}

export default MotorcycleODM;