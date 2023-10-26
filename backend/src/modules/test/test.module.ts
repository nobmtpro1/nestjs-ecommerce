import { Global, Module } from '@nestjs/common';
import { TestController } from './controllers/test.controller';

@Global()
@Module({
  imports: [],
  controllers: [TestController],
  providers: [],
  exports: [],
})
export class TestModule {}
