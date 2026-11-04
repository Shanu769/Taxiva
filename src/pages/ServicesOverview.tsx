/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  FileText,
  Briefcase,
  Globe2,
  Landmark,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  Award,
  Calculator,
  Lock,
  PhoneCall
} from "lucide-react";

const allServices = [
  {
    id: "individual",
    name: "Individual Tax Filing",
    tagline: "Form 1040 • W-2 & 1099 • RSUs • 50 States",
    desc: "Comprehensive personal tax filing prepared by licensed CPAs. Specialized in tech professionals with RSUs, ESPP, stock options, multi-state moves, rental properties, and freelance income.",
    href: "/services/individual",
    forms: ["Form 1040", "Schedule C & E", "Form 8949 (RSU)", "50 States", "Form 1040-NR"],
    features: [
      "24–48 hour rapid draft turnaround",
      "Line-by-line CPA stock basis reconciliation (Double-Tax Protection)",
      "Multi-state income allocation for remote and relocating workers",
      "Audit defense support & post-filing IRS assistance"
    ],
    pricingRef: "From $150 (Individual Base)",
    badge: "Most Popular",
    icon: FileText
  },
  {
    id: "business",
    name: "Business Tax Filing & Formation",
    tagline: "NY LLC Formation • S-Corp 1120-S • Partnership 1065",
    desc: "Complete corporate lifecycle support: from New York company formation and EIN setup to annual tax filings, Schedule K-1 distribution, corporate bookkeeping, and QBI deductions.",
    href: "/services/business",
    forms: ["Form 1120-S", "Form 1065", "Form 1120 (C-Corp)", "Schedule K-1", "NY LLC Filing"],
    features: [
      "Official New York & multi-state LLC / Corp entity registration",
      "S-Corp election (Form 2553) to minimize self-employment taxes",
      "Full monthly & quarterly bookkeeping reconciliation",
      "Owner payroll & compliance advisory"
    ],
    pricingRef: "From $350 (Business Base)",
    badge: "Full Entity Support",
    icon: Briefcase
  },
  {
    id: "foreign-reporting",
    name: "FBAR & Foreign Financial Reporting",
    tagline: "FinCEN Form 114 • FATCA Form 8938 • PFIC",
    desc: "Stay 100% penalty-free on overseas financial assets, Indian NRE/NRO accounts, foreign mutual funds, real estate, and overseas inheritances using official U.S. Treasury FX rates.",
    href: "/services/foreign-reporting",
    forms: ["FinCEN 114 (FBAR)", "FATCA Form 8938", "Form 3520 (Gifts)", "Form 8621 (PFIC)"],
    features: [
      "Exact aggregate peak value calculation across all foreign accounts",
      "Official U.S. Treasury year-end conversion exchange rates",
      "Streamlined Domestic/Offshore filing procedures for late years",
      "Zero-penalty guarantee on compliant disclosures"
    ],
    pricingRef: "From $100 (FBAR Standard)",
    badge: "Zero-Penalty Focus",
    icon: Globe2
  },
  {
    id: "indian-tax",
    name: "Indian Tax & Cross-Border NRI Compliance",
    tagline: "DTAA Tax Treaty • Form 1116 • Form 67 • Indian ITR",
    desc: "Specialized dual-country tax planning for Indian diaspora, H-1B, L-1, and Green Card holders. Avoid double taxation between IRS and the Indian Income Tax Department.",
    href: "/services/indian-tax",
    forms: ["Form 1116 (FTC)", "Form 67 (India)", "Indian ITR-1/2/3", "DTAA Art. 25/23"],
    features: [
      "Direct claim of Foreign Tax Credits (FTC) to offset U.S. liabilities",
      "Indian rental income, mutual fund redemptions & NRE interest",
      "Filing Indian Income Tax Returns with dual-country reconciliation",
      "Repatriation advisory (Form 15CA / 15CB assistance)"
    ],
    pricingRef: "Custom Quote / Bundle",
    badge: "Cross-Border Experts",
    icon: Landmark
  }
];

export default function ServicesOverview() {
  return (
    <div className="flex flex-col w-full bg-[#f8fafc] min-h-screen">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#eff6ff] to-[#f8fafc] py-16 sm:py-20 border-b border-[#dbeafe]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 bg-[#dbeafe] text-[#1d4ed8] px-3.5 py-1.5 rounded-xl text-xs font-extrabold uppercase tracking-widest mb-4">
              <Sparkles className="w-4 h-4" />
              <span>Full-Spectrum Tax & Compliance Practices</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-[#0f172a] mb-4 font-display tracking-tight">
              Our Professional Tax Services
            </h1>
            <p className="text-base sm:text-lg text-[#334155] max-w-2xl mx-auto font-medium">
              Line-by-line CPA precision, cross-border international expertise, and rapid 24–48 hour draft turnaround for individuals, founders, and global families.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {allServices.map((svc) => (
              <div
                key={svc.id}
                className="bg-white rounded-3xl border-2 border-[#dbeafe] hover:border-[#1d4ed8] p-8 sm:p-10 flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-[#eff6ff] text-[#1d4ed8] flex items-center justify-center group-hover:bg-[#1d4ed8] group-hover:text-white transition-colors shadow-xs">
                      <svc.icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-wider bg-[#f1f5f9] text-[#1e40af] px-3 py-1.5 rounded-full border border-[#dbeafe]">
                      {svc.badge}
                    </span>
                  </div>

                  <h2 className="text-2xl font-black text-[#0f172a] mb-1 font-display">
                    {svc.name}
                  </h2>
                  <div className="text-xs font-bold text-[#1d4ed8] mb-4 tracking-wide">
                    {svc.tagline}
                  </div>
                  <p className="text-[#334155] text-sm leading-relaxed mb-6 font-medium">
                    {svc.desc}
                  </p>

                  {/* Forms Supported Badges */}
                  <div className="mb-6">
                    <div className="text-xs font-extrabold text-[#64748b] uppercase tracking-wider mb-2">
                      Key Tax Forms Handled:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {svc.forms.map((f) => (
                        <span
                          key={f}
                          className="text-[11px] font-bold bg-[#f8fafc] text-[#0f172a] border border-[#e2e8f0] px-2.5 py-1 rounded-lg"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bullet points */}
                  <div className="space-y-2.5 mb-8">
                    {svc.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-2 text-xs sm:text-sm font-medium text-[#334155]">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-[#f1f5f9] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-left w-full sm:w-auto">
                    <span className="text-[10px] font-extrabold uppercase text-[#64748b] block">Pricing</span>
                    <span className="text-sm font-extrabold text-[#0f172a]">{svc.pricingRef}</span>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Link
                      to={svc.href}
                      className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 bg-[#1d4ed8] hover:bg-[#1e40af] text-white px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm shadow-md transition-all active:scale-95"
                    >
                      <span>Explore Service</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Fast Action Banner */}
          <div className="bg-[#0f172a] rounded-3xl p-8 sm:p-12 text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl border border-white/10">
            <div className="space-y-3 max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-xl text-xs font-bold text-[#bfdbfe]">
                <Clock className="w-4 h-4 text-amber-300" />
                <span>Fast 24–48h Turnaround • Zero Upfront Cost to Review</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-extrabold font-display">
                Ready to File with Complete Peace of Mind?
              </h3>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed font-medium">
                Upload your tax documents to receive a complete, itemized draft and exact quote prepared by our licensed CPAs. Pay only when you are 100% satisfied.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto shrink-0">
              <Link
                to="/get-started"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-7 py-4 rounded-2xl font-black text-base shadow-xl transition-all active:scale-95"
              >
                <span>Get in touch / File Now</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/pricing"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-4 rounded-2xl font-black text-base transition-all"
              >
                <span>Compare Pricing</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
