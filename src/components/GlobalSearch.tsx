/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from "react";
import { Search, X, FileText, Calculator, Landmark, ShieldCheck, ArrowRight, HelpCircle, ExternalLink, Sparkles, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

export interface SearchItem {
  id: string;
  title: string;
  category: "Tax Forms" | "Tax Tools" | "Services & Pages" | "FAQ & Help";
  description: string;
  path: string;
  isExternal?: boolean;
  keywords: string[];
}

const SEARCH_DATABASE: SearchItem[] = [
  // Tax Forms & Schedules
  {
    id: "form-1040",
    title: "Form 1040 - U.S. Individual Income Tax Return",
    category: "Tax Forms",
    description: "Primary IRS tax form used by U.S. residents to report annual taxable income.",
    path: "/tax-tools",
    keywords: ["1040", "federal", "individual return", "irs", "tax form"]
  },
  {
    id: "schedule-c",
    title: "Schedule C - Profit or Loss From Business",
    category: "Tax Forms",
    description: "Report self-employment income, 1099 earnings, and business expense deductions.",
    path: "/services/business",
    keywords: ["schedule c", "1099", "self employment", "sole proprietor", "llc", "expenses"]
  },
  {
    id: "form-w2",
    title: "Form W-2 - Wage and Tax Statement",
    category: "Tax Forms",
    description: "Annual employment statement detailing wages earned and federal/state taxes withheld.",
    path: "/dashboard",
    keywords: ["w2", "w-2", "wages", "withholding", "employer", "salary"]
  },
  {
    id: "fbar-fincen",
    title: "FBAR / FinCEN Form 114 - Foreign Bank Account Report",
    category: "Tax Forms",
    description: "Mandatory reporting if total foreign financial account balance exceeded $10,000.",
    path: "/services/foreign-reporting",
    keywords: ["fbar", "fincen 114", "foreign bank", "nri", "india", "overseas accounts", "$10000"]
  },
  {
    id: "form-8879",
    title: "Form 8879 - IRS e-file Signature Authorization",
    category: "Tax Forms",
    description: "Sign your official electronic tax return filing consent for CPA submission.",
    path: "/dashboard",
    keywords: ["8879", "efile", "signature", "authorization", "cpa", "consent"]
  },
  {
    id: "form-1098",
    title: "Form 1098 - Mortgage Interest & Property Tax Statement",
    category: "Tax Forms",
    description: "Claim itemized deductions for home mortgage interest paid during the tax year.",
    path: "/tax-tools",
    keywords: ["1098", "mortgage", "homeowner", "property tax", "itemized deductions"]
  },
  {
    id: "form-4868",
    title: "Form 4868 - Application for Automatic Tax Extension",
    category: "Tax Forms",
    description: "Request an automatic 6-month extension to file your Form 1040 until October 15.",
    path: "/tax-tools",
    keywords: ["4868", "extension", "october 15", "late filing", "irs extension"]
  },

  // Tax Tools & Portals
  {
    id: "tool-refund-status",
    title: "IRS & State Refund Status Tracker",
    category: "Tax Tools",
    description: "Track your official Federal and State tax refund progress in real-time.",
    path: "/tax-tools",
    keywords: ["refund", "where is my refund", "irs status", "state refund", "direct deposit"]
  },
  {
    id: "tool-camera-scanner",
    title: "Camera Document Scanner & Upload Vault",
    category: "Tax Tools",
    description: "Capture receipts, paper W-2s, or tax letters using your device camera.",
    path: "/dashboard",
    keywords: ["camera", "scan", "document vault", "upload", "photo", "receipt"]
  },
  {
    id: "tool-irs-payment",
    title: "IRS Direct Pay & State Payment Portals",
    category: "Tax Tools",
    description: "Official links to submit quarterly estimated taxes or balance due online.",
    path: "/tax-tools",
    keywords: ["irs direct pay", "payment portal", "pay irs", "estimated tax payment"]
  },

  // Services & Pages
  {
    id: "page-individual",
    title: "Individual Tax Filing",
    category: "Services & Pages",
    description: "Comprehensive federal & multi-state tax filing support by licensed CPAs.",
    path: "/services/individual",
    keywords: ["individual tax", "personal filing", "1040", "cpa review", "multi state"]
  },
  {
    id: "page-business",
    title: "Business Tax Filing",
    category: "Services & Pages",
    description: "Form 1120-S, Form 1065 partnership returns, and corporate tax compliance.",
    path: "/services/business",
    keywords: ["business tax", "llc", "s-corp", "partnership", "corporate tax", "1120"]
  },
  {
    id: "page-foreign",
    title: "FBAR & Foreign Reporting",
    category: "Services & Pages",
    description: "Specialized assistance for NRIs, H-1B, L-1, and foreign asset disclosure (FATCA).",
    path: "/services/foreign-reporting",
    keywords: ["foreign reporting", "nri tax", "fbar", "fatca", "cross border", "india tax"]
  },
  {
    id: "page-indian-tax",
    title: "Indian Tax & NRI Services",
    category: "Services & Pages",
    description: "US & India cross-border tax filing, DTAA relief, and Indian ITR support for NRIs.",
    path: "/services/indian-tax",
    keywords: ["indian tax", "nri", "india itr", "dtaa", "nre", "nro"]
  },
  {
    id: "page-get-started",
    title: "Get Started — Client Intake Google Form",
    category: "Services & Pages",
    description: "Submit your Name, Email ID, Phone Number, and Purpose of Filing for instant team response.",
    path: "/get-started",
    keywords: ["get started", "google form", "consultation", "book consultation", "intake"]
  },
  {
    id: "page-pricing",
    title: "Taxiva LLC Pricing & CPA Consultation Plans",
    category: "Services & Pages",
    description: "Transparent fixed-fee pricing for individual, business, and foreign tax returns.",
    path: "/pricing",
    keywords: ["pricing", "cost", "fee", "cpa consultation", "plans"]
  },
  {
    id: "page-settings",
    title: "Account Settings & Email Notification Preferences",
    category: "Services & Pages",
    description: "Configure deadline reminders, document verification alerts, and email preferences.",
    path: "/dashboard",
    keywords: ["settings", "preferences", "notifications", "email alerts", "account"]
  },

  // FAQ & Articles
  {
    id: "faq-deadlines",
    title: "When are federal and state tax returns due in 2026?",
    category: "FAQ & Help",
    description: "April 15 is the primary deadline for Form 1040 and FBAR reporting.",
    path: "/#faq-section",
    keywords: ["deadline", "due date", "april 15", "when to file"]
  },
  {
    id: "faq-fbar-10k",
    title: "Do I need to file FBAR if my foreign balance reached $10,000 for just one day?",
    category: "FAQ & Help",
    description: "Yes, the $10,000 threshold applies to the aggregate maximum balance at any point in the year.",
    path: "/#faq-section",
    keywords: ["fbar threshold", "10000 rule", "foreign bank", "max balance"]
  },
  {
    id: "faq-extension-pay",
    title: "Does filing a tax extension give me more time to pay taxes owed?",
    category: "FAQ & Help",
    description: "No, an extension extends filing time to Oct 15, but taxes owed must still be paid by Apr 15.",
    path: "/#faq-section",
    keywords: ["extension payment", "interest", "penalty", "tax owed"]
  }
];

export default function GlobalSearchModal({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const filteredResults = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return SEARCH_DATABASE.slice(0, 8); // default quick list

    return SEARCH_DATABASE.filter((item) => {
      return (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.keywords.some((k) => k.toLowerCase().includes(q))
      );
    });
  }, [query]);

  const handleSelect = (item: SearchItem) => {
    onClose();
    if (item.isExternal) {
      window.open(item.path, "_blank");
    } else if (item.path.startsWith("/#")) {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(item.path.replace("/#", ""));
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      navigate(item.path);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredResults.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredResults.length) % Math.max(1, filteredResults.length));
    } else if (e.key === "Enter" && filteredResults[selectedIndex]) {
      e.preventDefault();
      handleSelect(filteredResults[selectedIndex]);
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  if (!isOpen) return null;

  const categoryIcons: Record<string, any> = {
    "Tax Forms": FileText,
    "Tax Tools": Calculator,
    "Services & Pages": Landmark,
    "FAQ & Help": HelpCircle
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-200">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden text-left flex flex-col max-h-[80vh]"
          onKeyDown={handleKeyDown}
        >
          {/* Top Search Field Bar */}
          <div className="p-4 border-b border-gray-100 flex items-center gap-3 bg-gray-50/50">
            <Search className="w-5 h-5 text-blue-900 shrink-0 ml-2" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
              placeholder="Search tax forms, tools, articles, or services (⌘K)..."
              className="w-full bg-transparent text-base font-bold text-gray-900 placeholder:text-gray-400 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-200/60 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="px-2.5 py-1 text-[11px] font-extrabold text-gray-500 bg-gray-200/70 hover:bg-gray-200 rounded-lg shrink-0 uppercase tracking-widest"
            >
              ESC
            </button>
          </div>

          {/* Quick Filter Tag Chips */}
          <div className="px-5 py-2.5 bg-gray-50/30 border-b border-gray-100 flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider shrink-0 mr-1">Quick:</span>
            {["Form 1040", "Refund Status", "FBAR", "W-2", "Direct Pay", "Schedule C"].map((chip) => (
              <button
                key={chip}
                onClick={() => setQuery(chip)}
                className="px-2.5 py-1 bg-white border border-gray-200/80 rounded-lg font-bold text-gray-600 hover:border-blue-900 hover:text-blue-900 shrink-0 text-[11px] transition-all shadow-2xs"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Search Result List */}
          <div className="p-3 overflow-y-auto max-h-[55vh] space-y-1">
            {filteredResults.length > 0 ? (
              filteredResults.map((item, index) => {
                const isSelected = index === selectedIndex;
                const IconComp = categoryIcons[item.category] || BookOpen;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`w-full p-3.5 rounded-2xl text-left flex items-start gap-3.5 transition-all ${
                      isSelected
                        ? "bg-blue-900 text-white shadow-lg shadow-blue-900/15"
                        : "hover:bg-gray-50 text-gray-800"
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
                      isSelected ? "bg-white/15 text-amber-300" : "bg-blue-50 text-blue-900"
                    }`}>
                      <IconComp className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                          isSelected ? "bg-white/20 text-white" : "bg-blue-50 text-blue-900"
                        }`}>
                          {item.category}
                        </span>
                      </div>
                      <h4 className={`text-sm font-bold truncate ${isSelected ? "text-white" : "text-gray-900"}`}>
                        {item.title}
                      </h4>
                      <p className={`text-xs font-medium line-clamp-1 mt-0.5 ${isSelected ? "text-blue-100" : "text-gray-500"}`}>
                        {item.description}
                      </p>
                    </div>

                    <div className={`shrink-0 self-center ${isSelected ? "text-amber-300" : "text-gray-300"}`}>
                      {item.isExternal ? <ExternalLink className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="py-12 text-center text-gray-400 font-medium">
                <Search className="w-8 h-8 mx-auto text-gray-300 mb-2" />
                <p className="text-sm font-bold text-gray-700">No results found for "{query}"</p>
                <p className="text-xs text-gray-400 mt-1">Try searching for W-2, FBAR, 1040, or Tax Estimator</p>
              </div>
            )}
          </div>

          {/* Footer Shortcuts hint */}
          <div className="p-3 bg-gray-50 border-t border-gray-100 text-[11px] font-bold text-gray-400 flex items-center justify-between px-5">
            <div className="flex items-center gap-3">
              <span><kbd className="px-1.5 py-0.5 bg-gray-200 rounded text-[10px]">↑↓</kbd> Navigate</span>
              <span><kbd className="px-1.5 py-0.5 bg-gray-200 rounded text-[10px]">↵</kbd> Select</span>
            </div>
            <div className="flex items-center gap-1 text-blue-900">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Taxiva LLC Intelligent Index</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
