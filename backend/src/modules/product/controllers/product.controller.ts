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
    const createdImage = await this.imageService.create(image);
    const product = await this.productService.create(body, createdImage);
    return new ResponseSuccess('Success', product);
  }

  @Get('find-by-id/:id')
  async findById(@Param('id') id) {
    const product = await this.productService.findById(id);
    return new ResponseSuccess('Success', product);
  }

  @Post('update/:id')
  @UseInterceptors(
    LocalFilesInterceptor({
      fieldName: 'image',
      path: '/images',
    }),
  )
  async update(
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
    @Param('id') id,
  ) {
    const product = await this.productService.findById(id);
    if (!product) {
      return new ResponseError('Not Found');
    }
    let createdImage;
    if (image) {
      createdImage = await this.imageService.create(image);
    }
    const updatedProduct = await this.productService.update(
      product,
      body,
      createdImage,
    );
    return new ResponseSuccess('Success', updatedProduct);
  }
}
