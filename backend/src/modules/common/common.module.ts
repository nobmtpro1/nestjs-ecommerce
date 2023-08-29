import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadController } from './controllers/upload.controller';

@Global()
@Module({
  imports: [],
  controllers: [UploadController],
  providers: [],
  exports: [],
})
export class CommonModule {}
