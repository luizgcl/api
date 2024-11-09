import { z } from 'zod'

const customerSchema = z.object({
  name: z.string(),
  socialName: z.string(),
  email: z.string().email(),
  document: z.string(),
  documentType: z.enum(['CPF', 'CNPJ']).default('CPF'),
})

export type CustomerRequest = z.infer<typeof customerSchema>
