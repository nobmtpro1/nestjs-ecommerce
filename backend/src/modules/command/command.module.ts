import { Module } from '@nestjs/common';
import { SeedCommand } from './commands/seed.command';

@Module({
  imports: [],
  controllers: [],
  providers: [SeedCommand],
  exports: [SeedCommand],
})
export class CommandModule {}
