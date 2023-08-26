import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [TypeOrmModule, ProductService],
})
export class ProductModule {}
