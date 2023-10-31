import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { Permission } from '../../enums/user-permission.enum';
import { Role } from 'src/enums/user-role.enum';

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
