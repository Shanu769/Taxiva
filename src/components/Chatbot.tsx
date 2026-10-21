/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from "react";
import { MessageSquare as LucideMessageSquare, X, Send, Loader2, MinusCircle, Maximize2, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/src/lib/utils";
import ReactMarkdown from "react-markdown";
import { db } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface Message {
  role: "user" | "model";
  parts: [{ text: string }];
}

export default function Chatbot() {
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

    const lowerMsg = messageToSend.toLowerCase();

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

    // Check refund status redirect
    if (lowerMsg.includes("refund")) {
      setTimeout(() => {
        setMessages((prev) => [...prev, { 
          role: "model", 
          parts: [{ text: "I'm redirecting you to our **Refund & Payment Center** now. You can check your federal and state refund status there! 🚀" }] 
        }]);
        setTimeout(() => {
          window.location.href = "/tax-tools";
        }, 2000);
      }, 500);
      setIsLoading(false);
      return;
    }

    // Start my tax filing
    if (lowerMsg.includes("start") && lowerMsg.includes("file")) {
      setTimeout(() => {
        setMessages((prev) => [...prev, { 
          role: "model", 
          parts: [{ text: "Taxiva LLC is your expert partner. We provide precise tax filings and wealth-building strategies. Our team ensures 100% accuracy and compliance. You can [fill out our Get Started Google Form](/get-started) and our team will respond automatically!" }] 
        }]);
        setIsLoading(false);
      }, 500);
      return;
    }

    // Upload documents
    if (lowerMsg.includes("upload") && lowerMsg.includes("doc")) {
      setTimeout(() => {
        setMessages((prev) => [...prev, { 
          role: "model", 
          parts: [{ text: "To upload documents securely, please log in to your **Canopy Everything Access Portal**. You can access it via the [Client Login page](/login) or directly [here](https://app.canopytax.com)." }] 
        }]);
        setIsLoading(false);
      }, 500);
      return;
    }

    // Pricing
    if (lowerMsg.includes("pricing") || lowerMsg.includes("cost") || lowerMsg.includes("fee")) {
      setTimeout(() => {
        setMessages((prev) => [...prev, { 
          role: "model", 
          parts: [{ text: "Our expert tax services are transparent and value-based, starting from just **$89**. For a detailed quote tailored to your specific needs, feel free to ask me more or visit our [Pricing page](/pricing)." }] 
        }]);
        setIsLoading(false);
      }, 500);
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
        setMessages((prev) => [...prev, { role: "model", parts: [{ text: data.text }] }]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "model", parts: [{ text: "Sorry, I'm having trouble connecting to the team. Please email us at info@taxiva.co or call +1 737-381-2330." }] },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickOptions = [
    "Start my tax filing",
    "Check refund status",
    "Upload documents",
    "Ask about pricing",
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="w-[90vw] sm:w-[400px] h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="bg-blue-900 p-4 text-white flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-800 flex items-center justify-center overflow-hidden relative">
                  <span className="font-black text-white">T</span>
                </div>
                <div>
                  <h3 className="font-bold text-sm">Taxiva LLC Assistant</h3>
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
                    <h4 className="font-bold text-gray-900">Hi, welcome to Taxiva LLC 👋</h4>
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
              New York, NY (EST) Support • info@taxiva.co
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
            "w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-500",
            isOpen ? "bg-white text-blue-900 rotate-180 border-2 border-blue-900" : "bg-blue-900 text-white shadow-blue-900/30 ring-4 ring-blue-900/10"
          )}
        >
          {isOpen ? <X className="w-8 h-8" /> : <LucideMessageSquare className="w-8 h-8" />}
        </motion.button>
      </div>
    </div>
  );
}
