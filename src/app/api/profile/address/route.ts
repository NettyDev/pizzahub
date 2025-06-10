import { NextRequest } from "next/server";
import { prisma } from "@/lib/database";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(request: NextRequest) {
  const { address } = await request.json();
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!address) {
    return Response.json({ status: "ERROR", message: "Invalid address data" }, { status: 400 });
  }
  if (!session || !session.user) {
    return Response.json({ status: "ERROR", message: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await prisma.address.findFirst({ where: { userId: session.user.id } });
    if (result) {
      await prisma.address.update({
        where: { id: result.id },
        data: {
          street: address.street,
          suite: address.suite,
          zipcode: address.zipcode,
          city: address.city
        }
      });
    } else {
      await prisma.address.create({
        data: {
          user: { connect: { id: session.user.id } },
          street: address.street,
          suite: address.suite,
          zipcode: address.zipcode,
          city: address.city
        }
      });
    }

    return Response.json({ status: "OK", address });
  } catch (error) {
    console.error("Error saving address:", error);
    return Response.json({ status: "ERROR", message: "Failed to save address" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session || !session.user) {
    return Response.json({ status: "ERROR", message: "Unauthorized" }, { status: 401 });
  }

  try {
    const address = await prisma.address.findFirst({
      where: { userId: session.user.id }
    });

    if (!address) {
      return Response.json({
        status: "OK",
        address: {
          street: "",
          suite: "",
          postalCode: "",
          city: ""
        }
      });
    }

    return Response.json({
      status: "OK",
      address: {
        street: address.street,
        suite: address.suite,
        zipCode: address.zipcode,
        city: address.city
      }
    });
  } catch (error) {
    console.error("Error fetching address:", error);
    return Response.json({ status: "ERROR", message: "Failed to fetch address" }, { status: 500 });
  }
}
