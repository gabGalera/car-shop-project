import { isValidObjectId } from 'mongoose';
import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

const carNotFound = 'Car not found';
class CarService {
  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(
        { 
          id: car.id,
          model: car.model, 
          year: car.year, 
          color: car.color, 
          status: car.status, 
          buyValue: car.buyValue,
          doorsQty: car.doorsQty,
          seatsQty: car.seatsQty },
      );
    }
    return null;
  }

  public async car(car: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.create(car);

    return this.createCarDomain(newCar);
  }

  public async findAll(): Promise<{ type: number, message: ICar[] | null | string }> {
    const carODM = new CarODM();
    const allCars = await carODM.findAll();

    if (!allCars) return { type: 404, message: carNotFound };
    
    return { type: 0, message: allCars };
  }

  public async findById(id: string): Promise<{ type: number, message: ICar | null | string }> {
    const carODM = new CarODM();

    const isValidId = isValidObjectId(id);

    if (!isValidId) return { type: 422, message: 'Invalid mongo id' };

    const car = await carODM.findById(id);

    if (!car) return { type: 404, message: carNotFound };
    
    return { type: 0, message: car };
  }

  public async updateById({ 
    id,
    model,
    year,
    color,
    status,
    buyValue,
    doorsQty,
    seatsQty }: ICar): Promise<{ type: number, message: ICar | null | string }> {
    const carODM = new CarODM();
    
    const isValidId = isValidObjectId(id);

    if (!isValidId) return { type: 422, message: 'Invalid mongo id' };

    const car = await carODM.findById(id as string);

    if (!car) return { type: 404, message: carNotFound };

    await carODM.updateById({ 
      id,
      model,
      year,
      color,
      status,
      buyValue,
      doorsQty,
      seatsQty } as ICar);
    
    return { type: 0, message: '' };
  }
}

export default CarService;