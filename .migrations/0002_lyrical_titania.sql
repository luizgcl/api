ALTER TABLE "products" ADD COLUMN "ean" text NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_ean_unique" UNIQUE("ean");