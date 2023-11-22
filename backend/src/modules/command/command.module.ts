import { Module } from '@nestjs/common';
import { SeedCommand } from './commands/seed.command';
import { GHNModule } from '../ghn/ghn.module';

@Module({
  imports: [GHNModule],
  controllers: [],
  providers: [SeedCommand],
  exports: [SeedCommand],
})
export class CommandModule {}
