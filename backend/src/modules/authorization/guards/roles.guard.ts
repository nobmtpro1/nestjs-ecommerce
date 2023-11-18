import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/commons/constants';
import { Role } from 'src/modules/authorization/enums/role.enum';
import { AuthorizationService } from 'src/modules/authorization/authorization.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authorizationService: AuthorizationService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    console.log('RolesGuard');
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return this.authorizationService.hasRoles(user, requiredRoles);
  }
}
