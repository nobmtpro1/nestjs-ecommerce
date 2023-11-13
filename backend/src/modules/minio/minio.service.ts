import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'minio';

@Injectable()
export class MinioService {
  private minio: Client;
  constructor(@Inject(ConfigService) private configService: ConfigService) {
    const minioClient = new Client({
      endPoint: configService.get('minio.endPoint'),
      port: configService.get('minio.port'),
      useSSL: configService.get('minio.useSSL'),
      accessKey: configService.get('minio.accessKey'),
      secretKey: configService.get('minio.secretKey'),
    });
    this.minio = minioClient;
  }

  async create() {
    return await this.minio.getObject('nestjsecommerce', 'image (3).png');
  }
}
