import express from 'express';
import CarController from './Controllers/CarController';
import ErrorHandler from './Middleware/ErrorHandler';

const app = express();

app.use(express.json());

app.use(ErrorHandler.handle);

app.post('/cars', (req, res, next) => new CarController(req, res, next).create());

export default app;
