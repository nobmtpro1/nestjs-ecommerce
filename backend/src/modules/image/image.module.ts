import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageController } from './controllers/image.controller';
import { Image } from 'src/entities/image.entity';
import { ImageService } from './services/image.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Image])],
  controllers: [ImageController],
  providers: [ImageService],
  exports: [TypeOrmModule, ImageService],
})
export class ImageModule {}
