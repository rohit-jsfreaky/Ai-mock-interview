import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/Schema.js",
  dbCredentials:{
    url:"postgresql://ai-interview_owner:CUHcJ7WN8ktO@ep-green-dust-a5vbf6p6.us-east-2.aws.neon.tech/ai-interview?sslmode=require"
  }
});