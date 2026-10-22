/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { cn } from "../lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

/**
 * Base animated skeleton shimmer element
 */
export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-slate-200/80 dark:bg-slate-800/80",
        "after:absolute after:inset-0 after:-translate-x-full after:animate-[shimmer_1.6s_infinite] after:bg-gradient-to-r after:from-transparent after:via-white/30 after:to-transparent",
        className
      )}
      {...props}
    />
  );
}

/**
 * Skeleton Loader for Pricing plans & tables
 */
export function PricingSkeleton() {
  return (
    <div className="w-full space-y-10 animate-fade-in py-6">
      {/* Tab Switcher Skeleton */}
      <div className="max-w-2xl mx-auto flex items-center justify-center">
        <div className="w-full max-w-md h-12 bg-slate-200 rounded-2xl p-1.5 flex gap-2">
          <Skeleton className="h-full flex-1 rounded-xl bg-white/70" />
          <Skeleton className="h-full flex-1 rounded-xl bg-slate-300/60" />
          <Skeleton className="h-full flex-1 rounded-xl bg-slate-300/60" />
        </div>
      </div>

      {/* Header Skeleton */}
      <div className="max-w-xl mx-auto text-center space-y-3">
        <Skeleton className="h-8 w-3/4 mx-auto rounded-xl" />
        <Skeleton className="h-4 w-full mx-auto rounded-lg" />
        <Skeleton className="h-4 w-2/3 mx-auto rounded-lg" />
      </div>

      {/* 4 Cards Skeleton Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-24 rounded-lg" />
                <Skeleton className="h-5 w-16 rounded-md" />
              </div>
              <Skeleton className="h-4 w-full rounded-md" />
              <div className="pt-2">
                <Skeleton className="h-10 w-28 rounded-lg" />
                <Skeleton className="h-3 w-36 rounded-md mt-2" />
              </div>
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <Skeleton className="h-3 w-4/5 rounded-md" />
                <Skeleton className="h-3 w-full rounded-md" />
                <Skeleton className="h-3 w-3/4 rounded-md" />
                <Skeleton className="h-3 w-5/6 rounded-md" />
              </div>
            </div>
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Skeleton Loader for Government Portal & Status Tracking Center
 */
export function StatusSkeleton() {
  return (
    <div className="w-full space-y-8 animate-fade-in py-4">
      {/* Live Sync Status Bar Skeleton */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Skeleton className="w-10 h-10 rounded-xl" />
          <div className="space-y-1.5 flex-1">
            <Skeleton className="h-4 w-44 rounded-md" />
            <Skeleton className="h-3 w-64 rounded-md" />
          </div>
        </div>
        <Skeleton className="h-9 w-32 rounded-xl" />
      </div>

      {/* Primary Portals Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-5"
          >
            <div className="flex items-center justify-between">
              <Skeleton className="w-11 h-11 rounded-xl" />
              <Skeleton className="h-5 w-24 rounded-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-6 w-3/4 rounded-lg" />
              <Skeleton className="h-3.5 w-full rounded-md" />
              <Skeleton className="h-3.5 w-4/5 rounded-md" />
            </div>
            <div className="pt-2">
              <Skeleton className="h-11 w-full rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Skeleton Loader for Dashboard & Client Portal
 */
export function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Navigation Bar Skeleton */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Skeleton className="h-9 w-32 rounded-xl" />
          <Skeleton className="h-5 w-28 rounded-md hidden md:block" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="w-9 h-9 rounded-full" />
          <Skeleton className="w-9 h-9 rounded-full" />
          <Skeleton className="h-9 w-24 rounded-xl" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1">
        {/* Welcome Greeting & Year Switcher Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <Skeleton className="h-7 w-64 rounded-lg" />
            <Skeleton className="h-4 w-96 max-w-full rounded-md" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-28 rounded-xl" />
            <Skeleton className="h-10 w-36 rounded-xl" />
          </div>
        </div>

        {/* Tab Switcher Skeleton */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-10 w-28 rounded-xl shrink-0" />
          ))}
        </div>

        {/* Status Metrics Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-24 rounded-md" />
                <Skeleton className="w-8 h-8 rounded-lg" />
              </div>
              <Skeleton className="h-7 w-32 rounded-lg" />
              <Skeleton className="h-3 w-40 rounded-md" />
            </div>
          ))}
        </div>

        {/* Tax Filing Progress Stage Timeline Skeleton */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between">
            <div className="space-y-1.5">
              <Skeleton className="h-5 w-48 rounded-md" />
              <Skeleton className="h-3.5 w-72 rounded-md" />
            </div>
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="p-4 rounded-xl border border-slate-100 bg-slate-50 space-y-2">
                <Skeleton className="w-7 h-7 rounded-full" />
                <Skeleton className="h-4 w-20 rounded-md" />
                <Skeleton className="h-3 w-16 rounded-md" />
              </div>
            ))}
          </div>
        </div>

        {/* Document Vault Table Skeleton */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-40 rounded-md" />
            <Skeleton className="h-9 w-32 rounded-xl" />
          </div>
          <div className="divide-y divide-slate-100">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-9 h-9 rounded-lg" />
                  <div className="space-y-1.5">
                    <Skeleton className="h-4 w-48 rounded-md" />
                    <Skeleton className="h-3 w-28 rounded-md" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-6 w-20 rounded-md" />
                  <Skeleton className="h-8 w-24 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
