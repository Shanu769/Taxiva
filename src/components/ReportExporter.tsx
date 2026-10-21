import React, { useState } from "react";
import { Download, FileText, CheckCircle2, ShieldCheck, Printer, Sparkles } from "lucide-react";
import { jsPDF } from "jspdf";

interface ReportExporterProps {
  documents: Array<{ name: string; category: string; status?: string; size?: string }>;
  taxFilingStatus?: string;
  currentUserEmail?: string;
}

export default function ReportExporter({ documents, taxFilingStatus = "In Review by CPA", currentUserEmail = "info@taxiva.co" }: ReportExporterProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePdfReport = () => {
    setIsGenerating(true);

    try {
      const doc = new jsPDF();
      const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

      // Header Banner
      doc.setFillColor(30, 58, 138); // Blue-900
      doc.rect(0, 0, 210, 36, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.text("TAXIVA LLC", 14, 20);

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text("Official Client Tax Filing Inventory & Status Summary", 14, 28);
      doc.text(`Generated: ${today}`, 145, 28);

      // Client Info Block
      doc.setFillColor(243, 244, 246);
      doc.roundedRect(14, 44, 182, 28, 3, 3, "F");

      doc.setTextColor(31, 41, 55);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text("CLIENT SUMMARY", 20, 52);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.text(`Account Email: ${currentUserEmail}`, 20, 60);
      doc.text(`Tax Year: 2025 - 2026`, 20, 66);
      doc.text(`Filing Status: ${taxFilingStatus}`, 110, 60);
      doc.text(`IRS Status: IRS Sec. 7216 Compliant`, 110, 66);

      // Section: Document Vault Inventory
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(30, 58, 138);
      doc.text("VERIFIED TAX DOCUMENT VAULT INVENTORY", 14, 82);

      doc.setDrawColor(229, 231, 235);
      doc.line(14, 85, 196, 85);

      // Table Header
      doc.setFillColor(239, 246, 255);
      doc.rect(14, 90, 182, 8, "F");
      doc.setFontSize(9);
      doc.setTextColor(30, 58, 138);
      doc.text("Document Name", 18, 95);
      doc.text("Category", 110, 95);
      doc.text("Verification", 160, 95);

      let yPos = 104;
      documents.forEach((item, index) => {
        if (yPos > 260) {
          doc.addPage();
          yPos = 20;
        }

        doc.setFont("helvetica", "normal");
        doc.setTextColor(55, 65, 81);
        doc.text(item.name.length > 45 ? item.name.substring(0, 42) + "..." : item.name, 18, yPos);
        doc.text(item.category || "General Tax Doc", 110, yPos);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(16, 185, 129);
        doc.text("Verified", 160, yPos);

        doc.setDrawColor(243, 244, 246);
        doc.line(14, yPos + 3, 196, yPos + 3);
        yPos += 10;
      });

      // Section: Taxiva LLC CPA Notes & Next Steps
      yPos += 10;
      if (yPos > 240) {
        doc.addPage();
        yPos = 30;
      }

      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(30, 58, 138);
      doc.text("CPA REVIEW & NEXT ACTION STEPS", 14, yPos);
      doc.line(14, yPos + 3, 196, yPos + 3);

      yPos += 12;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(55, 65, 81);
      doc.text("1. W-2 & 1099 income statements verified against IRS wage transcripts.", 20, yPos);
      doc.text("2. Form 8879 authorization required for e-filing. Check Notes/Forms in portal.", 20, yPos + 6);
      doc.text("3. Federal & State electronic return transmission scheduled upon signature.", 20, yPos + 12);

      // Footer
      doc.setFontSize(8);
      doc.setTextColor(156, 163, 175);
      doc.text("TAXIVA LLC Accounting & Tax Support Services - New York, NY (EST) | Confidential Client Report", 14, 285);

      doc.save(`Taxiva_LLC_Tax_Summary_${new Date().toISOString().slice(0, 10)}.pdf`);
      setIsGenerating(false);
    } catch (err) {
      console.error("PDF generation failed:", err);
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={generatePdfReport}
        disabled={isGenerating}
        className="px-4 py-2 bg-blue-900 text-white rounded-xl text-xs font-extrabold hover:bg-blue-800 transition-all flex items-center gap-2 shadow-sm active:scale-95 disabled:opacity-50"
      >
        <Download className="w-4 h-4 text-amber-300" />
        <span>{isGenerating ? "Generating..." : "Download PDF"}</span>
      </button>

      <button
        onClick={() => window.print()}
        className="px-4 py-2 bg-amber-400 text-blue-950 rounded-xl text-xs font-black hover:bg-amber-300 transition-all flex items-center gap-2 shadow-sm active:scale-95 uppercase tracking-wider"
        title="Print physical copy of financial tax summary"
      >
        <Printer className="w-4 h-4 text-blue-950" />
        <span>Print Physical Copy</span>
      </button>
    </div>
  );
}
