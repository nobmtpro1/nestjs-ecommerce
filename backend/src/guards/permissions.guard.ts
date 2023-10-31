import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSION_KEY } from 'src/commons/constants';
import { Permission } from 'src/enums/user-permission.enum';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

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
    if (!user) {
      return false;
    }
    return requiredPermissions.some(
      (permission) => user.permissions?.includes(permission),
    );
  }
}
