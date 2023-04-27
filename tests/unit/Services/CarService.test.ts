import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';

const carNotFound = 'Car not found';
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
    expect(result.message).to.be.deep.equal(carNotFound);
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

  it('Não deveria cadastrar um carro inválido', async function () {
    // Arrange
    const carInput = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
      errou: true,
    };

    sinon.stub(Model, 'create').resolves();
    
    // Act
    const service = new CarService();
    const result = await service.car(carInput);

    // Assert
    expect(result).to.be.deep.equal(null);
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

  it('Não deveria encontrar um carro que não existe por id', async function () {
    // Arrange
    const id = '594ced02ed345b2b049222c5';

    sinon.stub(Model, 'findOne').resolves();

    // Act
    const service = new CarService();
    const result = await service.findById(id);

    // Assert
    expect(result.message).to.be.deep.equal(carNotFound);
  });

  it('Deveria encontrar um carro que existe por id', async function () {
    // Arrange
    const carOutput: ICar = {
      id: '594ced02ed345b2b049222c5',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };
    const id = '594ced02ed345b2b049222c5';

    sinon.stub(Model, 'create').resolves();
    sinon.stub(Model, 'findOne').resolves(carOutput);

    // Act
    const service = new CarService();
    const result = await service.findById(id);

    // Assert
    expect(result.message).to.be.deep.equal(carOutput);
  });

  it('Não deveria atualizar um carro por id inválido', async function () {
    // Arrange
    const carOutput: ICar = {
      id: 'Inválido',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };

    // Act
    const service = new CarService();
    const result = await service.updateById(carOutput);

    // Assert
    expect(result.type).to.be.deep.equal(422);
    expect(result.message).to.be.deep.equal('Invalid mongo id');
  });

  it('Não deveria atualizar um carro que não existe por id', async function () {
    // Arrange
    const carOutput: ICar = {
      id: '594ced02ed345b2b049222c5',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };

    sinon.stub(Model, 'findOne').resolves();

    // Act
    const service = new CarService();
    const result = await service.updateById(carOutput);

    // Assert
    expect(result.message).to.be.deep.equal(carNotFound);
  });

  it('Deveria atualizar um carro que existe por id', async function () {
    // Arrange
    const carInput: ICar = {
      id: '594ced02ed345b2b049222c5',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };

    sinon.stub(Model, 'findOne').resolves(carInput);
    sinon.stub(Model, 'updateOne').resolves();

    // Act
    const service = new CarService();
    const result = await service.updateById(carInput);

    // Assert
    expect(result.type).to.be.deep.equal(0);
    expect(result.message).to.be.deep.equal('');
  });
});