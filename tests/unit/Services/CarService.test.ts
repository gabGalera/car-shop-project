import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';

describe('Deveria encontrar os carros cadastrados', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Não deveria encontrar os carros', async function () {
    // Arrange
    sinon.stub(Model, 'find').resolves();

    // Act
    const service = new CarService();
    const result = await service.findAll();

    // Assert
    expect(result.type).to.be.deep.equal(404);
    expect(result.message).to.be.deep.equal('Car not found');
  });

  it('Deveria cadastrar um carro', async function () {
    // Arrange
    const carInput: ICar = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };
    const carOutput: ICar = {
      id: '',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };

    sinon.stub(Model, 'create').resolves(carOutput);
    
    // Act
    const service = new CarService();
    const result = await service.car(carInput);

    // Assert
    expect(result).to.be.deep.equal(carOutput);
  });

  it('Deveria encontrar todos os carros cadastrados com sucesso', async function () {
    // Arrange
    const AllCarsOutput: ICar[] = [{
      id: '',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    }];

    sinon.stub(Model, 'find').resolves(AllCarsOutput);

    // Act
    const service = new CarService();
    const result = await service.findAll();

    // Assert
    expect(result.message).to.be.deep.equal(AllCarsOutput);
  });

  it('Não deveria encontrar um carro por id inválido', async function () {
    // Arrange
    const id = 'Inválido';

    // Act
    const service = new CarService();
    const result = await service.findById(id);

    // Assert
    expect(result.type).to.be.deep.equal(422);
    expect(result.message).to.be.deep.equal('Invalid mongo id');
  });
});