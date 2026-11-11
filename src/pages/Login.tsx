/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  FileCheck2,
  MessageCircle,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Lock,
  Phone,
  Mail,
  CheckCircle2
} from "lucide-react";
import LogoAnimation from "../components/LogoAnimation";

export default function Login() {
  const portalOptions = [
    {
      id: "canopy",
      title: "Access Canopy Client Portal",
      badge: "Existing Clients • Primary Portal",
      desc: "Securely access your tax documents, upload required information, review your tax returns, and communicate with our tax professionals through the Canopy Client Portal.",
      href: "https://app.canopytax.com/#/login?redirect_url=https%3A%2F%2Fapp.canopytax.com%2F%23%2Fclient",
      isExternal: true,
      btnText: "Launch Canopy Portal",
      btnVariant: "primary",
      icon: FileCheck2
    },
    {
      id: "whatsapp",
      title: "Chat on WhatsApp",
      badge: "Instant Support • Mon–Sat",
      desc: "Have questions about tax filing, required documents, or our services? Connect with our support team through WhatsApp.",
      href: "https://wa.me/919963260743",
      isExternal: true,
      btnText: "Open WhatsApp Chat",
      btnVariant: "secondary",
      icon: MessageCircle
    },
    {
      id: "new-client",
      title: "New Client? Get in Touch",
      badge: "Free 24–48h Tax Draft & Quote",
      desc: "New to TaxBeam LLC? Contact our team to learn more about our tax preparation, filing, and advisory services.",
      href: "/get-started",
      isExternal: false,
      btnText: "Get Started Online",
      btnVariant: "outline",
      icon: Sparkles
    }
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#f8fafc] text-[#0f172a]">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#0f172a] via-[#172554] to-[#0f172a] text-white py-16 sm:py-20 border-b border-white/15">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2.5 bg-white/10 border border-white/20 px-4 py-1.5 rounded-xl text-xs font-extrabold uppercase tracking-widest text-[#93c5fd] mb-5 backdrop-blur-xs">
              <ShieldCheck className="w-4 h-4 text-[#60a5fa]" />
              <span>TaxBeam LLC Secure Client Hub</span>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <LogoAnimation size="md" variant="header" />
              <span
                className="text-3xl sm:text-4xl font-bold text-white tracking-wide leading-none"
                style={{ fontFamily: "'Dancing Script', 'Great Vibes', cursive" }}
              >
                TaxBeam LLC
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display mb-4 text-white max-w-3xl leading-tight">
              Welcome to TaxBeam LLC Client Support Center
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
              Manage your tax filing journey with confidence. Access our secure Canopy Client Portal, connect with our support team through WhatsApp, or contact us to get started with our professional tax services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main 3 Option Cards */}
      <section className="py-14 sm:py-20 flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch mb-14">
            {portalOptions.map((opt, idx) => (
              <motion.div
                key={opt.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-3xl p-7 sm:p-8 border-2 border-[#dbeafe] hover:border-[#1d4ed8] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#eff6ff] text-[#1d4ed8] group-hover:bg-[#1d4ed8] group-hover:text-white flex items-center justify-center transition-colors shadow-2xs">
                      <opt.icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider bg-[#f8fafc] text-[#1e40af] border border-[#dbeafe] px-2.5 py-1 rounded-full">
                      {opt.badge}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black text-[#0f172a] mb-3 font-display">
                    {opt.title}
                  </h2>

                  <p className="text-[#334155] text-sm leading-relaxed mb-6 font-medium">
                    {opt.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#f1f5f9]">
                  {opt.isExternal ? (
                    <a
                      href={opt.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 bg-[#1d4ed8] hover:bg-[#1e40af] text-white py-3.5 px-5 rounded-xl font-extrabold text-sm transition-all shadow-md active:scale-95 group-hover:shadow-lg"
                    >
                      <span>{opt.btnText}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  ) : (
                    <Link
                      to={opt.href}
                      className="w-full inline-flex items-center justify-center gap-2 bg-[#0f172a] hover:bg-[#1d4ed8] text-white py-3.5 px-5 rounded-xl font-extrabold text-sm transition-all shadow-md active:scale-95"
                    >
                      <span>{opt.btnText}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trust and Direct Support Strip */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#dbeafe] shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#eff6ff] text-[#1d4ed8] flex items-center justify-center shrink-0">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-[#0f172a]">
                  Encrypted & IRS Section 7216 Compliant
                </h3>
                <p className="text-xs sm:text-sm text-[#64748b] font-medium mt-0.5">
                  TaxBeam LLC licensed CPAs safeguard your tax documents with bank-grade 256-bit encryption.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-[#0f172a]">
              <a
                href="mailto:info@taxbeam.co"
                className="inline-flex items-center gap-2 text-[#1d4ed8] hover:underline"
              >
                <Mail className="w-4 h-4" />
                <span>info@taxbeam.co</span>
              </a>
              <span className="text-[#cbd5e1]">•</span>
              <a
                href="tel:737-381-2330"
                className="inline-flex items-center gap-2 text-[#0f172a] hover:text-[#1d4ed8]"
              >
                <Phone className="w-4 h-4 text-[#1d4ed8]" />
                <span>+1 737-381-2330</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
