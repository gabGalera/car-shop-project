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
    return this.model.create({ ...moto });
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