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

  public async findAll() {
    const { type, message } = await this.service.findAll();

    if (type) return this.res.status(404).json({ message }); 

    const allCars = message as ICar[];

    const response = allCars.map((car) => ({
      id: car.id,
      model: car.model, 
      year: car.year,
      color: car.color,
      status: car.status,
      buyValue: car.buyValue,
      doorsQty: car.doorsQty,
      seatsQty: car.seatsQty,
    }));
    return this.res.status(200).json(response);
  }

  public async findOneCar() {
    const { id } = this.req.params;
    const { type, message } = await this.service.findOneCar(id);

    if (type) return this.res.status(type).json({ message }); 

    const car = message as ICar;

    const response = {
      id: car.id,
      model: car.model, 
      year: car.year,
      color: car.color,
      status: car.status,
      buyValue: car.buyValue,
      doorsQty: car.doorsQty,
      seatsQty: car.seatsQty,
    };
    return this.res.status(200).json(response);
  }

  public async updateById() {
    const { id } = this.req.params;
    const {
      model,
      year,
      color,
      status,
      buyValue,
      doorsQty,
      seatsQty,
    } = this.req.body;
    const { type, message } = await this.service.updateById({
      id,
      model,
      year,
      color,
      status,
      buyValue,
      doorsQty,
      seatsQty,
    } as ICar);

    if (type) return this.res.status(type).json({ message });

    return this.res.status(200).json({ 
      id,
      model,
      year,
      color,
      status,
      buyValue,
      doorsQty,
      seatsQty,
    });
  }
}
  
export default CarController;