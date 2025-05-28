import { Test, TestingModule } from '@nestjs/testing';
import { NaSurveyService } from './na_survey.service';

describe('NaSurveyService', () => {
  let service: NaSurveyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NaSurveyService],
    }).compile();

    service = module.get<NaSurveyService>(NaSurveyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
