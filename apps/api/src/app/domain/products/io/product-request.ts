import { z } from 'zod'

export const productRequestSchema = z.object({
  name: z.string(),
  ean: z.string(),
  description: z.string(),
  customerId: z.string(),
})

export type ProductRequest = z.infer<typeof productRequestSchema>
