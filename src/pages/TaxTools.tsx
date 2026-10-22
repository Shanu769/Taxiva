/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { ExternalLink, ShieldCheck, Landmark, CreditCard, FileText, Map, Search, User, CheckCircle2, ArrowRight } from "lucide-react";
import TaxCalendar from "../components/TaxCalendar";

export default function TaxTools() {
  // Primary Official Portals explicitly provided and requested
  const primaryPortals = [
    {
      title: "Federal Refund Status",
      badge: "Official IRS Tool",
      desc: "Check your federal refund status 24 hours after e-filing. Have your SSN/ITIN, filing status, and exact refund amount ready.",
      link: "https://www.irs.gov/refunds",
      icon: Search,
      btn: "Check Federal Refund Status",
      featured: true
    },
    {
      title: "State Refund Status",
      badge: "All 50 States (FTA)",
      desc: "Official Federation of Tax Administrators (FTA) portal directory. Select your state revenue department to track your state income tax refund.",
      link: "https://taxadmin.org/fta-members/",
      icon: Map,
      btn: "Check State Refund Status",
      featured: true
    },
    {
      title: "Federal Payment Portal",
      badge: "IRS Direct Pay",
      desc: "Pay directly from your checking or savings bank account with zero fees and no registration required. Safe, fast, and instant confirmation.",
      link: "https://www.irs.gov/payments/direct-pay-with-bank-account",
      icon: CreditCard,
      btn: "Open Federal Payment Portal",
      featured: true
    },
    {
      title: "State Payment Portals",
      badge: "All 50 States Directory",
      desc: "Direct access to official state departments of taxation and revenue payment gateways for state tax returns and quarterly estimates.",
      link: "https://taxadmin.org/fta-members/",
      icon: Landmark,
      btn: "Open State Payment Portals",
      featured: true
    },
    {
      title: "IRS Account Setup",
      badge: "ID.me Verification",
      desc: "Create or access your official IRS Online Account to view your tax records, transcripts, prior payments, and official IRS notices.",
      link: "https://www.irs.gov/payments/online-account-for-individuals",
      icon: User,
      btn: "IRS Account Setup & Login",
      featured: true
    }
  ];

  // Secondary State & Business Tools
  const secondaryTools = [
    {
      title: "Pay by Debit or Credit Card",
      desc: "IRS approved payment processing via official third-party card payment gateways.",
      link: "https://www.irs.gov/payments/pay-your-taxes-by-debit-or-credit-card",
      icon: CreditCard,
      btn: "Pay Federal by Card"
    },
    {
      title: "IRS Business Tax Account",
      desc: "View business tax records, entity payments, and balance details directly with the IRS.",
      link: "https://www.irs.gov/businesses/business-tax-account",
      icon: Landmark,
      btn: "IRS Business Account"
    },
    {
      title: "Ohio Department of Taxation",
      desc: "Official Ohio state portal for personal income tax and commercial activity tax (CAT).",
      link: "https://www.tax.ohio.gov/",
      icon: Landmark,
      btn: "Ohio Tax Portal"
    },
    {
      title: "Pennsylvania Revenue Portal",
      desc: "Pennsylvania Department of Revenue (myPATH) for PA personal income tax filings.",
      link: "https://www.revenue.pa.gov/",
      icon: FileText,
      btn: "PA Revenue Portal"
    },
    {
      title: "Clean Vehicle Tax Credits",
      desc: "IRS requirements and eligibility guidelines for new and previously-owned EV credits.",
      link: "https://www.irs.gov/clean-vehicle-tax-credits",
      icon: Search,
      btn: "View Clean Vehicle Credits"
    },
    {
      title: "GIPS Motor Vehicle Credits",
      desc: "Access state and federal motor vehicle credit information and applications.",
      link: "https://www.getgips.com/",
      icon: CreditCard,
      btn: "Access GIPS Credits"
    }
  ];

  return (
    <div className="flex flex-col w-full bg-[#f8fafc] min-h-screen">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#eff6ff] to-[#f8fafc] py-16 sm:py-20 border-b border-[#dbeafe]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="inline-flex items-center gap-2 bg-[#dbeafe] text-[#1d4ed8] px-3.5 py-1.5 rounded-xl text-xs font-extrabold uppercase tracking-widest mb-4">
              <Landmark className="w-4 h-4" />
              <span>Official Government & State Gateways</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-[#0f172a] mb-4 font-display tracking-tight">
              Refund & Payment Center
            </h1>
            <p className="text-base sm:text-lg text-[#334155] max-w-2xl mx-auto font-medium">
              Instant, verified links to official IRS and all 50-state portals for tracking your refund, paying taxes securely, and setting up your online IRS account.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Security Banner */}
          <div className="bg-[#0f172a] rounded-3xl p-6 sm:p-8 mb-12 text-white flex flex-col md:flex-row items-center gap-6 shadow-xl border border-white/10">
            <div className="w-14 h-14 rounded-2xl bg-[#1d4ed8] text-white flex items-center justify-center shrink-0 shadow-md">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <div className="space-y-1.5 text-center md:text-left flex-1">
              <h3 className="text-lg sm:text-xl font-extrabold text-white">Client Security Safeguard</h3>
              <p className="text-white/85 text-xs sm:text-sm leading-relaxed font-medium">
                <strong>Taxiva LLC will never ask you to enter your IRS, ID.me, bank, or state login password on our website.</strong> Always use the official government links provided below to submit payments or check refund status directly.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3.5 py-2 rounded-xl text-xs font-bold text-white shrink-0">
              <CheckCircle2 className="w-4 h-4 text-[#60a5fa]" />
              <span>Official Portals Verified</span>
            </div>
          </div>

          {/* Core Official Gateways Highlight Header */}
          <div className="mb-6">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#2563eb] block mb-1">
              PRIMARY GATEWAYS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] font-display">
              Official IRS & State Action Portals
            </h2>
          </div>

          {/* Primary 5 Official Portals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {primaryPortals.map((tool) => (
              <div
                key={tool.title}
                className="p-7 bg-white rounded-3xl border-2 border-[#dbeafe] hover:border-[#1d4ed8] flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#eff6ff] text-[#1d4ed8] flex items-center justify-center group-hover:bg-[#1d4ed8] group-hover:text-white transition-colors">
                      <tool.icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider bg-[#f1f5f9] text-[#1e40af] px-3 py-1 rounded-full border border-[#dbeafe]">
                      {tool.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-[#0f172a] mb-2 font-display">{tool.title}</h3>
                  <p className="text-[#334155]/90 text-sm leading-relaxed mb-6 font-medium">{tool.desc}</p>
                </div>

                <a
                  href={tool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#1d4ed8] text-white hover:bg-[#1e40af] py-3.5 px-4 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer"
                >
                  <span>{tool.btn}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>

          {/* All 50 States Tax Agency Directory Banner */}
          <div className="mb-16 p-8 sm:p-12 bg-white rounded-3xl border-2 border-[#dbeafe] shadow-md flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-[#eff6ff] text-[#1d4ed8] px-3 py-1 rounded-lg text-xs font-extrabold uppercase tracking-wider">
                <Map className="w-4 h-4" />
                <span>50-State Comprehensive Directory</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] font-display">
                State Refund Status & State Payment Portals
              </h3>
              <p className="text-[#334155] text-sm sm:text-base leading-relaxed font-medium">
                Looking for your state's official tax portal? Access the official directory maintained by the Federation of Tax Administrators (FTA) covering tax agencies across all 50 U.S. states.
              </p>
            </div>
            <a
              href="https://taxadmin.org/fta-members/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#0f172a] hover:bg-[#1d4ed8] text-white rounded-2xl font-extrabold text-base shadow-xl active:scale-95 transition-all inline-flex items-center gap-3 shrink-0"
            >
              <span>Open FTA State Directory</span>
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>

          {/* Secondary Tools Section */}
          <div className="mb-6">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#2563eb] block mb-1">
              ADDITIONAL SERVICES
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] font-display">
              Business & Regional Portals
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {secondaryTools.map((tool) => (
              <div
                key={tool.title}
                className="p-6 bg-white rounded-2xl border border-[#dbeafe] hover:border-[#1d4ed8] flex flex-col justify-between shadow-2xs hover:shadow-md transition-all group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#eff6ff] text-[#1d4ed8] flex items-center justify-center mb-4">
                    <tool.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-extrabold text-[#0f172a] mb-2 font-display">{tool.title}</h3>
                  <p className="text-[#334155] text-xs sm:text-sm leading-relaxed mb-6 font-medium">{tool.desc}</p>
                </div>

                <a
                  href={tool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#f8fafc] hover:bg-[#eff6ff] text-[#0f172a] hover:text-[#1d4ed8] border border-[#dbeafe] py-2.5 px-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-98"
                >
                  <span>{tool.btn}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>

          {/* Tax Calendar Component at the Bottom */}
          <div className="pt-12 border-t border-[#dbeafe]">
            <TaxCalendar defaultProfile="Individual" />
          </div>
        </div>
      </section>
    </div>
  );
}
