/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MessageSquare as LucideMessageSquare,
  MapPin,
  Calendar,
  UploadCloud,
  ChevronRight,
  FileText,
  Clock,
  Building2
} from "lucide-react";

export default function Contact() {
  const contactMethods = [
    {
      title: "Call Now (EST)",
      value: "737-381-2330",
      href: "tel:737-381-2330",
      icon: Phone
    },
    {
      title: "Email Us",
      value: "info@taxiva.co",
      href: "mailto:info@taxiva.co",
      icon: Mail
    },
    {
      title: "WhatsApp",
      value: "+91 996-3260-743",
      href: "https://wa.me/919963260743",
      icon: LucideMessageSquare
    },
    {
      title: "Office Hours",
      value: "Mon – Sat: 9 AM – 7 PM EST",
      href: "/get-started",
      icon: Clock
    }
  ];

  return (
    <div className="flex flex-col w-full bg-white text-[#0f172a]">
      <section className="bg-white py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16 items-start">
            {/* Left Column: Info */}
            <div className="space-y-10">
              <div>
                <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-[#1d4ed8] bg-[#eff6ff] px-3.5 py-1.5 rounded-lg border border-[#dbeafe] mb-4">
                  New York, NY Head Office • Eastern Standard Time (EST)
                </span>
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-4xl sm:text-6xl font-black text-[#0f172a] mb-5 font-display tracking-tight"
                >
                  Contact <span className="text-[#1d4ed8] uppercase">TAXIVA LLC</span>
                </motion.h1>
                <p className="text-lg sm:text-xl text-[#334155]/90 leading-relaxed max-w-xl font-medium">
                  Have a question about individual tax filing, New York (NY) main company formation & business taxes, FBAR & foreign reporting, or Indian tax & NRI compliance? Our New York (EST) CPA & Enrolled Agent team is here to help.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {contactMethods.map((method) =>
                  method.href.startsWith("/") ? (
                    <Link
                      key={method.title}
                      to={method.href}
                      className="p-5 rounded-3xl border border-[#dbeafe] bg-[#f8fafc] flex items-start gap-4 hover:bg-white hover:shadow-xl transition-all group"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-[#eff6ff] text-[#0f172a] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <method.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-xs font-extrabold text-[#2563eb] uppercase tracking-widest mb-1">
                          {method.title}
                        </h4>
                        <p className="font-extrabold text-[#0f172a] break-all text-sm">{method.value}</p>
                      </div>
                    </Link>
                  ) : (
                    <a
                      key={method.title}
                      href={method.href}
                      className="p-5 rounded-3xl border border-[#dbeafe] bg-[#f8fafc] flex items-start gap-4 hover:bg-white hover:shadow-xl transition-all group"
                    >
                      <div className="w-12 h-12 rounded-2xl bg-[#eff6ff] text-[#0f172a] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        <method.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="text-xs font-extrabold text-[#2563eb] uppercase tracking-widest mb-1">
                          {method.title}
                        </h4>
                        <p className="font-extrabold text-[#0f172a] break-all text-sm">{method.value}</p>
                      </div>
                    </a>
                  )
                )}
              </div>

              {/* Head Office: New York, NY (EST) */}
              <div className="bg-[#0f172a] text-white rounded-3xl p-7 sm:p-8 border border-white/15 shadow-xl space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-2xl font-extrabold text-white font-display">
                    Head Office — New York, NY (EST)
                  </h3>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider bg-white/15 border border-white/25 px-3 py-1 rounded-lg">
                    NY Main Formation Hub
                  </span>
                </div>

                <div className="flex items-start gap-4 pt-1">
                  <div className="w-12 h-12 bg-white text-[#0f172a] rounded-2xl flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-black text-white text-lg">New York Corporate Headquarters (EST)</p>
                    <p className="text-sm text-white/90 font-semibold">
                      One World Trade Center, Suite 8500, New York, NY 10007, USA
                    </p>
                    <p className="text-xs text-white/80 leading-relaxed pt-1">
                      <Building2 className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5" />
                      New York (NY) is our primary company formation jurisdiction and executive headquarters, serving clients across all 50 U.S. states and international time zones on Eastern Standard Time (EST).
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Quick Actions */}
            <div className="bg-[#f8fafc] rounded-[40px] p-8 lg:p-12 border-2 border-[#dbeafe] shadow-sm space-y-5">
              <h3 className="text-2xl font-extrabold text-[#0f172a] mb-4 font-display">Quick Actions</h3>

              <Link
                to="/get-started"
                className="w-full group bg-white border border-[#dbeafe] p-6 rounded-3xl flex items-center justify-between hover:shadow-xl hover:border-[#1d4ed8] transition-all active:scale-[0.98]"
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-[#0f172a] text-white rounded-2xl flex items-center justify-center shrink-0">
                    <Calendar className="w-7 h-7" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-extrabold text-[#0f172a] text-lg">Book a Consultation</h4>
                    <p className="text-sm text-[#334155]">
                      Fill out our intake form & our New York (EST) team will respond automatically.
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-6 h-6 text-[#2563eb] group-hover:translate-x-1 transition-transform shrink-0" />
              </Link>

              <Link
                to="/get-started"
                className="w-full group bg-white border border-[#dbeafe] p-6 rounded-3xl flex items-center justify-between hover:shadow-xl hover:border-[#1d4ed8] transition-all active:scale-[0.98]"
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-[#eff6ff] text-[#0f172a] rounded-2xl flex items-center justify-center shrink-0">
                    <FileText className="w-7 h-7" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-extrabold text-[#0f172a] text-lg">Get in Touch — Talk to a Tax Pro</h4>
                    <p className="text-sm text-[#334155]">
                      Request your personalized quote for Personal Taxes or My Business.
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-6 h-6 text-[#2563eb] group-hover:translate-x-1 transition-transform shrink-0" />
              </Link>

              <a
                href="https://app.canopytax.com/#/login?redirect_url=https%3A%2F%2Fapp.canopytax.com%2F%23%2Fclient"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full group bg-white border border-[#dbeafe] p-6 rounded-3xl flex items-center justify-between hover:shadow-xl hover:border-[#1d4ed8] transition-all active:scale-[0.98]"
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-[#eff6ff] text-[#0f172a] rounded-2xl flex items-center justify-center shrink-0">
                    <UploadCloud className="w-7 h-7" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-extrabold text-[#0f172a] text-lg">Upload Documents (Canopy Portal)</h4>
                    <p className="text-sm text-[#334155]">
                      Securely send your tax files via our Canopy Everything Access Portal.
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-6 h-6 text-[#2563eb] group-hover:translate-x-1 transition-transform shrink-0" />
              </a>

              <div className="pt-6 border-t border-[#dbeafe]">
                <p className="text-xs text-center text-[#2563eb] font-bold">
                  Average response time: 2–4 business hours (EST) • 256-Bit Secure Encryption
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
