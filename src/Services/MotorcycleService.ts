import { isValidObjectId } from 'mongoose';
import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

const motoNotFound = 'Motorcycle not found';
class MotorcycleService {
  private createCarDomain(moto: IMotorcycle | null): Motorcycle | null {
    if (moto) {
      return new Motorcycle(
        { 
          id: moto.id,
          model: moto.model, 
          year: moto.year, 
          color: moto.color, 
          status: moto.status, 
          buyValue: moto.buyValue,
          category: moto.category,
          engineCapacity: moto.engineCapacity },
      );
    }
    return null;
  }

  public async moto(car: IMotorcycle) {
    const motoODM = new MotorcycleODM();
    const newMoto = await motoODM.create(car);

    return this.createCarDomain(newMoto);
  }

  public async findAll(): Promise<{ type: number, message: IMotorcycle[] | null | string }> {
    const motoODM = new MotorcycleODM();
    const allmotos = await motoODM.findAll();

    if (!allmotos) return { type: 404, message: motoNotFound };
    
    return { type: 0, message: allmotos };
  }

  public async findById(id: string): Promise<{ 
    type: number, 
    message: IMotorcycle | null | string 
  }> {
    const motoODM = new MotorcycleODM();

    const isValidId = isValidObjectId(id);

    if (!isValidId) return { type: 422, message: 'Invalid mongo id' };

    const moto = await motoODM.findById(id);

    if (!moto) return { type: 404, message: motoNotFound };
    
    return { type: 0, message: moto };
  }

  public async updateById({ 
    id,
    model,
    year,
    color,
    status,
    buyValue,
    category,
    engineCapacity }: IMotorcycle): Promise<{ 
      type: number, message: IMotorcycle | null | string }> {
    const motoODM = new MotorcycleODM();
    
    const isValidId = isValidObjectId(id);

    if (!isValidId) return { type: 422, message: 'Invalid mongo id' };

    const car = await motoODM.findById(id as string);

    if (!car) return { type: 404, message: motoNotFound };

    await motoODM.updateById({ 
      id,
      model,
      year,
      color,
      status,
      buyValue,
      category,
      engineCapacity } as IMotorcycle);
    
    return { type: 0, message: '' };
  }
}

export default MotorcycleService;