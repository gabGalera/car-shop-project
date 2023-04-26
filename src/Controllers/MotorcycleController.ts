import { NextFunction, Request, Response } from 'express';
import MotorcycleService from '../Services/MotorcycleService';
import IMotorcycle from '../Interfaces/IMotorcycle';

class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }

  public async create() {
    const moto: IMotorcycle = {
      model: this.req.body.model, 
      year: this.req.body.year, 
      color: this.req.body.color, 
      status: this.req.body.status, 
      buyValue: this.req.body.buyValue,
      category: this.req.body.category,
      engineCapacity: this.req.body.engineCapacity, 
    };

    try {
      const newMoto = await this.service.moto(moto);
      return this.res.status(201).json({
        id: newMoto?.getId(),
        model: newMoto?.getModel(),
        year: newMoto?.getYear(),
        color: newMoto?.getColor(),
        status: newMoto?.getStatus(),
        buyValue: newMoto?.getBuyValue(),
        category: newMoto?.getCategory(),
        engineCapacity: newMoto?.getEngineCapacity(),
      });
    } catch (error) {
      this.next(error);
    }
  }
}

export default MotorcycleController;
