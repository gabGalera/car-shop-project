import { NextFunction, Request, Response, Router } from 'express';
import CarController from '../Controllers/CarController';
import MotorcycleController from '../Controllers/MotorcycleController';

const carRoutes = Router();
const motoRoutes = Router();

motoRoutes.post(
  '/', 
  (req: Request, res: Response, next: NextFunction) => 
    new MotorcycleController(req, res, next).create(),
);

motoRoutes.get(
  '/:id', 
  (req: Request, res: Response, next: NextFunction) => 
    new MotorcycleController(req, res, next).findById(),
);

motoRoutes.get(
  '/', 
  (req: Request, res: Response, next: NextFunction) => 
    new MotorcycleController(req, res, next).findAll(),
);

carRoutes.put(
  '/:id', 
  (req: Request, res: Response, next: NextFunction) => 
    new CarController(req, res, next).updateById(),
);

carRoutes.get(
  '/:id', 
  (req: Request, res: Response, next: NextFunction) => 
    new CarController(req, res, next).findById(),
);

carRoutes.get(
  '/', 
  (req: Request, res: Response, next: NextFunction) => 
    new CarController(req, res, next).findAll(),
);

carRoutes.post(
  '/', 
  (req: Request, res: Response, next: NextFunction) => new CarController(req, res, next).create(),
);

export { carRoutes, motoRoutes };