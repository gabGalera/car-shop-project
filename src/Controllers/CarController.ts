import { NextFunction, Request, Response } from 'express';
import CarService from '../Services/CarService';
import ICar from '../Interfaces/ICar';

class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  public async create() {
    const car: ICar = {
      model: this.req.body.model, 
      year: this.req.body.year, 
      color: this.req.body.color, 
      status: this.req.body.status, 
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty, 
    };

    try {
      const newCar = await this.service.car(car);
      return this.res.status(201).json({
        id: newCar?.getId(),
        model: newCar?.getModel(),
        year: newCar?.getYear(),
        color: newCar?.getColor(),
        status: newCar?.getStatus(),
        buyValue: newCar?.getBuyValue(),
        doorsQty: newCar?.getDoorsQty(),
        seatsQty: newCar?.getSeatsQty(),
      });
    } catch (error) {
      this.next(error);
    }
  }
}
  
export default CarController;