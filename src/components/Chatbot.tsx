/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MessageSquare as LucideMessageSquare, X, Send, Loader2, MinusCircle, Maximize2, ExternalLink, Globe, Sparkles, Search } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/src/lib/utils";
import ReactMarkdown from "react-markdown";
import { db } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface GroundedSource {
  title: string;
  uri: string;
}

interface Message {
  role: "user" | "model";
  parts: [{ text: string }];
  sources?: GroundedSource[];
  searchQueries?: string[];
}

export default function Chatbot() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, isOpen]);

  const handleSend = async (e?: React.FormEvent, customMsg?: string) => {
    e?.preventDefault();
    const messageToSend = customMsg || input;
    if (!messageToSend.trim() || isLoading) return;

    const userMessage: Message = { role: "user", parts: [{ text: messageToSend }] };
    setMessages((prev) => [...prev, userMessage]);
    if (!customMsg) setInput("");
    setIsLoading(true);

    const lowerMsg = messageToSend.toLowerCase().trim();

    // Lead collection logic
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
    const phoneRegex = /\b(?:\+?\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}\b/;
    const emailMatch = messageToSend.match(emailRegex);
    const phoneMatch = messageToSend.match(phoneRegex);

    if (emailMatch || phoneMatch) {
      const contact = emailMatch ? emailMatch[0] : phoneMatch![0];
      try {
        await addDoc(collection(db, "leads"), {
          emailOrPhone: contact,
          context: messages.map(m => `[${m.role}] ${m.parts[0].text}`).join("\n"),
          createdAt: serverTimestamp(),
        });
        setMessages((prev) => [...prev, { 
          role: "model", 
          parts: [{ text: "Got it! I've noted down your contact information. One of our experts will reach out to you shortly. In the meantime, is there anything else I can help you with? 🛡️" }] 
        }]);
        setIsLoading(false);
        return;
      } catch (err) {
        console.error("Error saving lead:", err);
      }
    }

    // Direct quick navigation for check refund status click
    if (lowerMsg === "check refund status" || lowerMsg === "refund status") {
      setTimeout(() => {
        setMessages((prev) => [...prev, { 
          role: "model", 
          parts: [{ text: "Opening our **Refund & Payment Center** now. You can track your official Federal and State tax refund progress directly through IRS and state gateways! 🚀" }] 
        }]);
        setTimeout(() => {
          navigate("/tax-tools");
        }, 1500);
      }, 300);
      setIsLoading(false);
      return;
    }

    // Direct quick navigation for upload documents
    if (lowerMsg === "upload documents" || lowerMsg === "upload docs") {
      setTimeout(() => {
        setMessages((prev) => [...prev, { 
          role: "model", 
          parts: [{ text: "To upload documents securely, please access your **Canopy Client Portal** or use our secure client portal on the [Client Login page](/login)." }] 
        }]);
        setIsLoading(false);
      }, 300);
      return;
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageToSend,
          history: messages,
        }),
      });

      const data = await response.json();
      if (data.text) {
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            parts: [{ text: data.text }],
            sources: Array.isArray(data.sources) ? data.sources : undefined,
            searchQueries: Array.isArray(data.searchQueries) ? data.searchQueries : undefined,
          },
        ]);
      } else if (data.error) {
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            parts: [{ text: "I'm currently unable to retrieve live search data. Please feel free to reach our team at info@taxbeam.co or +1 737-381-2330." }],
          },
        ]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "model", parts: [{ text: "Sorry, I'm having trouble connecting to the team. Please email us at info@taxbeam.co or call +1 737-381-2330." }] },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickOptions = [
    "2026 IRS Tax Brackets & Standard Deduction",
    "FBAR Foreign Account Threshold ($10k)",
    "Start my tax filing",
    "Check refund status",
  ];

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100] flex flex-col items-end">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="w-[calc(100vw-2rem)] sm:w-[400px] max-h-[78vh] sm:h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden mb-3"
          >
            {/* Header */}
            <div className="bg-blue-900 p-4 text-white flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-800 flex items-center justify-center overflow-hidden relative">
                  <span className="font-black text-white">T</span>
                </div>
                <div>
                  <h3 className="font-bold text-sm">TaxBeam LLC Assistant</h3>
                  <div className="flex items-center gap-1.5 text-[10px] text-blue-200">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    Online & Ready to Help
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setIsMinimized(true)} className="p-1 hover:bg-white/10 rounded transition-colors">
                  <MinusCircle className="w-5 h-5" />
                </button>
                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
              {messages.length === 0 && (
                <div className="space-y-4 py-4 text-center">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2 text-blue-900">
                    <LucideMessageSquare className="w-8 h-8" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-gray-900">Hi, welcome to TaxBeam LLC 👋</h4>
                    <p className="text-sm text-gray-500">How can we help you today?</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-4">
                    {quickOptions.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          handleSend(undefined, opt);
                        }}
                        className="text-left p-3 text-xs font-medium text-blue-900 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all border border-blue-100/50"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "flex w-full mb-4",
                    msg.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl p-4 text-sm shadow-sm",
                      msg.role === "user"
                        ? "bg-blue-600 text-white rounded-tr-none"
                        : "bg-gray-50 text-gray-800 rounded-tl-none border border-gray-100"
                    )}
                  >
                    <div className="prose prose-sm max-w-none prose-blue">
                      <ReactMarkdown>
                        {msg.parts[0].text}
                      </ReactMarkdown>
                    </div>

                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-200/70">
                        <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-blue-900 mb-1.5">
                          <Globe className="w-3 h-3 text-blue-600" />
                          <span>Grounded Sources ({msg.sources.length})</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {msg.sources.slice(0, 4).map((src, sIdx) => {
                            let domain = "";
                            try {
                              domain = new URL(src.uri).hostname.replace("www.", "");
                            } catch {
                              domain = "source";
                            }
                            return (
                              <a
                                key={sIdx}
                                href={src.uri}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-900 bg-blue-100/80 hover:bg-blue-200 px-2 py-0.5 rounded-md transition-colors group"
                                title={src.title}
                              >
                                <span className="truncate max-w-[130px]">{src.title || domain}</span>
                                <ExternalLink className="w-2.5 h-2.5 opacity-70 group-hover:opacity-100" />
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start mb-4">
                  <div className="bg-gray-50 rounded-2xl rounded-tl-none p-4 shadow-sm border border-gray-100">
                    <Loader2 className="w-5 h-5 text-blue-900 animate-spin" />
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-100 flex gap-2 items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-gray-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-900 outline-none transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="bg-blue-900 text-white p-3 rounded-xl disabled:opacity-50 hover:bg-blue-800 transition-all active:scale-95"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>

            <div className="p-2 text-[10px] text-center text-gray-400 bg-gray-50">
              New York, NY (EST) Support • info@taxbeam.co
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Buttons */}
      <div className="flex items-center gap-3">
        {/* Minimized Window Indicator */}
        <AnimatePresence>
          {isOpen && isMinimized && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              onClick={() => setIsMinimized(false)}
              className="bg-blue-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2 font-bold mb-0"
            >
              <Maximize2 className="w-5 h-5" />
              <span>Restore Chat</span>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Main Launcher */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            if (isOpen && isMinimized) {
              setIsMinimized(false);
            } else {
              setIsOpen(!isOpen);
            }
          }}
          className={cn(
            "w-12 h-12 sm:w-16 sm:h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-500",
            isOpen ? "bg-white text-blue-900 rotate-180 border-2 border-blue-900" : "bg-blue-900 text-white shadow-blue-900/30 ring-4 ring-blue-900/10"
          )}
        >
          {isOpen ? <X className="w-6 h-6 sm:w-8 sm:h-8" /> : <LucideMessageSquare className="w-6 h-6 sm:w-8 sm:h-8" />}
        </motion.button>
      </div>
    </div>
  );
}
