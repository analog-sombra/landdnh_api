import { Test, TestingModule } from '@nestjs/testing';
import { NaUploadService } from './na_upload.service';

describe('NaUploadService', () => {
  let service: NaUploadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NaUploadService],
    }).compile();

    service = module.get<NaUploadService>(NaUploadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
