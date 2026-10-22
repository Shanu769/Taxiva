/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronDown,
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
  const location = useLocation();

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

  return (
    <header className="sticky top-0 z-40 w-full bg-[#f8fafc]/95 backdrop-blur-md border-b border-[#dbeafe] shadow-xs">
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
