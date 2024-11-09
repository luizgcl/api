import { createInsertSchema } from 'drizzle-zod'
import { usersTable } from '@/app/database/drizzle/schema'
import { z } from 'zod'

const insertUserSchema = createInsertSchema(usersTable, {
  createdAt: z.date(),
})

export type UserSchema = z.infer<typeof insertUserSchema>
