import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

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

    if (!allmotos) return { type: 404, message: 'Motorcycle not found' };
    
    return { type: 0, message: allmotos };
  }
}

export default MotorcycleService;