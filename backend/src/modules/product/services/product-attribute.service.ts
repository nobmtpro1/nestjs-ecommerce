import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductAttribute } from 'src/entities/product-attribute.entity';

@Injectable()
export class ProductAttributeService {
  constructor(
    @InjectRepository(ProductAttribute)
    private productAttributeRepository: Repository<ProductAttribute>,
  ) {}

  async all() {
    const attributes = await this.productAttributeRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
    return attributes;
  }

  async findById(id: string) {
    const productAttribute = await this.productAttributeRepository.findOne({
      where: { id },
    });
    return productAttribute;
  }

  async create(body) {
    const productAttribute = this.productAttributeRepository.create({
      name: body?.name?.toLowerCase(),
    });
    const created = await this.productAttributeRepository.save(
      productAttribute,
      {
        reload: true,
      },
    );
    return created;
  }

  async update(productAttribute, body) {
    productAttribute.name = body?.name;
    productAttribute.save();
    return await this.findById(productAttribute.id);
  }
}
