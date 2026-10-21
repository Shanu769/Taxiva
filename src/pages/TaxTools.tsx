/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { ExternalLink, ShieldCheck, Landmark, CreditCard, FileText, Map, Search, User } from "lucide-react";
import TaxCalendar from "../components/TaxCalendar";

export default function TaxTools() {
  const tools = [
    {
      title: "Federal Refund Status",
      desc: "Check your status 24 hours after e-filing. Have your SSN and amount ready.",
      link: "https://www.irs.gov/refunds",
      icon: Search,
      btn: "Check Federal Refund"
    },
    {
      title: "IRS Individual Account",
      desc: "Securely access your tax records, transcripts, and view notices online.",
      link: "https://www.irs.gov/payments/online-account-for-individuals",
      icon: User,
      btn: "Login to IRS"
    },
    {
      title: "Direct Pay (Free)",
      desc: "Pay directly from your bank account with no service fees or sign-in.",
      link: "https://www.irs.gov/payments/direct-pay-with-bank-account",
      icon: CreditCard,
      btn: "Pay Federal Tax"
    },
    {
      title: "Pay by Card",
      desc: "IRS payment via debit/credit card through third-party processors.",
      link: "https://www.irs.gov/payments/pay-your-taxes-by-debit-or-credit-card",
      icon: CreditCard,
      btn: "Pay by Card"
    },
    {
      title: "IRS Business Account",
      desc: "View business tax records, payments, and balances for your entity.",
      link: "https://www.irs.gov/businesses/business-tax-account",
      icon: Landmark,
      btn: "Business Portal"
    },
    {
      title: "Ohio Tax Portal",
      desc: "Official Ohio Department of Taxation portal for individual and business tax management.",
      link: "https://www.tax.ohio.gov/",
      icon: Landmark,
      btn: "Login to Ohio Tax"
    },
    {
      title: "PA Tax Services",
      desc: "Pennsylvania Department of Revenue online services for personal income tax.",
      link: "https://www.revenue.pa.gov/",
      icon: FileText,
      btn: "PA Revenue Portal"
    },
    {
      title: "Vehicle & EV Credits",
      desc: "Learn about clean vehicle tax credits for new and used electric vehicles.",
      link: "https://www.irs.gov/clean-vehicle-tax-credits",
      icon: Search,
      btn: "View EV Credits"
    },
    {
      title: "GIPS Motor Vehicle Credits",
      desc: "Access motor vehicle credit information and applications via GIPS.",
      link: "https://www.getgips.com/",
      icon: CreditCard,
      btn: "Access GIPS Credits"
    }
  ];

  return (
    <div className="flex flex-col w-full">
      <section className="bg-blue-50 py-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Refund & Payment Center</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
              Official IRS and state resources for federal refund status, individual accounts, direct payments, and tax deadlines.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-900 rounded-3xl p-8 mb-12 text-white flex flex-col md:flex-row items-center gap-8 shadow-xl shadow-blue-900/10">
            <ShieldCheck className="w-16 h-16 text-blue-300 flex-shrink-0" />
            <div className="space-y-2">
              <h3 className="text-xl font-bold">Security Note</h3>
              <p className="text-blue-100/80 leading-relaxed text-sm">
                For your security, <strong>Taxiva LLC will never ask you to enter your IRS, ID.me, bank, or state tax portal password on our website.</strong> Please use the official links below and contact our team if you need guidance.
              </p>
            </div>
          </div>

          {/* Primary Federal Refund Status, IRS Account, Direct Pay & State Portals */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool) => (
              <div key={tool.title} className="p-8 bg-gray-50 rounded-3xl border border-gray-100 flex flex-col h-full hover:bg-white hover:shadow-xl transition-all group">
                <tool.icon className="w-10 h-10 text-blue-900 mb-6" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">{tool.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-1">{tool.desc}</p>
                <a 
                  href={tool.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full bg-white text-blue-900 border-2 border-blue-900/10 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 group-hover:bg-blue-900 group-hover:text-white group-hover:border-blue-900 transition-all active:scale-95"
                >
                  {tool.btn} <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>

          {/* State Refund / State Payment Directory */}
          <div className="mt-16 p-12 bg-gray-50 rounded-3xl border border-gray-100 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="space-y-4 max-w-xl text-center lg:text-left">
              <div className="w-12 h-12 bg-blue-900 rounded-xl flex items-center justify-center text-white mx-auto lg:mx-0">
                <Map className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">State Refund / State Payment</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Looking for your state's official tax portal? Use the official directory of state tax agencies provided by the Federation of Tax Administrators.
              </p>
            </div>
            <a 
              href="https://taxadmin.org/fta-members/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-10 py-5 bg-blue-900 text-white rounded-2xl font-bold text-lg shadow-xl active:scale-95 transition-all inline-flex items-center gap-3"
            >
              Find State Tax Agency <ExternalLink className="w-5 h-5" />
            </a>
          </div>

          {/* Tax Deadline Calendar at the Bottom */}
          <div className="mt-20 pt-16 border-t border-gray-100">
            <TaxCalendar defaultProfile="Individual" />
          </div>
        </div>
      </section>
    </div>
  );
}
