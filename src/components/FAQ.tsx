/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, MessageCircle, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
}

export const FAQ_DATA: FAQItem[] = [
  {
    id: "faq-1",
    question: "What is tax filing with Taxiva LLC, and how does the process work?",
    answer:
      "Our CPA-reviewed tax filing process works in 4 simple steps: (1) Submit our quick Get Started form; (2) Upload your W-2s, 1099s, and tax documents securely to our Canopy Everything Access Portal; (3) Receive a complete line-by-line draft tax return prepared by our tax specialists; (4) Approve and e-sign Form 8879 for official IRS and state e-filing.",
    category: "Filing Process",
    tags: ["Filing Process", "Canopy Portal", "Form 8879", "E-File"]
  },
  {
    id: "faq-2",
    question: "What are the IRS tax filing deadlines for 2025–2026?",
    answer:
      "Key IRS deadlines include March 15 for S-Corporations (Form 1120-S) and Partnerships (Form 1065), and April 15 for Individual tax returns (Form 1040), Single-Member LLCs, C-Corporations (Form 1120), and FinCEN Form 114 (FBAR). With an approved extension, business returns are due September 15 and individual returns are due October 15.",
    category: "Deadlines",
    tags: ["Deadlines", "April 15", "March 15", "Extension"]
  },
  {
    id: "faq-3",
    question: "Why choose an expert online tax filing firm like Taxiva LLC?",
    answer:
      "Unlike automated DIY software that misses RSU cost-basis adjustments, multi-state credits, or US-India DTAA treaty benefits, every Taxiva LLC return undergoes a comprehensive review by experienced CPAs and IRS Enrolled Agents—plus a complimentary 3-year prior return check.",
    category: "Why Taxiva LLC",
    tags: ["CPA Review", "RSU", "Multi-State", "Prior Return Check"]
  },
  {
    id: "faq-4",
    question: "What core tax filing services do you offer, and who needs them?",
    answer:
      "We specialize in four core areas: (1) Individual Tax Filing (Form 1040, W-2, 1099, RSUs, Schedule E rentals); (2) Business Tax Filing (LLC, Partnership Form 1065, S-Corp Form 1120-S, C-Corp Form 1120); (3) FBAR & Foreign Reporting (FinCEN Form 114 & FATCA Form 8938); and (4) Indian Tax & NRI cross-border services (Indian ITR & Form 1116 Foreign Tax Credit).",
    category: "Services",
    tags: ["Individual Tax", "Business Tax", "FBAR", "Indian Tax & NRI"]
  },
  {
    id: "faq-5",
    question: "What are the FBAR (FinCEN 114) and FATCA reporting rules for foreign accounts?",
    answer:
      "If the combined highest balance across all your foreign financial accounts (such as NRE, NRO, FCNR, or overseas bank and brokerage accounts) exceeded $10,000 at any point during the calendar year, you must file FinCEN Form 114 (FBAR). Higher foreign asset balances also require IRS Form 8938 under FATCA.",
    category: "Foreign Reporting",
    tags: ["FBAR", "FinCEN 114", "FATCA", "Form 8938", "NRI"]
  },
  {
    id: "faq-6",
    question: "How does filing online with Taxiva LLC make refunds and IRS payments easier?",
    answer:
      "We e-file your federal and state returns directly with the IRS for rapid direct-deposit refunds, and our Refund & Payment Center gives you one-click access to official IRS Where's My Refund tracking, IRS Direct Pay, and all 50 state tax portals.",
    category: "Refunds & Payments",
    tags: ["Refund Status", "IRS Direct Pay", "State Portals"]
  },
  {
    id: "faq-7",
    question: "Can Taxiva LLC help with last-minute extensions, ITIN applications, or IRS notices?",
    answer:
      "Yes. Whether you need an immediate Form 4868 / Form 7004 filing extension, a Form W-7 ITIN application for your spouse or dependents, New York (NY) main company formation, or representation to respond to an IRS notice or letter, our New York, NY (EST) team is ready to assist year-round.",
    category: "Extensions & ITIN",
    tags: ["ITIN", "Form W-7", "IRS Notice", "Extension"]
  }
];

export default function FAQ({ className = "" }: { className?: string }) {
  const [expandedId, setExpandedId] = useState<string | null>("faq-1");

  const toggleAccordion = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className={`w-full ${className}`} id="faq-section">
      {/* Side-by-side layout matching reference image 6 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Side: Title, Description & Expert CTA */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6">
          <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-[#334155] bg-[#eff6ff] px-3.5 py-1.5 rounded-lg">
            Tax Knowledge Base
          </span>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#0f172a] tracking-tight leading-[1.1] font-display">
            Frequently Asked Questions
          </h2>

          <p className="text-[#334155]/80 text-base sm:text-lg leading-relaxed font-medium">
            At Taxiva LLC, we help individuals, Global Indians, NRIs, and businesses file confidently across all 50 states—so you never miss a deduction, credit, or compliance deadline.
          </p>

          <div className="pt-2 space-y-4">
            <p className="text-base font-bold text-[#0f172a]">
              Have more questions about your tax return?
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/get-started"
                className="inline-flex items-center gap-2.5 bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-md transition-all active:scale-95"
              >
                <span>Chat with Expert</span>
                <MessageCircle className="w-4 h-4" />
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white text-[#1d4ed8] border border-[#dbeafe] hover:bg-[#f8fafc] font-bold text-sm px-5 py-3.5 rounded-xl transition-all"
              >
                <span>Contact Us</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Side highlight box on the left column */}
          <div className="mt-6 bg-[#f8fafc] border border-[#dbeafe] rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2.5 text-[#1d4ed8] font-extrabold text-sm">
              <ShieldCheck className="w-5 h-5 shrink-0" />
              <span>100% CPA & Enrolled Agent Reviewed</span>
            </div>
            <p className="text-xs text-[#334155]/80 leading-relaxed">
              Every Individual, Business, FBAR, and Indian NRI return is reviewed line-by-line before Form 8879 e-filing authorization.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1d4ed8] bg-white border border-[#dbeafe] px-2.5 py-1 rounded-md">
                <CheckCircle2 className="w-3.5 h-3.5" /> Free 3-Year Return Review
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1d4ed8] bg-white border border-[#dbeafe] px-2.5 py-1 rounded-md">
                <CheckCircle2 className="w-3.5 h-3.5" /> Flat-Fee Pricing
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Clean White Accordion Card List */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#dbeafe] shadow-sm divide-y divide-[#eff6ff] px-6 sm:px-8 py-2">
          {FAQ_DATA.map((faq) => {
            const isExpanded = expandedId === faq.id;

            return (
              <div key={faq.id} className="py-5">
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer group"
                >
                  <h3 className="text-base sm:text-lg font-extrabold text-[#0f172a] group-hover:text-[#2563eb] transition-colors leading-snug">
                    {faq.question}
                  </h3>

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
                      isExpanded
                        ? "bg-[#1d4ed8] text-white rotate-180"
                        : "bg-[#eff6ff] text-[#1d4ed8] group-hover:bg-[#dbeafe]"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pt-3.5 text-sm sm:text-base text-[#334155]/90 leading-relaxed font-medium">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
