/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  Briefcase,
  Building2,
  Users,
  FileText,
  BarChart3,
  Rocket,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Landmark
} from "lucide-react";
import TaxFilingArtwork from "../components/TaxFilingArtwork";

const returns = [
  { type: "Sole Proprietor / Single-Member LLC", form: "Schedule C / Form 1040", benefit: "Expense write-offs & SE tax" },
  { type: "Partnership / Multi-Member LLC", form: "Form 1065 & Schedule K-1", benefit: "Partner capital allocation" },
  { type: "S-Corporation (Pass-Through)", form: "Form 1120-S & Schedule K-1", benefit: "Reasonable salary & 20% QBI" },
  { type: "C-Corporation", form: "Form 1120", benefit: "Corporate deductions & R&D" },
  { type: "Foreign-Owned U.S. LLC", form: "Form 5472 / Pro Forma 1120", benefit: "Zero-penalty foreign disclosure" },
  { type: "New York (NY) Main Company Formation", form: "NY LLC / Corp & 50-State Filing", benefit: "EIN, Operating Agreement & BOI" },
  { type: "Payroll / Contractor Compliance", form: "W-2, 1099-NEC & State Franchise", benefit: "Automated quarterly filings" },
];

export default function BusinessTax() {
  return (
    <div className="flex flex-col w-full bg-white text-[#0f172a] overflow-hidden">
      {/* Hero Section */}
      <section className="bg-slate-950 py-20 lg:py-24 text-white border-b border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

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
                <span>Forms 1120-S • 1065 • 1120 • Schedule K-1</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-bold mb-6 font-display tracking-tight leading-[1.1]">
                Business <span className="text-amber-400 italic">Tax Filing</span> & Formation
              </h1>

              <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-8 font-normal">
                Taxiva LLC supports small businesses, LLCs, partnerships, S corporations, and consultants with proactive corporate tax planning and multi-state compliance.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/get-started"
                  className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 px-7 py-3.5 rounded-xl font-extrabold text-base hover:bg-amber-300 transition-all shadow-lg active:scale-95"
                >
                  <span>Start Your Business Return</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  to="/pricing"
                  className="inline-flex items-center gap-2 bg-slate-900 text-white border border-slate-700 hover:border-slate-500 px-6 py-3.5 rounded-xl font-bold text-base transition-all"
                >
                  <span>Explore Pricing</span>
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
                  variant="business-1120s"
                  alt="Business Tax Filing S-Corp 1120-S and Partnership 1065 Visual Showcase"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Returns Table & Additional Services */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Returns Table Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-7 space-y-6"
            >
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-[#1d4ed8] bg-[#eff6ff] px-3.5 py-1.5 rounded-full border border-[#dbeafe] mb-3 inline-block">
                  Supported Entity Returns
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-[#0f172a] font-display">
                  Corporate & Pass-Through Filing
                </h2>
                <p className="text-[#475569] text-base mt-2 font-medium">
                  We prepare federal, state, and local returns with full K-1 distribution tracking and deduction optimization.
                </p>
              </div>

              <div className="overflow-hidden bg-white border border-[#dbeafe] rounded-3xl shadow-sm">
                <div className="divide-y divide-slate-100">
                  {returns.map((item, idx) => (
                    <motion.div
                      key={item.type}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      whileHover={{ backgroundColor: "#eff6ff", transition: { duration: 0.15 } }}
                      className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group cursor-pointer transition-colors"
                    >
                      <div>
                        <h4 className="font-extrabold text-[#0f172a] group-hover:text-[#1d4ed8] transition-colors text-sm sm:text-base">
                          {item.type}
                        </h4>
                        <p className="text-xs text-[#64748b] font-medium mt-0.5">{item.benefit}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs font-mono font-bold bg-white border border-[#bfdbfe] text-[#1d4ed8] px-3 py-1 rounded-lg">
                          {item.form}
                        </span>
                        <ArrowRight className="w-4 h-4 text-[#94a3b8] group-hover:text-[#1d4ed8] group-hover:translate-x-1 transition-all" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Additional Services Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="lg:col-span-5 space-y-6"
            >
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-[#1d4ed8] bg-[#eff6ff] px-3.5 py-1.5 rounded-full border border-[#dbeafe] mb-3 inline-block">
                  Year-Round Strategy
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#0f172a] font-display">
                  Corporate Advisory & Formation
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[
                  { title: "S-Corp Salary & QBI", icon: Rocket, desc: "20% deduction audit" },
                  { title: "Payroll & W-2s", icon: Users, desc: "State payroll withholding" },
                  { title: "1099-NEC Filings", icon: BarChart3, desc: "Contractor reporting" },
                  { title: "Entity Formation", icon: Building2, desc: "NY & 50-State setups" },
                  { title: "Multi-State Nexus", icon: FileText, desc: "Franchise tax compliance" },
                  { title: "Quarterly Estimates", icon: Briefcase, desc: "IRS payment schedules" },
                ].map((service, idx) => (
                  <motion.div
                    key={service.title}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="p-4 bg-[#f8fafc] rounded-2xl border border-[#dbeafe] hover:border-[#1d4ed8] hover:bg-white hover:shadow-md transition-all group cursor-pointer"
                  >
                    <div className="w-10 h-10 bg-white border border-[#dbeafe] rounded-xl flex items-center justify-center text-[#1d4ed8] mb-3 group-hover:bg-[#1d4ed8] group-hover:text-white transition-colors">
                      <service.icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-extrabold text-sm text-[#0f172a] group-hover:text-[#1d4ed8] transition-colors">
                      {service.title}
                    </h4>
                    <p className="text-[11px] text-[#64748b] mt-0.5">{service.desc}</p>
                  </motion.div>
                ))}
              </div>

              <div className="p-6 rounded-2xl bg-[#eff6ff] border border-[#bfdbfe]">
                <div className="flex items-center gap-2 font-bold text-xs text-[#1d4ed8] uppercase tracking-wide mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Transparent Upfront Fees</span>
                </div>
                <p className="text-xs text-[#334155] font-medium leading-relaxed">
                  We quote all corporate engagements upfront. You review draft Form 1120-S or 1065 before payment and e-filing.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#0f172a] via-[#1e3a8a] to-[#1d4ed8] text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto px-4 text-center space-y-6"
        >
          <span className="inline-block text-xs font-black uppercase tracking-widest text-sky-300 bg-white/10 px-4 py-1.5 rounded-full border border-white/20">
            Dedicated Business Desk
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight">
            Need Expert Business Tax Filing?
          </h2>
          <p className="text-white/85 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
            Let licensed CPAs handle your Form 1120-S, 1065, or 1120 while you focus on scaling your business. Receive your complete draft return within 24–48 hours.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/get-started"
              className="bg-amber-400 text-slate-950 hover:bg-amber-300 px-8 py-4 rounded-xl font-black text-base shadow-xl transition-all active:scale-95 inline-flex items-center gap-2"
            >
              <span>Book Business Consultation</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
