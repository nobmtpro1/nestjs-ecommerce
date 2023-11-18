import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { UserRepository } from 'src/modules/user/repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('mail'),
    }),
    TypeOrmModule,
    UserModule,
  ],
  controllers: [],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
