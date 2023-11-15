import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageController } from './controllers/image.controller';
import { Image } from 'src/entities/image.entity';
import { ImageService } from './services/image.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { MinioClientModule } from '../minio-client/minio-client.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Image]),
    JwtModule,
    UserModule,
    MinioClientModule,
  ],
  controllers: [ImageController],
  providers: [ImageService],
  exports: [TypeOrmModule, ImageService],
})
export class ImageModule {}
