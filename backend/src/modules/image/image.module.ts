import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageController } from './controllers/image.controller';
import { ImageService } from './services/image.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { MinioClientModule } from '../minio-client/minio-client.module';
import { ImageRepository } from 'src/repositories/image.repository';

@Module({
  imports: [TypeOrmModule, JwtModule, UserModule, MinioClientModule],
  controllers: [ImageController],
  providers: [ImageService, ImageRepository],
  exports: [TypeOrmModule, ImageService],
})
export class ImageModule {}
