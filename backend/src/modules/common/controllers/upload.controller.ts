import {
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
import LocalFilesInterceptor from '../interceptors/local-file.interceptor';
import { ResponseSuccess } from 'src/commons/dtos/response.dto';

@UseGuards(AuthGuard)
@Controller('upload')
export class UploadController {
  @Post('image')
  @UseInterceptors(
    LocalFilesInterceptor({
      fieldName: 'file',
      path: '/images',
    }),
  )
  async uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10000000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log(file);
    return new ResponseSuccess('Upload success', file);
  }
}
