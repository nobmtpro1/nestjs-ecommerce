import { Global, Module } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [AuthorizationService],
  exports: [AuthorizationService],
})
export class AuthorizationModule {}
