import { registerAs } from '@nestjs/config';

const config = {
  JWT_ACCESS_TOKEN_SECRET: 'JWT_ACCESS_TOKEN_SECRET',
  JWT_ACCESS_TOKEN_EXPIRATION_TIME: '60s',
  JWT_REFRESH_TOKEN_SECRET: 'JWT_REFRESH_TOKEN_SECRET',
  JWT_REFRESH_TOKEN_EXPIRATION_TIME: '1000s',
};

export default registerAs('auth', () => config);
