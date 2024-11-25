import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/Schema.js",
  dbCredentials:{
    url:process.env.NEXT_PUBLIC_DRIZZLE_DB_URL
  }
});