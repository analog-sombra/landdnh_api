import { Module } from '@nestjs/common';
import { NaSurveyService } from './na_survey.service';
import { NaSurveyResolver } from './na_survey.resolver';

@Module({
  providers: [NaSurveyResolver, NaSurveyService],
})
export class NaSurveyModule {}
