import { Test, TestingModule } from '@nestjs/testing';
import { NaApplicantResolver } from './na_applicant.resolver';
import { NaApplicantService } from './na_applicant.service';

describe('NaApplicantResolver', () => {
  let resolver: NaApplicantResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NaApplicantResolver, NaApplicantService],
    }).compile();

    resolver = module.get<NaApplicantResolver>(NaApplicantResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
