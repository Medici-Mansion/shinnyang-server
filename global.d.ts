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
    readonly REDIRECT_URL: string;
    readonly KAKAO_APIKEY: string;
    readonly REDIS_HOST: string;
    readonly REDIS_PORT: string;
    readonly REDIS_PASSWORD: string;
    readonly REDIS_HOST_LOCAL: string;
    readonly REDIS_PORT_LOCAL: string;
    readonly REDIS_PASSWORD_LOCAL: string;
    readonly DB_HOST_LOCAL: string;
    readonly DB_PORT_LOCAL: string;
    readonly DB_USER_LOCAL: string;
    readonly DB_PWD_LOCAL: string;
    readonly DB_NAME_LOCAL: string;
  }
}
