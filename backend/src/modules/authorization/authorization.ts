import { Permission } from './permission.enum';
import { Role } from './role.enum';

const authorization = [
  {
    role: Role.USER,
    permissions: [Permission.PRODUCT_READ],
  },
  {
    role: Role.ADMIN,
    permissions: [Permission.PRODUCT_MANAGE],
  },
];

export default authorization;
