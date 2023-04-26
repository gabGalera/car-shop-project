import { Model, Schema, model, models } from 'mongoose';
import ICar from '../Interfaces/ICar';

class CarODM {
  private schema: Schema;
  private carModel: Model<ICar>;

  constructor() {
    this.schema = new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: false },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    });

    this.carModel = models.Car || model('Car', this.schema);
  }

  public async create(car: ICar): Promise<ICar | null> {
    await this.carModel.create({ ...car });
    const newCar = await this.carModel.findOne({
      model: car.model,
      year: car.year,
      color: car.color,
      status: car.status,
      buyValue: car.buyValue,
      doorsQty: car.doorsQty,
      seatsQty: car.seatsQty,
    });

    return newCar;
  }

  public async findCars(): Promise<ICar[] | null> {
    return this.carModel.find();
  }

  public async findOneCar(id: string): Promise<ICar | null> {
    return this.carModel.findOne({
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
    doorsQty,
    seatsQty }: ICar) {
    this.carModel.updateOne(
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
          doorsQty,
          seatsQty, 
        },
      },
    );
  }
}

export default CarODM;