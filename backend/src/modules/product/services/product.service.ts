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
    const data = {
      ...body,
    };
    if (image) {
      data.image = generateFilePath(image);
    }
    const product = this.productRepository.create(data);
    const created = await this.productRepository.save(product, {
      reload: true,
    });
    return created;
  }

  async findById(id) {
    const product = await this.productRepository.findOneBy({ id: id });
    return product;
  }

  async update(product, body, image) {
    const data = {
      ...body,
    };

    if (image?.filename) {
      data.image = generateFilePath(image);
    } else {
      data.image = product?.image;
    }
    console.log('_____________', data);
    const updatedProduct = await this.productRepository.update(
      product.id,
      data,
    );
    return updatedProduct;
  }
}
