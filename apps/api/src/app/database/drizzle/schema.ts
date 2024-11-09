import { pgEnum, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { createId } from '@paralleldrive/cuid2'

export const documentType = pgEnum('document_type', ['CPF', 'CNPJ'])

export const customersTable = pgTable('customers', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar().notNull(),
  socialName: varchar('social_name').notNull(),
  email: varchar().notNull().unique(),
  document: varchar().notNull(),
  documentType: documentType().notNull().default('CPF'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})

export const usersTable = pgTable('users', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  customerId: text('customer_id')
    .references(() => customersTable.id)
    .notNull(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
})