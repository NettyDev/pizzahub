import { prisma } from "@/lib/database";
import { NextRequest, NextResponse } from "next/server";

interface NewResult {
  [key: string]: {
    id: number;
    name: string;
    icon: string | null;
    image: string | null;
    zIndex: number | null;
    quantity: number;
    price: number;
  }[];
}

export async function GET(request: NextRequest) {
  const result = await prisma.ingredient.findMany({ where: { avaliableInComposer: true } });
  const newResult: NewResult = { sauce: [], toppings: [] };
  for (const item of result) {
    switch (item.category) {
      case "sauce": {
        const { category, avaliableInComposer, ...itemWithoutKeys } = item;
        newResult.sauce.push(itemWithoutKeys);
        break;
      }
      default: {
        const { avaliableInComposer, ...itemWithoutKeys } = item;
        newResult.toppings.push(itemWithoutKeys);
      }
    }
  }
  return NextResponse.json(newResult);
}
