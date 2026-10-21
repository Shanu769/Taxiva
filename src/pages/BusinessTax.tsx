/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Briefcase, Building2, Users, FileText, BarChart3, Rocket, ArrowRight } from "lucide-react";
import TaxFilingArtwork from "../components/TaxFilingArtwork";

const returns = [
  { type: "Sole Proprietor", form: "Schedule C / Form 1040" },
  { type: "Partnership / Multi-Member LLC", form: "Form 1065" },
  { type: "S Corporation", form: "Form 1120S" },
  { type: "C Corporation", form: "Form 1120" },
  { type: "Foreign-owned U.S. LLC", form: "Form 5472 / Pro forma 1120" },
  { type: "New York (NY) Main Company Formation", form: "NY LLC / Corp Registration & All 50 States" },
  { type: "Payroll / Contractor Reporting", form: "W-2, 1099-NEC, 1099-MISC" },
];

export default function BusinessTax() {
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
              <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-amber-400 bg-blue-950 border border-blue-800 px-3.5 py-1.5 rounded-lg mb-4">
                Forms 1120-S • 1065 • 1120 • Schedule K-1
              </span>
              <h1 className="text-4xl sm:text-6xl font-bold mb-6 font-display">Business Tax Filing</h1>
              <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-8">
                Taxiva LLC supports small businesses, LLCs, partnerships, S corporations, consultants, and entrepreneurs with accurate corporate tax filing and year-round IRS compliance.
              </p>
              <Link
                to="/get-started"
                className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 px-7 py-3.5 rounded-xl font-extrabold text-base hover:bg-amber-300 transition-all"
              >
                <span>Start Your Business Return</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden border border-slate-700 shadow-2xl aspect-[16/10]">
                <TaxFilingArtwork
                  variant="business-1120s"
                  alt="Business Tax Filing S-Corp 1120-S and Partnership 1065 Visual Showcase"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Business Returns We Support</h2>
              <div className="overflow-hidden bg-white border border-gray-100 rounded-3xl shadow-sm">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="px-6 py-4 font-bold text-gray-900">Entity Type</th>
                      <th className="px-6 py-4 font-bold text-gray-900">Tax Form</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {returns.map((item) => (
                      <tr 
                        key={item.type} 
                        className="hover:bg-blue-50/30 transition-colors cursor-pointer group"
                        onClick={() => window.location.href = '/get-started'}
                      >
                        <td className="px-6 py-4 text-gray-700 font-medium group-hover:text-blue-900">{item.type}</td>
                        <td className="px-6 py-4 text-blue-900 font-mono text-sm">{item.form}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center lg:text-left">Additional Services</h2>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { title: "Payroll Support", icon: Users },
                  { title: "1099 Filing", icon: BarChart3 },
                  { title: "Tax Planning", icon: Rocket },
                  { title: "Entity Formation", icon: Building2 },
                  { title: "Multi-State Compliance", icon: FileText },
                  { title: "Corporate Advisory", icon: Briefcase },
                ].map((service) => (
                  <Link 
                    key={service.title} 
                    to="/get-started"
                    className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-4 hover:shadow-md hover:bg-white hover:border-blue-900/10 transition-all group"
                  >
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-900 group-hover:scale-110 transition-transform">
                      <service.icon className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-gray-900 group-hover:text-blue-900">{service.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Need expert business support?</h2>
          <p className="text-gray-600 mb-10">We help you stay compliant while you focus on growing your company. Submit your intake form with our team today.</p>
          <Link to="/get-started" className="bg-blue-900 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-blue-800 transition-all inline-block shadow-xl">
            Book a Business Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
