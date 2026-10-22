/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Phone, MessageSquare, ShieldCheck, Zap, CheckCircle2 } from "lucide-react";

export function WhatsAppIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function WhatsAppCallout() {
  const whatsappUrl =
    "https://wa.me/919963260743?text=Hi%20TAXIVA%20LLC%2C%20I%20would%20like%20to%20get%20started%20with%20my%20tax%20draft%20or%20inquire%20about%20services.";

  return (
    <section className="py-14 sm:py-16 bg-gradient-to-b from-[#f8fafc] via-[#eff6ff]/60 to-white border-t border-b border-[#dbeafe] relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#25d366]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-[#1d4ed8]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl sm:rounded-[2rem] border-2 border-[#bfdbfe] p-8 sm:p-10 lg:p-12 shadow-xl hover:shadow-2xl transition-all"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Icon + Value Proposition */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 bg-[#25d366]/15 text-[#15803d] border border-[#86efac] px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
                  <span>Official WhatsApp Channel</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#1d4ed8] bg-[#eff6ff] border border-[#dbeafe] px-3 py-1.5 rounded-xl">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Instant Answers • Zero Bot Menus</span>
                </span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-black text-[#0f172a] tracking-tight font-display leading-[1.15]">
                Have a Quick Tax Question?{" "}
                <span className="text-[#15803d] underline decoration-[#86efac] underline-offset-8">
                  Chat with Our CPAs on WhatsApp
                </span>
              </h3>

              <p className="text-sm sm:text-base text-[#334155] leading-relaxed max-w-2xl font-medium">
                Connect directly with our senior U.S. and cross-border tax specialists. Send your tax questions about Form 1040, RSUs, NY LLC incorporation, FBAR deadlines, or Indian NRI repatriation anytime.
              </p>

              {/* Trust Micro-Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-bold text-[#0f172a]">
                <div className="flex items-center gap-2 bg-[#f8fafc] border border-[#dbeafe] px-3.5 py-2.5 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-[#15803d] shrink-0" />
                  <span>Direct CPA & EA Review</span>
                </div>
                <div className="flex items-center gap-2 bg-[#f8fafc] border border-[#dbeafe] px-3.5 py-2.5 rounded-xl">
                  <ShieldCheck className="w-4 h-4 text-[#1d4ed8] shrink-0" />
                  <span>IRS Sec. 7216 Protected</span>
                </div>
                <div className="flex items-center gap-2 bg-[#f8fafc] border border-[#dbeafe] px-3.5 py-2.5 rounded-xl">
                  <span className="text-base shrink-0">⚡</span>
                  <span>15-Minute Avg. Response</span>
                </div>
              </div>
            </div>

            {/* Right Column: CTA Buttons & WhatsApp Card */}
            <div className="lg:col-span-4 flex flex-col gap-3.5">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full group bg-[#25d366] hover:bg-[#20ba59] text-white px-6 py-4 rounded-2xl font-black text-sm sm:text-base transition-all shadow-lg shadow-emerald-500/25 active:scale-98 flex items-center justify-center gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <WhatsAppIcon className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="text-[11px] font-bold text-white/90 uppercase tracking-wider leading-none">
                    Start Direct Chat
                  </div>
                  <div className="text-base font-extrabold leading-tight mt-0.5">
                    +91 996-3260-743
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 ml-auto text-white group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="tel:737-381-2330"
                className="w-full bg-[#0f172a] hover:bg-[#1d4ed8] text-white px-6 py-3.5 rounded-2xl font-extrabold text-xs sm:text-sm transition-all shadow-sm active:scale-98 flex items-center justify-center gap-2.5"
              >
                <Phone className="w-4 h-4 text-sky-400" />
                <span>Call New York Office: +1 737-381-2330</span>
              </a>

              <p className="text-center text-[11px] text-[#64748b] font-medium">
                Eastern Standard Time (EST) Mon–Sat 9AM–7PM
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
