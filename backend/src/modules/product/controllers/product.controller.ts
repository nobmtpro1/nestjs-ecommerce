import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { ProductService } from '../services/product.service';
import { CreateProductDto } from '../dtos/create-product.dto';
import { ResponseError, ResponseSuccess } from 'src/commons/dtos/response.dto';
import { Public } from 'src/commons/decorators';
import LocalFilesInterceptor from 'src/commons/interceptor/local-file.interceptor';
import { ImageService } from 'src/modules/image/services/image.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer';

@UseGuards(AuthGuard)
@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly imageService: ImageService,
  ) {}

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
    FileFieldsInterceptor(
      [
        { name: 'image', maxCount: 1 },
        { name: 'gallery', maxCount: 10 },
      ],
      multerOptions,
    ),
  )
  async postCreate(
    @UploadedFiles()
    files: {
      image?: Express.Multer.File[];
      gallery?: Express.Multer.File[];
    },
    @Body() body: CreateProductDto,
  ) {
    console.log(files);
    console.log(body);
    const createdImage = await this.imageService.create(files?.image?.[0]);
    const product = await this.productService.create(body, createdImage);
    return new ResponseSuccess('Success', product);
  }

  @Get('find-by-id/:id')
  async findById(@Param('id') id) {
    const product = await this.productService.findById(id);
    return new ResponseSuccess('Success', product);
  }

  @Post('update/:id')
  async update(@Body() body: CreateProductDto, @Param('id') id) {
    console.log(body)
    const product = await this.productService.findById(id);
    if (!product) {
      return new ResponseError('Not Found');
    }

    const updatedProduct = await this.productService.update(product, body);
    return new ResponseSuccess('Success', updatedProduct);
  }
}
