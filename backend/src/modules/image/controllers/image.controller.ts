import {
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '../../authentication/guards/auth.guard';
import { ResponseSuccess } from 'src/modules/common/response';
import { ImageService } from '../services/image.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/modules/authentication/decorators/public.decorator';

@UseGuards(AuthGuard)
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Public()
  @Post('upload')
  // @UseInterceptors(
  //   FileFieldsInterceptor([{ name: 'images', maxCount: 100 }], multerOptions),
  // )
  @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 100 }]))
  async uploadImage(
    @UploadedFiles()
    files: {
      images?: Express.Multer.File[];
    },
  ) {
    console.log(files);
    const images = await this.imageService.bulkCreate(files?.images);
    return new ResponseSuccess('Upload success', images);
  }
}
