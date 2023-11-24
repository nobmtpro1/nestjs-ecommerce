import { Global, Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from 'src/modules/user/repositories/user.repository';
import { UserTokenRepository } from './repositories/user-token.repository';

@Module({
  imports: [TypeOrmModule, JwtModule],
  controllers: [UserController],
  providers: [UserService, UserRepository, UserTokenRepository],
  exports: [UserService, UserRepository, UserTokenRepository],
})
export class UserModule {}
