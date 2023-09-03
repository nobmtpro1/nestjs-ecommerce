import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { productTypes } from 'src/modules/product/enums/product-type.enum';
import { Image } from 'src/entities/image.entity';

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

  async create(body) {
    const product = this.productRepository.create({
      type: body?.type,
      name: body?.name,
      shortDescription: body?.shortDescription,
      description: body?.description,
    });
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
    });
    product.image = { ...new Image(), id: body?.imageId };
    product.gallery = body?.gallery?.map((imageId) => ({
      ...new Image(),
      id: imageId,
    }));

    product.save();
    return updatedProduct;
  }
}
