import { z } from 'zod'

const userRequestSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

export type UserRequest = z.infer<typeof userRequestSchema>
