/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  MapPin,
  Award,
  ShieldCheck,
  Globe2,
  Briefcase,
  Landmark,
  Phone,
  Mail,
  ExternalLink,
  Scale,
  Sparkles
} from "lucide-react";

const CORE_PILLARS = [
  {
    index: "01",
    title: "Individual Tax Filing",
    subtitle: "Form 1040 · RSU & ESPP · 50 States · ITIN",
    description:
      "Federal and multi-state tax preparation for W-2 employees, tech professionals with RSUs/ESPPs, 1099 contractors, and visa holders.",
    href: "/services/individual",
    icon: ShieldCheck
  },
  {
    index: "02",
    title: "Business Tax & NY Formation",
    subtitle: "Form 1120-S · Form 1065 · Form 1120 · LLCs",
    description:
      "New York company formation, S-Corp and partnership returns, K-1 schedules, and proactive tax planning for growing businesses.",
    href: "/services/business",
    icon: Briefcase
  },
  {
    index: "03",
    title: "FBAR & Foreign Reporting",
    subtitle: "FinCEN Form 114 · FATCA Form 8938 · Form 3520",
    description:
      "Penalty-free international account and foreign asset disclosures for U.S. residents, Green Card holders, and citizens abroad.",
    href: "/services/foreign-reporting",
    icon: Globe2
  },
  {
    index: "04",
    title: "Indian Tax & NRI Advisory",
    subtitle: "US–India DTAA · Form 1116 · Indian ITR",
    description:
      "Cross-border U.S. and India tax filing, Foreign Tax Credit optimization under the DTAA treaty, and property repatriation.",
    href: "/services/indian-tax",
    icon: Landmark
  }
];

const ENGAGEMENT_STEPS = [
  {
    step: "Step 01",
    title: "Free Discovery & Flat Quote",
    description:
      "Share your filing needs with our New York (EST) team and receive an upfront flat-fee quote before any work begins."
  },
  {
    step: "Step 02",
    title: "Canopy Portal Upload",
    description:
      "Securely upload your W-2s, 1099s, and tax documents through our 256-bit AES encrypted Canopy Client Portal."
  },
  {
    step: "Step 03",
    title: "24–48 Hr CPA Tax Draft",
    description:
      "Licensed CPAs and IRS Enrolled Agents prepare your return line-by-line and deliver a complete draft within 24–48 hours."
  },
  {
    step: "Step 04",
    title: "Review, E-Sign & File",
    description:
      "Review your draft with your dedicated advisor. We e-file only after you approve and sign Form 8879."
  }
];

const FIRM_BENEFITS = [
  "Licensed CPAs, IRS Enrolled Agents & Chartered Accountants.",
  "24–48 hour free tax draft review before you pay or e-file.",
  "Upfront flat-fee pricing with zero hidden hourly charges.",
  "256-bit AES encrypted Canopy Client Portal protection.",
  "Specialized RSU, ESPP, FBAR & US–India DTAA tax expertise.",
  "Free IRS and state tax notice guidance on every return we file."
];

export default function About() {
  return (
    <div className="flex flex-col w-full bg-white text-[#0f172a]">
      {/* 1. COMPACT EXECUTIVE HERO */}
      <section
        className="bg-[#1d4ed8] text-white py-16 lg:py-20 border-b border-white/10 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 45%, #1d4ed8 100%)"
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-bold text-white/90 mb-5 bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-xl w-fit backdrop-blur-xs">
              <Sparkles className="w-4 h-4 text-sky-300" />
              <span>New York, NY Headquarters (EST)</span>
              <span aria-hidden="true">·</span>
              <span>IRS Authorized E-File Provider</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[3.4rem] font-extrabold tracking-tight text-white mb-4 leading-[1.1] font-display">
              Precision Tax & Cross-Border Advisory You Can Trust
            </h1>

            <p className="text-base sm:text-lg text-white/90 leading-relaxed mb-8 font-medium">
              Headquartered in <strong className="text-white font-bold">New York, NY (EST)</strong>,{" "}
              <strong className="text-white font-black uppercase">TAXIVA LLC</strong> delivers CPA-led tax filing,
              business formation, and NRI cross-border compliance across all 50 U.S. states.
            </p>

            <div className="flex flex-wrap items-center gap-3.5">
              <Link
                to="/get-started"
                className="bg-white text-[#0f172a] hover:bg-[#eff6ff] px-6 py-3.5 rounded-xl font-extrabold text-sm sm:text-base transition-all inline-flex items-center gap-2 shadow-xl whitespace-nowrap active:scale-95"
              >
                <span>Get in touch</span>
                <ArrowRight className="w-4 h-4 text-[#1d4ed8]" />
              </Link>
              <a
                href="https://app.canopytax.com/#/login?redirect_url=https%3A%2F%2Fapp.canopytax.com%2F%23%2Fclient"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/25 px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all inline-flex items-center gap-2 whitespace-nowrap"
              >
                <span>Canopy Client Portal</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* 3 Key Stats */}
          <div className="mt-12 pt-8 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white tabular-nums tracking-tight">6,500+</div>
              <div className="text-sm text-white/85 mt-1 font-medium">Individual & Business Clients Served</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white tabular-nums tracking-tight">24–48 Hrs</div>
              <div className="text-sm text-white/85 mt-1 font-medium">Free Tax Draft Turnaround</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white tabular-nums tracking-tight">100%</div>
              <div className="text-sm text-white/85 mt-1 font-medium">CPA / EA Reviewed Before E-Filing</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. WHO WE ARE — Short & Sweet */}
      <section className="py-14 sm:py-16 bg-white border-b border-[#dbeafe]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="lg:col-span-6 space-y-4"
            >
              <div className="text-xs font-extrabold text-[#1d4ed8] tracking-widest uppercase">
                Who We Are · New York (EST)
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight leading-tight font-display">
                Licensed Tax Professionals Focused on Your Bottom Line
              </h2>
              <p className="text-[#334155] text-base sm:text-lg leading-relaxed font-medium">
                At <strong className="text-[#0f172a] font-black">TAXIVA LLC</strong>, licensed CPAs, IRS Enrolled Agents, and Chartered Accountants handle your return from start to finish. Whether you file W-2s with RSUs, run an LLC or S-Corp, or manage US–India cross-border income, we ensure every deduction is claimed with 100% accuracy.
              </p>
            </motion.div>

            {/* Right Column: Compact Standards Grid */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {[
                {
                  title: "Certified Representation",
                  desc: "Direct access to licensed CPAs and IRS Enrolled Agents.",
                  icon: Scale
                },
                {
                  title: "AES-256 & Sec. 7216",
                  desc: "Bank-grade encryption across our Canopy Client Portal.",
                  icon: ShieldCheck
                },
                {
                  title: "Upfront Flat Pricing",
                  desc: "Clear flat fees quoted before we start—never hourly surprises.",
                  icon: Award
                },
                {
                  title: "Year-Round EST Support",
                  desc: "Available 365 days for planning, estimates, and IRS notices.",
                  icon: Clock
                }
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-[#f8fafc] rounded-2xl p-5 border border-[#dbeafe] space-y-2"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#1d4ed8] text-white flex items-center justify-center shadow-xs">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-extrabold text-[#0f172a] text-base">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. 4-STEP WORKFLOW — Concise & Scannable */}
      <section className="py-14 sm:py-16 bg-[#eff6ff]/40 border-b border-[#dbeafe]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#1d4ed8] block mb-2">
              Simple 4-Step Process
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight font-display">
              How We File Your Taxes
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ENGAGEMENT_STEPS.map((item, idx) => (
              <div
                key={item.step}
                className="p-6 rounded-2xl bg-white border border-[#dbeafe] hover:border-[#1d4ed8] shadow-2xs transition-all"
              >
                <div className="w-9 h-9 rounded-xl bg-[#eff6ff] text-[#1d4ed8] flex items-center justify-center text-xs font-mono font-black mb-3">
                  0{idx + 1}
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-[#0f172a] mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY CLIENTS CHOOSE US + NYC HQ */}
      <section className="py-14 sm:py-16 bg-white border-b border-[#dbeafe]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#1d4ed8] block mb-2">
                  The TAXIVA Advantage
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight font-display">
                  Why 6,500+ Clients Choose TAXIVA LLC
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {FIRM_BENEFITS.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3.5 bg-[#f8fafc] rounded-xl border border-[#dbeafe]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#1d4ed8] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-semibold text-[#0f172a] leading-snug">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Compact NYC Headquarters Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#0f172a] to-[#1e3a8a] text-white rounded-3xl p-7 sm:p-8 shadow-xl border border-white/10 space-y-5">
              <div>
                <span className="text-[11px] font-mono font-extrabold uppercase tracking-widest text-[#93c5fd]">
                  Executive Headquarters
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold mt-1 font-display">
                  New York Corporate Desk
                </h3>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>New York, NY (EST) • Primary Advisory Hub</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                  <a href="tel:737-381-2330" className="hover:text-sky-300 font-bold transition-colors">
                    +1 737-381-2330
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                  <a href="mailto:info@taxiva.co" className="hover:text-sky-300 font-bold transition-colors">
                    info@taxiva.co
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Mon – Sat: 9:00 AM – 7:00 PM EST</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/get-started"
                  className="w-full bg-[#1d4ed8] hover:bg-[#2563eb] text-white py-3 px-4 rounded-xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
                >
                  <span>Get in touch</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CORE PRACTICE AREAS — Compact 4-Card Grid */}
      <section className="py-14 sm:py-16 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#1d4ed8] block mb-2">
              Core Practice Areas
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0f172a] tracking-tight font-display">
              Four Pillars of Tax Compliance
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CORE_PILLARS.map((pillar) => (
              <div
                key={pillar.index}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-[#dbeafe] flex flex-col justify-between hover:border-[#1d4ed8] transition-all shadow-2xs group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-extrabold text-[#1d4ed8]">
                      {pillar.index}. Practice Area
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#eff6ff] text-[#1d4ed8] flex items-center justify-center group-hover:bg-[#1d4ed8] group-hover:text-white transition-colors">
                      <pillar.icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] mb-1 font-display">
                    {pillar.title}
                  </h3>
                  <p className="text-xs font-bold text-[#2563eb] mb-3">{pillar.subtitle}</p>
                  <p className="text-[#334155] text-sm leading-relaxed mb-5 font-medium">
                    {pillar.description}
                  </p>
                </div>

                <Link
                  to={pillar.href}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-[#1d4ed8] hover:gap-2.5 transition-all"
                >
                  <span>Explore {pillar.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
