import { Module } from '@nestjs/common';
import { MinioClientService } from './minio-client.service';
import { MinioModule } from 'nestjs-minio-client';
import { ConfigService } from '@nestjs/config';
@Module({
  imports: [
    MinioModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        endPoint: configService.get('minio').MINIO_ENDPOINT,
        port: configService.get('minio').MINIO_PORT,
        useSSL: configService.get('minio').MINIO_USE_SSL,
        accessKey: configService.get('minio').MINIO_ACCESSKEY,
        secretKey: configService.get('minio').MINIO_SECRETKEY,
      }),
    }),
  ],
  providers: [MinioClientService],
  exports: [MinioClientService],
})
export class MinioClientModule {}
