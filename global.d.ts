declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly DB_HOST: string;
    readonly DB_PORT: string;
    readonly DB_USER: string;
    readonly DB_PWD: string;
    readonly DB_NAME: string;
    readonly REDIS_HOST: string;
    readonly REDIS_PORT: string;
    readonly REDIS_PASSWORD: string;
    readonly GOOGLE_API_KEY: string;
    readonly GOOGLE_AUTH_CLIENT_ID: string;
    readonly GOOGLE_REDIRECT_URL: string;
    readonly GOOGLE_CLIENT_SECRET: string;
    readonly JWT_SECRET: string;
    readonly JWT_EXPIRATION: string;
    readonly JWT_REFRESH_EXPIRATION: string;
  }
}
