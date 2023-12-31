declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly DB_HOST: string;
    readonly DB_PORT: string;
    readonly DB_USER: string;
    readonly DB_PWD: string;
    readonly DB_NAME: string;
    readonly GOOGLE_API_KEY: string;
    readonly GOOGLE_AUTH_CLIENT_ID: string;
    readonly GOOGLE_REDIRECT_URL: string;
    readonly OOGLE_AUTH_CLIENT_SECRET: string;
    readonly KAKAO_CLIENT_ID: string;
    readonly KAKAO_REDIRECT_URL: string;
    readonly SALT: string;
    readonly ROUND: string;
    readonly EXPIRESTOKEN: string;
    readonly RES_EXPIRESTOKEN: string;
  }
}
