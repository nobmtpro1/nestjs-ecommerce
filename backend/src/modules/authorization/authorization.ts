import { Permission } from 'src/modules/authorization/enums/permission.enum';
import { Role } from 'src/modules/authorization/enums/role.enum';

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
