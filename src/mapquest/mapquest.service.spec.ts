import { Test, TestingModule } from '@nestjs/testing';
import { MapquestService } from './mapquest.service';

describe('MapquestService', () => {
  let service: MapquestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MapquestService],
    }).compile();

    service = module.get<MapquestService>(MapquestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
