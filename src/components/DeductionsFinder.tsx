import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, CheckCircle2, Clock, DollarSign, FileCheck, Filter, HelpCircle, Info, Sparkles, Tag, AlertCircle, Save, ChevronRight, Briefcase, Home, UserCheck, Building, Stethoscope, Laptop, Printer } from "lucide-react";

export interface DeductionItem {
  id: string;
  category: "Freelancer" | "Small Business" | "Homeowner" | "Remote Worker" | "Real Estate" | "Healthcare & W2";
  title: string;
  description: string;
  estSavings: number;
  irsRule: string;
  docRequired: string;
  status: "unclaimed" | "claimed" | "pending";
}

const INITIAL_DEDUCTIONS: DeductionItem[] = [
  // Freelancer / 1099
  {
    id: "d-1",
    category: "Freelancer",
    title: "Home Office Square Footage Deduction",
    description: "Deduct $5/sq ft up to 300 sq ft, or simplified actual utility and rent allocation for dedicated workstation.",
    estSavings: 1500,
    irsRule: "IRS Topic 509 & Publication 587 (Exclusive and regular use requirement)",
    docRequired: "Lease agreement, utility bills, or room dimensions photo",
    status: "unclaimed"
  },
  {
    id: "d-2",
    category: "Freelancer",
    title: "Self-Employed Health Insurance Premiums",
    description: "100% deduction for medical, dental, and long-term care premiums paid for yourself, spouse, and dependents.",
    estSavings: 3800,
    irsRule: "IRS Code Sec. 162(l) (Above-the-line deduction)",
    docRequired: "Annual health insurance payment summaries or Form 1095-A",
    status: "unclaimed"
  },
  {
    id: "d-3",
    category: "Freelancer",
    title: "Professional Software & Cloud Tools",
    description: "Software subscriptions (Adobe, QuickBooks, Slack, AI subscriptions, hosting, domain names).",
    estSavings: 1200,
    irsRule: "IRS Sec. 162 Ordinary & Necessary Business Expenses",
    docRequired: "Monthly digital receipts & credit card billing statements",
    status: "unclaimed"
  },

  // Small Business
  {
    id: "d-4",
    category: "Small Business",
    title: "Qualified Business Income (QBI) 20% Deduction",
    description: "Allows eligible self-employed & small business owners to deduct up to 20% of qualified business income.",
    estSavings: 4500,
    irsRule: "IRS Section 199A QBI Guidance",
    docRequired: "Form 1040 Schedule C or K-1 statements",
    status: "unclaimed"
  },
  {
    id: "d-5",
    category: "Small Business",
    title: "Standard Mileage vs Actual Auto Expenses",
    description: "67 cents per business mile driven in 2024 / 67.5c in 2025, plus parking and tolls.",
    estSavings: 2800,
    irsRule: "IRS Standard Mileage Rate Notice",
    docRequired: "MileIQ or logbook record showing date, destination & business purpose",
    status: "unclaimed"
  },
  {
    id: "d-6",
    category: "Small Business",
    title: "Section 179 First-Year Equipment Depreciation",
    description: "Write off 100% of purchase price of eligible computers, machinery, and furniture in year purchased.",
    estSavings: 5200,
    irsRule: "IRS Code Sec. 179 ($1,220,000 cap for 2025)",
    docRequired: "Equipment invoice & date placed in service",
    status: "unclaimed"
  },

  // Homeowner
  {
    id: "d-7",
    category: "Homeowner",
    title: "Primary Residence Mortgage Interest (Form 1098)",
    description: "Deduct mortgage interest on up to $750,000 of home acquisition debt for primary residence.",
    estSavings: 6200,
    irsRule: "IRS Publication 936 Home Mortgage Interest Deduction",
    docRequired: "Form 1098 issued by mortgage lender",
    status: "unclaimed"
  },
  {
    id: "d-8",
    category: "Homeowner",
    title: "State & Local Property Taxes (SALT Capped)",
    description: "Deduct state property and income taxes (up to $10,000 federal combined cap).",
    estSavings: 3500,
    irsRule: "IRS Schedule A SALT Limitation",
    docRequired: "County property tax statements & canceled checks",
    status: "unclaimed"
  },
  {
    id: "d-9",
    category: "Homeowner",
    title: "Residential Clean Energy Credit (Solar & Battery)",
    description: "30% federal tax credit for installed rooftop solar, battery storage, and geothermal heat pumps.",
    estSavings: 4200,
    irsRule: "IRS Form 5695 Residential Energy Credits",
    docRequired: "Solar installer contract & itemized payment receipts",
    status: "unclaimed"
  },

  // Remote Worker / W-2
  {
    id: "d-10",
    category: "Remote Worker",
    title: "Educator Classroom Expense Adjustment",
    description: "Up to $300 ($600 for joint educators) for out-of-pocket books, supplies, and technology.",
    estSavings: 300,
    irsRule: "IRS Educator Expense Above-the-Line Adjustment",
    docRequired: "Classroom receipts & school verification",
    status: "unclaimed"
  },
  {
    id: "d-11",
    category: "Healthcare & W2",
    title: "HSA / FSA Contributions Deduction",
    description: "Triple-tax-advantaged contributions to High Deductible Health Plan HSA accounts.",
    estSavings: 1400,
    irsRule: "IRS Form 8889 Health Savings Accounts",
    docRequired: "Form 5498-SA or W-2 Box 12 Code W",
    status: "unclaimed"
  },

  // Real Estate
  {
    id: "d-12",
    category: "Real Estate",
    title: "Rental Property Depreciation & Maintenance",
    description: "Residential real estate 27.5-year linear depreciation plus active management expenses, repairs, HOA fees.",
    estSavings: 7800,
    irsRule: "IRS Schedule E Supplemental Income & Loss",
    docRequired: "Settlement statement (HUD-1), property tax bills, repair invoices",
    status: "unclaimed"
  }
];

export default function DeductionsFinder({ onSaveToNotes }: { onSaveToNotes?: (claimedItems: DeductionItem[]) => void }) {
  const [items, setItems] = useState<DeductionItem[]>(INITIAL_DEDUCTIONS);
  const [selectedProfile, setSelectedProfile] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState<string | null>(null);

  const profiles = [
    { id: "All", label: "All Categories", icon: Sparkles },
    { id: "Freelancer", label: "Freelancer / 1099", icon: Briefcase },
    { id: "Small Business", label: "Small Business", icon: Building },
    { id: "Homeowner", label: "Homeowner", icon: Home },
    { id: "Remote Worker", label: "Remote Employee", icon: Laptop },
    { id: "Real Estate", label: "Real Estate", icon: Building },
    { id: "Healthcare & W2", label: "Healthcare & W-2", icon: Stethoscope },
  ];

  const toggleStatus = (id: string, newStatus: "claimed" | "pending" | "unclaimed") => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  const filteredItems = items.filter((item) => {
    const matchesProfile = selectedProfile === "All" || item.category === selectedProfile;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.docRequired.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesProfile && matchesSearch;
  });

  const claimedItems = items.filter((i) => i.status === "claimed");
  const totalClaimedSavings = claimedItems.reduce((acc, curr) => acc + curr.estSavings, 0);

  const handleSaveDeductions = () => {
    if (onSaveToNotes) {
      onSaveToNotes(claimedItems);
    }
    setNotification(`Successfully saved ${claimedItems.length} claimed deductions ($${totalClaimedSavings.toLocaleString()} est. tax savings) to your CPA organizer notes!`);
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-xl p-6 sm:p-8 text-left space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <div>
          <span className="bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Interactive Deductions Finder
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 italic">
            Smart Tax Write-off Checklist
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm font-medium mt-1">
            Identify tax write-offs customized to your profile, verify documentation requirements, and save to your CPA organizer.
          </p>
        </div>

        {/* Live Total Counter Card */}
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 text-white p-4 rounded-2xl shadow-md border border-blue-800/80 shrink-0 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center text-blue-950 font-black shadow-inner shrink-0">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-blue-200 tracking-wider">Identified Tax Savings</p>
              <p className="text-xl sm:text-2xl font-black text-amber-300">
                ${totalClaimedSavings.toLocaleString()}
              </p>
              <p className="text-[10px] text-blue-300 font-medium">
                {claimedItems.length} write-offs selected
              </p>
            </div>
          </div>

          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-blue-950 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-md transition-all active:scale-95 uppercase tracking-wider shrink-0"
            title="Print physical copy of deductions summary"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">Print Deductions</span>
          </button>
        </div>
      </div>

      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 text-xs font-bold flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{notification}</span>
          </div>
        </motion.div>
      )}

      {/* Filter Category Tabs */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-black text-gray-700 uppercase tracking-wider">
            Filter By Profile Category
          </label>

          <input
            type="text"
            placeholder="Search write-off or requirement..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3.5 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-900/10 w-full max-w-xs"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {profiles.map((p) => {
            const Icon = p.icon;
            const isSelected = selectedProfile === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedProfile(p.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all shrink-0 flex items-center gap-2 border ${
                  isSelected
                    ? "bg-blue-900 text-white border-blue-900 shadow-md"
                    : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? "text-amber-300" : "text-gray-500"}`} />
                <span>{p.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Deduction Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
              item.status === "claimed"
                ? "bg-emerald-50/60 border-emerald-300 shadow-sm"
                : item.status === "pending"
                ? "bg-amber-50/50 border-amber-200"
                : "bg-white border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <span className="bg-blue-100 text-blue-900 px-2.5 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider">
                  {item.category}
                </span>

                <span className="text-xs font-black text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-lg shrink-0">
                  +${item.estSavings.toLocaleString()} Est. Savings
                </span>
              </div>

              <h4 className="text-sm font-extrabold text-gray-900 leading-snug">
                {item.title}
              </h4>

              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                {item.description}
              </p>

              <div className="pt-2 border-t border-gray-100 space-y-1 text-[11px]">
                <p className="text-gray-500 font-semibold flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-blue-900 shrink-0" />
                  <span className="truncate">{item.irsRule}</span>
                </p>
                <p className="text-gray-700 font-bold flex items-center gap-1.5">
                  <FileCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="text-gray-900">Required: {item.docRequired}</span>
                </p>
              </div>
            </div>

            {/* Action Toggles */}
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
              <span className="text-[10px] font-bold uppercase text-gray-400">Claim Status</span>

              <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl text-[11px] font-extrabold">
                <button
                  onClick={() => toggleStatus(item.id, "unclaimed")}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    item.status === "unclaimed" ? "bg-white text-gray-800 shadow-xs" : "text-gray-400 hover:text-gray-700"
                  }`}
                >
                  N/A
                </button>
                <button
                  onClick={() => toggleStatus(item.id, "pending")}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    item.status === "pending" ? "bg-amber-400 text-blue-950 shadow-xs" : "text-gray-400 hover:text-amber-600"
                  }`}
                >
                  Needs Receipt
                </button>
                <button
                  onClick={() => toggleStatus(item.id, "claimed")}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    item.status === "claimed" ? "bg-emerald-600 text-white shadow-xs" : "text-gray-400 hover:text-emerald-600"
                  }`}
                >
                  Claim Write-off
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="py-12 text-center text-gray-400 space-y-2">
          <Filter className="w-8 h-8 mx-auto text-gray-300" />
          <p className="text-xs font-bold text-gray-700">No write-offs match your search criteria</p>
          <p className="text-[11px] text-gray-400">Try changing your profile filter or search query.</p>
        </div>
      )}

      {/* Save Button */}
      <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-gray-500 font-medium italic">
          Selected deductions are reviewed by your dedicated Taxiva LLC CPA before final filing.
        </p>

        <button
          onClick={handleSaveDeductions}
          disabled={claimedItems.length === 0}
          className="w-full sm:w-auto px-6 py-3 bg-blue-900 text-white font-black text-xs rounded-xl hover:bg-blue-800 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Save className="w-4 h-4 text-amber-300" /> Save {claimedItems.length} Claimed Write-offs (${totalClaimedSavings.toLocaleString()})
        </button>
      </div>
    </div>
  );
}
