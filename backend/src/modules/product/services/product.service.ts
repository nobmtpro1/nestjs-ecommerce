import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { productTypes } from 'src/modules/product/enums/product-type.enum';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async all() {
    const products = await this.productRepository.find({
      order: {
        createdAt: 'DESC',
      },
      relations: { image: true },
    });
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
      data.image = image;
    }
    const product = this.productRepository.create(data);
    const created = await this.productRepository.save(product, {
      reload: true,
    });
    return created;
  }

  async findById(id) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: { image: true, gallery: true },
    });
    return product;
  }

  async update(product, body) {
    const updatedProduct = await this.productRepository.update(product.id, {
      type: body?.type,
      name: body?.name,
      shortDescription: body?.shortDescription,
      description: body?.description,
      image: { id: body?.imageId },
    });
    return updatedProduct;
  }
}
