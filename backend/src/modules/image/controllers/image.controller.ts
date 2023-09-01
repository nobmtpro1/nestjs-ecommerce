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
import { AuthGuard } from '../../auth/auth.guard';
import LocalFilesInterceptor from '../../../commons/interceptor/local-file.interceptor';
import { ResponseSuccess } from 'src/commons/dtos/response.dto';
import { ImageService } from '../services/image.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer';

@UseGuards(AuthGuard)
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload')
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'images', maxCount: 100 }], multerOptions),
  )
  async uploadImage(
    @UploadedFiles()
    files: {
      images?: Express.Multer.File[];
    },
  ) {
    const images = await this.imageService.bulkCreate(files?.images);
    return new ResponseSuccess('Upload success', images);
  }
}
