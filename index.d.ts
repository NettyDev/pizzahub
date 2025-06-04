declare module "bun" {
  interface Env {
    DATABASE_URL: string;
    BETTER_AUTH_SECRET: string;
    BETTER_AUTH_URL: string;
    SMTP_HOST: string;
    SMTP_PORT: number;
    AI_URL: string;
    S3_URL: string;
    LLM: string;
  }
}
