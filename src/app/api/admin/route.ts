import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers()
  });
  return Response.json({ status: "OK", role: session?.user.role });
}
