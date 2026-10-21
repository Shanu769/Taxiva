/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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
  Calculator
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
    title: "Business Tax Filing & NY Main Company Formation",
    subtitle: "NY Entity Formation · Form 1120-S · Form 1065 · Form 1120 · LLCs",
    description:
      "End-to-end New York (NY) main company formation, 50-state entity registration, and corporate/pass-through tax compliance for LLCs, S-Corporations, partnerships, and C-Corporations. We optimize owner compensation, Section 199A QBI deductions, and quarterly estimated tax schedules.",
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
      "Book a consultation or complete our quick intake form. A senior tax advisor in our New York (EST) headquarters evaluates your residency status, income streams, or NY company formation needs and provides a transparent, upfront flat-fee quote."
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
    title: "New York (NY) Main Company Formation & 50-State Filing",
    desc: "Starting a new business or scaling across states? New York is our primary company formation hub—we handle NY LLC/Corp formation, EIN issuance, S-Corp (Form 2553) elections, and multi-state apportionment across all 50 U.S. states.",
    badge: "NY & 50-State Formation",
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
  "Licensed CPAs, IRS Enrolled Agents (EAs) & Chartered Accountants on staff.",
  "Headquartered in New York, NY (EST) — our main company formation & corporate hub.",
  "Comprehensive draft tax summary delivered within 24–48 hours for your review.",
  "Complimentary 3-year prior tax return review to identify missed refunds or credits.",
  "Transparent, upfront flat-fee pricing with zero hidden hourly billing surprises.",
  "Full IRS & State Audit Defense, Notice Resolution, and Penalty Abatement support.",
  "Bank-grade AES-256 encryption and strict IRS Section 7216 data privacy compliance.",
  "Specialized expertise in RSU, ESPP, ISO stock options, and multi-state apportionment.",
  "Complete FinCEN Form 114 (FBAR) and Form 8938 (FATCA) international compliance.",
  "US–India Double Taxation Avoidance Agreement (DTAA) & Form 1116 credit optimization.",
  "ITIN (Form W-7) application & certification support for spouses and dependents.",
  "$20 referral reward credited for every friend or colleague you refer to TAXIVA LLC."
];

export default function About() {
  return (
    <div className="flex flex-col w-full bg-white text-[#0f172a]">
      {/* Executive Hero Section */}
      <section
        className="bg-[#1d4ed8] text-white py-20 lg:py-24 border-b border-white/10 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 45%, #1d4ed8 100%)"
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-2.5 text-sm font-bold text-white/90 mb-6 bg-white/10 border border-white/20 px-4 py-2 rounded-xl w-fit">
              <span>New York, NY Corporate Headquarters (EST)</span>
              <span aria-hidden="true">·</span>
              <span>NY Main Company Formation</span>
              <span aria-hidden="true">·</span>
              <span>IRS Authorized E-File Provider</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-[4rem] font-extrabold tracking-tight text-white mb-6 leading-[1.08] font-display">
              Precision Tax Representation & Cross-Border Advisory You Can Trust
            </h1>

            <p className="text-lg sm:text-2xl text-white/90 leading-relaxed mb-10 font-normal">
              Headquartered in <strong className="text-white font-bold">New York, NY (EST)</strong> as our main company formation and executive advisory hub,{" "}
              <strong className="text-white font-black uppercase">TAXIVA LLC</strong> is a premier tax preparation,
              entity formation, and strategic tax planning firm serving over 6,500 individuals, families, NRIs,
              independent consultants, and businesses across all 50 U.S. states and abroad.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/get-started"
                className="bg-white text-[#0f172a] hover:bg-[#eff6ff] px-8 py-4 rounded-xl font-extrabold text-base sm:text-lg transition-all inline-flex items-center gap-2.5 shadow-xl whitespace-nowrap"
              >
                <span>Get in Touch with TAXIVA LLC</span>
                <ArrowRight className="w-5 h-5" />
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
          </div>

          {/* Quantitative Proof Strip */}
          <div className="mt-14 pt-10 border-t border-white/15 grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl sm:text-5xl font-extrabold text-white tabular-nums tracking-tight">6,500+</div>
              <div className="text-base text-white/85 mt-1.5 font-medium">Individual & Business Clients Served</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-extrabold text-white tabular-nums tracking-tight">NY + 50</div>
              <div className="text-base text-white/85 mt-1.5 font-medium">NY Main Formation & All 50 U.S. States</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-extrabold text-white tabular-nums tracking-tight">24–48 Hrs</div>
              <div className="text-base text-white/85 mt-1.5 font-medium">Standard Tax Summary Turnaround</div>
            </div>
            <div>
              <div className="text-4xl sm:text-5xl font-extrabold text-white tabular-nums tracking-tight">100%</div>
              <div className="text-base text-white/85 mt-1.5 font-medium">CPA / EA Reviewed Before E-Filing</div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are & Firm Story */}
      <section className="py-20 bg-white border-b border-[#dbeafe]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div className="text-sm font-extrabold text-[#1d4ed8] tracking-wider uppercase">
                Who We Are · New York Corporate Profile (EST)
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0f172a] tracking-tight leading-tight font-display">
                A Dedicated Partner for U.S. Domestic, NY Company Formation, and International Tax Compliance
              </h2>
              <p className="text-[#334155] text-lg sm:text-xl leading-relaxed">
                At <strong className="text-[#0f172a] font-black uppercase">TAXIVA LLC</strong>, we recognize that modern taxpayers face
                increasingly complex financial landscapes. Whether you are a professional managing multi-year RSU
                vestings and ESPP dispositions, a Non-Resident Indian (NRI) navigating foreign bank account disclosures
                (FBAR/FATCA) and the US–India Double Taxation Avoidance Agreement (DTAA), or an entrepreneur forming a business in{" "}
                <strong className="text-[#0f172a]">New York (NY)</strong> or scaling across states, generic software leaves critical savings on the table.
              </p>
              <p className="text-[#334155] text-lg sm:text-xl leading-relaxed">
                With our Head Office and main company formation operations anchored in{" "}
                <strong className="text-[#0f172a]">New York, NY (EST)</strong>, TAXIVA LLC combines the technical oversight
                of licensed <strong className="text-[#0f172a]">Certified Public Accountants (CPAs)</strong>,{" "}
                <strong className="text-[#0f172a]">IRS Enrolled Agents (EAs)</strong>, and{" "}
                <strong className="text-[#0f172a]">Chartered Accountants (CAs)</strong> with a streamlined digital experience
                powered by our Canopy Everything Access Portal.
              </p>
              <p className="text-[#334155] text-lg sm:text-xl leading-relaxed">
                Every return prepared by TAXIVA LLC undergoes a structured two-tier quality and compliance verification to
                ensure 100% accuracy, maximum legal tax reduction, and complete audit readiness.
              </p>
            </div>

            {/* Right Column: Executive Credentials & Standards Card */}
            <div className="lg:col-span-5 bg-[#f8fafc] rounded-3xl p-8 sm:p-10 border border-[#dbeafe] space-y-8">
              <div>
                <h3 className="text-2xl font-extrabold text-[#0f172a] mb-2">Our Professional Standards</h3>
                <p className="text-base text-[#334155] leading-relaxed">
                  Built on transparency, regulatory rigor, and personal accountability for every client engagement.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#1d4ed8] text-white flex items-center justify-center shrink-0">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#0f172a] text-lg">Certified Representation</h4>
                    <p className="text-base text-[#334155] mt-1 leading-relaxed">
                      Direct access to licensed CPAs and IRS Enrolled Agents authorized to represent taxpayers before the Internal Revenue Service and all 50 state tax boards.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#1d4ed8] text-white flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#0f172a] text-lg">IRS Sec. 7216 & AES-256 Security</h4>
                    <p className="text-base text-[#334155] mt-1 leading-relaxed">
                      All financial records are transmitted and stored via our encrypted Canopy Client Portal under strict federal confidentiality safeguards.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#1d4ed8] text-white flex items-center justify-center shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#0f172a] text-lg">Upfront Flat-Fee Transparency</h4>
                    <p className="text-base text-[#334155] mt-1 leading-relaxed">
                      Review your comprehensive tax summary and exact fee schedule before committing—no surprise hourly billing or hidden add-ons.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#1d4ed8] text-white flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#0f172a] text-lg">Year-Round Advisory (EST)</h4>
                    <p className="text-base text-[#334155] mt-1 leading-relaxed">
                      Our New York desk remains available 365 days a year for W-4 adjustments, NY entity formation, RSU tax projections, and IRS correspondence.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Core Specialized Practice Pillars */}
      <section className="py-20 bg-[#f8fafc] border-b border-[#dbeafe]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <div className="text-sm font-extrabold text-[#1d4ed8] tracking-wider uppercase mb-3">
              Core Practice Areas
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0f172a] tracking-tight font-display">
              Four Specialized Pillars of Tax Compliance & Strategy
            </h2>
            <p className="text-[#334155] text-lg sm:text-xl mt-4 leading-relaxed">
              TAXIVA LLC focuses exclusively on the four high-impact areas where professional CPA and cross-border expertise delivers measurable financial protection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CORE_PILLARS.map((pillar) => (
              <div
                key={pillar.index}
                className="bg-white rounded-3xl p-8 sm:p-10 border border-[#dbeafe] flex flex-col justify-between hover:border-[#1d4ed8] transition-all shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-base font-mono font-extrabold text-[#1d4ed8]">
                      {pillar.index}. Practice Area
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-[#eff6ff] text-[#1d4ed8] flex items-center justify-center">
                      <pillar.icon className="w-6 h-6" />
                    </div>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] mb-2">{pillar.title}</h3>
                  <p className="text-sm font-bold text-[#2563eb] mb-4">{pillar.subtitle}</p>
                  <p className="text-[#334155] text-base sm:text-lg leading-relaxed mb-8">{pillar.description}</p>
                </div>

                <Link
                  to={pillar.href}
                  className="inline-flex items-center gap-2 text-base font-extrabold text-[#1d4ed8] hover:underline transition-colors"
                >
                  <span>Explore {pillar.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Extra Tax-Saving & Compliance Benefits Section */}
      <section className="py-20 bg-white border-b border-[#dbeafe]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <div className="text-sm font-extrabold text-[#1d4ed8] tracking-wider uppercase mb-3">
              Strategic Tax Reduction & Value-Added Benefits
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0f172a] tracking-tight font-display">
              Extra Tax-Saving Benefits Included With Our Advisory
            </h2>
            <p className="text-[#334155] text-lg sm:text-xl mt-4 leading-relaxed">
              Beyond standard tax form preparation, our advisors actively look for legal ways to reduce your effective tax rate across federal, New York, 50-state, and international jurisdictions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {EXTRA_TAX_BENEFITS.map((item) => (
              <div
                key={item.title}
                className="bg-[#f8fafc] rounded-3xl p-8 sm:p-10 border border-[#dbeafe] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <span className="inline-block bg-[#eff6ff] text-[#1d4ed8] text-xs font-extrabold uppercase tracking-wider px-3.5 py-1.5 rounded-lg border border-[#dbeafe]">
                      {item.badge}
                    </span>
                    <div className="w-11 h-11 rounded-xl bg-[#1d4ed8] text-white flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] mb-3">{item.title}</h3>
                  <p className="text-base sm:text-lg text-[#334155] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our 4-Step Client Engagement Process */}
      <section className="py-20 bg-[#f8fafc] border-b border-[#dbeafe]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <div className="text-sm font-extrabold text-[#1d4ed8] tracking-wider uppercase mb-3">
              How We Work
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0f172a] tracking-tight font-display">
              Our 4-Step Tax Filing & Advisory Workflow
            </h2>
            <p className="text-[#334155] text-lg sm:text-xl mt-4 leading-relaxed">
              Designed for busy professionals, families, and business owners—complete your entire tax filing online from anywhere in the U.S. or abroad.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ENGAGEMENT_STEPS.map((item) => (
              <div
                key={item.step}
                className="p-8 rounded-3xl bg-white border border-[#dbeafe] flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="text-sm font-mono font-extrabold text-[#2563eb] mb-3">{item.step}</div>
                  <h3 className="text-xl font-extrabold text-[#0f172a] mb-3 leading-snug">{item.title}</h3>
                  <p className="text-base text-[#334155] leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12-Point Client Benefits & New York Headquarters */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-8">
              <div>
                <div className="text-sm font-extrabold text-[#1d4ed8] tracking-wider uppercase mb-3">
                  The TAXIVA LLC Advantage
                </div>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0f172a] tracking-tight font-display">
                  Why 6,500+ Clients Choose TAXIVA LLC
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {FIRM_BENEFITS.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4.5 bg-[#f8fafc] rounded-2xl border border-[#dbeafe]"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#1d4ed8] shrink-0 mt-0.5" />
                    <span className="text-base font-medium text-[#0f172a] leading-snug">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Corporate Headquarters Card — New York, NY (EST) */}
            <div
              className="lg:col-span-5 bg-[#1d4ed8] text-white rounded-3xl p-8 sm:p-10 space-y-7 border border-white/15 shadow-xl"
              style={{
                background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #1d4ed8 100%)"
              }}
            >
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center text-white font-black text-xl">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white/80">Corporate Headquarters (EST)</div>
                  <h3 className="text-2xl font-black text-white uppercase">TAXIVA LLC — New York, NY</h3>
                </div>
              </div>

              <p className="text-base text-white/90 leading-relaxed">
                Our executive team operates from our New York, NY Head Office (Eastern Standard Time — EST), handling New York main company formation and serving clients across all 50 U.S. states and international time zones.
              </p>

              <div className="space-y-4 pt-3 border-t border-white/20 text-base">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-white shrink-0 mt-1" />
                  <div>
                    <div className="font-bold text-white">New York Head Office (EST)</div>
                    <div className="text-white/85">
                      One World Trade Center, Suite 8500, New York, NY 10007, USA
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <Phone className="w-5 h-5 text-white shrink-0" />
                  <div>
                    <span className="text-white/80 mr-2">Direct Line (EST):</span>
                    <a href="tel:+17373812330" className="font-bold text-white hover:underline">
                      +1 737-381-2330
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <Mail className="w-5 h-5 text-white shrink-0" />
                  <div>
                    <span className="text-white/80 mr-2">Official Email:</span>
                    <a href="mailto:info@taxiva.co" className="font-bold text-white hover:underline">
                      info@taxiva.co
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/get-started"
                  className="flex-1 bg-white text-[#0f172a] px-5 py-3.5 rounded-xl font-extrabold text-base hover:bg-[#eff6ff] transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <span>Get in Touch</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/pricing"
                  className="flex-1 bg-white/10 text-white border border-white/25 px-5 py-3.5 rounded-xl font-bold text-base hover:bg-white/20 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <span>View Pricing Plans</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
