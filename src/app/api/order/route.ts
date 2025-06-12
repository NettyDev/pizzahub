import type { Pizza, Composition } from "@/components/CartContext";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/database";
import { headers } from "next/headers";

interface Order {
  paymentMethod: string;
  deliveryMethod: string;
  deliveryTime: string;
  deliveryDate: string;
  deliveryHour: string;
  termsAccepted: boolean;
  newsLetterAccepted: boolean;
  invoice: boolean;
  contact: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  };
  delivery: {
    street: string;
    suite: string;
    zipcode: string;
    city: string;
  };
  company?: {
    nip: string;
    name: string;
    street: string;
    suite: string;
    zipcode: string;
    city: string;
  };
  comment: string;
  cart: (Pizza | Composition)[];
  totalPrice: number;
  deliveryPrice: number;
}

export async function POST(request: Request) {
  const order: Order = await request.json();
  const session = await auth.api.getSession({
    headers: await headers()
  });
  if (!order.termsAccepted) {
    return Response.json({ message: "Terms must be accepted" }, { status: 400 });
  }
  if (order.deliveryMethod === "delivery" && !order.delivery) {
    return Response.json({ message: "Delivery address is required" }, { status: 400 });
  }
  if (
    !order.contact ||
    !order.contact.firstName ||
    !order.contact.lastName ||
    !order.contact.phone ||
    !order.contact.email
  ) {
    return Response.json({ message: "Contact information is required" }, { status: 400 });
  }
  if (order.cart.length === 0) {
    return Response.json({ message: "Cart cannot be empty" }, { status: 400 });
  }
  if (
    order.invoice &&
    (!order.company ||
      !order.company.nip ||
      !order.company.name ||
      !order.company.street ||
      !order.company.suite ||
      !order.company.zipcode ||
      !order.company.city)
  ) {
    return Response.json({ message: "Company information is required for invoice" }, { status: 400 });
  }

  const Pizzas = order.cart.filter((v) => "id" in v) as Pizza[];
  const Compositions = order.cart.filter((v) => "sauce" in v) as Composition[];

  const result = await prisma.order.create({
    data: {
      user: session?.user ? { connect: { id: session.user.id } } : undefined,
      price: order.totalPrice + order.deliveryPrice,
      payment: order.paymentMethod,
      delivery: order.deliveryMethod,
      deliveryDate: order.deliveryMethod === "delivery" ? new Date(order.deliveryDate) : null,
      deliveryHour: order.deliveryMethod === "delivery" ? order.deliveryHour : null,
      status: "in_progress",
      comment: order.comment,
      orderDate: new Date(),
      orderContact: {
        create: {
          name: order.contact.firstName,
          surname: order.contact.lastName,
          phone: order.contact.phone,
          email: order.contact.email
        }
      },
      orderAddress:
        order.deliveryMethod === "delivery"
          ? {
              create: {
                street: order.delivery.street,
                suite: order.delivery.suite,
                zipcode: order.delivery.zipcode,
                city: order.delivery.city
              }
            }
          : undefined,
      orderCompany: order.invoice
        ? {
            create: {
              nip: order.company?.nip || "",
              name: order.company?.name || "",
              street: order.company?.street || "",
              suite: order.company?.suite || "",
              zipcode: order.company?.zipcode || "",
              city: order.company?.city || ""
            }
          }
        : undefined,
      PizzaOrder:
        Pizzas.length > 0
          ? {
              create: Pizzas.map((pizza) => ({
                name: pizza.name,
                pizza: { connect: { id: pizza.id } },
                size: pizza.size,
                dough: pizza.crust,
                price: pizza.price,
                quantity: pizza.quantity,
                PizzaOrder_Ingredient:
                  pizza.toppings.length > 0
                    ? {
                        create: pizza.toppings.map((ingredient) => ({
                          ingredient: { connect: { id: ingredient.id } }
                        }))
                      }
                    : undefined
              }))
            }
          : undefined,
      CompositionOrder:
        Compositions.length > 0
          ? {
              create: Compositions.map((composition) => ({
                size: composition.size,
                dough: composition.crust,
                price: composition.price,
                quantity: composition.quantity,
                Composition_Ingredient: {
                  create: [
                    {
                      ingredient: { connect: { id: composition.sauce?.id || 1 } }
                    },
                    ...composition.toppings.map((ingredient) => ({
                      ingredient: { connect: { id: ingredient.id } }
                    }))
                  ]
                }
              }))
            }
          : undefined
    }
  });

  return Response.json({ message: "Order received", status: "OK" }, { status: 200 });
}

export async function GET(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  if (!session || !session.user) {
    return Response.json({ status: "ERROR", message: "Unauthorized" }, { status: 401 });
  }

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: {
      PizzaOrder: {
        include: {
          PizzaOrder_Ingredient: {
            include: {
              ingredient: true
            }
          }
        }
      },
      CompositionOrder: {
        include: {
          Composition_Ingredient: {
            include: {
              ingredient: true
            }
          }
        }
      }
    }
  });

  const newOrders = orders.map((order) => ({
    id: order.id,
    price: order.price,
    status: order.status,
    date: order.orderDate,
    items: [
      ...order.PizzaOrder.map((pizza) => ({
        name: pizza.name,
        quantity: pizza.quantity,
        price:
          pizza.price +
          (pizza.dough === "thick" ? 5 : 0) +
          pizza.PizzaOrder_Ingredient.reduce((acc, ingredient) => acc + ingredient.ingredient.price, 0),
        size: pizza.size,
        crust: pizza.dough,
        toppings: pizza.PizzaOrder_Ingredient.map((ingredient) => ingredient.ingredient.name)
      })),
      ...order.CompositionOrder.map((composition) => ({
        name: "Kompozycja",
        quantity: composition.quantity,
        price: composition.price + (composition.dough === "thick" ? 5 : 0),
        size: composition.size,
        crust: composition.dough,
        toppings: [
          ...composition.Composition_Ingredient.filter((v) => v.ingredient.category !== "sauce").map(
            (ingredient) => ingredient.ingredient.name
          )
        ],
        sauce: composition.Composition_Ingredient.find((ingredient) => ingredient.ingredient.category === "sauce")
          ?.ingredient.name
      }))
    ]
  }));

  return Response.json({ status: "OK", newOrders }, { status: 200 });
}
