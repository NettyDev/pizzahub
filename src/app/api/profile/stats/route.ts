import { auth } from "@/lib/auth";
import { prisma } from "@/lib/database";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  if (!session || !session.user) {
    return Response.json({ status: "ERROR", message: "Unauthorized" }, { status: 401 });
  }

  const pizzaQuantity = await getPizzaQuantity(session.user.id);
  const { _avg, _sum, _count } = await prisma.order.aggregate({
    where: { userId: session.user.id },
    _avg: { price: true },
    _sum: { price: true },
    _count: true
  });
  return Response.json(
    {
      status: "OK",
      result: {
        topSelect: await getTopPizza(session.user.id),
        ordersQuantity: _count || 0,
        pizzaQuantity,
        savedTime: pizzaQuantity * 30,
        totalSpent: _sum.price || 0,
        averageSpent: _avg.price || 0
      }
    },
    { status: 200 }
  );
}

async function getPizzaQuantity(userId: string) {
  const pizzaCount = (
    await prisma.pizzaOrder.findMany({
      where: { order: { userId } },
      select: {
        quantity: true
      }
    })
  ).reduce((acc, order) => acc + (order.quantity || 0), 0);
  const compositionCount = (
    await prisma.compositionOrder.findMany({
      where: { order: { userId } },
      select: {
        quantity: true
      }
    })
  ).reduce((acc, order) => acc + (order.quantity || 0), 0);
  return pizzaCount + compositionCount;
}

async function getTopPizza(userId: string) {
  const result = await prisma.pizzaOrder.groupBy({
    where: { order: { userId }, pizzaId: { not: null } },
    by: ["pizzaId"],
    _sum: {
      quantity: true
    },
    take: 1,
    orderBy: {
      _sum: {
        quantity: "desc"
      }
    }
  });
  if (!result || result.length === 0 || !result[0].pizzaId) {
    return null;
  }
  const pizza = await prisma.pizza.findFirst({
    where: { id: result[0].pizzaId },
    select: {
      id: true,
      name: true,
      image: true
    }
  });
  const orders = await prisma.pizzaOrder.findMany({
    where: {
      order: {
        userId
      },
      pizzaId: result[0].pizzaId
    },
    select: {
      price: true,
      dough: true,
      quantity: true,
      PizzaOrder_Ingredient: {
        select: {
          ingredient: {
            select: {
              price: true
            }
          }
        }
      }
    }
  });
  return {
    id: pizza?.id,
    name: pizza?.name,
    image: pizza?.image,
    quantity: result[0]._sum.quantity || 0,
    totalSpent: orders.length
      ? orders
          .map(
            (v) =>
              (v.price +
                (v.dough == "thick" ? 5 : 0) +
                v.PizzaOrder_Ingredient.map((v) => v.ingredient.price).reduce((a, b) => a + b, 0)) *
              v.quantity
          )
          .reduce((a, b) => a + b, 0)
      : 0
  };
}
