import { Global, Module } from '@nestjs/common';
import { TestController } from './controllers/test.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthorizationModule } from '../authorization/authorization.module';
import { MailModule } from '../mail/mail.module';
import { MinioModule } from '../minio/minio.module';

@Module({
  imports: [
    JwtModule,
    UserModule,
    AuthorizationModule,
    MailModule,
    MinioModule,
  ],
  controllers: [TestController],
  providers: [],
  exports: [],
})
export class TestModule {}
