"use client";

import { useRef, useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

type Mode = "geral" | "copywriting" | "ux";

const modeLabels: Record<Mode, string> = {
  geral: "Geral",
  copywriting: "Copywriting",
  ux: "UX",
};

const modeDescriptions: Record<Mode, string> = {
  geral: "Perguntas gerais sobre o negocio e estrategia",
  copywriting: "Textos para marketing, redes sociais e blog",
  ux: "Melhorias de experiencia do usuario e interface",
};

export default function AIChatPage() {
  const [mode, setMode] = useState<Mode>("geral");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text || streaming) return;

    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: text },
    ];
    setMessages(newMessages);
    setInput("");
    setStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, mode }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.error ?? `Erro ${res.status}`
        );
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No reader available");

      const decoder = new TextDecoder();
      let assistantContent = "";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "" },
      ]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        assistantContent += chunk;

        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: assistantContent,
          };
          return updated;
        });

        scrollToBottom();
      }
    } catch (err: unknown) {
      if ((err as Error).name !== "AbortError") {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `Erro: ${(err as Error).message}`,
          },
        ]);
      }
    } finally {
      setStreaming(false);
      abortRef.current = null;
      scrollToBottom();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">IA Chat</h1>

        {/* Mode tabs */}
        <div className="flex rounded-lg bg-white p-1 shadow-sm">
          {(Object.keys(modeLabels) as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`rounded-md px-4 py-1.5 text-sm font-medium transition-colors ${
                mode === m
                  ? "bg-primary text-white"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {modeLabels[m]}
            </button>
          ))}
        </div>
      </div>

      <p className="mb-4 text-sm text-gray-500">{modeDescriptions[mode]}</p>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto rounded-xl bg-white p-4 shadow-sm">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" /></svg>
              </div>
              <p className="text-sm text-gray-500">
                Comece uma conversa com a IA.
              </p>
              <p className="mt-1 text-xs text-gray-400">
                Modo: {modeLabels[mode]}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="mt-4 flex gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Digite sua mensagem..."
          rows={1}
          className="flex-1 resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
        <button
          onClick={handleSend}
          disabled={streaming || !input.trim()}
          className="rounded-xl bg-primary px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-dark disabled:opacity-50"
        >
          {streaming ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
          )}
        </button>
      </div>
    </div>
  );
}
