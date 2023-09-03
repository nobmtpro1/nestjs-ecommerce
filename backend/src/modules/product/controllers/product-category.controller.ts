import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { ResponseError, ResponseSuccess } from 'src/commons/dtos/response.dto';
import { ProductCategoryService } from '../services/product-category.service';
import { Public } from 'src/commons/decorators';

@UseGuards(AuthGuard)
@Controller('product-category')
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Public()
  @Get('')
  async all() {
    const categories = await this.productCategoryService.all();
    return new ResponseSuccess('Success', categories);
  }
}
