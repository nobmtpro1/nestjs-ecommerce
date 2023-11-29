import { Controller, Get } from '@nestjs/common';
import { ResponseSuccess } from 'src/modules/common/response';
import { CommonService } from '../services/common.service';

@Controller('common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @Get('')
  async get() {
    const common = await this.commonService.get();
    return new ResponseSuccess('Success', common);
  }
}
