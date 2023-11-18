import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductTag } from 'src/entities/product-tag.entity';
import { ProductTagRepository } from 'src/modules/product/repositories/product-tag.repository';

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

  async createIfNotExist(tagName: string) {
    let tag = await this.productTagRepository.findOne({
      where: { name: tagName },
    });
    if (!tag) {
      tag = this.productTagRepository.create({
        name: tagName,
      });
      tag = await this.productTagRepository.save(tag, {
        reload: true,
      });
    }
    return tag;
  }

  async createManyIfNotExist(tagNames: string[]) {
    const tags: any = [];
    for (const tagName of tagNames) {
      const tag = await this.createIfNotExist(tagName);
      tags.push(tag);
    }
    return tags;
  }
}
