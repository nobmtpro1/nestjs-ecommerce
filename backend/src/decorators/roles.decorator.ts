import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from 'src/commons/constants';
import { Role } from 'src/enums/user-role.enum';

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);