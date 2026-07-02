"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChat } from "@ai-sdk/react";
import { MessageSquare, X, Send, Bot, User } from "lucide-react";

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: "/api/chat",
  });

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] transition-all duration-300 ${
          isOpen ? "hidden" : "flex"
        }`}
        aria-label="Open AI Chat"
      >
        <MessageSquare size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 w-[90vw] sm:w-[400px] h-[600px] max-h-[80vh] flex flex-col bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-violet-500/20 to-cyan-500/20 rounded-full">
                  <Bot size={20} className="text-violet-600 dark:text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">SK Digital AI</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Ask about our services</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors rounded-full hover:bg-gray-200 dark:hover:bg-white/10"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              
              {/* Static Welcome Message */}
              <div className="flex justify-start">
                <div className="flex gap-3 max-w-[85%] flex-row">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-violet-600 to-cyan-600 text-white">
                    <Bot size={14} />
                  </div>
                  <div className="px-4 py-2.5 rounded-2xl text-sm whitespace-pre-wrap leading-relaxed bg-violet-50 dark:bg-violet-500/10 text-gray-800 dark:text-gray-200 border border-violet-100 dark:border-violet-500/20 rounded-tl-sm">
                    Hi there! I'm the SK Digital AI assistant. How can I help you today?
                  </div>
                </div>
              </div>

              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex gap-3 max-w-[85%] ${
                      m.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        m.role === "user"
                          ? "bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300"
                          : "bg-gradient-to-br from-violet-600 to-cyan-600 text-white"
                      }`}
                    >
                      {m.role === "user" ? <User size={14} /> : <Bot size={14} />}
                    </div>
                    <div
                      className={`px-4 py-2.5 rounded-2xl text-sm whitespace-pre-wrap leading-relaxed ${
                        m.role === "user"
                          ? "bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-gray-200 rounded-tr-sm"
                          : "bg-violet-50 dark:bg-violet-500/10 text-gray-800 dark:text-gray-200 border border-violet-100 dark:border-violet-500/20 rounded-tl-sm"
                      }`}
                    >
                      {m.content}
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[85%]">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-violet-600 to-cyan-600 text-white">
                      <Bot size={14} />
                    </div>
                    <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-violet-50 dark:bg-violet-500/10 border border-violet-100 dark:border-violet-500/20 flex items-center gap-1.5">
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-violet-500 dark:bg-violet-400 rounded-full" />
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-violet-500 dark:bg-violet-400 rounded-full" />
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-violet-500 dark:bg-violet-400 rounded-full" />
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="text-center p-3 mt-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-lg text-sm text-red-600 dark:text-red-400">
                  {error.message.includes("API key") 
                    ? "Chat is currently in demo mode. Add an OPENAI_API_KEY to enable AI responses."
                    : "Something went wrong. Please try again."}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white dark:bg-[#0a0a0a] border-t border-gray-200 dark:border-white/10">
              <form
                onSubmit={handleSubmit}
                className="relative flex items-center"
              >
                <input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask a question..."
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full py-3 pl-4 pr-12 text-sm text-gray-900 dark:text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-shadow"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input?.trim()}
                  className="absolute right-2 p-2 rounded-full bg-violet-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-violet-700 transition-colors"
                  aria-label="Send message"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
