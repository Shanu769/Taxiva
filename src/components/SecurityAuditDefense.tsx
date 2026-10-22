/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { Shield, Lock, CheckCircle2 } from "lucide-react";

export default function SecurityAuditDefense() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="py-14 sm:py-16 bg-white border-t border-b border-[#e2e8f0]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#e2e8f0] p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: "Your Data, Fully Protected" */}
            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-bold text-[#0f172a] tracking-tight leading-[1.1] font-serif">
                Your Data,{" "}
                <span className="italic text-[#1d4ed8] font-serif">
                  Fully Protected
                </span>
              </h2>

              <p className="text-base sm:text-lg text-[#334155] font-medium max-w-xl">
                Your data deserve top-tier security, and you deserve true peace of mind.
              </p>

              {/* Badges Row matching screenshot */}
              <div className="flex flex-wrap items-center gap-6 pt-4">
                {/* IRS Authorized e-filer Badge */}
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full border border-[#cbd5e1] bg-white flex items-center justify-center p-2 shadow-xs shrink-0">
                    <div className="text-center font-serif font-black text-[#0f172a] text-xs leading-none">
                      <span className="block text-[8px] uppercase tracking-tighter text-[#475569]">US</span>
                      IRS
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-black text-[#0f172a] leading-none">IRS</div>
                    <div className="text-xs text-[#64748b] font-medium mt-0.5">Authorized e-filer</div>
                  </div>
                </div>

                {/* AICPA SOC 2 Compliant Badge */}
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full border border-[#0284c7]/40 bg-gradient-to-br from-[#0284c7] to-[#0369a1] text-white flex flex-col items-center justify-center p-2 shadow-xs shrink-0">
                    <span className="text-[7px] font-black uppercase tracking-wider text-white/90 leading-tight">AICPA</span>
                    <span className="text-[10px] font-extrabold text-white leading-tight">SOC</span>
                  </div>
                  <div>
                    <div className="text-sm font-black text-[#0f172a] leading-none">SOC 2</div>
                    <div className="text-xs text-[#64748b] font-medium mt-0.5">Compliant</div>
                  </div>
                </div>

                {/* IRS Sec. 7216 Badge */}
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full border border-[#059669]/40 bg-[#ecfdf5] text-[#059669] flex items-center justify-center p-2 shadow-xs shrink-0">
                    <Lock className="w-6 h-6 text-[#059669]" />
                  </div>
                  <div>
                    <div className="text-sm font-black text-[#0f172a] leading-none">Sec. 7216</div>
                    <div className="text-xs text-[#64748b] font-medium mt-0.5">Confidentiality</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: ProtectionPlus $1 MILLION TAX AUDIT DEFENSE™ matching screenshot */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-end text-center lg:text-right">
              <div className="max-w-md w-full bg-white border-2 border-[#1e3a8a]/20 rounded-2xl p-6 sm:p-8 flex flex-col items-center text-center shadow-xs">
                {/* Arch brand header */}
                <div className="flex flex-col items-center mb-1">
                  <svg className="w-20 h-5 text-[#1e3a8a]" viewBox="0 0 100 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M10 20 Q50 0 90 20" />
                  </svg>
                  <span className="text-sm sm:text-base font-extrabold text-[#1e3a8a] tracking-tight">
                    ProtectionPlus
                  </span>
                </div>

                <div className="w-full border-t-2 border-[#1e3a8a] my-2" />

                {/* Big $1 MILLION */}
                <div className="text-4xl sm:text-5xl font-black text-[#0f2c59] tracking-tight font-sans py-1">
                  $1 MILLION
                </div>

                {/* Subtitle */}
                <div className="text-xs sm:text-sm font-black text-[#0f2c59] uppercase tracking-widest">
                  TAX AUDIT DEFENSE™
                </div>

                <div className="w-full border-b-2 border-[#1e3a8a] my-2" />

                <p className="text-[11px] text-[#475569] font-medium leading-relaxed mt-1">
                  Complete professional audit representation, document defense, and inquiry resolution by licensed CPAs and Enrolled Agents.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
