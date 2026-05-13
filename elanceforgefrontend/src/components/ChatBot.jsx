import React, { useState, useRef, useEffect } from "react";
import {
  MessageCircleMore,
  Send,
  X,
  Bot,
  User,
  Sparkles,
} from "lucide-react";

const ChatBot = () => {
  const [open, setOpen] = useState(false);

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "👋 Welcome to ElanceForge AI Assistant.\n\nWe help businesses grow with:\n\n• Website Development\n• SEO Optimization\n• Branding & UI/UX\n• Digital Marketing\n• Lead Generation\n• Business Growth Strategy\n\nTell me what you need help with 🚀",
    },
  ]);

  const messagesEndRef = useRef(null);

  // Auto Scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  // Send Message
  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      return;
    }

    const userMessage = {
      role: "user",
      content: message,
    };

    setMessages((prev) => [...prev, userMessage]);

    const currentMessage = message;

    setMessage("");

    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/chat`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            message: currentMessage,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.reply,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Something went wrong.",
          },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Server error. Please try again later.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      {/* Floating AI Button */}

      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-[9999] w-[75px] h-[75px] rounded-full bg-gradient-to-br from-orange-500 to-orange-700 shadow-[0_10px_35px_rgba(255,115,0,0.45)] flex items-center justify-center border-4 border-white animate-pulse hover:scale-110 transition-all duration-300"
      >
        {/* Text Bubble */}

        {!open && (
          <div className="absolute right-[90px] bg-white px-4 py-3 rounded-2xl shadow-xl text-sm font-semibold whitespace-nowrap text-gray-800 animate-bounce">
            Ask <span className="text-orange-600">AI</span> Assistant 🚀
          </div>
        )}

        {/* Icon */}

        {open ? (
          <X
            size={32}
            className="text-white"
          />
        ) : (
          <div className="relative">
            <MessageCircleMore
              size={34}
              className="text-white animate-bounce"
            />

            <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-400 animate-ping" />
          </div>
        )}
      </button>

      {/* Chat Box */}

      {open && (
        <div className="fixed bottom-28 right-6 z-[9999] w-[390px] max-w-[95vw] h-[620px] bg-white rounded-3xl overflow-hidden shadow-2xl border border-orange-100 flex flex-col">
          {/* Header */}

          <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <Sparkles size={24} />
              </div>

              <div>
                <h2 className="font-bold text-lg">
                  ElanceForge AI
                </h2>

                <p className="text-xs text-white/80">
                  Smart Business Assistant
                </p>
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}

          <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4 bg-gradient-to-b from-orange-50 to-white">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === "user"
                      ? "bg-orange-600 text-white rounded-br-sm"
                      : "bg-white text-gray-800 rounded-bl-sm border border-orange-100"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {msg.role === "assistant" ? (
                      <Bot
                        size={18}
                        className="mt-1 shrink-0 text-orange-600"
                      />
                    ) : (
                      <User
                        size={18}
                        className="mt-1 shrink-0"
                      />
                    )}

                    <p className="whitespace-pre-wrap">
                      {msg.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Loading Animation */}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-orange-100 px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm flex gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-bounce"></span>

                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-bounce [animation-delay:0.2s]"></span>

                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}

          <form
            onSubmit={handleSendMessage}
            className="p-4 border-t bg-white flex items-center gap-3"
          >
            <input
              type="text"
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              placeholder="Ask about services..."
              className="flex-1 border border-gray-300 rounded-2xl px-4 py-3 outline-none focus:border-orange-500"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-12 h-12 rounded-full bg-orange-600 text-white flex items-center justify-center hover:bg-orange-700 transition disabled:opacity-50"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBot;