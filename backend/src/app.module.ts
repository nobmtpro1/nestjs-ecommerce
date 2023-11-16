import { Logger, Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/authentication/auth.module';
import { typeorm } from './configs/typeorm';
import { ProductModule } from './modules/product/product.module';
import { ImageModule } from './modules/image/image.module';
import auth from './configs/auth';
import { TestModule } from './modules/test/test.module';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthorizationModule } from './modules/authorization/authorization.module';
import mail from './configs/mail';
import { MailModule } from './modules/mail/mail.module';
import minio from './configs/minio';
import { AppController } from './app.controller';
import { MinioClientModule } from './modules/minio-client/minio-client.module';
import { SeedCommand } from './commands/seed';
import redis from './configs/redis';
import { QueueModule } from './modules/queue/queue.module';
import { WinstonModule } from 'nest-winston';
import winston from './configs/winston';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm, auth, mail, minio, redis],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    WinstonModule.forRoot(winston),
    // modules
    QueueModule,
    AuthorizationModule,
    MailModule,
    MinioClientModule,
    UserModule,
    AuthModule,
    ProductModule,
    ImageModule,
    TestModule,
  ],
  controllers: [AppController],
  providers: [Logger, SeedCommand],
})
export class AppModule {}
