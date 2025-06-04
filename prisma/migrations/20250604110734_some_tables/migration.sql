/*
  Warnings:

  - Added the required column `agreement1` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `agreement2` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `agreement3` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `surname` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "session" ADD COLUMN     "impersonatedBy" TEXT;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "agreement1" BOOLEAN NOT NULL,
ADD COLUMN     "agreement2" BOOLEAN NOT NULL,
ADD COLUMN     "agreement3" BOOLEAN NOT NULL,
ADD COLUMN     "banExpires" TIMESTAMP(3),
ADD COLUMN     "banReason" TEXT,
ADD COLUMN     "banned" BOOLEAN,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "role" TEXT,
ADD COLUMN     "surname" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "address" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "street" TEXT,
    "suite" TEXT,
    "zipcode" TEXT,
    "city" TEXT,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "nip" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "suite" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "city" TEXT NOT NULL,

    CONSTRAINT "company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "spice" INTEGER NOT NULL DEFAULT 1,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_ingredient" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,

    CONSTRAINT "product_ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ingredient" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "doughType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "doughType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "size" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priceRatio" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "size_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_order_ingredient" (
    "id" SERIAL NOT NULL,
    "ingredientId" INTEGER NOT NULL,
    "productOrderId" INTEGER NOT NULL,

    CONSTRAINT "product_order_ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_order" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "sizeId" INTEGER NOT NULL,
    "doughTypeId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "product_order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "composition_ingredients" (
    "id" SERIAL NOT NULL,
    "ingredientId" INTEGER NOT NULL,
    "compositionOrderId" INTEGER NOT NULL,

    CONSTRAINT "composition_ingredients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "composition_order" (
    "id" SERIAL NOT NULL,
    "sizeId" INTEGER NOT NULL,
    "doughTypeId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "composition_order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order" (
    "id" SERIAL NOT NULL,
    "userId" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "payment" TEXT NOT NULL,
    "delivery" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "orderContactId" INTEGER NOT NULL,
    "orderAddressId" INTEGER NOT NULL,
    "orderCompanyId" INTEGER,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_contact" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "order_contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_address" (
    "id" SERIAL NOT NULL,
    "street" TEXT NOT NULL,
    "suite" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "city" TEXT NOT NULL,

    CONSTRAINT "order_address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_company" (
    "id" SERIAL NOT NULL,
    "nip" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "suite" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "city" TEXT NOT NULL,

    CONSTRAINT "order_company_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "address_userId_key" ON "address"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "order_orderContactId_key" ON "order"("orderContactId");

-- CreateIndex
CREATE UNIQUE INDEX "order_orderAddressId_key" ON "order"("orderAddressId");

-- CreateIndex
CREATE UNIQUE INDEX "order_orderCompanyId_key" ON "order"("orderCompanyId");

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company" ADD CONSTRAINT "company_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_ingredient" ADD CONSTRAINT "product_ingredient_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_ingredient" ADD CONSTRAINT "product_ingredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_order_ingredient" ADD CONSTRAINT "product_order_ingredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_order_ingredient" ADD CONSTRAINT "product_order_ingredient_productOrderId_fkey" FOREIGN KEY ("productOrderId") REFERENCES "product_order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_order" ADD CONSTRAINT "product_order_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_order" ADD CONSTRAINT "product_order_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "size"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_order" ADD CONSTRAINT "product_order_doughTypeId_fkey" FOREIGN KEY ("doughTypeId") REFERENCES "doughType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_order" ADD CONSTRAINT "product_order_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "composition_ingredients" ADD CONSTRAINT "composition_ingredients_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "composition_ingredients" ADD CONSTRAINT "composition_ingredients_compositionOrderId_fkey" FOREIGN KEY ("compositionOrderId") REFERENCES "composition_order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "composition_order" ADD CONSTRAINT "composition_order_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "size"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "composition_order" ADD CONSTRAINT "composition_order_doughTypeId_fkey" FOREIGN KEY ("doughTypeId") REFERENCES "doughType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "composition_order" ADD CONSTRAINT "composition_order_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_orderContactId_fkey" FOREIGN KEY ("orderContactId") REFERENCES "order_contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_orderAddressId_fkey" FOREIGN KEY ("orderAddressId") REFERENCES "order_address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_orderCompanyId_fkey" FOREIGN KEY ("orderCompanyId") REFERENCES "order_company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
