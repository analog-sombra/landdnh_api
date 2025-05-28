import { Module } from '@nestjs/common';
import { NaService } from './na.service';
import { NaResolver } from './na.resolver';
import { NaApplicantModule } from './na_applicant/na_applicant.module';
import { NaFeesModule } from './na_fees/na_fees.module';
import { NaQueryModule } from './na_query/na_query.module';
import { NaUploadModule } from './na_upload/na_upload.module';
import { NaSurveyModule } from './na_survey/na_survey.module';

@Module({
  providers: [NaResolver, NaService],
  imports: [NaApplicantModule, NaFeesModule, NaQueryModule, NaUploadModule, NaSurveyModule],
})
export class NaModule {}
