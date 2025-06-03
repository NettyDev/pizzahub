import { NextRequest, NextResponse } from 'next/server';

const OLLAMA_API_URL = process.env.OLLAMA_API_URL || "http://localhost:11434/api/chat";
const MODEL_NAME = process.env.OLLAMA_MODEL || "llama3:latest";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const clientConversationHistory = body.history || [];

    if (clientConversationHistory.length === 0 || clientConversationHistory[clientConversationHistory.length - 1].role !== 'user') {
      console.error("Niekompletna historia od klienta:", clientConversationHistory);
      return NextResponse.json({ error: "Niekompletna historia (history) w zapytaniu" }, { status: 400 });
    }

    const payload = {
      model: MODEL_NAME,
      messages: clientConversationHistory,
      stream: false,
    };

    console.log("Wysyłanie do Ollama:", JSON.stringify(payload, null, 2));

    const ollamaResponse = await fetch(OLLAMA_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!ollamaResponse.ok) {
      const errorText = await ollamaResponse.text();
      console.error("Błąd od Ollama API:", ollamaResponse.status, errorText);
      return NextResponse.json(
        { error: `Błąd komunikacji z Ollama: ${ollamaResponse.status} - ${errorText}` },
        { status: ollamaResponse.status }
      );
    }

    const responseData = await ollamaResponse.json();
    console.log("Odpowiedź od Ollama:", JSON.stringify(responseData, null, 2));
    const aiMessageContent = responseData.message?.content?.trim() || '';

    if (!aiMessageContent) {
      return NextResponse.json({ reply: "Przepraszam, nie udało mi się wygenerować odpowiedzi." });
    }

    const updatedHistory = [
        ...clientConversationHistory,
        { role: "assistant", content: aiMessageContent }
    ];

    return NextResponse.json({
      reply: aiMessageContent,
      history: updatedHistory
    });

  } catch (error: any) {
    console.error('Błąd w API route /api/chat:', error);
    let errorMessage = "Wystąpił wewnętrzny błąd serwera";
    if (error.cause?.code === 'ECONNREFUSED') {
      errorMessage = "Nie można połączyć się z serwerem Ollama. Upewnij się, że jest uruchomiony i dostępny pod adresem: " + OLLAMA_API_URL;
      return NextResponse.json({ error: errorMessage }, { status: 503 });
    }
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}