import { NextFunction, Request, Response, Router } from 'express';
import CarController from '../Controllers/CarController';

const carRoutes = Router();

carRoutes.put(
  '/cars/:id', 
  (req: Request, res: Response, next: NextFunction) => 
    new CarController(req, res, next).updateById(),
);

carRoutes.get(
  '/cars/:id', 
  (req: Request, res: Response, next: NextFunction) => 
    new CarController(req, res, next).findOneCar(),
);

carRoutes.get(
  '/cars', 
  (req: Request, res: Response, next: NextFunction) => 
    new CarController(req, res, next).findCars(),
);

carRoutes.post(
  '/cars', 
  (req: Request, res: Response, next: NextFunction) => new CarController(req, res, next).create(),
);

export default carRoutes;