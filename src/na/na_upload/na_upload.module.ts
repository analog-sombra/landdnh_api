import { Module } from '@nestjs/common';
import { NaUploadService } from './na_upload.service';
import { NaUploadResolver } from './na_upload.resolver';

@Module({
  providers: [NaUploadResolver, NaUploadService],
})
export class NaUploadModule {}
