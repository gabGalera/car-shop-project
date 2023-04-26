import IVehicle from '../Interfaces/IVehicle';

class Vehicle {
  protected id: string | undefined;
  protected model: string;
  protected year: number;
  protected color: string;
  private status: boolean;
  protected buyValue: number;

  constructor(
    {
      model,
      year,
      color,
      status,
      buyValue,
    }: IVehicle,
  ) {
    this.id = '';
    this.model = model;
    this.year = year;
    this.color = color;
    this.status = status || false;
    this.buyValue = buyValue;
  }

  public getId() {
    return this.id;
  }

  public setId(id: string) {
    this.id = id;
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
}

export default Vehicle;
