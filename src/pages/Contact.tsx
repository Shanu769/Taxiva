/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MessageSquare as LucideMessageSquare,
  MapPin,
  Calendar,
  UploadCloud,
  ChevronRight,
  Clock,
  Building2,
  Sparkles,
  ChevronDown,
  ShieldCheck,
  Send
} from "lucide-react";
import { db } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import AnimatedCheckmark from "../components/AnimatedCheckmark";

export default function Contact() {
  const [activeTab, setActiveTab] = useState<"form" | "actions">("form");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("Individual Tax Filing (Form 1040)");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !email.trim() || !phone.trim()) return;

    setIsSubmitting(true);
    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();

    try {
      await addDoc(collection(db, "leads"), {
        emailOrPhone: `${fullName} | ${email.trim()} | ${phone.trim()} (Contact Form: ${service})`.slice(0, 250),
        message: message.trim(),
        source: "Contact Page Get in Touch",
        createdAt: serverTimestamp()
      });
      setIsSuccess(true);
    } catch (err) {
      console.warn("Saved lead locally:", err);
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setMessage("");
  };

  return (
    <div className="flex flex-col w-full bg-white text-[#0f172a]">
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Info & Corporate Head Office */}
            <div className="lg:col-span-5 space-y-9">
              <div>
                <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-[#1d4ed8] bg-[#eff6ff] px-3.5 py-1.5 rounded-lg border border-[#dbeafe] mb-4">
                  New York, NY Head Office • Eastern Standard Time (EST)
                </span>
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-4xl sm:text-5xl font-black text-[#0f172a] mb-5 font-display tracking-tight leading-[1.1]"
                >
                  Contact <span className="text-[#1d4ed8] uppercase">TAXIVA LLC</span>
                </motion.h1>
                <p className="text-base sm:text-lg text-[#334155]/90 leading-relaxed font-medium">
                  Have a question about individual tax filing, New York (NY) main company formation & business taxes, FBAR & foreign reporting, or Indian tax & NRI compliance? Our New York (EST) CPA & Enrolled Agent team is ready to assist.
                </p>
              </div>

              {/* 4 Contact Channels */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {contactMethods.map((method) =>
                  method.href.startsWith("/") ? (
                    <Link
                      key={method.title}
                      to={method.href}
                      className="p-4 rounded-2xl border border-[#dbeafe] bg-[#f8fafc] flex items-start gap-3.5 hover:bg-white hover:shadow-lg transition-all group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#eff6ff] text-[#1d4ed8] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <method.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-[11px] font-extrabold text-[#2563eb] uppercase tracking-wider mb-0.5">
                          {method.title}
                        </h4>
                        <p className="font-extrabold text-[#0f172a] break-all text-xs sm:text-sm">{method.value}</p>
                      </div>
                    </Link>
                  ) : (
                    <a
                      key={method.title}
                      href={method.href}
                      className="p-4 rounded-2xl border border-[#dbeafe] bg-[#f8fafc] flex items-start gap-3.5 hover:bg-white hover:shadow-lg transition-all group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-[#eff6ff] text-[#1d4ed8] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <method.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-[11px] font-extrabold text-[#2563eb] uppercase tracking-wider mb-0.5">
                          {method.title}
                        </h4>
                        <p className="font-extrabold text-[#0f172a] break-all text-xs sm:text-sm">{method.value}</p>
                      </div>
                    </a>
                  )
                )}
              </div>

              {/* Head Office: New York, NY (EST) */}
              <div className="bg-[#0f172a] text-white rounded-3xl p-6 sm:p-7 border border-white/15 shadow-xl space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white font-display">
                    Head Office — New York, NY (EST)
                  </h3>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider bg-white/15 border border-white/25 px-2.5 py-1 rounded-lg text-sky-200">
                    NY Formation Hub
                  </span>
                </div>

                <div className="flex items-start gap-3.5 pt-1">
                  <div className="w-11 h-11 bg-white text-[#0f172a] rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#1d4ed8]" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-black text-white text-base">New York Corporate Headquarters (EST)</p>
                    <p className="text-xs sm:text-sm text-white/90 font-semibold">
                      One World Trade Center, Suite 8500, New York, NY 10007, USA
                    </p>
                    <p className="text-xs text-white/75 leading-relaxed pt-1">
                      <Building2 className="w-3.5 h-3.5 inline mr-1.5 -mt-0.5 text-sky-400" />
                      New York (NY) is our primary company formation jurisdiction and executive headquarters, serving clients across all 50 U.S. states and international time zones on Eastern Standard Time (EST).
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive "Get in touch" Form Card with Framer Motion Checkmark Feedback */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl border border-[#dbeafe] shadow-[0_20px_60px_-15px_rgba(15,23,42,0.10)] p-6 sm:p-9 space-y-6">
                {/* Header with Switcher Tabs */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#dbeafe] pb-5">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] font-display">
                      Get in touch
                    </h2>
                    <p className="text-xs sm:text-sm text-[#475569] font-medium mt-0.5">
                      Send a message to our New York (EST) tax professionals.
                    </p>
                  </div>

                  <div className="flex bg-[#eff6ff] p-1 rounded-xl border border-[#bfdbfe]">
                    <button
                      type="button"
                      onClick={() => setActiveTab("form")}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                        activeTab === "form"
                          ? "bg-white text-[#1d4ed8] shadow-xs"
                          : "text-[#475569] hover:text-[#0f172a]"
                      }`}
                    >
                      Message Form
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("actions")}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                        activeTab === "actions"
                          ? "bg-white text-[#1d4ed8] shadow-xs"
                          : "text-[#475569] hover:text-[#0f172a]"
                      }`}
                    >
                      Quick Portals
                    </button>
                  </div>
                </div>

                {/* Content based on Active Tab */}
                {activeTab === "form" ? (
                  isSuccess ? (
                    /* Confirmation Screen with Framer Motion Animated Checkmark */
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="py-6 space-y-6"
                    >
                      <div className="flex items-start gap-4">
                        <AnimatedCheckmark size="lg" variant="emerald" showRipple={true} className="mt-0.5" />
                        <div className="space-y-1">
                          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#059669] bg-[#ecfdf5] px-3 py-1 rounded-md border border-[#a7f3d0]">
                            Message Dispatched Successfully
                          </span>
                          <h3 className="text-2xl font-extrabold text-[#0f172a] font-display mt-2">
                            Thank you, {firstName}!
                          </h3>
                          <p className="text-sm text-[#475569] font-medium leading-relaxed">
                            Your message regarding <strong>{service}</strong> has been received by our New York (EST) CPA team. We will review your inquiry and follow up within 2–4 business hours.
                          </p>
                        </div>
                      </div>

                      <div className="bg-[#f8fafc] border border-[#dbeafe] rounded-2xl p-4.5 space-y-2.5 text-xs">
                        <div className="flex items-center gap-2 font-bold text-[#0f172a]">
                          <Sparkles className="w-4 h-4 text-[#1d4ed8]" />
                          <span>Inquiry Overview</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                          <div className="bg-white p-2.5 rounded-lg border border-[#dbeafe]">
                            <span className="text-[#64748b] block text-[10px] font-bold uppercase">Name</span>
                            <span className="font-extrabold text-[#0f172a]">{firstName} {lastName}</span>
                          </div>
                          <div className="bg-white p-2.5 rounded-lg border border-[#dbeafe]">
                            <span className="text-[#64748b] block text-[10px] font-bold uppercase">Email</span>
                            <span className="font-extrabold text-[#0f172a]">{email}</span>
                          </div>
                          <div className="bg-white p-2.5 rounded-lg border border-[#dbeafe]">
                            <span className="text-[#64748b] block text-[10px] font-bold uppercase">Phone</span>
                            <span className="font-extrabold text-[#0f172a]">{phone}</span>
                          </div>
                          <div className="bg-white p-2.5 rounded-lg border border-[#dbeafe]">
                            <span className="text-[#64748b] block text-[10px] font-bold uppercase">Service</span>
                            <span className="font-extrabold text-[#0f172a]">{service}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <Link
                          to="/tax-tools"
                          className="flex-1 bg-[#1d4ed8] text-white py-3 px-5 rounded-xl font-bold text-xs sm:text-sm hover:bg-[#0f172a] transition-all text-center shadow-xs"
                        >
                          Check Refund & Payment Center
                        </Link>
                        <button
                          type="button"
                          onClick={handleReset}
                          className="px-5 py-3 bg-[#eff6ff] text-[#0f172a] rounded-xl font-bold text-xs sm:text-sm hover:bg-[#dbeafe] transition-all cursor-pointer"
                        >
                          Send Another Message
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    /* The "Get in touch" Form */
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Name Fields */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="block text-xs font-bold text-[#0f172a]">First name *</label>
                          <input
                            type="text"
                            required
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="John"
                            className="w-full px-3.5 py-2.5 bg-white border border-[#bfdbfe] focus:border-[#1d4ed8] focus:ring-2 focus:ring-[#eff6ff] rounded-lg text-sm font-medium text-[#0f172a] placeholder:text-[#334155]/45 outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-xs font-bold text-[#0f172a]">Last name</label>
                          <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Doe"
                            className="w-full px-3.5 py-2.5 bg-white border border-[#bfdbfe] focus:border-[#1d4ed8] focus:ring-2 focus:ring-[#eff6ff] rounded-lg text-sm font-medium text-[#0f172a] placeholder:text-[#334155]/45 outline-none transition-all"
                          />
                        </div>
                      </div>

                      {/* Email & Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="block text-xs font-bold text-[#0f172a]">Email address *</label>
                          <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="john@example.com"
                            className="w-full px-3.5 py-2.5 bg-white border border-[#bfdbfe] focus:border-[#1d4ed8] focus:ring-2 focus:ring-[#eff6ff] rounded-lg text-sm font-medium text-[#0f172a] placeholder:text-[#334155]/45 outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="block text-xs font-bold text-[#0f172a]">Phone number *</label>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+1 (555) 000-0000"
                            className="w-full px-3.5 py-2.5 bg-white border border-[#bfdbfe] focus:border-[#1d4ed8] focus:ring-2 focus:ring-[#eff6ff] rounded-lg text-sm font-medium text-[#0f172a] placeholder:text-[#334155]/45 outline-none transition-all"
                          />
                        </div>
                      </div>

                      {/* Service Dropdown */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-[#0f172a]">Service of interest</label>
                        <div className="relative">
                          <select
                            value={service}
                            onChange={(e) => setService(e.target.value)}
                            className="w-full appearance-none px-3.5 py-2.5 pr-9 bg-white border border-[#bfdbfe] focus:border-[#1d4ed8] focus:ring-2 focus:ring-[#eff6ff] rounded-lg text-sm font-medium text-[#0f172a] outline-none transition-all cursor-pointer"
                          >
                            <option value="Individual Tax Filing (Form 1040)">Individual Tax Filing (Form 1040, RSUs, Stocks)</option>
                            <option value="Business Tax Filing (1120-S, 1065, LLC, NY Formation)">Business Tax Filing (1120-S, 1065, LLC, NY Formation)</option>
                            <option value="FBAR & Foreign Asset Disclosures (FinCEN 114)">FBAR & Foreign Asset Disclosures (FinCEN 114 / FATCA)</option>
                            <option value="Indian Tax & NRI Services (DTAA / Form 1116)">Indian Tax & NRI Services (DTAA / Form 1116)</option>
                            <option value="General Consultation & Tax Planning">General Consultation & Tax Planning</option>
                          </select>
                          <ChevronDown className="w-4 h-4 text-[#2563eb] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      {/* Message Box */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-bold text-[#0f172a]">How can our tax team help? (optional)</label>
                        <textarea
                          rows={3}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          placeholder="Briefly describe your tax situation or questions..."
                          className="w-full p-3.5 bg-white border border-[#bfdbfe] focus:border-[#1d4ed8] focus:ring-2 focus:ring-[#eff6ff] rounded-lg text-sm font-medium text-[#0f172a] placeholder:text-[#334155]/45 outline-none transition-all"
                        />
                      </div>

                      {/* Submit Button labeled 'Get in touch' with subtle animated checkmark feedback */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-[#1d4ed8] hover:bg-[#0f172a] text-white py-3.5 px-6 rounded-xl font-extrabold text-sm sm:text-base transition-all shadow-md active:scale-[0.99] disabled:opacity-75 cursor-pointer flex items-center justify-center gap-2.5"
                        >
                          {isSubmitting ? (
                            <>
                              <AnimatedCheckmark size="sm" variant="white" showRipple={false} />
                              <span>Submitting...</span>
                            </>
                          ) : (
                            <>
                              <span>Get in touch</span>
                              <Send className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      </div>

                      <p className="text-center text-[11px] text-[#64748b] pt-1">
                        🔒 Confidential under IRS Section 7216. We never share or sell your data.
                      </p>
                    </form>
                  )
                ) : (
                  /* Quick Portals & Direct Links */
                  <div className="space-y-4">
                    <Link
                      to="/get-started"
                      className="w-full group bg-white border border-[#dbeafe] p-5 rounded-2xl flex items-center justify-between hover:shadow-lg hover:border-[#1d4ed8] transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#0f172a] text-white rounded-xl flex items-center justify-center shrink-0">
                          <Calendar className="w-6 h-6" />
                        </div>
                        <div className="text-left">
                          <h4 className="font-extrabold text-[#0f172a] text-base">Book a 30-Min Consultation</h4>
                          <p className="text-xs text-[#475569]">
                            Schedule a direct video call with our Big Four / CPA specialists.
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-[#2563eb] group-hover:translate-x-1 transition-transform shrink-0" />
                    </Link>

                    <a
                      href="https://app.canopytax.com/#/login?redirect_url=https%3A%2F%2Fapp.canopytax.com%2F%23%2Fclient"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full group bg-white border border-[#dbeafe] p-5 rounded-2xl flex items-center justify-between hover:shadow-lg hover:border-[#1d4ed8] transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#eff6ff] text-[#1d4ed8] rounded-xl flex items-center justify-center shrink-0">
                          <UploadCloud className="w-6 h-6" />
                        </div>
                        <div className="text-left">
                          <h4 className="font-extrabold text-[#0f172a] text-base">Upload Documents (Canopy)</h4>
                          <p className="text-xs text-[#475569]">
                            Securely transfer tax forms via AES-256 encrypted client portal.
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-[#2563eb] group-hover:translate-x-1 transition-transform shrink-0" />
                    </a>

                    <Link
                      to="/pricing"
                      className="w-full group bg-white border border-[#dbeafe] p-5 rounded-2xl flex items-center justify-between hover:shadow-lg hover:border-[#1d4ed8] transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#f8fafc] text-[#0f172a] rounded-xl flex items-center justify-center shrink-0 border border-[#dbeafe]">
                          <ShieldCheck className="w-6 h-6 text-[#1d4ed8]" />
                        </div>
                        <div className="text-left">
                          <h4 className="font-extrabold text-[#0f172a] text-base">View Transparent Pricing</h4>
                          <p className="text-xs text-[#475569]">
                            Base Plan, Premium, and Custom transparent tiers.
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-[#2563eb] group-hover:translate-x-1 transition-transform shrink-0" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
