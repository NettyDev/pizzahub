import { prisma } from "@/lib/database";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const topOrderItems = await prisma.pizzaOrder.groupBy({
      by: ["pizzaId"],
      _sum: {
        quantity: true
      },
      orderBy: {
        _sum: {
          quantity: "desc"
        }
      },
      take: 3,
      where: {
        pizzaId: {
          not: null
        }
      }
    });
    if (topOrderItems.length <= 0) {
      return Response.json({ status: "OK", message: "No order items found" }, { status: 200 });
    }
    const pizzas = await prisma.pizza.findMany({
      where: {
        id: {
          in: topOrderItems.map((item) => item.pizzaId) as number[]
        }
      },
      select: {
        id: true,
        name: true,
        image: true
      }
    });
    return Response.json(
      topOrderItems.map((v) => ({ ...pizzas.find((p) => p.id == v.pizzaId), ordersCount: v._sum.quantity })),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching top order items:", error);
    return Response.json({ status: "ERROR", message: "Failed to fetch top order items" }, { status: 500 });
  }
}
