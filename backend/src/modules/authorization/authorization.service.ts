import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { Permission } from '../../enums/permission.enum';
import { Role } from 'src/enums/role.enum';

@Injectable()
export class AuthorizationService {
  async authorization() {
    return [
      {
        role: Role.USER,
        permissions: [Permission.PRODUCT_READ],
      },
      {
        role: Role.ADMIN,
        permissions: [Permission.PRODUCT_MANAGE],
      },
    ];
  }

  async can(user: User, permission: Permission[]) {}
}
