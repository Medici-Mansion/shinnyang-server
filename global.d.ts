declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly DB_HOST: string;
    readonly DB_PORT: string;
    readonly DB_USER: string;
    readonly DB_PWD: string;
    readonly DB_NAME: string;
    readonly REDIS_HOST: string;
    readonly REDIS_PASSWORD: string;
  }
}
