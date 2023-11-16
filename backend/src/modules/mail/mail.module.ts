import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { UserRepository } from 'src/repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('mail'),
    }),
    TypeOrmModule,
  ],
  controllers: [],
  providers: [MailService, UserRepository],
  exports: [MailService],
})
export class MailModule {}
