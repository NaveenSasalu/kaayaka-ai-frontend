import React from "react";

type Props = {
  role: "user" | "assistant";
  message: string;
};

export default function ChatBubble({ role, message }: Props) {
  const isUser = role === "user";

  return (
    <div
      className={`flex items-start gap-2 my-2 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && (
        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">
          AI
        </div>
      )}

      <div
        className={`
          px-4 py-2 max-w-xs rounded-2xl text-sm
          ${
            isUser
              ? "bg-green-500 text-white rounded-br-none"
              : "bg-gray-200 text-black rounded-bl-none"
          }
        `}
      >
        {message}
      </div>

      {isUser && (
        <div className="w-8 h-8 bg-gray-700 text-white rounded-full flex items-center justify-center">
          U
        </div>
      )}
    </div>
  );
}
