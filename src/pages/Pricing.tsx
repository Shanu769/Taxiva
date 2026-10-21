/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Check, Info, HelpCircle, ShieldCheck, CheckCircle2 } from "lucide-react";

const pricingData = [
  { service: "Simple Federal + State Individual Return (Form 1040)", price: "Starts at $89" },
  { service: "Multi-State Individual Return", price: "Based on complexity" },
  { service: "1099 / Schedule C Self-Employment Return", price: "Based on forms" },
  { service: "Stock / RSU / ESPP / Crypto Reporting (Form 8949 & Sch D)", price: "Based on transaction volume" },
  { service: "Rental Property / Schedule E", price: "Based on property count" },
  { service: "ITIN / Form W-7 Application & Renewal", price: "Based on case" },
  { service: "FBAR Filing (FinCEN Form 114)", price: "Based on account count" },
  { service: "FATCA / Form 8938 Foreign Assets", price: "Based on asset details" },
  { service: "Indian Tax (ITR) & NRI US–India DTAA (Form 1116)", price: "Based on income sources" },
  { service: "Business Return – LLC / Partnership (1065) / S-Corp (1120-S) / C-Corp (1120)", price: "Based on entity and books" },
];

export default function Pricing() {
  const CLIENT_PORTAL_URL = "https://app.canopytax.com/#/login?redirect_url=https%3A%2F%2Fapp.canopytax.com%2F%23%2Fclient";

  return (
    <div className="flex flex-col w-full min-h-screen bg-white text-[#0f172a]">
      {/* Hero Section */}
      <section
        className="bg-[#1d4ed8] py-20 relative overflow-hidden text-white"
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 45%, #1d4ed8 100%)"
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-left"
            >
              <h1 className="text-4xl sm:text-6xl font-extrabold text-white mb-6 tracking-tight font-display">
                Transparent, Value-Based <span className="italic underline decoration-white/40 underline-offset-8">Pricing</span>
              </h1>
              <p className="text-lg text-white/85 max-w-xl font-medium leading-relaxed">
                We provide precise CPA & Enrolled Agent tax expertise with clear, upfront pricing models. No hidden hourly fees—just professional compliance and maximum tax savings.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/10 border border-white/20 p-8 rounded-[2rem] backdrop-blur-sm relative"
            >
              <div className="absolute -top-4 -right-4 bg-white text-[#0f172a] px-4 py-1 rounded-xl text-xs font-extrabold uppercase tracking-widest shadow-xl">
                Exclusive Offer
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-2">
                Refer a Friend & Earn <span className="underline font-black">$20</span>
              </h3>
              <p className="text-white/80 text-sm mb-6 leading-relaxed">
                Invite your friends and colleagues to Taxiva LLC. You'll receive a $20 credit for every successful referral who files through our portal.
              </p>
              <Link
                to="/get-started"
                className="inline-block bg-white text-[#0f172a] px-6 py-3 rounded-xl font-extrabold text-sm hover:bg-[#eff6ff] transition-all shadow-lg active:scale-95"
              >
                Join Referral Program
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Pricing Cards */}
      <section className="py-20 -mt-8 relative z-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Essential Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[2.5rem] p-10 border border-[#dbeafe] shadow-xl flex flex-col h-full hover:shadow-2xl transition-all"
            >
              <div className="mb-10">
                <span className="bg-[#eff6ff] text-[#1d4ed8] text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-lg mb-6 inline-block">
                  Essential Filing
                </span>
                <h3 className="text-3xl font-extrabold text-[#0f172a] mb-4">Individual Primary</h3>
                <p className="text-[#334155] font-medium mb-8">Comprehensive support for standard federal and state filings.</p>
                <div className="flex items-center gap-4 mb-8 p-6 bg-[#1d4ed8] rounded-2xl shadow-xl">
                  <span className="text-xs font-bold text-white/85 uppercase tracking-widest">Starting at</span>
                  <span className="text-6xl font-black text-white italic font-display">$89</span>
                </div>
                <ul className="space-y-4">
                  {[
                    "Standard & Itemized Deduction Analysis", 
                    "Federal + One State Return Prepared by CPA/EA", 
                    "24–48 Hr Digital Draft Review & Sign-Off", 
                    "256-Bit Encrypted Canopy Document Portal",
                    "Complimentary 3-Year Prior Return Review",
                    "Post-Filing IRS Notice & Audit Support Info"
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm font-semibold text-[#0f172a]">
                      <Check className="w-5 h-5 text-[#1d4ed8] shrink-0 mt-0.5" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto">
                <a 
                  href={CLIENT_PORTAL_URL} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#1d4ed8] text-white font-extrabold py-5 rounded-2xl text-center flex items-center justify-center gap-2 hover:bg-[#1e40af] transition-all active:scale-95 shadow-xl"
                >
                  Start Your Filing
                </a>
              </div>
            </motion.div>

            {/* Custom Support Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#1d4ed8] text-white rounded-[2.5rem] p-10 flex flex-col h-full relative overflow-hidden border border-white/15 shadow-xl"
              style={{
                background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #1d4ed8 100%)"
              }}
            >
              <div className="mb-10 relative z-10">
                <span className="bg-white/15 text-white text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-lg mb-6 inline-block">
                  Advanced Compliance
                </span>
                <h3 className="text-3xl font-extrabold mb-4 text-white">Tailored Solutions</h3>
                <p className="text-white/80 font-medium mb-8">
                  Expert handling of complex business, RSU/equity, FBAR, and Indian NRI cross-border tax requirements.
                </p>
                
                <div className="space-y-4 mb-8">
                  {[
                    { name: "Business Tax (1065 / 1120-S / 1120)", status: "Custom Quote" },
                    { name: "FBAR (FinCEN 114) & FATCA (8938)", status: "Per Account" },
                    { name: "Indian Tax (ITR) & NRI DTAA (Form 1116)", status: "Cross-Border" },
                    { name: "RSU, ESPP, Crypto & Multi-State", status: "Volume Based" }
                  ].map((item) => (
                    <div key={item.name} className="flex justify-between items-center p-4 bg-white/10 rounded-xl border border-white/15 hover:bg-white/15 transition-colors">
                      <span className="font-bold text-sm text-white">{item.name}</span>
                      <span className="text-white font-extrabold text-xs uppercase tracking-wider bg-white/15 px-2.5 py-1 rounded-md">
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
                
                <p className="text-xs text-white/75 leading-relaxed italic">
                  * All advanced services include a preliminary strategy review and upfront flat-fee quote before official engagement.
                </p>
              </div>
              <div className="mt-auto relative z-10">
                <Link 
                  to="/get-started" 
                  className="w-full bg-white text-[#0f172a] font-extrabold py-5 rounded-2xl text-center flex items-center justify-center gap-2 hover:bg-[#eff6ff] transition-all active:scale-95"
                >
                  Request a Consultation
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Included Free With Every Return Strip */}
          <div className="bg-[#f8fafc] border border-[#dbeafe] rounded-3xl p-8 mb-16">
            <div className="flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-widest text-[#1d4ed8] mb-4">
              <ShieldCheck className="w-4 h-4" />
              <span>Included Free With Every Taxiva LLC Return</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                "Free 3-Year Prior Return Review",
                "24–48 Hour Tax Draft Summary",
                "CPA & EA Line-by-Line Verification",
                "Year-Round W-4 & Withholding Guidance"
              ].map((benefit) => (
                <div key={benefit} className="bg-white p-4 rounded-2xl border border-[#dbeafe] flex items-center gap-2.5 text-xs sm:text-sm font-bold text-[#0f172a]">
                  <CheckCircle2 className="w-4 h-4 text-[#1d4ed8] shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Pricing Table */}
          <div className="bg-white rounded-[2.5rem] border border-[#dbeafe] shadow-xl overflow-hidden mb-16">
            <div className="bg-[#f8fafc] border-b border-[#dbeafe] px-8 py-6">
              <h3 className="text-xl font-extrabold text-[#0f172a] mb-1">Service Fee Schedule</h3>
              <p className="text-[#334155] text-xs font-medium">A baseline guide for standard service engagements.</p>
            </div>
            <table className="w-full text-left">
              <thead className="bg-[#f8fafc] border-b border-[#dbeafe]">
                <tr>
                  <th className="px-8 py-3.5 text-[#2563eb] font-extrabold uppercase tracking-widest text-[10px]">Service Scope</th>
                  <th className="px-8 py-3.5 text-[#2563eb] font-extrabold uppercase tracking-widest text-[10px] text-right">Pricing Model</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eff6ff]">
                {pricingData.map((item) => (
                  <tr key={item.service} className="hover:bg-[#f8fafc] transition-all group">
                    <td className="px-8 py-3.5 text-[#0f172a] font-bold text-xs sm:text-sm">{item.service}</td>
                    <td className="px-8 py-3.5 text-[#1d4ed8] font-extrabold text-right text-xs sm:text-sm italic">{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="p-6 bg-[#f8fafc] border-t border-[#dbeafe] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-[#334155]">
                <Info className="w-5 h-5 text-[#1d4ed8]" />
                <span>Speak to a lead accountant for an exact flat-fee quote before you file.</span>
              </div>
              <Link to="/get-started" className="bg-[#1d4ed8] text-white font-extrabold px-6 py-2.5 rounded-xl hover:bg-[#1e40af] transition-all text-sm">
                Book Strategy Session
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Hook */}
      <section className="py-16 border-t border-[#dbeafe]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-[#eff6ff] text-[#1d4ed8] rounded-2xl flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-8 h-8" />
          </div>
          <h3 className="text-3xl font-extrabold text-[#0f172a] mb-3">Pricing FAQ</h3>
          <p className="text-[#334155] mb-8 font-medium">Have more specific questions about our fee structure or payment formats?</p>
          <div className="flex justify-center flex-wrap gap-4">
            <Link to="/contact" className="text-[#1d4ed8] font-extrabold hover:underline">How do I pay?</Link>
            <span className="text-[#bfdbfe]">•</span>
            <Link to="/contact" className="text-[#1d4ed8] font-extrabold hover:underline">Are there state fees?</Link>
            <span className="text-[#bfdbfe]">•</span>
            <Link to="/contact" className="text-[#1d4ed8] font-extrabold hover:underline">Do you offer referral discounts?</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
