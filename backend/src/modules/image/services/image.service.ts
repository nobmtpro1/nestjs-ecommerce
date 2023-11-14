import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from 'src/entities/image.entity';
import { generateFilePath } from '../../../commons/helpers';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) {}

  async create(file) {
    console.log(file);
    if (file) {
      const image = this.imageRepository.create({
        src: generateFilePath(file),
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
