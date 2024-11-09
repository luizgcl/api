import { createInsertSchema } from 'drizzle-zod'
import { customersTable } from '@/app/database/drizzle/schema'
import { z } from 'zod'

const insertCustomerSchema = createInsertSchema(customersTable, {
  createdAt: z.date(),
})

export type CustomerSchema = z.infer<typeof insertCustomerSchema>
