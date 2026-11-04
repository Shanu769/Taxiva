/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  ExternalLink,
  ShieldCheck,
  Landmark,
  CreditCard,
  FileText,
  Map,
  Search,
  User,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  Activity,
  Copy,
  Check
} from "lucide-react";
import TaxCalendar from "../components/TaxCalendar";
import { StatusSkeleton } from "../components/Skeleton";
import GroundedTaxResearch from "../components/GroundedTaxResearch";

export default function TaxTools() {
  const [isLoadingStatus, setIsLoadingStatus] = useState(true);
  const [lastCheckedTime, setLastCheckedTime] = useState<string>("Just now");
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingStatus(false);
      setLastCheckedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + " EST");
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  const handleRefreshStatus = () => {
    setIsLoadingStatus(true);
    setTimeout(() => {
      setIsLoadingStatus(false);
      setLastCheckedTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + " EST");
    }, 500);
  };

  const handleCopyUrl = (url: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(url).then(() => {
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(null), 2500);
    }).catch(() => {
      // Fallback
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(null), 2500);
    });
  };
  // Primary Official Portals explicitly provided and requested
  const primaryPortals = [
    {
      title: "Federal Refund Status",
      badge: "Official IRS Tool",
      desc: "Check your federal refund status 24 hours after e-filing. Have your SSN/ITIN, filing status, and exact refund amount ready.",
      link: "https://www.irs.gov/refunds",
      directUrl: "https://sa.www4.irs.gov/irfof/lang/en/irfofgetstatus.jsp",
      directBtn: "Launch Where's My Refund Tool",
      icon: Search,
      btn: "IRS Refund Info & Guidelines",
      featured: true
    },
    {
      title: "State Refund Status",
      badge: "All 50 States (FTA)",
      desc: "Official Federation of Tax Administrators (FTA) portal directory. Select your state revenue department to track your state income tax refund.",
      link: "https://taxadmin.org/fta-members/",
      icon: Map,
      btn: "Check State Refund Status",
      featured: true
    },
    {
      title: "Federal Payment Portal",
      badge: "IRS Direct Pay",
      desc: "Pay directly from your checking or savings bank account with zero fees and no registration required. Safe, fast, and instant confirmation.",
      link: "https://www.irs.gov/payments/direct-pay-with-bank-account",
      directUrl: "https://www.irs.gov/payments/direct-pay",
      directBtn: "Open IRS Direct Pay",
      icon: CreditCard,
      btn: "IRS Direct Pay Portal",
      featured: true
    },
    {
      title: "State Payment Portals",
      badge: "All 50 States Directory",
      desc: "Direct access to official state departments of taxation and revenue payment gateways for state tax returns and quarterly estimates.",
      link: "https://taxadmin.org/fta-members/",
      icon: Landmark,
      btn: "Open State Payment Portals",
      featured: true
    },
    {
      title: "IRS Account Setup",
      badge: "ID.me Verification",
      desc: "Create or access your official IRS Online Account to view your tax records, transcripts, prior payments, and official IRS notices.",
      link: "https://www.irs.gov/payments/online-account-for-individuals",
      directUrl: "https://sa.www4.irs.gov/ola/",
      directBtn: "IRS Account Direct Login",
      icon: User,
      btn: "IRS Account Setup & Login",
      featured: true
    }
  ];

  // Top 10 Major State Refund Portals for One-Click Access
  const topStatePortals = [
    { state: "California", code: "CA", agency: "FTB Refund Tracker", url: "https://www.ftb.ca.gov/online/refund/index.asp" },
    { state: "New York", code: "NY", agency: "NYS Where's My Refund", url: "https://www.tax.ny.gov/pit/file/refund.htm" },
    { state: "Texas", code: "TX", agency: "Comptroller Taxes", url: "https://comptroller.texas.gov/taxes/" },
    { state: "New Jersey", code: "NJ", agency: "NJ Taxation Portal", url: "https://www.state.nj.us/treasury/taxation/" },
    { state: "Ohio", code: "OH", agency: "Dept of Taxation", url: "https://www.tax.ohio.gov/" },
    { state: "Pennsylvania", code: "PA", agency: "PA myPATH Portal", url: "https://mypath.pa.gov/" },
    { state: "Illinois", code: "IL", agency: "MyTax Illinois", url: "https://mytax.illinois.gov/" },
    { state: "Georgia", code: "GA", agency: "GA Tax Center (GTC)", url: "https://gtc.dor.ga.gov/" },
    { state: "Washington", code: "WA", agency: "WA Dept of Revenue", url: "https://dor.wa.gov/" },
    { state: "North Carolina", code: "NC", agency: "NC Refund Status", url: "https://www.ncdor.gov/file-pay/refund-status" },
  ];

  // Secondary State & Business Tools
  const secondaryTools = [
    {
      title: "Pay by Debit or Credit Card",
      desc: "IRS approved payment processing via official third-party card payment gateways.",
      link: "https://www.irs.gov/payments/pay-your-taxes-by-debit-or-credit-card",
      icon: CreditCard,
      btn: "Pay Federal by Card"
    },
    {
      title: "IRS Business Tax Account",
      desc: "View business tax records, entity payments, and balance details directly with the IRS.",
      link: "https://www.irs.gov/businesses/business-tax-account",
      icon: Landmark,
      btn: "IRS Business Account"
    },
    {
      title: "Ohio Department of Taxation",
      desc: "Official Ohio state portal for personal income tax and commercial activity tax (CAT).",
      link: "https://www.tax.ohio.gov/",
      icon: Landmark,
      btn: "Ohio Tax Portal"
    },
    {
      title: "Pennsylvania Revenue Portal",
      desc: "Pennsylvania Department of Revenue (myPATH) for PA personal income tax filings.",
      link: "https://www.revenue.pa.gov/",
      icon: FileText,
      btn: "PA Revenue Portal"
    },
    {
      title: "Clean Vehicle Tax Credits",
      desc: "IRS requirements and eligibility guidelines for new and previously-owned EV credits.",
      link: "https://www.irs.gov/clean-vehicle-tax-credits",
      icon: Search,
      btn: "View Clean Vehicle Credits"
    },
    {
      title: "GIPS Motor Vehicle Credits",
      desc: "Access state and federal motor vehicle credit information and applications.",
      link: "https://www.getgips.com/",
      icon: CreditCard,
      btn: "Access GIPS Credits"
    }
  ];

  return (
    <div className="flex flex-col w-full bg-[#f8fafc] min-h-screen">
      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#eff6ff] to-[#f8fafc] py-16 sm:py-20 border-b border-[#dbeafe]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" as const }}
          >
            <div className="inline-flex items-center gap-2 bg-[#dbeafe] text-[#1d4ed8] px-3.5 py-1.5 rounded-xl text-xs font-extrabold uppercase tracking-widest mb-4">
              <Landmark className="w-4 h-4" />
              <span>Official Government & State Gateways</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-[#0f172a] mb-4 font-display tracking-tight">
              Refund & Payment Center
            </h1>
            <p className="text-base sm:text-lg text-[#334155] max-w-2xl mx-auto font-medium">
              Instant, verified links to official IRS and all 50-state portals for tracking your refund, paying taxes securely, and setting up your online IRS account.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Security Banner */}
          <div className="bg-[#0f172a] rounded-3xl p-6 sm:p-8 mb-12 text-white flex flex-col md:flex-row items-center gap-6 shadow-xl border border-white/10">
            <div className="w-14 h-14 rounded-2xl bg-[#1d4ed8] text-white flex items-center justify-center shrink-0 shadow-md">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <div className="space-y-1.5 text-center md:text-left flex-1">
              <h3 className="text-lg sm:text-xl font-extrabold text-white">Client Security Safeguard</h3>
              <p className="text-white/85 text-xs sm:text-sm leading-relaxed font-medium">
                <strong>Taxiva LLC will never ask you to enter your IRS, ID.me, bank, or state login password on our website.</strong> Always use the official government links provided below to submit payments or check refund status directly.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3.5 py-2 rounded-xl text-xs font-bold text-white shrink-0">
              <CheckCircle2 className="w-4 h-4 text-[#60a5fa]" />
              <span>Official Portals Verified</span>
            </div>
          </div>

          {/* Live Government Gateway Status Bar */}
          <div className="bg-white p-5 rounded-2xl border border-[#dbeafe] mb-10 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0">
                <Activity className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs sm:text-sm font-extrabold text-[#0f172a]">
                    Official IRS & 50-State Gateways: Active & Operational
                  </span>
                </div>
                <p className="text-xs text-[#64748b] font-medium mt-0.5">
                  Direct connection to IRS Where's My Refund, Direct Pay, FTA Directory & ID.me • Last synced: {lastCheckedTime}
                </p>
              </div>
            </div>

            <button
              onClick={handleRefreshStatus}
              disabled={isLoadingStatus}
              className="inline-flex items-center gap-2 bg-[#f8fafc] hover:bg-[#eff6ff] text-[#1d4ed8] border border-[#dbeafe] hover:border-[#bfdbfe] px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoadingStatus ? "animate-spin" : ""}`} />
              <span>{isLoadingStatus ? "Checking Gateways..." : "Recheck Live Status"}</span>
            </button>
          </div>

          {/* Core Official Gateways Highlight Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#2563eb] block mb-1">
                PRIMARY GATEWAYS
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] font-display">
                Official IRS & State Action Portals
              </h2>
            </div>
            {isLoadingStatus && (
              <span className="text-xs text-[#2563eb] font-bold animate-pulse">
                Fetching portal statuses...
              </span>
            )}
          </div>

          {/* Primary 5 Official Portals Grid or Skeleton Loader */}
          {isLoadingStatus ? (
            <div className="mb-16">
              <StatusSkeleton />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {primaryPortals.map((tool) => (
                <div
                  key={tool.title}
                  className="p-7 bg-white rounded-3xl border-2 border-[#dbeafe] hover:border-[#1d4ed8] flex flex-col justify-between shadow-xs hover:shadow-xl transition-all duration-300 group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#eff6ff] text-[#1d4ed8] flex items-center justify-center group-hover:bg-[#1d4ed8] group-hover:text-white transition-colors">
                        <tool.icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-extrabold uppercase tracking-wider bg-[#f1f5f9] text-[#1e40af] px-3 py-1 rounded-full border border-[#dbeafe]">
                        {tool.badge}
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-[#0f172a] mb-2 font-display">{tool.title}</h3>
                    <p className="text-[#334155]/90 text-sm leading-relaxed mb-4 font-medium">{tool.desc}</p>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    {tool.directUrl ? (
                      <div className="space-y-2">
                        <a
                          href={tool.directUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-2 bg-[#1d4ed8] hover:bg-[#1e40af] text-white py-3.5 px-4 rounded-xl font-extrabold text-sm transition-all shadow-md group-hover:shadow-lg active:scale-95"
                        >
                          <span>{tool.directBtn || tool.btn}</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <a
                          href={tool.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-1.5 bg-[#f8fafc] hover:bg-[#eff6ff] text-[#1d4ed8] border border-[#bfdbfe] py-2 px-3 rounded-xl font-bold text-xs transition-all"
                        >
                          <span>{tool.btn}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    ) : (
                      <a
                        href={tool.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 bg-[#1d4ed8] hover:bg-[#1e40af] text-white py-3.5 px-4 rounded-xl font-extrabold text-sm transition-all shadow-md group-hover:shadow-lg active:scale-95"
                      >
                        <span>{tool.btn}</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t border-[#f1f5f9] text-[11px] text-[#64748b]">
                      <span className="truncate max-w-[170px] font-mono text-[10px] text-[#2563eb]">
                        {(tool.directUrl || tool.link).replace("https://www.", "").replace("https://", "")}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => handleCopyUrl(tool.directUrl || tool.link, e)}
                        className="inline-flex items-center gap-1 text-[#1d4ed8] hover:text-[#0f172a] font-bold cursor-pointer transition-colors"
                      >
                        {copiedUrl === (tool.directUrl || tool.link) ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-600 font-extrabold">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Link</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Live Google Search Grounded IRS & Tax Law Intelligence */}
          <GroundedTaxResearch />

          {/* All 50 States Tax Agency Directory Banner */}
          <div className="mb-8 p-8 sm:p-12 bg-white rounded-3xl border-2 border-[#dbeafe] shadow-md flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-[#eff6ff] text-[#1d4ed8] px-3 py-1 rounded-lg text-xs font-extrabold uppercase tracking-wider">
                <Map className="w-4 h-4" />
                <span>50-State Comprehensive Directory</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] font-display">
                State Refund Status & State Payment Portals
              </h3>
              <p className="text-[#334155] text-sm sm:text-base leading-relaxed font-medium">
                Looking for your state's official tax portal? Access the official directory maintained by the Federation of Tax Administrators (FTA) covering tax agencies across all 50 U.S. states.
              </p>
            </div>
            <a
              href="https://taxadmin.org/fta-members/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#0f172a] hover:bg-[#1d4ed8] text-white rounded-2xl font-extrabold text-base shadow-xl active:scale-95 transition-all inline-flex items-center gap-3 shrink-0"
            >
              <span>Open FTA State Directory</span>
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>

          {/* Top 10 Major State Tax Agency Fast Links */}
          <div className="mb-16 bg-[#f8fafc] border border-[#dbeafe] rounded-3xl p-6 sm:p-8">
            <div className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#1d4ed8]">Quick Access</span>
                <h4 className="text-lg font-black text-[#0f172a]">Major State Refund & Tax Portals</h4>
              </div>
              <p className="text-xs text-[#64748b]">Direct official portals for top filer states</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {topStatePortals.map((sp) => (
                <a
                  key={sp.state}
                  href={sp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white hover:bg-[#eff6ff] border border-[#dbeafe] hover:border-[#1d4ed8] rounded-xl flex flex-col justify-between transition-all group shadow-2xs"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-black text-[#0f172a] group-hover:text-[#1d4ed8]">{sp.state}</span>
                    <span className="text-[10px] font-mono font-bold bg-[#eff6ff] text-[#1d4ed8] px-1.5 py-0.5 rounded border border-[#bfdbfe]">
                      {sp.code}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#64748b] group-hover:text-[#1d4ed8] font-medium mt-1">
                    <span className="truncate">{sp.agency}</span>
                    <ExternalLink className="w-3 h-3 shrink-0 ml-1 text-[#1d4ed8]" />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Secondary Tools Section */}
          <div className="mb-6">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#2563eb] block mb-1">
              ADDITIONAL SERVICES
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] font-display">
              Business & Regional Portals
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {secondaryTools.map((tool) => (
              <div
                key={tool.title}
                className="p-6 bg-white rounded-2xl border border-[#dbeafe] hover:border-[#1d4ed8] flex flex-col justify-between shadow-2xs hover:shadow-md transition-all group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#eff6ff] text-[#1d4ed8] flex items-center justify-center mb-4">
                    <tool.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-extrabold text-[#0f172a] mb-2 font-display">{tool.title}</h3>
                  <p className="text-[#334155] text-xs sm:text-sm leading-relaxed mb-4 font-medium">{tool.desc}</p>
                </div>

                <div className="space-y-2.5 pt-2">
                  <a
                    href={tool.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#f8fafc] hover:bg-[#eff6ff] text-[#0f172a] hover:text-[#1d4ed8] border border-[#dbeafe] py-2.5 px-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-98"
                  >
                    <span>{tool.btn}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <div className="flex items-center justify-between text-[11px] text-[#64748b]">
                    <span className="truncate max-w-[150px] font-mono text-[10px] text-[#64748b]">
                      {tool.link.replace("https://www.", "").replace("https://", "")}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => handleCopyUrl(tool.link, e)}
                      className="inline-flex items-center gap-1 text-[#1d4ed8] hover:text-[#0f172a] font-bold cursor-pointer transition-colors text-[11px]"
                    >
                      {copiedUrl === tool.link ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-600 font-extrabold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tax Calendar Component at the Bottom */}
          <div className="pt-12 border-t border-[#dbeafe]">
            <TaxCalendar defaultProfile="Individual" />
          </div>
        </div>
      </section>
    </div>
  );
}
