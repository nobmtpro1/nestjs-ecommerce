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
import redis from './configs/redis';
import { QueueModule } from './modules/queue/queue.module';
import { WinstonModule } from 'nest-winston';
import winston from './configs/winston';
import { TaskSchedulingModule } from './modules/task-scheduling/task-scheduling.module';
import { CommandModule } from './modules/command/command.module';
import { CommonModule } from './modules/common/common.module';
import { GHNModule } from './modules/ghn/ghn.module';
import ghn from './configs/ghn';
import { AddressModule } from './modules/address/address.module';
import { SearchModule } from './modules/search/search.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm, auth, mail, minio, redis, ghn],
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
    TaskSchedulingModule,
    CommandModule,
    AuthorizationModule,
    MailModule,
    MinioClientModule,
    UserModule,
    AuthModule,
    ProductModule,
    ImageModule,
    TestModule,
    CommonModule,
    GHNModule,
    AddressModule,
    SearchModule,
  ],
  controllers: [AppController],
  providers: [Logger],
})
export class AppModule {}
