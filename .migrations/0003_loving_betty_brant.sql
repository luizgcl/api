ALTER TABLE "products" DROP CONSTRAINT "products_ean_unique";--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "unique_product_index" UNIQUE("ean","customer_id");