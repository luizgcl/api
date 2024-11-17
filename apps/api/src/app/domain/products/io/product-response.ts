import { z } from 'zod'

const productResponseSchema = z.object({
  id: z.string().cuid2(),
  name: z.string(),
  ean: z.string(),
  description: z.string(),
  customerId: z.string(),
  createdAt: z.date(),
})

export type ProductResponse = z.infer<typeof productResponseSchema>
