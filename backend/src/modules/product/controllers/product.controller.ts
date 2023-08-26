import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { Public } from 'src/commons/decorators';
import { ProductService } from '../services/product.service';
import { Product } from 'src/entities/product.entity';

@UseGuards(AuthGuard)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('all')
  async all(): Promise<Product[]> {
    return await this.productService.all();
  }
}
