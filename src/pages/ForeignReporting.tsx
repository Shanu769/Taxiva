/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ShieldAlert, Globe, AlertTriangle, ArrowRight, ShieldCheck, CheckCircle2, Sparkles, Landmark, FileText } from "lucide-react";
import TaxFilingArtwork from "../components/TaxFilingArtwork";

const reportingItems = [
  { name: "FinCEN Form 114 (FBAR)", desc: "Mandatory if aggregate foreign accounts exceed $10,000 at any time during the year." },
  { name: "FATCA Form 8938", desc: "IRS statement of specified foreign financial assets filed with your Form 1040." },
  { name: "NRE / NRO Bank Balances", desc: "Currency conversion using official U.S. Treasury year-end exchange rates." },
  { name: "Form 8621 (PFIC Analysis)", desc: "Reporting for Indian mutual funds, SIPs, and foreign investment funds." },
  { name: "Foreign Real Estate & Rental", desc: "Dual depreciation schedules and municipal tax offset reporting." },
  { name: "Form 3520 / 3520-A (Foreign Gifts)", desc: "Gifts or inheritances received from non-resident foreign individuals." },
  { name: "Foreign Tax Credit (Form 1116)", desc: "Offsetting U.S. tax liability by foreign taxes paid at source (TDS)." },
  { name: "Streamlined Domestic Filing", desc: "Penalty-free voluntary disclosure procedures for delinquent prior-year accounts." }
];

export default function ForeignReporting() {
  return (
    <div className="flex flex-col w-full bg-white text-[#0f172a] overflow-hidden">
      {/* Hero Section */}
      <section className="bg-slate-950 py-20 lg:py-24 text-white border-b border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55 }}
              className="lg:col-span-6"
            >
              <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-3.5 py-1.5 rounded-xl mb-4 backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>FinCEN Form 114 • IRS Form 8938 (FATCA)</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-bold mb-6 font-display tracking-tight leading-[1.1]">
                FBAR, FATCA & <span className="text-emerald-400 italic">Foreign Reporting</span>
              </h1>

              <p className="text-lg sm:text-xl text-blue-100 leading-relaxed mb-8 font-normal">
                Navigate U.S. reporting requirements for overseas bank accounts, NRE/NRO balances, mutual funds, and foreign assets with CPA-verified, 100% penalty-free accuracy.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/get-started"
                  className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 px-7 py-3.5 rounded-xl font-extrabold text-base hover:bg-amber-300 transition-all shadow-lg active:scale-95"
                >
                  <span>Start Your FBAR Filing</span>
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
                  variant="fbar-fincen114"
                  alt="FBAR FinCEN Form 114 and FATCA Form 8938 Foreign Account Reporting Visual"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Reporting Guidelines */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mb-16"
          >
            <span className="text-xs font-black uppercase tracking-wider text-[#1d4ed8] bg-[#eff6ff] px-3.5 py-1.5 rounded-full border border-[#dbeafe] mb-3 inline-block">
              International Tax Law
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0f172a] font-display">
              Penalty-Free International Asset Disclosures
            </h2>
            <p className="text-[#475569] text-base sm:text-lg mt-3 font-medium leading-relaxed">
              If you hold financial interests in or signature authority over foreign financial accounts exceeding $10,000, civil non-willful penalties can exceed $10,000 per violation. We ensure full Treasury compliance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reportingItems.map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="p-6 bg-[#f8fafc] rounded-2xl border border-[#dbeafe] hover:border-[#1d4ed8] hover:bg-white hover:shadow-lg transition-all group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-[#eff6ff] text-[#1d4ed8] flex items-center justify-center font-bold text-xs shrink-0 group-hover:bg-[#1d4ed8] group-hover:text-white transition-colors">
                    ✓
                  </div>
                  <h3 className="font-extrabold text-base sm:text-lg text-[#0f172a] group-hover:text-[#1d4ed8] transition-colors font-display">
                    {item.name}
                  </h3>
                </div>
                <p className="text-sm text-[#475569] pl-12 font-medium leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Bottom Security Callout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 bg-[#eff6ff] rounded-3xl p-8 sm:p-12 border border-[#bfdbfe] flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="space-y-2 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-bold text-[#1d4ed8] uppercase tracking-wide">
                <ShieldCheck className="w-4 h-4" />
                <span>IRS Sec. 7216 & Bank-Grade Security</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#0f172a] font-display">
                Ready to file your FinCEN 114 & Form 8938?
              </h3>
              <p className="text-sm sm:text-base text-[#475569] font-medium max-w-xl">
                Upload your year-end statements safely via our 256-bit AES encrypted Canopy portal. Our licensed CPAs calculate maximum balances and file with the Treasury.
              </p>
            </div>

            <Link
              to="/get-started"
              className="bg-[#1d4ed8] hover:bg-[#1e40af] text-white px-8 py-4 rounded-xl font-black text-sm shadow-xl active:scale-95 transition-all whitespace-nowrap flex items-center gap-2"
            >
              <span>Get in touch</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
