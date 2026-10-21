/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ShieldAlert, Globe, AlertTriangle, ArrowRight } from "lucide-react";
import TaxFilingArtwork from "../components/TaxFilingArtwork";

export default function ForeignReporting() {
  return (
    <div className="flex flex-col w-full">
      <section className="bg-slate-950 py-20 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-6"
            >
              <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-3.5 py-1.5 rounded-lg mb-4">
                FinCEN Form 114 • IRS Form 8938 (FATCA)
              </span>
              <h1 className="text-4xl sm:text-6xl font-bold mb-6 font-display">FBAR, FATCA & Foreign Reporting</h1>
              <p className="text-lg sm:text-xl text-blue-100 leading-relaxed mb-8">
                Navigate U.S. reporting requirements for foreign bank accounts, NRE/NRO balances, mutual funds, and overseas assets with CPA-verified accuracy.
              </p>
              <Link
                to="/get-started"
                className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 px-7 py-3.5 rounded-xl font-extrabold text-base hover:bg-amber-300 transition-all"
              >
                <span>Start Your FBAR Filing</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden border border-slate-700 shadow-2xl aspect-[16/10]">
                <TaxFilingArtwork
                  variant="fbar-fincen114"
                  alt="FBAR FinCEN Form 114 and FATCA Form 8938 Foreign Account Reporting Visual"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              <div className="prose prose-lg text-gray-600">
                <p>
                  If you are a U.S. citizen, green card holder, resident alien, or qualifying taxpayer with foreign bank accounts, foreign investments, foreign income, or overseas assets, you may have additional U.S. reporting requirements.
                </p>
                <p className="font-bold text-gray-900">Taxiva LLC helps clients understand and prepare filings related to:</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "FBAR / FinCEN 114",
                  "FATCA / Form 8938",
                  "Foreign bank interest",
                  "Foreign rental income",
                  "Foreign tax credit",
                  "Indian bank accounts",
                  "Indian mutual funds",
                  "Foreign business reporting",
                ].map((item) => (
                  <Link 
                    key={item} 
                    to="/get-started"
                    className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 text-sm font-bold text-gray-800 hover:bg-white hover:border-blue-900/10 hover:shadow-md transition-all group"
                  >
                    <Globe className="w-5 h-5 text-blue-900 group-hover:scale-110 transition-transform" />
                    <span className="group-hover:text-blue-900">{item}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-red-50 p-8 rounded-3xl border border-red-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <AlertTriangle className="w-20 h-20 text-red-900" />
                </div>
                <h3 className="text-2xl font-bold text-red-900 mb-4 flex items-center gap-2">
                  <ShieldAlert className="w-6 h-6" />
                  Compliance Warning
                </h3>
                <p className="text-red-800/80 text-sm leading-relaxed font-medium">
                  Foreign reporting penalties can be significant. Failure to file FBAR or FATCA can lead to substantial fines, often starting at $10,000 per violation. We recommend reviewing your situation carefully before filing.
                </p>
              </div>

              <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100">
                <h3 className="text-2xl font-bold text-blue-900 mb-4">Streamline Your Filing</h3>
                <p className="text-blue-800/80 text-sm mb-6">
                  Our New York, NY (EST) team handles the complex data collection and form preparation required for international compliance.
                </p>
                <Link to="/get-started" className="inline-flex items-center gap-2 text-blue-900 font-bold hover:gap-3 transition-all">
                  Get a Compliance Review <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
