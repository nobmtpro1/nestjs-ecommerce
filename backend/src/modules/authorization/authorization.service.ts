import { Injectable } from '@nestjs/common';
import { User } from 'src/modules/user/entities/user.entity';
import { Permission } from './enums/permission.enum';
import { Role } from 'src/modules/authorization/enums/role.enum';
import AUTHORIZATION from 'src/modules/authorization/authorization';

@Injectable()
export class AuthorizationService {
  hasPermissions(user: User, permissions: Permission[]) {
    if (!user) {
      return false;
    }
    if (
      permissions.some((permission) => user.permissions?.includes(permission))
    ) {
      return true;
    }
    const permissionsOfRoles = [];
    user.roles.forEach((role) => {
      const roleInAuthorization = AUTHORIZATION.find(
        (auth) => auth.role == role,
      );
      if (roleInAuthorization) {
        roleInAuthorization.permissions.forEach((permission) => {
          if (!permissionsOfRoles.includes(permission)) {
            permissionsOfRoles.push(permission);
          }
        });
      }
    });

    if (
      permissions.some((permission) => permissionsOfRoles?.includes(permission))
    ) {
      return true;
    }

    return false;
  }

  hasRoles(user: User, roles: Role[]) {
    if (!user) {
      return false;
    }
    if (roles.some((role) => user.roles?.includes(role))) {
      return true;
    }

    return false;
  }
}
