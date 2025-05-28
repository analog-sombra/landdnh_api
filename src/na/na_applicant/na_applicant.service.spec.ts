import { Test, TestingModule } from '@nestjs/testing';
import { NaApplicantService } from './na_applicant.service';

describe('NaApplicantService', () => {
  let service: NaApplicantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NaApplicantService],
    }).compile();

    service = module.get<NaApplicantService>(NaApplicantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
