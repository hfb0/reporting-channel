import { Test, TestingModule } from '@nestjs/testing';
import { DenunciationsService } from './denunciations.service';

describe('DenunciationsService', () => {
  let service: DenunciationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DenunciationsService],
    }).compile();

    service = module.get<DenunciationsService>(DenunciationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
