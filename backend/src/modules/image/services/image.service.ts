import { Injectable } from '@nestjs/common';
import { MinioClientService } from 'src/modules/minio-client/minio-client.service';
import { ImageRepository } from 'src/repositories/image.repository';

@Injectable()
export class ImageService {
  constructor(
    private imageRepository: ImageRepository,
    private minioClientService: MinioClientService,
  ) {}

  async create(file) {
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

  async bulkCreate(files) {
    const createdFiles = [];
    for (const file of files) {
      if (file) {
        createdFiles.push(await this.create(file));
      }
    }
    return createdFiles;
  }
}
