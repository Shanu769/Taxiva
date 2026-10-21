import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Camera, RefreshCw, Check, X, FileText, Sliders, Image as ImageIcon, ShieldCheck, Download, UploadCloud, AlertCircle } from "lucide-react";
import { jsPDF } from "jspdf";

interface CameraScannerProps {
  onDocumentScanned: (fileObj: { name: string; url: string; size: string; category: string }) => void;
  onClose: () => void;
}

export default function CameraDocumentScanner({ onDocumentScanned, onClose }: CameraScannerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [docName, setDocName] = useState("Tax_Document_Scan_" + new Date().toISOString().slice(0, 10));
  const [docCategory, setDocCategory] = useState("Income Documents (W-2, 1099)");
  const [filterMode, setFilterMode] = useState<"bw" | "color" | "contrast">("contrast");
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    setCameraError(null);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 1920 }, height: { ideal: 1080 } },
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
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Apply document contrast enhancement filter
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    if (filterMode === "bw" || filterMode === "contrast") {
      for (let i = 0; i < data.length; i += 4) {
        let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        if (filterMode === "contrast") {
          avg = avg > 120 ? Math.min(255, avg * 1.15) : Math.max(0, avg * 0.85);
        } else if (filterMode === "bw") {
          avg = avg > 128 ? 255 : 0;
        }
        data[i] = avg;
        data[i + 1] = avg;
        data[i + 2] = avg;
      }
      ctx.putImageData(imageData, 0, 0);
    }

    const dataUrl = canvas.toDataURL("image/jpeg", 0.92);
    setCapturedImage(dataUrl);
    stopCamera();
  };

  const handleRetake = () => {
    setCapturedImage(null);
    startCamera();
  };

  const handleSaveAndUpload = async () => {
    if (!capturedImage) return;
    setIsProcessing(true);

    try {
      // Generate PDF from scanned image using jsPDF
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(capturedImage);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(capturedImage, "JPEG", 0, 0, pdfWidth, Math.min(pdfHeight, pdf.internal.pageSize.getHeight()));
      const pdfDataUrl = pdf.output("datauristring");

      const scannedObj = {
        name: docName.endsWith(".pdf") ? docName : `${docName}.pdf`,
        url: pdfDataUrl,
        size: `${Math.round(pdfDataUrl.length / 1024)} KB`,
        category: docCategory,
      };

      onDocumentScanned(scannedObj);
      setIsProcessing(false);
      onClose();
    } catch (err) {
      console.error("PDF creation failed:", err);
      // Fallback to image data url
      onDocumentScanned({
        name: `${docName}.jpg`,
        url: capturedImage,
        size: "1.2 MB",
        category: docCategory,
      });
      setIsProcessing(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-blue-950/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-400 text-blue-950 rounded-xl flex items-center justify-center font-black">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold italic">Camera Tax Document Scanner</h3>
              <p className="text-xs text-blue-200">Scan paper documents & convert directly to PDF Vault</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 text-blue-200 hover:text-white rounded-xl">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viewfinder or Capture Preview */}
        <div className="flex-1 bg-black relative flex items-center justify-center overflow-hidden min-h-[320px]">
          {!capturedImage ? (
            cameraError ? (
              <div className="p-8 text-center text-white space-y-3 max-w-md">
                <AlertCircle className="w-12 h-12 text-red-400 mx-auto" />
                <p className="text-sm font-bold text-red-200">{cameraError}</p>
                <button
                  onClick={startCamera}
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-500"
                >
                  Retry Camera
                </button>
              </div>
            ) : (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
                {/* Document Frame Guide Overlay */}
                <div className="absolute inset-8 border-2 border-dashed border-amber-400/80 rounded-2xl pointer-events-none flex items-center justify-center">
                  <div className="bg-black/40 text-amber-300 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider backdrop-blur-xs">
                    Align Tax Document Inside Frame
                  </div>
                </div>
              </>
            )
          ) : (
            <div className="w-full h-full flex items-center justify-center p-4 bg-gray-900">
              <img
                src={capturedImage}
                alt="Scanned Tax Document"
                className="max-h-full max-w-full rounded-lg shadow-2xl border border-gray-700 object-contain"
              />
            </div>
          )}

          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Controls Footer */}
        <div className="p-5 bg-gray-50 border-t border-gray-200 space-y-4 shrink-0 text-left">
          {!capturedImage ? (
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-600">Scan Filter:</span>
                {(["contrast", "bw", "color"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilterMode(f)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold uppercase transition-all ${
                      filterMode === f ? "bg-blue-900 text-white" : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              <button
                onClick={capturePhoto}
                disabled={!!cameraError}
                className="px-6 py-3 bg-amber-400 text-blue-950 font-black text-xs rounded-2xl hover:bg-amber-300 transition-all flex items-center gap-2 shadow-lg active:scale-95 disabled:opacity-50"
              >
                <Camera className="w-4 h-4" /> Snap & Scan Document
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1">
                    Document Title
                  </label>
                  <input
                    type="text"
                    value={docName}
                    onChange={(e) => setDocName(e.target.value)}
                    className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-xs font-extrabold text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1">
                    Vault Category
                  </label>
                  <select
                    value={docCategory}
                    onChange={(e) => setDocCategory(e.target.value)}
                    className="w-full p-2.5 bg-white border border-gray-200 rounded-xl text-xs font-extrabold text-gray-900"
                  >
                    <option value="Income Documents (W-2, 1099)">Income Documents (W-2, 1099)</option>
                    <option value="Deductions & Receipts">Deductions & Receipts</option>
                    <option value="Identity & Tax ID">Identity & Tax ID</option>
                    <option value="Prior Year Returns">Prior Year Returns</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  onClick={handleRetake}
                  className="px-4 py-2.5 bg-gray-200 text-gray-800 font-bold text-xs rounded-xl hover:bg-gray-300 transition-all flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Retake Photo
                </button>

                <button
                  onClick={handleSaveAndUpload}
                  disabled={isProcessing}
                  className="px-6 py-2.5 bg-blue-900 text-white font-black text-xs rounded-xl hover:bg-blue-800 transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
                >
                  <UploadCloud className="w-4 h-4 text-amber-300" /> Save PDF to Secure Vault
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
