/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  ExternalLink,
  Phone,
  Mail,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Lock,
  Calendar,
  Clock,
  AlertTriangle,
  FileText,
  Briefcase,
  Globe2,
  Landmark,
  CreditCard,
  Search
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import LogoAnimation from "./LogoAnimation";

interface DynamicTaxDeadline {
  id: string;
  title: string;
  shortTitle: string;
  formCode: string;
  targetDate: Date;
  formattedDate: string;
  actionHref: string;
}

function getUpcomingTaxDeadlines(referenceDate: Date): DynamicTaxDeadline[] {
  const currentYear = referenceDate.getFullYear();
  const years = [currentYear, currentYear + 1];
  const schedule: DynamicTaxDeadline[] = [];

  for (const year of years) {
    const milestones = [
      {
        id: `q4-est-${year}`,
        title: `Q4 Estimated Tax Payment Due`,
        shortTitle: `Q4 Estimated Tax`,
        formCode: "Form 1040-ES",
        month: 0, // Jan 15
        day: 15,
        actionHref: "/services/individual"
      },
      {
        id: `biz-1120s-${year}`,
        title: `S-Corp & Partnership Tax Returns Due`,
        shortTitle: `S-Corp & Partnership Filing`,
        formCode: "Form 1120-S & 1065",
        month: 2, // Mar 15
        day: 15,
        actionHref: "/services/business"
      },
      {
        id: `ind-1040-${year}`,
        title: `Federal & State Individual Tax Filing Deadline`,
        shortTitle: `Individual Tax Day`,
        formCode: "Form 1040 & FinCEN 114",
        month: 3, // Apr 15
        day: 15,
        actionHref: "/services/individual"
      },
      {
        id: `q2-expat-${year}`,
        title: `Q2 Estimated Tax & U.S. Expats Automatic Filing Cutoff`,
        shortTitle: `Q2 Estimates & Expats`,
        formCode: "Form 1040-ES / Expats",
        month: 5, // Jun 15
        day: 15,
        actionHref: "/services/foreign-reporting"
      },
      {
        id: `q3-ext-biz-${year}`,
        title: `Q3 Estimated Tax & Extended S-Corp/Partnership Deadline`,
        shortTitle: `Q3 Estimates & Extended Entities`,
        formCode: "Form 1040-ES / 1120-S",
        month: 8, // Sep 15
        day: 15,
        actionHref: "/services/business"
      },
      {
        id: `ext-1040-fbar-${year}`,
        title: `Extended Individual Tax & FBAR Final Filing Deadline`,
        shortTitle: `Extended 1040 & FBAR Cutoff`,
        formCode: "Form 1040 & FinCEN 114",
        month: 9, // Oct 15
        day: 15,
        actionHref: "/services/foreign-reporting"
      },
      {
        id: `ye-strategy-${year}`,
        title: `Year-End RSU, Capital Gains & Tax-Loss Harvesting Cutoff`,
        shortTitle: `Year-End RSU & Tax Strategy`,
        formCode: "Form 1040 • RSU Planning",
        month: 11, // Dec 15
        day: 15,
        actionHref: "/services/individual"
      },
      {
        id: `ye-close-${year}`,
        title: `Annual Tax Year Close: Solo 401(k) & Deduction Deadline`,
        shortTitle: `${year} Tax Year Close`,
        formCode: "Entity & 1040 Deductions",
        month: 11, // Dec 31
        day: 31,
        actionHref: "/get-started"
      }
    ];

    for (const m of milestones) {
      // End of the deadline day in local time (23:59:59)
      const targetDate = new Date(year, m.month, m.day, 23, 59, 59);
      if (targetDate.getTime() > referenceDate.getTime()) {
        const formattedDate = targetDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric"
        });
        schedule.push({
          id: m.id,
          title: m.title,
          shortTitle: m.shortTitle,
          formCode: m.formCode,
          targetDate,
          formattedDate,
          actionHref: m.actionHref
        });
      }
    }
  }

  return schedule.slice(0, 4);
}

const services = [
  {
    name: "Individual Tax Filing",
    href: "/services/individual",
    subtitle: "Form 1040 • RSUs • 50 States",
    icon: FileText
  },
  {
    name: "Business Tax Filing",
    href: "/services/business",
    subtitle: "NY Formation • 1120-S • 1065 • LLC",
    icon: Briefcase
  },
  {
    name: "FBAR & Foreign Reporting",
    href: "/services/foreign-reporting",
    subtitle: "FinCEN 114 • FATCA Form 8938",
    icon: Globe2
  },
  {
    name: "Indian Tax & NRI",
    href: "/services/indian-tax",
    subtitle: "DTAA Relief • Form 1116 • ITR",
    icon: Landmark
  },
];

const taxTools = [
  { name: "Federal Refund Status", href: "https://www.irs.gov/refunds", isExternal: true, badge: "IRS.gov" },
  { name: "State Refund Status", href: "https://taxadmin.org/fta-members/", isExternal: true, badge: "50 States" },
  { name: "Federal Payment Portal", href: "https://www.irs.gov/payments/direct-pay-with-bank-account", isExternal: true, badge: "Direct Pay" },
  { name: "State Payment Portals", href: "https://taxadmin.org/fta-members/", isExternal: true, badge: "FTA" },
  { name: "IRS Account Setup", href: "https://www.irs.gov/payments/online-account-for-individuals", isExternal: true, badge: "ID.me" },
  { name: "Refund & Payment Center Hub", href: "/tax-tools", isExternal: false, badge: "All Tools" },
  { name: "Ohio Tax Portal", href: "https://www.tax.ohio.gov/", isExternal: true, badge: "Ohio" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [activeDeadlineIdx, setActiveDeadlineIdx] = useState(0);
  const [isBannerPaused, setIsBannerPaused] = useState(false);
  const [now, setNow] = useState(() => new Date());
  const location = useLocation();

  const upcomingDeadlines = useMemo(() => getUpcomingTaxDeadlines(now), [
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  ]);

  const currentDeadline = upcomingDeadlines[activeDeadlineIdx] || upcomingDeadlines[0];

  // Live 1-second tick for real-time urgency countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Auto-cycle through upcoming deadlines every 8 seconds unless hovered/paused
  useEffect(() => {
    if (isBannerPaused || bannerDismissed || upcomingDeadlines.length <= 1) return;
    const cycleTimer = setInterval(() => {
      setActiveDeadlineIdx((prev) => (prev + 1) % upcomingDeadlines.length);
    }, 8000);
    return () => clearInterval(cycleTimer);
  }, [isBannerPaused, bannerDismissed, upcomingDeadlines.length]);

  const countdown = useMemo(() => {
    if (!currentDeadline) return { days: 0, hours: 0, minutes: 0, seconds: 0, isCritical: false };
    const diffMs = Math.max(0, currentDeadline.targetDate.getTime() - now.getTime());
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
    const seconds = Math.floor((diffMs / 1000) % 60);
    return {
      days,
      hours,
      minutes,
      seconds,
      isCritical: days <= 30
    };
  }, [currentDeadline, now]);

  // Close drawer and dropdowns on route changes
  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  // Lock body scroll when mobile slide-out menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle ESC key to close mobile drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const handleMobileNavClick = () => {
    setIsOpen(false);
    handleScrollToTop();
  };

  const handlePrevDeadline = () => {
    setActiveDeadlineIdx((prev) => (prev - 1 + upcomingDeadlines.length) % upcomingDeadlines.length);
  };

  const handleNextDeadline = () => {
    setActiveDeadlineIdx((prev) => (prev + 1) % upcomingDeadlines.length);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#f8fafc]/95 backdrop-blur-md border-b border-[#dbeafe] shadow-xs">
      {/* Dynamic Tax Filing Deadline Urgency Banner */}
      {!bannerDismissed && currentDeadline && (
        <div
          onMouseEnter={() => setIsBannerPaused(true)}
          onMouseLeave={() => setIsBannerPaused(false)}
          className="w-full bg-gradient-to-r from-[#0f172a] via-[#172554] to-[#0f172a] text-white border-b border-white/15 relative overflow-hidden"
          role="region"
          aria-label="Upcoming IRS Tax Filing Deadlines"
        >
          <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-2 sm:gap-4 text-xs">
            {/* Left / Center: Urgency Status + Dynamic Deadline Info + Live Countdown */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              {/* Urgency Indicator */}
              <div className="inline-flex items-center gap-1.5 shrink-0">
                <span className="relative flex h-2 w-2">
                  <span
                    className={cn(
                      "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                      countdown.isCritical ? "bg-amber-400" : "bg-[#60a5fa]"
                    )}
                  />
                  <span
                    className={cn(
                      "relative inline-flex rounded-full h-2 w-2",
                      countdown.isCritical ? "bg-amber-400" : "bg-[#3b82f6]"
                    )}
                  />
                </span>
                <span className="font-extrabold uppercase tracking-wider text-[10px] sm:text-[11px] text-[#93c5fd]">
                  {countdown.isCritical ? "Urgent Tax Cutoff" : "Upcoming IRS Deadline"}
                </span>
              </div>

              <span className="text-white/30 hidden sm:inline" aria-hidden="true">
                |
              </span>

              {/* Animated Deadline Title & Date */}
              <div className="min-w-0 flex-1 flex items-center gap-2 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentDeadline.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22 }}
                    className="flex items-center gap-2 truncate"
                  >
                    <span className="font-bold text-white truncate">
                      <span className="hidden md:inline">{currentDeadline.title}</span>
                      <span className="md:hidden">{currentDeadline.shortTitle}</span>
                    </span>
                    <span className="hidden lg:inline text-white/40" aria-hidden="true">
                      ·
                    </span>
                    <span className="hidden lg:inline text-[#bfdbfe] font-semibold shrink-0">
                      {currentDeadline.formCode}
                    </span>
                    <span className="text-white/40 shrink-0" aria-hidden="true">
                      ·
                    </span>
                    <span className="font-extrabold text-amber-300 shrink-0">
                      Due {currentDeadline.formattedDate}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Live Real-Time Countdown Timer */}
              <div
                className="hidden sm:inline-flex items-center gap-1.5 bg-white/10 border border-white/15 px-2.5 py-1 rounded-md font-mono text-[11px] font-bold text-white shrink-0 tabular-nums"
                title="Live time remaining until deadline"
              >
                <Clock className="w-3 h-3 text-amber-300 shrink-0" />
                <span>
                  {countdown.days}d : {String(countdown.hours).padStart(2, "0")}h :{" "}
                  {String(countdown.minutes).padStart(2, "0")}m :{" "}
                  {String(countdown.seconds).padStart(2, "0")}s
                </span>
              </div>

              {/* Mobile Compact Days Left */}
              <span className="sm:hidden font-mono text-[11px] font-extrabold text-amber-300 shrink-0 tabular-nums">
                ({countdown.days}d left)
              </span>
            </div>

            {/* Right Controls: Deadline Cycle Controls + Urgent CTA + Dismiss */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {upcomingDeadlines.length > 1 && (
                <div className="hidden md:flex items-center gap-1 text-[11px] text-white/75">
                  <button
                    type="button"
                    onClick={handlePrevDeadline}
                    aria-label="Previous upcoming tax deadline"
                    className="p-1 hover:text-white hover:bg-white/10 rounded transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono text-[10px] tabular-nums">
                    {activeDeadlineIdx + 1}/{upcomingDeadlines.length}
                  </span>
                  <button
                    type="button"
                    onClick={handleNextDeadline}
                    aria-label="Next upcoming tax deadline"
                    className="p-1 hover:text-white hover:bg-white/10 rounded transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <Link
                to="/get-started"
                onClick={handleScrollToTop}
                className="inline-flex items-center gap-1 bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-2.5 sm:px-3 py-1 rounded-md font-extrabold text-[11px] transition-all shadow-xs whitespace-nowrap"
              >
                <span>File Now</span>
                <span className="hidden xl:inline">— Free 24–48h Draft</span>
                <ArrowRight className="w-3 h-3" />
              </Link>

              <button
                type="button"
                onClick={() => setBannerDismissed(true)}
                aria-label="Dismiss tax deadline banner"
                className="p-1 text-white/60 hover:text-white hover:bg-white/10 rounded transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-22 gap-8">
          {/* Logo — Stylized 3D Transparent Animated 'T' Component + Cursive 'Taxiva LLC' UI/UX Branding */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              to="/"
              onClick={handleScrollToTop}
              className="flex items-center gap-3 group whitespace-nowrap shrink-0"
            >
              <LogoAnimation size="md" variant="header" />

              <span
                className="text-2xl sm:text-[1.85rem] font-bold text-[#0f172a] group-hover:text-[#1d4ed8] transition-colors leading-none tracking-wide select-none drop-shadow-[0_1px_1px_rgba(15,23,42,0.08)]"
                style={{ fontFamily: "'Dancing Script', 'Great Vibes', cursive" }}
              >
                Taxiva LLC
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-6 2xl:gap-8">
            <Link
              to="/"
              onClick={handleScrollToTop}
              className="text-[#0f172a] hover:text-[#1d4ed8] text-sm 2xl:text-base font-bold transition-colors whitespace-nowrap shrink-0"
            >
              Home
            </Link>

            {/* Services Dropdown */}
            <div className="relative group py-4">
              <button className="flex items-center gap-1 text-[#0f172a] group-hover:text-[#1d4ed8] text-sm 2xl:text-base font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer">
                Services <ChevronDown className="w-4 h-4 text-[#1d4ed8] group-hover:text-[#0f172a]" />
              </button>
              <div
                className={cn(
                  "absolute top-full left-0 w-72 bg-white border border-[#dbeafe] shadow-xl rounded-2xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                )}
              >
                {services.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={handleScrollToTop}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-[#0f172a] hover:bg-[#eff6ff] hover:text-[#1d4ed8] transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#eff6ff] text-[#1d4ed8] flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold">{item.name}</div>
                      <div className="text-[11px] text-[#64748b] font-medium">{item.subtitle}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/pricing"
              onClick={handleScrollToTop}
              className="text-[#0f172a] hover:text-[#1d4ed8] text-sm 2xl:text-base font-bold transition-colors whitespace-nowrap shrink-0"
            >
              Pricing
            </Link>

            {/* Refund & Payment Center Dropdown */}
            <div className="relative group py-4">
              <button className="flex items-center gap-1 text-[#0f172a] group-hover:text-[#1d4ed8] text-sm 2xl:text-base font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer">
                Refund & Payment Center <ChevronDown className="w-4 h-4 text-[#1d4ed8] group-hover:text-[#0f172a]" />
              </button>
              <div
                className={cn(
                  "absolute top-full left-0 w-72 bg-white border border-[#dbeafe] shadow-xl rounded-2xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                )}
              >
                {taxTools.map((item) =>
                  item.href.startsWith("http") ? (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-4 py-2.5 text-sm font-semibold text-[#0f172a] hover:bg-[#eff6ff] hover:text-[#1d4ed8] transition-colors"
                    >
                      <span>{item.name}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#1d4ed8]/70" />
                    </a>
                  ) : (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={handleScrollToTop}
                      className="block px-4 py-2.5 text-sm font-bold text-[#1d4ed8] bg-[#f8fafc] border-t border-[#eff6ff] hover:bg-[#eff6ff] transition-colors"
                    >
                      {item.name}
                    </Link>
                  )
                )}
              </div>
            </div>

            <Link
              to="/contact"
              onClick={handleScrollToTop}
              className="text-[#0f172a] hover:text-[#1d4ed8] text-sm 2xl:text-base font-bold transition-colors whitespace-nowrap shrink-0"
            >
              Contact Us
            </Link>
            <Link
              to="/about"
              onClick={handleScrollToTop}
              className="text-[#0f172a] hover:text-[#1d4ed8] text-sm 2xl:text-base font-bold transition-colors whitespace-nowrap shrink-0"
            >
              About Us
            </Link>
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden xl:flex items-center gap-3 shrink-0">
            <Link
              to="/login"
              onClick={handleScrollToTop}
              className="inline-flex items-center justify-center bg-white border border-[#bfdbfe] hover:border-[#1d4ed8] hover:bg-[#eff6ff] text-[#0f172a] px-5 py-2.5 rounded-xl text-sm 2xl:text-base font-extrabold transition-all shadow-2xs active:scale-95 whitespace-nowrap shrink-0"
            >
              Client Login
            </Link>
            <Link
              to="/get-started"
              onClick={handleScrollToTop}
              className="inline-flex items-center justify-center bg-[#1d4ed8] text-white px-5 py-2.5 rounded-xl text-sm 2xl:text-base font-extrabold hover:bg-[#0f172a] transition-all shadow-md active:scale-95 whitespace-nowrap shrink-0"
            >
              Get in touch
            </Link>
          </div>

          {/* Mobile Right Bar: Fast Access 'Get in touch' + Hamburger Toggle */}
          <div className="xl:hidden flex items-center gap-2 sm:gap-3">
            <Link
              to="/get-started"
              className="bg-[#1d4ed8] hover:bg-[#1e40af] text-white px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all shadow-md active:scale-95 whitespace-nowrap"
            >
              Get in touch
            </Link>

            <button
              onClick={() => setIsOpen(true)}
              aria-label="Open mobile navigation menu"
              aria-expanded={isOpen}
              className="p-2 sm:p-2.5 text-[#0f172a] hover:text-[#1d4ed8] bg-white border border-[#cbd5e1] hover:border-[#94a3b8] rounded-xl focus:outline-none transition-colors shadow-2xs cursor-pointer"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Slide-Out Hamburger Drawer for Mobile Devices */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 xl:hidden">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-[#0f172a]/60 backdrop-blur-xs"
              aria-hidden="true"
            />

            {/* Slide-Out Panel (Right side) */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="absolute top-0 right-0 bottom-0 w-full max-w-[340px] sm:max-w-[400px] bg-white text-[#0f172a] shadow-2xl flex flex-col z-10 border-l border-[#dbeafe]"
              aria-label="Mobile Navigation"
            >
              {/* Drawer Header with Branding & Close Button */}
              <div className="p-4 sm:p-5 border-b border-[#e2e8f0] flex items-center justify-between bg-[#f8fafc]">
                <div className="flex items-center gap-2.5">
                  <LogoAnimation size="sm" variant="header" />
                  <span
                    className="text-2xl font-bold text-[#0f172a]"
                    style={{ fontFamily: "'Dancing Script', 'Great Vibes', cursive" }}
                  >
                    Taxiva LLC
                  </span>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close mobile menu"
                  className="w-10 h-10 rounded-xl bg-white border border-[#cbd5e1] hover:bg-[#eff6ff] hover:text-[#1d4ed8] flex items-center justify-center text-[#475569] transition-all cursor-pointer shadow-2xs"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Drawer Dynamic Tax Deadline Urgency Strip */}
              {currentDeadline && (
                <div className="px-4 py-3 bg-[#0f172a] text-white border-b border-white/10">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-amber-300">
                      <Clock className="w-3 h-3" />
                      <span>Next IRS Cutoff • Due {currentDeadline.formattedDate}</span>
                    </div>
                    <span className="font-mono text-[11px] font-bold text-[#93c5fd] tabular-nums">
                      {countdown.days}d {countdown.hours}h left
                    </span>
                  </div>
                  <div className="text-xs font-bold text-white truncate">
                    {currentDeadline.title}
                  </div>
                </div>
              )}

              {/* Drawer Top Priority Action Cards: Get in Touch & Client Login */}
              <div className="p-4 bg-gradient-to-b from-[#eff6ff] to-white border-b border-[#dbeafe] space-y-2.5">
                <div className="text-[11px] font-black uppercase tracking-wider text-[#1d4ed8] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#1d4ed8]" />
                  <span>Key Actions</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/get-started"
                    onClick={() => setIsOpen(false)}
                    className="flex flex-col items-center justify-center text-center p-3 rounded-xl bg-[#1d4ed8] hover:bg-[#1e40af] text-white shadow-md active:scale-95 transition-all"
                  >
                    <span className="text-xs sm:text-sm font-black">Get in touch</span>
                    <span className="text-[10px] text-blue-200 mt-0.5">Free Draft & Quote</span>
                  </Link>

                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex flex-col items-center justify-center text-center p-3 rounded-xl bg-white hover:bg-[#f8fafc] text-[#0f172a] border border-[#bfdbfe] shadow-2xs active:scale-95 transition-all"
                  >
                    <span className="text-xs sm:text-sm font-black flex items-center gap-1">
                      <Lock className="w-3 h-3 text-[#1d4ed8]" />
                      <span>Client Login</span>
                    </span>
                    <span className="text-[10px] text-[#64748b] mt-0.5">Canopy Portal</span>
                  </Link>
                </div>
              </div>

              {/* Scrollable Navigation Links */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1.5 divide-y divide-[#f1f5f9]">
                <div className="space-y-1 pb-2">
                  <Link
                    to="/"
                    onClick={handleMobileNavClick}
                    className="flex items-center justify-between px-3.5 py-3 text-sm font-bold text-[#0f172a] hover:bg-[#eff6ff] hover:text-[#1d4ed8] rounded-xl transition-colors"
                  >
                    <span>Home</span>
                  </Link>

                  {/* Expandable Services Accordion */}
                  <div className="rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleDropdown("services")}
                      className="w-full flex items-center justify-between px-3.5 py-3 text-sm font-bold text-[#0f172a] hover:bg-[#eff6ff] hover:text-[#1d4ed8] rounded-xl transition-colors cursor-pointer"
                    >
                      <span>Services</span>
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 text-[#1d4ed8] transition-transform duration-200",
                          activeDropdown === "services" && "rotate-180"
                        )}
                      />
                    </button>

                    <AnimatePresence>
                      {activeDropdown === "services" && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="pl-3 pr-1 py-1 space-y-1 bg-[#f8fafc] rounded-xl my-1 border border-[#eff6ff]"
                        >
                          {services.map((item) => (
                            <Link
                              key={item.name}
                              to={item.href}
                              onClick={handleMobileNavClick}
                              className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-[#334155] hover:text-[#1d4ed8] hover:bg-white rounded-lg transition-colors"
                            >
                              <item.icon className="w-3.5 h-3.5 text-[#1d4ed8] shrink-0" />
                              <div className="truncate">
                                <div className="font-bold">{item.name}</div>
                                <div className="text-[10px] text-[#64748b]">{item.subtitle}</div>
                              </div>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <Link
                    to="/pricing"
                    onClick={handleMobileNavClick}
                    className="flex items-center justify-between px-3.5 py-3 text-sm font-bold text-[#0f172a] hover:bg-[#eff6ff] hover:text-[#1d4ed8] rounded-xl transition-colors"
                  >
                    <span>Pricing & Plans</span>
                  </Link>

                  {/* Expandable Refund & Payment Center Accordion */}
                  <div className="rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleDropdown("tools")}
                      className="w-full flex items-center justify-between px-3.5 py-3 text-sm font-bold text-[#0f172a] hover:bg-[#eff6ff] hover:text-[#1d4ed8] rounded-xl transition-colors cursor-pointer"
                    >
                      <span>Refund & Payment Center</span>
                      <ChevronDown
                        className={cn(
                          "w-4 h-4 text-[#1d4ed8] transition-transform duration-200",
                          activeDropdown === "tools" && "rotate-180"
                        )}
                      />
                    </button>

                    <AnimatePresence>
                      {activeDropdown === "tools" && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="pl-3 pr-1 py-1 space-y-1 bg-[#f8fafc] rounded-xl my-1 border border-[#eff6ff]"
                        >
                          {taxTools.map((item) =>
                            item.href.startsWith("http") ? (
                              <a
                                key={item.name}
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-[#334155] hover:text-[#1d4ed8] hover:bg-white rounded-lg transition-colors"
                              >
                                <span className="truncate">{item.name}</span>
                                <ExternalLink className="w-3 h-3 text-[#1d4ed8]/70 shrink-0" />
                              </a>
                            ) : (
                              <Link
                                key={item.name}
                                to={item.href}
                                onClick={handleMobileNavClick}
                                className="block px-3 py-2 text-xs font-bold text-[#1d4ed8] bg-white rounded-lg border border-[#bfdbfe]"
                              >
                                {item.name}
                              </Link>
                            )
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <Link
                    to="/contact"
                    onClick={handleMobileNavClick}
                    className="flex items-center justify-between px-3.5 py-3 text-sm font-bold text-[#0f172a] hover:bg-[#eff6ff] hover:text-[#1d4ed8] rounded-xl transition-colors"
                  >
                    <span>Contact Us</span>
                  </Link>

                  <Link
                    to="/about"
                    onClick={handleMobileNavClick}
                    className="flex items-center justify-between px-3.5 py-3 text-sm font-bold text-[#0f172a] hover:bg-[#eff6ff] hover:text-[#1d4ed8] rounded-xl transition-colors"
                  >
                    <span>About Us</span>
                  </Link>

                </div>

                {/* Direct Phone Support Option */}
                <div className="pt-3 pb-1 space-y-2">
                  <a
                    href="tel:737-381-2330"
                    className="flex items-center gap-3 p-3 bg-[#f8fafc] hover:bg-[#eff6ff] rounded-xl border border-[#dbeafe] text-xs font-bold text-[#0f172a] transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#1d4ed8] text-white flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] text-[#64748b]">Call Support (EST)</div>
                      <div className="font-extrabold text-[#1d4ed8]">+1 737-381-2330</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Persistent Bottom Drawer Dock with 'Get in touch' Full Button */}
              <div className="p-4 border-t border-[#e2e8f0] bg-[#f8fafc] space-y-2">
                <Link
                  to="/get-started"
                  onClick={handleMobileNavClick}
                  className="w-full bg-[#1d4ed8] hover:bg-[#1e40af] text-white py-3 px-4 rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-900/10 active:scale-98 transition-all"
                >
                  <span>Start Free Tax Draft</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#64748b] font-medium pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Licensed CPAs & IRS Registered Preparers</span>
                </div>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
