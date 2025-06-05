/*
  Warnings:

  - Added the required column `deliveryDate` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderDate` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order" ADD COLUMN     "deliveryDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "orderDate" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "product_addon_ingredient" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "ingredientId" INTEGER NOT NULL,

    CONSTRAINT "product_addon_ingredient_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "product_addon_ingredient" ADD CONSTRAINT "product_addon_ingredient_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_addon_ingredient" ADD CONSTRAINT "product_addon_ingredient_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "ingredient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
