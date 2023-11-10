import { Module } from '@nestjs/common';
import { UploadS3Provider } from './providers/upload-s3.provider';

@Module({
  imports: [],
  controllers: [],
  providers: [UploadS3Provider],
  exports: [UploadS3Provider],
})
export class UploaderModule {}
