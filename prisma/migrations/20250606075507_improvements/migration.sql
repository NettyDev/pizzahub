/*
  Warnings:

  - You are about to drop the column `doughTypeId` on the `composition_order` table. All the data in the column will be lost.
  - You are about to drop the column `sizeId` on the `composition_order` table. All the data in the column will be lost.
  - You are about to drop the `doughType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_addon_ingredient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_ingredient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_order_ingredient` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `size` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `dough` to the `composition_order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `composition_order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "composition_ingredients" DROP CONSTRAINT "composition_ingredients_compositionOrderId_fkey";

-- DropForeignKey
ALTER TABLE "composition_ingredients" DROP CONSTRAINT "composition_ingredients_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "composition_order" DROP CONSTRAINT "composition_order_doughTypeId_fkey";

-- DropForeignKey
ALTER TABLE "composition_order" DROP CONSTRAINT "composition_order_orderId_fkey";

-- DropForeignKey
ALTER TABLE "composition_order" DROP CONSTRAINT "composition_order_sizeId_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_orderAddressId_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_orderCompanyId_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_orderContactId_fkey";

-- DropForeignKey
ALTER TABLE "product_addon_ingredient" DROP CONSTRAINT "product_addon_ingredient_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "product_addon_ingredient" DROP CONSTRAINT "product_addon_ingredient_productId_fkey";

-- DropForeignKey
ALTER TABLE "product_ingredient" DROP CONSTRAINT "product_ingredient_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "product_ingredient" DROP CONSTRAINT "product_ingredient_productId_fkey";

-- DropForeignKey
ALTER TABLE "product_order" DROP CONSTRAINT "product_order_doughTypeId_fkey";

-- DropForeignKey
ALTER TABLE "product_order" DROP CONSTRAINT "product_order_orderId_fkey";

-- DropForeignKey
ALTER TABLE "product_order" DROP CONSTRAINT "product_order_productId_fkey";

-- DropForeignKey
ALTER TABLE "product_order" DROP CONSTRAINT "product_order_sizeId_fkey";

-- DropForeignKey
ALTER TABLE "product_order_ingredient" DROP CONSTRAINT "product_order_ingredient_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "product_order_ingredient" DROP CONSTRAINT "product_order_ingredient_productOrderId_fkey";

-- AlterTable
ALTER TABLE "company" ALTER COLUMN "nip" DROP NOT NULL,
ALTER COLUMN "name" DROP NOT NULL,
ALTER COLUMN "street" DROP NOT NULL,
ALTER COLUMN "suite" DROP NOT NULL,
ALTER COLUMN "zipcode" DROP NOT NULL,
ALTER COLUMN "city" DROP NOT NULL;

-- AlterTable
ALTER TABLE "composition_order" DROP COLUMN "doughTypeId",
DROP COLUMN "sizeId",
ADD COLUMN     "dough" TEXT NOT NULL,
ADD COLUMN     "size" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ingredient" ADD COLUMN     "avaliableInComposer" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "category" TEXT NOT NULL DEFAULT 'other';

-- DropTable
DROP TABLE "doughType";

-- DropTable
DROP TABLE "product";

-- DropTable
DROP TABLE "product_addon_ingredient";

-- DropTable
DROP TABLE "product_ingredient";

-- DropTable
DROP TABLE "product_order";

-- DropTable
DROP TABLE "product_order_ingredient";

-- DropTable
DROP TABLE "size";

-- CreateTable
CREATE TABLE "pizza" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "spice" INTEGER NOT NULL DEFAULT 1,
    "priceSmall" DOUBLE PRECISION NOT NULL DEFAULT 30,
    "priceMedium" DOUBLE PRECISION NOT NULL DEFAULT 40,
    "priceLarge" DOUBLE PRECISION NOT NULL DEFAULT 50,

    CONSTRAINT "pizza_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pizza_ingredient" (
    "id" SERIAL NOT NULL,
    "pizzaId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,

    CONSTRAINT "pizza_ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pizza_toppings_ingredient" (
    "id" SERIAL NOT NULL,
    "pizzaId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,

    CONSTRAINT "pizza_toppings_ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pizza_order_ingredient" (
    "id" SERIAL NOT NULL,
    "ingredientId" INTEGER NOT NULL,
    "pizzaOrderId" INTEGER NOT NULL,

    CONSTRAINT "pizza_order_ingredient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pizza_order" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "pizzaId" INTEGER,
    "size" TEXT NOT NULL,
    "dough" TEXT NOT NULL,
    "orderId" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "pizza_order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "pizza_ingredient" ADD CONSTRAINT "pizza_ingredient_pizzaId_fkey" FOREIGN KEY ("pizzaId") REFERENCES "pizza"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pizza_ingredient" ADD CONSTRAINT "pizza_ingredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pizza_toppings_ingredient" ADD CONSTRAINT "pizza_toppings_ingredient_pizzaId_fkey" FOREIGN KEY ("pizzaId") REFERENCES "pizza"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pizza_toppings_ingredient" ADD CONSTRAINT "pizza_toppings_ingredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pizza_order_ingredient" ADD CONSTRAINT "pizza_order_ingredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pizza_order_ingredient" ADD CONSTRAINT "pizza_order_ingredient_pizzaOrderId_fkey" FOREIGN KEY ("pizzaOrderId") REFERENCES "pizza_order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pizza_order" ADD CONSTRAINT "pizza_order_pizzaId_fkey" FOREIGN KEY ("pizzaId") REFERENCES "pizza"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pizza_order" ADD CONSTRAINT "pizza_order_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "composition_ingredients" ADD CONSTRAINT "composition_ingredients_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "composition_ingredients" ADD CONSTRAINT "composition_ingredients_compositionOrderId_fkey" FOREIGN KEY ("compositionOrderId") REFERENCES "composition_order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "composition_order" ADD CONSTRAINT "composition_order_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_orderContactId_fkey" FOREIGN KEY ("orderContactId") REFERENCES "order_contact"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_orderAddressId_fkey" FOREIGN KEY ("orderAddressId") REFERENCES "order_address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_orderCompanyId_fkey" FOREIGN KEY ("orderCompanyId") REFERENCES "order_company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
