import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from 'src/entities/image.entity';
import { generateFilePath } from 'src/commons/helpers';

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) {}

  async create(file) {
    const image = this.imageRepository.create({ src: generateFilePath(file) });
    const created = await this.imageRepository.save(image, {
      reload: true,
    });
    return created;
  }
}
