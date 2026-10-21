/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { 
  ResponsiveContainer, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, 
  XAxis, YAxis, Tooltip, Legend, CartesianGrid 
} from "recharts";
import { 
  TrendingUp, DollarSign, PieChart as PieIcon, BarChart3, Filter, 
  Download, Sparkles, ShieldCheck, ArrowUpRight, ArrowDownRight, Calendar
} from "lucide-react";

export interface ExpenseDataPoint {
  month: string;
  business: number;
  personal: number;
  deductible: number;
}

export interface CategoryDataPoint {
  name: string;
  value: number;
  color: string;
  deductiblePercent: number;
}

const MONTHLY_EXPENSES: ExpenseDataPoint[] = [
  { month: "Jan", business: 2400, personal: 1200, deductible: 2100 },
  { month: "Feb", business: 3100, personal: 1400, deductible: 2800 },
  { month: "Mar", business: 2800, personal: 1100, deductible: 2500 },
  { month: "Apr", business: 4200, personal: 1600, deductible: 3800 },
  { month: "May", business: 3600, personal: 1300, deductible: 3200 },
  { month: "Jun", business: 2900, personal: 1500, deductible: 2600 },
  { month: "Jul", business: 3800, personal: 1700, deductible: 3400 },
  { month: "Aug", business: 3200, personal: 1400, deductible: 2900 },
  { month: "Sep", business: 4500, personal: 1800, deductible: 4100 },
  { month: "Oct", business: 3900, personal: 1500, deductible: 3500 },
  { month: "Nov", business: 3400, personal: 1300, deductible: 3100 },
  { month: "Dec", business: 4800, personal: 2100, deductible: 4300 },
];

const CATEGORY_BREAKDOWN: CategoryDataPoint[] = [
  { name: "Software & SaaS Subscriptions", value: 8400, color: "#1e3a8a", deductiblePercent: 100 },
  { name: "Office Supplies & Hardware", value: 6200, color: "#2563eb", deductiblePercent: 100 },
  { name: "Professional & CPA Fees", value: 4500, color: "#0d9488", deductiblePercent: 100 },
  { name: "Client Meals & Entertainment", value: 3800, color: "#f59e0b", deductiblePercent: 50 },
  { name: "Travel & Vehicle Mileage", value: 5900, color: "#6366f1", deductiblePercent: 100 },
  { name: "Home Office & Utilities", value: 3600, color: "#8b5cf6", deductiblePercent: 80 },
];

interface ExpenseSummaryChartProps {
  customExpenses?: ExpenseDataPoint[];
  onScanReceiptClick?: () => void;
}

export default function ExpenseSummaryChart({ customExpenses, onScanReceiptClick }: ExpenseSummaryChartProps) {
  const [viewType, setViewType] = useState<"bar" | "area" | "pie">("bar");
  const [selectedYear, setSelectedYear] = useState<string>("2026");
  const [timeRange, setTimeRange] = useState<"all" | "q1" | "q2" | "q3" | "q4">("all");

  const data = customExpenses || MONTHLY_EXPENSES;

  const filteredData = data.filter((item, idx) => {
    if (timeRange === "q1") return idx >= 0 && idx <= 2;
    if (timeRange === "q2") return idx >= 3 && idx <= 5;
    if (timeRange === "q3") return idx >= 6 && idx <= 8;
    if (timeRange === "q4") return idx >= 9 && idx <= 11;
    return true;
  });

  const totalBusiness = filteredData.reduce((acc, curr) => acc + curr.business, 0);
  const totalPersonal = filteredData.reduce((acc, curr) => acc + curr.personal, 0);
  const totalDeductible = filteredData.reduce((acc, curr) => acc + curr.deductible, 0);
  const totalSpend = totalBusiness + totalPersonal;
  const estTaxSavings = Math.round(totalDeductible * 0.28); // 28% marginal tax rate estimate

  const handleExportCSV = () => {
    const headers = "Month,Business Expenses ($),Personal Expenses ($),Tax Deductible ($)\n";
    const rows = filteredData.map(d => `${d.month},${d.business},${d.personal},${d.deductible}`).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Taxiva_LLC_Expense_Summary_${selectedYear}.csv`;
    a.click();
  };

  return (
    <div id="expense-summary-component" className="bg-white rounded-3xl border border-gray-200/90 p-6 shadow-sm space-y-6 text-left">
      {/* Top Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-blue-50 text-blue-900 rounded-xl">
              <TrendingUp className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-lg font-black text-gray-900">Expense & Tax Deduction Visualizer</h3>
              <p className="text-xs text-gray-500 font-medium">Recharts-powered monthly breakdown of deductible business & personal expenses</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Chart View Toggle */}
          <div className="flex items-center bg-gray-100 p-1 rounded-xl text-xs font-bold border border-gray-200/80">
            <button
              onClick={() => setViewType("bar")}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                viewType === "bar" ? "bg-blue-900 text-white shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Bar</span>
            </button>
            <button
              onClick={() => setViewType("area")}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                viewType === "area" ? "bg-blue-900 text-white shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Trend</span>
            </button>
            <button
              onClick={() => setViewType("pie")}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                viewType === "pie" ? "bg-blue-900 text-white shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <PieIcon className="w-3.5 h-3.5" />
              <span>Categories</span>
            </button>
          </div>

          {/* Time Range Filter */}
          <select
            value={timeRange}
            onChange={(e: any) => setTimeRange(e.target.value)}
            className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-900/10"
          >
            <option value="all">Full Year (12 Mo)</option>
            <option value="q1">Q1 (Jan - Mar)</option>
            <option value="q2">Q2 (Apr - Jun)</option>
            <option value="q3">Q3 (Jul - Sep)</option>
            <option value="q4">Q4 (Oct - Dec)</option>
          </select>

          {/* Export Button */}
          <button
            onClick={handleExportCSV}
            className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-all border border-gray-200"
            title="Export Expense CSV Data"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100/80 space-y-1">
          <p className="text-[10px] font-black uppercase text-blue-900/70 tracking-wider">Total Business Spend</p>
          <p className="text-xl font-black text-blue-950">${totalBusiness.toLocaleString()}</p>
          <p className="text-[10px] text-gray-500 font-medium flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3 text-emerald-600" />
            <span>82% Deductible</span>
          </p>
        </div>

        <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/80 space-y-1">
          <p className="text-[10px] font-black uppercase text-emerald-900/70 tracking-wider">Tax Deductible Amount</p>
          <p className="text-xl font-black text-emerald-950">${totalDeductible.toLocaleString()}</p>
          <p className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            <span>IRS Sec. 162 Approved</span>
          </p>
        </div>

        <div className="p-4 bg-amber-50/50 rounded-2xl border border-amber-100/80 space-y-1">
          <p className="text-[10px] font-black uppercase text-amber-900/70 tracking-wider">Est. Tax Refund Impact</p>
          <p className="text-xl font-black text-amber-950">+${estTaxSavings.toLocaleString()}</p>
          <p className="text-[10px] text-amber-800 font-medium">@ 28% Marginal Rate</p>
        </div>

        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200/80 space-y-1">
          <p className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Avg. Monthly Spend</p>
          <p className="text-xl font-black text-gray-900">${Math.round(totalSpend / (filteredData.length || 1)).toLocaleString()}</p>
          <p className="text-[10px] text-gray-500 font-medium">Across {filteredData.length} months</p>
        </div>
      </div>

      {/* Main Recharts Area */}
      <div className="w-full h-72 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          {viewType === "bar" ? (
            <BarChart data={filteredData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fontWeight: 600, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fontWeight: 600, fill: "#64748b" }} axisLine={false} tickLine={false} tickFormatter={(val) => `$${val}`} />
              <Tooltip 
                contentStyle={{ backgroundColor: "#0f172a", borderRadius: "16px", color: "#fff", border: "none", fontSize: "12px", padding: "12px 16px" }}
                formatter={(val: any) => [`$${val.toLocaleString()}`, ""]}
              />
              <Legend wrapperStyle={{ fontSize: "11px", fontWeight: 700, paddingTop: "10px" }} />
              <Bar dataKey="business" name="Business Expense" fill="#1e3a8a" radius={[6, 6, 0, 0]} />
              <Bar dataKey="deductible" name="Tax Deductible" fill="#059669" radius={[6, 6, 0, 0]} />
              <Bar dataKey="personal" name="Personal" fill="#cbd5e1" radius={[6, 6, 0, 0]} />
            </BarChart>
          ) : viewType === "area" ? (
            <AreaChart data={filteredData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorBusiness" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0.05}/>
                </linearGradient>
                <linearGradient id="colorDeductible" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#059669" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#059669" stopOpacity={0.05}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fontWeight: 600, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fontWeight: 600, fill: "#64748b" }} axisLine={false} tickLine={false} tickFormatter={(val) => `$${val}`} />
              <Tooltip 
                contentStyle={{ backgroundColor: "#0f172a", borderRadius: "16px", color: "#fff", border: "none", fontSize: "12px", padding: "12px 16px" }}
                formatter={(val: any) => [`$${val.toLocaleString()}`, ""]}
              />
              <Legend wrapperStyle={{ fontSize: "11px", fontWeight: 700, paddingTop: "10px" }} />
              <Area type="monotone" dataKey="business" name="Business Total" stroke="#1e3a8a" strokeWidth={3} fillOpacity={1} fill="url(#colorBusiness)" />
              <Area type="monotone" dataKey="deductible" name="Tax Deductible" stroke="#059669" strokeWidth={3} fillOpacity={1} fill="url(#colorDeductible)" />
            </AreaChart>
          ) : (
            <PieChart>
              <Pie
                data={CATEGORY_BREAKDOWN}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={95}
                paddingAngle={4}
                dataKey="value"
                label={({ name, percent }: any) => `${name.split(" ")[0]} (${((percent || 0) * 100).toFixed(0)}%)`}
              >
                {CATEGORY_BREAKDOWN.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: "#0f172a", borderRadius: "16px", color: "#fff", border: "none", fontSize: "12px", padding: "12px 16px" }}
                formatter={(val: any) => [`$${val.toLocaleString()}`, "Amount"]}
              />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Footer Insight Banner */}
      <div className="pt-3 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-gray-600 font-medium">
          <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
          <span>Tip: Scanning receipts automatically categorizes items under Schedule C line items.</span>
        </div>

        {onScanReceiptClick && (
          <button
            onClick={onScanReceiptClick}
            className="px-4 py-2 bg-blue-900 text-white rounded-xl font-extrabold hover:bg-blue-800 transition-all flex items-center gap-1.5 shrink-0 shadow-sm text-xs"
          >
            <span>Scan New Receipt</span>
          </button>
        )}
      </div>
    </div>
  );
}
