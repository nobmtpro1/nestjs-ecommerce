import { Controller, Get, HttpException } from '@nestjs/common';

@Controller('/')
export class AppController {
  @Get('/')
  async index() {
    throw new HttpException('abc', 500);
    return 'Hello World';
  }
}
