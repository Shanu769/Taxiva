/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import {
  Star,
  Quote,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Globe2,
  Briefcase,
  FileText,
  Landmark,
  TrendingUp,
  Award,
  MapPin
} from "lucide-react";

export interface TestimonialStory {
  id: string;
  name: string;
  role: string;
  location: string;
  category: "Individual & Multi-State" | "Business & S-Corp" | "FBAR & Foreign Reporting" | "Indian Tax & NRI";
  formsHandled: string[];
  outcomeBadge: string;
  quote: string;
  highlight: string;
  rating: number;
  yearsClient: string;
  avatarUrl: string;
}

const TESTIMONIAL_STORIES: TestimonialStory[] = [
  {
    id: "story-1",
    name: "Sandeep Rao",
    role: "Principal Cloud Architect",
    location: "Austin, TX & Hyderabad, India",
    category: "Indian Tax & NRI",
    formsHandled: ["Form 1040", "Form 1116 (FTC)", "FinCEN 114 (FBAR)", "Indian ITR-2"],
    outcomeBadge: "$14,200 Double-Taxation Saved",
    highlight: "Seamless US-India DTAA Foreign Tax Credit & NRI property capital gains compliance.",
    quote:
      "When I sold ancestral property in India while working on an H-1B in Austin, I was terrified of paying capital gains tax twice. Taxiva LLC coordinated both my Indian ITR-2 and my U.S. Form 1116 Foreign Tax Credit, saving me over $14,200 in duplicate tax liability and handling my FBAR & Form 8938 disclosures with zero hassle.",
    rating: 5,
    yearsClient: "Client since 2022",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=240"
  },
  {
    id: "story-2",
    name: "Jennifer & Marcus Miller",
    role: "Founders, Apex Digital Consulting LLC",
    location: "Round Rock, TX",
    category: "Business & S-Corp",
    formsHandled: ["Form 1120-S", "Schedule K-1", "Form 1040", "TX Franchise Tax"],
    outcomeBadge: "$19,650 Annual S-Corp Tax Savings",
    highlight: "Restructured single-member LLC to S-Corporation with compliant reasonable salary & QBI optimization.",
    quote:
      "Switching to Taxiva LLC for our consulting business was the best financial decision we've made. Their CPAs analyzed our net income, guided our Form 2553 S-Corp election, optimized our Section 199A QBI deduction, and prepared both our Form 1120-S and K-1s right on schedule.",
    rating: 5,
    yearsClient: "Client since 2021",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=240"
  },
  {
    id: "story-3",
    name: "Arun Kumar",
    role: "Staff Software Engineer",
    location: "San Jose, CA → Austin, TX",
    category: "Individual & Multi-State",
    formsHandled: ["Form 1040", "CA 540 Part-Year", "Schedule D (RSUs)", "Form 8949"],
    outcomeBadge: "$6,840 RSU Cost-Basis Recovery",
    highlight: "Corrected supplemental RSU double-counting and multi-state California-to-Texas residency split.",
    quote:
      "After relocating from California to Texas mid-year with multiple RSU vesting events and ESPP sales, DIY tax software showed I owed thousands. Taxiva LLC's line-by-line review caught an unadjusted cost basis on my 1099-B and properly allocated my CA part-year residency—turning a tax bill into a $6,840 refund.",
    rating: 5,
    yearsClient: "Client since 2023",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=240"
  },
  {
    id: "story-4",
    name: "Dr. Priya Nair",
    role: "Attending Physician & Real Estate Investor",
    location: "Houston, TX",
    category: "FBAR & Foreign Reporting",
    formsHandled: ["FinCEN Form 114", "Form 8938 (FATCA)", "Form 8621 (PFIC)", "Schedule E"],
    outcomeBadge: "100% IRS & FinCEN Compliant",
    highlight: "Multi-account NRE/NRO foreign bank reporting and foreign mutual fund PFIC analysis.",
    quote:
      "I had multiple NRE, NRO, and FCNR accounts across three Indian banks plus U.S. rental properties. Taxiva LLC organized every maximum account balance, converted currencies using official Treasury year-end rates, and filed my FinCEN Form 114 and FATCA Form 8938 accurately within 48 hours.",
    rating: 5,
    yearsClient: "Client since 2020",
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=240"
  },
  {
    id: "story-5",
    name: "Vikram Deshmukh",
    role: "Managing Partner, Horizon E-Commerce LLP",
    location: "Dallas, TX",
    category: "Business & S-Corp",
    formsHandled: ["Form 1065", "Multi-State Nexus", "Schedule K-1", "Form 4562 Depreciation"],
    outcomeBadge: "4-State Partnership Filing Completed",
    highlight: "Multi-partner Form 1065 compliance, bonus depreciation, and partner K-1 distributions.",
    quote:
      "Managing a 4-partner LLC with inventory and contractor payments across multiple states used to delay our personal tax filings every spring. Taxiva LLC's Canopy portal made uploading our P&L and balance sheet effortless, and we had all our Schedule K-1s ready weeks before the March 15 deadline.",
    rating: 5,
    yearsClient: "Client since 2022",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=240"
  },
  {
    id: "story-6",
    name: "Meera & Karthik Iyer",
    role: "Senior Product Manager & Biotech Researcher",
    location: "Boston, MA",
    category: "Individual & Multi-State",
    formsHandled: ["Form 1040 Joint", "Schedule C (1099-NEC)", "Schedule E Rental", "Form 2441"],
    outcomeBadge: "$8,320 Prior-Year Amendment Refund",
    highlight: "Amended prior-year return to claim missed rental depreciation and home office deductions.",
    quote:
      "Not only did Taxiva LLC prepare our joint 2025 federal and state returns with W-2, 1099-NEC consulting, and rental property income, they also reviewed our previous two years' returns for free and filed an amended Form 1040-X that recovered $8,320 we had overpaid.",
    rating: 5,
    yearsClient: "Client since 2023",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=240"
  }
];

const CATEGORIES = [
  "All Success Stories",
  "Individual & Multi-State",
  "Business & S-Corp",
  "FBAR & Foreign Reporting",
  "Indian Tax & NRI"
] as const;

export default function Testimonials() {
  const [activeCategory, setActiveCategory] = useState<string>("All Success Stories");

  const filteredStories = TESTIMONIAL_STORIES.filter(
    (story) => activeCategory === "All Success Stories" || story.category === activeCategory
  );

  const getCategoryIcon = (category: TestimonialStory["category"]) => {
    switch (category) {
      case "Individual & Multi-State":
        return FileText;
      case "Business & S-Corp":
        return Briefcase;
      case "FBAR & Foreign Reporting":
        return Globe2;
      case "Indian Tax & NRI":
        return Landmark;
    }
  };

  return (
    <section className="py-24 bg-slate-950 text-white relative overflow-hidden" id="client-testimonials">
      {/* Subtle architectural background grid */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/40 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header + Authority Metrics Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-14 pb-12 border-b border-slate-800">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 text-amber-400 font-bold uppercase tracking-widest text-xs mb-4">
              <Award className="w-4 h-4" />
              <span>Verified Client Success Stories & Outcomes</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-[1.12] font-display">
              Trusted by Individuals, NRIs & Business Owners Across <span className="text-amber-400 italic">All 50 States.</span>
            </h2>
            <p className="text-slate-300 text-lg mt-4 max-w-2xl leading-relaxed">
              See how Taxiva LLC helps clients eliminate IRS compliance stress, prevent double taxation, and legally maximize tax savings through CPA-reviewed filing.
            </p>
          </div>

          {/* Authority Metrics Box */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl">
              <div className="flex items-center gap-1.5 mb-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
                <span className="text-white font-black text-sm ml-1">4.98 / 5.0</span>
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Client Satisfaction Score
              </p>
              <p className="text-xs text-slate-500 mt-1">Across U.S. & Cross-Border Filers</p>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl">
              <div className="flex items-center gap-2 text-emerald-400 font-black text-xl mb-1">
                <ShieldCheck className="w-5 h-5" />
                <span>100% CPA</span>
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Line-by-Line Review
              </p>
              <p className="text-xs text-slate-500 mt-1">IRS Registered Preparers & EAs</p>
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer ${
                    isActive
                      ? "bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/20"
                      : "bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="text-xs font-semibold text-slate-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Showing {filteredStories.length} verified client case studies</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredStories.map((story, idx) => {
              const CategoryIcon = getCategoryIcon(story.category);
              return (
                <motion.article
                  key={story.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  className="bg-slate-900/90 border border-slate-800 hover:border-blue-500/40 rounded-2xl p-7 flex flex-col justify-between transition-all shadow-xl group"
                >
                  <div>
                    {/* Top Row: Category & Verified Outcome */}
                    <div className="flex items-center justify-between gap-2 mb-5 pb-4 border-b border-slate-800/80">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-300 bg-blue-950/80 border border-blue-800/50 px-2.5 py-1 rounded-lg">
                        <CategoryIcon className="w-3.5 h-3.5 text-amber-400" />
                        {story.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-300 bg-emerald-950/70 border border-emerald-800/50 px-2.5 py-1 rounded-lg">
                        <TrendingUp className="w-3.5 h-3.5" />
                        {story.outcomeBadge}
                      </span>
                    </div>

                    {/* Key Result Highlight */}
                    <h3 className="text-base font-bold text-white mb-3 leading-snug group-hover:text-amber-300 transition-colors">
                      {story.highlight}
                    </h3>

                    {/* Quote Body */}
                    <div className="relative mb-6">
                      <Quote className="w-6 h-6 text-slate-700 mb-2" />
                      <p className="text-sm text-slate-300 leading-relaxed">
                        "{story.quote}"
                      </p>
                    </div>

                    {/* Forms Handled Tags */}
                    <div className="mb-6">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                        Forms & Compliance Handled:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {story.formsHandled.map((form) => (
                          <span
                            key={form}
                            className="text-[11px] font-semibold text-slate-300 bg-slate-800/90 border border-slate-700/70 px-2 py-0.5 rounded-md font-mono"
                          >
                            {form}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Client Footer */}
                  <div className="pt-5 border-t border-slate-800 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center text-white font-black text-base shrink-0 border border-blue-400/30 shadow-md">
                        {story.name
                          .split(" ")
                          .map((n) => n[0])
                          .slice(0, 2)
                          .join("")}
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">{story.name}</h4>
                        <p className="text-xs text-slate-400 font-medium">{story.role}</p>
                        <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-amber-400" />
                          {story.location}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="flex items-center justify-end gap-0.5 mb-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className="w-3.5 h-3.5 text-amber-400 fill-amber-400"
                          />
                        ))}
                      </div>
                      <span className="text-[11px] font-semibold text-emerald-400 block">
                        {story.yearsClient}
                      </span>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Bottom Trust Callout Bar */}
        <div className="mt-14 bg-gradient-to-r from-blue-900/80 via-slate-900 to-blue-950/80 border border-blue-800/50 rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">
                Want a Free 3-Year Prior Tax Return Review?
              </h3>
              <p className="text-sm text-slate-300 mt-1 max-w-2xl">
                Every new Taxiva LLC client receives a complimentary review of prior tax returns to identify missed RSU basis adjustments, foreign tax credits, or business write-offs.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/get-started"
              className="bg-amber-400 text-slate-950 px-6 py-3.5 rounded-xl font-extrabold text-sm hover:bg-amber-300 transition-all flex items-center gap-2 shadow-lg shadow-amber-400/10"
            >
              <span>Start Your Tax Filing</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/login"
              className="bg-slate-800 text-white border border-slate-700 px-5 py-3.5 rounded-xl font-bold text-sm hover:bg-slate-700 transition-all"
            >
              Canopy Client Portal
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
