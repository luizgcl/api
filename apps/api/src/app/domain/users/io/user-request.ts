import { z } from 'zod'

export const userRequestSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  customerId: z.string(),
})

export type UserRequest = z.infer<typeof userRequestSchema>
