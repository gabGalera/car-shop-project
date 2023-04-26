import { Model, model, models } from 'mongoose';
import ICar from '../Interfaces/ICar';
import AbstractODM from './AbstractODM';

class CarODM extends AbstractODM<ICar> {
  private model: Model<ICar>;
  constructor() {
    super();
    this.schema = this.schema.add({
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    });

    this.model = models.Car || model('Car', this.schema);
  }

  public async create(car: ICar): Promise<ICar | null> {
    await this.model.create({ ...car });
    const newCar = await this.model.findOne({
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
    return this.model.find();
  }

  public async findOneCar(id: string): Promise<ICar | null> {
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
    doorsQty,
    seatsQty }: ICar) {
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
          doorsQty,
          seatsQty, 
        },
      },
    );
  }
}

export default CarODM;