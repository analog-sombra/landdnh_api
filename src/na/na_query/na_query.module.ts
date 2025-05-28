import { Module } from '@nestjs/common';
import { NaQueryService } from './na_query.service';
import { NaQueryResolver } from './na_query.resolver';

@Module({
  providers: [NaQueryResolver, NaQueryService],
})
export class NaQueryModule {}
