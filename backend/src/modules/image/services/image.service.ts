import { Injectable } from '@nestjs/common';
import { MinioClientService } from 'src/modules/minio-client/minio-client.service';
import { ImageRepository } from 'src/repositories/image.repository';
import * as Multer from 'multer';
import { ImageDto } from 'src/dtos/image.dto';
import { Image } from 'src/entities/image.entity';

@Injectable()
export class ImageService {
  constructor(
    private imageRepository: ImageRepository,
    private minioClientService: MinioClientService,
  ) {}

  async create(file: Express.Multer.File) {
    console.log(file);
    if (file) {
      let uploaded_image = await this.minioClientService.upload(file);
      const image = this.imageRepository.create({
        src: uploaded_image.url,
      });
      const created = await this.imageRepository.save(image, {
        reload: true,
      });
      return created;
    }
    return null;
  }

  async bulkCreate(files: Express.Multer.File[]) {
    const createdFiles = [];
    for (const file of files) {
      if (file) {
        createdFiles.push(await this.create(file));
      }
    }
    return createdFiles;
  }

  async createFromUrl(image: ImageDto) {
    const img = this.imageRepository.create({
      src: image.src,
    });
    if (image.id) {
      img.id = image.id;
    }
    return await this.imageRepository.save(img, {
      reload: true,
    });
  }

  async createIfNotExistFromUrl(image: ImageDto) {
    let img: Image;
    if (image.id) {
      img = await this.imageRepository.findOne({
        where: { id: image.id },
      });
      if (!img) {
        img = await this.createFromUrl(image);
      }
    } else {
      img = await this.createFromUrl(image);
    }

    return img;
  }

  async createManyIfNotExistFromUrl(images: ImageDto[]) {
    const imgs: any = [];
    for (const image of images) {
      const img = await this.createIfNotExistFromUrl(image);
      imgs.push(img);
    }
    return imgs;
  }
}
