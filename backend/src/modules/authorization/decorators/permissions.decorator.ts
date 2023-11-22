import { SetMetadata } from '@nestjs/common';
import { PERMISSION_KEY } from 'src/modules/common/constants';
import { Permission } from 'src/modules/authorization/enums/permission.enum';

export const Permissions = (...permissions: Permission[]) =>
  SetMetadata(PERMISSION_KEY, permissions);
