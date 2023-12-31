import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { Like } from 'typeorm';
import { Product } from 'src/modules/product/entities/product.entity';
import { ProductCategory } from 'src/modules/product/entities/product-category.entity';
import {
  ProductStatusView,
  productStatus,
} from 'src/modules/product/enums/product.enum';
import slugify from 'slugify';
import { Guid } from 'guid-typescript';
import {
  CreateProductDto,
  SearchProductDto,
  UpdateProductDto,
} from '../dtos/product.dto';
import { ProductRepository } from 'src/modules/product/repositories/product.repository';
import { ProductTagService } from './product-tag.service';
import { ImageService } from 'src/modules/image/services/image.service';
import { ProductOptionService } from './product-option.service';
import { ProductVariantService } from './product-variant.service';
import { IProductService } from '../interfaces/product-service.interface';
import { SearchService } from 'src/modules/search/search.service';
import { Pagination } from 'src/modules/common/interfaces/pagination.interface';

@Injectable()
export class ProductService implements IProductService {
  constructor(
    private productRepository: ProductRepository,
    private productTagService: ProductTagService,
    private productOptionService: ProductOptionService,
    private productVariantService: ProductVariantService,
    private imageService: ImageService,
    @Inject(forwardRef(() => SearchService))
    private searchService: SearchService,
  ) {}

  async get(query: SearchProductDto) {
    let productIds: any = null;
    if (query.search) {
      const searchIndex: any = await this.searchService.searchProduct(
        query.search,
        1000,
      );
      if (searchIndex.hits.total.value > 0) {
        productIds = searchIndex.hits.hits.map((hit) => hit._source.id);
      } else {
        return new Pagination<Product>({
          results: [],
          totalItems: 0,
          pageSize: query.limit,
          currentPage: query.page,
        });
      }
    }
    const products = await this.productRepository.search(query, productIds);
    return products;
  }

  async getAll() {
    const products = await this.productRepository.find();
    return products;
  }

  getProductStatus(): ProductStatusView[] {
    return productStatus;
  }

  async create(body: CreateProductDto) {
    const handle = await this.generateSlug(body?.handle);
    const product = this.productRepository.create({
      status: body.status,
      title: body?.title,
      handle: handle,
      body_html: body?.body_html,
    });

    product.categories = body?.categories?.map((id) => {
      const obj = new ProductCategory();
      obj.id = id;
      return obj;
    });

    product.tags = await this.productTagService.createManyIfNotExist(
      body.tags.split(','),
    );

    product.images = await this.imageService.createManyIfNotExistFromUrl(
      body.images,
    );

    if (body.image) {
      product.image = await this.imageService.createIfNotExistFromUrl(
        body.image,
      );
    }

    product.options = await this.productOptionService.createMany(body.options);
    product.variants = await this.productVariantService.createMany(
      body.variants,
    );

    const created = await this.productRepository.save(product, {
      reload: true,
    });
    return created;
  }

  async bulkCreate(body: any) {
    const created = [];
    for (const product of body) {
      const createdProduct = await this.create(product);
      created.push(created);
    }
    return created;
  }

  async findById(id: number) {
    // const product = await this.productRepository.findOne({
    //   where: { id },
    //   relations: {
    //     image: true,
    //     gallery: true,
    //     categories: true,
    //     tags: true,
    //     variants: true,
    //     options: true,
    //   },
    // });

    const product = this.productRepository
      .createQueryBuilder('product')
      .where('product.id = :id', { id })
      .leftJoinAndSelect('product.image', 'image')
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.categories', 'categories')
      .leftJoinAndSelect('product.tags', 'tags')
      .leftJoinAndSelect('product.variants', 'variants')
      .leftJoinAndSelect('product.options', 'options')
      .getOne();

    return product;
  }

  async findBySlug(handle: string) {
    const product = await this.productRepository.findOne({
      where: { handle },
      relations: {
        image: true,
        images: true,
        categories: true,
        tags: true,
        variants: true,
        options: true,
      },
    });
    return product;
  }

  async update(product: Product, body: UpdateProductDto) {
    // return product;
    product.status = body.status;
    product.title = body?.title;
    product.body_html = body?.body_html;
    if (product.handle != body?.handle) {
      product.handle = await this.generateSlug(body?.handle, product);
    }

    product.categories = body?.categories?.map((id) => {
      const obj = new ProductCategory();
      obj.id = id;
      return obj;
    });

    product.tags = await this.productTagService.createManyIfNotExist(
      body.tags.split(','),
    );

    product.images = await this.imageService.createManyIfNotExistFromUrl(
      body.images,
    );

    product.image = await this.imageService.createIfNotExistFromUrl(body.image);

    product.options = await this.productOptionService.updateOrCreateMany(
      body.options,
    );

    product.variants = await this.productVariantService.updateOrCreateMany(
      body.variants,
    );

    await product.save();

    return await this.findById(product.id);
  }

  async generateSlug(inputSlug: string, product?: Product) {
    let handle = slugify(inputSlug.toLowerCase());
    const findProduct = await this.productRepository.findOne({
      where: { handle: handle },
    });
    if (findProduct) {
      if (product) {
        if (product.id != findProduct.id) {
          handle = handle + '-' + Guid.create().toString();
        }
      } else {
        handle = handle + '-' + Guid.create().toString();
      }
    }
    return handle;
  }

  async delete(product: Product) {
    await this.productRepository.remove(product);
    return product;
  }
}
