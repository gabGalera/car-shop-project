import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

class CarService {
  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(
        { 
          model: car.model, 
          year: car.year, 
          color: car.color, 
          status: car.status, 
          buyValue: car.buyValue,
          doorsQty: car.doorsQty,
          seatsQty: car.seatsQty },
      );
    }
    return null;
  }

  public async car(car: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.create(car);

    return this.createCarDomain(newCar);
  }
}

export default CarService;