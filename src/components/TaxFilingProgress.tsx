import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  CheckCircle2, Clock, FileText, ShieldCheck, Send, 
  ChevronRight, AlertCircle, Sparkles, Upload, FileSignature, 
  Landmark, Info, CheckSquare, Square, ArrowRight, RefreshCw,
  Sliders, MessageSquare, ChevronDown, Check
} from "lucide-react";
import { cn } from "../lib/utils";

export interface FilingSubTask {
  id: string;
  label: string;
  completed: boolean;
}

export interface FilingStep {
  id: number;
  title: string;
  shortDesc: string;
  detailedDesc: string;
  status: "completed" | "in-progress" | "pending" | "needs-action";
  estimatedDays: string;
  targetDate: string;
  icon: React.ElementType;
  actionText?: string;
  actionTab?: string;
  subTasks: FilingSubTask[];
}

export type FilingProfileType = "Form 1040 (Individual)" | "Form 1120-S (S-Corp)" | "Form 1065 (Partnership)" | "Form 1040-NR (Non-Resident)";

const DEFAULT_PROFILE_STEPS: Record<FilingProfileType, FilingStep[]> = {
  "Form 1040 (Individual)": [
    {
      id: 1,
      title: "1. Document Collection",
      shortDesc: "Upload W-2s, 1099s & deduction receipts",
      detailedDesc: "Gather and upload your tax documents, W-2s, 1099-NEC/MISC, 1098 mortgage interest statements, and deduction receipts to your encrypted vault.",
      status: "completed",
      estimatedDays: "Completed",
      targetDate: "Feb 10, 2026",
      icon: Upload,
      actionText: "Manage Tax Vault Files",
      actionTab: "Files",
      subTasks: [
        { id: "s1-1", label: "Upload W-2 Wage Statements", completed: true },
        { id: "s1-2", label: "Upload 1099-INT / 1099-DIV Statements", completed: true },
        { id: "s1-3", label: "Upload Mortgage Interest 1098 Form", completed: true },
        { id: "s1-4", label: "Upload Government-Issued Photo ID", completed: true }
      ]
    },
    {
      id: 2,
      title: "2. Professional Audit",
      shortDesc: "Taxiva LLC CPA line-by-line verification",
      detailedDesc: "Our experienced CPAs review your financial records to ensure all credits, foreign bank reporting (FBAR/FATCA), and eligible deductions are maximized.",
      status: "in-progress",
      estimatedDays: "1-2 Business Days",
      targetDate: "Feb 14, 2026",
      icon: ShieldCheck,
      actionText: "Message CPA Team",
      actionTab: "Communication",
      subTasks: [
        { id: "s2-1", label: "Reconcile Gross Income & Expense Categories", completed: true },
        { id: "s2-2", label: "Run Automated Tax Deductions Finder Audit", completed: true },
        { id: "s2-3", label: "Verify Foreign Bank Account Thresholds (FBAR)", completed: false },
        { id: "s2-4", label: "Finalize Dependents & Child Tax Credit Eligibility", completed: false }
      ]
    },
    {
      id: 3,
      title: "3. Return Preparation",
      shortDesc: "Form 1040 & State tax calculation",
      detailedDesc: "We calculate your precise tax liability or refund amount and generate official Form 1040 schedules for Federal and State revenue bodies.",
      status: "pending",
      estimatedDays: "2-3 Days",
      targetDate: "Feb 17, 2026",
      icon: FileText,
      actionText: "View Tax Worksheets",
      actionTab: "Organizers",
      subTasks: [
        { id: "s3-1", label: "Calculate Adjusted Gross Income (AGI)", completed: false },
        { id: "s3-2", label: "Generate Schedule A Itemized Deductions", completed: false },
        { id: "s3-3", label: "Prepare State Tax Return Schedules", completed: false },
        { id: "s3-4", label: "Run IRS Rule Compliance Diagnostic Engine", completed: false }
      ]
    },
    {
      id: 4,
      title: "4. Client Review & Signature",
      shortDesc: "Approve draft & e-sign Form 8879",
      detailedDesc: "Review your completed return draft, verify direct deposit or payment routing details, and electronically sign authorization Form 8879.",
      status: "pending",
      estimatedDays: "1 Day",
      targetDate: "Feb 19, 2026",
      icon: FileSignature,
      actionText: "E-Sign Form 8879",
      actionTab: "Notes",
      subTasks: [
        { id: "s4-1", label: "Review Final Federal Refund / Balance Due", completed: false },
        { id: "s4-2", label: "Confirm Direct Deposit Routing & Account Numbers", completed: false },
        { id: "s4-3", label: "E-Sign IRS Authorization Form 8879", completed: false }
      ]
    },
    {
      id: 5,
      title: "5. E-Filing & Acceptance",
      shortDesc: "Transmitted to IRS & State Tax Agency",
      detailedDesc: "We electronically transmit your return directly through the IRS MeF Gateway and monitor for official e-file acceptance numbers.",
      status: "pending",
      estimatedDays: "Same Day",
      targetDate: "Feb 20, 2026",
      icon: Landmark,
      actionText: "Check Refund Status",
      actionTab: "Home",
      subTasks: [
        { id: "s5-1", label: "Transmit Data via Secure MeF Gateway", completed: false },
        { id: "s5-2", label: "Receive Official IRS Acceptance Sequence", completed: false },
        { id: "s5-3", label: "State Department of Revenue Acknowledgement", completed: false }
      ]
    }
  ],
  "Form 1120-S (S-Corp)": [
    {
      id: 1,
      title: "1. Corporate Bookkeeping",
      shortDesc: "Upload trial balance & P&L statements",
      detailedDesc: "Upload year-end Profit & Loss statements, balance sheets, and corporate bank statement exports for S-Corporation tax prep.",
      status: "completed",
      estimatedDays: "Completed",
      targetDate: "Feb 05, 2026",
      icon: Upload,
      actionText: "Upload Corporate P&L",
      actionTab: "Files",
      subTasks: [
        { id: "sc1-1", label: "Import General Ledger / Trial Balance", completed: true },
        { id: "sc1-2", label: "Reconcile Officer Compensation & W-2 Salary", completed: true },
        { id: "sc1-3", label: "Upload Shareholder Ownership Distribution Ratios", completed: true }
      ]
    },
    {
      id: 2,
      title: "2. Schedule K-1 Audit",
      shortDesc: "Shareholder allocation & basis tracking",
      detailedDesc: "Calculate shareholder income allocations, distributions, and stock/debt basis limitations to prepare Schedule K-1s.",
      status: "in-progress",
      estimatedDays: "2 Business Days",
      targetDate: "Feb 15, 2026",
      icon: ShieldCheck,
      actionText: "Review K-1 Allocation",
      actionTab: "Organizers",
      subTasks: [
        { id: "sc2-1", label: "Calculate Ordinary Business Income (Line 1)", completed: true },
        { id: "sc2-2", label: "Determine Section 179 Depreciation Add-backs", completed: false },
        { id: "sc2-3", label: "Generate Schedule K-1s for All Shareholders", completed: false }
      ]
    },
    {
      id: 3,
      title: "3. Corporate Filing & E-Sign",
      shortDesc: "E-sign Form 1120-S & Transmit",
      detailedDesc: "Finalize Form 1120-S, obtain corporate officer signature, and e-file prior to the March 15 corporate deadline.",
      status: "pending",
      estimatedDays: "1 Day",
      targetDate: "Mar 01, 2026",
      icon: FileSignature,
      actionText: "Sign Form 1120-S",
      actionTab: "Notes",
      subTasks: [
        { id: "sc3-1", label: "Officer Signature on Form 8879-S", completed: false },
        { id: "sc3-2", label: "E-File Form 1120-S with IRS", completed: false }
      ]
    }
  ],
  "Form 1065 (Partnership)": [
    {
      id: 1,
      title: "1. Partnership Agreement Audit",
      shortDesc: "Partner capital accounts & profit share",
      detailedDesc: "Review partnership agreement terms, special allocations, Section 704(b) capital accounts, and recourse/nonrecourse liabilities.",
      status: "in-progress",
      estimatedDays: "2 Days",
      targetDate: "Feb 18, 2026",
      icon: ShieldCheck,
      actionText: "Upload Partnership Docs",
      actionTab: "Files",
      subTasks: [
        { id: "p1-1", label: "Verify Partner Profit / Loss Split Ratios", completed: true },
        { id: "p1-2", label: "Reconcile Guaranteed Payments to Partners", completed: false },
        { id: "p1-3", label: "Calculate Ending Capital Accounts", completed: false }
      ]
    },
    {
      id: 2,
      title: "2. Form 1065 & K-1 Generation",
      shortDesc: "Partner K-1 distribution statements",
      detailedDesc: "Generate Form 1065, Schedule M-1/M-2 book-to-tax reconciliations, and individual Partner Schedule K-1 statements.",
      status: "pending",
      estimatedDays: "3 Days",
      targetDate: "Mar 05, 2026",
      icon: FileText,
      actionText: "View K-1 Statements",
      actionTab: "Organizers",
      subTasks: [
        { id: "p2-1", label: "Draft Form 1065 Master Schedule", completed: false },
        { id: "p2-2", label: "Issue Individual Partner K-1 Packages", completed: false }
      ]
    }
  ],
  "Form 1040-NR (Non-Resident)": [
    {
      id: 1,
      title: "1. Residency & Tax Treaty Check",
      shortDesc: "Substantial presence test & treaty perks",
      detailedDesc: "Evaluate US presence days, 1042-S income statements, ITIN status, and Article tax treaty exemptions (e.g. US-China, US-UK).",
      status: "in-progress",
      estimatedDays: "1 Business Day",
      targetDate: "Feb 16, 2026",
      icon: ShieldCheck,
      actionText: "Upload Form 1042-S",
      actionTab: "Files",
      subTasks: [
        { id: "nr1-1", label: "Perform Substantial Presence Days Calculation", completed: true },
        { id: "nr1-2", label: "Apply Tax Treaty Article Exemption Limits", completed: true },
        { id: "nr1-3", label: "Verify ITIN / SSN Documentation", completed: false }
      ]
    },
    {
      id: 2,
      title: "2. Form 1040-NR E-Filing",
      shortDesc: "Non-resident return e-filing & ITIN renewal",
      detailedDesc: "Finalize Form 1040-NR and Schedule OI (Other Information), e-sign, and transmit to IRS non-resident operations unit.",
      status: "pending",
      estimatedDays: "2 Days",
      targetDate: "Feb 22, 2026",
      icon: Landmark,
      actionText: "E-Sign Non-Resident Return",
      actionTab: "Notes",
      subTasks: [
        { id: "nr2-1", label: "Prepare Schedule OI Foreign Income Disclosures", completed: false },
        { id: "nr2-2", label: "Transmit Form 1040-NR via MeF Gateway", completed: false }
      ]
    }
  ]
};

export default function TaxFilingProgress({
  onNavigateTab
}: {
  onNavigateTab?: (tab: string) => void;
}) {
  const [selectedProfile, setSelectedProfile] = useState<FilingProfileType>("Form 1040 (Individual)");
  const [stepsMap, setStepsMap] = useState<Record<FilingProfileType, FilingStep[]>>(DEFAULT_PROFILE_STEPS);
  const [activeStepId, setActiveStepId] = useState<number>(2);

  const steps = stepsMap[selectedProfile] || stepsMap["Form 1040 (Individual)"];
  const currentStep = steps.find(s => s.id === activeStepId) || steps[0] || steps[1];

  // Calculate overall progress percentage
  const completedCount = steps.filter(s => s.status === "completed").length;
  const inProgressCount = steps.filter(s => s.status === "in-progress").length;
  const totalProgressPercent = Math.min(
    100,
    Math.round(((completedCount + (inProgressCount * 0.5)) / steps.length) * 100)
  );

  const handleProfileChange = (profile: FilingProfileType) => {
    setSelectedProfile(profile);
    const newSteps = stepsMap[profile] || DEFAULT_PROFILE_STEPS[profile];
    const firstIncomplete = newSteps.find(s => s.status !== "completed") || newSteps[0];
    setActiveStepId(firstIncomplete.id);
  };

  const handleToggleSubTask = (stepId: number, subTaskId: string) => {
    setStepsMap(prev => {
      const currentList = prev[selectedProfile] || [];
      const updatedList = currentList.map(step => {
        if (step.id !== stepId) return step;

        const updatedSubTasks = step.subTasks.map(st => 
          st.id === subTaskId ? { ...st, completed: !st.completed } : st
        );

        const allCompleted = updatedSubTasks.every(st => st.completed);
        const noneCompleted = updatedSubTasks.every(st => !st.completed);

        let newStatus = step.status;
        if (allCompleted) newStatus = "completed";
        else if (!noneCompleted) newStatus = "in-progress";

        return {
          ...step,
          status: newStatus,
          subTasks: updatedSubTasks
        };
      });

      return {
        ...prev,
        [selectedProfile]: updatedList
      };
    });
  };

  const handleManualStatusChange = (stepId: number, newStatus: FilingStep["status"]) => {
    setStepsMap(prev => {
      const currentList = prev[selectedProfile] || [];
      const updatedList = currentList.map(step => {
        if (step.id !== stepId) return step;
        const subTasksUpdated = step.subTasks.map(st => ({
          ...st,
          completed: newStatus === "completed" ? true : newStatus === "pending" ? false : st.completed
        }));
        return {
          ...step,
          status: newStatus,
          subTasks: subTasksUpdated
        };
      });

      return {
        ...prev,
        [selectedProfile]: updatedList
      };
    });
  };

  const advanceStep = (targetStepId: number) => {
    setStepsMap(prev => {
      const currentList = prev[selectedProfile] || [];
      const updatedList = currentList.map(s => {
        if (s.id < targetStepId) {
          return {
            ...s,
            status: "completed" as const,
            subTasks: s.subTasks.map(st => ({ ...st, completed: true }))
          };
        }
        if (s.id === targetStepId) {
          return { ...s, status: "in-progress" as const };
        }
        return s;
      });

      return {
        ...prev,
        [selectedProfile]: updatedList
      };
    });
    setActiveStepId(targetStepId);
  };

  return (
    <div id="tax-filing-progress-tracker" className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden mb-6 transition-all">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 p-6 text-white relative">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="p-1.5 bg-blue-800/80 rounded-lg text-blue-200 flex items-center gap-1 text-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span className="font-extrabold text-amber-300">Live IRS Workflow</span>
              </span>
              <span className="text-[11px] font-bold text-blue-300 uppercase tracking-widest">
                Tax Year 2025 Filing Status Tracker
              </span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                Filing Profile:
              </h3>
              {/* Profile Selector Dropdown */}
              <div className="relative inline-block">
                <select
                  value={selectedProfile}
                  onChange={(e) => handleProfileChange(e.target.value as FilingProfileType)}
                  className="bg-blue-900/90 text-amber-300 border border-amber-400/40 font-black text-sm sm:text-base px-3.5 py-1.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400/50 cursor-pointer shadow-md pr-8 appearance-none"
                >
                  <option value="Form 1040 (Individual)">Form 1040 (Individual Taxpayer)</option>
                  <option value="Form 1120-S (S-Corp)">Form 1120-S (S-Corporation Return)</option>
                  <option value="Form 1065 (Partnership)">Form 1065 (Partnership Return)</option>
                  <option value="Form 1040-NR (Non-Resident)">Form 1040-NR (Non-Resident Foreign)</option>
                </select>
                <ChevronDown className="w-4 h-4 text-amber-300 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-blue-900/70 p-3 rounded-2xl border border-blue-700/50 backdrop-blur-xs shrink-0 self-stretch sm:self-auto justify-between sm:justify-start">
            <div className="text-left sm:text-right">
              <span className="text-[10px] font-bold text-blue-300 uppercase tracking-widest block">Workflow Progress</span>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black text-white">{totalProgressPercent}%</span>
                <span className="text-xs text-emerald-400 font-bold">({completedCount} of {steps.length} Steps)</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 text-blue-950 border-2 border-amber-300 flex items-center justify-center font-black text-sm shadow-md">
              {completedCount}/{steps.length}
            </div>
          </div>
        </div>

        {/* Top Progress bar line */}
        <div className="w-full bg-blue-950/80 h-2.5 rounded-full overflow-hidden mt-5 border border-blue-800/60 p-0.5">
          <motion.div 
            className="bg-gradient-to-r from-amber-400 via-emerald-400 to-emerald-500 h-full rounded-full shadow-xs"
            initial={{ width: 0 }}
            animate={{ width: `${totalProgressPercent}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Interactive Step Nodes Bar */}
      <div className="p-4 sm:p-6 bg-gray-50/70 border-b border-gray-100">
        <div className={cn(
          "grid gap-3 relative",
          steps.length === 5 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5" :
          steps.length === 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2"
        )}>
          {steps.map((step) => {
            const isCompleted = step.status === "completed";
            const isInProgress = step.status === "in-progress";
            const isNeedsAction = step.status === "needs-action";
            const isSelected = activeStepId === step.id;

            return (
              <button
                key={step.id}
                onClick={() => setActiveStepId(step.id)}
                className={cn(
                  "p-3.5 rounded-2xl text-left transition-all border relative flex flex-col justify-between min-h-[115px] cursor-pointer group",
                  isSelected 
                    ? "bg-white border-blue-900 shadow-lg ring-2 ring-blue-900/10 scale-[1.01]" 
                    : isInProgress
                    ? "bg-amber-50/80 border-amber-300 hover:bg-white"
                    : isNeedsAction
                    ? "bg-rose-50/80 border-rose-300 hover:bg-white"
                    : isCompleted
                    ? "bg-emerald-50/60 border-emerald-200 hover:bg-white"
                    : "bg-white/80 border-gray-200 opacity-70 hover:opacity-100"
                )}
              >
                {/* Top Row: Icon & Status Badge */}
                <div className="flex items-center justify-between mb-2">
                  <div className={cn(
                    "w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs transition-transform group-hover:scale-105",
                    isCompleted 
                      ? "bg-emerald-500 text-white shadow-sm" 
                      : isInProgress 
                      ? "bg-amber-500 text-white shadow-sm animate-pulse" 
                      : isNeedsAction
                      ? "bg-rose-600 text-white shadow-sm"
                      : "bg-gray-200 text-gray-500"
                  )}>
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : isNeedsAction ? (
                      <AlertCircle className="w-4 h-4" />
                    ) : (
                      <step.icon className="w-4 h-4" />
                    )}
                  </div>

                  <span className={cn(
                    "text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border",
                    isCompleted 
                      ? "bg-emerald-100 text-emerald-800 border-emerald-200" 
                      : isInProgress 
                      ? "bg-amber-100 text-amber-900 border-amber-200" 
                      : isNeedsAction
                      ? "bg-rose-100 text-rose-900 border-rose-200"
                      : "bg-gray-100 text-gray-500 border-gray-200"
                  )}>
                    {isCompleted ? "Done" : isInProgress ? "In Review" : isNeedsAction ? "Action Req." : "Pending"}
                  </span>
                </div>

                {/* Step Title & Short Description */}
                <div>
                  <h4 className={cn("text-xs font-black truncate", isSelected ? "text-blue-950" : "text-gray-900")}>
                    {step.title}
                  </h4>
                  <p className="text-[10px] text-gray-500 font-medium truncate mt-0.5">
                    {step.shortDesc}
                  </p>
                </div>

                {/* Mini Subtask Progress Dots */}
                <div className="flex items-center gap-1 mt-2">
                  {step.subTasks.map((st) => (
                    <div 
                      key={st.id} 
                      className={cn(
                        "h-1 flex-1 rounded-full transition-all",
                        st.completed ? "bg-emerald-500" : "bg-gray-200"
                      )} 
                      title={st.label}
                    />
                  ))}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Step Details & Checklist Card */}
      <AnimatePresence mode="wait">
        {currentStep && (
          <motion.div 
            key={`${selectedProfile}-${currentStep.id}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="p-6 sm:p-8 bg-white"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Details & Description */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={cn(
                    "text-xs font-black uppercase tracking-wider px-3 py-1 rounded-xl border",
                    currentStep.status === "completed" 
                      ? "bg-emerald-100 text-emerald-900 border-emerald-200" 
                      : currentStep.status === "in-progress" 
                      ? "bg-amber-100 text-amber-900 border-amber-200" 
                      : currentStep.status === "needs-action"
                      ? "bg-rose-100 text-rose-900 border-rose-200"
                      : "bg-gray-100 text-gray-700 border-gray-200"
                  )}>
                    Step {currentStep.id} of {steps.length} &bull; {currentStep.status.replace("-", " ").toUpperCase()}
                  </span>

                  <span className="text-xs font-bold text-gray-500 flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-xl border border-gray-100">
                    <Clock className="w-3.5 h-3.5 text-blue-900" /> Target Date: <strong className="text-gray-900">{currentStep.targetDate}</strong>
                  </span>
                </div>

                <div>
                  <h4 className="text-lg font-black text-gray-900 tracking-tight flex items-center gap-2">
                    <currentStep.icon className="w-5 h-5 text-blue-900" />
                    <span>{currentStep.title}</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium mt-1.5">
                    {currentStep.detailedDesc}
                  </p>
                </div>

                {/* Subtask Checklist */}
                <div className="pt-2">
                  <h5 className="text-[11px] font-extrabold uppercase tracking-wider text-gray-400 mb-2.5 flex items-center justify-between">
                    <span>Required Step Checklist ({currentStep.subTasks.filter(st => st.completed).length}/{currentStep.subTasks.length})</span>
                    <span className="text-[10px] text-blue-900 font-extrabold italic">Click to check off items</span>
                  </h5>

                  <div className="space-y-2 bg-gray-50/80 p-3.5 rounded-2xl border border-gray-100">
                    {currentStep.subTasks.map((subTask) => (
                      <button
                        key={subTask.id}
                        onClick={() => handleToggleSubTask(currentStep.id, subTask.id)}
                        className={cn(
                          "w-full flex items-center justify-between p-2.5 rounded-xl border transition-all text-left cursor-pointer group",
                          subTask.completed 
                            ? "bg-white border-emerald-200 text-gray-800 shadow-2xs" 
                            : "bg-white border-gray-200/80 text-gray-700 hover:border-blue-900/30"
                        )}
                      >
                        <div className="flex items-center gap-2.5 min-w-0 pr-2">
                          <div className={cn(
                            "w-5 h-5 rounded-lg flex items-center justify-center shrink-0 border transition-all",
                            subTask.completed 
                              ? "bg-emerald-500 border-emerald-500 text-white" 
                              : "border-gray-300 bg-gray-50 group-hover:border-blue-900"
                          )}>
                            {subTask.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <span className={cn(
                            "text-xs font-bold truncate",
                            subTask.completed ? "line-through text-gray-400" : "text-gray-900"
                          )}>
                            {subTask.label}
                          </span>
                        </div>

                        <span className={cn(
                          "text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md shrink-0",
                          subTask.completed ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-500"
                        )}>
                          {subTask.completed ? "Completed" : "Pending"}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Actions & Quick Links */}
              <div className="lg:col-span-5 bg-gray-50 p-5 rounded-2xl border border-gray-100 space-y-4 flex flex-col justify-between h-full">
                <div>
                  <h5 className="text-xs font-black uppercase tracking-wider text-gray-900 mb-2 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-blue-900" />
                    <span>Quick Controls & Status</span>
                  </h5>

                  <p className="text-[11px] text-gray-500 font-medium mb-3">
                    Navigate directly to workspace tabs or manually set step completion status.
                  </p>

                  {/* Manual Status Selector */}
                  <div className="mb-4">
                    <label className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 block mb-1">
                      Step Status Override
                    </label>
                    <select
                      value={currentStep.status}
                      onChange={(e) => handleManualStatusChange(currentStep.id, e.target.value as FilingStep["status"])}
                      className="w-full bg-white border border-gray-200 text-xs font-bold rounded-xl px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-900/10 cursor-pointer"
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Review / In Progress</option>
                      <option value="needs-action">Needs Action</option>
                      <option value="completed">Completed & Verified</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-gray-200/80">
                  {currentStep.actionText && currentStep.actionTab && onNavigateTab && (
                    <button
                      onClick={() => onNavigateTab(currentStep.actionTab!)}
                      className="w-full px-4 py-3 bg-blue-900 text-white rounded-xl text-xs font-extrabold hover:bg-blue-800 transition-all shadow-md shadow-blue-900/10 flex items-center justify-between cursor-pointer"
                    >
                      <span>{currentStep.actionText}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}

                  {currentStep.status !== "completed" ? (
                    <button
                      onClick={() => advanceStep(Math.min(steps.length, currentStep.id + 1))}
                      className="w-full px-4 py-2.5 bg-amber-400 text-blue-950 hover:bg-amber-300 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs uppercase tracking-wider"
                    >
                      <span>Advance to Step {Math.min(steps.length, currentStep.id + 1)}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
                      <p className="text-xs font-black text-emerald-900 flex items-center justify-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Step Verified & Completed</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
