import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmailProcessor } from './processors/mail.processor';
import { UserRepository } from 'src/repositories/user.repository';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('redis'),
    }),
    BullModule.registerQueue({
      name: 'email',
    }),
    MailModule,
  ],
  controllers: [],
  providers: [EmailProcessor, UserRepository],
  exports: [BullModule],
})
export class QueueModule {}
