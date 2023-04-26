import express from 'express';
// import CarController from './Controllers/CarController';
import ErrorHandler from './Middleware/ErrorHandler';
import routes from './Routes/Routes';

const app = express();

app.use(express.json());

app.use(ErrorHandler.handle);

app.use(routes);

export default app;
