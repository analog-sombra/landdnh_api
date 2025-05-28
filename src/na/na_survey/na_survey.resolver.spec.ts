import { Test, TestingModule } from '@nestjs/testing';
import { NaSurveyResolver } from './na_survey.resolver';
import { NaSurveyService } from './na_survey.service';

describe('NaSurveyResolver', () => {
  let resolver: NaSurveyResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NaSurveyResolver, NaSurveyService],
    }).compile();

    resolver = module.get<NaSurveyResolver>(NaSurveyResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
