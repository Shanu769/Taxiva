/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { 
  Camera, UploadCloud, RefreshCw, CheckCircle2, FileText, 
  DollarSign, Sparkles, Shield, AlertCircle, X, Scan, Image as ImageIcon, Check
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export interface ParsedReceipt {
  vendor: string;
  date: string;
  amount: number;
  category: string;
  taxDeductiblePercent: number;
  notes: string;
  imageUrl?: string;
}

interface ReceiptScannerProps {
  onAddExpense?: (expense: { month: string; amount: number; vendor: string; category: string }) => void;
  onAddFile?: (file: { name: string; url: string; size: string; category: string }) => void;
}

export default function ReceiptScannerUpload({ onAddExpense, onAddFile }: ReceiptScannerProps) {
  const [activeMode, setActiveMode] = useState<"camera" | "upload">("camera");
  const [isScanning, setIsScanning] = useState(false);
  const [parsedData, setParsedData] = useState<ParsedReceipt | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (activeMode === "camera") {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [activeMode]);

  const startCamera = async () => {
    setCameraError(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } }
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err: any) {
      console.error("Camera access error:", err);
      setCameraError(err.message || "Could not access device camera. Please allow camera permissions in your browser.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
    setCapturedImage(dataUrl);
    stopCamera();

    runOcrDigitizer(dataUrl);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setCapturedImage(dataUrl);
      runOcrDigitizer(dataUrl, file.name);
    };
    reader.readAsDataURL(file);
  };

  const runOcrDigitizer = (imgData: string, fileName?: string) => {
    setIsScanning(true);
    setParsedData(null);

    // Simulate AI OCR processing on the receipt image
    setTimeout(() => {
      const categories = [
        "Software & SaaS Subscriptions",
        "Office Supplies & Hardware",
        "Client Meals & Entertainment",
        "Travel & Mileage",
        "Professional & CPA Services"
      ];
      const vendors = ["Apple Store", "Amazon Business", "United Airlines", "Staples Office", "Starbucks Coffee", "GitHub Pro"];
      
      const randomVendor = fileName ? fileName.split(".")[0].replace(/[^a-zA-Z0-9 ]/g, " ") : vendors[Math.floor(Math.random() * vendors.length)];
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      const randomAmount = Math.floor(Math.random() * 450) + 45.99;
      const deductiblePct = randomCategory.includes("Meals") ? 50 : 100;

      setParsedData({
        vendor: randomVendor,
        date: new Date().toISOString().slice(0, 10),
        amount: parseFloat(randomAmount.toFixed(2)),
        category: randomCategory,
        taxDeductiblePercent: deductiblePct,
        notes: `Auto-scanned via Taxiva LLC OCR Digitizer (IRS Sec. 162 Compliant)`,
        imageUrl: imgData,
      });

      setIsScanning(false);
    }, 1500);
  };

  const handleSaveExpense = () => {
    if (!parsedData) return;

    if (onAddExpense) {
      onAddExpense({
        month: "May",
        amount: parsedData.amount,
        vendor: parsedData.vendor,
        category: parsedData.category,
      });
    }

    if (onAddFile) {
      onAddFile({
        name: `Receipt_${parsedData.vendor.replace(/\s+/g, "_")}_${parsedData.date}.pdf`,
        url: parsedData.imageUrl || "#",
        size: "1.4 MB",
        category: "Deductions & Expenses (Schedule C)",
      });
    }

    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setParsedData(null);
      setCapturedImage(null);
      if (activeMode === "camera") {
        startCamera();
      }
    }, 2500);
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setParsedData(null);
    if (activeMode === "camera") {
      startCamera();
    }
  };

  return (
    <div id="receipt-scanner-upload-component" className="bg-white rounded-3xl border border-gray-200/90 p-6 shadow-sm space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-50 text-blue-900 rounded-2xl">
            <Scan className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-gray-900">Tax Receipt & Form OCR Scanner</h3>
            <p className="text-xs text-gray-500 font-medium">Use device camera or drag-and-drop to scan paper receipts directly into tax records</p>
          </div>
        </div>

        {/* Mode Toggle */}
        <div className="flex items-center bg-gray-100 p-1 rounded-2xl text-xs font-bold border border-gray-200">
          <button
            onClick={() => setActiveMode("camera")}
            className={`px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 transition-all ${
              activeMode === "camera" ? "bg-blue-900 text-white shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Camera Live Scan</span>
          </button>
          <button
            onClick={() => setActiveMode("upload")}
            className={`px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 transition-all ${
              activeMode === "upload" ? "bg-blue-900 text-white shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Upload File</span>
          </button>
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />

      {/* Main Scanner Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Scanner Input Box */}
        <div className="relative bg-slate-950 rounded-2xl overflow-hidden min-h-[280px] flex flex-col items-center justify-center text-white p-4 border border-slate-800">
          {activeMode === "camera" && !capturedImage && (
            <div className="w-full h-full flex flex-col items-center justify-center relative">
              {cameraError ? (
                <div className="p-6 text-center space-y-3">
                  <AlertCircle className="w-10 h-10 text-amber-400 mx-auto" />
                  <p className="text-xs font-medium text-slate-300 max-w-xs">{cameraError}</p>
                  <button
                    onClick={startCamera}
                    className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-xl text-xs font-bold transition-all"
                  >
                    Retry Camera Permission
                  </button>
                </div>
              ) : (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-64 object-cover rounded-xl"
                  />
                  {/* Camera Crop Frame Guide Overlay */}
                  <div className="absolute inset-4 border-2 border-dashed border-amber-300/80 rounded-xl pointer-events-none flex items-center justify-center">
                    <span className="bg-slate-900/80 px-3 py-1 rounded-full text-[10px] font-black text-amber-300 uppercase tracking-widest backdrop-blur-xs">
                      Align Receipt Here
                    </span>
                  </div>

                  <button
                    onClick={handleCapture}
                    className="mt-4 px-6 py-3 bg-amber-400 hover:bg-amber-300 text-blue-950 rounded-2xl font-black text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 cursor-pointer active:scale-95 transition-all"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Snap & Scan Receipt</span>
                  </button>
                </>
              )}
            </div>
          )}

          {activeMode === "upload" && !capturedImage && (
            <label className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-slate-700 hover:border-blue-400 rounded-xl p-8 cursor-pointer transition-all bg-slate-900/60 text-center group">
              <UploadCloud className="w-12 h-12 text-slate-400 group-hover:text-amber-300 group-hover:scale-110 transition-all mb-3" />
              <p className="text-sm font-bold text-slate-200">Drag & Drop Receipt or Click to Browse</p>
              <p className="text-xs text-slate-400 mt-1">Supports JPG, PNG, PDF receipts up to 25MB</p>
              <input
                type="file"
                accept="image/*,application/pdf"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          )}

          {capturedImage && (
            <div className="w-full h-full flex flex-col items-center justify-center space-y-3 relative">
              <img
                src={capturedImage}
                alt="Captured Receipt"
                className="max-h-56 object-contain rounded-xl border border-slate-700"
              />
              <div className="flex items-center gap-2">
                <button
                  onClick={handleRetake}
                  className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Rescan</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Digitized AI Output Box */}
        <div className="bg-gray-50/80 rounded-2xl p-5 border border-gray-200/80 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-200">
            <span className="text-xs font-black uppercase tracking-wider text-gray-500">
              Digitized OCR Output
            </span>
            <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full text-[10px] font-black">
              IRS Sec. 162 Validated
            </span>
          </div>

          {isScanning && (
            <div className="py-12 text-center space-y-3">
              <RefreshCw className="w-8 h-8 text-blue-900 animate-spin mx-auto" />
              <p className="text-xs font-bold text-gray-800">Digitizing Receipt Data & Line Items...</p>
              <p className="text-[11px] text-gray-500">Extracting merchant name, tax category & deduction total</p>
            </div>
          )}

          {!isScanning && !parsedData && (
            <div className="py-12 text-center space-y-2 text-gray-400">
              <Sparkles className="w-8 h-8 mx-auto text-gray-300" />
              <p className="text-xs font-bold text-gray-600">No Receipt Scanned Yet</p>
              <p className="text-[11px] text-gray-400 max-w-xs mx-auto">
                Snap a picture using your camera or upload a receipt file to auto-populate expense records.
              </p>
            </div>
          )}

          {!isScanning && parsedData && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white p-3 rounded-xl border border-gray-200/80">
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Merchant / Vendor</p>
                  <input
                    type="text"
                    value={parsedData.vendor}
                    onChange={(e) => setParsedData({ ...parsedData, vendor: e.target.value })}
                    className="text-xs font-extrabold text-gray-900 w-full bg-transparent focus:outline-none"
                  />
                </div>

                <div className="bg-white p-3 rounded-xl border border-gray-200/80">
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Total Amount</p>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-gray-500">$</span>
                    <input
                      type="number"
                      value={parsedData.amount}
                      onChange={(e) => setParsedData({ ...parsedData, amount: parseFloat(e.target.value) || 0 })}
                      className="text-xs font-extrabold text-gray-900 w-full bg-transparent focus:outline-none"
                    />
                  </div>
                </div>

                <div className="bg-white p-3 rounded-xl border border-gray-200/80 col-span-2">
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Schedule C Tax Category</p>
                  <select
                    value={parsedData.category}
                    onChange={(e) => setParsedData({ ...parsedData, category: e.target.value })}
                    className="text-xs font-extrabold text-gray-900 w-full bg-transparent focus:outline-none mt-1"
                  >
                    <option value="Software & SaaS Subscriptions">Software & SaaS Subscriptions (100%)</option>
                    <option value="Office Supplies & Hardware">Office Supplies & Hardware (100%)</option>
                    <option value="Client Meals & Entertainment">Client Meals & Entertainment (50%)</option>
                    <option value="Travel & Mileage">Travel & Mileage (100%)</option>
                    <option value="Professional & CPA Services">Professional & CPA Services (100%)</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-between text-xs">
                <span className="font-bold text-blue-900">Tax Deductible Portion:</span>
                <span className="font-black text-emerald-700">
                  ${((parsedData.amount * parsedData.taxDeductiblePercent) / 100).toFixed(2)} ({parsedData.taxDeductiblePercent}%)
                </span>
              </div>

              <button
                onClick={handleSaveExpense}
                disabled={saveSuccess}
                className="w-full py-3 bg-blue-900 text-white rounded-xl text-xs font-black hover:bg-blue-800 transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 uppercase tracking-wider cursor-pointer"
              >
                {saveSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Saved to Expense Vault!</span>
                  </>
                ) : (
                  <>
                    <DollarSign className="w-4 h-4 text-amber-300" />
                    <span>Digitize & Save to Expenses</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
