import { Permission } from 'src/enums/user-permission.enum';
import { Role } from 'src/enums/user-role.enum';

const AUTHORIZATION = [
  {
    role: Role.USER,
    permissions: [Permission.PRODUCT_READ],
  },
  {
    role: Role.ADMIN,
    permissions: [Permission.PRODUCT_MANAGE, Permission.PRODUCT_DELETE],
  },
];

export default AUTHORIZATION;
