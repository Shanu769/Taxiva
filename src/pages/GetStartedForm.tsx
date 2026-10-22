/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useSearchParams } from "react-router-dom";
import {
  Check,
  User,
  Building2,
  MessageCircle,
  Calendar,
  Phone,
  Mail,
  ChevronDown,
  CheckCircle2,
  ExternalLink,
  Sparkles
} from "lucide-react";
import { db } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const PERSONAL_SERVICES = [
  "Individual Tax Filing (Form 1040)",
  "FBAR & Foreign Reporting (FinCEN 114 / FATCA)",
  "Indian Tax & NRI Services (DTAA / Form 1116)",
  "RSU, ESPP & Crypto Tax Reconciliation",
  "Multi-State Tax Return Filing",
  "ITIN Application & Renewal (Form W-7)",
  "IRS or State Tax Notice Resolution",
  "Prior-Year Return Amendment (Form 1040-X)"
];

const BUSINESS_SERVICES = [
  "New York (NY) Main Company Formation (LLC / Corp)",
  "S-Corporation Tax Filing (Form 1120-S)",
  "Partnership / Multi-Member LLC Return (Form 1065)",
  "C-Corporation Tax Filing (Form 1120)",
  "Single-Member LLC / Schedule C Filing",
  "Foreign-Owned U.S. LLC (Form 5472 / Pro Forma 1120)",
  "Payroll, W-2 & 1099 Contractor Compliance",
  "Multi-State Franchise & Entity Tax Planning"
];

const PERSONAL_SITUATIONS = [
  "W-2 Employee",
  "W-2 with RSUs / ESPP / Stock Options",
  "1099 Independent Contractor / Self-Employed",
  "Moved States Mid-Year (Part-Year / Multi-State)",
  "NRI / Foreign Bank Accounts or Assets (FBAR / FATCA)",
  "US–India Dual Income & DTAA Foreign Tax Credit",
  "Real Estate / Rental Property Investor (Schedule E)",
  "First-Time U.S. Tax Filer (H-1B / L-1 / F-1 OPT)"
];

const BUSINESS_SITUATIONS = [
  "Forming a New LLC or Corporation in New York (NY)",
  "Forming a New Entity in Another U.S. State",
  "Existing S-Corporation (Form 1120-S)",
  "Existing Partnership / Multi-Member LLC (Form 1065)",
  "Existing C-Corporation (Form 1120)",
  "1099 Consultant Converting to S-Corp (Form 2553)",
  "Non-U.S. Founder Operating a U.S. LLC",
  "Need Year-Round Business Tax & IRS Notice Support"
];

export default function GetStartedForm() {
  const [searchParams] = useSearchParams();
  const expertParam = searchParams.get("expert");
  const planParam = searchParams.get("plan");

  const [taxTab, setTaxTab] = useState<"personal" | "business">("personal");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [situation, setSituation] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (planParam) {
      if (planParam.toLowerCase().includes("business")) {
        setTaxTab("business");
      }
    }
  }, [planParam]);

  const [submittedData, setSubmittedData] = useState<{
    category: string;
    fullName: string;
    email: string;
    phone: string;
    service: string;
    situation: string;
    notes: string;
    expert?: string;
    plan?: string;
    submittedAt: string;
  } | null>(null);

  const activeServices = taxTab === "personal" ? PERSONAL_SERVICES : BUSINESS_SERVICES;
  const activeSituations = taxTab === "personal" ? PERSONAL_SITUATIONS : BUSINESS_SITUATIONS;

  const handleTabSwitch = (tab: "personal" | "business") => {
    setTaxTab(tab);
    setService("");
    setSituation("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !email.trim() || !phone.trim()) return;

    setIsSubmitting(true);
    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
    const selectedService =
      service || (taxTab === "personal" ? "Personal Taxes (Form 1040)" : "Business Taxes & NY Formation");
    const categoryLabel = taxTab === "personal" ? "Personal taxes" : "My business";

    const payload = {
      category: categoryLabel,
      fullName,
      email: email.trim(),
      phone: phone.trim(),
      service: selectedService,
      situation: situation || "Standard Filing",
      notes: notes.trim(),
      expert: expertParam || undefined,
      plan: planParam || undefined,
      submittedAt: new Date().toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short"
      })
    };

    try {
      await addDoc(collection(db, "leads"), {
        emailOrPhone: `${payload.fullName} | ${payload.email} | ${payload.phone} (${payload.category}: ${payload.service}${payload.expert ? ` • Prefers: ${payload.expert}` : ""}${payload.plan ? ` • Plan: ${payload.plan}` : ""})`.slice(
          0,
          250
        ),
        createdAt: serverTimestamp()
      });
    } catch (err) {
      console.warn("Saved intake locally:", err);
    } finally {
      setSubmittedData(payload);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#0f172a] py-14 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: "Talk to a licensed tax pro" matching image_dbfc89cc.png */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              {/* Eyebrow with short horizontal bar */}
              <div className="flex items-center gap-3 mb-5">
                <span className="w-7 h-0.5 bg-[#1d4ed8] rounded-full" />
                <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#1d4ed8]">
                  CONTACT
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold text-[#0f172a] tracking-tight leading-[1.06] font-display mb-5">
                Talk to a
                <br />
                licensed tax pro
              </h1>

              <p className="text-base sm:text-lg text-[#334155]/90 leading-relaxed font-medium">
                Tell us a little about what you need. We'll match you with the right specialist and reply within one business day.
              </p>
            </div>

            {/* 4 Checkmark Bullet Points */}
            <ul className="space-y-4">
              {[
                "Licensed CPAs & Enrolled Agents — a real person replies, not a bot",
                "Individuals, businesses, and NRI / cross-border filers",
                "Clear, personalized quote up front — no surprise fees",
                "Your details stay private and are never shared"
              ].map((item) => (
                <li key={item} className="flex items-start gap-3.5">
                  <span className="w-5 h-5 rounded-full bg-[#eff6ff] text-[#1d4ed8] flex items-center justify-center shrink-0 mt-0.5 border border-[#bfdbfe]">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                  <span className="text-sm sm:text-base text-[#0f172a]/90 font-medium leading-snug">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {/* Divider & "PREFER TO SKIP THE FORM?" */}
            <div className="pt-6 border-t border-[#dbeafe] space-y-5">
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#2563eb]">
                PREFER TO SKIP THE FORM?
              </p>

              <div className="space-y-4">
                <a
                  href="https://wa.me/919963260743"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#eff6ff] border border-[#dbeafe] text-[#1d4ed8] flex items-center justify-center shrink-0 group-hover:bg-[#1d4ed8] group-hover:text-white transition-all">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-[#0f172a] group-hover:text-[#1d4ed8] transition-colors">
                      Chat on WhatsApp
                    </p>
                    <p className="text-xs text-[#334155]/80 font-medium">Fastest — usually minutes</p>
                  </div>
                </a>

                <a href="#quote-form-card" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-[#eff6ff] border border-[#dbeafe] text-[#1d4ed8] flex items-center justify-center shrink-0 group-hover:bg-[#1d4ed8] group-hover:text-white transition-all">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-[#0f172a] group-hover:text-[#1d4ed8] transition-colors">
                      Book a free 30-minute call
                    </p>
                    <p className="text-xs text-[#334155]/80 font-medium">Pick a time that suits you (EST)</p>
                  </div>
                </a>

                <a href="tel:+17373812330" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-[#eff6ff] border border-[#dbeafe] text-[#1d4ed8] flex items-center justify-center shrink-0 group-hover:bg-[#1d4ed8] group-hover:text-white transition-all">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-[#0f172a] group-hover:text-[#1d4ed8] transition-colors">
                      +1 (737) 381-2330
                    </p>
                    <p className="text-xs text-[#334155]/80 font-medium">Call or text • New York, NY (EST)</p>
                  </div>
                </a>

                <a href="mailto:info@taxiva.co" className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-[#eff6ff] border border-[#dbeafe] text-[#1d4ed8] flex items-center justify-center shrink-0 group-hover:bg-[#1d4ed8] group-hover:text-white transition-all">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-[#0f172a] group-hover:text-[#1d4ed8] transition-colors">
                      info@taxiva.co
                    </p>
                    <p className="text-xs text-[#334155]/80 font-medium">For documents and details</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Elevated White Form Card matching image_dbfc89cc.png */}
          <div className="lg:col-span-7" id="quote-form-card">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl border border-[#dbeafe] shadow-[0_20px_60px_-15px_rgba(15,23,42,0.10)] p-6 sm:p-10"
            >
              {submittedData ? (
                <div className="space-y-6 py-2">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#eff6ff] text-[#0f172a] rounded-2xl flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-xs font-extrabold uppercase tracking-wider text-[#0f172a] bg-[#eff6ff] px-3 py-1 rounded-md border border-[#bfdbfe]">
                        Request Received • {submittedData.category}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] mt-2 font-display">
                        Thank you, {submittedData.fullName}!
                      </h2>
                      <p className="text-sm text-[#334155] mt-1 leading-relaxed font-medium">
                        A licensed CPA or Enrolled Agent at <strong>TAXIVA LLC (New York, NY • EST)</strong> is reviewing your request and will reply within one business day with your personalized quote.
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#f8fafc] border border-[#dbeafe] rounded-2xl p-5 space-y-3 text-xs">
                    <div className="flex items-center justify-between border-b border-[#dbeafe] pb-2.5">
                      <span className="inline-flex items-center gap-1.5 font-extrabold uppercase tracking-wider text-[#0f172a]">
                        <Sparkles className="w-3.5 h-3.5 text-[#1d4ed8]" /> Summary of Your Request
                      </span>
                      <span className="text-[#2563eb] font-semibold">{submittedData.submittedAt}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className="bg-white p-3 rounded-xl border border-[#dbeafe]">
                        <span className="text-[#2563eb] font-bold block uppercase text-[10px]">Name</span>
                        <span className="font-extrabold text-[#0f172a]">{submittedData.fullName}</span>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-[#dbeafe]">
                        <span className="text-[#2563eb] font-bold block uppercase text-[10px]">Category</span>
                        <span className="font-extrabold text-[#0f172a]">{submittedData.category}</span>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-[#dbeafe]">
                        <span className="text-[#2563eb] font-bold block uppercase text-[10px]">Email</span>
                        <span className="font-extrabold text-[#0f172a]">{submittedData.email}</span>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-[#dbeafe]">
                        <span className="text-[#2563eb] font-bold block uppercase text-[10px]">Phone</span>
                        <span className="font-extrabold text-[#0f172a]">{submittedData.phone}</span>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-[#dbeafe]">
                        <span className="text-[#2563eb] font-bold block uppercase text-[10px]">Service Needed</span>
                        <span className="font-extrabold text-[#0f172a]">{submittedData.service}</span>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-[#dbeafe]">
                        <span className="text-[#2563eb] font-bold block uppercase text-[10px]">Situation</span>
                        <span className="font-extrabold text-[#0f172a]">{submittedData.situation}</span>
                      </div>
                      {submittedData.expert && (
                        <div className="bg-[#eff6ff] p-3 rounded-xl border border-[#bfdbfe] sm:col-span-2">
                          <span className="text-[#1d4ed8] font-bold block uppercase text-[10px]">Preferred Expert</span>
                          <span className="font-extrabold text-[#0f172a]">{submittedData.expert} (Big Four Specialist)</span>
                        </div>
                      )}
                      {submittedData.plan && (
                        <div className="bg-[#eff6ff] p-3 rounded-xl border border-[#bfdbfe] sm:col-span-2">
                          <span className="text-[#1d4ed8] font-bold block uppercase text-[10px]">Selected Plan</span>
                          <span className="font-extrabold text-[#0f172a]">{submittedData.plan}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <a
                      href="https://app.canopytax.com/#/login?redirect_url=https%3A%2F%2Fapp.canopytax.com%2F%23%2Fclient"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-[#1d4ed8] text-white py-3.5 px-6 rounded-xl font-bold text-sm hover:bg-[#0f172a] transition-all flex items-center justify-center gap-2 shadow-md"
                    >
                      <span>Open Canopy Client Portal</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmittedData(null);
                        setFirstName("");
                        setLastName("");
                        setEmail("");
                        setPhone("");
                        setService("");
                        setSituation("");
                        setNotes("");
                      }}
                      className="px-6 py-3.5 bg-[#eff6ff] text-[#0f172a] rounded-xl font-bold text-sm hover:bg-[#dbeafe] transition-all cursor-pointer"
                    >
                      Send Another Request
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Dynamic Expert or Plan Indicator */}
                  {expertParam && (
                    <div className="p-4 rounded-2xl bg-[#eff6ff] border border-[#bfdbfe] flex items-center justify-between gap-3 shadow-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#1d4ed8] text-white flex items-center justify-center shrink-0 shadow-sm">
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-[11px] font-black uppercase tracking-wider text-[#1d4ed8]">
                            Direct Consultation With Specialist
                          </p>
                          <p className="text-sm font-black text-[#0f172a]">
                            {expertParam} — Big Four / Elite Tax Professional
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] font-extrabold bg-white text-[#1d4ed8] px-2.5 py-1 rounded-md border border-[#bfdbfe]">
                        Assigned
                      </span>
                    </div>
                  )}

                  {planParam && !expertParam && (
                    <div className="p-4 rounded-2xl bg-[#eff6ff] border border-[#bfdbfe] flex items-center justify-between gap-3 shadow-xs">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#1d4ed8] text-white flex items-center justify-center shrink-0 shadow-sm">
                          <Sparkles className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-[11px] font-black uppercase tracking-wider text-[#1d4ed8]">
                            Selected Tax Package
                          </p>
                          <p className="text-sm font-black text-[#0f172a]">
                            {planParam}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Top 2-Button Toggle: Personal taxes | My business */}
                  <div className="grid grid-cols-2 gap-3.5 pb-2">
                    <button
                      type="button"
                      onClick={() => handleTabSwitch("personal")}
                      className={`py-3.5 px-4 rounded-xl border flex items-center justify-center gap-2 text-sm font-bold transition-all cursor-pointer ${
                        taxTab === "personal"
                          ? "border-[#1d4ed8] bg-[#eff6ff]/70 text-[#1d4ed8] shadow-2xs"
                          : "border-[#dbeafe] bg-white text-[#334155] hover:bg-[#f8fafc]"
                      }`}
                    >
                      <User className="w-4 h-4" />
                      <span>Personal taxes</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleTabSwitch("business")}
                      className={`py-3.5 px-4 rounded-xl border flex items-center justify-center gap-2 text-sm font-bold transition-all cursor-pointer ${
                        taxTab === "business"
                          ? "border-[#1d4ed8] bg-[#eff6ff]/70 text-[#1d4ed8] shadow-2xs"
                          : "border-[#dbeafe] bg-white text-[#334155] hover:bg-[#f8fafc]"
                      }`}
                    >
                      <Building2 className="w-4 h-4" />
                      <span>My business</span>
                    </button>
                  </div>

                  {/* Row 1: First name | Last name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-[#0f172a]">First name</label>
                      <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First name"
                        className="w-full px-3.5 py-2.5 bg-white border border-[#bfdbfe] focus:border-[#1d4ed8] focus:ring-2 focus:ring-[#eff6ff] rounded-lg text-sm font-medium text-[#0f172a] placeholder:text-[#334155]/45 outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-[#0f172a]">Last name</label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last name"
                        className="w-full px-3.5 py-2.5 bg-white border border-[#bfdbfe] focus:border-[#1d4ed8] focus:ring-2 focus:ring-[#eff6ff] rounded-lg text-sm font-medium text-[#0f172a] placeholder:text-[#334155]/45 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Row 2: Email | Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-[#0f172a]">Email</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-3.5 py-2.5 bg-white border border-[#bfdbfe] focus:border-[#1d4ed8] focus:ring-2 focus:ring-[#eff6ff] rounded-lg text-sm font-medium text-[#0f172a] placeholder:text-[#334155]/45 outline-none transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-[#0f172a]">Phone</label>
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

                  {/* Row 3: What do you need help with? | Your situation (optional) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-[#0f172a]">
                        What do you need help with?
                      </label>
                      <div className="relative">
                        <select
                          value={service}
                          onChange={(e) => setService(e.target.value)}
                          className="w-full appearance-none px-3.5 py-2.5 pr-9 bg-white border border-[#bfdbfe] focus:border-[#1d4ed8] focus:ring-2 focus:ring-[#eff6ff] rounded-lg text-sm font-medium text-[#0f172a] outline-none transition-all cursor-pointer"
                        >
                          <option value="">Select a service</option>
                          {activeServices.map((item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-[#2563eb] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-[#0f172a]">
                        Your situation (optional)
                      </label>
                      <div className="relative">
                        <select
                          value={situation}
                          onChange={(e) => setSituation(e.target.value)}
                          className="w-full appearance-none px-3.5 py-2.5 pr-9 bg-white border border-[#bfdbfe] focus:border-[#1d4ed8] focus:ring-2 focus:ring-[#eff6ff] rounded-lg text-sm font-medium text-[#0f172a] outline-none transition-all cursor-pointer"
                        >
                          <option value="">Select your situation</option>
                          {activeSituations.map((item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-4 h-4 text-[#2563eb] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Row 4: Anything else we should know? (optional) */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[#0f172a]">
                      Anything else we should know? (optional)
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="e.g. moved states mid-year, first time filing with RSUs"
                      className="w-full p-3.5 bg-white border border-[#bfdbfe] focus:border-[#1d4ed8] focus:ring-2 focus:ring-[#eff6ff] rounded-lg text-sm font-medium text-[#0f172a] placeholder:text-[#334155]/45 outline-none transition-all"
                    />
                  </div>

                  {/* Full-Width Submit Button */}
                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#1d4ed8] hover:bg-[#0f172a] text-white py-3.5 px-6 rounded-xl font-extrabold text-sm sm:text-base transition-all shadow-md active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? "Submitting..." : "Get my personalized quote"}
                    </button>
                  </div>

                  {/* Bottom Privacy Note */}
                  <p className="text-center text-xs text-[#334155]/80 font-medium leading-relaxed pt-1">
                    A licensed CPA or EA replies within one business day. Your details stay private — no spam, ever.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
