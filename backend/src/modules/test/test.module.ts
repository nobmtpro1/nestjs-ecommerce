import { Global, Module } from '@nestjs/common';
import { TestController } from './controllers/image.controller';

@Global()
@Module({
  imports: [],
  controllers: [TestController],
  providers: [],
  exports: [],
})
export class TestModule {}
