import { z } from 'zod'

const userResponseSchema = z.object({
  id: z.string().cuid2(),
  name: z.string(),
  email: z.string().email(),
  createdAt: z.date(),
})

export type UserResponse = z.infer<typeof userResponseSchema>
