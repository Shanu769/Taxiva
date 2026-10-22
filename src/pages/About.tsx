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
  FileText,
  Phone,
  Mail,
  ExternalLink,
  Scale,
  Building2,
  TrendingDown,
  Calculator,
  Sparkles
} from "lucide-react";

const CORE_PILLARS = [
  {
    index: "01",
    title: "Individual Federal & Multi-State Tax Filing",
    subtitle: "Form 1040 · Schedule A/C/D/E · RSU & ESPP · ITIN (Form W-7)",
    description:
      "Comprehensive federal and 50-state tax return preparation for W-2 employees, tech professionals with complex RSU/ESPP and ISO equity compensation, independent 1099 contractors, real estate investors, and first-year or dual-status visa holders (H-1B, L-1, F-1 OPT).",
    href: "/services/individual",
    icon: ShieldCheck
  },
  {
    index: "02",
    title: "Business Tax Filing & Corporate Strategy",
    subtitle: "Form 1120-S · Form 1065 · Form 1120 · LLCs · Franchise Compliance",
    description:
      "Pass-through and corporate tax compliance for LLCs, S-Corporations, partnerships, and C-Corporations. We optimize owner compensation, Section 199A QBI deductions, state apportionment, and quarterly estimated tax schedules.",
    href: "/services/business",
    icon: Briefcase
  },
  {
    index: "03",
    title: "FBAR (FinCEN 114) & Foreign Asset Reporting",
    subtitle: "FinCEN Form 114 · FATCA Form 8938 · Form 3520 · Form 8621 PFIC",
    description:
      "Specialized international disclosure compliance for U.S. citizens, Green Card holders, and resident aliens holding overseas bank accounts, foreign mutual funds, NRE/NRO deposits, foreign pensions, or overseas business ownership interests.",
    href: "/services/foreign-reporting",
    icon: Globe2
  },
  {
    index: "04",
    title: "Indian Tax & NRI Cross-Border Advisory",
    subtitle: "US–India DTAA · Form 1116 Foreign Tax Credits · Indian ITR Filing",
    description:
      "Integrated U.S. and India tax advisory for Non-Resident Indians (NRIs) and returning residents. We eliminate double taxation under the US–India DTAA treaty, manage Indian capital gains and property sale repatriation (Form 15CA/15CB), and file Indian ITRs.",
    href: "/services/indian-tax",
    icon: Landmark
  }
];

const ENGAGEMENT_STEPS = [
  {
    step: "Step 01",
    title: "Free Discovery Consultation & Flat-Fee Scope",
    description:
      "Book a consultation or complete our quick intake form. A senior tax advisor in our New York (EST) headquarters evaluates your residency status, income streams, or filing needs and provides a transparent, upfront flat-fee quote."
  },
  {
    step: "Step 02",
    title: "Encrypted Document Upload via Canopy Portal",
    description:
      "Access your private TAXIVA LLC Canopy Everything Access Portal to upload W-2s, 1099s, brokerage statements, and prior-year returns using bank-grade 256-bit AES encryption."
  },
  {
    step: "Step 03",
    title: "Line-by-Line CPA & EA Preparation (24–48 Hours)",
    description:
      "Licensed Certified Public Accountants (CPAs), IRS Enrolled Agents (EAs), and cross-border specialists prepare your return, run a multi-point deduction and treaty optimization audit, and deliver a comprehensive Tax Summary within 24–48 business hours."
  },
  {
    step: "Step 04",
    title: "Client Review, Form 8879 E-Sign & E-Filing",
    description:
      "Walk through your draft return line-by-line with your dedicated tax advisor. Nothing is transmitted to the IRS or state agencies until you approve and electronically sign Form 8879."
  }
];

const EXTRA_TAX_BENEFITS = [
  {
    title: "RSU, ESPP & Stock Option Basis Reconciliation",
    desc: "We audit supplemental brokerage statements against your W-2 Box 14 to eliminate double taxation on vested RSUs and disqualified ESPP sales on Form 8949 and Schedule D.",
    badge: "Capital Gains Protection",
    icon: TrendingDown
  },
  {
    title: "Multi-State Apportionment & Corporate Filings",
    desc: "Starting a new business or scaling across states? We handle entity registration, EIN issuance, S-Corp (Form 2553) elections, and multi-state apportionment across all 50 U.S. states.",
    badge: "Corporate Compliance",
    icon: Building2
  },
  {
    title: "S-Corp Election (Form 2553) & QBI Optimization",
    desc: "For 1099 consultants and LLC owners, we structure reasonable officer salary benchmarks, maximize the 20% Section 199A Qualified Business Income deduction, and set up Solo 401(k) / SEP-IRA tax shelters.",
    badge: "Business Tax Savings",
    icon: Calculator
  },
  {
    title: "US–India DTAA Treaty & Foreign Tax Credit Carryforward",
    desc: "We coordinate Indian fiscal-year tax withholdings (TDS/Form 26AS) with U.S. calendar-year reporting on Form 1116, tracking unused foreign tax credits for up to 10 years.",
    badge: "Cross-Border Relief",
    icon: Globe2
  }
];

const FIRM_BENEFITS = [
  "Licensed CPAs, IRS Enrolled Agents, and Chartered Accountants on every engagement.",
  "100% line-by-line audit review before transmitting any return to the IRS.",
  "Upfront flat-fee pricing guarantee with zero hourly overages or hidden fees.",
  "24–48 business hour turnaround on draft returns and tax summary overviews.",
  "Encrypted Canopy Everything Access Portal with bank-grade 256-bit AES protection.",
  "IRS Notice assistance and direct CPA representation across all 50 state tax agencies.",
  "Multi-state residency apportionment for tech workers and remote professionals.",
  "Specialized RSU, ESPP, and ISO equity compensation cost-basis reconciliation.",
  "FinCEN Form 114 (FBAR) and FATCA Form 8938 penalty-free international reporting.",
  "US–India Double Taxation Avoidance Agreement (DTAA) & Form 1116 credit optimization.",
  "ITIN (Form W-7) application & certification support for spouses and dependents.",
  "$20 referral reward credited for every friend or colleague you refer to TAXIVA LLC."
];

export default function About() {
  return (
    <div className="flex flex-col w-full bg-white text-[#0f172a]">
      {/* 1. EXECUTIVE HERO SECTION */}
      <section
        className="bg-[#1d4ed8] text-white py-20 lg:py-24 border-b border-white/10 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 45%, #1d4ed8 100%)"
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            <div className="flex flex-wrap items-center gap-2.5 text-sm font-bold text-white/90 mb-6 bg-white/10 border border-white/20 px-4 py-2 rounded-xl w-fit backdrop-blur-xs">
              <Sparkles className="w-4 h-4 text-sky-300" />
              <span>New York, NY Corporate Headquarters (EST)</span>
              <span aria-hidden="true">·</span>
              <span>IRS Authorized E-File Provider</span>
              <span aria-hidden="true">·</span>
              <span>All 50 States</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-[4rem] font-extrabold tracking-tight text-white mb-6 leading-[1.08] font-display">
              Precision Tax Representation & Cross-Border Advisory You Can Trust
            </h1>

            <p className="text-lg sm:text-2xl text-white/90 leading-relaxed mb-10 font-normal">
              Headquartered in <strong className="text-white font-bold">New York, NY (EST)</strong> as our executive advisory hub,{" "}
              <strong className="text-white font-black uppercase">TAXIVA LLC</strong> delivers CPA-led tax preparation,
              corporate entity planning, and international cross-border advisory for over 6,500 individuals, NRIs,
              tech consultants, and businesses across all 50 U.S. states and abroad.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/get-started"
                className="bg-white text-[#0f172a] hover:bg-[#eff6ff] px-8 py-4 rounded-xl font-extrabold text-base sm:text-lg transition-all inline-flex items-center gap-2.5 shadow-xl whitespace-nowrap active:scale-95"
              >
                <span>Get in Touch with TAXIVA LLC</span>
                <ArrowRight className="w-5 h-5 text-[#1d4ed8]" />
              </Link>
              <a
                href="https://app.canopytax.com/#/login?redirect_url=https%3A%2F%2Fapp.canopytax.com%2F%23%2Fclient"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/25 px-8 py-4 rounded-xl font-bold text-base sm:text-lg transition-all inline-flex items-center gap-2 whitespace-nowrap"
              >
                <span>Canopy Client Portal</span>
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Quantitative Proof Strip: Clean 3 stats (NY + 50 removed as requested) */}
          <div className="mt-14 pt-10 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="text-4xl sm:text-5xl font-extrabold text-white tabular-nums tracking-tight">6,500+</div>
              <div className="text-base text-white/85 mt-1.5 font-medium">Individual & Business Clients Served</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="text-4xl sm:text-5xl font-extrabold text-white tabular-nums tracking-tight">24–48 Hrs</div>
              <div className="text-base text-white/85 mt-1.5 font-medium">Standard Tax Summary Turnaround</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <div className="text-4xl sm:text-5xl font-extrabold text-white tabular-nums tracking-tight">100%</div>
              <div className="text-base text-white/85 mt-1.5 font-medium">CPA / EA Reviewed Before E-Filing</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHO WE ARE: Rewritten Headline & Content as requested */}
      <section className="py-20 bg-white border-b border-[#dbeafe]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="text-sm font-extrabold text-[#1d4ed8] tracking-wider uppercase">
                Who We Are · New York Corporate Profile (EST)
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0f172a] tracking-tight leading-tight font-display">
                Strategic Tax Planning, Multi-State Filing & Global Wealth Protection You Can Rely On
              </h2>
              <p className="text-[#334155] text-lg sm:text-xl leading-relaxed">
                At <strong className="text-[#0f172a] font-black uppercase">TAXIVA LLC</strong>, we provide authoritative,
                transparent, and proactive tax representation designed for modern taxpayers. Whether you are an equity-holding
                tech professional navigating RSU and ESPP cost bases, an NRI managing cross-border compliance under the US–India
                DTAA, or an expanding company operating across multiple states, our licensed team ensures every allowable deduction
                is claimed and every filing is penalty-free.
              </p>
              <p className="text-[#334155] text-lg sm:text-xl leading-relaxed">
                Anchored by our executive desk in <strong className="text-[#0f172a]">New York, NY (EST)</strong>, TAXIVA LLC pairs
                licensed <strong className="text-[#0f172a]">Certified Public Accountants (CPAs)</strong>,{" "}
                <strong className="text-[#0f172a]">IRS Enrolled Agents (EAs)</strong>, and{" "}
                <strong className="text-[#0f172a]">Chartered Accountants (CAs)</strong> with an encrypted Canopy Portal experience.
              </p>
              <p className="text-[#334155] text-lg sm:text-xl leading-relaxed">
                Every return undergoes a rigorous multi-point CPA review to safeguard complete audit readiness, eliminate duplicate
                cross-border liabilities, and guarantee full peace of mind.
              </p>
            </motion.div>

            {/* Right Column: Professional Standards */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-5 bg-[#f8fafc] rounded-3xl p-8 sm:p-10 border border-[#dbeafe] space-y-8 shadow-xs"
            >
              <div>
                <h3 className="text-2xl font-extrabold text-[#0f172a] mb-2 font-display">Our Professional Standards</h3>
                <p className="text-base text-[#334155] leading-relaxed">
                  Built on transparency, regulatory rigor, and personal accountability for every client engagement.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#1d4ed8] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#0f172a] text-lg">Certified Representation</h4>
                    <p className="text-sm sm:text-base text-[#334155] mt-1 leading-relaxed">
                      Direct access to licensed CPAs and IRS Enrolled Agents authorized to represent taxpayers before the IRS and state boards.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#1d4ed8] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#0f172a] text-lg">IRS Sec. 7216 & AES-256 Security</h4>
                    <p className="text-sm sm:text-base text-[#334155] mt-1 leading-relaxed">
                      All financial records are transmitted and stored via our encrypted Canopy Client Portal under strict federal confidentiality safeguards.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#1d4ed8] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#0f172a] text-lg">Upfront Flat-Fee Transparency</h4>
                    <p className="text-sm sm:text-base text-[#334155] mt-1 leading-relaxed">
                      Review your comprehensive tax summary and exact fee schedule before committing—no surprise hourly billing or hidden add-ons.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#1d4ed8] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#0f172a] text-lg">Year-Round Advisory (EST)</h4>
                    <p className="text-sm sm:text-base text-[#334155] mt-1 leading-relaxed">
                      Our New York desk remains available 365 days a year for W-4 adjustments, corporate planning, RSU projections, and IRS notices.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. SECOND TOP SECTION: Our 4-Step Tax Filing & Advisory Workflow (Placed at second top as requested) */}
      <section className="py-20 sm:py-24 bg-[#eff6ff]/50 border-b border-[#dbeafe]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mb-14"
          >
            <div className="inline-flex items-center gap-2 bg-[#dbeafe] text-[#1d4ed8] px-3.5 py-1.5 rounded-lg text-xs font-extrabold uppercase tracking-widest mb-3">
              <Clock className="w-4 h-4" />
              <span>Streamlined Engagement</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0f172a] tracking-tight font-display">
              Our 4-Step Tax Filing & Advisory Workflow
            </h2>
            <p className="text-[#334155] text-lg sm:text-xl mt-4 leading-relaxed font-medium">
              Designed for busy professionals, families, and business owners—complete your entire tax filing online from anywhere in the U.S. or abroad.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {ENGAGEMENT_STEPS.map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="p-7 sm:p-8 rounded-3xl bg-white border border-[#dbeafe] hover:border-[#1d4ed8] flex flex-col justify-between shadow-sm hover:shadow-xl transition-all group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#eff6ff] text-[#1d4ed8] group-hover:bg-[#1d4ed8] group-hover:text-white flex items-center justify-center text-xs font-mono font-black mb-4 transition-colors">
                    0{idx + 1}
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#0f172a] mb-3 leading-snug group-hover:text-[#1d4ed8] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#475569] leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. THIRD TOP SECTION: Why 6,500+ Clients Choose TAXIVA LLC (Placed at third top as requested) */}
      <section className="py-20 sm:py-24 bg-white border-b border-[#dbeafe]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 space-y-8"
            >
              <div>
                <div className="inline-flex items-center gap-2 bg-[#eff6ff] text-[#1d4ed8] px-3.5 py-1.5 rounded-lg text-xs font-extrabold uppercase tracking-widest mb-3">
                  <Award className="w-4 h-4" />
                  <span>The TAXIVA LLC Advantage</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0f172a] tracking-tight font-display">
                  Why 6,500+ Clients Choose TAXIVA LLC
                </h2>
                <p className="text-base sm:text-lg text-[#475569] mt-3 font-medium">
                  We bridge the gap between impersonal software algorithms and high-hourly traditional law firms.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {FIRM_BENEFITS.map((benefit, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.03 }}
                    className="flex items-start gap-3 p-4 bg-[#f8fafc] hover:bg-[#eff6ff] rounded-2xl border border-[#dbeafe] transition-colors"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#1d4ed8] shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold text-[#0f172a] leading-snug">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Corporate Headquarters Card — New York, NY (EST) */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-5 bg-gradient-to-br from-[#0f172a] to-[#1e3a8a] text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-white/10 space-y-8 sticky top-28"
            >
              <div>
                <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-[#93c5fd]">
                  Executive Headquarters
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold mt-2 font-display">
                  New York Corporate Operations
                </h3>
                <p className="text-white/80 text-sm mt-2 leading-relaxed">
                  Our main advisory hub coordinates domestic filing, corporate compliance, and cross-border workflows under Eastern Standard Time (EST).
                </p>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-sky-400 shrink-0" />
                  <span>New York, NY (EST) • Primary Executive Hub</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-sky-400 shrink-0" />
                  <a href="tel:737-381-2330" className="hover:text-sky-300 font-bold transition-colors">
                    +1 737-381-2330 (EST Direct)
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-sky-400 shrink-0" />
                  <a href="mailto:info@taxiva.co" className="hover:text-sky-300 font-bold transition-colors">
                    info@taxiva.co
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-sky-400 shrink-0" />
                  <span>Mon – Sat: 9:00 AM – 7:00 PM EST</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/15">
                <Link
                  to="/get-started"
                  className="w-full bg-[#1d4ed8] hover:bg-[#2563eb] text-white py-3.5 px-4 rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
                >
                  <span>Book Consultation with NYC Desk</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. FOUR SPECIALIZED PILLARS (Moved to bottom as requested) */}
      <section className="py-20 sm:py-24 bg-[#f8fafc] border-b border-[#dbeafe]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mb-14"
          >
            <div className="inline-flex items-center gap-2 bg-[#dbeafe] text-[#1d4ed8] px-3.5 py-1.5 rounded-lg text-xs font-extrabold uppercase tracking-widest mb-3">
              <Briefcase className="w-4 h-4" />
              <span>Core Practice Areas</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0f172a] tracking-tight font-display">
              Four Specialized Pillars of Tax Compliance & Strategy
            </h2>
            <p className="text-[#334155] text-lg sm:text-xl mt-4 leading-relaxed font-medium">
              TAXIVA LLC focuses exclusively on the four high-impact areas where professional CPA and cross-border expertise delivers measurable financial protection.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CORE_PILLARS.map((pillar, idx) => (
              <motion.div
                key={pillar.index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white rounded-3xl p-8 sm:p-10 border border-[#dbeafe] flex flex-col justify-between hover:border-[#1d4ed8] transition-all shadow-sm hover:shadow-xl group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-base font-mono font-extrabold text-[#1d4ed8]">
                      {pillar.index}. Practice Area
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-[#eff6ff] text-[#1d4ed8] flex items-center justify-center group-hover:bg-[#1d4ed8] group-hover:text-white transition-colors">
                      <pillar.icon className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] mb-2 font-display group-hover:text-[#1d4ed8] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-sm font-bold text-[#2563eb] mb-4">{pillar.subtitle}</p>
                  <p className="text-[#334155] text-base sm:text-lg leading-relaxed mb-8 font-medium">
                    {pillar.description}
                  </p>
                </div>

                <Link
                  to={pillar.href}
                  className="inline-flex items-center gap-2 text-base font-extrabold text-[#1d4ed8] hover:gap-3 transition-all"
                >
                  <span>Explore {pillar.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. EXTRA TAX-SAVING BENEFITS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mb-14"
          >
            <div className="inline-flex items-center gap-2 bg-[#eff6ff] text-[#1d4ed8] px-3.5 py-1.5 rounded-lg text-xs font-extrabold uppercase tracking-widest mb-3">
              <Sparkles className="w-4 h-4" />
              <span>Value-Added Benefits</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0f172a] tracking-tight font-display">
              Extra Tax-Saving Benefits Included With Our Advisory
            </h2>
            <p className="text-[#334155] text-lg sm:text-xl mt-4 leading-relaxed font-medium">
              Beyond standard tax form preparation, our advisors actively look for legal ways to reduce your effective tax rate across federal, multi-state, and international jurisdictions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {EXTRA_TAX_BENEFITS.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-[#f8fafc] rounded-3xl p-8 sm:p-10 border border-[#dbeafe] flex flex-col justify-between hover:bg-white hover:border-[#bfdbfe] transition-all shadow-2xs hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <span className="inline-block bg-[#eff6ff] text-[#1d4ed8] text-xs font-extrabold uppercase tracking-wider px-3.5 py-1.5 rounded-lg border border-[#dbeafe]">
                      {item.badge}
                    </span>
                    <div className="w-11 h-11 rounded-xl bg-[#1d4ed8] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <item.icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] mb-3 font-display">{item.title}</h3>
                  <p className="text-base sm:text-lg text-[#475569] leading-relaxed font-medium">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
