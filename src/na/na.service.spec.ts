import { Test, TestingModule } from '@nestjs/testing';
import { NaService } from './na.service';

describe('NaService', () => {
  let service: NaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NaService],
    }).compile();

    service = module.get<NaService>(NaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
