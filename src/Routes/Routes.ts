import { NextFunction, Request, Response, Router } from 'express';
import CarController from '../Controllers/CarController';
import MotorcycleController from '../Controllers/MotorcycleController';

const routes = Router();

routes.post(
  '/motorcycles', 
  (req: Request, res: Response, next: NextFunction) => 
    new MotorcycleController(req, res, next).create(),
);

routes.get(
  '/motorcycles', 
  (req: Request, res: Response, next: NextFunction) => 
    new MotorcycleController(req, res, next).findAll(),
);

routes.put(
  '/cars/:id', 
  (req: Request, res: Response, next: NextFunction) => 
    new CarController(req, res, next).updateById(),
);

routes.get(
  '/cars/:id', 
  (req: Request, res: Response, next: NextFunction) => 
    new CarController(req, res, next).findOneCar(),
);

routes.get(
  '/cars', 
  (req: Request, res: Response, next: NextFunction) => 
    new CarController(req, res, next).findAll(),
);

routes.post(
  '/cars', 
  (req: Request, res: Response, next: NextFunction) => new CarController(req, res, next).create(),
);

export default routes;