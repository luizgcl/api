import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './apps/api/src/app/database/drizzle/schema.ts',
  out: './.migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
})
