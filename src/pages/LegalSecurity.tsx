/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Lock,
  FileText,
  ExternalLink,
  AlertTriangle,
  Mail,
  Building2,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

export default function LegalSecurity() {
  return (
    <div className="flex flex-col w-full bg-white text-[#0f172a]">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-[#0f172a] via-[#1e3a8a] to-[#0f172a] text-white py-16 sm:py-20 border-b border-white/15">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3.5 py-1.5 rounded-xl text-xs font-extrabold uppercase tracking-widest text-sky-300 mb-4 backdrop-blur-xs">
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              <span>TaxBeam LLC Compliance & Governance</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display mb-4 text-white">
              Legal, Privacy & Data Security
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-medium">
              How TaxBeam LLC protects your private tax records, manages website usage, and ensures strict adherence to IRS Section 7216 standards.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="py-14 sm:py-20 bg-[#f8fafc]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Section A: Privacy Policy */}
          <div id="privacy" className="bg-white rounded-3xl p-8 sm:p-10 border border-[#dbeafe] shadow-xs scroll-mt-28">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#eff6ff] text-[#1d4ed8] flex items-center justify-center font-black">
                A
              </div>
              <h2 className="text-2xl font-black text-[#0f172a] font-display">Privacy Policy</h2>
            </div>
            <div className="space-y-4 text-sm sm:text-base text-[#334155] leading-relaxed font-normal">
              <p>
                At <strong>TaxBeam LLC</strong>, protecting the privacy and confidentiality of your personal and financial data is fundamental to our practice. This policy describes what information we collect through our public website and how that information is utilized:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>
                  <strong>Information Collected:</strong> When you request a consultation or quote through our "Get Started" or "Contact Us" forms, we collect your name, email address, phone number, and high-level filing profile (such as Individual W-2/RSU, Business entity type, or Foreign/Indian assets).
                </li>
                <li>
                  <strong>Use of Information:</strong> Contact details are used exclusively to communicate regarding your tax preparation needs, deliver custom fee quotes, and coordinate document transfer. We never sell, rent, or trade client information to advertisers or unaffiliated third parties.
                </li>
                <li>
                  <strong>IRS Section 7216 Strict Compliance:</strong> Under Internal Revenue Code Section 7216, tax return preparers are legally prohibited from disclosing or using tax return information for any purpose other than preparing, assisting in, or reviewing your tax returns without your explicit prior written consent.
                </li>
                <li>
                  <strong>Privacy Inquiries:</strong> If you have questions about your data or wish to update or delete your contact records, contact our privacy officer at{" "}
                  <a href="mailto:info@taxbeam.co" className="text-[#1d4ed8] font-bold underline">
                    info@taxbeam.co
                  </a>.
                </li>
              </ul>
            </div>
          </div>

          {/* Section B: Terms and Conditions */}
          <div id="terms" className="bg-white rounded-3xl p-8 sm:p-10 border border-[#dbeafe] shadow-xs scroll-mt-28">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#eff6ff] text-[#1d4ed8] flex items-center justify-center font-black">
                B
              </div>
              <h2 className="text-2xl font-black text-[#0f172a] font-display">Terms and Conditions</h2>
            </div>
            <div className="space-y-4 text-sm sm:text-base text-[#334155] leading-relaxed font-normal">
              <p>
                By accessing and using the TaxBeam LLC website, you agree to comply with the following operational terms and conditions:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>
                  <strong>Scope of Services:</strong> Tax preparation, advisory, business formation, and filing engagements are formally initiated only upon mutual execution of an Engagement Letter and authorization of IRS Form 8879.
                </li>
                <li>
                  <strong>Client Responsibilities:</strong> Clients are responsible for providing truthful, accurate, and complete financial records, W-2s, 1099s, and foreign account statements. TaxBeam LLC relies on client-provided representations when preparing tax returns.
                </li>
                <li>
                  <strong>Turnaround Guarantees:</strong> Our 24–48 hour draft turnaround applies once all necessary tax source documents and completed questionnaires have been received and verified by your assigned tax professional.
                </li>
                <li>
                  <strong>Website Availability:</strong> While we strive for 100% uptime, TaxBeam LLC is not liable for temporary service interruptions caused by internet infrastructure, hosting maintenance, or third-party portal outages.
                </li>
              </ul>
            </div>
          </div>

          {/* Section C: Data Security */}
          <div id="security" className="bg-white rounded-3xl p-8 sm:p-10 border border-[#dbeafe] shadow-xs scroll-mt-28">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#eff6ff] text-[#1d4ed8] flex items-center justify-center font-black">
                C
              </div>
              <h2 className="text-2xl font-black text-[#0f172a] font-display">Data Security Practices</h2>
            </div>
            <div className="space-y-4 text-sm sm:text-base text-[#334155] leading-relaxed font-normal">
              <p>
                TaxBeam LLC implements modern administrative, physical, and technical safeguards to protect all tax data against unauthorized access, loss, or alteration:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2">
                <li>
                  <strong>Encrypted Transmission:</strong> All web traffic is encrypted in transit using industry-standard TLS 1.3 cryptographic protocols with strong cipher suites.
                </li>
                <li>
                  <strong>Zero Password Storage:</strong> Our public website does not store or process your IRS, state revenue department, or banking passwords. Tax payments and refund queries are routed directly to official government gateways.
                </li>
                <li>
                  <strong>Access Controls:</strong> Client documents are accessible only by licensed tax preparers, CPAs, and authorized staff directly engaged in your return preparation.
                </li>
              </ul>
            </div>
          </div>

          {/* Section D: Secure Document Handling */}
          <div id="documents" className="bg-white rounded-3xl p-8 sm:p-10 border border-[#dbeafe] shadow-xs scroll-mt-28">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#eff6ff] text-[#1d4ed8] flex items-center justify-center font-black">
                D
              </div>
              <h2 className="text-2xl font-black text-[#0f172a] font-display">Secure Document Handling via Canopy Portal</h2>
            </div>
            <div className="space-y-4 text-sm sm:text-base text-[#334155] leading-relaxed font-normal">
              <p>
                To maintain the highest level of information security, <strong>TaxBeam LLC designates the official Canopy Client Portal</strong> for transferring sensitive documents (such as Social Security Numbers, W-2 forms, 1099 statements, and foreign bank account balances).
              </p>
              <div className="p-4 bg-[#eff6ff] rounded-2xl border border-[#bfdbfe] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-sm font-black text-[#1d4ed8]">Always Submit Sensitive Files via Canopy</div>
                  <p className="text-xs text-[#334155]">
                    Do not transmit full Social Security Numbers or bank login credentials via unsecured email.
                  </p>
                </div>
                <a
                  href="https://app.canopytax.com/#/login?redirect_url=https%3A%2F%2Fapp.canopytax.com%2F%23%2Fclient"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#1d4ed8] hover:bg-[#1e40af] text-white px-4 py-2.5 rounded-xl text-xs font-extrabold inline-flex items-center gap-1.5 whitespace-nowrap shadow-xs active:scale-95"
                >
                  <span>Open Canopy Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Section E: Third-Party Portals */}
          <div id="third-party" className="bg-white rounded-3xl p-8 sm:p-10 border border-[#dbeafe] shadow-xs scroll-mt-28">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#eff6ff] text-[#1d4ed8] flex items-center justify-center font-black">
                E
              </div>
              <h2 className="text-2xl font-black text-[#0f172a] font-display">Third-Party Portals & External Resources</h2>
            </div>
            <div className="space-y-4 text-sm sm:text-base text-[#334155] leading-relaxed font-normal">
              <p>
                Our Refund and Payments Center contains direct external links to official government platforms (such as IRS Where's My Refund, IRS Direct Pay, and all 50 State Departments of Revenue) as well as the Canopy Client Portal.
              </p>
              <p>
                These external platforms operate under their own independent terms of use, privacy declarations, and security guidelines. When you navigate away from TaxBeam LLC to an official government portal or third-party service, you are subject to the policies of that external host.
              </p>
            </div>
          </div>

          {/* Section F: Tax Information Disclaimer */}
          <div id="disclaimer" className="bg-white rounded-3xl p-8 sm:p-10 border border-[#dbeafe] shadow-xs scroll-mt-28">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-black">
                F
              </div>
              <h2 className="text-2xl font-black text-[#0f172a] font-display">Tax Information Disclaimer</h2>
            </div>
            <div className="space-y-4 text-sm sm:text-base text-[#334155] leading-relaxed font-normal">
              <p>
                The information provided on this website, including tax deadline calendars, estimated refund calculators, and general articles, is intended solely for general informational and educational purposes.
              </p>
              <p>
                Website content does not constitute formal tax, legal, or investment advice tailored to your personal situation. Tax laws, standard deductions, and international treaties change frequently. You should consult directly with a qualified TaxBeam LLC tax professional before taking any action based on general content.
              </p>
            </div>
          </div>

          {/* Quick Action Footer */}
          <div className="bg-[#0f172a] rounded-3xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-xl font-bold">Have Questions for Our Legal & Compliance Team?</h3>
              <p className="text-sm text-slate-300">
                Contact us directly at <strong>info@taxbeam.co</strong> or call <strong>+1 737-381-2330</strong>.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/contact"
                className="bg-white text-[#0f172a] hover:bg-[#eff6ff] px-5 py-3 rounded-xl text-sm font-extrabold transition-all"
              >
                Contact TaxBeam LLC
              </Link>
              <Link
                to="/get-started"
                className="bg-[#1d4ed8] hover:bg-[#1e40af] text-white px-5 py-3 rounded-xl text-sm font-extrabold transition-all"
              >
                Get Started
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
