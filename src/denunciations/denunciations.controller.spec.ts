import { Test, TestingModule } from '@nestjs/testing';
import { DenunciationsController } from './denunciations.controller';

describe('Denunciations Controller', () => {
  let controller: DenunciationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DenunciationsController],
    }).compile();

    controller = module.get<DenunciationsController>(DenunciationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
