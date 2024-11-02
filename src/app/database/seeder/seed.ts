import { drizzle } from 'drizzle-orm/node-postgres'

const database = drizzle(process.env.DATABASE_URL)

async function seedDatabase() {}

seedDatabase()
