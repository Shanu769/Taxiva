/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Globe2,
  Briefcase,
  Landmark,
  History,
  UploadCloud,
  Mail,
  FileText,
  Award,
  ChevronDown,
  MessageCircle,
  Sparkles,
  Users,
  Building2,
  Lock,
  Clock,
  Receipt,
  BadgeCheck,
  BarChart3,
  TrendingUp,
  Check
} from "lucide-react";
import { FAQ_DATA } from "../components/FAQ";
import LogoAnimation from "../components/LogoAnimation";

const coreServices = [
  {
    title: "Individual Tax Filing",
    subtitle: "Form 1040 • W-2 & 1099 • RSUs",
    desc: "Line-by-line CPA preparation of federal and 50-state returns, stock compensation (RSU/ESPP) cost-basis reconciliation, Schedule C, and Schedule E rentals.",
    forms: ["Form 1040", "Sch D / 8949", "50 States"],
    link: "/services/individual",
    icon: ShieldCheck,
    visualType: "individual"
  },
  {
    title: "Business Tax Filing",
    subtitle: "NY Formation • LLC • S-Corp (1120-S)",
    desc: "New York (NY) main company formation, multi-state entity registration, corporate & partnership returns (1120-S, 1065, 1120), Schedule K-1s, and QBI optimization.",
    forms: ["Form 1120-S", "Form 1065", "NY Formation"],
    link: "/services/business",
    icon: Briefcase,
    visualType: "business"
  },
  {
    title: "FBAR & Foreign Reporting",
    subtitle: "FinCEN 114 • FATCA Form 8938",
    desc: "Full international bank and financial account disclosure using official U.S. Treasury exchange rates to keep your overseas accounts 100% penalty-free.",
    forms: ["FinCEN 114", "Form 8938", "Form 8621"],
    link: "/services/foreign-reporting",
    icon: Globe2,
    visualType: "fbar"
  },
  {
    title: "Indian Tax & NRI Services",
    subtitle: "Indian ITR • DTAA • Form 1116",
    desc: "Cross-border tax advisory for NRIs, H-1B/L-1 visa holders, and U.S. residents with Indian income—claiming Foreign Tax Credits and avoiding double taxation.",
    forms: ["Form 1116", "Indian ITR", "DTAA Relief"],
    link: "/services/indian-tax",
    icon: Landmark,
    visualType: "nri"
  }
];

export default function Home() {
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>("faq-1");

  const toggleFaq = (id: string) => {
    setExpandedFaqId(expandedFaqId === id ? null : id);
  };

  return (
    <div className="flex flex-col w-full bg-white text-[#0f172a]">
      {/* Compact, Balanced Hero Section — Slightly Increased Height for Full Capitol Dome Visibility */}
      <section className="relative py-14 lg:py-20 min-h-[480px] lg:min-h-[540px] flex items-center overflow-hidden bg-[#0f172a] text-white border-b border-white/15">
        {/* Background Image Layer: Cropped left margin so the US Federal Government Building fills 100% edge-to-edge without any blank strip */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#0f172a]">
          <img
            src="/assets/aistudio/image_3d9fe68f.png"
            alt="U.S. Federal Government Capitol Building"
            className="w-[114%] max-w-none -ml-[14%] h-full object-cover object-right opacity-65"
          />
          {/* 40% Navy & Blue Color Overlay so 60% of the US Federal Government Building shines through */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(15, 23, 42, 0.72) 0%, rgba(29, 78, 216, 0.45) 55%, rgba(15, 23, 42, 0.48) 100%)"
            }}
          />
        </div>

        <div className="max-w-[1380px] w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column — Balanced Height & Width */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="lg:col-span-7 bg-[#0f172a]/50 backdrop-blur-[3px] p-7 sm:p-9 rounded-3xl border border-white/25 shadow-2xl"
            >
              <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 px-3.5 py-1.5 rounded-lg text-white text-[11px] font-extrabold uppercase tracking-widest mb-4">
                <ShieldCheck className="w-4 h-4 text-white shrink-0" />
                <span>TAXIVA LLC • New York, NY (EST) • IRS Registered Tax Preparers</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-[2.85rem] font-extrabold tracking-tight text-white mb-6 leading-[1.1] font-display drop-shadow-md">
                Maximize Your Tax Refund & File with{" "}
                <span className="italic underline decoration-white/60 underline-offset-8">
                  100% IRS Confidence.
                </span>
              </h1>

              {/* Key Tax Highlights Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-6">
                <div className="bg-[#0f172a]/75 border border-white/25 rounded-xl px-3.5 py-2.5 flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                  <div>
                    <p className="text-xs font-extrabold text-white">Every Deduction Found</p>
                    <p className="text-[10px] text-white/85">W-2, 1099, RSU & Rental</p>
                  </div>
                </div>
                <div className="bg-[#0f172a]/75 border border-white/25 rounded-xl px-3.5 py-2.5 flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                  <div>
                    <p className="text-xs font-extrabold text-white">NY Entity & Business</p>
                    <p className="text-[10px] text-white/85">1120-S, 1065, 1120 & LLC</p>
                  </div>
                </div>
                <div className="bg-[#0f172a]/75 border border-white/25 rounded-xl px-3.5 py-2.5 flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-white shrink-0" />
                  <div>
                    <p className="text-xs font-extrabold text-white">FBAR & NRI Experts</p>
                    <p className="text-[10px] text-white/85">FinCEN 114 & DTAA Relief</p>
                  </div>
                </div>
              </div>

              {/* Primary CTAs — Side-by-Side on 1 Row */}
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/get-started"
                  className="bg-white text-[#0f172a] px-6 py-3.5 rounded-xl font-extrabold text-sm sm:text-base hover:bg-[#eff6ff] transition-all shadow-xl active:scale-95 inline-flex items-center gap-2"
                >
                  <span>Get in touch</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/login"
                  className="bg-[#0f172a]/85 text-white px-5 py-3.5 rounded-xl font-bold text-sm sm:text-base border border-white/35 hover:bg-[#1d4ed8] transition-all active:scale-95 inline-flex items-center gap-2"
                >
                  <UploadCloud className="w-4 h-4 text-white" />
                  <span>Upload Docs (Canopy Portal)</span>
                </Link>
              </div>

              <div className="mt-5 pt-4 border-t border-white/25 flex flex-wrap items-center gap-4 text-xs font-bold text-white">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  <span>New York, NY Head Office (EST)</span>
                </div>
                <div className="hidden sm:block w-px h-3.5 bg-white/30" />
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  <span>NY Main Company Formation & 50 States</span>
                </div>
                <div className="hidden sm:block w-px h-3.5 bg-white/30" />
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  <span>Free 3-Year Prior Return Check</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column — Transparent 3D Motion Hub with Central "T" Emblem & 4 Floating 3D Cards */}
            <div className="lg:col-span-5 relative min-h-[400px] sm:min-h-[430px] flex items-center justify-center [perspective:1200px] select-none">
              {/* Transparent 3D Orbital Rings & Dashed Connector Lines */}
              <motion.div
                animate={{ rotateZ: [0, 360] }}
                transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
                className="absolute w-64 h-64 sm:w-72 sm:h-72 rounded-full border border-white/20 bg-white/[0.03] backdrop-blur-[1px] flex items-center justify-center pointer-events-none"
              >
                <div className="w-44 h-44 sm:w-48 sm:h-48 rounded-full border border-dashed border-white/30 bg-white/[0.04]" />
              </motion.div>

              {/* SVG Dashed Connector Lines from Center "T" to the 4 Floating 3D Cards */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-0"
                viewBox="0 0 400 380"
                fill="none"
              >
                <line
                  x1="200"
                  y1="190"
                  x2="95"
                  y2="78"
                  stroke="rgba(255,255,255,0.45)"
                  strokeWidth="1.75"
                  strokeDasharray="5 5"
                />
                <line
                  x1="200"
                  y1="190"
                  x2="305"
                  y2="72"
                  stroke="rgba(255,255,255,0.45)"
                  strokeWidth="1.75"
                  strokeDasharray="5 5"
                />
                <line
                  x1="200"
                  y1="190"
                  x2="95"
                  y2="302"
                  stroke="rgba(255,255,255,0.45)"
                  strokeWidth="1.75"
                  strokeDasharray="5 5"
                />
                <line
                  x1="200"
                  y1="190"
                  x2="305"
                  y2="305"
                  stroke="rgba(255,255,255,0.45)"
                  strokeWidth="1.75"
                  strokeDasharray="5 5"
                />
              </svg>

              {/* Stylized 3D Transparent "T" Animation Component */}
              <LogoAnimation size="lg" variant="hero" className="relative z-20" />

              {/* Top-Left 3D Floating Card: Tax filing */}
              <motion.div
                animate={{
                  y: [0, -8, 0],
                  rotateX: [4, -3, 4],
                  rotateY: [6, -4, 6]
                }}
                transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.05, translateZ: 20 }}
                className="absolute top-3 left-0 sm:left-2 z-20 w-[168px] sm:w-[190px] bg-white/95 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 shadow-[0_18px_35px_rgba(15,23,42,0.42),0_4px_0_rgba(219,234,254,0.9)] border border-white"
              >
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#10b981] text-white flex items-center justify-center shadow-md border-2 border-white">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#2563eb] text-white flex items-center justify-center shrink-0 shadow-inner">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-extrabold text-[#0f172a] leading-tight">
                      Tax filing
                    </p>
                    <p className="text-[11px] font-semibold text-[#475569] mt-0.5">
                      Federal + state
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Top-Right 3D Floating Card: Payroll */}
              <motion.div
                animate={{
                  y: [0, 8, 0],
                  rotateX: [-4, 4, -4],
                  rotateY: [-6, 4, -6]
                }}
                transition={{ duration: 5.1, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                whileHover={{ scale: 1.05, translateZ: 20 }}
                className="absolute top-1 right-0 sm:right-2 z-20 w-[168px] sm:w-[190px] bg-white/95 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 shadow-[0_18px_35px_rgba(15,23,42,0.42),0_4px_0_rgba(219,234,254,0.9)] border border-white"
              >
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#10b981] text-white flex items-center justify-center shadow-md border-2 border-white">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#ffedd5] text-[#0f172a] flex items-center justify-center shrink-0 shadow-inner">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-extrabold text-[#0f172a] leading-tight">
                      Payroll
                    </p>
                    <p className="text-[11px] font-semibold text-[#475569] mt-0.5">
                      Never miss a 941
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Bottom-Left 3D Floating Card: Tax planning */}
              <motion.div
                animate={{
                  y: [0, 7, 0],
                  rotateX: [3, -4, 3],
                  rotateY: [5, -5, 5]
                }}
                transition={{ duration: 4.9, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                whileHover={{ scale: 1.05, translateZ: 20 }}
                className="absolute bottom-3 left-0 sm:left-2 z-20 w-[168px] sm:w-[190px] bg-white/95 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 shadow-[0_18px_35px_rgba(15,23,42,0.42),0_4px_0_rgba(219,234,254,0.9)] border border-white"
              >
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#10b981] text-white flex items-center justify-center shadow-md border-2 border-white">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#dbeafe] text-[#0f172a] flex items-center justify-center shrink-0 shadow-inner">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-extrabold text-[#0f172a] leading-tight">
                      Tax planning
                    </p>
                    <p className="text-[11px] font-semibold text-[#475569] mt-0.5">
                      A smaller April
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Bottom-Right 3D Floating Card: Bookkeeping */}
              <motion.div
                animate={{
                  y: [0, -7, 0],
                  rotateX: [-3, 5, -3],
                  rotateY: [-5, 5, -5]
                }}
                transition={{ duration: 5.3, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
                whileHover={{ scale: 1.05, translateZ: 20 }}
                className="absolute bottom-2 right-0 sm:right-2 z-20 w-[168px] sm:w-[190px] bg-white/95 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 shadow-[0_18px_35px_rgba(15,23,42,0.42),0_4px_0_rgba(219,234,254,0.9)] border border-white"
              >
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#10b981] text-white flex items-center justify-center shadow-md border-2 border-white">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#d1fae5] text-[#0f172a] flex items-center justify-center shrink-0 shadow-inner">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-extrabold text-[#0f172a] leading-tight">
                      Bookkeeping
                    </p>
                    <p className="text-[11px] font-semibold text-[#475569] mt-0.5">
                      Closed monthly
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Trust Strip — Directly Below Hero Area */}
      <section
        aria-label="Security & Trust"
        className="py-6 sm:py-7 bg-[#f8fafc] border-b border-[#dbeafe]"
      >
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            {/* Section Title Pill & Subtext */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-10 h-10 rounded-xl bg-[#0f172a] text-white flex items-center justify-center shadow-sm shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#60a5fa]" />
              </div>
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#1d4ed8] block leading-none">
                  Security & Trust
                </span>
                <p className="text-sm sm:text-base font-extrabold text-[#0f172a] font-display mt-0.5">
                  Verified Compliance & Client Protection
                </p>
              </div>
            </div>

            {/* 3 Core Trust Badges: IRS Authorized, Bank-Level Encryption, Data Privacy Guaranteed */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 flex-1 lg:max-w-4xl">
              {/* Badge 1: IRS Authorized */}
              <div className="bg-white border border-[#dbeafe] hover:border-[#1d4ed8] rounded-2xl px-4 py-3 flex items-center gap-3.5 shadow-2xs transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#eff6ff] text-[#1d4ed8] border border-[#bfdbfe] flex items-center justify-center shrink-0">
                  <BadgeCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs sm:text-sm font-extrabold text-[#0f172a] leading-tight">
                      IRS Authorized
                    </h3>
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                  </div>
                  <p className="text-[11px] font-medium text-[#334155] mt-0.5">
                    Official E-File Provider & PTIN Verified
                  </p>
                </div>
              </div>

              {/* Badge 2: Bank-Level Encryption */}
              <div className="bg-white border border-[#dbeafe] hover:border-[#1d4ed8] rounded-2xl px-4 py-3 flex items-center gap-3.5 shadow-2xs transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#eff6ff] text-[#1d4ed8] border border-[#bfdbfe] flex items-center justify-center shrink-0">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs sm:text-sm font-extrabold text-[#0f172a] leading-tight">
                      Bank-Level Encryption
                    </h3>
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                  </div>
                  <p className="text-[11px] font-medium text-[#334155] mt-0.5">
                    256-Bit AES & SOC 2 Canopy Portal
                  </p>
                </div>
              </div>

              {/* Badge 3: Data Privacy Guaranteed */}
              <div className="bg-white border border-[#dbeafe] hover:border-[#1d4ed8] rounded-2xl px-4 py-3 flex items-center gap-3.5 shadow-2xs transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#eff6ff] text-[#1d4ed8] border border-[#bfdbfe] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs sm:text-sm font-extrabold text-[#0f172a] leading-tight">
                      Data Privacy Guaranteed
                    </h3>
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                  </div>
                  <p className="text-[11px] font-medium text-[#334155] mt-0.5">
                    Strict IRS Sec. 7216 Non-Disclosure
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core 4 Tax Services — ALL 4 IN ONE SINGLE CLEAN ROW (lg:grid-cols-4) */}
      <section className="py-14 bg-white">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-9 gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 text-[#1d4ed8] font-extrabold uppercase tracking-widest text-xs mb-3 bg-[#eff6ff] px-3.5 py-1.5 rounded-lg border border-[#dbeafe]">
                <FileText className="w-4 h-4 text-[#1d4ed8]" />
                <span>Specialized Tax Preparation & NY Entity Advisory</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-[#0f172a] tracking-tight font-display leading-tight">
                Complete Tax Filing Solutions Built for Your Exact Profile
              </h2>
            </div>
            <p className="text-[#334155]/85 max-w-md text-sm sm:text-base leading-relaxed font-medium">
              Every return is prepared and reviewed by experienced tax professionals covering U.S. individual, NY & 50-state corporate, FBAR, and Indian NRI compliance.
            </p>
          </div>

          {/* 4 Cards in ONE Single Row on Desktop (lg:grid-cols-4) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
            {coreServices.map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.07 }}
                className="rounded-3xl bg-[#f8fafc] border border-[#dbeafe] overflow-hidden hover:border-[#1d4ed8] hover:bg-white hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div className="relative h-40 bg-[#0f172a] overflow-hidden border-b border-[#dbeafe]">
                  {service.visualType === "individual" && (
                    <img
                      src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=700"
                      alt="Individual Federal and State Form 1040 Tax Return Filing"
                      className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  {service.visualType === "business" && (
                    <img
                      src="https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&q=80&w=700"
                      alt="Business Tax Filing LLC S-Corp Form 1120-S and NY Company Formation"
                      className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  {service.visualType === "fbar" && (
                    <img
                      src="https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=700"
                      alt="FBAR FinCEN Form 114 and FATCA Form 8938 Foreign Account Reporting"
                      className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  {service.visualType === "nri" && (
                    <img
                      src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=700"
                      alt="Indian Tax and NRI Cross-Border DTAA Tax Advisory"
                      className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/65 to-[#0f172a]/20" />

                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-white text-[#1d4ed8] flex items-center justify-center shadow-md">
                      <service.icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold bg-[#0f172a]/90 text-white border border-white/20 px-2 py-0.5 rounded-md">
                      {service.forms[0]}
                    </span>
                  </div>

                  <div className="absolute bottom-3.5 left-4 right-4">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-white/80 mb-0.5">
                      {service.subtitle}
                    </p>
                    <h3 className="text-lg font-extrabold text-white tracking-tight leading-snug">
                      {service.title}
                    </h3>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-[#334155]/90 leading-relaxed text-xs sm:text-sm mb-4 font-medium">
                      {service.desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {service.forms.map((form) => (
                        <span
                          key={form}
                          className="text-[10px] font-mono font-bold bg-[#eff6ff] text-[#1d4ed8] px-2 py-0.5 rounded-md"
                        >
                          {form}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3.5 border-t border-[#dbeafe] flex items-center justify-between gap-2">
                    <Link
                      to={service.link}
                      className="inline-flex items-center gap-1.5 text-[#1d4ed8] font-extrabold text-xs hover:gap-2 transition-all"
                    >
                      <span>Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <Link
                      to="/get-started"
                      className="px-3.5 py-2 bg-[#1d4ed8] text-white rounded-xl text-xs font-extrabold hover:bg-[#1e40af] transition-all"
                    >
                      Get in touch
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* "WHY TAXIVA LLC — The care of a family accountant, at a flat price" (Matching Reference Image image_ee9170ca.png) */}
      <section className="py-16 bg-[#f8fafc] border-t border-[#dbeafe]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Headline, Description & Meet the Team CTA */}
            <div className="lg:col-span-5 space-y-5">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#2563eb] block">
                WHY TAXIVA LLC
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0f172a] tracking-tight leading-[1.08] font-display">
                The care of a family accountant, at a flat price
              </h2>
              <p className="text-base sm:text-lg text-[#334155]/90 leading-relaxed font-medium">
                We started because software kept missing money and big firms kept missing calls. Licensed people, upfront pricing, and a portal you can actually reach us through.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2.5 bg-white hover:bg-[#eff6ff] text-[#0f172a] border-2 border-[#bfdbfe] px-6 py-3.5 rounded-full font-extrabold text-sm transition-all shadow-xs"
                >
                  <span>Meet the team</span>
                  <ArrowRight className="w-4 h-4 text-[#1d4ed8]" />
                </Link>
                <Link
                  to="/get-started"
                  className="inline-flex items-center gap-2 bg-[#0f172a] hover:bg-[#1d4ed8] text-white px-6 py-3.5 rounded-full font-extrabold text-sm transition-all shadow-sm"
                >
                  <span>Get in touch</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Column: 2x2 Grid of 4 Value Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="bg-[#eff6ff]/70 border border-[#dbeafe] rounded-3xl p-6 sm:p-7 space-y-3 hover:bg-white hover:shadow-md transition-all">
                <div className="w-11 h-11 rounded-2xl bg-[#1d4ed8] text-white flex items-center justify-center shadow-sm">
                  <BadgeCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-[#0f172a] font-display">
                  Licensed, not just 'experts'
                </h3>
                <p className="text-sm text-[#334155]/90 leading-relaxed font-medium">
                  Every return is prepared by a CPA or IRS Enrolled Agent whose license is on the line with each filing. Not a seasonal hire, not software alone.
                </p>
              </div>

              <div className="bg-[#eff6ff]/70 border border-[#dbeafe] rounded-3xl p-6 sm:p-7 space-y-3 hover:bg-white hover:shadow-md transition-all">
                <div className="w-11 h-11 rounded-2xl bg-[#1d4ed8] text-white flex items-center justify-center shadow-sm">
                  <Receipt className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-[#0f172a] font-display">
                  One flat price, quoted first
                </h3>
                <p className="text-sm text-[#334155]/90 leading-relaxed font-medium">
                  You know the fee before we start. No hourly meters, no surprise add-ons for 'complexity' discovered halfway through.
                </p>
              </div>

              <div className="bg-[#eff6ff]/70 border border-[#dbeafe] rounded-3xl p-6 sm:p-7 space-y-3 hover:bg-white hover:shadow-md transition-all">
                <div className="w-11 h-11 rounded-2xl bg-[#1d4ed8] text-white flex items-center justify-center shadow-sm">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-[#0f172a] font-display">
                  IRS letters, handled with you
                </h3>
                <p className="text-sm text-[#334155]/90 leading-relaxed font-medium">
                  If the IRS or a state writes about a return we filed, we read the notice with you and tell you exactly what to do next. That guidance is part of the service.
                </p>
              </div>

              <div className="bg-[#eff6ff]/70 border border-[#dbeafe] rounded-3xl p-6 sm:p-7 space-y-3 hover:bg-white hover:shadow-md transition-all">
                <div className="w-11 h-11 rounded-2xl bg-[#1d4ed8] text-white flex items-center justify-center shadow-sm">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-[#0f172a] font-display">
                  Year-round, not just April
                </h3>
                <p className="text-sm text-[#334155]/90 leading-relaxed font-medium">
                  Quarterly estimates, NY company formation, multi-state filings, and mid-year planning. The same team that files your return is there in July.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OPTIMIZED & BALANCED "Ready for your free tax draft?" Section */}
      <section className="py-10 bg-white border-y border-[#dbeafe]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#f8fafc] rounded-3xl border border-[#dbeafe] shadow-sm p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-center">
              <div className="lg:col-span-7 space-y-3.5">
                <div className="inline-flex items-center gap-2 bg-[#eff6ff] text-[#1d4ed8] px-3 py-1 rounded-lg text-[11px] font-extrabold uppercase tracking-widest border border-[#dbeafe]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>One Platform • Every Regulation • 24–48 Hr Free Tax Draft</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight font-display leading-tight">
                  Ready for your free tax draft?
                </h2>

                <p className="text-xs sm:text-sm text-[#334155]/90 leading-relaxed font-medium">
                  Sign up in minutes and upload your tax documents from your phone or computer via our encrypted Canopy portal. Our licensed CPA & EA team delivers a complete line-by-line draft return within 24–48 hours* before you pay or e-file.
                </p>

                {/* Compact 3-Step Strip */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                  <div className="bg-white border border-[#dbeafe] px-3 py-2 rounded-xl">
                    <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#2563eb]">Step 1</p>
                    <p className="text-xs font-extrabold text-[#0f172a]">Free Sign Up</p>
                  </div>
                  <div className="bg-white border border-[#dbeafe] px-3 py-2 rounded-xl">
                    <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#2563eb]">Step 2</p>
                    <p className="text-xs font-extrabold text-[#0f172a]">Upload Tax Docs</p>
                  </div>
                  <div className="bg-white border border-[#dbeafe] px-3 py-2 rounded-xl">
                    <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#2563eb]">Step 3</p>
                    <p className="text-xs font-extrabold text-[#0f172a]">Review Free Draft</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-1.5">
                  <Link
                    to="/get-started"
                    className="bg-[#1d4ed8] hover:bg-[#1e40af] text-white px-5 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm shadow-md transition-all active:scale-95 inline-flex items-center gap-2"
                  >
                    <span>Get in touch</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    to="/pricing"
                    className="bg-white hover:bg-[#eff6ff] text-[#0f172a] border border-[#bfdbfe] px-4 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all"
                  >
                    See all our services
                  </Link>
                </div>

                <p className="text-xs text-[#334155] font-medium pt-0.5">
                  New York HQ: <strong className="text-[#0f172a] font-extrabold">+1 737-381-2330</strong> •{" "}
                  <strong className="text-[#0f172a] font-extrabold">info@taxiva.co</strong> • Mon – Sat, 9:00 AM – 7:00 PM EST
                </p>
              </div>

              {/* Right Column: Compact Balanced Multitasking CPA / Regulation Visual */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl overflow-hidden shadow-md border border-[#bfdbfe] bg-[#0f172a] relative">
                  <img
                    src="/assets/aistudio/image_a62c31cf.png"
                    alt="TAXIVA LLC — One Platform, Every Regulation, Instant Answers"
                    className="w-full h-56 sm:h-60 object-cover object-top"
                  />
                  <div className="absolute top-2.5 right-2.5 bg-[#0f172a] text-white border border-white/25 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider shadow-md">
                    TAXIVA LLC • CPA & CA
                  </div>
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-white/95 backdrop-blur-md p-2.5 rounded-xl border border-[#dbeafe] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#1d4ed8] text-white flex items-center justify-center font-black shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="text-xs font-extrabold text-[#0f172a]">One Platform • Every Tax Regulation</p>
                        <p className="text-[10px] text-[#334155] font-semibold">
                          U.S. IRS Code, 50 States, NY Formation & US–India DTAA
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* "NEED HELP NOW? Two common paths — start in minutes" */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#2563eb] block mb-2">
              NEED HELP NOW?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight font-display mb-2.5">
              Two common paths — start in minutes
            </h2>
            <p className="text-sm sm:text-base text-[#334155]/85 font-medium">
              Whether the IRS sent a letter or you need an ITIN / FBAR filing, here's where to go next.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Path 1: Received an IRS notice? */}
            <div className="bg-[#f8fafc] border-2 border-[#dbeafe] rounded-3xl p-7 sm:p-9 flex flex-col justify-between shadow-xs hover:shadow-md transition-all">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#2563eb] block mb-2">
                  URGENT HELP
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] mb-3 font-display">
                  Received an IRS notice?
                </h3>
                <p className="text-sm sm:text-base text-[#334155]/90 leading-relaxed mb-6 font-medium">
                  Don't wait on the deadline. Open a portal request, upload the letter, and TAXIVA LLC starts working on your official CPA response immediately.
                </p>

                <div className="flex flex-wrap gap-2 mb-7">
                  {[
                    { num: "1", label: "Log in" },
                    { num: "2", label: "Create request" },
                    { num: "3", label: "Choose IRS Notice" },
                    { num: "4", label: "Upload & we work" }
                  ].map((step) => (
                    <span
                      key={step.num}
                      className="inline-flex items-center gap-2 bg-white border border-[#dbeafe] px-3 py-1.5 rounded-xl text-xs font-bold text-[#0f172a]"
                    >
                      <span className="w-5 h-5 rounded-md bg-[#1d4ed8] text-white flex items-center justify-center text-[11px] font-extrabold">
                        {step.num}
                      </span>
                      {step.label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  to="/get-started"
                  className="bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-extrabold text-sm px-6 py-3 rounded-xl transition-all"
                >
                  Get in touch
                </Link>
                <Link
                  to="/login"
                  className="bg-white hover:bg-[#eff6ff] text-[#0f172a] border border-[#dbeafe] font-extrabold text-sm px-6 py-3 rounded-xl transition-all"
                >
                  Open portal
                </Link>
              </div>
            </div>

            {/* Path 2: Apply for ITIN processing */}
            <div className="bg-white border-2 border-[#dbeafe] rounded-3xl p-7 sm:p-9 flex flex-col justify-between shadow-xs hover:shadow-md transition-all">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#2563eb] block mb-2">
                  NEED AN ITIN, FBAR OR NY FORMATION?
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] mb-3 font-display">
                  Apply for ITIN & Cross-Border Filing
                </h3>
                <p className="text-sm sm:text-base text-[#334155]/90 leading-relaxed mb-6 font-medium">
                  Dedicated support for Form W-7 ITIN processing, FinCEN Form 114 FBAR disclosures, and New York (NY) main company formation — guided verification for 100% accuracy.
                </p>

                <div className="flex flex-wrap gap-2 mb-7">
                  {[
                    { num: "1", label: "CPA guidance" },
                    { num: "2", label: "W-7 & FBAR prep" },
                    { num: "3", label: "Document check" },
                    { num: "4", label: "File with confidence" }
                  ].map((step) => (
                    <span
                      key={step.num}
                      className="inline-flex items-center gap-2 bg-[#f8fafc] border border-[#dbeafe] px-3 py-1.5 rounded-xl text-xs font-bold text-[#0f172a]"
                    >
                      <span className="w-5 h-5 rounded-md bg-[#0f172a] text-white flex items-center justify-center text-[11px] font-extrabold">
                        {step.num}
                      </span>
                      {step.label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  to="/get-started"
                  className="bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-extrabold text-sm px-6 py-3 rounded-xl transition-all"
                >
                  Get in touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SIDE-BY-SIDE SECTION: "Stop Overpaying. Start Tax Savings." (Left) AND "Frequently Asked Questions" (Right) */}
      <section className="py-16 bg-[#f8fafc] border-t border-[#dbeafe]" id="faq-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* LEFT COLUMN: Stop Overpaying. Start Tax Savings. */}
            <div className="lg:col-span-5 rounded-3xl overflow-hidden border border-[#dbeafe] shadow-xl flex flex-col">
              {/* Top Blue Strategy Box */}
              <div
                className="p-8 sm:p-10 text-white bg-[#1d4ed8]"
                style={{
                  background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 45%, #1d4ed8 100%)"
                }}
              >
                <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-white/80 bg-white/10 px-3 py-1 rounded-lg mb-4">
                  Proactive Tax Strategy
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold leading-[1.1] font-display mb-4">
                  Stop Overpaying.
                  <br />
                  Start Tax Savings.
                </h2>
                <p className="text-white/85 text-sm sm:text-base leading-relaxed mb-6">
                  The tax code is written to reward proactive planning. We help you access the legal tax-saving strategies that reduce your ordinary and business tax liability.
                </p>

                <ul className="space-y-3.5 mb-8">
                  <li className="flex items-center gap-3 text-sm font-bold text-white">
                    <span className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </span>
                    <span>RSU, ESPP & Capital Gains Basis Reconciliation</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm font-bold text-white">
                    <span className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </span>
                    <span>NY Formation, LLC & S-Corp (1120-S) QBI Optimization</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm font-bold text-white">
                    <span className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </span>
                    <span>US–India DTAA Foreign Tax Credit (Form 1116)</span>
                  </li>
                </ul>

                <Link
                  to="/get-started"
                  className="inline-flex items-center gap-2 bg-white text-[#0f172a] hover:bg-[#eff6ff] font-extrabold text-sm px-6 py-3.5 rounded-xl transition-all shadow-md"
                >
                  <span>Get in touch</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Bottom Soft Violet Savings Snapshot Card */}
              <div className="bg-[#eff6ff] p-6 sm:p-8">
                <div className="bg-white rounded-2xl p-6 shadow-md border border-[#dbeafe] space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-extrabold text-[#0f172a]">Tax-Savings Identified</h3>
                    <div className="w-7 h-7 rounded-full bg-[#1d4ed8] text-white flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <div className="h-10 bg-[#f8fafc] border border-[#dbeafe] rounded-xl px-3.5 flex items-center justify-between text-xs font-bold text-[#1d4ed8]">
                      <span>Federal, NY / 50-State & DTAA Credits</span>
                      <span>Verified ✓</span>
                    </div>
                    <div className="h-2.5 w-4/5 bg-[#eff6ff] rounded-md" />
                    <div className="h-2.5 w-3/5 bg-[#eff6ff] rounded-md" />
                  </div>

                  <div className="pt-3 border-t border-[#eff6ff] flex items-center justify-between">
                    <span className="text-xs font-extrabold text-[#0f172a]">CPA Line-by-Line Audit Check</span>
                    <span className="text-lg font-black text-[#1d4ed8] font-display">100% Compliant</span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Frequently Asked Questions About Our Tax Services */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-[#dbeafe] p-7 sm:p-10 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-[#eff6ff]">
                <div>
                  <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-[#334155] bg-[#eff6ff] px-3 py-1 rounded-lg mb-2.5">
                    Tax Knowledge Base
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight font-display">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-sm text-[#334155]/85 mt-1.5 font-medium">
                    Answers on our tax services, NY company formation, FBAR & NRI rules, and 4-step filing process.
                  </p>
                </div>

                <Link
                  to="/get-started"
                  className="inline-flex items-center gap-2 bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-bold text-xs px-4 py-2.5 rounded-xl shrink-0 transition-all"
                >
                  <span>Chat with Expert</span>
                  <MessageCircle className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="divide-y divide-[#eff6ff] mt-2">
                {FAQ_DATA.map((faq) => {
                  const isExpanded = expandedFaqId === faq.id;
                  return (
                    <div key={faq.id} className="py-4">
                      <button
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer group"
                      >
                        <h3 className="text-sm sm:text-base font-extrabold text-[#0f172a] group-hover:text-[#2563eb] transition-colors leading-snug">
                          {faq.question}
                        </h3>

                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
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
                            <p className="pt-3 text-xs sm:text-sm text-[#334155]/90 leading-relaxed font-medium">
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
        </div>
      </section>

      {/* Slightly Smaller, Compact Blue CTA Section ("Ready to File Your Taxes with Maximum Accuracy?") */}
      <section className="py-6 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-2xl py-6 px-6 sm:px-10 text-white shadow-lg relative overflow-hidden bg-[#1d4ed8] flex flex-col md:flex-row items-center justify-between gap-6"
            style={{
              background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 55%, #2563eb 100%)"
            }}
          >
            <div className="space-y-1 text-center md:text-left relative z-10">
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight font-display">
                Ready to File Your Taxes with Maximum Accuracy?
              </h2>
              <p className="text-white/90 text-xs sm:text-sm leading-relaxed">
                Just sign up—we'll match you with the right TAXIVA LLC tax expert in New York (EST) and take care of the rest.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 relative z-10 shrink-0">
              <Link
                to="/get-started"
                className="bg-white text-[#0f172a] hover:bg-[#eff6ff] px-5 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all shadow-md active:scale-95"
              >
                Get in touch
              </Link>
              <Link
                to="/pricing"
                className="border border-white/30 text-white hover:bg-white/10 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all"
              >
                Explore Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Side-by-Side Section: "Proactive IRS Tax Saving Alerts & Deadlines" AND "Instant Access to Official IRS Refund Tracking & Tax Portals" */}
      <section className="py-16 bg-[#f8fafc] border-t border-[#dbeafe]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Left Card: Proactive IRS Tax Saving Alerts & Deadlines */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#dbeafe] shadow-sm flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#eff6ff] text-[#1d4ed8] px-3.5 py-1.5 rounded-lg text-xs font-extrabold uppercase tracking-widest mb-4">
                  <Mail className="w-4 h-4" />
                  <span>Stay Informed Year-Round (EST)</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] mb-3 font-display">
                  Proactive IRS Tax Saving Alerts & Deadlines
                </h2>

                <p className="text-[#334155]/90 text-sm sm:text-base mb-6 leading-relaxed font-medium">
                  Join the TAXIVA LLC client briefing and receive timely reminders on quarterly estimated taxes, FBAR rules, and year-end tax reduction strategies.
                </p>

                <div className="bg-[#f8fafc] border border-[#dbeafe] rounded-2xl p-5 mb-6">
                  <p className="text-xs sm:text-sm text-[#1d4ed8] italic font-medium">
                    "Their Q4 RSU & capital loss harvesting reminder saved us over $4,100 before December 31st."
                  </p>
                  <p className="text-xs font-extrabold text-[#0f172a] mt-2">
                    — Verified Client @ New York, NY (EST) • IRS Compliance Verified
                  </p>
                </div>
              </div>

              <div>
                {newsletterSubscribed ? (
                  <div className="bg-[#eff6ff] border border-[#bfdbfe] text-[#0f172a] px-5 py-4 rounded-xl font-bold flex items-center gap-2 text-sm">
                    <CheckCircle2 className="w-5 h-5 text-[#1d4ed8]" />
                    <span>Thank you for subscribing to TAXIVA LLC tax alerts!</span>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setNewsletterSubscribed(true);
                    }}
                    className="flex flex-col sm:flex-row gap-3"
                  >
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email address"
                      required
                      className="flex-1 bg-[#f8fafc] px-4 py-3.5 rounded-xl border border-[#bfdbfe] focus:outline-none focus:ring-2 focus:ring-[#1d4ed8] transition-all font-medium text-[#0f172a] text-sm"
                    />
                    <button
                      type="submit"
                      className="bg-[#1d4ed8] text-white px-6 py-3.5 rounded-xl font-extrabold text-sm hover:bg-[#1e40af] transition-all shadow-md active:scale-95 whitespace-nowrap flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Subscribe</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Right Card: Instant Access to Official IRS Refund Tracking & Tax Portals */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#dbeafe] shadow-sm flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#eff6ff] text-[#1d4ed8] px-3.5 py-1.5 rounded-lg text-xs font-extrabold uppercase tracking-widest mb-4">
                  <Landmark className="w-4 h-4" />
                  <span>Refund & Payment Center</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] mb-3 font-display">
                  Instant Access to Official IRS Refund Tracking & Tax Portals
                </h2>

                <p className="text-[#334155]/90 text-sm sm:text-base mb-6 leading-relaxed font-medium">
                  Track your federal or state refund status in real time, remit balance payments via IRS Direct Pay, or check upcoming 2026 federal tax deadlines in one unified hub.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
                  <a
                    href="https://www.irs.gov/refunds"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-[#f8fafc] rounded-xl border border-[#dbeafe] hover:border-[#1d4ed8] transition-all"
                  >
                    <History className="w-5 h-5 text-[#1d4ed8] shrink-0" />
                    <div>
                      <span className="font-extrabold text-sm text-[#0f172a] block">Federal Refund Status</span>
                      <span className="text-xs text-[#334155]">Official IRS Where's My Refund</span>
                    </div>
                  </a>
                  <Link
                    to="/tax-tools"
                    className="flex items-center gap-3 p-4 bg-[#f8fafc] rounded-xl border border-[#dbeafe] hover:border-[#1d4ed8] transition-all"
                  >
                    <Landmark className="w-5 h-5 text-[#1d4ed8] shrink-0" />
                    <div>
                      <span className="font-extrabold text-sm text-[#0f172a] block">State Refund & Direct Pay</span>
                      <span className="text-xs text-[#334155]">All 50 States + Tax Calendar</span>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="pt-4 border-t border-[#eff6ff] flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#334155]">
                  <ShieldCheck className="w-4 h-4 text-[#1d4ed8]" />
                  <span>Official IRS.gov & State Revenue Links</span>
                </div>
                <Link
                  to="/tax-tools"
                  className="inline-flex items-center gap-2 bg-[#1d4ed8] text-white px-5 py-3 rounded-xl font-extrabold text-xs sm:text-sm hover:bg-[#1e40af] transition-all"
                >
                  <span>Open Refund Center</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Authority Stats + "Security and data protection" */}
      <section className="py-16 bg-white border-t border-[#dbeafe]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 4 Key Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-dashed border-[#bfdbfe]">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="w-9 h-9 rounded-xl bg-[#eff6ff] text-[#1d4ed8] flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] font-display">6,500+</span>
              </div>
              <span className="text-xs font-semibold text-[#334155]">US-based Clients & NRIs Served</span>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="w-9 h-9 rounded-xl bg-[#eff6ff] text-[#1d4ed8] flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] font-display">50 States</span>
              </div>
              <span className="text-xs font-semibold text-[#334155]">NY Main Formation & Multi-State</span>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="w-9 h-9 rounded-xl bg-[#eff6ff] text-[#1d4ed8] flex items-center justify-center">
                  <Briefcase className="w-5 h-5" />
                </div>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] font-display">± 12 yrs</span>
              </div>
              <span className="text-xs font-semibold text-[#334155]">Average Tax Pro Experience</span>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="w-9 h-9 rounded-xl bg-[#eff6ff] text-[#1d4ed8] flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] font-display">100K+</span>
              </div>
              <span className="text-xs font-semibold text-[#334155]">Tax Forms & Schedules Prepared</span>
            </div>
          </div>

          {/* Security and Data Protection Block */}
          <div className="pt-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center max-w-4xl mx-auto">
            {/* Left Shield Visual Box */}
            <div className="md:col-span-4 flex justify-center">
              <div className="relative w-44 h-36 bg-[#f8fafc] border-2 border-[#dbeafe] rounded-2xl flex items-center justify-center shadow-sm">
                <div className="w-20 h-20 rounded-2xl bg-[#1d4ed8] text-white flex items-center justify-center shadow-lg">
                  <ShieldCheck className="w-11 h-11" />
                </div>
                <div className="absolute -bottom-3 bg-white border border-[#dbeafe] px-3 py-1 rounded-lg text-[10px] font-extrabold text-[#1d4ed8] uppercase tracking-wider shadow-xs">
                  256-Bit Encrypted
                </div>
              </div>
            </div>

            {/* Right Text & Security Compliance Badges */}
            <div className="md:col-span-8 text-center md:text-left space-y-4">
              <h3 className="text-2xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight font-display">
                Security and data <span className="text-[#2563eb]">protection</span>
              </h3>
              <p className="text-sm sm:text-base text-[#334155]/90 leading-relaxed font-medium">
                TAXIVA LLC's Premier Client Services uses AES-256 encryption, SOC 2-compliant controls, two-factor authentication, and strict IRS Section 7216 safeguards inside our Canopy Portal to ensure top-tier data security and compliance.
              </p>

              {/* Compliance Badges Row */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
                <div className="inline-flex items-center gap-2 bg-[#f8fafc] border border-[#bfdbfe] px-3.5 py-2 rounded-xl">
                  <Building2 className="w-4 h-4 text-[#1d4ed8]" />
                  <div className="text-left">
                    <span className="block text-[10px] font-black uppercase tracking-wider text-[#0f172a] leading-none">
                      IRS E-FILE
                    </span>
                    <span className="block text-[9px] font-semibold text-[#2563eb] mt-0.5">
                      Authorized Provider
                    </span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 bg-[#f8fafc] border border-[#bfdbfe] px-3.5 py-2 rounded-xl">
                  <Lock className="w-4 h-4 text-[#1d4ed8]" />
                  <div className="text-left">
                    <span className="block text-[10px] font-black uppercase tracking-wider text-[#0f172a] leading-none">
                      ISO 27001
                    </span>
                    <span className="block text-[9px] font-semibold text-[#2563eb] mt-0.5">
                      Certified Security
                    </span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 bg-[#f8fafc] border border-[#bfdbfe] px-3.5 py-2 rounded-xl">
                  <ShieldCheck className="w-4 h-4 text-[#1d4ed8]" />
                  <div className="text-left">
                    <span className="block text-[10px] font-black uppercase tracking-wider text-[#0f172a] leading-none">
                      AICPA SOC 2
                    </span>
                    <span className="block text-[9px] font-semibold text-[#2563eb] mt-0.5">
                      Type II Controls
                    </span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 bg-[#f8fafc] border border-[#bfdbfe] px-3.5 py-2 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-[#1d4ed8]" />
                  <div className="text-left">
                    <span className="block text-[10px] font-black uppercase tracking-wider text-[#0f172a] leading-none">
                      IRS SEC. 7216
                    </span>
                    <span className="block text-[9px] font-semibold text-[#2563eb] mt-0.5">
                      Privacy Compliant
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
