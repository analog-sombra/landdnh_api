import { Test, TestingModule } from '@nestjs/testing';
import { NaResolver } from './na.resolver';
import { NaService } from './na.service';

describe('NaResolver', () => {
  let resolver: NaResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NaResolver, NaService],
    }).compile();

    resolver = module.get<NaResolver>(NaResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
