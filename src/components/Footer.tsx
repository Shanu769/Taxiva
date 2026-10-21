/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowUpRight, ShieldCheck, ExternalLink, Clock } from "lucide-react";
import LogoAnimation from "./LogoAnimation";

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white pt-16 pb-10 border-t border-white/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 5-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-white/15">
          {/* Column 1: Brand, Portal Links & Contact */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <LogoAnimation size="md" variant="footer" />
              <div className="flex flex-col">
                <span
                  className="text-2xl sm:text-[1.8rem] font-bold text-white leading-none tracking-wide"
                  style={{ fontFamily: "'Dancing Script', 'Great Vibes', cursive" }}
                >
                  Taxiva LLC
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/80 mt-1">
                  U.S. & Cross-Border Tax Experts
                </span>
              </div>
            </Link>

            <p className="text-white/85 text-sm leading-relaxed max-w-sm">
              Smart tax filing, New York (NY) main company formation, and strategic CPA support for individuals, NRIs, and businesses across all 50 U.S. states.
            </p>

            {/* Online Tax Portal Application Badges */}
            <div className="space-y-2 pt-1">
              <p className="text-xs font-bold uppercase tracking-wider text-white/75">
                Online Tax Filing Portal
              </p>
              <div className="flex flex-wrap gap-2.5">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 bg-white text-[#0f172a] hover:bg-[#eff6ff] px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all shadow-sm"
                >
                  <ShieldCheck className="w-4 h-4 text-[#1d4ed8]" />
                  <span>Canopy Client Portal</span>
                </Link>
                <Link
                  to="/get-started"
                  className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all"
                >
                  <span>Get in Touch</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="space-y-2 text-sm text-white/90 pt-2">
              <p className="font-extrabold text-white flex items-center gap-2">
                <Phone className="w-4 h-4 text-white/75 shrink-0" />
                <a href="tel:+17373812330" className="hover:underline">
                  +1 737-381-2330
                </a>
                <span className="text-white/40">•</span>
                <a
                  href="https://wa.me/919963260743"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  +91 996-3260-743
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-white/75 shrink-0" />
                <a href="mailto:info@taxiva.co" className="hover:underline font-semibold">
                  info@taxiva.co
                </a>
              </p>
              <p className="flex items-start gap-2 text-xs text-white/85">
                <MapPin className="w-4 h-4 text-white/75 shrink-0 mt-0.5" />
                <span>Head Office: One World Trade Center, Suite 8500, New York, NY 10007 (EST)</span>
              </p>
              <p className="flex items-center gap-2 text-xs text-white/80">
                <Clock className="w-4 h-4 text-white/75 shrink-0" />
                <span>Mon – Sat: 9:00 AM – 7:00 PM EST • NY Main Company Formation</span>
              </p>
            </div>
          </div>

          {/* Column 2: Solutions (4 Core Services) */}
          <div className="lg:col-span-2">
            <h4 className="font-extrabold text-sm text-white mb-5">Solutions</h4>
            <ul className="space-y-3 text-sm text-white/85">
              <li>
                <Link to="/services/individual" className="hover:text-white hover:underline transition-colors">
                  Individual Tax Filing
                </Link>
              </li>
              <li>
                <Link to="/services/business" className="hover:text-white hover:underline transition-colors">
                  Business Tax & NY Formation
                </Link>
              </li>
              <li>
                <Link to="/services/foreign-reporting" className="hover:text-white hover:underline transition-colors">
                  FBAR & Foreign Reporting
                </Link>
              </li>
              <li>
                <Link to="/services/indian-tax" className="hover:text-white hover:underline transition-colors">
                  Indian Tax & NRI
                </Link>
              </li>
              <li>
                <Link to="/get-started" className="hover:text-white hover:underline transition-colors">
                  Tax Advisory & Planning
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: About TAXIVA LLC */}
          <div className="lg:col-span-2">
            <h4 className="font-extrabold text-sm text-white mb-5">About TAXIVA LLC</h4>
            <ul className="space-y-3 text-sm text-white/85">
              <li>
                <Link to="/about" className="hover:text-white hover:underline transition-colors">
                  Our Story & NY Head Office
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white hover:underline transition-colors">
                  Contact Us (EST)
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-white hover:underline transition-colors">
                  Transparent Pricing
                </Link>
              </li>
              <li>
                <Link to="/get-started" className="hover:text-white hover:underline transition-colors">
                  Refer & Earn $20
                </Link>
              </li>
              <li>
                <Link to="/get-started" className="hover:text-white hover:underline transition-colors">
                  Book Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div className="lg:col-span-2">
            <h4 className="font-extrabold text-sm text-white mb-5">Resources</h4>
            <ul className="space-y-3 text-sm text-white/85">
              <li>
                <Link to="/tax-tools" className="hover:text-white hover:underline transition-colors">
                  Refund & Payment Center
                </Link>
              </li>
              <li>
                <a
                  href="https://www.irs.gov/refunds"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-white hover:underline transition-colors"
                >
                  <span>Federal Refund Status</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.irs.gov/payments/direct-pay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-white hover:underline transition-colors"
                >
                  <span>IRS Direct Pay</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <Link to="/tax-tools" className="hover:text-white hover:underline transition-colors">
                  Tax Deadline Calendar
                </Link>
              </li>
              <li>
                <Link to="/#faq-section" className="hover:text-white hover:underline transition-colors">
                  Help Center & FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Legal & Security */}
          <div className="lg:col-span-2">
            <h4 className="font-extrabold text-sm text-white mb-5">Legal & Security</h4>
            <ul className="space-y-3 text-sm text-white/85">
              <li>
                <Link to="/login" className="hover:text-white hover:underline transition-colors">
                  AES-256 Cloud Portal
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white hover:underline transition-colors">
                  IRS Sec. 7216 Privacy
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white hover:underline transition-colors">
                  SOC 2 Data Controls
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white hover:underline transition-colors">
                  IRS Notice Support
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white hover:underline transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/80 font-semibold">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link to="/login" className="hover:text-white hover:underline">
              Client Portal (Canopy)
            </Link>
            <Link to="/get-started" className="hover:text-white hover:underline">
              Get in Touch Form
            </Link>
            <Link to="/services/foreign-reporting" className="hover:text-white hover:underline">
              FBAR & FATCA Compliance
            </Link>
            <Link to="/tax-tools" className="hover:text-white hover:underline">
              State Payment & Refund Links
            </Link>
          </div>
          <p className="text-white/75">
            © {new Date().getFullYear()} Taxiva LLC • U.S. & Cross-Border Tax Experts. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
