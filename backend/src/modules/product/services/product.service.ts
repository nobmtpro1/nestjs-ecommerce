import { Inject, Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { productTypes } from 'src/entities/enums/product-type.enum';
import { Image } from 'src/entities/image.entity';
import { ProductCategory } from 'src/entities/product-category.entity';
import { productStatus } from 'src/entities/enums/is-active.enum';
import { ProductTag } from 'src/entities/product-tag.entity';
import slugify from 'slugify';
import { Guid } from 'guid-typescript';
import { ProductSimpleData } from 'src/entities/product-simple-data.entity';
import { productStockStatus } from 'src/entities/enums/product-stock-status';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductSimpleData)
    private productSimpleDataRepository: Repository<ProductSimpleData>,
  ) {}

  async get({ search }: { search?: string }) {
    const where: any = {};
    if (search) {
      where.name = Like(`%${search}%`);
    }
    const products = await this.productRepository.find({
      where,
      order: {
        createdAt: 'DESC',
      },
      relations: { image: true, simpleData: true },
    });
    return products;
  }

  async getProductTypes() {
    return productTypes;
  }

  async getProductStatus() {
    return productStatus;
  }

  async getProductStockStatus() {
    return productStockStatus;
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

    let simpleData = new ProductSimpleData();
    simpleData.product = product;
    simpleData.regularPrice = body?.simpleRegularPrice || 0;
    simpleData.salePrice = body?.simpleSalePrice || 0;
    simpleData.salePriceFrom = body?.simpleSalePriceFrom || null;
    simpleData.salePriceTo = body?.simpleSalePriceTo || null;
    simpleData.sku = body?.simpleSku || null;
    simpleData.stock = body?.simpleStock || null;
    simpleData.stockStatus = body?.simpleStockStatus || '';
    simpleData.soldIndividually = body?.simpleSoldIndividually || false;
    simpleData.save();
    return created;
  }

  async findById(id: string) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: {
        image: true,
        gallery: true,
        categories: true,
        tags: true,
        simpleData: true,
      },
    });
    return product;
  }

  async findBySlug(slug: string) {
    const product = await this.productRepository.findOne({
      where: { slug },
      relations: {
        image: true,
        gallery: true,
        categories: true,
        tags: true,
        simpleData: true,
      },
    });
    return product;
  }

  async update(product, body) {
    product.status = body?.status || '';
    product.name = body?.name;
    product.shortDescription = body?.shortDescription;
    product.description = body?.description;
    product.type = body?.type;
    product.slug = await this.generateSlug(body?.slug, product);

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

    let simpleData = new ProductSimpleData();
    simpleData.product = product;
    if (product.simpleData) {
      simpleData = await this.productSimpleDataRepository.findOne({
        where: { id: product.simpleData.id },
      });
    }
    simpleData.regularPrice = body?.simpleRegularPrice || 0;
    simpleData.salePrice = body?.simpleSalePrice || 0;
    simpleData.salePriceFrom = body?.simpleSalePriceFrom || null;
    simpleData.salePriceTo = body?.simpleSalePriceTo || null;
    simpleData.sku = body?.simpleSku || null;
    simpleData.stock = body?.simpleStock || null;
    simpleData.stockStatus = body?.simpleStockStatus || '';
    simpleData.soldIndividually = body?.simpleSoldIndividually || false;
    simpleData.save();

    return await this.findById(product.id);
  }

  async generateSlug(inputSlug: string, product?: Product) {
    let slug = slugify(inputSlug.toLowerCase());
    const findProduct = await this.productRepository.findOne({
      where: { slug: slug },
    });
    if (findProduct) {
      if (product) {
        if (product.id != findProduct.id) {
          slug = slug + '-' + Guid.create().toString();
        }
      } else {
        slug = slug + '-' + Guid.create().toString();
      }
    }
    return slug;
  }

  async delete(product) {
    await this.productRepository.remove(product);
    return product;
  }
}
