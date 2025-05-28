import { Test, TestingModule } from '@nestjs/testing';
import { NaUploadResolver } from './na_upload.resolver';
import { NaUploadService } from './na_upload.service';

describe('NaUploadResolver', () => {
  let resolver: NaUploadResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NaUploadResolver, NaUploadService],
    }).compile();

    resolver = module.get<NaUploadResolver>(NaUploadResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
