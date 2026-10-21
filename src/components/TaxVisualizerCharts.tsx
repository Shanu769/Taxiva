import React from "react";
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, DollarSign, CalendarCheck, CheckCircle2, ShieldCheck, Clock, ArrowUpRight } from "lucide-react";

export default function TaxVisualizerCharts() {
  // Historical Tax & Income Data
  const historicalData = [
    { year: "2022", grossIncome: 78000, federalTax: 11200, stateTax: 3400, netIncome: 63400 },
    { year: "2023", grossIncome: 89000, federalTax: 12900, stateTax: 3900, netIncome: 72200 },
    { year: "2024", grossIncome: 96000, federalTax: 13800, stateTax: 4200, netIncome: 78000 },
    { year: "2025 (Est)", grossIncome: 105000, federalTax: 14600, stateTax: 4500, netIncome: 85900 },
  ];

  // Quarterly Estimated Payments
  const quarterlyData = [
    { quarter: "Q1 (Apr 15)", target: 3500, paid: 3500, status: "Paid & Verified" },
    { quarter: "Q2 (Jun 16)", target: 3500, paid: 3500, status: "Paid & Verified" },
    { quarter: "Q3 (Sep 15)", target: 3500, paid: 3500, status: "Paid & Verified" },
    { quarter: "Q4 (Jan 15)", target: 3500, paid: 0, status: "Pending Due" },
  ];

  // Annual Filing Milestones
  const milestones = [
    { title: "Tax Organizer", desc: "Submitted questionnaire", done: true },
    { title: "Documents Verified", desc: "W-2 & 1099s vaulted", done: true },
    { title: "CPA Draft Prepared", desc: "Form 1040 complete", done: true },
    { title: "Form 8879 E-Sign", desc: "Signature required", done: false, active: true },
    { title: "IRS E-File Accepted", desc: "Final submission", done: false },
  ];

  const totalPaidQuarterly = quarterlyData.reduce((acc, curr) => acc + curr.paid, 0);
  const totalTargetQuarterly = quarterlyData.reduce((acc, curr) => acc + curr.target, 0);
  const quarterlyProgressPercent = Math.round((totalPaidQuarterly / totalTargetQuarterly) * 100);

  return (
    <div className="space-y-6 text-left">
      {/* 1. Milestone Filing Progress Banner */}
      <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
          <div>
            <span className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1.5 mb-1">
              <CalendarCheck className="w-3.5 h-3.5" /> 2025 Tax Season Status
            </span>
            <h3 className="text-xl font-extrabold text-gray-900 italic">
              Annual Tax Filing Readiness & Progress
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-right">
              <p className="text-[10px] text-gray-400 font-bold uppercase">Filing Completion</p>
              <p className="text-lg font-black text-blue-900">75% Complete</p>
            </div>
            <div className="w-12 h-12 bg-blue-900 rounded-2xl flex items-center justify-center text-amber-300 font-black text-sm border-2 border-amber-300 shadow-md">
              75%
            </div>
          </div>
        </div>

        {/* Milestone Steps Bar */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-2">
          {milestones.map((m, idx) => (
            <div
              key={m.title}
              className={`p-3 rounded-2xl border transition-all text-left relative ${
                m.done
                  ? "bg-emerald-50/70 border-emerald-200"
                  : m.active
                  ? "bg-amber-50 border-amber-300 ring-2 ring-amber-300/50"
                  : "bg-gray-50 border-gray-200 opacity-60"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[9px] font-black text-gray-400 uppercase">Step 0{idx + 1}</span>
                {m.done ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : m.active ? (
                  <Clock className="w-4 h-4 text-amber-600 animate-pulse shrink-0" />
                ) : (
                  <span className="w-2.5 h-2.5 rounded-full bg-gray-300 shrink-0" />
                )}
              </div>
              <h4 className="text-xs font-black text-gray-900 leading-snug">{m.title}</h4>
              <p className="text-[10px] text-gray-500 font-semibold mt-0.5">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Historical Income vs Tax Trends Chart */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-gray-200 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h4 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-900" /> Income & Tax Liability Trends (2022-2025)
              </h4>
              <p className="text-xs text-gray-500 font-medium">Gross earnings vs total tax obligations over time</p>
            </div>
            <span className="bg-emerald-100 text-emerald-900 text-[10px] font-black px-2.5 py-1 rounded-full uppercase">
              +9.3% Growth
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={historicalData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorGross" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1E3A8A" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#1E3A8A" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="colorFederal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="year" tick={{ fontSize: 11, fontWeight: "bold" }} />
                <YAxis tick={{ fontSize: 10, fontWeight: "bold" }} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip
                  formatter={(val: any) => [`$${Number(val).toLocaleString()}`, ""]}
                  contentStyle={{ borderRadius: "12px", fontSize: "11px", fontWeight: "bold" }}
                />
                <Legend wrapperStyle={{ fontSize: "11px", fontWeight: "bold", paddingTop: "8px" }} />
                <Area type="monotone" dataKey="grossIncome" name="Gross Income" stroke="#1E3A8A" fillOpacity={1} fill="url(#colorGross)" strokeWidth={2.5} />
                <Area type="monotone" dataKey="federalTax" name="Federal Tax Paid" stroke="#F59E0B" fillOpacity={1} fill="url(#colorFederal)" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quarterly Estimated Payments Tracker Chart */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-gray-200 shadow-md space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <h4 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-600" /> Quarterly Estimated Taxes
                </h4>
                <p className="text-xs text-gray-500 font-medium">IRS Form 1040-ES installment tracker</p>
              </div>
              <span className="text-xs font-black text-blue-900 bg-blue-100 px-2.5 py-1 rounded-full">
                {quarterlyProgressPercent}% Paid
              </span>
            </div>

            <div className="h-44 w-full mt-3">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={quarterlyData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                  <XAxis dataKey="quarter" tick={{ fontSize: 9, fontWeight: "bold" }} />
                  <YAxis tick={{ fontSize: 10, fontWeight: "bold" }} tickFormatter={(v) => `$${v}`} />
                  <Tooltip
                    formatter={(val: any) => [`$${Number(val).toLocaleString()}`, ""]}
                    contentStyle={{ borderRadius: "12px", fontSize: "11px", fontWeight: "bold" }}
                  />
                  <Bar dataKey="paid" name="Paid ($)" fill="#10B981" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="target" name="Target ($)" fill="#E5E7EB" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-2xl border border-gray-200 text-xs flex items-center justify-between">
            <span className="font-bold text-gray-700">Total Paid YTD:</span>
            <span className="font-black text-emerald-700 text-sm">${totalPaidQuarterly.toLocaleString()} / ${totalTargetQuarterly.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
