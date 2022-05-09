declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: string;
    DATABASE_URL: string;
    ROOT_URL: string;
    VERIFICATION_TOKEN_SECRET: string;
    EMAIL_SERVICE: string;
    EMAIL_ADDRESS: string;
    EMAIL_PASSWORD: string;
    EMAIL_NAME: string;
    REDIS_URL: string;
    REDIS_PASSWORD: string;
  }
}