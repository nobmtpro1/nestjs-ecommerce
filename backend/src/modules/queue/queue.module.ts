import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EmailProcessor } from './processors/mail.processor';
import { MailModule } from '../mail/mail.module';
import { UserModule } from '../user/user.module';

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
    UserModule,
  ],
  controllers: [],
  providers: [EmailProcessor],
  exports: [BullModule],
})
export class QueueModule {}
