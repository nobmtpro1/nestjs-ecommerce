import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../authentication/guards/auth.guard';
import { ResponseError, ResponseSuccess } from 'src/modules/common/response';
import { ProductCategoryService } from '../services/product-category.service';
import { Public } from 'src/modules/authentication/decorators/public.decorator';

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
