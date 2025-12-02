"use client";

import { useState } from "react";
import ChatList from "../components/ChatList";
import ChatInput from "../components/ChatInput";

type Message = {
  role: "user" | "assistant";
  text: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  async function sendToBackend(message: string) {
    setLoading(true);

    const userMessage: Message = { role: "user", text: message };
    setMessages((prev) => [...prev, userMessage]);

    const response = await fetch(
      "https://https://ai.kaayaka.in/api/chat-stream",
      {
        // const response = await fetch( `${process.env.NEXT_PUBLIC_API_URL}/chat-stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: "demo-user",
          message,
        }),
      }
    );

    if (!response.body) {
      setLoading(false);
      return;
    }

    const reader = response.body.getReader();
    let aiText = "";

    const decoder = new TextDecoder();

    // Temporarily insert empty assistant message
    setMessages((prev) => [...prev, { role: "assistant", text: "" }]);

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.trim().split("\n");

      for (const line of lines) {
        if (!line.trim()) continue;

        const json = JSON.parse(line);
        const token = json.token;

        aiText += token;

        // Update last assistant message
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1].text = aiText;
          return updated;
        });
      }
    }

    setLoading(false);
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-scroll bg-white">
        <ChatList messages={messages} />

        {loading && <div className="p-4 text-gray-500">AI is typing…</div>}
      </div>

      <ChatInput onSend={sendToBackend} />
    </div>
  );
}
