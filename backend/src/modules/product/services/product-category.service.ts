import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategory } from 'src/modules/product/entities/product-category.entity';
import { ProductCategoryRepository } from 'src/modules/product/repositories/product-category.repository';

@Injectable()
export class ProductCategoryService {
  constructor(private productCategoryRepository: ProductCategoryRepository) {}

  async all() {
    const products = await this.productCategoryRepository.find({
      order: {
        createdAt: 'DESC',
      },
      relations: { image: true, products: true },
    });
    return products;
  }
}
