/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Bell, Mail, Calendar, FileCheck, Shield, CheckCircle2, 
  Send, Lock, Sparkles, RefreshCw, AlertCircle, Laptop, Clock, Save,
  User, Building, Phone, MapPin, CreditCard, FileText, Sliders, UserCheck, Globe, DollarSign, ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  occupation: string;
  residencyState: string;
  ssnLastFour: string;
  taxFilingStatus: "Single" | "Married Filing Jointly" | "Married Filing Separately" | "Head of Household" | "Qualifying Surviving Spouse";
  taxReturnStage: "Gathering Documents" | "Under CPA Review" | "Pending Client E-Signature" | "Signed Form 8879" | "E-Filed & IRS Accepted" | "Extension Filed (Oct 15)";
  entityType: "Individual (1040)" | "Self-Employed / Sole Proprietorship" | "S-Corporation (1120-S)" | "Partnership (1065)" | "C-Corporation (1120)";
  hasForeignAccounts: boolean;
  foreignAccountBalance: string;
  dependentsCount: number;
  estimatedIncomeRange: string;
  preferredCpaContact: "Email" | "Phone" | "Portal Chat";
}

export interface NotificationPreferences {
  // Tax Deadlines
  deadlineFederalState: boolean;
  deadlineQuarterlyEstimated: boolean;
  deadlineFbarForeign: boolean;
  deadlineCorporateScorp: boolean;

  // Document & Status
  docCpaVerification: boolean;
  docActionRequired: boolean;
  docForm8879Signature: boolean;
  docIrsAcceptance: boolean;

  // Planning & Marketing
  taxivaNewsletter: boolean;
  yearEndTaxStrategies: boolean;

  // Security
  securityLoginAlerts: boolean;
  securityAuditLogs: boolean;

  // Settings
  notificationEmail: string;
  deliveryFrequency: "instant" | "daily_digest" | "weekly_summary";
}

const DEFAULT_PROFILE: UserProfile = {
  fullName: "Alexander V. Wright",
  email: "client@taxiva.co",
  phone: "+1 (555) 382-9104",
  occupation: "Senior Software Architect & Independent Consultant",
  residencyState: "California (CA)",
  ssnLastFour: "8892",
  taxFilingStatus: "Married Filing Jointly",
  taxReturnStage: "Under CPA Review",
  entityType: "Individual (1040)",
  hasForeignAccounts: true,
  foreignAccountBalance: "$25,000 - $50,000 (FinCEN 114 FBAR Required)",
  dependentsCount: 2,
  estimatedIncomeRange: "$180,000 - $250,000",
  preferredCpaContact: "Email"
};

const DEFAULT_PREFERENCES: NotificationPreferences = {
  deadlineFederalState: true,
  deadlineQuarterlyEstimated: true,
  deadlineFbarForeign: true,
  deadlineCorporateScorp: false,

  docCpaVerification: true,
  docActionRequired: true,
  docForm8879Signature: true,
  docIrsAcceptance: true,

  taxivaNewsletter: true,
  yearEndTaxStrategies: true,

  securityLoginAlerts: true,
  securityAuditLogs: false,

  notificationEmail: "client@taxiva.co",
  deliveryFrequency: "instant",
};

export default function SettingsView({ currentUserEmail = "client@taxiva.co" }: { currentUserEmail?: string }) {
  const [activeTab, setActiveTab] = useState<"profile" | "notifications" | "security">("profile");

  // User Profile State
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem("taxo_user_profile");
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_PROFILE, ...parsed, email: currentUserEmail || parsed.email || DEFAULT_PROFILE.email };
      }
    } catch (e) {
      console.error("Failed to load profile from localStorage", e);
    }
    return { ...DEFAULT_PROFILE, email: currentUserEmail || DEFAULT_PROFILE.email };
  });

  // Notification Preferences State
  const [prefs, setPrefs] = useState<NotificationPreferences>(() => {
    try {
      const saved = localStorage.getItem("taxo_notification_preferences");
      if (saved) {
        return { ...DEFAULT_PREFERENCES, ...JSON.parse(saved), notificationEmail: currentUserEmail || "client@taxiva.co" };
      }
    } catch (e) {
      console.error("Failed to load preferences from localStorage", e);
    }
    return { ...DEFAULT_PREFERENCES, notificationEmail: currentUserEmail || "client@taxiva.co" };
  });

  const [savedMessage, setSavedMessage] = useState<string | null>(null);
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [testSentSuccess, setTestSentSuccess] = useState(false);

  useEffect(() => {
    if (currentUserEmail && (profile.email === "client@taxiva.co" || !profile.email)) {
      setProfile(p => ({ ...p, email: currentUserEmail }));
      setPrefs(p => ({ ...p, notificationEmail: currentUserEmail }));
    }
  }, [currentUserEmail]);

  const handleTogglePref = (key: keyof NotificationPreferences) => {
    setPrefs((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSaveAll = () => {
    try {
      localStorage.setItem("taxo_user_profile", JSON.stringify(profile));
      localStorage.setItem("taxo_notification_preferences", JSON.stringify(prefs));
      
      // Also broadcast profile change event if needed
      window.dispatchEvent(new CustomEvent("taxo_profile_updated", { detail: profile }));

      setSavedMessage("Settings, profile, and notification preferences saved successfully!");
      setTimeout(() => setSavedMessage(null), 4000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSendTestEmail = () => {
    setIsSendingTest(true);
    setTestSentSuccess(false);

    setTimeout(() => {
      setIsSendingTest(false);
      setTestSentSuccess(true);
      setTimeout(() => setTestSentSuccess(false), 5000);
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 text-left animate-in fade-in duration-300">
      {/* Settings Top Header Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-blue-800/80 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -z-0" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-blue-800/60 border border-blue-700/60 px-3 py-1 rounded-full text-amber-300 font-extrabold text-xs uppercase tracking-widest">
              <UserCheck className="w-3.5 h-3.5" />
              <span>Client Account & Settings Center</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight font-display">
              Profile Management & Preferences
            </h2>
            <p className="text-xs sm:text-sm text-blue-200 max-w-2xl font-medium leading-relaxed">
              Manage your personal taxpayer profile, update your current tax return status, and configure email alerts for important IRS filing deadlines and CPA document reviews.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleSaveAll}
              className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-blue-950 font-black text-xs rounded-xl shadow-lg transition-all active:scale-95 flex items-center gap-2 uppercase tracking-wider"
            >
              <Save className="w-4 h-4" />
              <span>Save Settings</span>
            </button>
          </div>
        </div>

        {/* Sub Navigation Tabs */}
        <div className="flex items-center gap-2 mt-8 pt-6 border-t border-blue-800/60 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === "profile"
                ? "bg-white text-blue-950 shadow-md"
                : "bg-blue-900/40 text-blue-200 hover:bg-blue-900/80"
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile & Tax Status</span>
          </button>

          <button
            onClick={() => setActiveTab("notifications")}
            className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === "notifications"
                ? "bg-white text-blue-950 shadow-md"
                : "bg-blue-900/40 text-blue-200 hover:bg-blue-900/80"
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Email & Alert Preferences</span>
          </button>

          <button
            onClick={() => setActiveTab("security")}
            className={`px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 shrink-0 ${
              activeTab === "security"
                ? "bg-white text-blue-950 shadow-md"
                : "bg-blue-900/40 text-blue-200 hover:bg-blue-900/80"
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Security & IRS Compliance</span>
          </button>
        </div>
      </div>

      {savedMessage && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 text-xs font-bold flex items-center gap-3 shadow-sm"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{savedMessage}</span>
        </motion.div>
      )}

      {/* TAB 1: USER PROFILE & TAX STATUS MANAGEMENT */}
      {activeTab === "profile" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Column 1: Client Overview Card */}
            <div className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-sm space-y-6">
              <div className="text-center pb-6 border-b border-gray-100">
                <div className="w-20 h-20 bg-gradient-to-tr from-blue-900 to-indigo-800 text-white font-black text-2xl rounded-3xl mx-auto flex items-center justify-center shadow-lg shadow-blue-900/20 mb-3 border-2 border-white">
                  {profile.fullName ? profile.fullName.split(" ").map(n => n[0]).join("").slice(0, 2) : "AV"}
                </div>
                <h3 className="text-lg font-black text-gray-900">{profile.fullName}</h3>
                <p className="text-xs text-gray-500 font-medium mt-0.5">{profile.occupation}</p>
                
                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-900 rounded-full text-[11px] font-black uppercase tracking-wider">
                  <Shield className="w-3.5 h-3.5 text-amber-500" />
                  <span>Verified Taxpayer</span>
                </div>
              </div>

              {/* Tax Return Status Snapshot */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 p-4 rounded-2xl border border-blue-100/80 space-y-2">
                <p className="text-[10px] font-black uppercase tracking-wider text-blue-900/70">Current Return Stage</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-extrabold text-blue-950">{profile.taxReturnStage}</span>
                  <span className="px-2 py-0.5 bg-blue-900 text-white rounded text-[10px] font-bold">2025 - 2026</span>
                </div>
                <div className="w-full bg-blue-200/60 rounded-full h-1.5 mt-2 overflow-hidden">
                  <div 
                    className="bg-blue-900 h-1.5 rounded-full transition-all duration-500"
                    style={{
                      width: 
                        profile.taxReturnStage === "Gathering Documents" ? "20%" :
                        profile.taxReturnStage === "Under CPA Review" ? "50%" :
                        profile.taxReturnStage === "Pending Client E-Signature" ? "75%" :
                        profile.taxReturnStage === "Signed Form 8879" ? "90%" :
                        profile.taxReturnStage === "E-Filed & IRS Accepted" ? "100%" : "60%"
                    }}
                  />
                </div>
              </div>

              <div className="space-y-3 text-xs font-medium text-gray-600">
                <div className="flex items-center justify-between py-1.5 border-b border-gray-50">
                  <span className="text-gray-400">Residency State:</span>
                  <span className="font-bold text-gray-900">{profile.residencyState}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-gray-50">
                  <span className="text-gray-400">SSN / ITIN (Last 4):</span>
                  <span className="font-bold text-gray-900">***-**-{profile.ssnLastFour}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-b border-gray-50">
                  <span className="text-gray-400">Filing Status:</span>
                  <span className="font-bold text-gray-900">{profile.taxFilingStatus}</span>
                </div>
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-gray-400">Foreign Accounts (FBAR):</span>
                  <span className={`font-bold ${profile.hasForeignAccounts ? "text-amber-600" : "text-gray-900"}`}>
                    {profile.hasForeignAccounts ? "Yes (Required)" : "None"}
                  </span>
                </div>
              </div>
            </div>

            {/* Column 2 & 3: Editable Profile & Tax Status Form */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Personal Profile Details */}
              <div className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-sm space-y-5">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                  <div className="p-2.5 bg-blue-50 text-blue-900 rounded-xl">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-gray-900">Personal & Contact Information</h3>
                    <p className="text-xs text-gray-500 font-medium">Update legal name and primary contact details for CPA communication</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider block mb-1.5">
                      Full Legal Name (As shown on SSN Card)
                    </label>
                    <input
                      type="text"
                      value={profile.fullName}
                      onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900 focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider block mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900 focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider block mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900 focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider block mb-1.5">
                      Occupation / Business Activity
                    </label>
                    <input
                      type="text"
                      value={profile.occupation}
                      onChange={(e) => setProfile({ ...profile, occupation: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900 focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider block mb-1.5">
                      State of Residence
                    </label>
                    <input
                      type="text"
                      value={profile.residencyState}
                      onChange={(e) => setProfile({ ...profile, residencyState: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900 focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider block mb-1.5">
                      SSN / ITIN (Last 4 Digits)
                    </label>
                    <input
                      type="text"
                      maxLength={4}
                      value={profile.ssnLastFour}
                      onChange={(e) => setProfile({ ...profile, ssnLastFour: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900 focus:bg-white transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Tax Profile & Filing Status Management */}
              <div className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-sm space-y-5">
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                  <div className="p-2.5 bg-blue-50 text-blue-900 rounded-xl">
                    <Sliders className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-gray-900">Tax Filing Profile & Return Status</h3>
                    <p className="text-xs text-gray-500 font-medium">Update your current IRS filing status and foreign asset disclosures</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider block mb-1.5">
                      IRS Filing Status
                    </label>
                    <select
                      value={profile.taxFilingStatus}
                      onChange={(e: any) => setProfile({ ...profile, taxFilingStatus: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900 focus:bg-white transition-all"
                    >
                      <option value="Single">Single</option>
                      <option value="Married Filing Jointly">Married Filing Jointly</option>
                      <option value="Married Filing Separately">Married Filing Separately</option>
                      <option value="Head of Household">Head of Household</option>
                      <option value="Qualifying Surviving Spouse">Qualifying Surviving Spouse</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider block mb-1.5">
                      Current Tax Return Progress Stage
                    </label>
                    <select
                      value={profile.taxReturnStage}
                      onChange={(e: any) => setProfile({ ...profile, taxReturnStage: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900 focus:bg-white transition-all"
                    >
                      <option value="Gathering Documents">Gathering Documents</option>
                      <option value="Under CPA Review">Under CPA Review</option>
                      <option value="Pending Client E-Signature">Pending Client E-Signature</option>
                      <option value="Signed Form 8879">Signed Form 8879</option>
                      <option value="E-Filed & IRS Accepted">E-Filed & IRS Accepted</option>
                      <option value="Extension Filed (Oct 15)">Extension Filed (Oct 15)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider block mb-1.5">
                      Entity Classification
                    </label>
                    <select
                      value={profile.entityType}
                      onChange={(e: any) => setProfile({ ...profile, entityType: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900 focus:bg-white transition-all"
                    >
                      <option value="Individual (1040)">Individual (Form 1040)</option>
                      <option value="Self-Employed / Sole Proprietorship">Self-Employed / 1099 Contractor</option>
                      <option value="S-Corporation (1120-S)">S-Corporation (Form 1120-S)</option>
                      <option value="Partnership (1065)">Partnership / Multi-member LLC (Form 1065)</option>
                      <option value="C-Corporation (1120)">C-Corporation (Form 1120)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider block mb-1.5">
                      Estimated Gross Household Income
                    </label>
                    <select
                      value={profile.estimatedIncomeRange}
                      onChange={(e: any) => setProfile({ ...profile, estimatedIncomeRange: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900 focus:bg-white transition-all"
                    >
                      <option value="Under $75,000">Under $75,000</option>
                      <option value="$75,000 - $120,000">$75,000 - $120,000</option>
                      <option value="$120,000 - $180,000">$120,000 - $180,000</option>
                      <option value="$180,000 - $250,000">$180,000 - $250,000</option>
                      <option value="Over $250,000">Over $250,000</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2 p-4 bg-gray-50 rounded-2xl border border-gray-200/80 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-gray-900">Foreign Financial Accounts & Assets (FBAR / FATCA)</p>
                        <p className="text-[11px] text-gray-500">Check if aggregate foreign bank account balance exceeded $10,000 during the year.</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={profile.hasForeignAccounts}
                        onChange={(e) => setProfile({ ...profile, hasForeignAccounts: e.target.checked })}
                        className="w-5 h-5 rounded-md text-blue-900 focus:ring-blue-900 cursor-pointer accent-blue-900"
                      />
                    </div>

                    {profile.hasForeignAccounts && (
                      <div className="pt-2">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider block mb-1">
                          Peak Aggregate Foreign Balance Range
                        </label>
                        <input
                          type="text"
                          value={profile.foreignAccountBalance}
                          onChange={(e) => setProfile({ ...profile, foreignAccountBalance: e.target.value })}
                          placeholder="e.g. $10,000 - $50,000"
                          className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-3 flex justify-end">
                  <button
                    onClick={handleSaveAll}
                    className="px-6 py-3 bg-blue-900 text-white rounded-xl text-xs font-black hover:bg-blue-800 transition-all shadow-md active:scale-95 flex items-center gap-2 uppercase tracking-wider"
                  >
                    <Save className="w-4 h-4 text-amber-300" />
                    <span>Save Profile & Status</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* TAB 2: EMAIL & NOTIFICATION PREFERENCES */}
      {activeTab === "notifications" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Section 1: Tax Deadline Reminders */}
          <div className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <div className="p-2.5 bg-blue-50 text-blue-900 rounded-xl">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-gray-900">Tax Deadline Reminders</h3>
                <p className="text-xs text-gray-500 font-medium">Automatic alerts before major federal, state & foreign filing dates</p>
              </div>
            </div>

            <div className="space-y-4 text-xs font-semibold">
              <div className="flex items-center justify-between p-3.5 bg-gray-50/80 rounded-2xl hover:bg-blue-50/30 transition-colors">
                <div>
                  <p className="font-bold text-gray-900">Federal & State 1040 Filing Deadlines</p>
                  <p className="text-[11px] text-gray-500 font-normal">Reminders 14 days and 3 days before April 15 and October 15</p>
                </div>
                <input
                  type="checkbox"
                  checked={prefs.deadlineFederalState}
                  onChange={() => handleTogglePref("deadlineFederalState")}
                  className="w-5 h-5 rounded-md text-blue-900 focus:ring-blue-900 cursor-pointer accent-blue-900"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-gray-50/80 rounded-2xl hover:bg-blue-50/30 transition-colors">
                <div>
                  <p className="font-bold text-gray-900">Quarterly Estimated Tax Due Dates</p>
                  <p className="text-[11px] text-gray-500 font-normal">Alerts for Q1 (Apr 15), Q2 (Jun 15), Q3 (Sep 15), and Q4 (Jan 15)</p>
                </div>
                <input
                  type="checkbox"
                  checked={prefs.deadlineQuarterlyEstimated}
                  onChange={() => handleTogglePref("deadlineQuarterlyEstimated")}
                  className="w-5 h-5 rounded-md text-blue-900 focus:ring-blue-900 cursor-pointer accent-blue-900"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-gray-50/80 rounded-2xl hover:bg-blue-50/30 transition-colors">
                <div>
                  <p className="font-bold text-gray-900">FBAR & FinCEN 114 Foreign Bank Reporting</p>
                  <p className="text-[11px] text-gray-500 font-normal">Annual deadline notifications for accounts over $10,000</p>
                </div>
                <input
                  type="checkbox"
                  checked={prefs.deadlineFbarForeign}
                  onChange={() => handleTogglePref("deadlineFbarForeign")}
                  className="w-5 h-5 rounded-md text-blue-900 focus:ring-blue-900 cursor-pointer accent-blue-900"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-gray-50/80 rounded-2xl hover:bg-blue-50/30 transition-colors">
                <div>
                  <p className="font-bold text-gray-900">S-Corp & Partnership Deadlines (March 15)</p>
                  <p className="text-[11px] text-gray-500 font-normal">Form 1120-S & Form 1065 entity filing reminders</p>
                </div>
                <input
                  type="checkbox"
                  checked={prefs.deadlineCorporateScorp}
                  onChange={() => handleTogglePref("deadlineCorporateScorp")}
                  className="w-5 h-5 rounded-md text-blue-900 focus:ring-blue-900 cursor-pointer accent-blue-900"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Document & CPA Status Updates */}
          <div className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <div className="p-2.5 bg-blue-50 text-blue-900 rounded-xl">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-gray-900">Document & Status Updates</h3>
                <p className="text-xs text-gray-500 font-medium">Notifications when CPAs review or verify uploaded tax files</p>
              </div>
            </div>

            <div className="space-y-4 text-xs font-semibold">
              <div className="flex items-center justify-between p-3.5 bg-gray-50/80 rounded-2xl hover:bg-blue-50/30 transition-colors">
                <div>
                  <p className="font-bold text-gray-900">CPA Document Inspection & Verification</p>
                  <p className="text-[11px] text-gray-500 font-normal">Instant alert when uploaded W-2s or 1099s pass CPA validation</p>
                </div>
                <input
                  type="checkbox"
                  checked={prefs.docCpaVerification}
                  onChange={() => handleTogglePref("docCpaVerification")}
                  className="w-5 h-5 rounded-md text-blue-900 focus:ring-blue-900 cursor-pointer accent-blue-900"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-gray-50/80 rounded-2xl hover:bg-blue-50/30 transition-colors">
                <div>
                  <p className="font-bold text-gray-900">Action Required & Missing Document Alerts</p>
                  <p className="text-[11px] text-gray-500 font-normal">Notify immediately if a required form or signature is missing</p>
                </div>
                <input
                  type="checkbox"
                  checked={prefs.docActionRequired}
                  onChange={() => handleTogglePref("docActionRequired")}
                  className="w-5 h-5 rounded-md text-blue-900 focus:ring-blue-900 cursor-pointer accent-blue-900"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-gray-50/80 rounded-2xl hover:bg-blue-50/30 transition-colors">
                <div>
                  <p className="font-bold text-gray-900">Form 8879 E-Signature Ready</p>
                  <p className="text-[11px] text-gray-500 font-normal">Alert when your finished return draft is ready for e-file signature</p>
                </div>
                <input
                  type="checkbox"
                  checked={prefs.docForm8879Signature}
                  onChange={() => handleTogglePref("docForm8879Signature")}
                  className="w-5 h-5 rounded-md text-blue-900 focus:ring-blue-900 cursor-pointer accent-blue-900"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-gray-50/80 rounded-2xl hover:bg-blue-50/30 transition-colors">
                <div>
                  <p className="font-bold text-gray-900">IRS & State Acceptance Confirmations</p>
                  <p className="text-[11px] text-gray-500 font-normal">Official email notification upon successful IRS electronic return filing</p>
                </div>
                <input
                  type="checkbox"
                  checked={prefs.docIrsAcceptance}
                  onChange={() => handleTogglePref("docIrsAcceptance")}
                  className="w-5 h-5 rounded-md text-blue-900 focus:ring-blue-900 cursor-pointer accent-blue-900"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Tax Planning & Newsletter Insights */}
          <div className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <div className="p-2.5 bg-blue-50 text-blue-900 rounded-xl">
                <Sparkles className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-gray-900">Tax Planning & Strategy</h3>
                <p className="text-xs text-gray-500 font-medium">IRS policy updates and custom tax deduction guides</p>
              </div>
            </div>

            <div className="space-y-4 text-xs font-semibold">
              <div className="flex items-center justify-between p-3.5 bg-gray-50/80 rounded-2xl hover:bg-blue-50/30 transition-colors">
                <div>
                  <p className="font-bold text-gray-900">Taxiva LLC Monthly Insider Digest</p>
                  <p className="text-[11px] text-gray-500 font-normal">Quarterly tax law changes, IRS inflation adjustments, and CPA advice</p>
                </div>
                <input
                  type="checkbox"
                  checked={prefs.taxivaNewsletter}
                  onChange={() => handleTogglePref("taxivaNewsletter")}
                  className="w-5 h-5 rounded-md text-blue-900 focus:ring-blue-900 cursor-pointer accent-blue-900"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-gray-50/80 rounded-2xl hover:bg-blue-50/30 transition-colors">
                <div>
                  <p className="font-bold text-gray-900">Year-End Tax Savings Checklist</p>
                  <p className="text-[11px] text-gray-500 font-normal">December reminders for 401(k), IRA, HSA, and capital loss harvesting</p>
                </div>
                <input
                  type="checkbox"
                  checked={prefs.yearEndTaxStrategies}
                  onChange={() => handleTogglePref("yearEndTaxStrategies")}
                  className="w-5 h-5 rounded-md text-blue-900 focus:ring-blue-900 cursor-pointer accent-blue-900"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Email Delivery & Test Notification */}
          <div className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <div className="p-2.5 bg-blue-50 text-blue-900 rounded-xl">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-gray-900">Notification Delivery Address</h3>
                <p className="text-xs text-gray-500 font-medium">Where we send your tax alerts and verified reports</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider block mb-1.5 ml-1">
                  Primary Notification Email
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
                  <input
                    type="email"
                    value={prefs.notificationEmail}
                    onChange={(e) => setPrefs({ ...prefs, notificationEmail: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-wider block mb-1.5 ml-1">
                  Notification Digest Frequency
                </label>
                <select
                  value={prefs.deliveryFrequency}
                  onChange={(e: any) => setPrefs({ ...prefs, deliveryFrequency: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900 focus:bg-white transition-all"
                >
                  <option value="instant">Instant Alerts (Send immediately as events occur)</option>
                  <option value="daily_digest">Daily Summary Digest (Consolidated once at 5 PM EST)</option>
                  <option value="weekly_summary">Weekly Summary (Mondays at 8 AM EST)</option>
                </select>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 bg-blue-50/50 p-4 rounded-2xl border border-blue-100/60">
                <div className="text-xs">
                  <p className="font-bold text-blue-900">Test Email Dispatch</p>
                  <p className="text-[11px] text-gray-500 font-medium">Verify delivery to <span className="font-bold">{prefs.notificationEmail}</span></p>
                </div>

                <button
                  onClick={handleSendTestEmail}
                  disabled={isSendingTest}
                  className="px-4 py-2.5 bg-blue-900 text-white rounded-xl text-xs font-extrabold hover:bg-blue-800 transition-all flex items-center gap-2 shadow-sm shrink-0 disabled:opacity-50"
                >
                  {isSendingTest ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 text-amber-300" />
                      <span>Send Sample Alert</span>
                    </>
                  )}
                </button>
              </div>

              {testSentSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-emerald-100/80 border border-emerald-200 text-emerald-900 text-xs font-bold rounded-xl flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Sample email notification sent to {prefs.notificationEmail}!</span>
                </motion.div>
              )}
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: SECURITY & IRS COMPLIANCE */}
      {activeTab === "security" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <div className="p-2.5 bg-blue-50 text-blue-900 rounded-xl">
                <Shield className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-gray-900">IRS Section 7216 Data Protection</h3>
                <p className="text-xs text-gray-500 font-medium">Federal privacy standards for confidential tax return information</p>
              </div>
            </div>

            <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200/60 text-xs space-y-2 text-emerald-950 font-medium">
              <p className="font-bold flex items-center gap-2 text-emerald-900">
                <Lock className="w-4 h-4 text-emerald-600" />
                <span>IRS Sec. 7216 Confidentiality Enforced</span>
              </p>
              <p className="text-gray-600 leading-relaxed text-[11px]">
                Under Internal Revenue Code Section 7216, Taxiva LLC CPAs and staff are legally prohibited from disclosing or using your tax return information for any purpose other than preparing, assisting in, or reviewing your tax return.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-2xl">
                <div>
                  <p className="font-bold text-gray-900">Account Access Audit Logging</p>
                  <p className="text-[11px] text-gray-500">Log all CPA and system access to your uploaded tax documents</p>
                </div>
                <input
                  type="checkbox"
                  checked={prefs.securityAuditLogs}
                  onChange={() => handleTogglePref("securityAuditLogs")}
                  className="w-5 h-5 rounded-md text-blue-900 cursor-pointer accent-blue-900"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-2xl">
                <div>
                  <p className="font-bold text-gray-900">Login Alert Notifications</p>
                  <p className="text-[11px] text-gray-500">Send email alert when a new device accesses your Taxiva LLC portal</p>
                </div>
                <input
                  type="checkbox"
                  checked={prefs.securityLoginAlerts}
                  onChange={() => handleTogglePref("securityLoginAlerts")}
                  className="w-5 h-5 rounded-md text-blue-900 cursor-pointer accent-blue-900"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
              <div className="p-2.5 bg-blue-50 text-blue-900 rounded-xl">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-gray-900">Encryption & Portal Security</h3>
                <p className="text-xs text-gray-500 font-medium">Bank-grade security protocols for document vaults</p>
              </div>
            </div>

            <div className="space-y-3 text-xs font-semibold">
              <div className="p-3.5 bg-gray-50 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="font-bold text-gray-900">Vault Encryption</p>
                  <p className="text-[11px] text-gray-500 font-normal">AES-256-GCM At-Rest Encryption</p>
                </div>
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-[10px] font-black">ACTIVE</span>
              </div>

              <div className="p-3.5 bg-gray-50 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="font-bold text-gray-900">Transport Security</p>
                  <p className="text-[11px] text-gray-500 font-normal">TLS 1.3 High-Grade Tunneling</p>
                </div>
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-[10px] font-black">ACTIVE</span>
              </div>

              <div className="p-3.5 bg-gray-50 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="font-bold text-gray-900">Document Retention Policy</p>
                  <p className="text-[11px] text-gray-500 font-normal">IRS 7-Year Compliance Archive</p>
                </div>
                <span className="px-2.5 py-1 bg-blue-100 text-blue-800 rounded-lg text-[10px] font-black">PROTECTED</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Controls */}
      <div className="p-6 bg-white rounded-3xl border border-gray-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
          <Shield className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>IRS Sec. 7216 compliant profile management & notification infrastructure. Your confidential tax data is encrypted end-to-end.</span>
        </div>

        <button
          onClick={handleSaveAll}
          className="w-full sm:w-auto px-8 py-3.5 bg-blue-900 text-white rounded-2xl text-xs font-black hover:bg-blue-800 transition-all shadow-xl shadow-blue-900/15 active:scale-95 flex items-center justify-center gap-2 uppercase tracking-wider"
        >
          <Save className="w-4 h-4 text-amber-300" />
          <span>Save All Settings</span>
        </button>
      </div>
    </div>
  );
}
