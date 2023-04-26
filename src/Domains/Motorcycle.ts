import IMotorcycle from '../Interfaces/IMotorcycle';
import Vehicle from './Vehicle';

class Motorcycle extends Vehicle {
  protected id: string | undefined;
  private category: string;
  private engineCapacity: number; 

  constructor(
    {
      model,
      year,
      color,
      status,
      buyValue,
      category,
      engineCapacity, 
    }: IMotorcycle,
  ) {
    super({ 
      model,
      year,
      color,
      status,
      buyValue,
    });
    this.category = category;
    this.engineCapacity = engineCapacity;
  }

  public getId() {
    return this.id;
  }

  public getCategory() {
    return this.category;
  }

  public getEngineCapacity() {
    return this.engineCapacity;
  }
}

export default Motorcycle;
