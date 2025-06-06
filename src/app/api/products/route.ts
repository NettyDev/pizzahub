import { prisma } from "@/lib/database";

export async function GET(request: Request) {
  const pizza = await prisma.pizza.findMany({
    include: {
      Pizza_Ingredient: {
        include: {
          ingredient: true
        }
      },
      PizzaToppings_Ingredient: {
        include: {
          ingredient: true
        }
      }
    }
  });

  const newProducts = pizza.map((v) => ({
    id: v.id,
    name: v.name,
    image: v.image,
    spice: v.spice,
    price: {
      small: v.priceSmall,
      medium: v.priceMedium,
      large: v.priceLarge
    },
    ingredients: v.Pizza_Ingredient.map((v) => v.ingredient.name),
    availableToppings: v.PizzaToppings_Ingredient.map((v) => ({
      name: v.ingredient.name,
      price: v.ingredient.price
    }))
  }));

  return Response.json({ status: "OK", newProducts });
}
