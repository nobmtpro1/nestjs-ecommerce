import { Module } from '@nestjs/common';
import { TestController } from './controllers/test.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthorizationModule } from '../authorization/authorization.module';
import { MailModule } from '../mail/mail.module';
import { MinioClientModule } from '../minio-client/minio-client.module';
import { QueueModule } from '../queue/queue.module';

@Module({
  imports: [
    JwtModule,
    UserModule,
    AuthorizationModule,
    MailModule,
    MinioClientModule,
    QueueModule,
  ],
  controllers: [TestController],
  providers: [],
  exports: [],
})
export class TestModule {}
