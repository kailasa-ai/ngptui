declare namespace NodeJS {
  export interface ProcessEnv {
    APP_BASE_URL: string;
    DIFY_URL: string;
    DIFY_API_KEY: string;
    AUTH_KEYCLOAK_ID: "nextjs";
    AUTH_KEYCLOAK_SECRET: string;
    AUTH_KEYCLOAK_ISSUER: string;
    AUTH_SECRET: string;
  }
}
