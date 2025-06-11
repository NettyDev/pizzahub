export async function POST(request: Request) {
  console.log("Received POST request to /api/order");
  console.log(await request.json());
  return Response.json({ message: "Order received", status: "OK" }, { status: 200 });
}
