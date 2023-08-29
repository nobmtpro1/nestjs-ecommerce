import { registerAs } from '@nestjs/config';

const config = {
  uploadDestination: 'public',
};

export default registerAs('multer', () => config);
