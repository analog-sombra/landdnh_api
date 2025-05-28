import { Test, TestingModule } from '@nestjs/testing';
import { NaFeesService } from './na_fees.service';

describe('NaFeesService', () => {
  let service: NaFeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NaFeesService],
    }).compile();

    service = module.get<NaFeesService>(NaFeesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
