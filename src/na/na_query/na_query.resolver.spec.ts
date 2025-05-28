import { Test, TestingModule } from '@nestjs/testing';
import { NaQueryResolver } from './na_query.resolver';
import { NaQueryService } from './na_query.service';

describe('NaQueryResolver', () => {
  let resolver: NaQueryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NaQueryResolver, NaQueryService],
    }).compile();

    resolver = module.get<NaQueryResolver>(NaQueryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
