import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { productTypes } from 'src/entities/enums/product-type.enum';
import { Image } from 'src/entities/image.entity';
import { ProductCategory } from 'src/entities/product-category.entity';
import {
  ProductStatus,
  productStatus,
} from 'src/entities/enums/is-active.enum';

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
    return productTypes;
  }

  async getProductStatus() {
    return productStatus;
  }

  async create(body) {
    const product = this.productRepository.create({
      status: body?.status,
      type: body?.type,
      name: body?.name,
      shortDescription: body?.shortDescription,
      description: body?.description,
      categories: body?.categories?.map((id) => ({
        ...new ProductCategory(),
        id,
      })),
    });
    product.categories = body?.categories?.map((id) => ({
      ...new ProductCategory(),
      id,
    }));
    const image = new Image();
    image.id = body?.imageId;
    product.image = image;
    product.gallery = body?.gallery?.map((imageId) => ({
      ...new Image(),
      id: imageId,
    }));
    const created = await this.productRepository.save(product, {
      reload: true,
    });
    return created;
  }

  async findById(id) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: { image: true, gallery: true, categories: true },
    });
    return product;
  }

  async update(product, body) {
    product.status = body?.status;
    product.name = body?.name;
    product.shortDescription = body?.shortDescription;
    product.description = body?.description;
    product.type = body?.type;

    product.categories = body?.categories?.map((id) => ({
      ...new ProductCategory(),
      id,
    }));
    product.image = { ...new Image(), id: body?.imageId };
    product.gallery = body?.gallery?.map((imageId) => ({
      ...new Image(),
      id: imageId,
    }));

    product.save();
    return product;
  }
}
