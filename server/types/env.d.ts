declare namespace NodeJS {
  export interface ProcessEnv {
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    DATABASE_URL: string;
    ROOT_URL: string;
    NODE_ENV: string;
    ACCESS_TOKEN_SECRET: string;
    VERIFICATION_TOKEN_SECRET: string;
    EMAIL_ADDRESS: string;
    EMAIL_PASSWORD: string;
    EMAIL_NAME: string;
  }
}