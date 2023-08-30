import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { ProductType, productTypes } from 'src/commons/enums/product-type.enum';
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
}
