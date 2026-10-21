/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { CheckCircle2, DollarSign, Calculator, HelpCircle, ArrowRight } from "lucide-react";
import TaxFilingArtwork from "../components/TaxFilingArtwork";

const services = [
  "W-2 employee tax returns",
  "1099-NEC / self-employment income",
  "Schedule C business income",
  "Stock sales / Form 1099-B",
  "RSU and ESPP reporting",
  "Crypto transactions",
  "Rental property income",
  "Mortgage interest & itemized deductions",
  "Child tax credit & education credits",
  "W-7 assistance / ITIN Support",
  "Amendment filing",
  "Extension filing",
  "Multi-state tax returns",
];

export default function IndividualTax() {
  return (
    <div className="flex flex-col w-full">
      <section className="bg-slate-950 py-20 text-white relative overflow-hidden border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-6"
            >
              <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-amber-400 bg-blue-950 border border-blue-800 px-3.5 py-1.5 rounded-lg mb-4">
                IRS Form 1040 • All 50 States
              </span>
              <h1 className="text-4xl sm:text-6xl font-bold mb-6 font-display">Individual Tax Filing</h1>
              <p className="text-lg sm:text-xl text-blue-100 leading-relaxed mb-8">
                Taxiva LLC provides CPA-reviewed federal and multi-state tax preparation for individuals, families, W-2 & 1099 professionals, RSU/ESPP equity holders, and real estate investors.
              </p>
              <Link
                to="/get-started"
                className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 px-7 py-3.5 rounded-xl font-extrabold text-base hover:bg-amber-300 transition-all"
              >
                <span>Start Your Individual Return</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden border border-slate-700 shadow-2xl aspect-[16/10]">
                <TaxFilingArtwork
                  variant="individual-1040"
                  alt="Individual Form 1040 Tax Filing Visual Showcase"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-blue-900" />
                Comprehensive Coverage
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {services.map((service) => (
                  <Link 
                    key={service} 
                    to="/get-started"
                    className="flex items-center gap-3 text-gray-600 hover:text-blue-900 group transition-colors"
                  >
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0 group-hover:scale-150 transition-transform" />
                    <span className="text-sm font-medium">{service}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <DollarSign className="w-24 h-24 text-blue-900" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Pricing & Value</h3>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  Start your individual tax filing today. Pricing starts at <span className="font-bold text-gray-900 italic">$89</span> for simple federal + state filing. Final pricing depends on your tax situation, number of forms, states, schedules, and complexity.
                </p>
                <Link to="/pricing" className="text-blue-900 font-bold flex items-center gap-2 hover:gap-3 transition-all">
                  See Detailed Pricing <Calculator className="w-5 h-5" />
                </Link>
              </div>

              <div className="bg-blue-50/50 rounded-3xl p-8 border border-blue-100 shadow-sm">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <HelpCircle className="w-6 h-6 text-blue-900" />
                  Why Choose Taxiva LLC?
                </h3>
                <ul className="space-y-4">
                  <li className="flex gap-4">
                    <div className="font-bold text-blue-900">01</div>
                    <p className="text-sm text-gray-600 text-sm">Proactive guidance on RSU, ESPP, and Stock reporting to avoid overpayment.</p>
                  </li>
                  <li className="flex gap-4">
                    <div className="font-bold text-blue-900">02</div>
                    <p className="text-sm text-gray-600 text-sm">Expert analysis of multi-state filing requirements for digital nomads and remote workers.</p>
                  </li>
                  <li className="flex gap-4">
                    <div className="font-bold text-blue-900">03</div>
                    <p className="text-sm text-gray-600 text-sm">Dedicated support for crypto enthusiasts with complex gain/loss calculations.</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Ready to file your returns?</h2>
            <Link 
              to="/get-started" 
              className="bg-blue-900 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-blue-800 transition-all inline-block shadow-2xl shadow-blue-900/20 active:scale-95"
            >
              Start Filing with Taxiva LLC
            </Link>
        </div>
      </section>
    </div>
  );
}
