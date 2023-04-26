import ICar from '../Interfaces/ICar';
import Vehicle from './Vehicle';

class Car extends Vehicle {
  protected id: string | undefined;
  private doorsQty: number;
  private seatsQty: number;

  constructor(
    { 
      model, 
      year, 
      color, 
      status, 
      buyValue,
      doorsQty,
      seatsQty, 
    }: ICar,
  ) {
    super({
      model, 
      year, 
      color, 
      status, 
      buyValue,
    });
    this.id = '';
    this.doorsQty = doorsQty;
    this.seatsQty = seatsQty;
  }

  public getId() {
    return this.id;
  }

  public setId(id: string) {
    this.id = id;
  }

  public getDoorsQty() {
    return this.doorsQty;
  }

  public getSeatsQty() {
    return this.seatsQty;
  }
}

export default Car;