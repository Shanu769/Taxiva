/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppCallout";

export default function WhatsAppFloatingButton() {
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappUrl =
    "https://wa.me/919963260743?text=Hi%20TAXIVA%20LLC%2C%20I%20would%20like%20to%20consult%20about%20my%20tax%20draft%20or%20inquire%20about%20services.";

  return (
    <div className="fixed bottom-6 left-6 z-40 flex items-center gap-3">
      {/* Tooltip badge */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: -10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: -10 }}
            className="hidden sm:flex items-center gap-2 bg-white text-[#0f172a] text-xs font-bold py-2 px-3.5 rounded-2xl shadow-xl border border-[#dbeafe]"
          >
            <span className="w-2 h-2 rounded-full bg-[#25d366] animate-pulse" />
            <span>Chat on WhatsApp</span>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-[#94a3b8] hover:text-[#0f172a] ml-1 p-0.5 rounded cursor-pointer"
              aria-label="Dismiss tooltip"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Taxiva LLC"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-[#25d366] text-white shadow-2xl flex items-center justify-center transition-all duration-300 ring-4 ring-[#25d366]/20 hover:bg-[#20ba59] active:scale-95"
      >
        <WhatsAppIcon className="w-7 h-7 text-white" />
      </motion.a>
    </div>
  );
}
