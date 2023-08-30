import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import {
  ProductType,
  productTypes,
} from 'src/modules/product/enums/product-type.enum';
import { generateFilePath } from 'src/commons/helpers';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async all() {
    const products = await this.productRepository.find();
    return products;
  }

  async getProductTypes() {
    return {
      productTypes: productTypes,
    };
  }

  async create(body, image) {
    const product = this.productRepository.create({
      ...body,
      image: generateFilePath(image),
    });
    const created = await this.productRepository.save(product, {
      reload: true,
    });
    return created;
  }

  async findById(id) {
    const product = await this.productRepository.findOneBy({ id: id });
    return product;
  }

  async update(id, body, image) {
    const product = this.productRepository.update(id, {
      ...body,
      image: generateFilePath(image),
    });
    return product;
  }
}
