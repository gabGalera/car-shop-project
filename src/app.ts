import express from 'express';
// import CarController from './Controllers/CarController';
import ErrorHandler from './Middleware/ErrorHandler';
import { carRoutes, motoRoutes } from './Routes/Routes';

const app = express();

app.use(express.json());

app.use(ErrorHandler.handle);

app.use('/cars', carRoutes);

app.use('/motorcycles', motoRoutes);

export default app;
