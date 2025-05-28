import { Test, TestingModule } from '@nestjs/testing';
import { VillageResolver } from './village.resolver';
import { VillageService } from './village.service';

describe('VillageResolver', () => {
  let resolver: VillageResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VillageResolver, VillageService],
    }).compile();

    resolver = module.get<VillageResolver>(VillageResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
