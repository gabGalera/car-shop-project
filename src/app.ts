import express from 'express';
// import CarController from './Controllers/CarController';
import ErrorHandler from './Middleware/ErrorHandler';
import carRoutes from './Routes/Routes';

const app = express();

app.use(express.json());

app.use(ErrorHandler.handle);

app.use('/', carRoutes);

export default app;
