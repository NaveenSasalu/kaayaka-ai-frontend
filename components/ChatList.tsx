"use client";

import ChatBubble from "./ChatBubble";

type Message = {
  role: "user" | "assistant";
  text: string;
};

export default function ChatList({ messages }: { messages: Message[] }) {
  return (
    <div className="flex flex-col p-4">
      {messages.map((msg, i) => (
        <ChatBubble key={i} role={msg.role} message={msg.text} />
      ))}
    </div>
  );
}
