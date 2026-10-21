/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Landmark, FileCheck, Globe, CreditCard, PieChart, ArrowRight } from "lucide-react";
import TaxFilingArtwork from "../components/TaxFilingArtwork";

export default function IndianTax() {
  return (
    <div className="flex flex-col w-full">
      <section className="bg-slate-950 py-20 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="lg:col-span-6"
            >
              <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-amber-400 bg-amber-950/70 border border-amber-800 px-3.5 py-1.5 rounded-lg mb-4">
                US-India DTAA • Form 1116 • Indian ITR-2 / ITR-3
              </span>
              <h1 className="text-4xl sm:text-6xl font-bold mb-6 font-display">Indian Tax & NRI Services</h1>
              <p className="text-lg sm:text-xl text-blue-100 leading-relaxed mb-8">
                Taxiva LLC provides cross-border tax preparation and DTAA advisory for NRIs, H-1B/L-1 visa holders, and U.S. residents with income or assets in both the United States and India.
              </p>
              <Link
                to="/get-started"
                className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 px-7 py-3.5 rounded-xl font-extrabold text-base hover:bg-amber-300 transition-all"
              >
                <span>Start Your NRI Tax Filing</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden border border-slate-700 shadow-2xl aspect-[16/10]">
                <TaxFilingArtwork
                  variant="nri-dtaa-1116"
                  alt="Indian Tax and NRI US-India DTAA Tax Advisory Visual"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Cross-Border Tax Expertise</h2>
            <p className="text-gray-600 leading-relaxed">
              Managing taxes across two different legal systems is challenging. We help you navigate the DTAA (Double Taxation Avoidance Agreement) and ensure you are not taxed twice on the same income.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Indian IT Return", desc: "Support for filing Indian income tax returns for NRIs.", icon: FileCheck },
              { title: "Capital Gains", desc: "Reporting coordination for Indian stocks, real estate, and mutual funds.", icon: PieChart },
              { title: "Tax Credit Guidance", desc: "Maximized Foreign Tax Credits to avoid double taxation.", icon: CreditCard },
              { title: "Bank Interest", desc: "U.S. reporting for NRE/NRO account interest.", icon: Landmark },
              { title: "Rental Income", desc: "Tax preparation for rental property located in India.", icon: Landmark },
              { title: "Asset Reporting", desc: "U.S. reporting (FBAR/FATCA) for all Indian financial assets.", icon: Globe },
            ].map((service, idx) => (
              <Link 
                key={service.title} 
                to="/get-started"
                className="p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:bg-white hover:shadow-xl transition-all group"
              >
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-indigo-900 mb-6 group-hover:scale-110 transition-transform">
                  <service.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-900">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{service.desc}</p>
              </Link>
            ))}
          </div>

          <div className="mt-20 bg-indigo-50 rounded-3xl p-8 lg:p-12 border border-indigo-100 flex flex-col lg:flex-row items-center justify-between gap-12 text-indigo-900">
            <div className="max-w-xl">
              <h3 className="text-2xl font-bold mb-4">Dedicated Indian Tax Support</h3>
              <p className="text-indigo-800/80 leading-relaxed font-medium text-sm">
                Our team understands the nuances of the US-India tax treaty. We coordinate with Indian tax professionals when necessary to ensure your global compliance is seamless.
              </p>
            </div>
            <Link to="/get-started" className="bg-indigo-900 text-white min-w-[200px] text-center px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-indigo-800 transition-all">
              Connect with NRI Experts
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
