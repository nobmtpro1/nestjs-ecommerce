import { Module } from '@nestjs/common';
import { SeedCommand } from './commands/seed.command';
import { GHNModule } from '../ghn/ghn.module';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [GHNModule, ProductModule],
  controllers: [],
  providers: [SeedCommand],
  exports: [SeedCommand],
})
export class CommandModule {}
