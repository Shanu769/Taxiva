/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowUpRight, ShieldCheck, ExternalLink, Clock } from "lucide-react";
import LogoAnimation from "./LogoAnimation";
import SocialFollow from "./SocialFollow";

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white pt-16 pb-12 border-t border-white/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Layout:
            On Mobile: Brand section followed by vertically stacked link groups.
            On Desktop: Clean horizontal 12-column grid layout (Brand 4-cols, Links 8-cols horizontally across 4 columns).
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-white/15">
          {/* Brand & Contact Column */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="inline-flex items-center gap-3.5 group">
              <LogoAnimation size="md" variant="footer" />
              <div className="flex flex-col">
                <span
                  className="text-2xl sm:text-[1.85rem] font-bold text-white leading-none tracking-wide"
                  style={{ fontFamily: "'Dancing Script', 'Great Vibes', cursive" }}
                >
                  Taxiva LLC
                </span>
                {/* Clearly readable tagline on dark navy background */}
                <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-sky-300 mt-1.5 drop-shadow-xs">
                  US and cross-border tax experts
                </span>
              </div>
            </Link>

            <p className="text-slate-300 text-sm leading-relaxed max-w-sm font-medium">
              Line-by-line CPA preparation, New York (NY) main company formation, and proactive tax advisory for individuals, NRIs, and expanding businesses across all 50 states.
            </p>

            {/* Online Tax Portal Application Badges */}
            <div className="space-y-2 pt-1">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Online Tax Filing Portal
              </p>
              <div className="flex flex-wrap gap-2.5">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 bg-white text-[#0f172a] hover:bg-[#eff6ff] px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all shadow-sm active:scale-95"
                >
                  <ShieldCheck className="w-4 h-4 text-[#1d4ed8]" />
                  <span>Canopy Client Portal</span>
                </Link>
                <Link
                  to="/get-started"
                  className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white border border-white/25 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all active:scale-95"
                >
                  <span>Get in Touch</span>
                  <ExternalLink className="w-3.5 h-3.5 text-sky-300" />
                </Link>
              </div>
            </div>

            {/* Direct Contact Details */}
            <div className="space-y-2.5 text-sm text-slate-200 pt-1">
              <p className="font-extrabold text-white flex items-center gap-2">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <a href="tel:+17373812330" className="hover:text-sky-300 hover:underline">
                  +1 737-381-2330
                </a>
                <span className="text-white/40">•</span>
                <a
                  href="https://wa.me/919963260743"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-sky-300 hover:underline"
                >
                  +91 996-3260-743
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <a href="mailto:info@taxiva.co" className="hover:text-sky-300 hover:underline font-semibold">
                  info@taxiva.co
                </a>
              </p>
              <p className="flex items-start gap-2 text-xs text-slate-300">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>Head Office: One World Trade Center, Suite 8500, New York, NY 10007 (EST)</span>
              </p>
              <p className="flex items-center gap-2 text-xs text-slate-400">
                <Clock className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Mon – Sat: 9:00 AM – 7:00 PM EST • NY Main Company Formation</span>
              </p>
            </div>

            {/* "FOLLOW US" Social Row matching image_bf930afb.png */}
            <SocialFollow className="pt-3 border-t border-white/10" />
          </div>

          {/* Responsive Links Grid:
              - Mobile (< md): Stacks vertically as single-column link blocks with clean spacing.
              - Tablet (md): 2 columns.
              - Desktop (lg): 4 columns arranged horizontally side-by-side across the remaining space.
          */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 pt-2 lg:pt-0">
            {/* Column 1: Solutions */}
            <div className="flex flex-col space-y-4">
              <h4 className="font-extrabold text-sm uppercase tracking-wider text-white border-b border-white/10 pb-2">
                Solutions
              </h4>
              <ul className="flex flex-col space-y-3 text-sm text-slate-300">
                <li>
                  <Link to="/services/individual" className="hover:text-white hover:underline transition-colors block py-0.5">
                    Individual Tax Filing
                  </Link>
                </li>
                <li>
                  <Link to="/services/business" className="hover:text-white hover:underline transition-colors block py-0.5">
                    Business Tax & NY Formation
                  </Link>
                </li>
                <li>
                  <Link to="/services/foreign-reporting" className="hover:text-white hover:underline transition-colors block py-0.5">
                    FBAR & Foreign Reporting
                  </Link>
                </li>
                <li>
                  <Link to="/services/indian-tax" className="hover:text-white hover:underline transition-colors block py-0.5">
                    Indian Tax & NRI
                  </Link>
                </li>
                <li>
                  <Link to="/get-started" className="hover:text-white hover:underline transition-colors block py-0.5">
                    Tax Advisory & Planning
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: About TAXIVA LLC */}
            <div className="flex flex-col space-y-4">
              <h4 className="font-extrabold text-sm uppercase tracking-wider text-white border-b border-white/10 pb-2">
                About TAXIVA
              </h4>
              <ul className="flex flex-col space-y-3 text-sm text-slate-300">
                <li>
                  <Link to="/about" className="hover:text-white hover:underline transition-colors block py-0.5">
                    Our Story & NY Head Office
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-white hover:underline transition-colors block py-0.5">
                    Contact Us (EST)
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="hover:text-white hover:underline transition-colors block py-0.5">
                    Transparent Pricing
                  </Link>
                </li>
                <li>
                  <Link to="/get-started" className="hover:text-white hover:underline transition-colors block py-0.5">
                    Refer & Earn $20
                  </Link>
                </li>
                <li>
                  <Link to="/get-started" className="hover:text-white hover:underline transition-colors block py-0.5">
                    Book Consultation
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Resources & Government Portals */}
            <div className="flex flex-col space-y-4">
              <h4 className="font-extrabold text-sm uppercase tracking-wider text-white border-b border-white/10 pb-2">
                Resources
              </h4>
              <ul className="flex flex-col space-y-3 text-sm text-slate-300">
                <li>
                  <Link to="/tax-tools" className="hover:text-white hover:underline transition-colors block py-0.5">
                    Refund & Payment Center
                  </Link>
                </li>
                <li>
                  <a
                    href="https://www.irs.gov/refunds"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-white hover:underline transition-colors py-0.5"
                  >
                    <span>Federal Refund Status</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://taxadmin.org/fta-members/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-white hover:underline transition-colors py-0.5"
                  >
                    <span>State Refund Status (FTA)</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.irs.gov/payments/direct-pay-with-bank-account"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-white hover:underline transition-colors py-0.5"
                  >
                    <span>Federal Payment Portal</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.irs.gov/payments/online-account-for-individuals"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 hover:text-white hover:underline transition-colors py-0.5"
                  >
                    <span>IRS Account Setup</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  </a>
                </li>
                <li>
                  <Link to="/tax-tools" className="hover:text-white hover:underline transition-colors block py-0.5">
                    Tax Deadline Calendar
                  </Link>
                </li>
                <li>
                  <Link to="/#faq-section" className="hover:text-white hover:underline transition-colors block py-0.5">
                    Help Center & FAQs
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Legal & Security */}
            <div className="flex flex-col space-y-4">
              <h4 className="font-extrabold text-sm uppercase tracking-wider text-white border-b border-white/10 pb-2">
                Legal & Security
              </h4>
              <ul className="flex flex-col space-y-3 text-sm text-slate-300">
                <li>
                  <Link to="/login" className="hover:text-white hover:underline transition-colors block py-0.5">
                    AES-256 Cloud Portal
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-white hover:underline transition-colors block py-0.5">
                    IRS Sec. 7216 Privacy
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-white hover:underline transition-colors block py-0.5">
                    SOC 2 Data Controls
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-white hover:underline transition-colors block py-0.5">
                    IRS Notice Support
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-white hover:underline transition-colors block py-0.5">
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar:
            Stacks links vertically on mobile and horizontally on desktop.
        */}
        <div className="pt-8 flex flex-col lg:flex-row justify-between items-center gap-6 text-xs text-slate-300 font-medium">
          {/* Quick links: Vertical stack on mobile, horizontal row on desktop */}
          <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-6 text-center">
            <Link to="/login" className="hover:text-white hover:underline transition-colors py-1">
              Client Portal (Canopy)
            </Link>
            <Link to="/get-started" className="hover:text-white hover:underline transition-colors py-1">
              Get in Touch Form
            </Link>
            <Link to="/services/foreign-reporting" className="hover:text-white hover:underline transition-colors py-1">
              FBAR & FATCA Compliance
            </Link>
            <Link to="/tax-tools" className="hover:text-white hover:underline transition-colors py-1">
              State Payment & Refund Links
            </Link>
          </div>

          <p className="text-slate-300 text-center lg:text-right">
            © {new Date().getFullYear()} <strong className="text-white font-bold">Taxiva LLC</strong> •{" "}
            <span className="text-sky-300 font-semibold">US and cross-border tax experts</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
