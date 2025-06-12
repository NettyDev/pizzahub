-- AlterTable
ALTER TABLE "order" ALTER COLUMN "orderAddressId" DROP NOT NULL,
ALTER COLUMN "deliveryDate" DROP NOT NULL,
ALTER COLUMN "deliveryHour" DROP NOT NULL;
