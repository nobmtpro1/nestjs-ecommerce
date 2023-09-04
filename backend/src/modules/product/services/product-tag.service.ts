import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductTag } from 'src/entities/product-tag.entity';

@Injectable()
export class ProductTagService {
  constructor(
    @InjectRepository(ProductTag)
    private productTagRepository: Repository<ProductTag>,
  ) {}

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
