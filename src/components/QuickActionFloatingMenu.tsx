/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Plus, Camera, UploadCloud, FileText, MessageSquare, 
  Calculator, FileCheck, X, Sparkles, Shield, User, ChevronRight
} from "lucide-react";

interface QuickActionProps {
  onScanReceipt: () => void;
  onViewReturns: () => void;
  onContactAccountant: () => void;
  onAddNote: () => void;
  onOpenCalculator: () => void;
  onUploadFile: () => void;
}

export default function QuickActionFloatingMenu({
  onScanReceipt,
  onViewReturns,
  onContactAccountant,
  onAddNote,
  onOpenCalculator,
  onUploadFile
}: QuickActionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      id: "scan",
      label: "Camera Scan Receipt",
      icon: Camera,
      color: "bg-blue-900 text-white",
      onClick: () => {
        setIsOpen(false);
        onScanReceipt();
      }
    },
    {
      id: "upload",
      label: "Upload Document / Tax Form",
      icon: UploadCloud,
      color: "bg-emerald-600 text-white",
      onClick: () => {
        setIsOpen(false);
        onUploadFile();
      }
    },
    {
      id: "contact",
      label: "Contact CPA Accountant",
      icon: MessageSquare,
      color: "bg-indigo-600 text-white",
      onClick: () => {
        setIsOpen(false);
        onContactAccountant();
      }
    },
    {
      id: "returns",
      label: "View Tax Returns & Stage",
      icon: FileCheck,
      color: "bg-amber-500 text-white",
      onClick: () => {
        setIsOpen(false);
        onViewReturns();
      }
    },
    {
      id: "note",
      label: "Add Quick Tax Note",
      icon: FileText,
      color: "bg-purple-600 text-white",
      onClick: () => {
        setIsOpen(false);
        onAddNote();
      }
    },
    {
      id: "calc",
      label: "Tax Savings Calculator",
      icon: Calculator,
      color: "bg-slate-800 text-white",
      onClick: () => {
        setIsOpen(false);
        onOpenCalculator();
      }
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[100] text-left">
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-[90]"
            />

            {/* Floating Menu Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="absolute bottom-16 right-0 w-72 bg-white rounded-3xl shadow-2xl border border-gray-100 p-3 z-[100] space-y-1.5"
            >
              <div className="p-3 bg-gradient-to-r from-blue-950 to-blue-900 rounded-2xl text-white flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span className="text-xs font-black italic">Quick Actions Menu</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-blue-800 rounded-lg transition-colors text-blue-200 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {actions.map((action, idx) => {
                const Icon = action.icon;
                return (
                  <motion.button
                    key={action.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    onClick={action.onClick}
                    className="w-full p-2.5 rounded-2xl hover:bg-gray-50 transition-all flex items-center justify-between group text-left cursor-pointer border border-transparent hover:border-gray-200/80"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${action.color} shadow-sm group-hover:scale-105 transition-transform`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-gray-800 group-hover:text-blue-900 transition-colors">
                        {action.label}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-900 group-hover:translate-x-0.5 transition-all" />
                  </motion.button>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Trigger FAB Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="px-5 py-3.5 bg-gradient-to-r from-blue-900 via-slate-900 to-blue-950 hover:from-blue-800 hover:to-blue-900 text-white rounded-full shadow-2xl border-2 border-white/20 flex items-center gap-2.5 font-black text-xs uppercase tracking-wider cursor-pointer z-[100]"
      >
        <div className={`transition-transform duration-300 ${isOpen ? "rotate-45" : "rotate-0"}`}>
          <Plus className="w-5 h-5 text-amber-300 stroke-[3]" />
        </div>
        <span className="hidden sm:inline">Quick Actions</span>
      </motion.button>
    </div>
  );
}
