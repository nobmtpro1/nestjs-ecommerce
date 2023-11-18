import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSION_KEY } from 'src/commons/constants';
import { Permission } from 'src/modules/user/enums/user-permission.enum';
import { AuthorizationService } from 'src/modules/authorization/authorization.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authorizationService: AuthorizationService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    console.log('PermissionsGuard');
    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(
      PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredPermissions) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return this.authorizationService.hasPermissions(user, requiredPermissions);
  }
}
