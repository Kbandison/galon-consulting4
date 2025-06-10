"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Dot, Sparkles } from "lucide-react";

type ChatMessage = {
  from: "user" | "bot";
  text: string;
};

const LOCALSTORAGE_KEY = "chat-widget-shown";
const BUBBLE_SIZE = 64;

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [firstVisit, setFirstVisit] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [unread, setUnread] = useState(0);
  const [pending, setPending] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // On mount: show tooltip for first visit
  useEffect(() => {
    if (!localStorage.getItem(LOCALSTORAGE_KEY)) {
      setFirstVisit(true);
      setTimeout(() => setFirstVisit(false), 4000);
      localStorage.setItem(LOCALSTORAGE_KEY, "1");
    }
  }, []);

  // Unread badge logic
  useEffect(() => {
    if (
      !open &&
      messages.length &&
      messages[messages.length - 1].from === "bot"
    ) {
      setUnread((n) => n + 1);
    }
    if (open) setUnread(0);
  }, [messages, open]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  // Typing effect helper
  function typeText(
    text: string,
    onUpdate: (text: string) => void,
    onComplete: () => void
  ) {
    let i = 0;
    function type() {
      if (i <= text.length) {
        onUpdate(text.slice(0, i));
        i++;
        setTimeout(type, 20);
      } else {
        onComplete();
      }
    }
    type();
  }

  async function sendMessage(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!input.trim() || pending) return;

    const userMessage: ChatMessage = { from: "user", text: input };
    const nextMsgs = [...messages, userMessage];
    setMessages(nextMsgs);
    setInput("");
    setPending(true);

    // Prepare messages for API
    const openaiMessages = nextMsgs.map((msg) => ({
      role: msg.from === "user" ? "user" : "assistant",
      content: msg.text,
    }));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: openaiMessages }),
      });

      if (!res.ok) {
        throw new Error("API error");
      }

      const data = await res.json();
      const botReply =
        data.message || "Sorry, something went wrong. Please try again later.";

      // Animate typing
      typeText(
        botReply,
        (partial) => {
          setMessages((msgs) => {
            const msgsCopy = [...msgs];
            // Update last bot message or add one
            if (msgsCopy[msgsCopy.length - 1]?.from === "bot") {
              msgsCopy[msgsCopy.length - 1] = { from: "bot", text: partial };
            } else {
              msgsCopy.push({ from: "bot", text: partial });
            }
            return msgsCopy;
          });
        },
        () => setPending(false)
      );
    } catch {
      setMessages((msgs) => [
        ...msgs,
        {
          from: "bot",
          text: "Sorry, something went wrong. Please try again later.",
        },
      ]);
      setPending(false);
    }
  }

  return (
    <>
      <div className="fixed z-50 bottom-5 right-5 flex flex-col items-end">
        {/* Bubble */}
        {!open && (
          <button
            aria-label="Open chat"
            className="group relative bg-[var(--color-accent)] text-white
              rounded-full shadow-2xl w-[64px] h-[64px]
              flex items-center justify-center text-4xl transition hover:scale-110"
            style={{ width: BUBBLE_SIZE, height: BUBBLE_SIZE }}
            onClick={() => setOpen(true)}
          >
            <MessageCircle className="w-8 h-8" />
            {unread > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
                {unread}
              </span>
            )}
            {firstVisit && (
              <span
                className="absolute right-16 top-1/2 -translate-y-1/2 px-3 py-2
                  bg-black/80 text-white text-sm rounded-lg shadow-lg
                  whitespace-nowrap animate-fade-in"
              >
                <Sparkles className="inline-block w-4 h-4 mr-1" />
                Chat with us!
                <Dot className="inline-block w-2 h-2 text-green-400 ml-2" />
              </span>
            )}
          </button>
        )}

        {/* Sliding chat panel */}
        <div
          className={`fixed bottom-7 right-7 max-w-[370px] w-[95vw] sm:w-[350px] z-50
            transition-all duration-300
            ${open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-10 opacity-0"}`}
        >
          {open && (
            <div
              className="
                bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-[var(--color-accent)]/30
                flex flex-col h-[520px] max-h-[90vh] overflow-hidden animate-fade-in
              "
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--color-muted)]/40 bg-white/60">
                <div className="flex items-center gap-2 text-lg font-semibold text-[var(--color-accent)]">
                  <MessageCircle className="w-6 h-6" />
                  Chat
                </div>
                <button
                  aria-label="Close chat"
                  className="p-2 rounded-full hover:bg-[var(--color-accent)]/10 transition"
                  onClick={() => setOpen(false)}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              {/* Messages */}
              <div className="flex-1 px-5 py-4 space-y-4 overflow-y-auto bg-transparent">
                {messages.length === 0 && (
                  <div className="text-center text-gray-500 mt-10">
                    <Sparkles className="mx-auto mb-2" />
                    <span>How can we help you?</span>
                  </div>
                )}
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`
                        max-w-[80%] px-4 py-2 rounded-xl
                        ${
                          msg.from === "user"
                            ? "bg-[var(--color-primary)] text-white ml-auto"
                            : "bg-gray-100 text-gray-900"
                        }
                        shadow text-base break-words
                      `}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {/* dummy div for scroll-to-bottom */}
                <div ref={chatEndRef} />
              </div>
              {/* Input */}
              <form
                className="flex items-center gap-2 px-4 pb-5"
                onSubmit={sendMessage}
                autoComplete="off"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message…"
                  className="
                    flex-1 rounded-full border border-[var(--color-muted)] bg-white/80
                    px-4 py-2 text-base outline-none focus:ring-2 focus:ring-[var(--color-primary)]
                  "
                  autoFocus={open}
                  disabled={pending}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || pending}
                  className="bg-[var(--color-accent)] hover:bg-[var(--color-primary)] text-white rounded-full p-2 shadow transition disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
