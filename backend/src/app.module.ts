import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import typeorm from './config/typeorm';
import { ProductModule } from './modules/product/product.module';
import { ImageModule } from './modules/image/image.module';
import auth from './config/auth';
import { TestModule } from './modules/test/test.module';
import configuration from './config/configuration';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration, typeorm, auth],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    CacheModule.register({
      isGlobal: true,
    }),
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
