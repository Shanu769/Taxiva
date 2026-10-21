/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";

interface LogoAnimationProps {
  size?: "sm" | "md" | "lg";
  variant?: "header" | "hero" | "footer";
  className?: string;
}

export default function LogoAnimation({
  size = "md",
  variant = "header",
  className,
}: LogoAnimationProps) {
  const dimensions = {
    sm: "w-9 h-9 rounded-xl",
    md: "w-11 h-11 rounded-xl",
    lg: "w-28 h-28 sm:w-32 sm:h-32 rounded-3xl",
  }[size];

  const textSize = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-6xl sm:text-7xl",
  }[size];

  const isLightOnDark = variant === "hero" || variant === "footer";

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center select-none [perspective:900px]",
        className
      )}
    >
      {/* Subtle Transparent 3D Ambient Halo */}
      <motion.div
        animate={{
          scale: [0.94, 1.06, 0.94],
          opacity: [0.35, 0.65, 0.35],
        }}
        transition={{
          duration: 3.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={cn(
          "absolute inset-0 rounded-full blur-md pointer-events-none",
          isLightOnDark ? "bg-[#60a5fa]/25" : "bg-[#1d4ed8]/15"
        )}
      />

      {/* 3D Stylized Transparent Motion Container */}
      <motion.div
        animate={{
          rotateY: [-14, 14, -14],
          rotateX: [8, -8, 8],
          rotateZ: [-1.5, 1.5, -1.5],
          y: size === "lg" ? [-6, 6, -6] : [-1.5, 1.5, -1.5],
        }}
        transition={{
          duration: 4.6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{
          scale: 1.08,
          rotateY: 0,
          rotateX: 0,
        }}
        className={cn(
          "relative flex items-center justify-center backdrop-blur-md [transform-style:preserve-3d] transition-shadow",
          dimensions,
          isLightOnDark
            ? "bg-white/10 border border-white/35 shadow-[0_18px_40px_rgba(15,23,42,0.45),inset_0_1px_8px_rgba(255,255,255,0.4)]"
            : "bg-transparent border border-[#1d4ed8]/30 shadow-[0_8px_22px_rgba(29,78,216,0.16),inset_0_1px_4px_rgba(255,255,255,0.85)]"
        )}
      >
        {/* Inner Specular Glass Rim */}
        <div
          className={cn(
            "absolute inset-1 rounded-lg pointer-events-none border",
            size === "lg" && "inset-2.5 rounded-2xl",
            isLightOnDark
              ? "border-white/20 bg-gradient-to-br from-white/15 via-transparent to-[#60a5fa]/15"
              : "border-[#1d4ed8]/15 bg-gradient-to-br from-white/50 via-transparent to-[#dbeafe]/30"
          )}
        />

        {/* 3D Extruded Back Layer (Deep Navy Depth Shadow) */}
        <span
          aria-hidden="true"
          className={cn(
            "absolute font-black tracking-tight select-none",
            textSize,
            isLightOnDark ? "text-[#0f172a]/75" : "text-[#0f172a]/20"
          )}
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontStyle: "italic",
            transform:
              size === "lg"
                ? "translateZ(-14px) translate(5px, 6px)"
                : "translateZ(-6px) translate(2px, 2px)",
          }}
        >
          T
        </span>

        {/* 3D Extruded Mid Layer (Cobalt Blue Bevel) */}
        <span
          aria-hidden="true"
          className={cn(
            "absolute font-black tracking-tight select-none",
            textSize,
            isLightOnDark ? "text-[#60a5fa]/85" : "text-[#2563eb]/45"
          )}
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontStyle: "italic",
            transform:
              size === "lg"
                ? "translateZ(-7px) translate(2.5px, 3px)"
                : "translateZ(-3px) translate(1px, 1px)",
          }}
        >
          T
        </span>

        {/* 3D Extruded Front Specular 'T' Character */}
        <span
          className={cn(
            "relative font-black tracking-tight bg-clip-text text-transparent select-none",
            textSize,
            isLightOnDark
              ? "bg-gradient-to-b from-white via-[#f8fafc] to-[#93c5fd] drop-shadow-[0_4px_12px_rgba(29,78,216,0.5)]"
              : "bg-gradient-to-br from-[#0f172a] via-[#1d4ed8] to-[#2563eb] drop-shadow-[0_2px_4px_rgba(29,78,216,0.22)]"
          )}
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontStyle: "italic",
            transform: size === "lg" ? "translateZ(10px)" : "translateZ(4px)",
          }}
        >
          T
        </span>
      </motion.div>
    </div>
  );
}
