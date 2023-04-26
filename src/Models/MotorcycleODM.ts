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
      category: moto.category,
      engineCapacity: moto.engineCapacity,
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

  public async updateById({ 
    id,
    model: carModel,
    year,
    color,
    status,
    buyValue,
    category,
    engineCapacity }: IMotorcycle) {
    this.model.updateOne(
      {
        _id: id,
      },
      { 
        $set: {
          model: carModel,
          year,
          color,
          status,
          buyValue,
          category,
          engineCapacity, 
        },
      },
    );
  }
}

export default MotorcycleODM;