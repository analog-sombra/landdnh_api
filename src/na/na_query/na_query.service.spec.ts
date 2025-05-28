import { Test, TestingModule } from '@nestjs/testing';
import { NaQueryService } from './na_query.service';

describe('NaQueryService', () => {
  let service: NaQueryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NaQueryService],
    }).compile();

    service = module.get<NaQueryService>(NaQueryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
