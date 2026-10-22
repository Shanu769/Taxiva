/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  ChevronRight,
  ArrowLeft,
  ShieldCheck,
  Building2,
  Globe2,
  Landmark,
  FileText,
  DollarSign,
  HelpCircle,
  User,
  Settings
} from "lucide-react";
import { cn } from "../lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
  showBackButton?: boolean;
}

// Predefined route metadata for clear hierarchy & readable titles
const ROUTE_MAP: Record<string, { label: string; parent?: { label: string; href: string } }> = {
  "/about": {
    label: "About TAXIVA LLC"
  },
  "/services/individual": {
    label: "Individual Tax Filing",
    parent: { label: "Services", href: "/about#services" }
  },
  "/individual-tax": {
    label: "Individual Tax Filing",
    parent: { label: "Services", href: "/about#services" }
  },
  "/services/business": {
    label: "Business Tax Filing & NY Formation",
    parent: { label: "Services", href: "/about#services" }
  },
  "/business-tax": {
    label: "Business Tax Filing & NY Formation",
    parent: { label: "Services", href: "/about#services" }
  },
  "/services/foreign-reporting": {
    label: "FBAR & Foreign Reporting",
    parent: { label: "Services", href: "/about#services" }
  },
  "/foreign-reporting": {
    label: "FBAR & Foreign Reporting",
    parent: { label: "Services", href: "/about#services" }
  },
  "/services/indian-tax": {
    label: "Indian Tax & NRI Services",
    parent: { label: "Services", href: "/about#services" }
  },
  "/indian-tax": {
    label: "Indian Tax & NRI Services",
    parent: { label: "Services", href: "/about#services" }
  },
  "/pricing": {
    label: "Pricing & Plans"
  },
  "/tax-tools": {
    label: "Refund & Payment Center"
  },
  "/contact": {
    label: "Contact & Consultation"
  },
  "/login": {
    label: "Canopy Portal Login"
  },
  "/get-started": {
    label: "Get in Touch & Intake"
  },
  "/get-in-touch": {
    label: "Get in Touch & Intake"
  },
  "/dashboard": {
    label: "Canopy Client Dashboard"
  },
  "/settings": {
    label: "Account Settings",
    parent: { label: "Dashboard", href: "/dashboard" }
  }
};

export default function Breadcrumb({ items, className, showBackButton = true }: BreadcrumbProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  // Do not render breadcrumbs on homepage
  if (pathname === "/") {
    return null;
  }

  // Derive breadcrumbs if not explicitly passed as prop
  let breadcrumbList: BreadcrumbItem[] = [];

  if (items && items.length > 0) {
    breadcrumbList = items;
  } else {
    // Always start with Home
    breadcrumbList.push({
      label: "Home",
      href: "/",
      icon: Home
    });

    const routeInfo = ROUTE_MAP[pathname];

    if (routeInfo) {
      if (routeInfo.parent) {
        breadcrumbList.push({
          label: routeInfo.parent.label,
          href: routeInfo.parent.href
        });
      }
      breadcrumbList.push({
        label: routeInfo.label
      });
    } else {
      // Dynamic fallback for nested or unknown routes
      const segments = pathname.split("/").filter(Boolean);
      let cumulativePath = "";

      segments.forEach((seg, index) => {
        cumulativePath += `/${seg}`;
        const isLast = index === segments.length - 1;
        const formatted = seg
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

        breadcrumbList.push({
          label: formatted,
          href: isLast ? undefined : cumulativePath
        });
      });
    }
  }

  return (
    <nav
      aria-label="Breadcrumb navigation"
      className={cn(
        "w-full bg-[#f8fafc]/90 border-b border-[#e2e8f0] py-2.5 px-4 sm:px-6 lg:px-8 text-xs font-medium text-[#475569] shadow-2xs backdrop-blur-xs",
        className
      )}
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
        {/* Breadcrumb List with Schema-friendly semantics */}
        <ol className="flex items-center flex-wrap gap-1.5 sm:gap-2">
          {breadcrumbList.map((item, index) => {
            const isLast = index === breadcrumbList.length - 1;
            const ItemIcon = item.icon;

            return (
              <li key={index} className="flex items-center gap-1.5 sm:gap-2">
                {index > 0 && (
                  <ChevronRight
                    className="w-3.5 h-3.5 text-[#94a3b8] shrink-0"
                    aria-hidden="true"
                  />
                )}

                {isLast || !item.href ? (
                  <span
                    aria-current="page"
                    className="flex items-center gap-1.5 font-bold text-[#1d4ed8] bg-[#eff6ff] border border-[#bfdbfe] px-2.5 py-0.5 rounded-lg truncate max-w-[200px] sm:max-w-none"
                  >
                    {ItemIcon && <ItemIcon className="w-3.5 h-3.5 shrink-0" />}
                    <span>{item.label}</span>
                  </span>
                ) : (
                  <Link
                    to={item.href}
                    className="flex items-center gap-1.5 text-[#475569] hover:text-[#1d4ed8] hover:bg-white px-2 py-0.5 rounded-md transition-colors"
                  >
                    {ItemIcon && <ItemIcon className="w-3.5 h-3.5 shrink-0" />}
                    <span>{item.label}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ol>

        {/* Right Action: Quick Back Navigation & EST Helpline Indicator */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          {showBackButton && (
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#64748b] hover:text-[#0f172a] bg-white border border-[#cbd5e1] hover:border-[#94a3b8] px-2.5 py-1 rounded-lg transition-all cursor-pointer shadow-2xs"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Back</span>
            </button>
          )}

          <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#1d4ed8] bg-[#eff6ff] px-2.5 py-1 rounded-lg border border-[#bfdbfe]">
            <ShieldCheck className="w-3 h-3 text-[#1d4ed8]" />
            <span>New York HQ (EST)</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
