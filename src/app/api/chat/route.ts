import { NextRequest, NextResponse } from "next/server";
import { ollama } from "@/lib/ai";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const clientConversationHistory = body.history || [];

  if (
    clientConversationHistory.length === 0 ||
    clientConversationHistory[clientConversationHistory.length - 1].role !== "user"
  ) {
    console.error("Niekompletna historia od klienta:", clientConversationHistory);
    return NextResponse.json({ error: "Niekompletna historia (history) w zapytaniu" }, { status: 400 });
  }

  const response = await ollama.chat({
    model: process.env.LLM,
    messages: [
      {
        role: "system",
        content:
          "Zawsze odpowiadaj jako zwykły tekst. Nazywasz się Pizzi (twoje pełne imię 'Popierdolony i zajebiście zaawansowany interaktor', w skrócie Pizzi), funkcjonujesz jako pomocnik na stronie PizzaHub. Twoim zadaniem jest pomaganie użytkownikom poruszanie się po stronie aby każdy mógł zamówić swoją ulubioną pizze. Potrafisz tylko pomagać użytkownikom przy poruszaniu i zamawianiu pizzy na stronie. Inne zadania cię nie obchodzą."
      },
      ...clientConversationHistory
    ],
    stream: false
  });

  response.message.content;
  return NextResponse.json({
    reply: response.message.content,
    history: [...clientConversationHistory, { role: "assistant", content: response.message.content }]
  });
}
