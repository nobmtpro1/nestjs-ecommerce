import { SetMetadata } from '@nestjs/common';
import { PERMISSION_KEY } from 'src/commons/constants';
import { Permission } from 'src/enums/user-permission.enum';

export const Permissions = (...permissions: Permission[]) =>
  SetMetadata(PERMISSION_KEY, permissions);
