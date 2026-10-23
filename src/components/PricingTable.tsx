/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import {
  Check,
  ArrowRight,
  User,
  Building2,
  BookOpen,
  Calculator,
  Calendar,
  Sparkles,
  HelpCircle,
  ShieldCheck,
  Gift
} from "lucide-react";

export type PricingTabType = "individual" | "business" | "bookkeeping";

interface PricingTableProps {
  onOpenConsultation?: () => void;
  activeTab?: PricingTabType;
  onTabChange?: (tab: PricingTabType) => void;
}

export default function PricingTable({
  onOpenConsultation,
  activeTab: controlledTab,
  onTabChange
}: PricingTableProps) {
  const [internalTab, setInternalTab] = useState<PricingTabType>("individual");
  const activeTab = controlledTab ?? internalTab;
  const navigate = useNavigate();

  const handleSelectTab = (tab: PricingTabType) => {
    setInternalTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  const handleCta = (planName: string) => {
    navigate(`/get-started?plan=${encodeURIComponent(planName)}&type=pricing`);
  };

  const referralDetails = {
    individual: {
      title: "Refer a Friend & Earn $10",
      desc: "Receive a $10 instant credit for every friend or colleague who completes an Individual Tax Return."
    },
    business: {
      title: "Refer a Business & Earn $30",
      desc: "Receive a $30 instant credit for every business owner who completes a Business Tax Filing (1120-S, 1065, 1120, or LLC)."
    },
    bookkeeping: {
      title: "Refer a Friend & Earn $50",
      desc: "Receive a $50 instant credit for every business or founder who signs up for Monthly Bookkeeping."
    }
  }[activeTab];

  return (
    <div className="w-full bg-[#f6f3ee] py-14 sm:py-20 text-[#0f172a]">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top 3-Tab Segmented Switcher (Exact replica of the blue bar in screenshots) */}
        <div className="max-w-3xl mx-auto mb-10 sm:mb-12 space-y-4">
          <div className="p-1.5 sm:p-2 bg-[#2563eb] rounded-2xl shadow-lg grid grid-cols-3 gap-1.5 sm:gap-2 text-white">
            <button
              onClick={() => handleSelectTab("individual")}
              className={`py-3 px-3 sm:px-6 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === "individual"
                  ? "bg-white text-[#1d4ed8] shadow-md"
                  : "text-white/90 hover:text-white hover:bg-white/10"
              }`}
            >
              <User className="w-4 h-4 shrink-0" />
              <span className="truncate">Individual tax filing</span>
            </button>

            <button
              onClick={() => handleSelectTab("business")}
              className={`py-3 px-3 sm:px-6 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === "business"
                  ? "bg-white text-[#1d4ed8] shadow-md"
                  : "text-white/90 hover:text-white hover:bg-white/10"
              }`}
            >
              <Building2 className="w-4 h-4 shrink-0" />
              <span className="truncate">Business tax filing</span>
            </button>

            <button
              onClick={() => handleSelectTab("bookkeeping")}
              className={`py-3 px-3 sm:px-6 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeTab === "bookkeeping"
                  ? "bg-white text-[#1d4ed8] shadow-md"
                  : "text-white/90 hover:text-white hover:bg-white/10"
              }`}
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              <span className="truncate">Bookkeeping</span>
            </button>
          </div>

          {/* Dynamic Referral Reward Strip Synced with Active Tab */}
          <div className="bg-white border border-[#bfdbfe] rounded-2xl px-5 py-3.5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#eff6ff] text-[#1d4ed8] flex items-center justify-center shrink-0">
                <Gift className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-black text-[#0f172a] font-display">
                  {referralDetails.title}
                </p>
                <p className="text-xs text-[#475569] font-medium">
                  {referralDetails.desc}
                </p>
              </div>
            </div>
            <Link
              to="/get-started"
              className="inline-flex items-center justify-center gap-1.5 bg-[#eff6ff] hover:bg-[#dbeafe] text-[#1d4ed8] px-4 py-2 rounded-xl text-xs font-extrabold transition-colors shrink-0"
            >
              <span>Refer Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Tab 1: Individual tax filing */}
        {activeTab === "individual" && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-12"
          >
            {/* Header */}
            <div className="max-w-3xl">
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#0f172a] font-display">
                Individual returns, priced by what&apos;s on them
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#475569] font-medium leading-relaxed">
                Every plan is prepared and signed by a licensed CPA or Enrolled Agent, reviewed before it is filed, and quoted before any work starts. Pick the plan that matches your forms; add-ons cover the rest.
              </p>
            </div>

            {/* 4 Cards Row: Base Plan, Plus, Premium, Custom */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
              {/* Card 1: Base Plan */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#e2e8f0] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <h3 className="text-xl font-black text-[#0f172a]">Base Plan</h3>
                  <p className="text-xs font-bold text-[#2563eb] mt-1">W-2 income, standard deduction</p>

                  <div className="my-5 flex items-baseline gap-1.5">
                    <span className="text-4xl sm:text-5xl font-black text-[#0f172a] font-display">$149</span>
                    <span className="text-xs font-semibold text-[#64748b]">per return</span>
                  </div>

                  <p className="text-xs text-[#475569] font-medium mb-6">
                    Employees, students and retirees with straightforward income.
                  </p>

                  <div className="border-t border-[#f1f5f9] pt-5">
                    <ul className="space-y-3 text-xs text-[#334155]">
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>Federal return plus one state</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>W-2s, 1099-INT and 1099-DIV</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>Child tax credit and dependent credits</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>E-filed, with direct deposit set up</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>Reviewed and signed by a licensed CPA or EA</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#f1f5f9]">
                  <button
                    onClick={() => handleCta("Individual Base Plan")}
                    className="w-full py-3 px-4 rounded-xl font-extrabold text-xs sm:text-sm bg-[#2563eb] hover:bg-[#1d4ed8] text-white flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
                  >
                    <span>Start with Base Plan</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Card 2: Plus (MOST POPULAR) */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-[#2563eb] shadow-xl relative flex flex-col justify-between ring-4 ring-[#2563eb]/10">
                <div className="absolute -top-3.5 left-6 bg-[#2563eb] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                  Most Popular
                </div>

                <div>
                  <h3 className="text-xl font-black text-[#0f172a]">Plus</h3>
                  <p className="text-xs font-bold text-[#2563eb] mt-1">Homeowners, investors, side income</p>

                  <div className="my-5 flex items-baseline gap-1.5">
                    <span className="text-4xl sm:text-5xl font-black text-[#0f172a] font-display">$249</span>
                    <span className="text-xs font-semibold text-[#64748b]">per return</span>
                  </div>

                  <p className="text-xs text-[#475569] font-medium mb-6">
                    You itemize, sold stock or RSUs, or earned some 1099 income on the side.
                  </p>

                  <div className="border-t border-[#f1f5f9] pt-5">
                    <ul className="space-y-3 text-xs text-[#334155]">
                      <li className="flex items-start gap-2.5 font-bold text-[#0f172a]">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>Everything in Base Plan</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>Itemized deductions: mortgage interest, SALT, charity</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>1099-B stock sales and RSU cost-basis fixes</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>1099-NEC side income up to $20,000</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>One rental property or one K-1</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>Withholding check so next April is smaller</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#f1f5f9]">
                  <button
                    onClick={() => handleCta("Individual Plus Plan")}
                    className="w-full py-3 px-4 rounded-xl font-extrabold text-xs sm:text-sm bg-[#ffedd5] hover:bg-[#fed7aa] text-[#9a3412] flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
                  >
                    <span>Start with Plus</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Card 3: Premium */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#e2e8f0] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <h3 className="text-xl font-black text-[#0f172a]">Premium</h3>
                  <p className="text-xs font-bold text-[#2563eb] mt-1">Self-employed, landlords, equity comp</p>

                  <div className="my-5 flex items-baseline gap-1.5">
                    <span className="text-4xl sm:text-5xl font-black text-[#0f172a] font-display">$399</span>
                    <span className="text-xs font-semibold text-[#64748b]">per return</span>
                  </div>

                  <p className="text-xs text-[#475569] font-medium mb-6">
                    Schedule C businesses, multiple rentals or K-1s, crypto, ISOs and ESPPs.
                  </p>

                  <div className="border-t border-[#f1f5f9] pt-5">
                    <ul className="space-y-3 text-xs text-[#334155]">
                      <li className="flex items-start gap-2.5 font-bold text-[#0f172a]">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>Everything in Plus</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>Schedule C with home office and vehicle</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>Up to three rentals or K-1s, with depreciation</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>Crypto, ISO exercises and ESPP sales</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>Quarterly estimated-tax plan for the year ahead</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>Year-round questions answered by your preparer</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#f1f5f9]">
                  <button
                    onClick={() => handleCta("Individual Premium Plan")}
                    className="w-full py-3 px-4 rounded-xl font-extrabold text-xs sm:text-sm bg-[#2563eb] hover:bg-[#1d4ed8] text-white flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
                  >
                    <span>Start with Premium</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Card 4: Custom */}
              <div className="bg-[#faf8f5] rounded-3xl p-6 sm:p-7 border-2 border-dashed border-[#cbd5e1] shadow-xs flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-black text-[#0f172a]">Custom</h3>
                  <p className="text-xs font-bold text-[#2563eb] mt-1">NRI, multi-state and complex returns</p>

                  <div className="my-5 flex items-baseline gap-1.5">
                    <span className="text-3xl sm:text-4xl font-black text-[#0f172a] font-display">Quote</span>
                    <span className="text-xs font-semibold text-[#64748b]">in one free call</span>
                  </div>

                  <p className="text-xs text-[#475569] font-medium mb-6">
                    Foreign income and accounts, more than one state, five or more properties, amended or prior-year returns.
                  </p>

                  <div className="border-t border-[#e2e8f0] pt-5">
                    <ul className="space-y-3 text-xs text-[#334155]">
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>India-US treaty positions, FBAR and Form 8938</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>Multi-state and part-year residency</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>Large portfolios and private investments</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>Prior-year catch-up and amended returns</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#e2e8f0]">
                  <button
                    onClick={() => handleCta("Individual Custom Quote")}
                    className="w-full py-3 px-4 rounded-xl font-extrabold text-xs sm:text-sm bg-white hover:bg-slate-100 text-[#0f172a] border border-[#cbd5e1] flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                  >
                    <span>Get a custom quote</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Row: Add-ons Table (Left) + 2 Action Cards (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Individual Add-ons Table */}
              <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-[#e2e8f0] shadow-sm">
                <h3 className="text-xl font-black text-[#0f172a] mb-5 font-display">Individual add-ons</h3>
                <div className="divide-y divide-[#f1f5f9]">
                  <div className="py-3 flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-medium text-[#334155]">Additional state return</span>
                    <span className="font-extrabold text-[#0f172a]">$50</span>
                  </div>
                  <div className="py-3 flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-medium text-[#334155]">Additional rental property or K-1</span>
                    <span className="font-extrabold text-[#0f172a]">$50 each</span>
                  </div>
                  <div className="py-3 flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-medium text-[#334155]">FBAR (FinCEN 114)</span>
                    <span className="font-extrabold text-[#0f172a]">$75</span>
                  </div>
                  <div className="py-3 flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-medium text-[#334155]">Form 8938 foreign assets</span>
                    <span className="font-extrabold text-[#0f172a]">$100</span>
                  </div>
                  <div className="py-3 flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-medium text-[#334155]">ITIN application for spouse or dependent</span>
                    <span className="font-extrabold text-[#0f172a]">$150</span>
                  </div>
                  <div className="py-3 flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-medium text-[#334155]">Amended return (1040-X)</span>
                    <span className="font-extrabold text-[#0f172a]">from $199</span>
                  </div>
                  <div className="py-3 flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-medium text-[#334155]">Extension filing</span>
                    <span className="font-extrabold text-[#16a34a]">Free with any plan</span>
                  </div>
                </div>

                <div className="mt-5 p-3.5 bg-[#eff6ff] rounded-xl border border-[#bfdbfe] text-xs text-[#1e40af] font-medium leading-relaxed">
                  Not sure which plan fits? Run the free estimator: it reads your forms and tells you which plan you need before you book.
                </div>
              </div>

              {/* Right Side Cards */}
              <div className="lg:col-span-4 space-y-6">
                {/* Estimator Card */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#e2e8f0] shadow-sm">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#2563eb] block mb-2">
                    Not sure which plan?
                  </span>
                  <h4 className="text-lg font-black text-[#0f172a] font-display mb-2">
                    Run the free tax estimator
                  </h4>
                  <p className="text-xs text-[#475569] font-medium leading-relaxed mb-5">
                    Enter your numbers and see your 2026 refund or balance due in two minutes. It also tells you which plan your forms need.
                  </p>
                  <Link
                    to="/tax-tools"
                    className="w-full py-3 px-4 rounded-xl font-extrabold text-xs sm:text-sm bg-[#2563eb] hover:bg-[#1d4ed8] text-white flex items-center justify-center gap-1.5 transition-all shadow-sm"
                  >
                    <span>Open the estimator</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Free 30-min call card */}
                <div className="bg-[#0f172a] text-white rounded-3xl p-6 sm:p-7 shadow-lg">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#93c5fd] block mb-2">
                    Prefer to talk first?
                  </span>
                  <h4 className="text-lg font-black text-white font-display mb-2">
                    Free 30-minute call with a CPA
                  </h4>
                  <p className="text-xs text-white/80 font-medium leading-relaxed mb-5">
                    Bring last year&apos;s return. We&apos;ll confirm the plan, flag anything the price should include, and quote the exact number before you commit.
                  </p>
                  <button
                    onClick={() => {
                      if (onOpenConsultation) {
                        onOpenConsultation();
                      } else {
                        navigate("/get-started?type=consultation");
                      }
                    }}
                    className="w-full py-3 px-4 rounded-xl font-extrabold text-xs sm:text-sm bg-white hover:bg-slate-100 text-[#0f172a] flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
                  >
                    <span>Book a free call</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 2: Business tax filing */}
        {activeTab === "business" && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-12"
          >
            {/* Header */}
            <div className="max-w-3xl">
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#0f172a] font-display">
                Business returns for every entity type
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#475569] font-medium leading-relaxed">
                Flat prices by entity, filed with the owner&apos;s personal return in mind. Bookkeeping clients get 15% off any business tax plan.
              </p>
            </div>

            {/* 4 Cards: Starter, Growth, Scale, Custom */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
              {/* Card 1: Starter */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#e2e8f0] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <h3 className="text-xl font-black text-[#0f172a]">Starter</h3>
                  <p className="text-xs font-bold text-[#2563eb] mt-1">Single-member LLC or sole proprietor</p>

                  <div className="my-5 flex items-baseline gap-1.5">
                    <span className="text-4xl sm:text-5xl font-black text-[#0f172a] font-display">$650</span>
                    <span className="text-xs font-semibold text-[#64748b]">per year</span>
                  </div>

                  <p className="text-xs text-[#475569] font-medium mb-6">
                    One owner, Schedule C, filed together with your personal return.
                  </p>

                  <div className="border-t border-[#f1f5f9] pt-5">
                    <ul className="space-y-3 text-xs text-[#334155]">
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>Schedule C business return with your 1040</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>One state</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>1099-NEC filing for up to 10 contractors</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>Quarterly estimated-tax schedule</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>Deduction review: home office, vehicle, health insurance</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#f1f5f9]">
                  <button
                    onClick={() => handleCta("Business Starter Plan")}
                    className="w-full py-3 px-4 rounded-xl font-extrabold text-xs sm:text-sm bg-[#2563eb] hover:bg-[#1d4ed8] text-white flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
                  >
                    <span>Start with Starter</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Card 2: Growth (MOST POPULAR) */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-[#2563eb] shadow-xl relative flex flex-col justify-between ring-4 ring-[#2563eb]/10">
                <div className="absolute -top-3.5 left-6 bg-[#2563eb] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                  Most Popular
                </div>

                <div>
                  <h3 className="text-xl font-black text-[#0f172a]">Growth</h3>
                  <p className="text-xs font-bold text-[#2563eb] mt-1">S corporation or partnership</p>

                  <div className="my-5 flex items-baseline gap-1.5">
                    <span className="text-4xl sm:text-5xl font-black text-[#0f172a] font-display">$1,250</span>
                    <span className="text-xs font-semibold text-[#64748b]">per year</span>
                  </div>

                  <p className="text-xs text-[#475569] font-medium mb-6">
                    Form 1120-S or 1065 with K-1s for up to 3 owners.
                  </p>

                  <div className="border-t border-[#f1f5f9] pt-5">
                    <ul className="space-y-3 text-xs text-[#334155]">
                      <li className="flex items-start gap-2.5 font-bold text-[#0f172a]">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>Everything in Starter</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>1120-S or 1065 return with K-1s for up to 3 owners</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>Reasonable-salary review for S corp owners</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>1099-NEC filing for up to 25 contractors</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>Basis tracking (Form 7203) and distribution review</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>Owner&apos;s personal return at a bundled price</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#f1f5f9]">
                  <button
                    onClick={() => handleCta("Business Growth Plan")}
                    className="w-full py-3 px-4 rounded-xl font-extrabold text-xs sm:text-sm bg-[#ffedd5] hover:bg-[#fed7aa] text-[#9a3412] flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
                  >
                    <span>Start with Growth</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Card 3: Scale */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#e2e8f0] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <h3 className="text-xl font-black text-[#0f172a]">Scale</h3>
                  <p className="text-xs font-bold text-[#2563eb] mt-1">C corporation or multi-entity</p>

                  <div className="my-5 flex items-baseline gap-1.5">
                    <span className="text-4xl sm:text-5xl font-black text-[#0f172a] font-display">$1,950</span>
                    <span className="text-xs font-semibold text-[#64748b]">per year</span>
                  </div>

                  <p className="text-xs text-[#475569] font-medium mb-6">
                    Form 1120, holding structures, foreign owners, multi-state operations.
                  </p>

                  <div className="border-t border-[#f1f5f9] pt-5">
                    <ul className="space-y-3 text-xs text-[#334155]">
                      <li className="flex items-start gap-2.5 font-bold text-[#0f172a]">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>Everything in Growth</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>Form 1120 with book-to-tax reconciliation</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>Delaware franchise tax and up to 3 states</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>Foreign-owner forms (5472) and related-party reporting</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>Entity-choice review each year</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#f1f5f9]">
                  <button
                    onClick={() => handleCta("Business Scale Plan")}
                    className="w-full py-3 px-4 rounded-xl font-extrabold text-xs sm:text-sm bg-[#2563eb] hover:bg-[#1d4ed8] text-white flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
                  >
                    <span>Start with Scale</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Card 4: Custom */}
              <div className="bg-[#faf8f5] rounded-3xl p-6 sm:p-7 border-2 border-dashed border-[#cbd5e1] shadow-xs flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-black text-[#0f172a]">Custom</h3>
                  <p className="text-xs font-bold text-[#2563eb] mt-1">Five or more owners, groups, foreign subsidiaries</p>

                  <div className="my-5 flex items-baseline gap-1.5">
                    <span className="text-3xl sm:text-4xl font-black text-[#0f172a] font-display">Quote</span>
                    <span className="text-xs font-semibold text-[#64748b]">in one free call</span>
                  </div>

                  <p className="text-xs text-[#475569] font-medium mb-6">
                    Consolidated groups, Form 5471 subsidiaries, multiple entities under one roof.
                  </p>

                  <div className="border-t border-[#e2e8f0] pt-5">
                    <ul className="space-y-3 text-xs text-[#334155]">
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>Multiple entities and consolidated filings</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>Foreign subsidiaries (5471) and transfer pricing</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>Sale, merger or exit planning</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>Dedicated CPA on call all year</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#e2e8f0]">
                  <button
                    onClick={() => handleCta("Business Custom Quote")}
                    className="w-full py-3 px-4 rounded-xl font-extrabold text-xs sm:text-sm bg-white hover:bg-slate-100 text-[#0f172a] border border-[#cbd5e1] flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                  >
                    <span>Get a custom quote</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Row: Business Add-ons Table + Side Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Business Add-ons Table */}
              <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-[#e2e8f0] shadow-sm">
                <h3 className="text-xl font-black text-[#0f172a] mb-5 font-display">Business add-ons</h3>
                <div className="divide-y divide-[#f1f5f9]">
                  <div className="py-3 flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-medium text-[#334155]">Additional state return</span>
                    <span className="font-extrabold text-[#0f172a]">$150</span>
                  </div>
                  <div className="py-3 flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-medium text-[#334155]">Additional owner K-1</span>
                    <span className="font-extrabold text-[#0f172a]">$75 each</span>
                  </div>
                  <div className="py-3 flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-medium text-[#334155]">Owner&apos;s personal return (bundled)</span>
                    <span className="font-extrabold text-[#2563eb]">$125 off the individual plan</span>
                  </div>
                  <div className="py-3 flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-medium text-[#334155]">Late S corp election (Form 2553 with relief)</span>
                    <span className="font-extrabold text-[#0f172a]">$350</span>
                  </div>
                  <div className="py-3 flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-medium text-[#334155]">Prior-year catch-up return</span>
                    <span className="font-extrabold text-[#0f172a]">from $500</span>
                  </div>
                  <div className="py-3 flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-medium text-[#334155]">Extension filing</span>
                    <span className="font-extrabold text-[#16a34a]">Free with any plan</span>
                  </div>
                </div>

                <div className="mt-5 p-3.5 bg-[#eff6ff] rounded-xl border border-[#bfdbfe] text-xs text-[#1e40af] font-medium leading-relaxed">
                  Behind on your books? Catch-up bookkeeping is priced per month of backlog under the Bookkeeping tab, and the return follows once the books are closed.
                </div>
              </div>

              {/* Side Cards */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#e2e8f0] shadow-sm">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#2563eb] block mb-2">
                    Not sure which plan?
                  </span>
                  <h4 className="text-lg font-black text-[#0f172a] font-display mb-2">
                    Run the free tax estimator
                  </h4>
                  <p className="text-xs text-[#475569] font-medium leading-relaxed mb-5">
                    Enter your numbers and see your 2026 refund or balance due in two minutes. It also tells you which plan your forms need.
                  </p>
                  <Link
                    to="/tax-tools"
                    className="w-full py-3 px-4 rounded-xl font-extrabold text-xs sm:text-sm bg-[#2563eb] hover:bg-[#1d4ed8] text-white flex items-center justify-center gap-1.5 transition-all shadow-sm"
                  >
                    <span>Open the estimator</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="bg-[#0f172a] text-white rounded-3xl p-6 sm:p-7 shadow-lg">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#93c5fd] block mb-2">
                    Prefer to talk first?
                  </span>
                  <h4 className="text-lg font-black text-white font-display mb-2">
                    Free 30-minute call with a CPA
                  </h4>
                  <p className="text-xs text-white/80 font-medium leading-relaxed mb-5">
                    Bring last year&apos;s return. We&apos;ll confirm the plan, flag anything the price should include, and quote the exact number before you commit.
                  </p>
                  <button
                    onClick={() => {
                      if (onOpenConsultation) {
                        onOpenConsultation();
                      } else {
                        navigate("/get-started?type=consultation");
                      }
                    }}
                    className="w-full py-3 px-4 rounded-xl font-extrabold text-xs sm:text-sm bg-white hover:bg-slate-100 text-[#0f172a] flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
                  >
                    <span>Book a free call</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 3: Bookkeeping */}
        {activeTab === "bookkeeping" && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-12"
          >
            {/* Header */}
            <div className="max-w-3xl">
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-[#0f172a] font-display">
                Books closed every month, by the team that files your return
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#475569] font-medium leading-relaxed">
                Plans scale with your monthly expenses, not with hidden hourly billing. Every plan ends the year with a tax-ready package, and the same team can file the return.
              </p>
            </div>

            {/* 4 Cards: Base, Essential, Growth, Custom */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
              {/* Card 1: Base */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#e2e8f0] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <h3 className="text-xl font-black text-[#0f172a]">Base</h3>
                  <p className="text-xs font-bold text-[#2563eb] mt-1">Up to $25,000 in monthly expenses</p>

                  <div className="my-5 flex items-baseline gap-1.5">
                    <span className="text-4xl sm:text-5xl font-black text-[#0f172a] font-display">$149</span>
                    <span className="text-xs font-semibold text-[#64748b]">per month</span>
                  </div>

                  <p className="text-xs text-[#475569] font-medium mb-6">
                    Freelancers and small businesses that want clean books and a year-end package.
                  </p>

                  <div className="border-t border-[#f1f5f9] pt-5">
                    <ul className="space-y-3 text-xs text-[#334155]">
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>Cash-basis bookkeeping from your bank and card feeds</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>Monthly reconciliation</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>Profit & loss and balance sheet every month</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>Year-end tax package for your return</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>Support by email and in the portal</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#f1f5f9]">
                  <button
                    onClick={() => handleCta("Bookkeeping Base Plan")}
                    className="w-full py-3 px-4 rounded-xl font-extrabold text-xs sm:text-sm bg-[#2563eb] hover:bg-[#1d4ed8] text-white flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
                  >
                    <span>Start with Base</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Card 2: Essential (MOST POPULAR) */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-[#2563eb] shadow-xl relative flex flex-col justify-between ring-4 ring-[#2563eb]/10">
                <div className="absolute -top-3.5 left-6 bg-[#2563eb] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                  Most Popular
                </div>

                <div>
                  <h3 className="text-xl font-black text-[#0f172a]">Essential</h3>
                  <p className="text-xs font-bold text-[#2563eb] mt-1">Up to $75,000 in monthly expenses</p>

                  <div className="my-5 flex items-baseline gap-1.5">
                    <span className="text-4xl sm:text-5xl font-black text-[#0f172a] font-display">$349</span>
                    <span className="text-xs font-semibold text-[#64748b]">per month</span>
                  </div>

                  <p className="text-xs text-[#475569] font-medium mb-6">
                    Growing businesses that need books a lender or partner will trust.
                  </p>

                  <div className="border-t border-[#f1f5f9] pt-5">
                    <ul className="space-y-3 text-xs text-[#334155]">
                      <li className="flex items-start gap-2.5 font-bold text-[#0f172a]">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>Everything in Base</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>Dedicated bookkeeper who explains your numbers</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>Cash or accrual basis, including payroll and payment platforms</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>Bill and invoice tracking</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>Reports by the 10th business day</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>Phone and email support from your team</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#f1f5f9]">
                  <button
                    onClick={() => handleCta("Bookkeeping Essential Plan")}
                    className="w-full py-3 px-4 rounded-xl font-extrabold text-xs sm:text-sm bg-[#ffedd5] hover:bg-[#fed7aa] text-[#9a3412] flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
                  >
                    <span>Start with Essential</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Card 3: Growth */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#e2e8f0] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <h3 className="text-xl font-black text-[#0f172a]">Growth</h3>
                  <p className="text-xs font-bold text-[#2563eb] mt-1">Up to $200,000 in monthly expenses</p>

                  <div className="my-5 flex items-baseline gap-1.5">
                    <span className="text-4xl sm:text-5xl font-black text-[#0f172a] font-display">$649</span>
                    <span className="text-xs font-semibold text-[#64748b]">per month</span>
                  </div>

                  <p className="text-xs text-[#475569] font-medium mb-6">
                    Businesses with staff, multiple accounts and investors to report to.
                  </p>

                  <div className="border-t border-[#f1f5f9] pt-5">
                    <ul className="space-y-3 text-xs text-[#334155]">
                      <li className="flex items-start gap-2.5 font-bold text-[#0f172a]">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>Everything in Essential</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>Payroll administration</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>Accounts payable and receivable</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>Custom reporting and department tracking</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>Quarterly review call with a CPA</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#f1f5f9]">
                  <button
                    onClick={() => handleCta("Bookkeeping Growth Plan")}
                    className="w-full py-3 px-4 rounded-xl font-extrabold text-xs sm:text-sm bg-[#2563eb] hover:bg-[#1d4ed8] text-white flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
                  >
                    <span>Start with Growth</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Card 4: Custom */}
              <div className="bg-[#faf8f5] rounded-3xl p-6 sm:p-7 border-2 border-dashed border-[#cbd5e1] shadow-xs flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-black text-[#0f172a]">Custom</h3>
                  <p className="text-xs font-bold text-[#2563eb] mt-1">Above $200,000 a month or multi-entity</p>

                  <div className="my-5 flex items-baseline gap-1.5">
                    <span className="text-3xl sm:text-4xl font-black text-[#0f172a] font-display">Quote</span>
                    <span className="text-xs font-semibold text-[#64748b]">in one free call</span>
                  </div>

                  <p className="text-xs text-[#475569] font-medium mb-6">
                    Controller and CFO-level support, inventory, multi-entity consolidation.
                  </p>

                  <div className="border-t border-[#e2e8f0] pt-5">
                    <ul className="space-y-3 text-xs text-[#334155]">
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>Controller or fractional CFO advisory</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>Multi-entity and intercompany books</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>Inventory and cost accounting</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#2563eb] shrink-0 mt-0.5" />
                        <span>Board and investor reporting</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-[#e2e8f0]">
                  <button
                    onClick={() => handleCta("Bookkeeping Custom Quote")}
                    className="w-full py-3 px-4 rounded-xl font-extrabold text-xs sm:text-sm bg-white hover:bg-slate-100 text-[#0f172a] border border-[#cbd5e1] flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                  >
                    <span>Get a custom quote</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Row: Bookkeeping Add-ons Table + Side Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Bookkeeping Add-ons Table */}
              <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-[#e2e8f0] shadow-sm">
                <h3 className="text-xl font-black text-[#0f172a] mb-5 font-display">Bookkeeping add-ons</h3>
                <div className="divide-y divide-[#f1f5f9]">
                  <div className="py-3 flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-medium text-[#334155]">Catch-up bookkeeping</span>
                    <span className="font-extrabold text-[#0f172a]">$249 per month of backlog (quote above 12 months)</span>
                  </div>
                  <div className="py-3 flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-medium text-[#334155]">QuickBooks or Xero migration and clean-up</span>
                    <span className="font-extrabold text-[#0f172a]">from $299</span>
                  </div>
                  <div className="py-3 flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-medium text-[#334155]">1099-NEC filing for contractors</span>
                    <span className="font-extrabold text-[#0f172a]">$10 per form, $50 minimum</span>
                  </div>
                  <div className="py-3 flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-medium text-[#334155]">Sales tax filing</span>
                    <span className="font-extrabold text-[#0f172a]">$75 per state per filing</span>
                  </div>
                  <div className="py-3 flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-medium text-[#334155]">Business tax return for bookkeeping clients</span>
                    <span className="font-extrabold text-[#2563eb]">15% off any business plan</span>
                  </div>
                </div>

                <div className="mt-5 p-3.5 bg-[#eff6ff] rounded-xl border border-[#bfdbfe] text-xs text-[#1e40af] font-medium leading-relaxed">
                  Prices are billed monthly; pay annually and get one month free.
                </div>
              </div>

              {/* Side Cards */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#e2e8f0] shadow-sm">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#2563eb] block mb-2">
                    Not sure which plan?
                  </span>
                  <h4 className="text-lg font-black text-[#0f172a] font-display mb-2">
                    Run the free tax estimator
                  </h4>
                  <p className="text-xs text-[#475569] font-medium leading-relaxed mb-5">
                    Enter your numbers and see your 2026 refund or balance due in two minutes. It also tells you which plan your forms need.
                  </p>
                  <Link
                    to="/tax-tools"
                    className="w-full py-3 px-4 rounded-xl font-extrabold text-xs sm:text-sm bg-[#2563eb] hover:bg-[#1d4ed8] text-white flex items-center justify-center gap-1.5 transition-all shadow-sm"
                  >
                    <span>Open the estimator</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="bg-[#0f172a] text-white rounded-3xl p-6 sm:p-7 shadow-lg">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#93c5fd] block mb-2">
                    Prefer to talk first?
                  </span>
                  <h4 className="text-lg font-black text-white font-display mb-2">
                    Free 30-minute call with a CPA
                  </h4>
                  <p className="text-xs text-white/80 font-medium leading-relaxed mb-5">
                    Bring last year&apos;s return. We&apos;ll confirm the plan, flag anything the price should include, and quote the exact number before you commit.
                  </p>
                  <button
                    onClick={() => {
                      if (onOpenConsultation) {
                        onOpenConsultation();
                      } else {
                        navigate("/get-started?type=consultation");
                      }
                    }}
                    className="w-full py-3 px-4 rounded-xl font-extrabold text-xs sm:text-sm bg-white hover:bg-slate-100 text-[#0f172a] flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
                  >
                    <span>Book a free call</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Global Footer Disclaimer from Screenshot */}
        <div className="mt-14 pt-8 border-t border-[#e2e8f0] text-center text-xs text-[#64748b] max-w-4xl mx-auto leading-relaxed">
          Prices are for the 2025 tax year (returns filed in 2026) and assume organized records. We confirm the final price in writing before starting; if your situation turns out simpler than you thought, you pay the lower plan.
        </div>
      </div>
    </div>
  );
}
