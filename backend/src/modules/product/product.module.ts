import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { ProductCategoryController } from './controllers/product-category.controller';
import { ProductCategoryService } from './services/product-category.service';
import { ProductCategory } from 'src/entities/product-category.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductCategory])],
  controllers: [ProductController, ProductCategoryController],
  providers: [ProductService, ProductCategoryService],
  exports: [TypeOrmModule, ProductService, ProductCategoryService],
})
export class ProductModule {}
