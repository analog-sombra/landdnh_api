import { Test, TestingModule } from '@nestjs/testing';
import { NaFeesResolver } from './na_fees.resolver';
import { NaFeesService } from './na_fees.service';

describe('NaFeesResolver', () => {
  let resolver: NaFeesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NaFeesResolver, NaFeesService],
    }).compile();

    resolver = module.get<NaFeesResolver>(NaFeesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
