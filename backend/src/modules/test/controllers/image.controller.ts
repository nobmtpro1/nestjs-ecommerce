import { Controller, Get } from '@nestjs/common';
import { ResponseSuccess } from 'src/commons/dtos/response.dto';
import { Public } from 'src/commons/decorators';

@Controller('test')
export class TestController {
  @Public()
  @Get('')
  async index() {
    console.log(process.env.TEST, process.env.DATABASE_NAME);
    return new ResponseSuccess('Upload success');
  }
}
