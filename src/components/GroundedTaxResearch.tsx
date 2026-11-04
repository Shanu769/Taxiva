/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import {
  Search,
  Globe,
  ExternalLink,
  Loader2,
  Sparkles,
  ArrowRight,
  FileText,
  CheckCircle2,
  BookOpen,
  HelpCircle,
  X
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";

interface GroundedSource {
  title: string;
  uri: string;
}

interface ResearchResult {
  query: string;
  answer: string;
  sources: GroundedSource[];
  searchQueries?: string[];
}

export default function GroundedTaxResearch() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ResearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sampleQueries = [
    "2026 standard deduction rates for all filing statuses",
    "2025 EV clean vehicle tax credit requirements",
    "Form 1099-K reporting threshold and IRS updates",
    "FBAR foreign account filing deadline and penalties",
    "Foreign earned income exclusion (FEIE) limit"
  ];

  const handleSearch = async (targetQuery?: string) => {
    const q = (targetQuery || query).trim();
    if (!q || isLoading) return;

    if (targetQuery) {
      setQuery(targetQuery);
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/tax-research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || "Unable to retrieve tax research at this time.");
      }

      setResult({
        query: q,
        answer: data.answer || "No information returned.",
        sources: Array.isArray(data.sources) ? data.sources : [],
        searchQueries: Array.isArray(data.searchQueries) ? data.searchQueries : [],
      });
    } catch (err: any) {
      console.error("Grounded tax research error:", err);
      setError(err.message || "Failed to connect to Google Search Grounding service.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border-2 border-blue-200/90 p-6 sm:p-8 shadow-lg shadow-blue-900/5 mb-16 overflow-hidden relative">
      {/* Decorative top-right badge */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-100">
        <div>
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-900 border border-blue-200 px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>Google Search Grounded AI Intelligence</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 font-display">
            Live IRS & Tax Law Intelligence
          </h2>
          <p className="text-sm text-gray-600 mt-1 font-medium">
            Ask any question on IRS regulations, 2025/2026 tax law changes, credits, and foreign asset rules with real-time web search verification.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-2xl">
          <Globe className="w-4 h-4 text-blue-600" />
          <div className="text-left">
            <div className="text-[10px] font-black uppercase tracking-wider text-gray-400">Model & Grounding</div>
            <div className="text-xs font-bold text-gray-800">gemini-3.8-flash + Google Search</div>
          </div>
        </div>
      </div>

      {/* Search Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
        className="relative flex flex-col sm:flex-row gap-2 mb-4"
      >
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="E.g., What are the 2026 standard deduction amounts for single and married filing jointly?"
            className="w-full pl-12 pr-10 py-3.5 bg-gray-50 hover:bg-gray-100/70 focus:bg-white rounded-2xl border border-gray-200 focus:border-blue-900 focus:ring-2 focus:ring-blue-900/10 text-sm font-semibold text-gray-900 outline-none transition-all placeholder:text-gray-400"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <button
          type="submit"
          disabled={!query.trim() || isLoading}
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-900 hover:bg-blue-800 disabled:opacity-50 text-white font-extrabold text-sm rounded-2xl shadow-md transition-all active:scale-95 cursor-pointer shrink-0"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Searching Web...</span>
            </>
          ) : (
            <>
              <span>Verify with Search</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Suggested Query Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar mb-6">
        <span className="text-[11px] font-bold text-gray-400 shrink-0">Popular Topics:</span>
        {sampleQueries.map((sample) => (
          <button
            key={sample}
            type="button"
            onClick={() => handleSearch(sample)}
            className="text-[11px] font-bold text-blue-900 bg-blue-50/80 hover:bg-blue-100 border border-blue-200/60 px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors shrink-0"
          >
            {sample}
          </button>
        ))}
      </div>

      {/* Loading state visual indicator */}
      {isLoading && (
        <div className="bg-slate-50 border border-blue-100 rounded-2xl p-8 text-center animate-pulse space-y-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mx-auto text-blue-900">
            <Globe className="w-5 h-5 animate-spin" />
          </div>
          <h4 className="font-bold text-sm text-gray-900">Consulting Real-Time Google Search & IRS Data...</h4>
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            Retrieving published tax rulings, official revenue procedures, and state statutes with gemini-3.8-flash search grounding.
          </p>
        </div>
      )}

      {/* Error Message */}
      {error && !isLoading && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-red-800 text-xs sm:text-sm font-medium flex items-start gap-3">
          <HelpCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <div>
            <div className="font-bold text-red-900">Search Grounding Service Notice</div>
            <div>{error}</div>
            <div className="mt-1 text-xs text-red-700">
              For personalized tax review, please reach out to our team at info@taxiva.co or call +1 737-381-2330.
            </div>
          </div>
        </div>
      )}

      {/* Results View */}
      {result && !isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-50/70 border border-blue-100 rounded-2xl p-6 sm:p-7 space-y-5"
        >
          {/* Header of result */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-gray-200/80">
            <div>
              <div className="text-[11px] font-black uppercase tracking-wider text-blue-800">Inquiry</div>
              <h3 className="text-base sm:text-lg font-extrabold text-gray-900">"{result.query}"</h3>
            </div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl shrink-0 self-start sm:self-center">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Google Search Grounded</span>
            </div>
          </div>

          {/* Formatted Markdown Answer */}
          <div className="prose prose-sm sm:prose-base max-w-none prose-blue text-gray-800 leading-relaxed">
            <ReactMarkdown>{result.answer}</ReactMarkdown>
          </div>

          {/* Verified Web Citations from Grounding */}
          {result.sources.length > 0 && (
            <div className="pt-4 border-t border-gray-200/80">
              <div className="flex items-center gap-2 mb-3 text-xs font-black uppercase tracking-wider text-gray-700">
                <Globe className="w-4 h-4 text-blue-600" />
                <span>Verified Sources Cited by Google Search ({result.sources.length})</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {result.sources.map((source, idx) => {
                  let hostname = "";
                  try {
                    hostname = new URL(source.uri).hostname.replace("www.", "");
                  } catch {
                    hostname = "web source";
                  }

                  return (
                    <a
                      key={idx}
                      href={source.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white hover:bg-blue-50/60 rounded-xl border border-gray-200/80 hover:border-blue-300 transition-all flex items-start justify-between gap-2 shadow-2xs group"
                    >
                      <div className="min-w-0">
                        <div className="text-[10px] font-mono text-blue-700 truncate font-bold">{hostname}</div>
                        <div className="text-xs font-bold text-gray-900 line-clamp-1 group-hover:text-blue-900 transition-colors">
                          {source.title || hostname}
                        </div>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-600 shrink-0 mt-0.5" />
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {/* Search Queries badge */}
          {result.searchQueries && result.searchQueries.length > 0 && (
            <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium">
              <span className="font-bold">Search telemetry:</span>
              {result.searchQueries.map((q, idx) => (
                <span key={idx} className="bg-gray-200/70 px-2 py-0.5 rounded text-[10px] text-gray-700 font-mono">
                  {q}
                </span>
              ))}
            </div>
          )}

          {/* Call to action card */}
          <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-xl p-4 text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
            <div className="text-center sm:text-left">
              <div className="font-extrabold text-sm">Need help applying this rule to your taxes?</div>
              <div className="text-xs text-blue-200">Our Austin, Texas CPA team can review your specific documents.</div>
            </div>
            <Link
              to="/get-started"
              className="px-4 py-2 bg-white text-blue-900 hover:bg-blue-50 font-black text-xs rounded-xl shadow-xs transition-transform active:scale-95 shrink-0"
            >
              Get Expert CPA Assistance
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}
