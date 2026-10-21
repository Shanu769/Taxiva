import React, { useState } from "react";
import { motion } from "motion/react";
import { DollarSign, Calculator, HelpCircle, ArrowRight, ShieldCheck, PieChart as PieIcon, CheckCircle2, RefreshCw, AlertCircle, Printer } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";

export default function TaxEstimator() {
  const [filingStatus, setFilingStatus] = useState<"single" | "married" | "head">("single");
  const [w2Income, setW2Income] = useState<number>(85000);
  const [selfEmploymentIncome, setSelfEmploymentIncome] = useState<number>(20000);
  const [businessExpenses, setBusinessExpenses] = useState<number>(4500);
  const [retirement401k, setRetirement401k] = useState<number>(6000);
  const [hsaContribution, setHsaContribution] = useState<number>(2500);
  const [deductionType, setDeductionType] = useState<"standard" | "itemized">("standard");
  const [customItemizedDeductions, setCustomItemizedDeductions] = useState<number>(18000);
  const [stateTaxRate, setStateTaxRate] = useState<number>(4.5); // % state tax estimate

  // 2025 Standard Deductions
  const standardDeductionMap = {
    single: 15000,
    married: 30000,
    head: 22500,
  };

  const netSEIncome = Math.max(0, selfEmploymentIncome - businessExpenses);
  const seTax = netSEIncome * 0.9235 * 0.153; // 15.3% SE tax on 92.35% net profit
  const seTaxDeduction = seTax * 0.5;

  const totalGrossIncome = w2Income + netSEIncome;
  const agi = Math.max(0, totalGrossIncome - retirement401k - hsaContribution - seTaxDeduction);

  const appliedDeduction = deductionType === "standard" 
    ? standardDeductionMap[filingStatus] 
    : Math.max(standardDeductionMap[filingStatus], customItemizedDeductions);

  const taxableIncome = Math.max(0, agi - appliedDeduction);

  // Approximate 2025 Federal Brackets
  const calculateFederalTax = (income: number, status: "single" | "married" | "head") => {
    let tax = 0;
    const brackets = status === "married" 
      ? [
          { threshold: 23850, rate: 0.10 },
          { threshold: 96950, rate: 0.12 },
          { threshold: 206700, rate: 0.22 },
          { threshold: 394600, rate: 0.24 },
          { threshold: 501050, rate: 0.32 },
          { threshold: 751600, rate: 0.35 },
          { threshold: Infinity, rate: 0.37 },
        ]
      : status === "head"
      ? [
          { threshold: 17000, rate: 0.10 },
          { threshold: 64850, rate: 0.12 },
          { threshold: 103350, rate: 0.22 },
          { threshold: 197300, rate: 0.24 },
          { threshold: 250500, rate: 0.32 },
          { threshold: 626350, rate: 0.35 },
          { threshold: Infinity, rate: 0.37 },
        ]
      : [
          { threshold: 11925, rate: 0.10 },
          { threshold: 48475, rate: 0.12 },
          { threshold: 103350, rate: 0.22 },
          { threshold: 197300, rate: 0.24 },
          { threshold: 250500, rate: 0.32 },
          { threshold: 626350, rate: 0.35 },
          { threshold: Infinity, rate: 0.37 },
        ];

    let prevThreshold = 0;
    for (const b of brackets) {
      if (income > b.threshold) {
        tax += (b.threshold - prevThreshold) * b.rate;
        prevThreshold = b.threshold;
      } else {
        tax += (income - prevThreshold) * b.rate;
        break;
      }
    }
    return tax;
  };

  const estimatedFederalTax = calculateFederalTax(taxableIncome, filingStatus);
  const estimatedStateTax = taxableIncome * (stateTaxRate / 100);
  const totalTaxLiability = estimatedFederalTax + seTax + estimatedStateTax;

  const netTakeHome = Math.max(0, totalGrossIncome - totalTaxLiability);
  const effectiveTaxRate = totalGrossIncome > 0 ? (totalTaxLiability / totalGrossIncome) * 100 : 0;
  const taxSavingsFromDeductions = appliedDeduction * 0.22 + (retirement401k + hsaContribution + businessExpenses) * 0.22;

  const chartPieData = [
    { name: "Net Take-Home", value: Math.round(netTakeHome), color: "#10B981" },
    { name: "Federal Income Tax", value: Math.round(estimatedFederalTax), color: "#1E3A8A" },
    { name: "Self-Employment Tax", value: Math.round(seTax), color: "#F59E0B" },
    { name: "State Income Tax", value: Math.round(estimatedStateTax), color: "#6366F1" },
  ];

  const barComparisonData = [
    {
      name: "Income & Taxes",
      "Gross Income": totalGrossIncome,
      "Taxable Income": taxableIncome,
      "Total Tax": totalTaxLiability,
    },
  ];

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-xl p-6 sm:p-8 text-left space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <div>
          <span className="bg-blue-100 text-blue-900 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1.5 mb-2">
            <Calculator className="w-3.5 h-3.5" /> 2025 - 2026 Tax Estimator
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 italic">
            Interactive Tax Liability Estimator
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm font-medium mt-1">
            Calculate estimated federal income tax, self-employment tax, state liability, and total deductions.
          </p>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 shrink-0 flex items-center gap-3 text-emerald-950">
          <ShieldCheck className="w-8 h-8 text-emerald-600 shrink-0" />
          <div>
            <p className="text-xs font-black">IRS 2025 Inflation Adjusted</p>
            <p className="text-[11px] text-emerald-800 font-medium">Includes standard deduction & SE rules</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Input Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Filing Status selection */}
          <div className="space-y-2">
            <label className="block text-xs font-black text-gray-700 uppercase tracking-wider">
              1. Filing Status
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "single", label: "Single" },
                { id: "married", label: "Married Joint" },
                { id: "head", label: "Head of Household" },
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setFilingStatus(s.id as any)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-extrabold transition-all border ${
                    filingStatus === s.id
                      ? "bg-blue-900 text-white border-blue-900 shadow-md"
                      : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Income Sources */}
          <div className="bg-gray-50/80 p-5 rounded-2xl border border-gray-200 space-y-4">
            <h4 className="text-xs font-black text-blue-900 uppercase tracking-widest flex items-center gap-2">
              <DollarSign className="w-4 h-4" /> 2. Income Figures
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-600 mb-1">
                  W-2 Wage / Salary ($)
                </label>
                <input
                  type="number"
                  value={w2Income === 0 ? 0 : w2Income || ""}
                  onChange={(e) => setW2Income(e.target.value === "" ? 0 : Number(e.target.value))}
                  className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-xs font-extrabold text-gray-900 focus:ring-2 focus:ring-blue-900/10"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-600 mb-1">
                  1099 / Freelance / Business Gross ($)
                </label>
                <input
                  type="number"
                  value={selfEmploymentIncome === 0 ? 0 : selfEmploymentIncome || ""}
                  onChange={(e) => setSelfEmploymentIncome(e.target.value === "" ? 0 : Number(e.target.value))}
                  className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-xs font-extrabold text-gray-900 focus:ring-2 focus:ring-blue-900/10"
                />
              </div>
            </div>
          </div>

          {/* Above the line & deductions */}
          <div className="bg-gray-50/80 p-5 rounded-2xl border border-gray-200 space-y-4">
            <h4 className="text-xs font-black text-blue-900 uppercase tracking-widest flex items-center gap-2">
              <Calculator className="w-4 h-4" /> 3. Deductions & Retirement
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-600 mb-1">
                  1099 Business Expenses ($)
                </label>
                <input
                  type="number"
                  value={businessExpenses === 0 ? 0 : businessExpenses || ""}
                  onChange={(e) => setBusinessExpenses(e.target.value === "" ? 0 : Number(e.target.value))}
                  className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-xs font-extrabold text-gray-900 focus:ring-2 focus:ring-blue-900/10"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-600 mb-1">
                  401(k) / Traditional IRA ($)
                </label>
                <input
                  type="number"
                  value={retirement401k === 0 ? 0 : retirement401k || ""}
                  onChange={(e) => setRetirement401k(e.target.value === "" ? 0 : Number(e.target.value))}
                  className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-xs font-extrabold text-gray-900 focus:ring-2 focus:ring-blue-900/10"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-600 mb-1">
                  HSA / FSA Contributions ($)
                </label>
                <input
                  type="number"
                  value={hsaContribution === 0 ? 0 : hsaContribution || ""}
                  onChange={(e) => setHsaContribution(e.target.value === "" ? 0 : Number(e.target.value))}
                  className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-xs font-extrabold text-gray-900 focus:ring-2 focus:ring-blue-900/10"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-600 mb-1">
                  Est. State Tax Rate (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={stateTaxRate === 0 ? 0 : stateTaxRate || ""}
                  onChange={(e) => setStateTaxRate(e.target.value === "" ? 0 : Number(e.target.value))}
                  className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-xs font-extrabold text-gray-900 focus:ring-2 focus:ring-blue-900/10"
                />
              </div>
            </div>

            {/* Deduction Strategy Toggle */}
            <div className="pt-2 border-t border-gray-200/60">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-black text-gray-700">Deduction Method</span>
                <span className="text-[11px] text-gray-500 font-semibold">
                  Standard for {filingStatus}: <strong className="text-blue-900">${standardDeductionMap[filingStatus].toLocaleString()}</strong>
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setDeductionType("standard")}
                  className={`p-2.5 rounded-xl text-xs font-bold transition-all border ${
                    deductionType === "standard"
                      ? "bg-blue-900 text-white border-blue-900"
                      : "bg-white text-gray-700 border-gray-200"
                  }`}
                >
                  Standard Deduction (${standardDeductionMap[filingStatus].toLocaleString()})
                </button>
                <button
                  onClick={() => setDeductionType("itemized")}
                  className={`p-2.5 rounded-xl text-xs font-bold transition-all border ${
                    deductionType === "itemized"
                      ? "bg-blue-900 text-white border-blue-900"
                      : "bg-white text-gray-700 border-gray-200"
                  }`}
                >
                  Custom Itemized
                </button>
              </div>

              {deductionType === "itemized" && (
                <div className="mt-3">
                  <label className="block text-[11px] font-bold text-gray-600 mb-1">
                    Itemized Deductions Total (SALT, Mortgage, Charity, etc.) ($)
                  </label>
                  <input
                    type="number"
                    value={customItemizedDeductions === 0 ? 0 : customItemizedDeductions || ""}
                    onChange={(e) => setCustomItemizedDeductions(e.target.value === "" ? 0 : Number(e.target.value))}
                    className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-xs font-extrabold text-gray-900"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Output Column with Recharts */}
        <div className="lg:col-span-5 space-y-6">
          {/* Summary Box */}
          <div className="bg-gradient-to-br from-blue-950 via-slate-900 to-blue-900 text-white rounded-3xl p-6 shadow-xl border border-blue-800/50 space-y-4">
            <div className="flex items-center justify-between border-b border-blue-800/80 pb-3">
              <span className="text-xs font-bold text-blue-200 uppercase tracking-wider">Estimated Total Tax</span>
              <span className="bg-amber-400 text-blue-950 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase">
                Eff. Rate: {effectiveTaxRate.toFixed(1)}%
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-amber-300">
                ${Math.round(totalTaxLiability).toLocaleString()}
              </span>
              <span className="text-xs text-blue-200 font-medium">/ year</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs pt-2">
              <div className="bg-white/10 p-3 rounded-2xl border border-white/10">
                <p className="text-[10px] text-blue-200 font-semibold">Net Take-Home</p>
                <p className="text-sm font-black text-emerald-400">${Math.round(netTakeHome).toLocaleString()}</p>
              </div>
              <div className="bg-white/10 p-3 rounded-2xl border border-white/10">
                <p className="text-[10px] text-blue-200 font-semibold">Est. Tax Savings</p>
                <p className="text-sm font-black text-amber-300">${Math.round(taxSavingsFromDeductions).toLocaleString()}</p>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-blue-100 font-medium pt-2 border-t border-blue-800/60">
              <div className="flex justify-between">
                <span>Federal Income Tax:</span>
                <span className="font-bold">${Math.round(estimatedFederalTax).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Self-Employment Tax:</span>
                <span className="font-bold">${Math.round(seTax).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>State Tax ({stateTaxRate}%):</span>
                <span className="font-bold">${Math.round(estimatedStateTax).toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => window.print()}
                className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-blue-950 font-black rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 uppercase tracking-wider"
              >
                <Printer className="w-4 h-4" />
                Print Tax Estimate Breakdown
              </button>
            </div>
          </div>

          {/* Recharts Breakdown */}
          <div className="bg-gray-50/80 p-5 rounded-2xl border border-gray-200 space-y-3">
            <h4 className="text-xs font-black text-gray-900 uppercase tracking-widest flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-blue-900" /> Income & Tax Distribution
            </h4>

            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {chartPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: any) => [`$${Number(value).toLocaleString()}`, "Amount"]}
                    contentStyle={{ borderRadius: "12px", fontSize: "11px", fontWeight: "bold" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[10px] font-extrabold text-gray-600">
              {chartPieData.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="truncate">{item.name}: ${item.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
