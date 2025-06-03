"use client";

import { useState, FormEvent, ChangeEvent, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [conversationHistory, setConversationHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);


  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputMessage(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputMessage.trim()) return;

    const newUserMessage: ChatMessage = {
      role: 'user',
      content: inputMessage.trim(),
    };

    setConversationHistory(prev => [...prev, newUserMessage]);

    const currentInput = inputMessage;
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentInput.trim(),
          history: [...conversationHistory, newUserMessage],
        }),
      });

      setIsLoading(false);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error:", errorData);
        throw new Error(errorData.error || `Błąd serwera: ${response.status}`);
      }

      const data = await response.json();
      if (data.history) {
        setConversationHistory(data.history);
      } else if (data.reply) {
         const aiResponse: ChatMessage = { role: 'assistant', content: data.reply };
         setConversationHistory(prev => [...prev, aiResponse]);
      }


    } catch (error) {
      setIsLoading(false);
      console.error('Błąd podczas wysyłania wiadomości:', error);
      const errorMessageContent = error instanceof Error ? error.message : 'Nie udało się pobrać odpowiedzi. Sprawdź konsolę.';
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: `Błąd: ${errorMessageContent}`,
      };
      setConversationHistory(prev => [...prev, errorMessage]);
    }
  };

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [conversationHistory]);


  useEffect(() => {
    if (isOpen && conversationHistory.length === 0) {
      setConversationHistory([
        { role: 'assistant', content: 'Cześć! Jestem Pizzi, jak mogę Ci pomóc z zamówieniem w PizzaHub?' }
      ]);
    }
  }, [isOpen]);

  return (
    <>
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-red-700 text-white p-4 rounded-full shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-transform duration-200 ease-in-out hover:scale-110 z-50"
        aria-label={isOpen ? "Zamknij chat" : "Otwórz chat"}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>


      {isOpen && (
        <div className="fixed bottom-20 right-6 w-[90vw] max-w-md h-[65vh] max-h-[500px] bg-white flex flex-col shadow-xl rounded-lg border border-gray-200 z-40 overflow-hidden">
          <header className="bg-red-700 text-white p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot size={20} />
              <h2 className="text-md font-semibold">Pizzi</h2>
            </div>
            <button onClick={toggleChat} className="text-white hover:text-white" aria-label="Zamknij chat">
              <X size={20} />
            </button>
          </header>


          <div ref={chatWindowRef} className="flex-grow p-3 space-y-3 overflow-y-auto bg-stone-50">
            {conversationHistory.map((msg, index) => (
              <div
                key={index}
                className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="p-1.5 bg-red-700 text-white rounded-full self-start shrink-0">
                    <Bot size={16} />
                  </div>
                )}
                <div
                  className={`max-w-[75%] px-3 py-2 rounded-xl shadow-sm text-sm ${
                    msg.role === 'user'
                      ? 'bg-gray-300 text-black rounded-br-none'
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                </div>
                 {msg.role === 'user' && (
                  <div className="p-1.5 bg-gray-300 text-black rounded-full self-start shrink-0">
                    <User size={16} />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start items-center gap-2">
                <div className="p-1.5 bg-red-700 text-white rounded-full self-start animate-pulse">
                    <Bot size={16} />
                </div>
                <div className="px-3 py-2 rounded-xl bg-gray-200 text-black italic text-sm">
                  PizzaBot pisze...
                </div>
              </div>
            )}
          </div>

          <footer className="p-3 bg-gray-100 border-t border-gray-200">
            <form onSubmit={handleSubmit} className="flex space-x-2 items-center">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={handleInputChange}
                placeholder="Napisz wiadomość..."
                className="flex-grow p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !inputMessage.trim()}
                className="p-2 bg-red-700 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 shrink-0"
                aria-label="Wyślij wiadomość"
              >
                <Send size={20} />
              </button>
            </form>
          </footer>
        </div>
      )}
    </>
  );
}