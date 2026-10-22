/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion } from "motion/react";

interface AnimatedCheckmarkProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  variant?: "blue" | "emerald" | "white";
  showRipple?: boolean;
}

const sizeMap = {
  sm: {
    container: "w-8 h-8",
    svg: "w-8 h-8",
    stroke: 3
  },
  md: {
    container: "w-12 h-12",
    svg: "w-12 h-12",
    stroke: 3.5
  },
  lg: {
    container: "w-16 h-16",
    svg: "w-16 h-16",
    stroke: 4
  },
  xl: {
    container: "w-20 h-20",
    svg: "w-20 h-20",
    stroke: 4.5
  }
};

const variantStyles = {
  blue: {
    bg: "bg-[#eff6ff]",
    border: "border-[#bfdbfe]",
    circleStroke: "#1d4ed8",
    checkStroke: "#1d4ed8",
    ripple: "border-[#3b82f6]/40"
  },
  emerald: {
    bg: "bg-[#ecfdf5]",
    border: "border-[#a7f3d0]",
    circleStroke: "#10b981",
    checkStroke: "#059669",
    ripple: "border-[#10b981]/40"
  },
  white: {
    bg: "bg-white/10",
    border: "border-white/30",
    circleStroke: "#ffffff",
    checkStroke: "#ffffff",
    ripple: "border-white/30"
  }
};

export default function AnimatedCheckmark({
  size = "md",
  className = "",
  variant = "blue",
  showRipple = true
}: AnimatedCheckmarkProps) {
  const currentSize = sizeMap[size];
  const currentVariant = variantStyles[variant];

  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      {/* Subtle expanding ping/ripple ring for immediate tactile confirmation */}
      {showRipple && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0.85 }}
          animate={{ scale: 1.55, opacity: 0 }}
          transition={{
            duration: 0.75,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.1
          }}
          className={`absolute inset-0 rounded-full border-2 ${currentVariant.ripple} pointer-events-none`}
        />
      )}

      {/* Main Container with spring scale */}
      <motion.div
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 340,
          damping: 22,
          mass: 0.8
        }}
        className={`relative ${currentSize.container} rounded-full flex items-center justify-center ${currentVariant.bg} border ${currentVariant.border} shadow-sm overflow-hidden`}
      >
        <svg
          viewBox="0 0 52 52"
          className={currentSize.svg}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle outer circle trace */}
          <motion.circle
            cx="26"
            cy="26"
            r="23"
            stroke={currentVariant.circleStroke}
            strokeWidth={currentSize.stroke - 1}
            strokeOpacity={0.25}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 0.35,
              ease: "easeOut"
            }}
          />

          {/* Foreground checkmark drawing path */}
          <motion.path
            d="M14 27 L22.5 35.5 L38 18"
            stroke={currentVariant.checkStroke}
            strokeWidth={currentSize.stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              duration: 0.42,
              delay: 0.18,
              ease: [0.65, 0, 0.35, 1]
            }}
          />
        </svg>
      </motion.div>
    </div>
  );
}
