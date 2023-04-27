import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';

const motoNotFound = 'Motorcycle not found';
const honda = 'Honda Cb 600f Hornet';

describe('Deveria encontrar as motos cadastradas', function () {
  afterEach(function () {
    sinon.restore();
  });
  it('Não deveria encontrar as motos', async function () {
    // Arrange
    sinon.stub(Model, 'find').resolves();

    // Act
    const service = new MotorcycleService();
    const result = await service.findAll();

    // Assert
    expect(result.type).to.be.deep.equal(404);
    expect(result.message).to.be.deep.equal(motoNotFound);
  });

  it('Deveria cadastrar uma moto', async function () {
    // Arrange
    const motoInput: IMotorcycle = {
      model: honda,
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };
    const motoOutput: IMotorcycle = {
      id: '',
      model: honda,
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };

    sinon.stub(Model, 'create').resolves(motoOutput);
    
    // Act
    const service = new MotorcycleService();
    const result = await service.moto(motoInput);

    // Assert
    expect(result).to.be.deep.equal(motoOutput);
  });

  it('Não deveria cadastrar uma moto inválido', async function () {
    // Arrange
    const motoInput = {
      id: '6348513f34c397abcad040b2',
      model: honda,
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
      errou: true,
    };

    sinon.stub(Model, 'create').resolves();
    
    // Act
    const service = new MotorcycleService();
    const result = await service.moto(motoInput);

    // Assert
    expect(result).to.be.deep.equal(null);
  });

  it('Deveria encontrar todos as motos cadastrados com sucesso', async function () {
    // Arrange
    const AllMotoOutput: IMotorcycle[] = [{
      id: '6348513f34c397abcad040b2',
      model: honda,
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    }];

    sinon.stub(Model, 'find').resolves(AllMotoOutput);

    // Act
    const service = new MotorcycleService();
    const result = await service.findAll();

    // Assert
    expect(result.message).to.be.deep.equal(AllMotoOutput);
  });

  it('Não deveria encontrar uma moto por id inválido', async function () {
    // Arrange
    const id = 'Inválido';

    // Act
    const service = new MotorcycleService();
    const result = await service.findById(id);

    // Assert
    expect(result.type).to.be.deep.equal(422);
    expect(result.message).to.be.deep.equal('Invalid mongo id');
  });

  it('Não deveria encontrar uma moto que não existe por id', async function () {
    // Arrange
    const id = '594ced02ed345b2b049222c5';

    sinon.stub(Model, 'findOne').resolves();

    // Act
    const service = new MotorcycleService();
    const result = await service.findById(id);

    // Assert
    expect(result.message).to.be.deep.equal(motoNotFound);
  });

  it('Deveria encontrar uma moto que existe por id', async function () {
    // Arrange
    const motoOutput: IMotorcycle = {
      id: '6348513f34c397abcad040b2',
      model: honda,
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };
    const id = '594ced02ed345b2b049222c5';

    sinon.stub(Model, 'create').resolves();
    sinon.stub(Model, 'findOne').resolves(motoOutput);

    // Act
    const service = new MotorcycleService();
    const result = await service.findById(id);

    // Assert
    expect(result.message).to.be.deep.equal(motoOutput);
  });

  it('Não deveria atualizar uma moto por id inválido', async function () {
    // Arrange
    const motoOutput: IMotorcycle = {
      id: 'Inválido',
      model: honda,
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    };

    // Act
    const service = new MotorcycleService();
    const result = await service.updateById(motoOutput);

    // Assert
    expect(result.type).to.be.deep.equal(422);
    expect(result.message).to.be.deep.equal('Invalid mongo id');
  });

  it('Não deveria atualizar uma moto que não existe por id', async function () {
    // Arrange
    const motoOutput: IMotorcycle = {
      id: '594ced02ed345b2b049222c5',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      category: 'Street',
      engineCapacity: 600,
    };

    sinon.stub(Model, 'findOne').resolves();

    // Act
    const service = new MotorcycleService();
    const result = await service.updateById(motoOutput);

    // Assert
    expect(result.message).to.be.deep.equal(motoNotFound);
  });

  it('Deveria atualizar uma moto que existe por id', async function () {
    // Arrange
    const motoInput: IMotorcycle = {
      id: '594ced02ed345b2b049222c5',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      category: 'Street',
      engineCapacity: 600,
    };

    sinon.stub(Model, 'findOne').resolves(motoInput);
    sinon.stub(Model, 'updateOne').resolves();

    // Act
    const service = new MotorcycleService();
    const result = await service.updateById(motoInput);

    // Assert
    expect(result.type).to.be.deep.equal(0);
    expect(result.message).to.be.deep.equal('');
  });
});