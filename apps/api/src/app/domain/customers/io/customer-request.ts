import { z } from 'zod'

export const customerRequestSchema = z.object({
  name: z.string(),
  socialName: z.string(),
  email: z.string().email(),
  document: z.string(),
  documentType: z.enum(['CPF', 'CNPJ']).default('CPF'),
})

export type CustomerRequest = z.infer<typeof customerRequestSchema>
