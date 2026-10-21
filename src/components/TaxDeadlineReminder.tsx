/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Calendar, Clock, Bell, CheckCircle2, AlertTriangle, Shield, 
  ExternalLink, Download, Check, Sparkles, Filter, ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export interface TaxDeadline {
  id: string;
  title: string;
  dateStr: string; // e.g., "2026-09-15"
  displayDate: string; // e.g., "September 15, 2026"
  category: "Individual (1040)" | "Estimated Taxes" | "Business / Entity" | "Foreign (FBAR)";
  description: string;
  formType: string;
  isUrgent: boolean;
  isCompleted?: boolean;
}

const DEFAULT_DEADLINES: TaxDeadline[] = [
  {
    id: "d1",
    title: "Q3 2026 Estimated Tax Payment Due",
    dateStr: "2026-09-15",
    displayDate: "September 15, 2026",
    category: "Estimated Taxes",
    description: "Third quarter 2026 estimated tax installment for self-employed, 1099, and high-income taxpayers.",
    formType: "Form 1040-ES",
    isUrgent: true,
  },
  {
    id: "d2",
    title: "Extended Form 1040 Individual Tax Return Deadline",
    dateStr: "2026-10-15",
    displayDate: "October 15, 2026",
    category: "Individual (1040)",
    description: "Final deadline for taxpayers who filed an April 15 extension (Form 4868) to e-file Form 1040.",
    formType: "Form 1040 / Form 4868",
    isUrgent: false,
  },
  {
    id: "d3",
    title: "FBAR & FinCEN 114 Foreign Financial Account Extension",
    dateStr: "2026-10-15",
    displayDate: "October 15, 2026",
    category: "Foreign (FBAR)",
    description: "Automatic extended deadline to file Report of Foreign Bank and Financial Accounts for balances over $10k.",
    formType: "FinCEN Form 114",
    isUrgent: false,
  },
  {
    id: "d4",
    title: "Q4 2026 Estimated Tax Payment Due",
    dateStr: "2027-01-15",
    displayDate: "January 15, 2027",
    category: "Estimated Taxes",
    description: "Fourth and final quarter estimated payment for tax year 2026.",
    formType: "Form 1040-ES",
    isUrgent: false,
  },
  {
    id: "d5",
    title: "S-Corporation (1120-S) & Partnership (1065) Tax Filing",
    dateStr: "2027-03-15",
    displayDate: "March 15, 2027",
    category: "Business / Entity",
    description: "Pass-through entity tax return deadline and Schedule K-1 distribution to partners/shareholders.",
    formType: "Form 1120-S / Form 1065",
    isUrgent: false,
  },
  {
    id: "d6",
    title: "Annual Federal & State Form 1040 Tax Day",
    dateStr: "2027-04-15",
    displayDate: "April 15, 2027",
    category: "Individual (1040)",
    description: "Main federal individual tax return deadline or deadline to file a 6-month extension.",
    formType: "Form 1040",
    isUrgent: false,
  }
];

export default function TaxDeadlineReminder() {
  const [deadlines, setDeadlines] = useState<TaxDeadline[]>(() => {
    try {
      const saved = localStorage.getItem("taxiva_completed_deadlines");
      if (saved) {
        const completedIds: string[] = JSON.parse(saved);
        return DEFAULT_DEADLINES.map(d => ({ ...d, isCompleted: completedIds.includes(d.id) }));
      }
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_DEADLINES;
  });

  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [syncedMessage, setSyncedMessage] = useState<string | null>(null);

  // Compute countdown for nearest uncompleted deadline
  const nextDeadline = deadlines.find(d => !d.isCompleted) || deadlines[0];

  const calculateDaysRemaining = (targetDateStr: string) => {
    const target = new Date(targetDateStr).getTime();
    const now = new Date().getTime();
    const diff = target - now;
    if (diff <= 0) return 0;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const daysLeft = calculateDaysRemaining(nextDeadline.dateStr);

  const handleToggleComplete = (id: string) => {
    const updated = deadlines.map(d => {
      if (d.id === id) {
        return { ...d, isCompleted: !d.isCompleted };
      }
      return d;
    });
    setDeadlines(updated);
    
    const completedIds = updated.filter(d => d.isCompleted).map(d => d.id);
    localStorage.setItem("taxo_completed_deadlines", JSON.stringify(completedIds));
  };

  const handleSyncCalendar = (deadline: TaxDeadline) => {
    // Generate ICS content
    const title = encodeURIComponent(`Taxiva LLC Reminder: ${deadline.title}`);
    const details = encodeURIComponent(`${deadline.description} - IRS Form: ${deadline.formType}`);
    const dateFormatted = deadline.dateStr.replace(/-/g, "");
    
    // Google Calendar URL
    const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dateFormatted}/${dateFormatted}&details=${details}&add=info@taxiva.co`;
    
    window.open(googleCalUrl, "_blank");

    setSyncedMessage(`Added "${deadline.title}" to Google Calendar!`);
    setTimeout(() => setSyncedMessage(null), 4000);
  };

  const handleDownloadIcs = (deadline: TaxDeadline) => {
    const dateFormatted = deadline.dateStr.replace(/-/g, "");
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Taxiva LLC Tax Compliance//EN
BEGIN:VEVENT
SUMMARY:${deadline.title}
DESCRIPTION:${deadline.description} (Form: ${deadline.formType})
DTSTART;VALUE=DATE:${dateFormatted}
DTEND;VALUE=DATE:${dateFormatted}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Taxiva_LLC_${deadline.id}_Reminder.ics`;
    a.click();

    setSyncedMessage(`Downloaded .ics file for ${deadline.title}`);
    setTimeout(() => setSyncedMessage(null), 4000);
  };

  const filteredDeadlines = deadlines.filter(d => {
    if (activeCategory === "All") return true;
    return d.category === activeCategory;
  });

  return (
    <div id="tax-deadline-reminder-component" className="bg-white rounded-3xl border border-gray-200/90 p-6 shadow-sm space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-50 text-blue-900 rounded-2xl">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black text-gray-900">IRS Tax Deadline Tracker</h3>
              <span className="px-2.5 py-0.5 bg-blue-900 text-white rounded-full text-[10px] font-black uppercase tracking-wider">
                Sync Engine
              </span>
            </div>
            <p className="text-xs text-gray-500 font-medium">Automatic countdown & calendar synchronization for federal & state obligations</p>
          </div>
        </div>

        {/* Sync / Notification Toggle */}
        <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-2xl border border-gray-200/80">
          <Bell className="w-4 h-4 text-blue-900 shrink-0" />
          <span className="text-xs font-bold text-gray-700">Email & SMS Alerts</span>
          <button
            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
            className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
              notificationsEnabled ? "bg-blue-900" : "bg-gray-300"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                notificationsEnabled ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Featured Countdown Box */}
      {nextDeadline && (
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 rounded-2xl p-5 text-white shadow-lg border border-blue-800/80 relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1 z-10">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-400 text-blue-950 rounded-full text-[10px] font-black uppercase tracking-wider">
              <Clock className="w-3 h-3" />
              <span>Next Upcoming Obligation</span>
            </div>
            <h4 className="text-base sm:text-lg font-black tracking-tight">{nextDeadline.title}</h4>
            <p className="text-xs text-blue-200/90 font-medium">{nextDeadline.description}</p>
            <div className="pt-1 flex items-center gap-3 text-xs font-bold text-amber-300">
              <span>{nextDeadline.displayDate}</span>
              <span>•</span>
              <span>{nextDeadline.formType}</span>
            </div>
          </div>

          <div className="shrink-0 z-10 bg-blue-900/80 border border-blue-700/80 p-4 rounded-2xl text-center min-w-[140px] shadow-inner">
            <p className="text-[10px] font-black text-blue-200 uppercase tracking-widest">Days Remaining</p>
            <p className="text-3xl font-black text-amber-300">{daysLeft}</p>
            <p className="text-[10px] text-blue-200/80 font-medium mt-0.5">Until Due Date</p>
          </div>
        </div>
      )}

      {syncedMessage && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold rounded-xl flex items-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{syncedMessage}</span>
        </motion.div>
      )}

      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {["All", "Estimated Taxes", "Individual (1040)", "Business / Entity", "Foreign (FBAR)"].map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
              activeCategory === cat
                ? "bg-blue-900 text-white shadow-sm"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Deadlines List */}
      <div className="space-y-3">
        {filteredDeadlines.map(deadline => (
          <div
            key={deadline.id}
            className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
              deadline.isCompleted
                ? "bg-gray-50 border-gray-200 opacity-60"
                : deadline.isUrgent
                ? "bg-amber-50/40 border-amber-200/80 shadow-xs"
                : "bg-white border-gray-200/80 hover:border-blue-200"
            }`}
          >
            <div className="flex items-start gap-3">
              <button
                onClick={() => handleToggleComplete(deadline.id)}
                className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-all cursor-pointer ${
                  deadline.isCompleted
                    ? "bg-emerald-600 text-white"
                    : "border-2 border-gray-300 hover:border-blue-900 bg-white"
                }`}
                title={deadline.isCompleted ? "Mark as Pending" : "Mark as Completed / Filed"}
              >
                {deadline.isCompleted && <Check className="w-4 h-4 stroke-[3]" />}
              </button>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`text-xs font-black ${deadline.isCompleted ? "line-through text-gray-500" : "text-gray-900"}`}>
                    {deadline.title}
                  </span>
                  <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-md text-[10px] font-bold">
                    {deadline.category}
                  </span>
                  {deadline.isUrgent && !deadline.isCompleted && (
                    <span className="px-2 py-0.5 bg-red-100 text-red-800 rounded-md text-[10px] font-black uppercase tracking-wider animate-pulse">
                      Urgent
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 font-medium">{deadline.description}</p>
                <div className="flex items-center gap-3 text-[11px] text-gray-400 font-bold pt-0.5">
                  <span className="flex items-center gap-1 text-blue-900">
                    <Calendar className="w-3.5 h-3.5" />
                    {deadline.displayDate}
                  </span>
                  <span>•</span>
                  <span>{deadline.formType}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions for Deadline */}
            <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
              <button
                onClick={() => handleSyncCalendar(deadline)}
                className="px-3 py-1.5 bg-blue-50 text-blue-900 hover:bg-blue-100 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                title="Sync to Google Calendar"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Google Cal</span>
              </button>

              <button
                onClick={() => handleDownloadIcs(deadline)}
                className="p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all"
                title="Download .ics Calendar Event"
              >
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
