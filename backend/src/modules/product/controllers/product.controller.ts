import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { ProductService } from '../services/product.service';
import LocalFilesInterceptor from 'src/modules/common/interceptors/local-file.interceptor';
import { CreateProductDto } from '../dtos/create-product.dto';
import { ResponseSuccess } from 'src/commons/dtos/response.dto';

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
  @UseInterceptors(
    LocalFilesInterceptor({
      fieldName: 'image',
      path: '/images',
    }),
  )
  async postCreate(
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [
          new MaxFileSizeValidator({ maxSize: 10000000 }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
      }),
    )
    image: Express.Multer.File,
    @Body() body: CreateProductDto,
  ) {
    console.log(image);
    console.log(body);
    const product = await this.productService.create(body, image);
    return new ResponseSuccess('Success', product);
  }
}
