import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from 'src/modules/common/constants';
import { Role } from 'src/modules/authorization/enums/role.enum';

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
