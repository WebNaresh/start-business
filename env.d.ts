
// env.d.ts
declare namespace NodeJS {
    interface ProcessEnv {
        // Backend Environment Variables
        DATABASE_URL: string;
        NEXT_PUBLIC_GOOGLE_CLIENT_ID: string;
        NEXT_PUBLIC_GOOGLE_CLIENT_SECRET: string;
        NODE_ENV: "development" | "production";
        NEXTAUTH_URL: string;
        NEXTAUTH_SECRET: string;
        NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: string;
        NEXT_AWS_S3_REGION: string;
        NEXT_AWS_ACCESS_KEY_ID: string;
        NEXT_AWS_SECRET_ACCESS_KEY: string;
        NEXT_AWS_BUCKET_NAME: string;
        NEXT_OPEN_AI_API_KEY: string;

        // Email Configuration
        SMTP_HOST: string;
        SMTP_PORT: string;
        SMTP_USER: string;
        SMTP_PASSWORD: string;

    }
}