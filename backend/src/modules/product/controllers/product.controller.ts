import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { ProductService } from '../services/product.service';
import { CreateProductDto } from '../dtos/create-product.dto';
import { ResponseError, ResponseSuccess } from 'src/commons/dtos/response.dto';

@UseGuards(AuthGuard)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('all')
  async all() {
    return await this.productService.all();
  }

  @Get('create')
  async getCreate() {
    return await this.productService.getProductTypes();
  }

  @Post('create')
  async postCreate(@Body() body: CreateProductDto) {
    console.log(body);
    const product = await this.productService.create(body);
    return new ResponseSuccess('Success', product);
  }

  @Get('find-by-id/:id')
  async findById(@Param('id') id) {
    const product = await this.productService.findById(id);
    return new ResponseSuccess('Success', product);
  }

  @Post('update/:id')
  async update(@Body() body: CreateProductDto, @Param('id') id) {
    const product = await this.productService.findById(id);
    if (!product) {
      return new ResponseError('Not Found');
    }
    const updatedProduct = await this.productService.update(product, body);
    return new ResponseSuccess('Success', updatedProduct);
  }
}
