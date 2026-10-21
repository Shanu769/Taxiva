import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Calendar, AlertCircle, Clock, CheckCircle2, User, Building2, 
  Filter, Bell, Download, ChevronRight, AlertTriangle, Info,
  Search, ShieldAlert, ExternalLink, CalendarDays, ArrowUpRight
} from "lucide-react";

export type ProfileType = "Individual" | "Business" | "All";
export type DeadlineCategory = "Federal Income" | "Estimated Tax" | "Payroll & Information" | "State Tax" | "Extension";

export interface TaxDeadline {
  id: string;
  title: string;
  dueDate: string; // ISO date string YYYY-MM-DD
  displayDate: string;
  profileTypes: ProfileType[]; // Applicable profile types
  category: DeadlineCategory;
  description: string;
  formType: string;
  isHighPriority?: boolean;
  actionUrl?: string;
}

// Sample comprehensive tax deadlines for TY 2025/2026
const ALL_TAX_DEADLINES: TaxDeadline[] = [
  {
    id: "jan-31-w2-1099",
    title: "1099-NEC & W-2 Submission Deadline",
    dueDate: "2026-01-31",
    displayDate: "January 31, 2026",
    profileTypes: ["Business"],
    category: "Payroll & Information",
    description: "Deadline to send W-2s to employees and 1099-NEC forms to independent contractors and file with the IRS/SSA.",
    formType: "Form W-2 & 1099-NEC",
    isHighPriority: true,
    actionUrl: "https://www.irs.gov/forms-pubs/about-form-w-2"
  },
  {
    id: "mar-15-scorp-partnership",
    title: "S-Corp (1120-S) & Partnership (1065) Filing",
    dueDate: "2026-03-16",
    displayDate: "March 16, 2026",
    profileTypes: ["Business"],
    category: "Federal Income",
    description: "Partnership and S-Corporation tax returns due or file Form 7004 for a 6-month extension.",
    formType: "Form 1065 / 1120-S",
    isHighPriority: true,
    actionUrl: "https://www.irs.gov/businesses/small-businesses-self-employed/partnership"
  },
  {
    id: "apr-15-ind-1040",
    title: "Individual Income Tax Return (1040)",
    dueDate: "2026-04-15",
    displayDate: "April 15, 2026",
    profileTypes: ["Individual"],
    category: "Federal Income",
    description: "Annual individual income tax return due or submit Form 4868 for an extension to October 15.",
    formType: "Form 1040",
    isHighPriority: true,
    actionUrl: "https://www.irs.gov/filing/individuals/how-to-file"
  },
  {
    id: "apr-15-ccorp-1120",
    title: "C-Corporation Income Tax Return (1120)",
    dueDate: "2026-04-15",
    displayDate: "April 15, 2026",
    profileTypes: ["Business"],
    category: "Federal Income",
    description: "C-Corp tax returns due for calendar year entities or request 6-month extension with Form 7004.",
    formType: "Form 1120",
    isHighPriority: true,
    actionUrl: "https://www.irs.gov/businesses/corporations"
  },
  {
    id: "apr-15-q1-est",
    title: "Q1 Estimated Tax Payment Due",
    dueDate: "2026-04-15",
    displayDate: "April 15, 2026",
    profileTypes: ["Individual", "Business"],
    category: "Estimated Tax",
    description: "First quarter estimated tax payment due for individuals, sole proprietors, and corporations.",
    formType: "Form 1040-ES / 1120-W",
    isHighPriority: true,
    actionUrl: "https://www.irs.gov/payments/direct-pay"
  },
  {
    id: "apr-15-fbar",
    title: "FBAR Foreign Account Reporting (FinCEN 114)",
    dueDate: "2026-04-15",
    displayDate: "April 15, 2026",
    profileTypes: ["Individual", "Business"],
    category: "State Tax",
    description: "Report foreign financial accounts exceeding $10,000 at any time during the calendar year (Automatic extension to Oct 15).",
    formType: "FinCEN Form 114",
    isHighPriority: false,
    actionUrl: "https://bsaefiling.fincen.treas.gov/"
  },
  {
    id: "jun-15-q2-est",
    title: "Q2 Estimated Tax Payment Due",
    dueDate: "2026-06-15",
    displayDate: "June 15, 2026",
    profileTypes: ["Individual", "Business"],
    category: "Estimated Tax",
    description: "Second quarter estimated tax payment for self-employed individuals and business entities.",
    formType: "Form 1040-ES / 1120-W",
    isHighPriority: true,
    actionUrl: "https://www.irs.gov/payments"
  },
  {
    id: "sep-15-q3-est",
    title: "Q3 Estimated Tax Payment Due",
    dueDate: "2026-09-15",
    displayDate: "September 15, 2026",
    profileTypes: ["Individual", "Business"],
    category: "Estimated Tax",
    description: "Third quarter estimated tax payment due to avoid underpayment interest/penalties.",
    formType: "Form 1040-ES / 1120-W",
    isHighPriority: false,
    actionUrl: "https://www.irs.gov/payments"
  },
  {
    id: "sep-15-s-corp-ext",
    title: "Extended S-Corp & Partnership Filing Deadline",
    dueDate: "2026-09-15",
    displayDate: "September 15, 2026",
    profileTypes: ["Business"],
    category: "Extension",
    description: "Final deadline for Form 1065 and Form 1120-S if an extension was requested in March.",
    formType: "Form 1065 / 1120-S Ext",
    isHighPriority: true,
    actionUrl: "https://www.irs.gov/businesses"
  },
  {
    id: "oct-15-ind-ext",
    title: "Extended Individual Income Tax Return (1040)",
    dueDate: "2026-10-15",
    displayDate: "October 15, 2026",
    profileTypes: ["Individual"],
    category: "Extension",
    description: "Final deadline to submit Form 1040 if Form 4868 extension was filed by April 15.",
    formType: "Form 1040 Ext",
    isHighPriority: true,
    actionUrl: "https://www.irs.gov/filing"
  },
  {
    id: "oct-15-ccorp-ext",
    title: "Extended C-Corp Tax Filing (1120)",
    dueDate: "2026-10-15",
    displayDate: "October 15, 2026",
    profileTypes: ["Business"],
    category: "Extension",
    description: "Final deadline for C-Corporation Form 1120 on valid 6-month extension.",
    formType: "Form 1120 Ext",
    isHighPriority: false,
    actionUrl: "https://www.irs.gov/businesses"
  },
  {
    id: "jan-15-q4-est",
    title: "Q4 Estimated Tax Payment Due",
    dueDate: "2027-01-15",
    displayDate: "January 15, 2027",
    profileTypes: ["Individual", "Business"],
    category: "Estimated Tax",
    description: "Final estimated payment for income earned in Q4 of prior year.",
    formType: "Form 1040-ES",
    isHighPriority: false,
    actionUrl: "https://www.irs.gov/payments"
  }
];

export default function TaxCalendar({
  defaultProfile = "Individual",
  className = ""
}: {
  defaultProfile?: ProfileType;
  className?: string;
}) {
  const [profile, setProfile] = useState<ProfileType>(defaultProfile);
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [reminderAdded, setReminderAdded] = useState<Record<string, boolean>>({});

  // Calculate days remaining helper
  const getDaysRemaining = (dueDateStr: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDateStr);
    due.setHours(0, 0, 0, 0);

    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Filter deadlines
  const filteredDeadlines = useMemo(() => {
    return ALL_TAX_DEADLINES.filter(item => {
      // Profile filter
      if (profile !== "All" && !item.profileTypes.includes(profile)) {
        return false;
      }
      // Category filter
      if (categoryFilter !== "All" && item.category !== categoryFilter) {
        return false;
      }
      // Search query
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesForm = item.formType.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDesc && !matchesForm) return false;
      }
      return true;
    }).sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  }, [profile, categoryFilter, searchQuery]);

  // Find the next upcoming deadline for the active profile alert banner
  const nextCriticalDeadline = useMemo(() => {
    const upcoming = ALL_TAX_DEADLINES.filter(item => {
      if (profile !== "All" && !item.profileTypes.includes(profile)) return false;
      const days = getDaysRemaining(item.dueDate);
      return days >= 0;
    }).sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

    return upcoming[0] || null;
  }, [profile]);

  const toggleReminder = (id: string, title: string, dueDate: string) => {
    setReminderAdded(prev => ({ ...prev, [id]: !prev[id] }));
    
    // Create calendar .ics file download for seamless calendar export
    if (!reminderAdded[id]) {
      const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Taxiva LLC Compliance//Tax Calendar//EN
BEGIN:VEVENT
SUMMARY:Taxiva LLC Tax Deadline: ${title}
DESCRIPTION:Reminder for tax deadline: ${title}.
DTSTART;VALUE=DATE:${dueDate.replace(/-/g, '')}
DTEND;VALUE=DATE:${dueDate.replace(/-/g, '')}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_reminder.ics`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className={`bg-white rounded-3xl border border-gray-200/80 shadow-xl overflow-hidden ${className}`}>
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-900 to-indigo-950 p-6 sm:p-8 text-white relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="p-2 bg-blue-800/60 rounded-xl text-blue-200 border border-blue-700/50">
                <Calendar className="w-5 h-5" />
              </span>
              <span className="text-xs font-bold text-blue-300 uppercase tracking-widest italic">
                Tax Compliance Center
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight italic">
              Tax Deadline Calendar
            </h2>
            <p className="text-blue-200/80 text-sm mt-1 max-w-xl font-medium">
              Stay ahead of federal & state filing dates with tailored compliance alerts for your account profile.
            </p>
          </div>

          {/* Profile Type Toggle */}
          <div className="bg-blue-950/80 p-1.5 rounded-2xl border border-blue-700/50 flex items-center gap-1 shrink-0">
            <button
              onClick={() => setProfile("Individual")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                profile === "Individual"
                  ? "bg-white text-blue-950 shadow-lg font-black"
                  : "text-blue-200 hover:text-white hover:bg-blue-900/50"
              }`}
            >
              <User className="w-3.5 h-3.5" />
              Individual
            </button>
            <button
              onClick={() => setProfile("Business")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                profile === "Business"
                  ? "bg-white text-blue-950 shadow-lg font-black"
                  : "text-blue-200 hover:text-white hover:bg-blue-900/50"
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              Business
            </button>
            <button
              onClick={() => setProfile("All")}
              className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                profile === "All"
                  ? "bg-white text-blue-950 shadow-lg font-black"
                  : "text-blue-200 hover:text-white hover:bg-blue-900/50"
              }`}
            >
              All
            </button>
          </div>
        </div>
      </div>

      {/* Profile-based Priority Alert Banner */}
      {nextCriticalDeadline && (
        <div className="bg-amber-50 border-b border-amber-200/80 p-4 sm:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500 text-white rounded-2xl shrink-0 shadow-md shadow-amber-500/20">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-200/70 px-2 py-0.5 rounded-md">
                  Next Up for {profile}
                </span>
                <span className="text-xs font-extrabold text-amber-900">
                  {nextCriticalDeadline.displayDate}
                </span>
              </div>
              <p className="text-sm font-bold text-gray-900 mt-0.5">
                {nextCriticalDeadline.title} ({nextCriticalDeadline.formType})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
            {(() => {
              const days = getDaysRemaining(nextCriticalDeadline.dueDate);
              return (
                <span className={`text-xs font-black px-3 py-1.5 rounded-xl border ${
                  days <= 14 
                    ? "bg-red-100 text-red-800 border-red-200" 
                    : "bg-amber-100 text-amber-900 border-amber-300"
                }`}>
                  {days === 0 ? "DUE TODAY!" : days < 0 ? `${Math.abs(days)} Days Overdue` : `${days} Days Remaining`}
                </span>
              );
            })()}
            <button
              onClick={() => toggleReminder(nextCriticalDeadline.id, nextCriticalDeadline.title, nextCriticalDeadline.dueDate)}
              className="inline-flex items-center gap-1.5 bg-amber-900 text-white text-xs font-bold px-3.5 py-2 rounded-xl hover:bg-amber-800 transition-all shadow-sm"
            >
              <Bell className="w-3.5 h-3.5" />
              {reminderAdded[nextCriticalDeadline.id] ? "Saved .ics" : "Add Alert"}
            </button>
          </div>
        </div>
      )}

      {/* Controls & Search */}
      <div className="p-6 sm:px-8 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Category Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1 mr-1 shrink-0">
            <Filter className="w-3.5 h-3.5" /> Category:
          </span>
          {["All", "Federal Income", "Estimated Tax", "Payroll & Information", "Extension"].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                categoryFilter === cat
                  ? "bg-blue-900 text-white shadow-md shadow-blue-900/10"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search forms or dates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white rounded-xl border border-gray-200 text-xs font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900 transition-all"
          />
        </div>
      </div>

      {/* Deadline Grid List */}
      <div className="p-6 sm:p-8 space-y-4 max-h-[580px] overflow-y-auto">
        {filteredDeadlines.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <CalendarDays className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-sm font-bold text-gray-700">No tax deadlines match your criteria.</p>
            <p className="text-xs text-gray-400 font-medium mt-1">Try resetting the category filter or searching for another form.</p>
            <button
              onClick={() => { setCategoryFilter("All"); setSearchQuery(""); setProfile("All"); }}
              className="mt-4 px-4 py-2 bg-blue-900 text-white rounded-xl text-xs font-bold hover:bg-blue-800 transition-all"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredDeadlines.map((item) => {
            const daysRemaining = getDaysRemaining(item.dueDate);
            const isPast = daysRemaining < 0;
            const isUrgent = daysRemaining >= 0 && daysRemaining <= 30;
            const isSaved = reminderAdded[item.id];

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-5 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  isUrgent 
                    ? "bg-amber-50/40 border-amber-200/80 hover:border-amber-300" 
                    : isPast 
                    ? "bg-gray-50/80 border-gray-200 opacity-75" 
                    : "bg-white border-gray-200/80 hover:border-blue-200 hover:shadow-md"
                }`}
              >
                {/* Left Side: Info */}
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-extrabold text-blue-900 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
                      {item.formType}
                    </span>
                    <span className="text-[11px] font-bold text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-md">
                      {item.category}
                    </span>
                    {item.profileTypes.map(p => (
                      <span key={p} className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                        {p === "Individual" ? <User className="w-3 h-3" /> : <Building2 className="w-3 h-3" />}
                        {p}
                      </span>
                    ))}
                  </div>

                  <h4 className="text-base font-bold text-gray-900 flex items-center gap-2">
                    {item.title}
                  </h4>

                  <p className="text-xs text-gray-600 leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>

                {/* Right Side: Due Date & Action */}
                <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-end justify-between gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-gray-100">
                  <div className="text-left sm:text-right">
                    <div className="flex items-center gap-1.5 text-xs font-black text-gray-900">
                      <Clock className="w-3.5 h-3.5 text-blue-900" />
                      {item.displayDate}
                    </div>
                    <div className="mt-0.5">
                      {isPast ? (
                        <span className="text-[11px] font-bold text-gray-400">Past Date</span>
                      ) : daysRemaining === 0 ? (
                        <span className="text-xs font-black text-red-600 animate-pulse">DUE TODAY!</span>
                      ) : (
                        <span className={`text-xs font-bold ${isUrgent ? "text-amber-700" : "text-emerald-700"}`}>
                          {daysRemaining} days away
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => toggleReminder(item.id, item.title, item.dueDate)}
                      title="Download .ics Calendar Event"
                      className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        isSaved 
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-200" 
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      }`}
                    >
                      {isSaved ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          ICS Ready
                        </>
                      ) : (
                        <>
                          <Download className="w-3.5 h-3.5 text-gray-500" />
                          Add .ICS
                        </>
                      )}
                    </button>

                    {item.actionUrl && (
                      <a
                        href={item.actionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center p-2 rounded-xl bg-blue-50 text-blue-900 hover:bg-blue-900 hover:text-white transition-all border border-blue-100"
                        title="View Official IRS Details"
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Footer / Tip */}
      <div className="p-4 sm:px-8 bg-blue-50/60 border-t border-blue-100 text-xs text-blue-900/80 font-medium flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-blue-900 shrink-0" />
          <span>Need filing assistance or custom extension requests for your business or individual return?</span>
        </div>
        <a 
          href="https://www.irs.gov/filing/free-file-do-your-federal-taxes-for-free" 
          target="_blank" 
          rel="noopener noreferrer"
          className="font-bold underline text-blue-950 hover:text-blue-800 shrink-0"
        >
          IRS Official Direct Filing Portals &rarr;
        </a>
      </div>
    </div>
  );
}
