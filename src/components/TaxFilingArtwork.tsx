/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo } from "react";

export type TaxArtworkVariant =
  | "hero-cpa-advisory"
  | "individual-1040"
  | "business-1120s"
  | "fbar-fincen114"
  | "nri-dtaa-1116"
  | "irs-refund-portal";

interface TaxFilingArtworkProps {
  variant: TaxArtworkVariant;
  alt: string;
  className?: string;
}

/**
 * Generates a high-DPI procedural data URL image so every<img> tag has a guaranteed
 * zero-404, crisp visual asset with referrerPolicy="no-referrer".
 */
function renderArtworkDataUrl(variant: TaxArtworkVariant): string {
  if (typeof document === "undefined") return "";
  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 750;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  const configs: Record<
    TaxArtworkVariant,
    {
      bgStart: string;
      bgEnd: string;
      accent: string;
      secondary: string;
      badge: string;
      formCode: string;
      headline: string;
      subline: string;
      stats: Array<{ label: string; val: string }>;
    }
  > = {
    "hero-cpa-advisory": {
      bgStart: "#070e1c",
      bgEnd: "#172554",
      accent: "#fbbf24",
      secondary: "#38bdf8",
      badge: "IRS AUTHORIZED E-FILE • CPA LINE-BY-LINE REVIEW",
      formCode: "FORM 1040 • 1120-S • FBAR",
      headline: "Taxiva LLC Precision Tax Filing Studio",
      subline: "Federal • All 50 States • Business Entities • US-India Cross-Border",
      stats: [
        { label: "Federal & State Accuracy", val: "99.98% Audit-Ready" },
        { label: "RSU & Capital Gains", val: "Schedule D / 8949 Verified" },
        { label: "Foreign Tax Credit", val: "Form 1116 + FinCEN 114" }
      ]
    },
    "individual-1040": {
      bgStart: "#09152b",
      bgEnd: "#1e3a8a",
      accent: "#fbbf24",
      secondary: "#60a5fa",
      badge: "INDIVIDUAL & MULTI-STATE TAX PREPARATION",
      formCode: "IRS FORM 1040",
      headline: "W-2, 1099, RSU Stock Basis & Rental Properties",
      subline: "Complete Schedule A, C, D, E & Part-Year State Residency Allocation",
      stats: [
        { label: "Stock Compensation", val: "RSU / ESPP / ISO Basis" },
        { label: "Real Estate & Rentals", val: "Schedule E Depreciation" },
        { label: "Multi-State Nexus", val: "50-State Apportionment" }
      ]
    },
    "business-1120s": {
      bgStart: "#081c24",
      bgEnd: "#0f374a",
      accent: "#38bdf8",
      secondary: "#fbbf24",
      badge: "CORPORATE & SMALL BUSINESS TAX FILING",
      formCode: "FORM 1120-S & 1065",
      headline: "LLC, S-Corporation, Partnership & C-Corp Returns",
      subline: "Schedule K-1 Distributions • Sec. 199A QBI • Officer Payroll Strategy",
      stats: [
        { label: "Entity Structures", val: "LLC • S-Corp • Partnership" },
        { label: "Pass-Through Deduction", val: "20% Sec. 199A QBI" },
        { label: "Asset Write-Offs", val: "Sec. 179 & Bonus Depr." }
      ]
    },
    "fbar-fincen114": {
      bgStart: "#061e1a",
      bgEnd: "#0f3d35",
      accent: "#34d399",
      secondary: "#fbbf24",
      badge: "INTERNATIONAL ASSET & BANK DISCLOSURE",
      formCode: "FinCEN FORM 114",
      headline: "FBAR, FATCA Form 8938 & Foreign Trust Reporting",
      subline: "Official U.S. Treasury Exchange Rates • NRE / NRO / FCNR Compliance",
      stats: [
        { label: "Aggregate Threshold", val: "$10,000+ FBAR Rule" },
        { label: "Specified Foreign Assets", val: "IRS Form 8938 FATCA" },
        { label: "Mutual Funds & Trusts", val: "Form 8621 & Form 3520" }
      ]
    },
    "nri-dtaa-1116": {
      bgStart: "#1a1207",
      bgEnd: "#3b250d",
      accent: "#f59e0b",
      secondary: "#38bdf8",
      badge: "CROSS-BORDER US-INDIA TAX ADVISORY",
      formCode: "FORM 1116 & ITR-2",
      headline: "Indian Tax Filing & US-India DTAA Treaty Relief",
      subline: "Zero Double Taxation • Capital Gains • Repatriation & Form 67",
      stats: [
        { label: "Treaty Protection", val: "US-India DTAA Credits" },
        { label: "Indian Tax Returns", val: "ITR-2 & ITR-3 E-Filing" },
        { label: "Property Sale Advisory", val: "TDS & Capital Gains" }
      ]
    },
    "irs-refund-portal": {
      bgStart: "#090f1d",
      bgEnd: "#1e293b",
      accent: "#10b981",
      secondary: "#60a5fa",
      badge: "ENCRYPTED CANOPY PORTAL & IRS DIRECT TRACKING",
      formCode: "FORM 8879 E-FILE",
      headline: "Real-Time Federal & State Refund Status Hub",
      subline: "AES-256 Document Vault • E-Signature Authorization • Direct Deposit",
      stats: [
        { label: "Document Security", val: "AES-256-GCM Encrypted" },
        { label: "E-File Authorization", val: "Instant IRS Form 8879" },
        { label: "Refund Tracking", val: "Federal & All 50 States" }
      ]
    }
  };

  const cfg = configs[variant];

  // Background gradient
  const grad = ctx.createLinearGradient(0, 0, 1200, 750);
  grad.addColorStop(0, cfg.bgStart);
  grad.addColorStop(1, cfg.bgEnd);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1200, 750);

  // Subtle architectural perspective grid
  ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
  ctx.lineWidth = 1.5;
  for (let x = 0; x <= 1200; x += 60) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 750);
    ctx.stroke();
  }
  for (let y = 0; y <= 750; y += 60) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1200, y);
    ctx.stroke();
  }

  // Ambient glowing orb on right
  const orb = ctx.createRadialGradient(920, 280, 20, 920, 280, 360);
  orb.addColorStop(0, `${cfg.accent}44`);
  orb.addColorStop(0.5, `${cfg.secondary}18`);
  orb.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = orb;
  ctx.fillRect(0, 0, 1200, 750);

  // 3D Isometric-style Tax Document Card Stack on Right Side
  ctx.save();
  ctx.translate(700, 95);

  // Back shadow card
  ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
  ctx.strokeStyle = "rgba(148, 163, 184, 0.25)";
  ctx.lineWidth = 3;
  ctx.fillRect(45, 35, 390, 490);
  ctx.strokeRect(45, 35, 390, 490);

  // Foreground primary 3D Folio Sheet
  ctx.fillStyle = "#0f172a";
  ctx.strokeStyle = cfg.accent;
  ctx.lineWidth = 4;
  ctx.fillRect(0, 0, 390, 490);
  ctx.strokeRect(0, 0, 390, 490);

  // Folio Header Strip
  ctx.fillStyle = cfg.accent;
  ctx.fillRect(24, 24, 342, 68);
  ctx.fillStyle = "#090d16";
  ctx.font = "900 28px monospace";
  ctx.fillText(cfg.formCode, 42, 68);

  // Simulated Tax Return Schedule Bars & Analytics Chart
  for (let i = 0; i < 6; i++) {
    const rowY = 130 + i * 44;
    ctx.fillStyle = "rgba(255,255,255,0.06)";
    ctx.fillRect(28, rowY, 334, 30);

    ctx.fillStyle = i % 2 === 0 ? cfg.accent : cfg.secondary;
    ctx.fillRect(36, rowY + 8, 95 + ((i * 47) % 130), 14);

    ctx.fillStyle = "#e2e8f0";
    ctx.font = "700 15px monospace";
    ctx.fillText(`LINE ${10 + i * 4}`, 280, rowY + 20);
  }

  // Stamp Seal on Folio
  ctx.beginPath();
  ctx.arc(305, 425, 38, 0, Math.PI * 2);
  ctx.fillStyle = `${cfg.accent}22`;
  ctx.fill();
  ctx.strokeStyle = cfg.accent;
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.fillStyle = cfg.accent;
  ctx.font = "900 13px sans-serif";
  ctx.fillText("CPA", 290, 422);
  ctx.fillText("VERIFIED", 274, 438);
  ctx.restore();

  // Left Column Typography & Metric Cards
  ctx.fillStyle = `${cfg.accent}22`;
  ctx.strokeStyle = cfg.accent;
  ctx.lineWidth = 2;
  ctx.fillRect(64, 78, 540, 42);
  ctx.strokeRect(64, 78, 540, 42);

  ctx.fillStyle = cfg.accent;
  ctx.font = "800 16px monospace";
  ctx.fillText(cfg.badge, 82, 105);

  ctx.fillStyle = "#ffffff";
  ctx.font = "900 40px sans-serif";
  ctx.fillText(cfg.headline.slice(0, 32), 64, 185);
  if (cfg.headline.length > 32) {
    ctx.fillText(cfg.headline.slice(32), 64, 235);
  }

  ctx.fillStyle = "#cbd5e1";
  ctx.font = "600 21px sans-serif";
  ctx.fillText(cfg.subline, 64, 285);

  // 3 Metric Boxes on Left
  cfg.stats.forEach((st, idx) => {
    const boxY = 335 + idx * 96;
    ctx.fillStyle = "rgba(15, 23, 42, 0.88)";
    ctx.strokeStyle = "rgba(148, 163, 184, 0.3)";
    ctx.lineWidth = 2;
    ctx.fillRect(64, boxY, 560, 78);
    ctx.strokeRect(64, boxY, 560, 78);

    // Left accent bar
    ctx.fillStyle = idx % 2 === 0 ? cfg.accent : cfg.secondary;
    ctx.fillRect(64, boxY, 8, 78);

    ctx.fillStyle = "#94a3b8";
    ctx.font = "700 15px uppercase sans-serif";
    ctx.fillText(st.label, 92, boxY + 30);

    ctx.fillStyle = "#f8fafc";
    ctx.font = "800 23px monospace";
    ctx.fillText(st.val, 92, boxY + 60);
  });

  return canvas.toDataURL("image/png");
}

export default function TaxFilingArtwork({
  variant,
  alt,
  className = "w-full h-full object-cover"
}: TaxFilingArtworkProps) {
  const dataUrl = useMemo(() => renderArtworkDataUrl(variant), [variant]);

  return (
    <img
      src={dataUrl}
      alt={alt}
      className={className}
      referrerPolicy="no-referrer"
    />
  );
}
