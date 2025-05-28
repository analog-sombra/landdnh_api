import { Module } from '@nestjs/common';
import { NaFeesService } from './na_fees.service';
import { NaFeesResolver } from './na_fees.resolver';

@Module({
  providers: [NaFeesResolver, NaFeesService],
})
export class NaFeesModule {}
