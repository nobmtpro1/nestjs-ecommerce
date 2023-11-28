import { Global, Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from 'src/modules/user/repositories/user.repository';
import { UserTokenRepository } from './repositories/user-token.repository';
import { UserAddressRepository } from './repositories/user-address.repository';
import { UserAddressService } from './services/user-address.service';

@Module({
  imports: [TypeOrmModule, JwtModule],
  controllers: [UserController],
  providers: [
    UserService,
    UserAddressService,
    UserRepository,
    UserTokenRepository,
    UserAddressRepository,
  ],
  exports: [
    UserService,
    UserAddressService,
    UserRepository,
    UserTokenRepository,
    UserAddressRepository,
  ],
})
export class UserModule {}
