import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/authentication/auth.module';
import typeorm from './configs/typeorm';
import { ProductModule } from './modules/product/product.module';
import { ImageModule } from './modules/image/image.module';
import auth from './configs/auth';
import { TestModule } from './modules/test/test.module';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthorizationModule } from './modules/authorization/authorization.module';
import { MailerModule } from '@nestjs-modules/mailer';
import mail from './configs/mail';
import { MailModule } from './modules/mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm, auth, mail],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('mail'),
    }),
    AuthorizationModule,
    MailModule,
    UserModule,
    AuthModule,
    ProductModule,
    ImageModule,
    TestModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
