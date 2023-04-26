import ICar from '../Interfaces/ICar';

class Car {
  protected id: string | undefined;
  protected model: string;
  protected year: number;
  protected color: string;
  private status: boolean;
  protected buyValue: number;
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
    this.id = '99';
    this.model = model;
    this.year = year;
    this.color = color;
    this.status = status || false;
    this.buyValue = buyValue;
    this.doorsQty = doorsQty;
    this.seatsQty = seatsQty;
  }

  public getId() {
    return this.id;
  }

  public getStatus() {
    return this.status;
  }

  public getModel() {
    return this.model;
  }

  public getYear() {
    return this.year;
  }

  public getColor() {
    return this.color;
  }

  public getBuyValue() {
    return this.buyValue;
  }

  public getDoorsQty() {
    return this.doorsQty;
  }

  public getSeatsQty() {
    return this.seatsQty;
  }
}

export default Car;