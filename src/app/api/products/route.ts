import { prisma } from "@/lib/database";

export async function GET(request: Request) {
  const [products, size, dough] = await Promise.all([
    prisma.product.findMany({
      include: {
        Product_Ingredient: {
          include: {
            ingredient: true
          }
        },
        ProductAddon_Ingredient: {
          include: {
            ingredient: true
          }
        }
      }
    }),
    prisma.size.findMany(),
    prisma.doughType.findMany()
  ]);

  const newProducts = products.map((v) => ({
    id: v.id,
    name: v.name,
    image: v.image,
    spice: v.spice,
    price: {
      small: Math.round(
        (v.price + v.Product_Ingredient.map((v) => v.ingredient.price).reduce((a, b) => a + b, 0)) * size[0].priceRatio
      ),
      medium: Math.round(
        (v.price + v.Product_Ingredient.map((v) => v.ingredient.price).reduce((a, b) => a + b, 0)) * size[1].priceRatio
      ),
      large: Math.round(
        (v.price + v.Product_Ingredient.map((v) => v.ingredient.price).reduce((a, b) => a + b, 0)) * size[2].priceRatio
      )
    },
    ingredients: v.Product_Ingredient.map((v) => v.ingredient.name),
    availableToppings: v.ProductAddon_Ingredient.map((v) => ({
      name: v.ingredient.name,
      price: v.ingredient.price
    }))
  }));

  return Response.json({ status: "OK", newProducts, size, dough });
}
