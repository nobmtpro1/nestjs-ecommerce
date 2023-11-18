import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MinioClientService {
  private readonly config: any;

  public get client() {
    return this.minio.client;
  }

  constructor(
    @Inject(MinioService)
    private readonly minio: MinioService,
    @Inject(ConfigService)
    private readonly configService: ConfigService,
  ) {
    this.config = configService.get('minio');
  }

  public async upload(
    file: Express.Multer.File,
    baseBucket: string = this.config.MINIO_BUCKET,
  ) {
    if (!(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))) {
      throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST);
    }
    let temp_filename = Date.now().toString();
    let hashedFileName = crypto
      .createHash('md5')
      .update(temp_filename)
      .digest('hex');
    let ext = file.originalname.substring(
      file.originalname.lastIndexOf('.'),
      file.originalname.length,
    );
    const metaData = {
      'Content-Type': file.mimetype,
      'X-Amz-Meta-Testing': 1234,
    };
    let filename = hashedFileName + ext;
    const fileName: string = `${filename}`;
    const fileBuffer = file.buffer;

    try {
      await this.client.putObject(
        baseBucket,
        fileName,
        fileBuffer,
        file.size,
        metaData,
      );
    } catch (error) {
      throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST);
    }

    return {
      url: `${this.config.MINIO_USE_SSL ? 'https://' : 'http://'}${
        this.config.MINIO_ENDPOINT
      }:${this.config.MINIO_PORT}/${this.config.MINIO_BUCKET}/${filename}`,
    };
  }

  async delete(
    objetName: string,
    baseBucket: string = this.config.MINIO_BUCKET,
  ) {
    this.client.removeObject(baseBucket, objetName, {}, function (err) {
      if (err)
        throw new HttpException(
          'Oops Something wrong happend',
          HttpStatus.BAD_REQUEST,
        );
    });
  }
}
