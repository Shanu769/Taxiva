/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion, type Variants } from "motion/react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Calendar, MessageSquare, Sparkles, ShieldCheck } from "lucide-react";

const sectionStaggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
};

const slideUpItemVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut"
    }
  }
};

interface TaxExpertsProps {
  onBookConsultation: (expertName?: string) => void;
}

interface ExpertItem {
  id: string;
  name: string;
  exp: string;
  actionType: "consultation" | "contact";
  actionLabel: string;
  firm: string;
  specialty: string;
  avatarUrl: string;
}

const EXPERT_DATA: ExpertItem[] = [
  {
    id: "priyanka",
    name: "Priyanka A.",
    exp: "19+ years of experience",
    actionType: "consultation",
    actionLabel: "Book Consultation",
    firm: "Ex-PwC / Big Four Director",
    specialty: "Equity Comp, RSUs, ESPP & International Advisory",
    avatarUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "john",
    name: "John Z.",
    exp: "15+ years of experience",
    actionType: "contact",
    actionLabel: "Get in touch",
    firm: "Ex-EY Senior Tax Manager",
    specialty: "S-Corp (1120-S), Multi-State Corporate & Partnership Tax",
    avatarUrl: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "alex",
    name: "Alex C.",
    exp: "5+ years of experience",
    actionType: "consultation",
    actionLabel: "Book Consultation",
    firm: "IRS Enrolled Agent",
    specialty: "High-Volume Stock/Crypto & Individual 1040 Optimization",
    avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "narendra",
    name: "Narendra Balaji",
    exp: "15+ years of experience",
    actionType: "contact",
    actionLabel: "Get in touch",
    firm: "Ex-KPMG International Tax Lead",
    specialty: "FinCEN 114 FBAR, FATCA 8938 & NRI Cross-Border Filings",
    avatarUrl: "https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "shanmukh",
    name: "Shanmukh R.",
    exp: "12+ years of experience",
    actionType: "consultation",
    actionLabel: "Book Consultation",
    firm: "Dual CPA & Chartered Accountant",
    specialty: "US–India DTAA, Form 1116 Foreign Tax Credit & Entity Formation",
    avatarUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600"
  }
];


export default function TaxExperts({ onBookConsultation }: TaxExpertsProps) {
  const navigate = useNavigate();

  const handleCardClick = (expert: ExpertItem) => {
    if (expert.actionType === "consultation") {
      onBookConsultation(expert.name);
    } else {
      navigate(`/get-started?expert=${encodeURIComponent(expert.name)}&type=contact`);
    }
  };

  return (
    <motion.section
      variants={sectionStaggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className="py-20 sm:py-24 bg-white text-[#0f172a] border-t border-[#dbeafe] relative overflow-hidden"
    >
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Blue Accent Styling */}
        <motion.div variants={slideUpItemVariants} className="text-center max-w-4xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-[#eff6ff] text-[#1d4ed8] border border-[#dbeafe] px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#1d4ed8]" />
            <span>Licensed CPAs, EAs & Big Four Alumni</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-black tracking-tight text-[#0f172a] font-display leading-[1.12] mb-5">
            Built by Tax Experts{" "}
            <span className="block sm:inline font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#1d4ed8] via-[#2563eb] to-[#3b82f6]">
              from the World&apos;s Best Firms
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#334155]/90 font-medium max-w-2xl mx-auto leading-relaxed">
            Our team brings decades of experience from Big Four and elite firms. We specialize in equity compensation and complex tax situations.
          </p>
        </motion.div>

        {/* 5 Expert Cards in a Single Balanced Row on Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6">
          {EXPERT_DATA.map((expert) => {
            const isConsult = expert.actionType === "consultation";
            return (
              <motion.div
                key={expert.id}
                variants={slideUpItemVariants}
                onClick={() => handleCardClick(expert)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleCardClick(expert);
                  }
                }}
                className="group cursor-pointer bg-white rounded-3xl p-3 sm:p-3.5 border border-[#dbeafe] hover:border-[#1d4ed8] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-left focus:outline-none focus:ring-2 focus:ring-[#1d4ed8]"
              >
                <div>
                  {/* Portrait Container with Crisp Blue-Tinted Rounded Frame */}
                  <div className="w-full aspect-[4/4.3] rounded-2xl overflow-hidden relative bg-gradient-to-b from-[#dbeafe] via-[#eff6ff] to-[#f8fafc] border border-[#bfdbfe]/70 shadow-inner mb-3.5 group-hover:border-[#1d4ed8]/50 transition-colors">
                    <img
                      src={expert.avatarUrl}
                      alt={`Tax Expert ${expert.name} - ${expert.exp}`}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Quick Badge */}
                    <div className="absolute top-2.5 right-2.5 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md text-[10px] font-extrabold text-[#0f172a] shadow-xs border border-white/40 flex items-center gap-1">
                      {isConsult ? (
                        <>
                          <Calendar className="w-3 h-3 text-[#1d4ed8]" />
                          <span>30-min call</span>
                        </>
                      ) : (
                        <>
                          <MessageSquare className="w-3 h-3 text-[#1d4ed8]" />
                          <span>Direct form</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Name & Experience Title */}
                  <div className="px-1 mb-2">
                    <h3 className="text-lg sm:text-xl font-black text-[#0f172a] tracking-tight group-hover:text-[#1d4ed8] transition-colors leading-tight font-display">
                      {expert.name}
                    </h3>
                    <p className="text-xs sm:text-[13px] font-semibold text-[#475569] mt-0.5">
                      {expert.exp}
                    </p>
                    <p className="text-[11px] font-bold text-[#1d4ed8] mt-1 line-clamp-1">
                      {expert.firm}
                    </p>
                    <p className="text-[11px] text-[#64748b] mt-1 line-clamp-2 leading-relaxed">
                      {expert.specialty}
                    </p>
                  </div>
                </div>

                {/* Card Footer Button */}
                <div className="pt-2 px-1">
                  <div
                    className={`w-full py-2.5 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all shadow-xs ${
                      isConsult
                        ? "bg-[#1d4ed8] text-white group-hover:bg-[#1e40af]"
                        : "bg-[#0f172a] text-white group-hover:bg-[#1d4ed8]"
                    }`}
                  >
                    {isConsult ? (
                      <>
                        <Calendar className="w-3.5 h-3.5 shrink-0" />
                        <span>Book consultation</span>
                      </>
                    ) : (
                      <>
                        <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                        <span>Get in touch</span>
                      </>
                    )}
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform shrink-0" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Reassurance Banner */}
        <motion.div variants={slideUpItemVariants} className="mt-12 max-w-3xl mx-auto bg-[#f8fafc] border border-[#dbeafe] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#eff6ff] text-[#1d4ed8] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-extrabold text-[#0f172a]">
                Direct CPA & EA Review on Every Single Return
              </p>
              <p className="text-[11px] text-[#475569]">
                Zero seasonal contractors. Every return is signed by licensed U.S. practitioners.
              </p>
            </div>
          </div>
          <button
            onClick={() => onBookConsultation("Priyanka A.")}
            className="bg-white hover:bg-[#eff6ff] text-[#1d4ed8] border border-[#bfdbfe] px-4 py-2 rounded-xl text-xs font-extrabold shrink-0 shadow-xs transition-all cursor-pointer"
          >
            Schedule Free 30-Min Call
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
}
