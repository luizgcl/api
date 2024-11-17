import { createInsertSchema } from 'drizzle-zod'
import { productsTable, usersTable } from '@/app/database/drizzle/schema'
import { z } from 'zod'

const insertProductSchema = createInsertSchema(productsTable, {
  createdAt: z.date(),
})

export type ProductSchema = z.infer<typeof insertProductSchema>
