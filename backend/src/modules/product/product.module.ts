import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { ProductCategoryController } from './controllers/product-category.controller';
import { ProductCategoryService } from './services/product-category.service';
import { ProductCategory } from 'src/entities/product-category.entity';
import { ProductTagService } from './services/product-tag.service';
import { ProductTag } from 'src/entities/product-tag.entity';
import { ProductTagController } from './controllers/product-tag.controller';
import { ProductSimpleData } from 'src/entities/product-simple-data.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductCategory,
      ProductTag,
      ProductSimpleData,
    ]),
  ],
  controllers: [
    ProductController,
    ProductCategoryController,
    ProductTagController,
  ],
  providers: [ProductService, ProductCategoryService, ProductTagService],
  exports: [
    TypeOrmModule,
    ProductService,
    ProductCategoryService,
    ProductTagService,
  ],
})
export class ProductModule {}
