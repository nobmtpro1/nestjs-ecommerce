export default () => ({
  auth: {
    JWT_ACCESS_TOKEN_SECRET: 'JWT_ACCESS_TOKEN_SECRET',
    JWT_ACCESS_TOKEN_EXPIRATION_TIME: '10000s',
    JWT_REFRESH_TOKEN_SECRET: 'JWT_REFRESH_TOKEN_SECRET',
    JWT_REFRESH_TOKEN_EXPIRATION_TIME: '10000s',
    OAUTH_GOOGLE_CLIENT_ID:
      '100145523264-8c7nagqdq1ssv696k8j06sseq7e9m1nb.apps.googleusercontent.com',
    OAUTH_GOOGLE_CLIENT_SECRET: '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',
    OAUTH_GOOGLE_CALLBACK_URL: 'http://localhost:3001/oauth/google',
  },
});
