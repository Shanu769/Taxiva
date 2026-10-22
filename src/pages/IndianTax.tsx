/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import {
  Landmark,
  FileCheck,
  Globe,
  CreditCard,
  PieChart,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  DollarSign,
  TrendingUp,
  FileText
} from "lucide-react";
import TaxFilingArtwork from "../components/TaxFilingArtwork";

const nriServices = [
  {
    title: "Indian IT Return (ITR-2 / ITR-3)",
    desc: "Line-by-line CPA & CA preparation of Indian income tax returns for Non-Resident Indians with property, capital gains, or business income.",
    badge: "ITR Filing",
    icon: FileCheck
  },
  {
    title: "Capital Gains & Property Sales",
    desc: "Complete repatriation coordination, Section 54/54EC exemptions, TDS reduction (Form 13), and Form 15CA/15CB certification.",
    badge: "Property & Stocks",
    icon: PieChart
  },
  {
    title: "US–India DTAA & Foreign Tax Credits",
    desc: "Maximize U.S. Form 1116 foreign tax credits to ensure you never pay duplicate taxes on Indian salary, interest, dividends, or capital gains.",
    badge: "Article 25 DTAA",
    icon: CreditCard
  },
  {
    title: "NRE / NRO Bank Accounts",
    desc: "Strict compliance with IRS and FinCEN disclosure rules for overseas interest, NRE tax exemptions, and NRO deposit reporting.",
    badge: "Bank Compliance",
    icon: Landmark
  },
  {
    title: "Rental Property Income",
    desc: "Comprehensive dual-country expense deductions, depreciation schedules, and municipal tax write-offs for property located in India.",
    badge: "Schedule E & ITR",
    icon: Landmark
  },
  {
    title: "FBAR & FATCA Disclosure",
    desc: "FinCEN Form 114 and Form 8938 reporting for PF, PPF, Indian mutual funds, life insurance policies, and domestic equity holdings.",
    badge: "FinCEN 114",
    icon: Globe
  },
];

const complianceChecklist = [
  "US–India Double Taxation Avoidance Agreement (DTAA) relief optimization",
  "U.S. Form 1116 Foreign Tax Credit preparation and carryforward tracking",
  "Indian ITR-2 or ITR-3 preparation by certified Chartered Accountants",
  "NRE, NRO, and FCNR bank account interest reconciliation",
  "FinCEN 114 (FBAR) and FATCA Form 8938 multi-currency valuation",
  "Property sale repatriation with Form 15CA & 15CB CPA/CA certification"
];

export default function IndianTax() {
  const [selectedPill, setSelectedPill] = useState<string>("All");

  return (
    <div className="flex flex-col w-full bg-white text-[#0f172a] overflow-hidden">
      {/* Hero Section with Fluid Motion Entrance */}
      <section className="bg-slate-950 py-20 lg:py-24 text-white border-b border-slate-800 relative overflow-hidden">
        {/* Ambient subtle glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="lg:col-span-6"
            >
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-amber-400 bg-amber-950/70 border border-amber-800/80 px-3.5 py-1.5 rounded-xl mb-4 backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>US–India DTAA • Form 1116 • Indian ITR-2 / ITR-3</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-bold mb-6 font-display tracking-tight leading-[1.1]">
                Indian Tax & <span className="text-amber-400 italic">NRI Services</span>
              </h1>

              <p className="text-lg sm:text-xl text-blue-100 leading-relaxed mb-8 font-normal">
                Taxiva LLC provides synchronized cross-border tax preparation and DTAA advisory for NRIs, H-1B/L-1 visa holders, and U.S. residents with income or assets in both the United States and India.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/get-started"
                  className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 px-7 py-3.5 rounded-xl font-extrabold text-base hover:bg-amber-300 transition-all shadow-lg active:scale-95"
                >
                  <span>Start Your NRI Tax Filing</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  to="/pricing"
                  className="inline-flex items-center gap-2 bg-slate-900 text-white border border-slate-700 hover:border-slate-500 px-6 py-3.5 rounded-xl font-bold text-base transition-all"
                >
                  <span>View Flat Pricing</span>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-6"
            >
              <div className="rounded-3xl overflow-hidden border border-slate-700 shadow-2xl aspect-[16/10] group">
                <TaxFilingArtwork
                  variant="nri-dtaa-1116"
                  alt="Indian Tax and NRI US-India DTAA Tax Advisory Visual"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Animated Practice Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <span className="text-xs font-black uppercase tracking-widest text-[#1d4ed8] bg-[#eff6ff] px-3.5 py-1.5 rounded-full border border-[#dbeafe] mb-3 inline-block">
              Integrated Dual-Country Filing
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0f172a] mb-4 font-display">
              Cross-Border Tax Expertise & Protection
            </h2>
            <p className="text-[#475569] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Managing taxes across two different legal frameworks is challenging. We bridge the IRS code and the Indian Income Tax Act to eliminate double taxation and ensure 100% compliance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {nriServices.map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="p-8 bg-[#f8fafc] rounded-3xl border border-[#dbeafe] hover:border-[#1d4ed8] hover:bg-white hover:shadow-2xl transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 bg-white border border-[#dbeafe] rounded-2xl shadow-xs flex items-center justify-center text-[#1d4ed8] group-hover:bg-[#1d4ed8] group-hover:text-white transition-all group-hover:rotate-6">
                      <service.icon className="w-7 h-7" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#1d4ed8] bg-[#eff6ff] px-2.5 py-1 rounded-lg border border-[#bfdbfe]">
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-[#0f172a] mb-3 group-hover:text-[#1d4ed8] transition-colors font-display">
                    {service.title}
                  </h3>
                  <p className="text-[#475569] text-sm leading-relaxed mb-6 font-medium">
                    {service.desc}
                  </p>
                </div>

                <Link
                  to="/get-started"
                  className="inline-flex items-center gap-1.5 text-xs font-black text-[#1d4ed8] group-hover:gap-2.5 transition-all pt-4 border-t border-slate-200/60"
                >
                  <span>Consult with NRI Specialist</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Checklist Feature Strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 p-8 sm:p-12 rounded-3xl bg-[#eff6ff] border border-[#bfdbfe] shadow-sm"
          >
            <div className="max-w-3xl mb-8">
              <span className="text-xs font-black uppercase tracking-wider text-[#1d4ed8] block mb-2">
                Audit Checklist
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#0f172a] font-display">
                What Taxiva LLC Covers for Every Cross-Border Filer
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {complianceChecklist.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3.5 bg-white rounded-2xl border border-[#dbeafe]">
                  <CheckCircle2 className="w-5 h-5 text-[#1d4ed8] shrink-0 mt-0.5" />
                  <span className="text-sm font-bold text-[#0f172a] leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Bottom CTA Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 bg-gradient-to-r from-[#0f172a] via-[#1e3a8a] to-[#1d4ed8] rounded-3xl p-8 lg:p-12 border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-8 text-white shadow-xl"
          >
            <div className="max-w-xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider text-sky-300 mb-3">
                <ShieldCheck className="w-4 h-4" />
                <span>Dedicated Cross-Border Desk</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black mb-3 font-display">
                Ready to optimize your dual-country tax position?
              </h3>
              <p className="text-white/85 leading-relaxed text-sm font-medium">
                Our licensed CPAs and Chartered Accountants coordinate directly to claim all allowable Foreign Tax Credits and avoid IRS penalties.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                to="/get-started"
                className="bg-amber-400 text-slate-950 hover:bg-amber-300 min-w-[200px] text-center px-8 py-4 rounded-xl font-black text-sm shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Connect with NRI Experts</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
