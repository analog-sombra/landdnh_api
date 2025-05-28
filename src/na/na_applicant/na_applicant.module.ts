import { Module } from '@nestjs/common';
import { NaApplicantService } from './na_applicant.service';
import { NaApplicantResolver } from './na_applicant.resolver';

@Module({
  providers: [NaApplicantResolver, NaApplicantService],
})
export class NaApplicantModule {}
