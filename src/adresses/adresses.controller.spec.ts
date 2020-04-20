import { Test, TestingModule } from '@nestjs/testing';
import { AdressesController } from './adresses.controller';

describe('Adresses Controller', () => {
  let controller: AdressesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdressesController],
    }).compile();

    controller = module.get<AdressesController>(AdressesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
