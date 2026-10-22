/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  Gift,
  Lock,
  BadgeCheck,
  RefreshCw
} from "lucide-react";
import PricingTable from "../components/PricingTable";
import ConsultationModal from "../components/ConsultationModal";
import { PricingSkeleton } from "../components/Skeleton";

export default function Pricing() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Perceived performance: simulate instant external schedule & fee matrix sync
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen bg-white text-[#0f172a]">
      {/* Hero Header */}
      <section
        className="py-16 sm:py-20 relative overflow-hidden text-white"
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 45%, #1d4ed8 100%)"
        }}
      >
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 text-left"
            >
              <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 px-3.5 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest text-[#93c5fd] mb-4">
                <Sparkles className="w-4 h-4 text-white" />
                <span>Upfront Flat Fees • Zero Hidden Costs</span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-black text-white mb-5 tracking-tight font-display leading-[1.1]">
                Transparent, Value-Based{" "}
                <span className="italic underline decoration-white/40 underline-offset-8">
                  Pricing
                </span>
              </h1>
              <p className="text-base sm:text-lg text-white/85 max-w-xl font-medium leading-relaxed">
                Every return is prepared by licensed CPAs and IRS Enrolled Agents with clear, flat pricing. We confirm the final price before starting; if your situation turns out simpler, you pay the lower plan.
              </p>
            </motion.div>

            {/* Exclusive Referral Offer Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="lg:col-span-5 bg-white/10 border border-white/25 p-7 sm:p-8 rounded-3xl backdrop-blur-md relative shadow-2xl"
            >
              <div className="inline-flex items-center gap-1.5 bg-white text-[#0f172a] px-3.5 py-1 rounded-xl text-xs font-black uppercase tracking-widest shadow-md mb-4">
                <Gift className="w-3.5 h-3.5 text-[#1d4ed8]" />
                <span>Exclusive Offer</span>
              </div>
              <h3 className="text-2xl font-black text-white mb-2 font-display">
                Refer a Friend & Earn <span className="underline font-black text-[#93c5fd]">$20</span>
              </h3>
              <p className="text-white/85 text-xs sm:text-sm mb-6 leading-relaxed font-medium">
                Invite colleagues and friends to TAXIVA LLC. You receive a $20 instant credit for every successful return completed through our encrypted portal.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  to="/get-started"
                  className="bg-white text-[#0f172a] hover:bg-[#eff6ff] px-5 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all shadow-md active:scale-95 inline-flex items-center gap-2"
                >
                  <span>Join Referral Program</span>
                  <ArrowRight className="w-4 h-4 text-[#1d4ed8]" />
                </Link>
                <button
                  onClick={() => setIsConsultationOpen(true)}
                  className="border border-white/35 text-white hover:bg-white/10 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer"
                >
                  Book 30-Min Call
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main 3-Tab Pricing Component Matching Reference Images or Skeleton Loader */}
      {isLoading ? (
        <div className="w-full bg-[#f6f3ee] py-14 sm:py-20">
          <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
            <PricingSkeleton />
          </div>
        </div>
      ) : (
        <PricingTable onOpenConsultation={() => setIsConsultationOpen(true)} />
      )}

      {/* Trust & Guarantee Strip */}
      <section className="py-12 bg-white border-t border-[#dbeafe]">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3.5 p-5 bg-[#f8fafc] rounded-2xl border border-[#dbeafe]">
              <div className="w-10 h-10 rounded-xl bg-[#eff6ff] text-[#1d4ed8] flex items-center justify-center shrink-0">
                <BadgeCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-[#0f172a]">100% Price Lock Guarantee</h4>
                <p className="text-xs text-[#475569] mt-1 font-medium">
                  We confirm your price in writing before any tax work starts. Zero hourly surprises.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-5 bg-[#f8fafc] rounded-2xl border border-[#dbeafe]">
              <div className="w-10 h-10 rounded-xl bg-[#eff6ff] text-[#1d4ed8] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-[#0f172a]">Audit & Notice Guidance</h4>
                <p className="text-xs text-[#475569] mt-1 font-medium">
                  If the IRS or state sends a letter on a return we prepared, we review it with you for free.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-5 bg-[#f8fafc] rounded-2xl border border-[#dbeafe]">
              <div className="w-10 h-10 rounded-xl bg-[#eff6ff] text-[#1d4ed8] flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-[#0f172a]">SOC 2 & 256-Bit Security</h4>
                <p className="text-xs text-[#475569] mt-1 font-medium">
                  All tax documents are managed via our encrypted Canopy Client Portal under IRS Sec. 7216.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Fast Action Banner */}
          <div className="mt-12 bg-gradient-to-r from-[#0f172a] via-[#1e3a8a] to-[#1d4ed8] rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="text-left space-y-2">
              <span className="text-xs font-black tracking-widest text-[#93c5fd] uppercase">
                Ready to review your tax forms?
              </span>
              <h3 className="text-2xl sm:text-3xl font-black font-display">
                Get an Accurate, Zero-Obligation Tax Draft Today
              </h3>
              <p className="text-sm text-white/85 max-w-xl font-medium">
                Upload your W-2, 1099, K-1, or Indian income summaries. Our licensed CPAs will prepare an initial estimate before any charge.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
              <Link
                to="/get-started"
                className="w-full sm:w-auto bg-white text-[#0f172a] hover:bg-[#eff6ff] px-6 py-3.5 rounded-xl font-black text-sm transition-all shadow-md active:scale-95 text-center"
              >
                Start Free Tax Draft
              </Link>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="w-full sm:w-auto border border-white/30 hover:bg-white/10 text-white px-5 py-3.5 rounded-xl font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Back to Top</span>
                <ArrowRight className="w-4 h-4 -rotate-90" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </div>
  );
}
