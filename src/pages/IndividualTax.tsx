/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { CheckCircle2, DollarSign, Calculator, HelpCircle, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import TaxFilingArtwork from "../components/TaxFilingArtwork";

const services = [
  "W-2 employee tax returns",
  "1099-NEC / self-employment income",
  "Schedule C business income",
  "Stock sales / Form 1099-B",
  "RSU and ESPP reporting",
  "Crypto transactions",
  "Rental property income",
  "Mortgage interest & itemized deductions",
  "Child tax credit & education credits",
  "W-7 assistance / ITIN Support",
  "Amendment filing (Form 1040-X)",
  "Extension filing (Form 4868)",
  "Multi-state tax returns & part-year splits",
];

export default function IndividualTax() {
  return (
    <div className="flex flex-col w-full bg-white text-[#0f172a] overflow-hidden">
      {/* Hero Section */}
      <section className="bg-slate-950 py-20 lg:py-24 text-white relative overflow-hidden border-b border-slate-800">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55 }}
              className="lg:col-span-6"
            >
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-amber-400 bg-blue-950 border border-blue-800/80 px-3.5 py-1.5 rounded-xl mb-4 backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>IRS Form 1040 • All 50 States</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-bold mb-6 font-display tracking-tight leading-[1.1]">
                Individual <span className="text-amber-400 italic">Tax Filing</span>
              </h1>

              <p className="text-lg sm:text-xl text-blue-100 leading-relaxed mb-8 font-normal">
                Taxiva LLC provides CPA-reviewed federal and multi-state tax preparation for individuals, families, W-2 & 1099 professionals, RSU/ESPP equity holders, and real estate investors.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/get-started"
                  className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 px-7 py-3.5 rounded-xl font-extrabold text-base hover:bg-amber-300 transition-all shadow-lg active:scale-95"
                >
                  <span>Start Your Individual Return</span>
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
                  variant="individual-1040"
                  alt="Individual Form 1040 Tax Filing Visual Showcase"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Comprehensive Coverage & Value */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-[#1d4ed8] bg-[#eff6ff] px-3.5 py-1.5 rounded-full border border-[#dbeafe] mb-3 inline-block">
                  Line-by-Line CPA Preparation
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-[#0f172a] font-display flex items-center gap-3">
                  <CheckCircle2 className="w-8 h-8 text-[#1d4ed8]" />
                  <span>Comprehensive Coverage</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {services.map((service, idx) => (
                  <motion.div
                    key={service}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.03 }}
                    whileHover={{ x: 4, transition: { duration: 0.15 } }}
                  >
                    <Link
                      to="/get-started"
                      className="flex items-center gap-3 p-3.5 bg-[#f8fafc] hover:bg-[#eff6ff] rounded-2xl border border-[#dbeafe] hover:border-[#1d4ed8] text-[#334155] hover:text-[#1d4ed8] transition-all group"
                    >
                      <div className="w-2 h-2 bg-[#1d4ed8] rounded-full shrink-0 group-hover:scale-150 transition-transform" />
                      <span className="text-xs sm:text-sm font-bold leading-snug">{service}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="space-y-6"
            >
              <div className="bg-[#eff6ff] rounded-3xl p-8 border border-[#bfdbfe] shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <DollarSign className="w-24 h-24 text-[#1d4ed8]" />
                </div>
                <span className="text-xs font-black uppercase tracking-wider text-[#1d4ed8] block mb-2">
                  Upfront Flat Fees
                </span>
                <h3 className="text-2xl font-black text-[#0f172a] mb-3 font-display">Transparent Pricing</h3>
                <p className="text-[#475569] mb-6 text-sm sm:text-base leading-relaxed font-medium">
                  We confirm your price before starting any work. Pick the plan that fits your schedules, with zero hourly surprise add-ons.
                </p>
                <Link
                  to="/pricing"
                  className="bg-[#1d4ed8] hover:bg-[#1e40af] text-white px-6 py-3 rounded-xl font-extrabold text-sm inline-flex items-center gap-2 transition-all shadow-md active:scale-95"
                >
                  <span>Explore Pricing & Plans</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-[#dbeafe] shadow-sm space-y-4">
                <h3 className="text-2xl font-black text-[#0f172a] font-display flex items-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-[#1d4ed8]" />
                  <span>Why Choose Taxiva LLC?</span>
                </h3>
                <ul className="space-y-4 divide-y divide-slate-100 pt-2">
                  <li className="flex gap-4 pt-3">
                    <div className="font-black text-[#1d4ed8] text-base font-mono">01</div>
                    <p className="text-xs sm:text-sm text-[#475569] font-medium leading-relaxed">
                      Proactive guidance on RSU, ESPP, and stock compensation cost-basis adjustments to prevent double-taxation.
                    </p>
                  </li>
                  <li className="flex gap-4 pt-3">
                    <div className="font-black text-[#1d4ed8] text-base font-mono">02</div>
                    <p className="text-xs sm:text-sm text-[#475569] font-medium leading-relaxed">
                      Multi-state part-year and non-resident allocation for remote tech workers relocating across state lines.
                    </p>
                  </li>
                  <li className="flex gap-4 pt-3">
                    <div className="font-black text-[#1d4ed8] text-base font-mono">03</div>
                    <p className="text-xs sm:text-sm text-[#475569] font-medium leading-relaxed">
                      Schedule C business and rental property deduction optimization reviewed by licensed CPAs and IRS Enrolled Agents.
                    </p>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
