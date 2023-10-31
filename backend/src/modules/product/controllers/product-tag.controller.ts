import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../../guards/auth.guard';
import { ResponseError, ResponseSuccess } from 'src/commons/response';
import { Public } from 'src/decorators/public.decorator';
import { ProductTagService } from '../services/product-tag.service';
import { CreateProductTagDto } from '../dtos/product-tag.dto';

@UseGuards(AuthGuard)
@Controller('product-tag')
export class ProductTagController {
  constructor(private readonly productTagService: ProductTagService) {}

  @Public()
  @Get('')
  async all() {
    const tags = await this.productTagService.all();
    return new ResponseSuccess('Success', tags);
  }

  @Post('')
  async create(@Body() body: CreateProductTagDto) {
    const tag = await this.productTagService.create(body);
    return new ResponseSuccess('Success', tag);
  }
}
