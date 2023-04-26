import { NextFunction, Request, Response, Router } from 'express';
import CarController from '../Controllers/CarController';

const routes = Router();

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
    new CarController(req, res, next).findCars(),
);

routes.post(
  '/cars', 
  (req: Request, res: Response, next: NextFunction) => new CarController(req, res, next).create(),
);

export default routes;