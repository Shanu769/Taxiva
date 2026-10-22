/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import {
  Star,
  Quote,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Award,
  MapPin,
  TrendingUp,
  FileText,
  Briefcase,
  Globe2,
  Landmark,
  Sparkles
} from "lucide-react";

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  location: string;
  category: "Individual & RSUs" | "Business & S-Corp" | "FBAR & Foreign Accounts" | "Cross-Border & NRI";
  formsHandled: string[];
  outcomeBadge: string;
  quote: string;
  highlight: string;
  rating: number;
  yearsClient: string;
  avatarColor: string;
}

const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: "t-1",
    name: "Sandeep Rao",
    role: "Principal Cloud Architect",
    location: "Austin, TX & Hyderabad",
    category: "Cross-Border & NRI",
    formsHandled: ["Form 1040", "Form 1116 (FTC)", "FinCEN 114 (FBAR)", "Indian ITR-2"],
    outcomeBadge: "$14,200 Saved in Double Taxation",
    highlight: "Seamless US-India DTAA Foreign Tax Credit & property capital gains compliance.",
    quote:
      "When I sold ancestral property in India while on an H-1B in Austin, I was terrified of paying capital gains tax twice. Taxiva LLC coordinated both my Indian ITR-2 and my U.S. Form 1116 Foreign Tax Credit, saving me over $14,200 in duplicate liability with zero IRS hassle.",
    rating: 5,
    yearsClient: "Client since 2022",
    avatarColor: "from-blue-600 to-indigo-800"
  },
  {
    id: "t-2",
    name: "Jennifer & Marcus Miller",
    role: "Founders, Apex Digital Consulting LLC",
    location: "Round Rock, TX",
    category: "Business & S-Corp",
    formsHandled: ["Form 1120-S", "Schedule K-1", "Form 1040", "TX Franchise Tax"],
    outcomeBadge: "$19,650 Annual S-Corp Tax Savings",
    highlight: "Restructured single-member LLC to S-Corp with compliant reasonable salary & QBI deduction.",
    quote:
      "Switching to Taxiva LLC for our consulting business was the best financial decision we've made. Their CPAs guided our Form 2553 S-Corp election, optimized Section 199A QBI deduction, and delivered our Form 1120-S and K-1s right on schedule without billing extra.",
    rating: 5,
    yearsClient: "Client since 2021",
    avatarColor: "from-blue-700 to-blue-950"
  },
  {
    id: "t-3",
    name: "Arun Kumar",
    role: "Staff Software Engineer",
    location: "San Jose, CA → Austin, TX",
    category: "Individual & RSUs",
    formsHandled: ["Form 1040", "CA 540 Part-Year", "Schedule D (RSUs)", "Form 8949"],
    outcomeBadge: "$6,840 RSU Basis Recovery",
    highlight: "Corrected supplemental RSU double-counting and multi-state California-to-Texas split.",
    quote:
      "After relocating from California to Texas mid-year with multiple RSU vesting events and ESPP sales, DIY software claimed I owed thousands. Taxiva LLC's line-by-line review caught unadjusted cost bases on my 1099-B, properly splitting my CA part-year taxes into a $6,840 refund.",
    rating: 5,
    yearsClient: "Client since 2023",
    avatarColor: "from-blue-600 to-sky-800"
  },
  {
    id: "t-4",
    name: "Dr. Priya Nair",
    role: "Attending Physician & Real Estate Investor",
    location: "Houston, TX",
    category: "FBAR & Foreign Accounts",
    formsHandled: ["FinCEN Form 114", "Form 8938 (FATCA)", "Form 8621 (PFIC)", "Schedule E"],
    outcomeBadge: "100% IRS & FinCEN Compliant",
    highlight: "Multi-account NRE/NRO foreign bank reporting and rental property depreciation.",
    quote:
      "I had multiple NRE, NRO, and FCNR accounts across Indian banks plus U.S. rental properties. Taxiva LLC organized every maximum account balance, converted currencies using official Treasury year-end rates, and submitted my FinCEN Form 114 and FATCA Form 8938 flawlessly.",
    rating: 5,
    yearsClient: "Client since 2020",
    avatarColor: "from-slate-700 to-blue-900"
  },
  {
    id: "t-5",
    name: "Meera & Karthik Iyer",
    role: "Senior Product Manager & Biotech Researcher",
    location: "Boston, MA",
    category: "Individual & RSUs",
    formsHandled: ["Form 1040 Joint", "Schedule C (Consulting)", "Schedule E Rental", "Form 1040-X"],
    outcomeBadge: "$8,320 Prior-Year Amendment Refund",
    highlight: "Amended prior returns to claim missed rental depreciation and home office write-offs.",
    quote:
      "Not only did Taxiva LLC prepare our joint federal and state returns with W-2 and consulting income, they also performed a free 3-year prior return review and filed an amended Form 1040-X that recovered $8,320 we had overpaid with previous tax software.",
    rating: 5,
    yearsClient: "Client since 2023",
    avatarColor: "from-blue-800 to-slate-900"
  },
  {
    id: "t-6",
    name: "Vikram Deshmukh",
    role: "Managing Partner, Horizon Logistics LLP",
    location: "Dallas, TX",
    category: "Business & S-Corp",
    formsHandled: ["Form 1065", "Multi-State Nexus", "Schedule K-1", "Form 4562 Depreciation"],
    outcomeBadge: "4-State Partnership Completed Early",
    highlight: "Multi-partner Form 1065 compliance, bonus depreciation, and partner K-1 distributions.",
    quote:
      "Managing a 4-partner LLC with inventory and contractors across multiple states used to delay our filings every spring. Taxiva LLC's Canopy portal made uploading P&L statements effortless, delivering all Schedule K-1s weeks ahead of the March 15 deadline.",
    rating: 5,
    yearsClient: "Client since 2022",
    avatarColor: "from-blue-600 to-slate-800"
  }
];

export default function ClientTestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const total = TESTIMONIALS_DATA.length;

  // Auto-advance every 6.5s unless hovered or interacted with
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 6500);
    return () => clearInterval(interval);
  }, [isPaused, total]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  // Framer motion drag gesture handler for desktop/tablet swipe
  const handleDragEnd = (_: any, info: { offset: { x: number }; velocity: { x: number } }) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold || info.velocity.x < -500) {
      handleNext();
    } else if (info.offset.x > swipeThreshold || info.velocity.x > 500) {
      handlePrev();
    }
  };

  const getCategoryIcon = (category: TestimonialItem["category"]) => {
    switch (category) {
      case "Individual & RSUs":
        return FileText;
      case "Business & S-Corp":
        return Briefcase;
      case "FBAR & Foreign Accounts":
        return Globe2;
      case "Cross-Border & NRI":
        return Landmark;
    }
  };

  return (
    <section
      className="py-20 sm:py-24 bg-[#0f172a] text-white relative overflow-hidden border-t border-b border-blue-900/40"
      id="client-testimonials-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Subtle architectural ambient lighting */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-600 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Header & Social Proof Authority Badges */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 pb-10 border-b border-slate-800">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-blue-950/90 border border-blue-700/60 px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest text-blue-300 mb-4">
              <Award className="w-4 h-4 text-blue-400" />
              <span>Client Testimonials & Real Outcomes</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.12] font-display">
              Trusted by Individuals, NRIs & Businesses Across{" "}
              <span className="text-blue-400 italic">All 50 States</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed font-medium">
              Real results from verified clients who filed with TAXIVA LLC. Swipe through genuine reviews highlighting IRS compliance, RSU basis adjustments, and cross-border tax savings.
            </p>
          </div>

          {/* Trust Metric Snapshot & Carousel Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-black text-lg">
                ★ 4.98
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber-400">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs font-bold text-white mt-1">Verified Client Rating</p>
                <p className="text-[11px] text-slate-400">Across 6,500+ returns filed</p>
              </div>
            </div>

            {/* Left/Right Arrow Controls */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={handlePrev}
                aria-label="Previous Testimonial"
                className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700 hover:border-blue-400 text-white flex items-center justify-center transition-all hover:bg-blue-600/20 active:scale-95 cursor-pointer shadow-md"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next Testimonial"
                className="w-12 h-12 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-lg shadow-blue-900/40"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Swipeable Carousel Viewport */}
        <div
          className="relative touch-pan-y cursor-grab active:cursor-grabbing select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Main Slide Card Container with Framer Motion drag gesture */}
          <div className="overflow-hidden py-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                className="w-full"
              >
                {(() => {
                  const item = TESTIMONIALS_DATA[currentIndex];
                  const CategoryIcon = getCategoryIcon(item.category);
                  const initials = item.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("");

                  return (
                    <div className="bg-gradient-to-br from-slate-900/95 via-slate-900/90 to-blue-950/80 border border-slate-800 hover:border-blue-500/50 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl transition-all">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                        {/* Left Side: Category, Quote, Key Outcome */}
                        <div className="lg:col-span-8 space-y-6">
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="inline-flex items-center gap-1.5 text-xs font-black text-blue-300 bg-blue-950 border border-blue-700/60 px-3 py-1 rounded-xl">
                              <CategoryIcon className="w-3.5 h-3.5 text-blue-400" />
                              {item.category}
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-300 bg-emerald-950 border border-emerald-700/60 px-3 py-1 rounded-xl">
                              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                              {item.outcomeBadge}
                            </span>
                          </div>

                          <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-snug font-display">
                            "{item.highlight}"
                          </h3>

                          <div className="relative pl-6 border-l-2 border-blue-500/60">
                            <Quote className="w-8 h-8 text-blue-500/30 absolute -top-4 -left-3" />
                            <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed font-medium">
                              {item.quote}
                            </p>
                          </div>

                          {/* Forms Handled Tags */}
                          <div className="pt-2">
                            <p className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-2">
                              Verified Forms & Schedules Prepared:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {item.formsHandled.map((form) => (
                                <span
                                  key={form}
                                  className="text-xs font-mono font-bold bg-slate-800 text-blue-200 border border-slate-700 px-3 py-1 rounded-lg"
                                >
                                  {form}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Right Side: Verified Client Profile Card */}
                        <div className="lg:col-span-4 bg-slate-950/70 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
                          <div>
                            <div className="flex items-center gap-4 mb-4">
                              <div
                                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.avatarColor} border border-white/20 flex items-center justify-center text-white font-black text-lg shadow-lg shrink-0`}
                              >
                                {initials}
                              </div>
                              <div>
                                <h4 className="text-lg font-black text-white">{item.name}</h4>
                                <p className="text-xs text-blue-300 font-semibold">{item.role}</p>
                                <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                                  <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                                  <span>{item.location}</span>
                                </p>
                              </div>
                            </div>

                            <div className="pt-3 border-t border-slate-800/80 space-y-2">
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-slate-400">Review Rating:</span>
                                <div className="flex items-center gap-0.5">
                                  {[1, 2, 3, 4, 5].map((s) => (
                                    <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                  ))}
                                </div>
                              </div>
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-slate-400">Relationship:</span>
                                <span className="text-emerald-400 font-bold">{item.yearsClient}</span>
                              </div>
                              <div className="flex items-center justify-between text-xs">
                                <span className="text-slate-400">Filing Method:</span>
                                <span className="text-white font-mono text-[11px]">Canopy CPA Portal</span>
                              </div>
                            </div>
                          </div>

                          <div className="pt-4 border-t border-slate-800">
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-300 mb-3">
                              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                              <span>100% CPA Line-by-Line Audited</span>
                            </div>
                            <Link
                              to="/get-started"
                              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
                            >
                              <span>Book Your Tax Draft</span>
                              <ArrowRight className="w-4 h-4" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Pagination & Quick Slide Selector */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Swipe Hint */}
          <div className="text-xs text-slate-400 font-medium flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span>Swipe left or right to explore all verified client stories</span>
          </div>

          {/* Dot Indicators */}
          <div className="flex items-center gap-2">
            {TESTIMONIALS_DATA.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Jump to review ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentIndex === idx
                    ? "w-8 h-2.5 bg-blue-400"
                    : "w-2.5 h-2.5 bg-slate-700 hover:bg-slate-500"
                }`}
              />
            ))}
          </div>

          {/* Slide Counter */}
          <div className="text-xs font-mono font-bold text-slate-400">
            <span className="text-white">{currentIndex + 1}</span> / {total}
          </div>
        </div>
      </div>
    </section>
  );
}
