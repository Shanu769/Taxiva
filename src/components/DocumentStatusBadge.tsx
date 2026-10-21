/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { 
  CheckCircle2, Clock, Eye, AlertTriangle, ChevronDown, 
  ShieldCheck, Hourglass, HelpCircle, Check, RefreshCw
} from "lucide-react";
import { cn } from "../lib/utils";

export type DocumentStatusType = 
  | "Pending"
  | "Pending CPA Review"
  | "In Review"
  | "Under Review"
  | "Verified by CPA"
  | "Accepted by IRS"
  | "Completed"
  | "Needs Action"
  | "Action Required";

interface DocumentStatusBadgeProps {
  status: string;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onStatusChange?: (newStatus: DocumentStatusType) => void;
  className?: string;
}

export const STATUS_OPTIONS: { status: DocumentStatusType; label: string; description: string }[] = [
  { 
    status: "Pending CPA Review", 
    label: "Pending Review", 
    description: "Uploaded document queued for accountant verification" 
  },
  { 
    status: "In Review", 
    label: "In Review", 
    description: "Tax professional actively auditing receipt/form data" 
  },
  { 
    status: "Verified by CPA", 
    label: "Verified by CPA", 
    description: "Line items checked and validated for tax return filing" 
  },
  { 
    status: "Completed", 
    label: "Completed", 
    description: "Fully processed and filed with tax return" 
  },
  { 
    status: "Needs Action", 
    label: "Needs Action", 
    description: "Requires additional information, signature, or re-scan" 
  },
];

export default function DocumentStatusBadge({
  status,
  size = "md",
  interactive = false,
  onStatusChange,
  className
}: DocumentStatusBadgeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const normalizeStatus = (str: string): "completed" | "in_review" | "pending" | "needs_action" => {
    const lower = str.toLowerCase();
    if (lower.includes("verified") || lower.includes("accepted") || lower.includes("completed")) {
      return "completed";
    }
    if (lower.includes("in review") || lower.includes("under review")) {
      return "in_review";
    }
    if (lower.includes("action") || lower.includes("missing") || lower.includes("rejected")) {
      return "needs_action";
    }
    return "pending";
  };

  const statusType = normalizeStatus(status);

  const getStyle = () => {
    switch (statusType) {
      case "completed":
        return {
          bg: "bg-emerald-50 text-emerald-950 border-emerald-200/90 hover:bg-emerald-100/80",
          dotBg: "bg-emerald-500",
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />,
          label: status.includes("IRS") ? "Accepted by IRS" : status.includes("Verified") ? "Verified by CPA" : "Completed",
        };
      case "in_review":
        return {
          bg: "bg-blue-50 text-blue-950 border-blue-200/90 hover:bg-blue-100/80",
          dotBg: "bg-blue-500",
          icon: <Eye className="w-3.5 h-3.5 text-blue-600 shrink-0" />,
          label: "In Review",
        };
      case "needs_action":
        return {
          bg: "bg-rose-50 text-rose-950 border-rose-200/90 hover:bg-rose-100/80",
          dotBg: "bg-rose-500",
          icon: <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0 animate-pulse" />,
          label: "Needs Action",
        };
      case "pending":
      default:
        return {
          bg: "bg-amber-50 text-amber-950 border-amber-200/90 hover:bg-amber-100/80",
          dotBg: "bg-amber-500",
          icon: <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />,
          label: status.includes("Review") ? "Pending CPA Review" : "Pending",
        };
    }
  };

  const currentStyle = getStyle();

  const sizeClasses = {
    sm: "px-2 py-0.5 text-[10px] gap-1 rounded-md",
    md: "px-2.5 py-1 text-xs gap-1.5 rounded-lg",
    lg: "px-3 py-1.5 text-xs gap-2 rounded-xl"
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        disabled={!interactive}
        onClick={() => interactive && setIsOpen(!isOpen)}
        className={cn(
          "inline-flex items-center font-extrabold border transition-all shadow-2xs select-none",
          currentStyle.bg,
          sizeClasses[size],
          interactive ? "cursor-pointer hover:shadow-xs active:scale-95" : "cursor-default",
          className
        )}
        title={interactive ? "Click to change document processing status" : `Status: ${currentStyle.label}`}
      >
        {currentStyle.icon}
        <span className="whitespace-nowrap">{currentStyle.label}</span>
        {interactive && (
          <ChevronDown className={cn("w-3 h-3 text-gray-500 transition-transform ml-0.5", isOpen && "rotate-180")} />
        )}
      </button>

      {interactive && isOpen && (
        <div className="absolute left-0 sm:right-0 sm:left-auto mt-1.5 w-60 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-[110] space-y-1 text-left animate-in fade-in slide-in-from-top-2 duration-150">
          <p className="px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-gray-400 border-b border-gray-100">
            Update Processing State
          </p>
          {STATUS_OPTIONS.map((opt) => {
            const isSelected = status === opt.status || currentStyle.label === opt.label;
            return (
              <button
                key={opt.status}
                onClick={() => {
                  if (onStatusChange) onStatusChange(opt.status);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full px-3 py-2 rounded-xl text-left transition-colors flex items-start gap-2.5 group cursor-pointer",
                  isSelected ? "bg-blue-50/80 text-blue-900" : "hover:bg-gray-50 text-gray-800"
                )}
              >
                <div className="mt-0.5">
                  {isSelected ? (
                    <Check className="w-3.5 h-3.5 text-blue-900 stroke-[3]" />
                  ) : (
                    <div className="w-3.5 h-3.5 rounded-full border border-gray-300 group-hover:border-blue-900" />
                  )}
                </div>
                <div>
                  <p className="text-xs font-extrabold text-gray-900 group-hover:text-blue-900">
                    {opt.label}
                  </p>
                  <p className="text-[10px] text-gray-400 font-medium leading-tight">
                    {opt.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
