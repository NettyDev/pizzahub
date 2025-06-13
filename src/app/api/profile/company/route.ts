import { auth } from "@/lib/auth";
import { prisma } from "@/lib/database";
import { headers } from "next/headers";

export async function GET(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  if (!session || !session.user) {
    return Response.json({ message: "Unauthorized", status: "ERROR" }, { status: 401 });
  }

  try {
    const company = await prisma.company.findFirst({
      where: { userId: session.user.id }
    });

    if (!company) {
      return Response.json(
        {
          company: {
            nip: "",
            name: "",
            street: "",
            suite: "",
            zipcode: "",
            city: ""
          },
          status: "OK"
        },
        { status: 200 }
      );
    }

    return Response.json({ company, status: "OK" });
  } catch (error) {
    console.error("Error fetching company:", error);
    return Response.json({ message: "Failed to fetch company", status: "ERROR" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  const { company } = await request.json();

  if (!company) {
    return Response.json({ message: "Invalid company data", status: "ERROR" }, { status: 400 });
  }

  if (!session || !session.user) {
    return Response.json({ message: "Unauthorized", status: "ERROR" }, { status: 401 });
  }

  try {
    const result = await prisma.company.findFirst({
      where: { userId: session.user.id }
    });

    if (result) {
      await prisma.company.update({
        where: { id: result.id },
        data: company
      });
    } else {
      await prisma.company.create({
        data: {
          user: { connect: { id: session.user.id } },
          ...company
        }
      });
    }

    return Response.json({ company, status: "OK" });
  } catch (error) {
    console.error("Error saving company:", error);
    return Response.json({ message: "Failed to save company", status: "ERROR" }, { status: 500 });
  }
}
