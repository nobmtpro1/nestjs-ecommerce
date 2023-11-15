import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductTag } from 'src/entities/product-tag.entity';
import { ProductTagRepository } from 'src/repositories/product-tag.repository';

@Injectable()
export class ProductTagService {
  constructor(private productTagRepository: ProductTagRepository) {}

  async all() {
    const tags = await this.productTagRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
    return tags;
  }

  async create(body) {
    const tag = this.productTagRepository.create({
      name: body?.name,
    });
    const created = await this.productTagRepository.save(tag, {
      reload: true,
    });
    return created;
  }
}
