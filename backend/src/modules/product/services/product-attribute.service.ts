import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductAttribute } from 'src/entities/product-attribute.entity';
import { ProductAttributeValue } from 'src/entities/product-attribute-value.entity';
import {
  CreateProductAttributeValueDto,
  UpdateProductAttributeValueDto,
} from '../dtos/product-attribute-value.dto';
import { UpdateProductAttributeDto } from '../dtos/product-attribute.dto';

@Injectable()
export class ProductAttributeService {
  constructor(
    @InjectRepository(ProductAttribute)
    private productAttributeRepository: Repository<ProductAttribute>,
    @InjectRepository(ProductAttributeValue)
    private productAttributeValueRepository: Repository<ProductAttributeValue>,
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
      relations: {
        productAttributeValues: true,
      },
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

  async update(
    productAttribute: ProductAttribute,
    body: UpdateProductAttributeDto,
  ) {
    productAttribute.name = body?.name?.toLowerCase();
    productAttribute.save();
    return await this.findById(productAttribute.id);
  }

  async delete(attribute: ProductAttribute) {
    await attribute.remove();
    return attribute;
  }

  async createAttributeValue(
    body: CreateProductAttributeValueDto,
    attribute: ProductAttribute,
  ) {
    const productAttributeValue = this.productAttributeValueRepository.create({
      name: body?.name?.toLowerCase(),
      productAttribute: attribute,
    });
    const created = await this.productAttributeValueRepository.save(
      productAttributeValue,
      {
        reload: true,
      },
    );
    return created;
  }

  async findAttributeValueById(id: string) {
    const productAttributeValue =
      await this.productAttributeValueRepository.findOne({
        where: { id },
      });
    return productAttributeValue;
  }

  async updateAttributeValue(
    attributeValue: ProductAttributeValue,
    body: UpdateProductAttributeValueDto,
  ) {
    attributeValue.name = body?.name;
    attributeValue.save();
    return await this.findById(attributeValue.id);
  }

  async deleteAttributeValue(attributeValue: ProductAttributeValue) {
    await attributeValue.remove();
    return attributeValue;
  }
}
