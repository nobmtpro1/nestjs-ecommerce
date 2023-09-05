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
import { ProductTag } from 'src/entities/product-tag.entity';
import slugify from 'slugify';
import { Guid } from 'guid-typescript';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async get() {
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
    const slug = await this.generateSlug(body?.slug);
    const product = this.productRepository.create({
      status: body?.status || '',
      type: body?.type,
      name: body?.name,
      slug: slug,
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
    product.tags = body?.tags?.map((id) => ({
      ...new ProductTag(),
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
      relations: { image: true, gallery: true, categories: true, tags: true },
    });
    return product;
  }

  async update(product, body) {
    product.status = body?.status || '';
    product.name = body?.name;
    product.shortDescription = body?.shortDescription;
    product.description = body?.description;
    product.type = body?.type;
    product.slug = await this.generateSlug(body?.slug);

    product.categories = body?.categories?.map((id) => ({
      ...new ProductCategory(),
      id,
    }));
    product.tags = body?.tags?.map((id) => ({
      ...new ProductTag(),
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

  async generateSlug(inputSlug) {
    let slug = slugify(inputSlug);
    const product = await this.productRepository.findOne({
      where: { slug: slug },
    });
    if (product) {
      slug = slug + '-' + Guid.create().toString();
    }
    return slug;
  }

  async delete(product) {
    await this.productRepository.remove(product);
    return product;
  }
}
