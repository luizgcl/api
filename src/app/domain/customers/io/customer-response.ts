import { z } from 'zod'

const customerResponseSchema = z.object({
  id: z.string().cuid2(),
  name: z.string(),
  socialName: z.string(),
  email: z.string().email(),
  document: z.string(),
  documentType: z.enum(['CPF', 'CNPJ']).default('CPF'),
  createdAt: z.date(),
})

export type CustomerResponse = z.infer<typeof customerResponseSchema>
