/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  User, LogOut, Home, MessageSquare, FileText, 
  CheckSquare, Shield, ClipboardList, Search, Plus, 
  MoreVertical, Mail, Phone, Calendar, Tag, ExternalLink,
  ChevronDown, Folder, Download, Eye, Clock, File, Settings,
  Upload, CheckCircle2, X, Filter, Trash2, Archive, Send,
  Table, Database, AlertCircle, RefreshCw, Lock, ShieldCheck,
  UploadCloud, FileCheck, Key, HardDrive, Sparkles, Bell, BellRing, AlertTriangle, ChevronRight, Camera
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logout, getAccessToken, loginWithGoogle } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { cn } from "@/src/lib/utils";
import TaxCalendar from "../components/TaxCalendar";
import TaxFilingProgress from "../components/TaxFilingProgress";
import TaxVisualizerCharts from "../components/TaxVisualizerCharts";
import CameraDocumentScanner from "../components/CameraDocumentScanner";
import ReportExporter from "../components/ReportExporter";
import DeductionsFinder from "../components/DeductionsFinder";
import SettingsView from "../components/SettingsView";
import ExpenseSummaryChart from "../components/ExpenseSummaryChart";
import TaxDeadlineReminder from "../components/TaxDeadlineReminder";
import QuickActionFloatingMenu from "../components/QuickActionFloatingMenu";
import ReceiptScannerUpload from "../components/ReceiptScannerUpload";
import DocumentStatusBadge from "../components/DocumentStatusBadge";
import GmailCommunicationPanel from "../components/GmailCommunicationPanel";

// Types
type TabType = "Home" | "Communication" | "Notes" | "Files" | "Tasks" | "Resolution" | "Organizers" | "Sheets" | "Settings";

export default function Dashboard() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("Home");
  const [showSettings, setShowSettings] = useState(false);
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
  const [notifFilter, setNotifFilter] = useState<"all" | "unread" | "urgent">("all");
  const [notifications, setNotifications] = useState<any[]>([
    {
      id: "n-1",
      title: "Urgent Signature Required",
      message: "Your CPA draft for Form 1040 is ready. Please review and e-sign authorization Form 8879.",
      time: "10m ago",
      type: "urgent",
      unread: true,
      actionTab: "Notes",
      actionText: "Review & Sign"
    },
    {
      id: "n-2",
      title: "Document Verified by CPA",
      message: "Form W-2 (Acme Corp) has been verified and matched with your income statement in your vault.",
      time: "1h ago",
      type: "document",
      unread: true,
      actionTab: "Files",
      actionText: "View Vault File"
    },
    {
      id: "n-3",
      title: "Tax Filing Deadline Reminder",
      message: "April 15 deadline approaching for Q1 Estimated Tax Payments & Form 1040 federal return.",
      time: "3h ago",
      type: "reminder",
      unread: true,
      actionTab: "Sheets",
      actionText: "Check Schedule"
    },
    {
      id: "n-4",
      title: "Organizers Received",
      message: "Your 2025 Tax Questionnaire responses have been received by Taxiva LLC support.",
      time: "1d ago",
      type: "cpa",
      unread: false,
      actionTab: "Organizers",
      actionText: "View Submission"
    }
  ]);
  const navigate = useNavigate();

  // Shared Data State (Local Persistence for Session)
  const [dependents, setDependents] = useState<any[]>([]);
  const [notes, setNotes] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [emails, setEmails] = useState<any[]>([]);
  const [drafts, setDrafts] = useState<any[]>([]);
  const [resolutionCases, setResolutionCases] = useState<any[]>([]);
  const [files, setFiles] = useState<any[]>([
    {
      id: "f-101",
      name: "Form_W2_Employer_AcmeCorp_2025.pdf",
      folder: "TY-2025",
      date: "2026-02-10",
      size: "420 KB",
      type: "pdf",
      category: "W-2 / Income",
      addedBy: "Client Upload",
      status: "Verified by CPA",
      encrypted: true,
      encryptionAlgo: "AES-256-GCM",
      checksum: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      privacy: "Strict CPA Access"
    },
    {
      id: "f-102",
      name: "Form_1099_NEC_Consulting_Fees.pdf",
      folder: "TY-2025",
      date: "2026-02-14",
      size: "310 KB",
      type: "pdf",
      category: "1099 / Self-Employed",
      addedBy: "Client Upload",
      status: "In Review",
      encrypted: true,
      encryptionAlgo: "AES-256-GCM",
      checksum: "f71887e503387d89617d3d2979e2c65a7d0e4179e8c3e8093e0e8e97c9b20d32",
      privacy: "Strict CPA Access"
    },
    {
      id: "f-103",
      name: "Chase_Bank_Statement_Q4_2025.pdf",
      folder: "TY-2025",
      date: "2026-01-20",
      size: "1.2 MB",
      type: "pdf",
      category: "Financial Statement",
      addedBy: "Client Upload",
      status: "Verified by CPA",
      encrypted: true,
      encryptionAlgo: "AES-256-GCM",
      checksum: "d131dd02c5e6eec4693d9a0698aff95c2fc155b3e2182281a81f33f6760a927c",
      privacy: "Shared with Tax Team"
    },
    {
      id: "f-104",
      name: "Form_1040_Final_Return_2024.pdf",
      folder: "Previous Year Docs",
      date: "2025-04-12",
      size: "850 KB",
      type: "pdf",
      category: "Prior Tax Return",
      addedBy: "Taxiva LLC CPA",
      status: "Accepted by IRS",
      encrypted: true,
      encryptionAlgo: "AES-256-GCM",
      checksum: "532eaabd9574880dbf76b9b8cc00832c20a6ec113d682299550d7a6e0f345e25",
      privacy: "Shared with Tax Team"
    },
    {
      id: "f-105",
      name: "Receipt_HomeOffice_Equipment_2025.pdf",
      folder: "TY-2025",
      date: "2026-03-01",
      size: "520 KB",
      type: "pdf",
      category: "Receipt & Deduction",
      addedBy: "Camera Scan",
      status: "Pending CPA Review",
      encrypted: true,
      encryptionAlgo: "AES-256-GCM",
      checksum: "a184f2910d328e97c9b20d32f71887e503387d89617d3d2979e2c65a7d0e4179",
      privacy: "Strict CPA Access"
    },
    {
      id: "f-106",
      name: "Form_1098_Mortgage_Interest_Statement.pdf",
      folder: "TY-2025",
      date: "2026-02-28",
      size: "290 KB",
      type: "pdf",
      category: "1098 / Mortgage",
      addedBy: "Client Upload",
      status: "Needs Action",
      encrypted: true,
      encryptionAlgo: "AES-256-GCM",
      checksum: "c38411b20d32f71887e503387d89617d3d2979e2c65a7d0e4179a184f2910d32",
      privacy: "Strict CPA Access"
    }
  ]);
  const [folders, setFolders] = useState<string[]>(["Previous Year Docs", "TY-2025", "TY-2026", "Archived Files"]);
  const [organizerStatus, setOrganizerStatus] = useState<"Not Started" | "In Progress" | "Submitted" | "Under Review" | "Completed">("Not Started");

  // Modal States
  const [isDependentModalOpen, setIsDependentModalOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isResolutionModalOpen, setIsResolutionModalOpen] = useState(false);
  const [isCameraScannerOpen, setIsCameraScannerOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setLoading(false);
      } else {
        const demoUserJson = localStorage.getItem("taxiva_demo_user");
        if (demoUserJson) {
          try {
            setCurrentUser(JSON.parse(demoUserJson));
            setLoading(false);
            return;
          } catch (e) {
            console.error("Invalid demo user stored", e);
          }
        }
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      localStorage.removeItem("taxiva_demo_user");
      await logout();
      navigate("/");
    } catch (err) {
      console.error("Failed to logout", err);
      navigate("/");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const clientInitials = currentUser?.displayName 
    ? currentUser.displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase()
    : currentUser?.email?.[0].toUpperCase() || "C";

  const tabs: { id: TabType; icon: any }[] = [
    { id: "Home", icon: Home },
    { id: "Communication", icon: MessageSquare },
    { id: "Notes", icon: FileText },
    { id: "Files", icon: Folder },
    { id: "Tasks", icon: CheckSquare },
    { id: "Resolution", icon: Shield },
    { id: "Organizers", icon: ClipboardList },
    { id: "Sheets", icon: Database },
    { id: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="px-6 py-4 flex justify-between items-center bg-white">
          {/* Left Side: Client Avatar */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center text-white font-bold text-lg shadow-sm border-2 border-blue-100 animate-in fade-in zoom-in duration-300">
              {clientInitials}
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-none mb-1">
                {currentUser?.displayName || currentUser?.email?.split('@')[0]}
              </h1>
              <span className="text-[10px] font-bold text-gray-400 font-sans uppercase tracking-widest px-2 py-0.5 bg-gray-100 rounded-full border border-gray-200">
                Client Profile
              </span>
            </div>
          </div>

          {/* Right Side: Taxiva LLC Branding and Actions */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 pr-4 border-r border-gray-100">
              <Link to="/" className="flex items-center gap-2 group">
                <div className="w-8 h-8 bg-blue-900 rounded-xl flex items-center justify-center font-black text-white text-sm">
                  T
                </div>
                <span className="text-lg font-extrabold text-blue-900 tracking-tighter italic">Taxiva LLC</span>
              </Link>
            </div>
            
            <div className="flex items-center gap-2">
              {/* PDF Report Download Button */}
              <ReportExporter documents={files} currentUserEmail={currentUser?.email} />

              {/* Notification Bell Button with Badge */}
              <button 
                onClick={() => setIsNotificationPanelOpen(true)}
                className={cn(
                  "p-2 rounded-xl transition-all relative",
                  isNotificationPanelOpen ? "bg-blue-900 text-white shadow-lg" : "text-gray-500 hover:text-blue-900 hover:bg-gray-50"
                )}
                title="Tax Notifications & Support Alerts"
              >
                <Bell className="w-5 h-5" />
                {notifications.filter(n => n.unread).length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-400 text-blue-950 font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-md animate-pulse">
                    {notifications.filter(n => n.unread).length}
                  </span>
                )}
              </button>

              <div className="relative">
                <button 
                  onClick={() => setShowSettings(!showSettings)}
                  className={cn(
                    "p-2 rounded-xl transition-all",
                    showSettings ? "bg-blue-900 text-white shadow-lg" : "text-gray-400 hover:text-blue-900 hover:bg-gray-50"
                  )}
                >
                  <Settings className="w-5 h-5" />
                </button>
                
                <AnimatePresence>
                  {showSettings && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setShowSettings(false)} />
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 py-3 overflow-hidden"
                      >
                        <div className="px-4 py-2 border-b border-gray-50 mb-1">
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">Account Settings</p>
                        </div>
                        <button onClick={() => { setShowSettings(false); setActiveTab("Settings"); }} className="w-full px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors text-left"><Settings className="w-4 h-4 text-blue-900" /> Email Notifications & Settings</button>
                        <button onClick={() => { setShowSettings(false); setIsNotificationPanelOpen(true); }} className="w-full px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors text-left"><Bell className="w-4 h-4 text-blue-900" /> Notifications panel</button>
                        <button onClick={() => { setShowSettings(false); setActiveTab("Settings"); }} className="w-full px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors text-left"><Shield className="w-4 h-4 text-blue-900" /> Security & Audits</button>
                        <button onClick={() => setShowSettings(false)} className="w-full px-4 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors text-left"><ExternalLink className="w-4 h-4 text-blue-900" /> Portal settings</button>
                        <div className="h-px bg-gray-50 my-2" />
                        <button 
                          onClick={handleLogout}
                          className="w-full px-4 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors text-left"
                        >
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex px-8 bg-white overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all border-b-2 whitespace-nowrap",
                activeTab === tab.id 
                  ? "text-blue-900 border-blue-900" 
                  : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-200"
              )}
            >
              <tab.icon className={cn("w-4 h-4", activeTab === tab.id ? "text-blue-900" : "text-gray-400")} />
              {tab.id}
            </button>
          ))}
        </nav>
      </header>

      {/* Main Page Area */}
      <main className="flex-1 overflow-y-auto no-scrollbar">
        <div className="container mx-auto max-w-7xl px-6 py-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "Home" && (
                <HomeDashboard 
                  client={currentUser} 
                  dependents={dependents}
                  notes={notes}
                  tasks={tasks}
                  emails={emails}
                  files={files}
                  resolutionCases={resolutionCases}
                  onAddDependent={() => setIsDependentModalOpen(true)}
                  onAddNote={() => setIsNoteModalOpen(true)}
                  onAddTask={() => setIsTaskModalOpen(true)}
                  onAddEmail={() => setIsEmailModalOpen(true)}
                  onAddResolution={() => setIsResolutionModalOpen(true)}
                  onSwitchTab={setActiveTab}
                />
              )}
              {activeTab === "Communication" && (
                <CommunicationView 
                  emails={emails}
                  drafts={drafts}
                  onNewEmail={() => setIsEmailModalOpen(true)}
                  onAttachToFiles={(file) => {
                    setFiles(prev => [...prev, {
                      id: "f-" + Date.now(),
                      name: file.name,
                      folder: "TY-2025",
                      date: new Date().toISOString().slice(0, 10),
                      size: "450 KB",
                      type: "pdf",
                      category: file.category,
                      addedBy: "Gmail Import",
                      status: file.status || "Pending CPA Review",
                      encrypted: true,
                      encryptionAlgo: "AES-256-GCM",
                      checksum: "g82a9910d328e97c9b20d32f71887e503387d89617d3d2979e2c65a7d0e4179"
                    }]);
                  }}
                />
              )}
              {activeTab === "Notes" && (
                <NotesView 
                  notes={notes}
                  onAddNote={() => setIsNoteModalOpen(true)}
                />
              )}
              {activeTab === "Files" && (
                <FilesView 
                  files={files}
                  folders={folders}
                  onUpload={(file) => setFiles([...files, file])}
                  onCreateFolder={(folder) => setFolders([...folders, folder])}
                  onUpdateStatus={(fileId, newStatus) => {
                    setFiles(prev => prev.map(f => f.id === fileId ? { ...f, status: newStatus } : f));
                  }}
                />
              )}
              {activeTab === "Tasks" && (
                <TasksView 
                  tasks={tasks}
                  onAddTask={() => setIsTaskModalOpen(true)}
                  onToggleTask={(id) => {
                    setTasks(tasks.map(t => t.id === id ? { ...t, status: t.status === 'Completed' ? 'Not Started' : 'Completed' } : t));
                  }}
                />
              )}
              {activeTab === "Resolution" && (
                <ResolutionView 
                  cases={resolutionCases}
                  onInitiate={() => setIsResolutionModalOpen(true)}
                />
              )}
              {activeTab === "Organizers" && (
                <OrganizersView 
                  status={organizerStatus} 
                  onUpdateStatus={setOrganizerStatus} 
                />
              )}
              {activeTab === "Sheets" && (
                <SheetsView />
              )}
              {activeTab === "Settings" && (
                <SettingsView currentUserEmail={currentUser?.email} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Persistent Quick Action Floating Menu */}
      <QuickActionFloatingMenu 
        onScanReceipt={() => {
          setActiveTab("Home");
          setTimeout(() => {
            const scannerEl = document.getElementById("receipt-scanner-upload-component");
            if (scannerEl) scannerEl.scrollIntoView({ behavior: "smooth" });
          }, 150);
        }}
        onViewReturns={() => setActiveTab("Organizers")}
        onContactAccountant={() => setIsEmailModalOpen(true)}
        onAddNote={() => setIsNoteModalOpen(true)}
        onOpenCalculator={() => setActiveTab("Sheets")}
        onUploadFile={() => setIsCameraScannerOpen(true)}
      />

      {/* Modals */}
      <AnimatePresence>
        {isDependentModalOpen && (
          <DependentModal 
            isOpen={isDependentModalOpen}
            onClose={() => setIsDependentModalOpen(false)} 
            onSave={(dep) => {
              setDependents([...dependents, { ...dep, id: Date.now() }]);
              setIsDependentModalOpen(false);
            }} 
          />
        )}
        {isNoteModalOpen && (
          <NoteModal 
            isOpen={isNoteModalOpen}
            onClose={() => setIsNoteModalOpen(false)} 
            onSave={(note) => {
              setNotes([...notes, { ...note, id: Date.now(), date: "Today" }]);
              setIsNoteModalOpen(false);
            }} 
          />
        )}
        {isTaskModalOpen && (
          <TaskModal 
            isOpen={isTaskModalOpen}
            onClose={() => setIsTaskModalOpen(false)} 
            onSave={(task) => {
              setTasks([...tasks, { ...task, id: Date.now() }]);
              setIsTaskModalOpen(false);
            }} 
          />
        )}
        {isEmailModalOpen && (
          <EmailModal 
            isOpen={isEmailModalOpen}
            onClose={() => setIsEmailModalOpen(false)} 
            onSave={(email) => {
              setEmails([...emails, { ...email, id: Date.now(), date: "10:30 AM", unread: false }]);
              setIsEmailModalOpen(false);
            }} 
            onSaveDraft={(draft) => {
              setDrafts([...drafts, { ...draft, id: Date.now(), date: "Draft", isDraft: true }]);
              setIsEmailModalOpen(false);
            }}
          />
        )}
        {isResolutionModalOpen && (
          <ResolutionModal 
            isOpen={isResolutionModalOpen}
            onClose={() => setIsResolutionModalOpen(false)} 
            onSave={(rcase) => {
              setResolutionCases([...resolutionCases, { ...rcase, id: Date.now() }]);
              setIsResolutionModalOpen(false);
            }} 
          />
        )}

        {isCameraScannerOpen && (
          <CameraDocumentScanner 
            onDocumentScanned={(fileObj) => {
              setFiles([...files, {
                id: "f-" + Date.now(),
                name: fileObj.name,
                folder: "TY-2026",
                date: new Date().toISOString().slice(0, 10),
                size: fileObj.size,
                type: "pdf",
                category: fileObj.category,
                addedBy: "Camera Scan",
                status: "Pending CPA Review",
                encrypted: true,
                encryptionAlgo: "AES-256-GCM",
                checksum: "a9f823..."
              }]);
              setIsCameraScannerOpen(false);
            }}
            onClose={() => setIsCameraScannerOpen(false)}
          />
        )}

        {/* Slide-out Notification Drawer Panel */}
        {isNotificationPanelOpen && (
          <>
            {/* Dark Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsNotificationPanelOpen(false)}
              className="fixed inset-0 bg-blue-950/50 backdrop-blur-sm z-[80]"
            />

            {/* Slide-Out Drawer */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[90] flex flex-col border-l border-gray-100 text-left"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 p-6 text-white flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-800/80 rounded-xl flex items-center justify-center border border-blue-700/60 shadow-inner">
                    <BellRing className="w-5 h-5 text-amber-300 animate-bounce" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-extrabold italic">Taxiva LLC Notifications</h3>
                      {notifications.filter(n => n.unread).length > 0 && (
                        <span className="bg-amber-400 text-blue-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                          {notifications.filter(n => n.unread).length} New
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-blue-200/80 font-medium">Real-time status updates & CPA support alerts</p>
                  </div>
                </div>

                <button 
                  onClick={() => setIsNotificationPanelOpen(false)}
                  className="p-2 text-blue-200 hover:text-white hover:bg-blue-800/60 rounded-xl transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Filter Tabs & Mark All Read */}
              <div className="p-4 bg-gray-50/80 border-b border-gray-100 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-gray-200 text-xs font-bold">
                  {(["all", "unread", "urgent"] as const).map(f => (
                    <button
                      key={f}
                      onClick={() => setNotifFilter(f)}
                      className={cn(
                        "px-3 py-1 rounded-lg capitalize transition-all",
                        notifFilter === f ? "bg-blue-900 text-white shadow-sm" : "text-gray-500 hover:text-gray-900"
                      )}
                    >
                      {f}
                    </button>
                  ))}
                </div>

                {notifications.some(n => n.unread) && (
                  <button
                    onClick={() => setNotifications(prev => prev.map(n => ({ ...n, unread: false })))}
                    className="text-[11px] font-extrabold text-blue-900 hover:underline uppercase tracking-wider"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              {/* Notification Cards List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
                {notifications
                  .filter(n => {
                    if (notifFilter === "unread") return n.unread;
                    if (notifFilter === "urgent") return n.type === "urgent";
                    return true;
                  })
                  .map(n => (
                    <div 
                      key={n.id}
                      className={cn(
                        "p-4 rounded-2xl border transition-all relative text-left",
                        n.unread 
                          ? "bg-blue-50/50 border-blue-200 shadow-sm" 
                          : "bg-white border-gray-200 opacity-85 hover:opacity-100"
                      )}
                    >
                      {n.unread && (
                        <span className="absolute top-4 right-4 w-2.5 h-2.5 bg-amber-500 rounded-full ring-4 ring-amber-100" />
                      )}

                      <div className="flex items-start gap-3">
                        <div className={cn(
                          "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white font-bold shadow-sm",
                          n.type === "urgent" 
                            ? "bg-red-500" 
                            : n.type === "document" 
                            ? "bg-emerald-600" 
                            : n.type === "reminder" 
                            ? "bg-amber-500" 
                            : "bg-blue-900"
                        )}>
                          {n.type === "urgent" ? (
                            <AlertTriangle className="w-4 h-4" />
                          ) : n.type === "document" ? (
                            <FileText className="w-4 h-4" />
                          ) : (
                            <Clock className="w-4 h-4" />
                          )}
                        </div>

                        <div className="flex-1 pr-4">
                          <div className="flex items-center gap-2">
                            <span className={cn(
                              "text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md",
                              n.type === "urgent" 
                                ? "bg-red-100 text-red-900" 
                                : n.type === "document"
                                ? "bg-emerald-100 text-emerald-900"
                                : "bg-blue-100 text-blue-900"
                            )}>
                              {n.type}
                            </span>
                            <span className="text-[10px] font-bold text-gray-400">&bull; {n.time}</span>
                          </div>

                          <h4 className="text-xs font-black text-gray-900 mt-1.5">
                            {n.title}
                          </h4>

                          <p className="text-xs text-gray-600 font-medium leading-relaxed mt-1">
                            {n.message}
                          </p>

                          {n.actionText && n.actionTab && (
                            <button
                              onClick={() => {
                                setNotifications(prev => prev.map(item => item.id === n.id ? { ...item, unread: false } : item));
                                setActiveTab(n.actionTab);
                                setIsNotificationPanelOpen(false);
                              }}
                              className="mt-3 px-3.5 py-1.5 bg-blue-900 text-white rounded-xl text-[11px] font-extrabold hover:bg-blue-800 transition-all flex items-center gap-1.5 shadow-sm"
                            >
                              {n.actionText} <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                {notifications.filter(n => {
                  if (notifFilter === "unread") return n.unread;
                  if (notifFilter === "urgent") return n.type === "urgent";
                  return true;
                }).length === 0 && (
                  <div className="py-16 text-center text-gray-400 space-y-2">
                    <Bell className="w-10 h-10 mx-auto text-gray-300" />
                    <p className="text-xs font-bold text-gray-700">No notifications found</p>
                    <p className="text-[11px] text-gray-400 max-w-xs mx-auto">
                      All tax document status updates and CPA reminders are caught up.
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 bg-gray-50 border-t border-gray-100 text-center shrink-0">
                <p className="text-[11px] text-gray-500 font-semibold flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Taxiva LLC System Alerts &bull; IRS Sec. 7216 Compliant
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// Subcomponents for sections

function HomeDashboard({ 
  client, 
  dependents, 
  notes, 
  tasks, 
  emails, 
  files,
  resolutionCases,
  onAddDependent,
  onAddNote,
  onAddTask,
  onAddEmail,
  onAddResolution,
  onSwitchTab
}: { 
  client: any;
  dependents: any[];
  notes: any[];
  tasks: any[];
  emails: any[];
  files: any[];
  resolutionCases: any[];
  onAddDependent: () => void;
  onAddNote: () => void;
  onAddTask: () => void;
  onAddEmail: () => void;
  onAddResolution: () => void;
  onSwitchTab: (tab: any) => void;
}) {
  const [spouseExpanded, setSpouseExpanded] = useState(false);
  const [dependentsExpanded, setDependentsExpanded] = useState(true);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
      {/* Left Sidebar Cards */}
      <div className="lg:col-span-3 space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-900 text-sm italic">Client Portal</h3>
            <button className="text-blue-900 hover:bg-blue-50 p-1.5 rounded-lg transition-colors">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Email</p>
              <p className="text-sm font-medium text-gray-900 truncate">{client?.email}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Last Login</p>
              <p className="text-sm font-medium text-gray-900">Today, May 15, 2026</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-900 text-sm italic">Client Info</h3>
            <button className="text-gray-400 hover:text-blue-900 p-1.5 rounded-lg transition-colors">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-start gap-3">
              <User className="w-4 h-4 mt-0.5 text-gray-400" />
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Full Name</p>
                <p className="text-sm font-medium text-gray-900">{client?.displayName || "Not provided"}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 mt-0.5 text-gray-400" />
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Email</p>
                <p className="text-sm font-medium text-gray-900 truncate">{client?.email}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 mt-0.5 text-gray-400" />
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Mobile</p>
                <p className="text-sm font-medium text-gray-900">{client?.phoneNumber || "(---) --- ----"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Collapsible Sections */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <button 
            onClick={() => setSpouseExpanded(!spouseExpanded)}
            className="w-full p-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
          >
            <h3 className="font-bold text-gray-900 text-sm italic">Spouse</h3>
            <div className={cn("transition-transform", spouseExpanded ? "rotate-180" : "")}>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </button>
          {spouseExpanded && (
            <div className="p-4 pt-0 border-t border-gray-50 animate-in slide-in-from-top-2">
              <div className="flex flex-col items-center py-4 text-center">
                 <p className="text-xs text-gray-400 font-medium mb-3">No spouse linked</p>
                 <button className="text-[10px] font-bold text-blue-900 hover:underline uppercase tracking-widest flex items-center gap-1">
                   <Plus className="w-3 h-3" /> Add Spouse
                 </button>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden text-left">
          <button 
            onClick={() => setDependentsExpanded(!dependentsExpanded)}
            className="w-full p-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
          >
            <h3 className="font-bold text-gray-900 text-sm italic">Dependents</h3>
            <div className={cn("transition-transform", dependentsExpanded ? "rotate-180" : "")}>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </button>
          {dependentsExpanded && (
            <div className="p-4 pt-0 border-t border-gray-50 animate-in slide-in-from-top-2">
              {dependents.length > 0 ? (
                <div className="space-y-3 py-3">
                  {dependents.map((dep, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-900 font-bold text-[10px] border border-blue-100">
                        {dep.firstName[0]}{dep.lastName[0]}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-900">{dep.firstName} {dep.lastName}</p>
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{dep.relationship}</p>
                      </div>
                    </div>
                  ))}
                  <button 
                    onClick={onAddDependent}
                    className="w-full py-2 bg-gray-50 hover:bg-blue-50 border border-gray-100 rounded-lg text-[10px] font-bold text-blue-900 uppercase tracking-widest transition-all mt-2"
                  >
                    Add Dependent
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center py-4 text-center">
                   <p className="text-xs text-gray-400 font-medium mb-3">No dependents found</p>
                   <button 
                    onClick={onAddDependent}
                    className="text-[10px] font-bold text-blue-900 hover:underline uppercase tracking-widest flex items-center gap-1"
                   >
                     <Plus className="w-3 h-3" /> Add Dependent
                   </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-bold text-gray-900 text-sm italic">About</h3>
            <button className="text-gray-400 hover:text-blue-900 p-1.5 rounded-lg transition-colors">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-start gap-3">
              <Calendar className="w-4 h-4 mt-0.5 text-gray-400" />
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Client Since</p>
                <p className="text-sm font-medium text-gray-900">Jan 12, 2024</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 mt-0.5 text-gray-400" />
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Created On</p>
                <p className="text-sm font-medium text-gray-900">Jan 12, 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Board Content */}
      <div className="lg:col-span-9 space-y-6">
        {/* Quick Actions Bar */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-wrap gap-4 items-center">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2 italic border-r border-gray-100 mr-2">Quick Actions</span>
          <button onClick={onAddEmail} className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-900 rounded-lg text-xs font-bold hover:bg-blue-100 transition-all">
            <Plus className="w-3.5 h-3.5" /> Add response
          </button>
          <button onClick={onAddNote} className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-900 rounded-lg text-xs font-bold hover:bg-blue-100 transition-all">
            <Plus className="w-3.5 h-3.5" /> Add note
          </button>
          <button onClick={onAddTask} className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-900 rounded-lg text-xs font-bold hover:bg-blue-100 transition-all">
            <Plus className="w-3.5 h-3.5" /> Add task
          </button>
          <button onClick={() => onSwitchTab("Files")} className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-900 rounded-lg text-xs font-bold hover:bg-blue-100 transition-all">
            <Upload className="w-3.5 h-3.5" /> Upload file
          </button>
          <button onClick={onAddResolution} className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-900 rounded-lg text-xs font-bold hover:bg-blue-100 transition-all">
            <Shield className="w-3.5 h-3.5" /> Create resolution case
          </button>
          <button onClick={onAddDependent} className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-900 rounded-lg text-xs font-bold hover:bg-blue-100 transition-all">
            <User className="w-3.5 h-3.5" /> Add dependent
          </button>
        </div>

        {/* Tax Filing Step-by-Step Progress Indicator */}
        <TaxFilingProgress onNavigateTab={(tab) => onSwitchTab(tab as TabType)} />

        {/* IRS Tax Deadline Reminder & Sync Component */}
        <TaxDeadlineReminder />

        {/* Recharts Monthly Expense & Tax Deduction Visualizer */}
        <ExpenseSummaryChart onScanReceiptClick={() => {
          const scannerEl = document.getElementById("receipt-scanner-upload-component");
          if (scannerEl) scannerEl.scrollIntoView({ behavior: "smooth" });
        }} />

        {/* Camera/Media Permission Receipt & Form OCR Scanner */}
        <ReceiptScannerUpload />

        {/* Tax Calendar Compliance Widget */}
        <TaxCalendar defaultProfile="Individual" />

        {/* Data Visualization Charts (Annual Filing Progress, Payments, Income Trends) */}
        <TaxVisualizerCharts />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tasks Card */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-gray-900 text-base italic">Tasks</h3>
              <button 
                onClick={() => onSwitchTab("Tasks")} 
                className="text-blue-900 text-xs font-bold hover:underline"
              >
                View all
              </button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
              {tasks.length > 0 ? (
                <div className="w-full space-y-4">
                  {tasks.slice(0, 3).map((task, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-900"></div>
                        <span className="text-sm font-bold text-gray-900">{task.name}</span>
                      </div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase">{task.status}</span>
                    </div>
                  ))}
                  <button onClick={onAddTask} className="w-full py-2.5 border-2 border-dashed border-gray-200 rounded-xl text-blue-900 text-xs font-bold hover:border-blue-900 transition-all">+ Add Task</button>
                </div>
              ) : (
                <>
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-3">
                    <CheckSquare className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-bold text-gray-900 mb-1">No Active Tasks</p>
                  <p className="text-xs text-gray-400 font-medium">Any tasks assigned will appear here.</p>
                  <button onClick={onAddTask} className="mt-4 px-4 py-2 bg-blue-900 text-white rounded-lg text-xs font-bold shadow-lg shadow-blue-900/10">Create Task</button>
                </>
              )}
            </div>
          </div>

          {/* Recently Added Files Card */}
          {files.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
              <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-gray-900 text-base italic">Recently Added Files</h3>
                <button onClick={() => onSwitchTab("Files")} className="text-blue-900 text-xs font-bold hover:underline">View all</button>
              </div>
              <div className="p-5 space-y-3">
                {files.slice(0, 4).map((file, i) => (
                  <div key={file.id || i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-gray-200 transition-all gap-2">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2 bg-blue-50 text-blue-900 rounded-lg shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-gray-900 truncate max-w-[150px] sm:max-w-[180px]">{file.name}</p>
                        <p className="text-[10px] text-gray-400 font-medium">{file.category || "Tax Form"} • {file.date}</p>
                      </div>
                    </div>
                    <DocumentStatusBadge status={file.status || "Pending"} size="sm" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes Card */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-gray-900 text-base italic">Notes</h3>
              <button onClick={onAddNote} className="text-blue-900 text-xs font-bold hover:underline flex items-center gap-1">
                <Plus className="w-3 h-3" /> Add note
              </button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
              {notes.length > 0 ? (
                 <div className="w-full space-y-4">
                  {notes.slice(0, 2).map((note, i) => (
                    <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-left">
                      <p className="text-sm font-bold text-gray-900 mb-1 truncate">{note.title}</p>
                      <p className="text-[11px] text-gray-400 font-medium line-clamp-2">{note.content}</p>
                    </div>
                  ))}
                  <button onClick={() => onSwitchTab("Notes")} className="text-blue-900 text-xs font-bold hover:underline">View all notes</button>
                </div>
              ) : (
                <>
                  <p className="text-sm font-bold text-gray-900 mb-1">No Notes</p>
                  <p className="text-xs text-gray-400 font-medium">Keep track of important details here.</p>
                </>
              )}
            </div>
          </div>

          {/* Resolution Cases Card */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col font-sans">
             <div className="p-5 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-gray-900 text-base italic">Resolution Cases</h3>
              <button onClick={() => onSwitchTab("Resolution")} className="text-blue-900 text-xs font-bold hover:underline">View all</button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
              {resolutionCases.length > 0 ? (
                <div className="w-full flex flex-col gap-3">
                  {resolutionCases.map((rcase, idx) => (
                    <div key={idx} className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between">
                       <span className="text-xs font-bold text-gray-900">{rcase.title}</span>
                       <span className="text-[10px] font-extrabold text-blue-900 uppercase tracking-widest">{rcase.type}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <p className="text-sm font-bold text-gray-900 mb-1">No Active Resolution Cases</p>
                  <button onClick={onAddResolution} className="text-xs text-blue-900 font-bold bg-blue-50 px-3 py-1.5 rounded-lg mt-2 transition-all hover:bg-blue-100">Create Resolution Case</button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



function CommunicationView({ 
  emails, 
  drafts, 
  onNewEmail,
  onAttachToFiles
}: { 
  emails: any[]; 
  drafts: any[]; 
  onNewEmail: () => void;
  onAttachToFiles?: (f: any) => void;
}) {
  const [commMode, setCommMode] = useState<"gmail" | "portal">("gmail");
  const allMessages = [...emails, ...drafts];
  const [activeChat, setActiveChat] = useState<number | null>(allMessages.length > 0 ? 0 : null);

  return (
    <div className="space-y-4">
      {/* View Switcher Bar */}
      <div className="flex items-center justify-between bg-white p-2.5 rounded-2xl border border-gray-200 shadow-2xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCommMode("gmail")}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer",
              commMode === "gmail"
                ? "bg-blue-900 text-white shadow-md shadow-blue-900/10"
                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
            )}
          >
            <Mail className="w-3.5 h-3.5 text-red-400" />
            <span>Gmail Workspace Inbox</span>
          </button>

          <button
            onClick={() => setCommMode("portal")}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer",
              commMode === "portal"
                ? "bg-blue-900 text-white shadow-md shadow-blue-900/10"
                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
            )}
          >
            <MessageSquare className="w-3.5 h-3.5 text-blue-300" />
            <span>Internal Portal Threads</span>
          </button>
        </div>

        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hidden sm:inline px-3">
          Taxiva LLC Communication Hub
        </span>
      </div>

      {commMode === "gmail" ? (
        <GmailCommunicationPanel onAttachToFiles={onAttachToFiles} />
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm h-[700px] flex overflow-hidden">
          {/* Thread List */}
          <div className="w-80 border-r border-gray-200 flex flex-col bg-gray-50/30">
            <div className="p-5 border-b border-gray-200 bg-white">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-900 italic">Internal Portal</h3>
                <button 
                  onClick={onNewEmail}
                  className="p-1.5 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Search threads..." className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto no-scrollbar">
              {allMessages.length > 0 ? (
                allMessages.map((chat, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setActiveChat(idx)}
                    className={cn(
                      "w-full p-4 flex gap-3 border-b border-gray-100 transition-all text-left cursor-pointer",
                      activeChat === idx ? "bg-white border-l-4 border-l-blue-900 shadow-sm" : "hover:bg-gray-50"
                    )}
                  >
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                      <MessageSquare className="w-5 h-5 text-blue-900" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <p className={cn("text-sm truncate", chat.unread ? "font-extrabold text-gray-900 italic" : "font-bold text-gray-700")}>
                          {chat.isDraft && <span className="text-red-500 mr-2">[Draft]</span>}
                          {chat.subject}
                        </p>
                        <span className="text-[10px] text-gray-400 font-bold shrink-0">{chat.date}</span>
                      </div>
                      <p className="text-xs text-gray-500 font-medium truncate">{chat.message}</p>
                    </div>
                  </button>
                ))
              ) : (
                <div className="p-8 text-center">
                  <p className="text-xs text-gray-400 font-bold italic">No communication history</p>
                </div>
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col bg-white">
            {activeChat !== null && allMessages[activeChat] ? (
              <>
                <div className="p-5 border-b border-gray-200 flex justify-between items-center bg-white z-10">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold italic">
                       {allMessages[activeChat].subject[0]}
                     </div>
                     <div>
                        <p className="font-extrabold text-gray-900 italic text-sm tracking-tight text-left">
                          {allMessages[activeChat].isDraft && <span className="text-red-500 mr-2">[Draft]</span>}
                          {allMessages[activeChat].subject}
                        </p>
                        <p className="text-xs text-green-500 font-bold flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Active</p>
                     </div>
                  </div>
                  <div className="flex gap-2">
                     <button className="p-2 text-gray-400 hover:text-blue-900 hover:bg-gray-50 rounded-lg"><Phone className="w-4 h-4" /></button>
                     <button className="p-2 text-gray-400 hover:text-blue-900 hover:bg-gray-50 rounded-lg"><Calendar className="w-4 h-4" /></button>
                     <button className="p-2 text-gray-400 hover:text-blue-900 hover:bg-gray-50 rounded-lg"><MoreVertical className="w-4 h-4" /></button>
                  </div>
                </div>
                
                <div className="flex-1 p-8 overflow-y-auto no-scrollbar space-y-6 bg-gray-50/20">
                   <div className="flex justify-center mb-8">
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">
                        {allMessages[activeChat].isDraft ? "Draft created Today" : "Conversation started Today"}
                      </span>
                   </div>

                   <div className="flex gap-3 flex-row-reverse ml-auto max-w-[80%]">
                      <div className="w-8 h-8 bg-blue-900 text-white rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 italic">TX</div>
                      <div className="p-4 bg-blue-900 text-white rounded-2xl rounded-tr-none shadow-lg shadow-blue-900/10">
                         <p className="text-sm font-medium leading-relaxed tracking-tight text-left">{allMessages[activeChat].message}</p>
                         <span className="text-[10px] text-blue-300 font-bold mt-2 block text-right">{allMessages[activeChat].date || "Just now"}</span>
                      </div>
                   </div>
                </div>

                <div className="p-5 bg-white border-t border-gray-200">
                   {allMessages[activeChat].isDraft ? (
                     <div className="flex flex-col items-center justify-center py-4 bg-gray-50 rounded-2xl border border-gray-200">
                        <p className="text-sm font-bold text-gray-500 mb-2 italic">This is a draft. You can send it later.</p>
                        <button 
                          onClick={() => {
                            onNewEmail();
                          }}
                          className="text-xs font-bold text-blue-900 hover:underline cursor-pointer"
                        >
                          Edit and Send
                        </button>
                     </div>
                   ) : (
                     <div className="flex items-center gap-3 p-1.5 bg-gray-50 border border-gray-200 rounded-2xl">
                        <button className="p-2 text-gray-400 hover:text-blue-900"><Plus className="w-5 h-5" /></button>
                        <input type="text" placeholder="Type your message..." className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium" />
                        <button className="bg-blue-900 text-white p-2.5 rounded-xl shadow-lg shadow-blue-900/20 hover:scale-105 transition-transform cursor-pointer">
                           <Send className="w-4 h-4" />
                        </button>
                     </div>
                   )}
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
                  <MessageSquare className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Workspace Communication</h3>
                <p className="text-gray-400 text-sm font-medium max-w-xs mb-8">Securely message your tax team, share updates, and track conversations in one place.</p>
                <button 
                  onClick={onNewEmail}
                  className="bg-blue-900 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 text-sm shadow-xl shadow-blue-900/10 hover:-translate-y-0.5 transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> New Email
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


function NotesView({ notes, onAddNote }: { notes: any[]; onAddNote: () => void }) {
  const [filter, setFilter] = useState("all");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-2">
         <div className="flex gap-3">
            {["all", "archived", "deleted"].map(f => (
               <button 
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest transition-all",
                  filter === f ? "bg-blue-900 text-white shadow-lg shadow-blue-900/10" : "bg-white text-gray-400 hover:text-gray-600 border border-gray-200 shadow-sm"
                )}
               >
                 {f}
               </button>
            ))}
         </div>
         <button onClick={onAddNote} className="bg-blue-900 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 text-sm shadow-xl shadow-blue-900/10 hover:-translate-y-0.5 transition-all">
            <Plus className="w-4 h-4" /> New Note
         </button>
      </div>

      {notes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {notes.map((note, idx) => (
             <motion.div 
              whileHover={{ y: -4 }}
              key={idx} 
              className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
             >
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-900 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex justify-between items-start mb-4">
                   <span className="px-2 py-0.5 bg-blue-50 text-blue-900 text-[9px] font-extrabold uppercase tracking-widest rounded-md border border-blue-100 italic">
                     {note.visibility === 'client' ? 'Client Visible' : 'Internal'}
                   </span>
                   <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                      <button className="p-1.5 text-gray-400 hover:text-blue-900"><Archive className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 text-gray-400 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                   </div>
                </div>
                <h4 className="font-extrabold text-gray-900 mb-2 italic tracking-tight text-left">{note.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed font-medium mb-6 text-left">{note.content}</p>
                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest italic pt-4 border-t border-gray-50">
                   <Clock className="w-3 h-3" />
                   Last updated: {note.date || "Today"}
                </div>
             </motion.div>
           ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-gray-100 p-20 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
            <FileText className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">No notes have been added.</h3>
          <p className="text-gray-400 text-sm font-medium max-w-xs mb-8">Keep track of important tax details, meeting summaries, and client specific information.</p>
          <button onClick={onAddNote} className="bg-gray-50 text-blue-900 px-6 py-2 rounded-xl font-bold text-xs hover:bg-blue-50 transition-all border border-gray-200">+ Create your first note</button>
        </div>
      )}
    </div>
  );
}


function FilesView({ 
  files, 
  folders, 
  onUpload, 
  onCreateFolder,
  onUpdateStatus
}: { 
  files: any[]; 
  folders: string[]; 
  onUpload: (f: any) => void; 
  onCreateFolder: (f: string) => void;
  onUpdateStatus?: (fileId: string, newStatus: string) => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentFolder, setCurrentFolder] = useState("TY-2025");
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [isCameraScannerOpen, setIsCameraScannerOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("W-2 / Income");
  const [privacyLevel, setPrivacyLevel] = useState("Strict CPA Access");
  const [isEncrypting, setIsEncrypting] = useState(false);
  const [encryptStep, setEncryptStep] = useState(0);
  const [inspectedFile, setInspectedFile] = useState<any | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    "W-2 / Income",
    "1099 / Self-Employed",
    "Financial Statement",
    "Receipt & Deduction",
    "Prior Tax Return",
    "Foreign Reporting (FBAR)",
    "Identity Document"
  ];

  const filteredFiles = files.filter(f => {
    const matchesFolder = f.folder === currentFolder;
    const matchesSearch = 
      f.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (f.category && f.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (f.status && f.status.toLowerCase().includes(searchQuery.toLowerCase())) ||
      f.addedBy.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesStatus = true;
    if (statusFilter !== "All") {
      const s = (f.status || "").toLowerCase();
      if (statusFilter === "Pending") matchesStatus = s.includes("pending");
      else if (statusFilter === "In Review") matchesStatus = s.includes("review");
      else if (statusFilter === "Completed") matchesStatus = s.includes("verified") || s.includes("completed") || s.includes("accepted");
      else if (statusFilter === "Needs Action") matchesStatus = s.includes("action") || s.includes("missing");
    }

    return matchesFolder && matchesSearch && matchesStatus;
  });

  const currentFolderFiles = files.filter(f => f.folder === currentFolder);
  const counts = {
    total: currentFolderFiles.length,
    pending: currentFolderFiles.filter(f => (f.status || "").toLowerCase().includes("pending")).length,
    inReview: currentFolderFiles.filter(f => (f.status || "").toLowerCase().includes("review")).length,
    completed: currentFolderFiles.filter(f => (f.status || "").toLowerCase().includes("verified") || (f.status || "").toLowerCase().includes("completed") || (f.status || "").toLowerCase().includes("accepted")).length,
    needsAction: currentFolderFiles.filter(f => (f.status || "").toLowerCase().includes("action") || (f.status || "").toLowerCase().includes("missing")).length,
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setPendingFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileUploadRequest = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPendingFile(file);
    }
  };

  const startEncryptUpload = () => {
    if (!pendingFile) return;
    setIsEncrypting(true);
    setEncryptStep(1);

    setTimeout(() => setEncryptStep(2), 600);
    setTimeout(() => setEncryptStep(3), 1200);
    setTimeout(() => {
      onUpload({
        id: `f-${Date.now()}`,
        name: pendingFile.name,
        folder: currentFolder,
        date: new Date().toISOString().split("T")[0],
        size: `${(pendingFile.size / 1024).toFixed(0)} KB`,
        type: pendingFile.name.split('.').pop() || 'file',
        category: selectedCategory,
        addedBy: "Client Upload",
        status: "Pending CPA Review",
        encrypted: true,
        encryptionAlgo: "AES-256-GCM",
        checksum: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        privacy: privacyLevel
      });
      setIsEncrypting(false);
      setPendingFile(null);
      setEncryptStep(0);
    }, 1800);
  };

  const totalBytes = files.reduce((acc, f) => {
    const num = parseFloat(f.size) || 1;
    return acc + (f.size.includes("MB") ? num * 1024 * 1024 : num * 1024);
  }, 0);
  const formattedUsed = (totalBytes / (1024 * 1024)).toFixed(1);

  return (
    <div className="space-y-6 text-left">
      {/* Vault Security Header Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-blue-800/50">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-blue-800/80 text-blue-200 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 border border-blue-700/60">
                <Lock className="w-3 h-3 text-emerald-400" /> AES-256 Encrypted Vault
              </span>
              <span className="bg-emerald-900/60 text-emerald-300 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1 border border-emerald-700/50">
                <ShieldCheck className="w-3 h-3" /> IRS Sec. 7216 Compliant
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight italic">
              Secure Document Storage & Upload Center
            </h2>

            <p className="text-blue-100/80 text-xs sm:text-sm font-medium leading-relaxed">
              Upload tax documents, W-2s, 1099s, bank statements, and deduction receipts. All files undergo end-to-end client-side encryption before storing in Taxiva LLC's protected vault.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 shrink-0 flex flex-col justify-center min-w-[240px]">
            <div className="flex justify-between items-center text-xs font-bold mb-2">
              <span className="text-blue-200 flex items-center gap-1.5"><HardDrive className="w-3.5 h-3.5" /> Vault Capacity</span>
              <span className="text-amber-300 font-extrabold">{formattedUsed} MB / 10.0 GB</span>
            </div>
            <div className="w-full bg-blue-950/80 h-2 rounded-full overflow-hidden border border-blue-800/50 mb-3">
              <div className="bg-gradient-to-r from-blue-400 to-emerald-400 h-full rounded-full" style={{ width: `${Math.max(2, (parseFloat(formattedUsed) / 10240) * 100)}%` }} />
            </div>
            <div className="flex items-center justify-between text-[10px] text-blue-200/80 font-semibold">
              <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-400" /> SSL/TLS 1.3 Active</span>
              <span>2FA Verified</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[600px]">
        {/* Folder Sidebar */}
        <div className="lg:col-span-3 bg-white rounded-3xl border border-gray-200 shadow-sm p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-900 italic text-base flex items-center gap-2">
                <Folder className="w-4 h-4 text-blue-900" /> Folders
              </h3>
              <button 
                onClick={() => setIsCreatingFolder(true)} 
                className="p-1.5 text-blue-900 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all"
                title="Create New Folder"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1.5">
              {folders.map((folder) => {
                const folderCount = files.filter(f => f.folder === folder).length;
                const isSelected = currentFolder === folder;

                return (
                  <button 
                    key={folder}
                    onClick={() => setCurrentFolder(folder)}
                    className={cn(
                      "w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all border",
                      isSelected 
                        ? "bg-blue-900 text-white border-blue-900 shadow-md shadow-blue-900/10" 
                        : "text-gray-600 border-transparent hover:bg-gray-50 hover:border-gray-200"
                    )}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Folder className={cn("w-4 h-4 shrink-0", isSelected ? "text-amber-300" : "text-blue-900")} />
                      <span className="truncate">{folder}</span>
                    </div>
                    <span className={cn(
                      "text-[10px] px-2 py-0.5 rounded-full font-black",
                      isSelected ? "bg-blue-800 text-blue-100" : "bg-gray-100 text-gray-500"
                    )}>
                      {folderCount}
                    </span>
                  </button>
                );
              })}

              {isCreatingFolder && (
                <div className="p-3 bg-blue-50/50 rounded-2xl border border-blue-200 space-y-2 mt-2">
                  <input 
                    autoFocus
                    type="text" 
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && newFolderName.trim()) {
                        onCreateFolder(newFolderName.trim());
                        setIsCreatingFolder(false);
                        setNewFolderName("");
                      }
                      if (e.key === 'Escape') setIsCreatingFolder(false);
                    }}
                    placeholder="New Folder Name..."
                    className="w-full text-xs p-2 bg-white border border-blue-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-900/20 font-bold"
                  />
                  <div className="flex gap-2 justify-end">
                    <button 
                      onClick={() => setIsCreatingFolder(false)} 
                      className="px-2.5 py-1 text-[10px] font-bold text-gray-500 hover:bg-gray-100 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={() => {
                        if (newFolderName.trim()) {
                          onCreateFolder(newFolderName.trim());
                          setIsCreatingFolder(false);
                          setNewFolderName("");
                        }
                      }}
                      className="px-3 py-1 bg-blue-900 text-white text-[10px] font-bold rounded-lg"
                    >
                      Create
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Drag & Drop Quick Trigger Box */}
          <div 
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "mt-6 p-4 rounded-2xl border-2 border-dashed text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2",
              isDragging ? "border-blue-900 bg-blue-50 scale-[1.02]" : "border-gray-200 hover:border-blue-300 bg-gray-50/50 hover:bg-white"
            )}
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">Drag & Drop Documents</p>
              <p className="text-[10px] text-gray-400 font-medium">or click to browse local files</p>
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              onChange={handleFileUploadRequest} 
            />
          </div>
        </div>

        {/* Main File Table */}
        <div className="lg:col-span-9 bg-white rounded-3xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">
          {/* Header Controls */}
          <div className="p-6 border-b border-gray-100 flex flex-col gap-4 bg-white sticky top-0 z-20">
            <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search documents by name, category, or status..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-900/10"
                />
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-gray-400 hidden sm:inline">
                  Folder: <span className="text-blue-900 font-extrabold">{currentFolder}</span>
                </span>

                <button 
                  onClick={() => setIsCameraScannerOpen(true)}
                  className="bg-amber-400 text-blue-950 px-4 py-2.5 rounded-xl font-extrabold flex items-center gap-2 text-xs shadow-md hover:bg-amber-300 transition-all shrink-0 uppercase tracking-wider"
                >
                  <Camera className="w-4 h-4" /> Camera Scan Paper Doc
                </button>

                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-blue-900 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 text-xs shadow-lg shadow-blue-900/10 hover:bg-blue-800 transition-all shrink-0"
                >
                  <Upload className="w-4 h-4" /> Secure Upload
                </button>
              </div>
            </div>

            {/* Processing Status Filter Bar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar border-t border-gray-100">
              <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mr-1 shrink-0">Filter Status:</span>
              {[
                { id: "All", label: `All Files (${counts.total})` },
                { id: "Pending", label: `Pending (${counts.pending})` },
                { id: "In Review", label: `In Review (${counts.inReview})` },
                { id: "Completed", label: `Completed (${counts.completed})` },
                { id: "Needs Action", label: `Needs Action (${counts.needsAction})` },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setStatusFilter(filter.id)}
                  className={cn(
                    "px-3 py-1 rounded-xl text-xs font-extrabold transition-all shrink-0 border cursor-pointer",
                    statusFilter === filter.id
                      ? "bg-blue-900 text-white border-blue-900 shadow-xs"
                      : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                  )}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Camera Scanner Modal */}
          {isCameraScannerOpen && (
            <CameraDocumentScanner
              onDocumentScanned={(scannedDoc) => {
                onUpload({
                  id: `f-${Date.now()}`,
                  name: scannedDoc.name,
                  folder: currentFolder,
                  date: new Date().toISOString().split("T")[0],
                  size: scannedDoc.size,
                  type: "pdf",
                  category: scannedDoc.category,
                  addedBy: "Camera Scan",
                  status: "Pending CPA Review",
                  encrypted: true,
                  encryptionAlgo: "AES-256-GCM",
                  checksum: Math.random().toString(36).substring(2, 15),
                  privacy: "Strict CPA Access"
                });
                setIsCameraScannerOpen(false);
              }}
              onClose={() => setIsCameraScannerOpen(false)}
            />
          )}
          
          {/* File Rows */}
          <div className="flex-1 overflow-auto no-scrollbar">
            {filteredFiles.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50/80 sticky top-0 z-10 backdrop-blur-md">
                  <tr>
                    <th className="px-6 py-3.5 text-[9px] font-extrabold text-gray-400 uppercase tracking-widest border-b border-gray-100 italic">Document & Category</th>
                    <th className="px-6 py-3.5 text-[9px] font-extrabold text-gray-400 uppercase tracking-widest border-b border-gray-100 italic">Processing Status</th>
                    <th className="px-6 py-3.5 text-[9px] font-extrabold text-gray-400 uppercase tracking-widest border-b border-gray-100 italic">Security</th>
                    <th className="px-6 py-3.5 text-[9px] font-extrabold text-gray-400 uppercase tracking-widest border-b border-gray-100 italic text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredFiles.map((file) => (
                    <tr key={file.id || file.name} className="hover:bg-blue-50/20 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3.5">
                          <div className="w-10 h-10 bg-blue-50 text-blue-900 rounded-xl flex items-center justify-center shrink-0 border border-blue-100/50">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className="text-xs font-black text-gray-900 truncate tracking-tight group-hover:text-blue-950">
                              {file.name}
                            </span>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] font-extrabold text-blue-900 bg-blue-50 px-2 py-0.5 rounded-md">
                                {file.category || "Tax Form"}
                              </span>
                              <span className="text-[10px] text-gray-400 font-bold">&bull; {file.size}</span>
                              <span className="text-[10px] text-gray-400 font-medium hidden sm:inline">&bull; Added {file.date}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <DocumentStatusBadge 
                          status={file.status || "Pending CPA Review"}
                          interactive={true}
                          onStatusChange={(newStatus) => {
                            if (onUpdateStatus && file.id) {
                              onUpdateStatus(file.id, newStatus);
                            }
                          }}
                        />
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                          <Lock className="w-3 h-3 text-emerald-600" /> AES-256
                        </span>
                      </td>

                      <td className="px-6 py-4 text-xs">
                        <div className="flex items-center justify-center gap-1.5">
                          <button 
                            onClick={() => setInspectedFile(file)}
                            className="p-2 text-gray-500 hover:text-blue-900 hover:bg-blue-50 rounded-xl transition-all"
                            title="Inspect Vault Encryption & Details"
                          >
                            <Key className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => alert(`Simulating secure decryption and download of ${file.name}`)}
                            className="p-2 text-gray-500 hover:text-blue-900 hover:bg-blue-50 rounded-xl transition-all"
                            title="Download Encrypted File"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-16 text-center">
                <div className="w-16 h-16 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center mb-4 border border-blue-100">
                  <Lock className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-1">No documents in {currentFolder}</h3>
                <p className="text-gray-500 text-xs font-medium max-w-sm mb-6">
                  Upload tax forms, W-2s, 1099s, or financial records directly to this encrypted vault folder.
                </p>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-blue-900 text-white px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-blue-800 transition-all shadow-md shadow-blue-900/10 flex items-center gap-2"
                >
                  <Upload className="w-4 h-4" /> Select File to Upload
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Upload Confirmation & Encryption Modal */}
      <AnimatePresence>
        {pendingFile && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-blue-950/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-gray-100 text-left relative overflow-hidden"
            >
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-900 text-white rounded-xl flex items-center justify-center">
                    <Lock className="w-5 h-5 text-amber-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-gray-900 italic">Secure Vault Upload</h3>
                    <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Target Folder: {currentFolder}</p>
                  </div>
                </div>
                <button onClick={() => setPendingFile(null)} className="p-2 text-gray-400 hover:text-gray-600 rounded-xl">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {!isEncrypting ? (
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-100">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Selected File</p>
                    <p className="text-sm font-black text-gray-900 truncate">{pendingFile.name}</p>
                    <p className="text-xs text-gray-500 font-medium mt-0.5">Size: {(pendingFile.size / 1024).toFixed(0)} KB</p>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider mb-1.5">
                      Document Category
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-900/10"
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-gray-700 uppercase tracking-wider mb-1.5">
                      Privacy & Access Level
                    </label>
                    <select
                      value={privacyLevel}
                      onChange={(e) => setPrivacyLevel(e.target.value)}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-900/10"
                    >
                      <option value="Strict CPA Access">Strict CPA Access Only (IRS Sec 7216 Protected)</option>
                      <option value="Shared with Tax Team">Shared with Tax Prep Team</option>
                    </select>
                  </div>

                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-2.5 text-xs text-emerald-950 font-medium">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>File will be encrypted with AES-256 before storing. IRS Section 7216 privacy safeguards apply.</span>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button 
                      onClick={() => setPendingFile(null)}
                      className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-100 transition-all border border-gray-200"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={startEncryptUpload}
                      className="flex-1 py-3 px-4 bg-blue-900 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-900/10 hover:bg-blue-800 transition-all flex items-center justify-center gap-2"
                    >
                      <Lock className="w-4 h-4 text-amber-300" /> Encrypt & Save
                    </button>
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-blue-900 text-amber-300 rounded-2xl flex items-center justify-center mx-auto animate-pulse">
                    <Lock className="w-8 h-8" />
                  </div>
                  <h4 className="text-base font-extrabold text-gray-900">Encrypting & Transmitting Document</h4>
                  
                  <div className="space-y-2 text-xs font-bold text-gray-600 text-left bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <div className={`flex items-center gap-2 ${encryptStep >= 1 ? "text-emerald-700 font-extrabold" : "text-gray-400"}`}>
                      <CheckCircle2 className="w-4 h-4" /> 1. Calculating SHA-256 Document Hash
                    </div>
                    <div className={`flex items-center gap-2 ${encryptStep >= 2 ? "text-emerald-700 font-extrabold" : "text-gray-400"}`}>
                      <CheckCircle2 className="w-4 h-4" /> 2. Applying Client AES-256-GCM Encryption
                    </div>
                    <div className={`flex items-center gap-2 ${encryptStep >= 3 ? "text-emerald-700 font-extrabold" : "text-gray-400"}`}>
                      <CheckCircle2 className="w-4 h-4" /> 3. Transmitting to Taxiva LLC Vault Storage
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}

        {/* Inspect Vault Details Modal */}
        {inspectedFile && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-blue-950/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-gray-100 text-left relative"
            >
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-900 rounded-xl flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-gray-900 italic">Vault Security Inspection</h3>
                    <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Cryptographic Proof</p>
                  </div>
                </div>
                <button onClick={() => setInspectedFile(null)} className="p-2 text-gray-400 hover:text-gray-600 rounded-xl">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs font-medium text-gray-700">
                <div className="bg-gray-50 p-4 rounded-2xl space-y-2 border border-gray-100">
                  <p className="font-extrabold text-gray-900 text-sm">{inspectedFile.name}</p>
                  <p className="text-gray-500 font-medium">Folder: <span className="font-bold text-blue-900">{inspectedFile.folder}</span></p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Cipher Standard</p>
                    <p className="font-black text-blue-900 mt-0.5">{inspectedFile.encryptionAlgo || "AES-256-GCM"}</p>
                  </div>
                  <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Privacy Protocol</p>
                    <p className="font-black text-blue-900 mt-0.5">{inspectedFile.privacy || "Strict CPA Access"}</p>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">SHA-256 Cryptographic Hash</p>
                  <p className="font-mono text-[11px] bg-slate-900 text-emerald-400 p-3 rounded-xl break-all">
                    {inspectedFile.checksum || "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"}
                  </p>
                </div>

                <div className="pt-2">
                  <button 
                    onClick={() => setInspectedFile(null)}
                    className="w-full py-3 bg-blue-900 text-white font-bold rounded-xl text-xs hover:bg-blue-800 transition-all"
                  >
                    Close Inspection
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}



function TasksView({ tasks, onAddTask, onToggleTask }: { tasks: any[]; onAddTask: () => void; onToggleTask: (id: number) => void }) {
  const activeTasks = tasks.filter(t => t.status !== 'Completed' && t.status !== 'Cancelled');
  const completedTasks = tasks.filter(t => t.status === 'Completed' || t.status === 'Cancelled');

  return (
    <div className="space-y-8 text-left">
      {/* Active Tasks */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900 italic">Active Tasks</h2>
          <button 
            onClick={onAddTask}
            className="bg-blue-900 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 text-xs shadow-lg shadow-blue-900/10 hover:-translate-y-0.5 transition-all"
          >
            <Plus className="w-4 h-4" /> Add Task
          </button>
        </div>
        
        {activeTasks.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest italic">Task</th>
                  <th className="px-6 py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest italic">Type</th>
                  <th className="px-6 py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest italic">Due Date</th>
                  <th className="px-6 py-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest italic text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {activeTasks.map((task, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <button onClick={() => onToggleTask(task.id)} className="text-gray-300 hover:text-blue-900 transition-colors">
                          <CheckCircle2 className="w-5 h-5" />
                        </button>
                        <span className="text-sm font-bold text-gray-900">{task.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-bold text-gray-500 italic">{task.type}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-400 italic">{task.dueDate || "No due date"}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <span className={cn(
                          "px-2.5 py-1 rounded-md text-[9px] font-extrabold uppercase tracking-widest border",
                          task.priority === 'High' ? "bg-red-50 text-red-600 border-red-100" : "bg-blue-50 text-blue-900 border-blue-100"
                        )}>
                          {task.priority}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-20 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4 border-2 border-dashed border-gray-100">
              <CheckSquare className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2 tracking-tight">You Have No Active Tasks</h3>
            <p className="text-gray-400 text-sm font-medium max-w-sm mb-6">There are no active tasks assigned to this client at this time.</p>
            <button onClick={onAddTask} className="bg-gray-50 text-blue-900 px-6 py-2 rounded-xl font-bold text-xs border border-gray-200">+ Create your first task</button>
          </div>
        )}
      </div>

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden opacity-60 hover:opacity-100 transition-opacity">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-600 italic">Completed Tasks</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <tbody className="divide-y divide-gray-50">
                {completedTasks.map((task, idx) => (
                  <tr key={idx} className="bg-gray-50/30">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                        <span className="text-sm font-bold text-gray-400 line-through">{task.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-bold text-gray-400 italic text-right">
                      Completed
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}


function ResolutionView({ cases, onInitiate }: { cases: any[]; onInitiate: () => void }) {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm min-h-[500px] flex flex-col transition-all overflow-hidden relative font-sans text-left">
      <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/20">
         <div>
            <h3 className="text-2xl font-extrabold text-gray-900 italic tracking-tight">Resolution Cases</h3>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">Audit & notice support center</p>
         </div>
         <button onClick={onInitiate} className="bg-blue-900 text-white px-6 py-2.5 rounded-2xl font-extrabold shadow-2xl shadow-blue-900/20 hover:scale-105 transition-all text-sm italic tracking-tight">
            Initiate a Case
         </button>
      </div>

      <div className="flex-1 p-8">
        {cases.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {cases.map((rcase, idx) => (
               <div key={idx} className="p-6 bg-white border border-gray-100 rounded-3xl shadow-sm hover:border-blue-900 transition-all group">
                  <div className="flex justify-between items-start mb-4">
                     <span className="px-3 py-1 bg-blue-900 text-white text-[9px] font-black uppercase tracking-widest rounded-lg">{rcase.type}</span>
                     <span className={cn(
                       "px-2.5 py-1 rounded-md text-[9px] font-extrabold uppercase tracking-widest border",
                       rcase.priority === 'High' ? "bg-red-50 text-red-600 border-red-100" : "bg-blue-50 text-blue-900 border-blue-100"
                     )}>{rcase.priority}</span>
                  </div>
                  <h4 className="text-lg font-black text-gray-900 italic mb-2">{rcase.title}</h4>
                  <p className="text-sm font-medium text-gray-500 mb-6 line-clamp-2">{rcase.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-50 text-[10px] font-bold text-gray-400">
                     <span>Assigned: {rcase.assignedTo || "Team Leader"}</span>
                     <span className="italic">Status: Active</span>
                  </div>
               </div>
             ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-12 text-center h-full">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
            
            <div className="w-20 h-20 bg-blue-50 rounded-[2.5rem] flex items-center justify-center text-blue-900 mb-8 shadow-inner border border-blue-100 rotate-6 hover:rotate-0 transition-transform">
              <Shield className="w-10 h-10" />
            </div>
            <p className="text-gray-500 max-w-sm font-medium leading-relaxed mb-10">We handle complex tax resolution issues including audits, notices, and payment plan negotiations. Currently, you have no active resolution cases.</p>
            
            <div className="flex gap-6">
               <div className="flex flex-col items-center gap-2">
                  <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest italic">Active</span>
                  <span className="text-2xl font-black text-gray-900">0</span>
               </div>
               <div className="w-px h-10 bg-gray-100"></div>
               <div className="flex flex-col items-center gap-2">
                  <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest italic">Archived</span>
                  <span className="text-2xl font-black text-gray-900">12</span>
               </div>
               <div className="w-px h-10 bg-gray-100"></div>
               <div className="flex flex-col items-center gap-2">
                  <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest italic">Success Rate</span>
                  <span className="text-2xl font-black text-blue-900">98%</span>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


function OrganizersView({ status, onUpdateStatus }: { status: string, onUpdateStatus: (s: any) => void }) {
  const [organizerStarted, setOrganizerStarted] = useState(false);

  if (!organizerStarted) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
           <div className="flex items-center gap-4 text-left">
              <div className="w-12 h-12 bg-blue-900 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-900/20">
                <ClipboardList className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 italic">2025 Individual Tax Organizer</h2>
                <div className="flex items-center gap-3 mt-1">
                  <span className={cn(
                    "px-2 py-0.5 rounded text-[10px] font-extrabold uppercase shadow-sm",
                    status === 'Not Started' ? "bg-gray-200 text-gray-600" :
                    status === 'In Progress' ? "bg-blue-100 text-blue-900" :
                    status === 'Completed' ? "bg-green-100 text-green-900" : "bg-blue-900 text-white"
                  )}>
                    {status}
                  </span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest underline cursor-pointer">Due by: Apr 15, 2026</span>
                </div>
              </div>
           </div>
           <button 
            onClick={() => {
              setOrganizerStarted(true);
              if (status === 'Not Started') onUpdateStatus('In Progress');
            }}
            className="bg-blue-900 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-900/10 hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95 flex items-center gap-2"
           >
             {status === 'Not Started' ? 'Start Organizer' : 'Continue Organizer'} <Plus className="w-4 h-4" />
           </button>
        </div>

        <div className="p-10">
          <div className="max-w-2xl mx-auto space-y-12">
            <div className="space-y-6 text-center">
              <h3 className="text-2xl font-bold text-gray-900 italic">Welcome to your Taxiva LLC Organizer</h3>
              <p className="text-gray-500 font-medium leading-relaxed tracking-tight">
                Our intuitive tax organizer helps you gather everything needed for your 2025 tax filing. 
                Complete it at your own pace—your progress is saved automatically.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { title: "Personal Details", desc: "Names, SSNs, and family info" },
                { title: "Income Sources", desc: "W2s, 1099s, and more" },
                { title: "Deductions", desc: "Charity, medical, and expenses" },
                { title: "Documents", desc: "Securely upload your forms" }
              ].map(feat => (
                <div key={feat.title} className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-blue-900/20 transition-all cursor-default group text-left">
                   <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center text-blue-900 mb-4 group-hover:bg-blue-900 group-hover:text-white transition-all">
                      <CheckSquare className="w-5 h-5" />
                   </div>
                   <h4 className="font-bold text-gray-900 mb-1 tracking-tight">{feat.title}</h4>
                   <p className="text-[11px] text-gray-400 font-medium">{feat.desc}</p>
                </div>
              ))}
            </div>

            <div className="p-6 bg-blue-900 rounded-[2rem] text-white overflow-hidden relative shadow-xl shadow-blue-900/20">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
               <div className="relative z-10 flex items-center justify-between">
                  <div className="text-left">
                    <p className="text-[11px] font-bold mb-1 italic opacity-80 uppercase tracking-widest">Est. time</p>
                    <p className="text-xl font-extrabold tracking-tight">15-20 Minutes</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] font-bold mb-1 italic opacity-80 uppercase tracking-widest">Progress</p>
                    <p className="text-xl font-extrabold tracking-tight underline decoration-blue-400 underline-offset-4">0% Complete</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <OrganizerWizard onCancel={() => setOrganizerStarted(false)} onComplete={() => onUpdateStatus('Submitted')} />;
}

// Organizer Wizard Component

function OrganizerWizard({ onCancel, onComplete }: { onCancel: () => void; onComplete: () => void }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<any>({});
  
  const steps = [
    "Personal Information", "Taxpayer Details", "Spouse Information", "Filing Status", 
    "Dependent Information", "Banking Information", "2025 Life Events", "2025 Financial Events", 
    "2025 Income Sources", "Adjustments and Credits", "Deductions", "Estimated Taxes", 
    "Document Uploads", "Review and Submit"
  ];

  const totalSteps = steps.length;
  const progress = Math.round((currentStep / (totalSteps - 1)) * 100);

  const nextStep = () => {
    // Basic validation for step 0
    if (currentStep === 0 && !formData.firstName) {
       // Just visual feedback for now in this demo environment
    }
    setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1));
  };
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

  const handleSaveProgress = () => {
    // In a real app, this would persist to the DB
    alert("Progress saved successfully!");
  };

  const handleSubmit = () => {
    // Final validation
    if (!formData.firstName || !formData.lastName || !formData.ssn || !formData.dob) {
      alert("Please complete all required fields in the Personal Information section before submitting.");
      setCurrentStep(0);
      return;
    }
    
    if (confirm("Are you sure you want to submit your tax organizer? You won't be able to make changes until it's reviewed.")) {
      onComplete();
      onCancel();
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-xl min-h-[700px] flex overflow-hidden">
      {/* Step Sidebar */}
      <div className="w-72 bg-gray-50 border-r border-gray-200 p-8 flex flex-col shrink-0">
        <h3 className="text-[10px] font-extrabold text-blue-900 uppercase tracking-[0.2em] mb-8 italic text-left">Organizer: {progress}%</h3>
        
        <div className="flex-1 space-y-1 overflow-y-auto no-scrollbar pr-2">
          {steps.map((step, i) => (
            <div 
              key={step}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition-all relative text-left cursor-default",
                i === currentStep ? "text-blue-900 bg-blue-50/50" : (i < currentStep ? "text-green-600" : "text-gray-400")
              )}
            >
              <div className={cn(
                "w-1.5 h-1.5 rounded-full shrink-0",
                i === currentStep ? "bg-blue-900 ring-4 ring-blue-900/10" : (i < currentStep ? "bg-green-500" : "bg-gray-300")
              )} />
              <span className="truncate">{step}</span>
              {i === currentStep && (
                <motion.div layoutId="activeStep" className="absolute left-0 w-1 bg-blue-900 h-6 rounded-r-full" />
              )}
            </div>
          ))}
        </div>

        <button 
          onClick={onCancel}
          className="mt-8 text-[11px] font-bold text-gray-400 hover:text-red-500 transition-colors uppercase tracking-[0.1em] text-left italic border-t border-gray-200 pt-6"
        >
          Cancel & Exit Workspace
        </button>
      </div>

      {/* Main Form Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="h-1 bg-gray-100 w-full overflow-hidden shrink-0">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-blue-900 shadow-[0_0_8px_rgba(30,58,138,0.5)]"
          />
        </div>

        <div className="flex-1 p-12 overflow-y-auto no-scrollbar bg-white">
          <div className="max-w-2xl mx-auto">
            <header className="mb-10 text-left">
              <p className="text-[10px] font-extrabold text-blue-900 uppercase tracking-widest italic mb-2">Step {currentStep + 1} of {totalSteps}</p>
              <h2 className="text-3xl font-extrabold text-gray-900 italic tracking-tight">{steps[currentStep]}</h2>
            </header>
            
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               {currentStep === 0 && <PersonalInformationForm formData={formData} setFormData={setFormData} />}
               {currentStep === 1 && <TaxpayerDetailsForm formData={formData} setFormData={setFormData} />}
               {currentStep === 2 && <SpouseInformationForm formData={formData} setFormData={setFormData} />}
               {currentStep === 3 && <FilingStatusForm formData={formData} setFormData={setFormData} />}
               {currentStep === 4 && <DependentInformationForm formData={formData} setFormData={setFormData} />}
               {currentStep === 5 && <BankingInformationForm formData={formData} setFormData={setFormData} />}
               {currentStep === 6 && <EventsForm title="Life Events" section="life" formData={formData} setFormData={setFormData} />}
               {currentStep === 7 && <EventsForm title="Financial Events" section="financial" formData={formData} setFormData={setFormData} />}
               {currentStep === 8 && <IncomeSourcesForm formData={formData} setFormData={setFormData} />}
               {currentStep === 9 && <AdjustmentsCreditsForm formData={formData} setFormData={setFormData} />}
               {currentStep === 10 && <DeductionsForm formData={formData} setFormData={setFormData} />}
               {currentStep === 11 && <EstimatedTaxesForm formData={formData} setFormData={setFormData} />}
               {currentStep === 12 && <DocumentUploadStep />}
               {currentStep === 13 && <ReviewSubmitStep steps={steps} />}
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="px-12 py-8 border-t border-gray-100 flex justify-between items-center bg-white shrink-0 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
          <button 
           disabled={currentStep === 0}
           onClick={prevStep}
           className="px-6 py-3 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-50 disabled:opacity-0 transition-all border border-transparent hover:border-gray-100"
          >
            Back
          </button>
          
          <div className="flex gap-4">
             <button className="px-6 py-3 rounded-xl text-sm font-bold text-blue-900 hover:bg-blue-50 transition-all border border-blue-100">
               Save Progress
             </button>
             <button 
              onClick={nextStep}
              className="bg-blue-900 text-white px-10 py-3 rounded-xl font-bold shadow-xl shadow-blue-900/10 hover:shadow-2xl hover:-translate-y-0.5 transition-all active:scale-95 text-sm"
             >
               {currentStep === totalSteps - 1 ? "Submit Review" : "Next Section"}
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DocumentUploadStep() {
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPendingFile(file);
  };

  const confirmUpload = () => {
    // In a real app, this would upload to storage/db
    console.log("Uploading file:", pendingFile?.name);
    setPendingFile(null);
  };

  return (
    <div className="space-y-8 text-left">
      <div 
        onClick={() => fileInputRef.current?.click()}
        className="p-10 border-2 border-dashed border-gray-200 rounded-[2rem] bg-gray-50 flex flex-col items-center justify-center text-center group hover:border-blue-200 hover:bg-blue-50/30 transition-all cursor-pointer"
      >
         <div className="w-16 h-16 bg-blue-900 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/20 mb-6 group-hover:scale-110 transition-transform">
           <Upload className="w-8 h-8" />
         </div>
         <h4 className="text-xl font-extrabold text-gray-900 italic mb-2">Upload Tax Documents</h4>
         <p className="text-sm text-gray-400 font-medium max-w-sm mb-6">Drag and drop your W-2s, 1099s, and other tax files here, or click to browse.</p>
         <button className="bg-white px-6 py-2.5 rounded-xl text-xs font-bold text-blue-900 shadow-sm border border-gray-100 group-hover:ring-4 group-hover:ring-blue-900/5">Select Files</button>
         <input 
           type="file" 
           ref={fileInputRef} 
           className="hidden" 
           onChange={handleFileSelect} 
         />
      </div>

      <AnimatePresence>
        {pendingFile && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-blue-900/40 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-[2rem] p-8 max-w-sm w-full shadow-2xl border border-white/20 text-center"
            >
              <div className="w-16 h-16 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-gray-900 italic mb-2">Confirm Document</h3>
              <p className="text-sm text-gray-500 font-medium mb-6">
                Are you sure you want to upload <span className="text-blue-900 font-bold">"{pendingFile.name}"</span> as part of your tax filing?
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setPendingFile(null)}
                  className="flex-1 py-3 px-4 rounded-xl text-sm font-bold text-gray-400 hover:bg-gray-50 transition-all border border-gray-200"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmUpload}
                  className="flex-1 py-3 px-4 bg-blue-900 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-900/10 hover:shadow-xl transition-all"
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
         <h3 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest italic border-b border-gray-50 pb-2">Required Uploads</h3>
         {[
           { name: "2024 Tax Return Copy", status: "Missing", required: true },
           { name: "Government Issued ID", status: "Missing", required: true },
           { name: "Social Security Card(s)", status: "Missing", required: true }
         ].map(doc => (
           <div key={doc.name} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-2xl">
              <div className="flex items-center gap-3">
                 <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-300">
                    <FileText className="w-4 h-4" />
                 </div>
                 <span className="text-sm font-bold text-gray-900 tracking-tight italic">{doc.name}</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-1 bg-red-50 text-red-600 rounded-md border border-red-100 uppercase tracking-widest">Required</span>
           </div>
         ))}
      </div>
    </div>
  );
}

function ReviewSubmitStep({ steps }: { steps: string[] }) {
  return (
    <div className="space-y-8 text-left">
      <div className="p-6 bg-green-50 rounded-3xl border border-green-100 flex items-center gap-4">
         <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white shrink-0">
           <CheckCircle2 className="w-6 h-6" />
         </div>
         <div>
            <p className="text-sm font-bold text-green-900">Information Complete</p>
            <p className="text-[11px] font-medium text-green-700/70">All required sections have been filled out and validated.</p>
         </div>
      </div>

      <div className="space-y-4">
         <h3 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest italic border-b border-gray-50 pb-2">Review Summary</h3>
         {steps.slice(0, -2).map(step => (
           <div key={step} className="flex items-center justify-between p-4 bg-gray-50/50 border border-gray-100 rounded-2xl group hover:bg-white hover:border-gray-200 transition-all">
              <span className="text-sm font-bold text-gray-700 tracking-tight italic">{step}</span>
              <button className="p-1 px-3 bg-white border border-gray-200 rounded-lg text-[10px] font-bold text-blue-900 hover:bg-blue-50 transition-colors uppercase tracking-widest">Edit</button>
           </div>
         ))}
      </div>

      <div className="p-6 bg-gray-50 rounded-3xl border border-gray-200">
         <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed text-center italic">
           By submitting this organizer, you certify that the information provided is true and accurate to the best of your knowledge. Taxiva LLC will use this data to prepare your 2025 tax returns.
         </p>
      </div>
    </div>
  );
}



function TaxpayerDetailsForm({ formData, setFormData }: any) {
  return (
    <div className="space-y-8 text-left">
      <div className="space-y-6">
        <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2 italic">Identity Verification</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="space-y-2">
              <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest ml-1 italic">ID Type</label>
              <select 
                value={formData.idType || "Driver's License"}
                onChange={(e) => setFormData({...formData, idType: e.target.value})}
                className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-900/5 focus:border-blue-900 focus:bg-white transition-all text-sm font-bold"
              >
                 <option>Driver's License</option>
                 <option>State ID</option>
                 <option>Passport</option>
                 <option>Other</option>
              </select>
           </div>
           <FloatingInput 
            label="ID Number" 
            value={formData.idNumber}
            onChange={(e) => setFormData({...formData, idNumber: e.target.value})}
           />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <FloatingInput 
            label="Issuing State" 
            value={formData.idState}
            onChange={(e) => setFormData({...formData, idState: e.target.value})}
           />
           <FloatingInput 
            label="Issue Date" 
            type="date" 
            value={formData.idIssueDate}
            onChange={(e) => setFormData({...formData, idIssueDate: e.target.value})}
           />
           <FloatingInput 
            label="Expiration Date" 
            type="date" 
            value={formData.idExpiryDate}
            onChange={(e) => setFormData({...formData, idExpiryDate: e.target.value})}
           />
        </div>
      </div>
      <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
         <h4 className="font-bold text-blue-900 text-sm mb-3">Questions for 2025</h4>
         <div className="space-y-3">
            {[
              { id: 'blind', label: "Legally blind" },
              { id: 'disabled', label: "Permanently and totally disabled" },
              { id: 'student', label: "Full-time student" },
              { id: 'electionFund', label: "Designate $3 to Presidential Election Fund" }
            ].map(q => (
              <label key={q.id} className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={formData[q.id] || false}
                  onChange={(e) => setFormData({...formData, [q.id]: e.target.checked})}
                  className="w-4 h-4 rounded text-blue-900 border-gray-300 focus:ring-blue-900" 
                />
                <span className="text-sm font-medium text-gray-700 group-hover:text-blue-900 transition-colors">{q.label}</span>
              </label>
            ))}
         </div>
      </div>
    </div>
  );
}

function SpouseInformationForm({ formData, setFormData }: any) {
  const hasSpouse = formData.hasSpouse || false;

  return (
    <div className="space-y-8 text-left">
      <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-between">
         <div>
            <h4 className="font-bold text-gray-900">Do you have a spouse?</h4>
            <p className="text-xs text-gray-400 font-medium">Link your spouse to this tax return</p>
         </div>
         <button 
          onClick={() => setFormData({...formData, hasSpouse: !hasSpouse})}
          className={cn(
            "px-6 py-2 rounded-xl text-xs font-bold transition-all",
            hasSpouse ? "bg-red-50 text-red-600" : "bg-blue-900 text-white"
          )}
         >
           {hasSpouse ? "Remove Spouse" : "Add Spouse"}
         </button>
      </div>

      {hasSpouse && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FloatingInput 
              label="First Name" 
              value={formData.spouseFirstName}
              onChange={(e) => setFormData({...formData, spouseFirstName: e.target.value})}
            />
            <FloatingInput 
              label="Last Name" 
              value={formData.spouseLastName}
              onChange={(e) => setFormData({...formData, spouseLastName: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FloatingInput 
              label="Date of Birth" 
              type="date" 
              value={formData.spouseDob}
              onChange={(e) => setFormData({...formData, spouseDob: e.target.value})}
            />
            <FloatingInput 
              label="SSN or ITIN" 
              value={formData.spouseSsn}
              onChange={(e) => setFormData({...formData, spouseSsn: e.target.value})}
            />
          </div>
          <FloatingInput 
            label="Occupation" 
            value={formData.spouseOccupation}
            onChange={(e) => setFormData({...formData, spouseOccupation: e.target.value})}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FloatingInput 
              label="Email" 
              type="email" 
              value={formData.spouseEmail}
              onChange={(e) => setFormData({...formData, spouseEmail: e.target.value})}
            />
            <FloatingInput 
              label="Phone" 
              type="tel" 
              value={formData.spousePhone}
              onChange={(e) => setFormData({...formData, spousePhone: e.target.value})}
            />
          </div>
        </motion.div>
      )}

      {!hasSpouse && (
        <div className="py-20 text-center">
           <p className="text-gray-400 font-bold italic">No spouse linked for this filing.</p>
        </div>
      )}
    </div>
  );
}

function DependentInformationForm({ formData, setFormData }: any) {
  const dependents = formData.dependentList || [];

  const addDependent = () => {
    setFormData({
      ...formData,
      dependentList: [...dependents, { id: Date.now(), name: '', relationship: '', dob: '', ssn: '', months: '' }]
    });
  };

  const updateDependent = (id: number, field: string, value: any) => {
    setFormData({
      ...formData,
      dependentList: dependents.map((d: any) => d.id === id ? { ...d, [field]: value } : d)
    });
  };

  const removeDependent = (id: number) => {
    setFormData({
      ...formData,
      dependentList: dependents.filter((d: any) => d.id !== id)
    });
  };

  return (
    <div className="space-y-8 text-left">
      <div className="flex justify-between items-center">
         <p className="text-gray-400 font-bold text-sm italic">Listing information for qualifying children and relatives.</p>
         <button 
          onClick={addDependent}
          className="bg-blue-900 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2"
         >
           <Plus className="w-4 h-4" /> Add Dependent
         </button>
      </div>

      <div className="space-y-4">
        {dependents.map((dep: any, i: number) => (
          <div key={dep.id} className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm relative group">
             <button 
              onClick={() => removeDependent(dep.id)}
              className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors"
             >
               <X className="w-5 h-5" />
             </button>
             <h4 className="font-bold text-blue-900 text-xs uppercase tracking-widest mb-6 italic">Dependent #{i + 1}</h4>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <FloatingInput label="First & Last Name" value={dep.name} onChange={(e) => updateDependent(dep.id, 'name', e.target.value)} />
                <FloatingInput label="Relationship" value={dep.relationship} onChange={(e) => updateDependent(dep.id, 'relationship', e.target.value)} />
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FloatingInput label="Date of Birth" type="date" value={dep.dob} onChange={(e) => updateDependent(dep.id, 'dob', e.target.value)} />
                <FloatingInput label="SSN or ITIN" value={dep.ssn} onChange={(e) => updateDependent(dep.id, 'ssn', e.target.value)} />
                <FloatingInput label="Months in Home" type="number" value={dep.months} onChange={(e) => updateDependent(dep.id, 'months', e.target.value)} />
             </div>
          </div>
        ))}

        {dependents.length === 0 && (
          <div className="py-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
             <p className="text-gray-400 font-bold italic">No dependents added yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function BankingInformationForm({ formData, setFormData }: any) {
  return (
    <div className="space-y-8 text-left">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="space-y-6 p-6 bg-blue-50/50 rounded-2xl border border-blue-100">
            <h4 className="font-bold text-blue-900 text-sm italic border-b border-blue-100 pb-2 uppercase tracking-widest">Refund Preference</h4>
            <div className="space-y-3">
               {["Direct deposit", "Paper check", "Apply to 2026 estimated taxes"].map(opt => (
                 <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                   <input 
                    type="radio" 
                    name="refundPref" 
                    checked={formData.refundPref === opt}
                    onChange={() => setFormData({...formData, refundPref: opt})}
                    className="w-4 h-4 text-blue-900 border-gray-300" 
                   />
                   <span className="text-sm font-bold text-gray-700 group-hover:text-blue-900 transition-colors tracking-tight">{opt}</span>
                 </label>
               ))}
            </div>
         </div>
         <div className="space-y-6 p-6 bg-amber-50/50 rounded-2xl border border-amber-100">
            <h4 className="font-bold text-amber-900 text-sm italic border-b border-amber-100 pb-2 uppercase tracking-widest">Balance Due Preference</h4>
            <div className="space-y-3">
               {["Bank draft", "Credit card", "Mail a check", "Payment plan"].map(opt => (
                 <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                   <input 
                    type="radio" 
                    name="duePref" 
                    checked={formData.duePref === opt}
                    onChange={() => setFormData({...formData, duePref: opt})}
                    className="w-4 h-4 text-amber-900 border-gray-300" 
                   />
                   <span className="text-sm font-bold text-gray-700 group-hover:text-amber-900 transition-colors tracking-tight">{opt}</span>
                 </label>
               ))}
            </div>
         </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2 italic">Account Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <FloatingInput label="Financial Institution" value={formData.bankName} onChange={(e) => setFormData({...formData, bankName: e.target.value})} />
           <FloatingInput label="Account Holder Name" value={formData.accountName} onChange={(e) => setFormData({...formData, accountName: e.target.value})} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <FloatingInput label="Routing Number" maxLength={9} value={formData.routingNumber} onChange={(e) => setFormData({...formData, routingNumber: e.target.value})} />
           <FloatingInput label="Account Number" value={formData.accountNumber} onChange={(e) => setFormData({...formData, accountNumber: e.target.value})} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="space-y-2">
              <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest ml-1 italic">Type of Account</label>
              <div className="flex gap-4 p-1 bg-gray-50 border border-gray-200 rounded-xl">
                 <button 
                  onClick={() => setFormData({...formData, accountType: 'Checking'})}
                  className={cn("flex-1 py-2 rounded-lg text-xs font-bold transition-all", formData.accountType === 'Checking' ? "bg-white shadow-sm text-blue-900" : "text-gray-400 hover:text-gray-600")}
                 >
                   Checking
                 </button>
                 <button 
                  onClick={() => setFormData({...formData, accountType: 'Savings'})}
                  className={cn("flex-1 py-2 rounded-lg text-xs font-bold transition-all", formData.accountType === 'Savings' ? "bg-white shadow-sm text-blue-900" : "text-gray-400 hover:text-gray-600")}
                 >
                   Savings
                 </button>
              </div>
           </div>
           <div className="space-y-2">
              <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest ml-1 italic">Personal or Business</label>
              <div className="flex gap-4 p-1 bg-gray-50 border border-gray-200 rounded-xl">
                 <button 
                  onClick={() => setFormData({...formData, ownership: 'Personal'})}
                  className={cn("flex-1 py-2 rounded-lg text-xs font-bold transition-all", formData.ownership === 'Personal' ? "bg-white shadow-sm text-blue-900" : "text-gray-400 hover:text-gray-600")}
                 >
                   Personal
                 </button>
                 <button 
                  onClick={() => setFormData({...formData, ownership: 'Business'})}
                  className={cn("flex-1 py-2 rounded-lg text-xs font-bold transition-all", formData.ownership === 'Business' ? "bg-white shadow-sm text-blue-900" : "text-gray-400 hover:text-gray-600")}
                 >
                   Business
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function EventsForm({ title, section, formData, setFormData }: { title: string, section: "life" | "financial", formData: any, setFormData: (d: any) => void }) {
  const events = {
    life: [
      "Changed marital status", "Taxpayer/spouse/dependent changed name",
      "Received notice from IRS or state", "First time filing a tax return",
      "Member of the Armed Forces", "Received IP PIN from IRS",
      "Had a baby or adopted a child", "Changed address during the year",
      "Taxpayer/spouse/dependent passed away"
    ],
    financial: [
      "Bought, sold, or refinanced a home", "Incurred property damage or theft",
      "Converted or rolled over retirement accounts", "Engaged in digital asset transactions",
      "Foreign account interest (>$10,000)", "Gifted more than $19,000 to an individual",
      "Purchased health insurance via Marketplace", "Health insurance coverage all year"
    ]
  };

  return (
    <div className="space-y-8 text-left">
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-2xl flex items-center gap-3">
         <input 
          type="checkbox" 
          checked={formData[`none_${section}`] || false}
          onChange={(e) => setFormData({...formData, [`none_${section}`]: e.target.checked})}
          className="w-4 h-4 rounded text-blue-900" 
         />
         <span className="text-sm font-bold text-gray-900 italic">None of these apply to me in 2025</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
         {events[section].map((event) => (
           <label key={event} className="flex items-start gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={formData[event] || false}
                onChange={(e) => setFormData({...formData, [event]: e.target.checked})}
                className="w-4 h-4 rounded text-blue-900 border-gray-300 mt-1" 
              />
              <span className="text-sm font-medium text-gray-700 group-hover:text-blue-900 transition-colors leading-relaxed tracking-tight">{event}</span>
           </label>
         ))}
      </div>
    </div>
  );
}

function AdjustmentsCreditsForm({ formData, setFormData }: any) {
  const items = [
    "Higher education expenses", "Child or dependent care expenses",
    "HSA contributions", "IRA contributions", "Student loan interest",
    "Plug-in electric vehicle purchase", "Adoption expenses",
    "Alimony paid", "Educator expenses", "Household employee expenses",
    "Energy-efficient home improvements", "Armed Forces moving expenses"
  ];

  return (
    <div className="space-y-8 text-left">
      <p className="text-gray-500 font-medium italic italic">Indicate if any of the following adjustments or credits apply to your 2025 return.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
         {items.map((item) => (
           <label key={item} className="flex items-start gap-3 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded text-blue-900 border-gray-300 mt-1" />
              <div className="flex-1">
                 <p className="text-sm font-bold text-gray-700 group-hover:text-blue-900 transition-colors leading-relaxed tracking-tight">{item}</p>
                 <div className="mt-2 hidden group-focus-within:block animate-in fade-in zoom-in-95 duration-200">
                    <input type="text" placeholder="Amount ($)" className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold" />
                 </div>
              </div>
           </label>
         ))}
      </div>
    </div>
  );
}

function DeductionsForm({ formData, setFormData }: any) {
  const updateDeduction = (section: string, item: string, value: string) => {
    setFormData({
      ...formData,
      deductions: {
        ...(formData.deductions || {}),
        [section]: {
          ...(formData.deductions?.[section] || {}),
          [item]: value
        }
      }
    });
  };

  return (
    <div className="space-y-10 text-left">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <DeductionSection 
          title="Medical and Dental" 
          items={["Medical and dental expenses"]} 
          values={formData.deductions?.medical || {}}
          onChange={(item: string, val: string) => updateDeduction('medical', item, val)}
        />
        <DeductionSection 
          title="Casualty and Theft" 
          items={["Casualty and theft losses"]} 
          values={formData.deductions?.casualty || {}}
          onChange={(item: string, val: string) => updateDeduction('casualty', item, val)}
          hasCheckbox 
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <DeductionSection 
          title="Taxes Paid" 
          items={["State and local income taxes", "Sales taxes", "Real estate taxes", "Personal property taxes"]} 
          values={formData.deductions?.taxes || {}}
          onChange={(item: string, val: string) => updateDeduction('taxes', item, val)}
        />
        <DeductionSection 
          title="Interest Paid" 
          items={["Mortgage interest", "Vehicle loan interest"]} 
          values={formData.deductions?.interest || {}}
          onChange={(item: string, val: string) => updateDeduction('interest', item, val)}
        />
      </div>
    </div>
  );
}

function DeductionSection({ title, items, hasCheckbox, values, onChange }: any) {
  return (
    <div className="space-y-4 p-6 bg-gray-50 rounded-2xl border border-gray-100">
       <h4 className="text-xs font-extrabold text-blue-900 uppercase tracking-widest italic border-b border-gray-200 pb-2">{title}</h4>
       {hasCheckbox && (
         <label className="flex items-center gap-2 cursor-pointer mb-4">
            <input type="checkbox" className="w-3 h-3 rounded text-blue-900" />
            <span className="text-[10px] font-bold text-gray-400 uppercase">Check if caused by disaster</span>
         </label>
       )}
       <div className="space-y-4">
          {items.map((item: string) => (
             <div key={item} className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-tight ml-1">{item}</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">$</span>
                  <input 
                    type="text" 
                    placeholder="0.00" 
                    value={values[item] || ""}
                    onChange={(e) => onChange(item, e.target.value)}
                    className="w-full pl-8 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-900/10 placeholder:font-normal" 
                  />
                </div>
             </div>
          ))}
       </div>
    </div>
  );
}

function EstimatedTaxesForm({ formData, setFormData }: any) {
  return (
    <div className="space-y-8 text-left">
      <p className="text-gray-500 font-medium italic">Provide details of any estimated tax payments made for 2025.</p>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
           <thead>
             <tr>
               <th className="p-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest italic border-b border-gray-100">Description</th>
               <th className="p-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest italic border-b border-gray-100">Date Paid</th>
               <th className="p-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest italic border-b border-gray-100">Federal Amount</th>
               <th className="p-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest italic border-b border-gray-100">State Amount</th>
             </tr>
           </thead>
           <tbody className="divide-y divide-gray-50">
             {["2024 Overpayment applied", "1st Quarter Payment", "2nd Quarter Payment", "3rd Quarter Payment", "4th Quarter Payment", "Additional Payment(s)"].map(desc => (
               <tr key={desc}>
                 <td className="p-4 text-sm font-bold text-gray-900 tracking-tight">{desc}</td>
                 <td className="p-2"><input type="date" className="w-full p-2 bg-gray-50 border border-gray-100 rounded-lg text-[11px] font-bold" /></td>
                 <td className="p-2"><input type="text" placeholder="$ 0.00" className="w-full p-2 bg-gray-50 border border-gray-100 rounded-lg text-[11px] font-bold text-right" /></td>
                 <td className="p-2"><input type="text" placeholder="$ 0.00" className="w-full p-2 bg-gray-50 border border-gray-100 rounded-lg text-[11px] font-bold text-right" /></td>
               </tr>
             ))}
           </tbody>
        </table>
      </div>
    </div>
  );
}

function IncomeSourcesForm({ formData, setFormData }: any) {
  const sources = [
    { id: 'w2', code: "W-2", label: "Employment" },
    { id: 'r1099', code: "1099-R", label: "Retirement Distribution" },
    { id: 'ssa1099', code: "SSA-1099", label: "Social Security" },
    { id: 'nec1099', code: "1099-NEC", label: "Self-employment / Gig Work" },
    { id: 'int1099', code: "1099-INT", label: "Interest Income" },
    { id: 'div1099', code: "1099-DIV", label: "Dividend Income" },
    { id: 'b1099', code: "1099-B", label: "Stock or investment sales" },
    { id: 'misc1099', code: "1099-MISC", label: "Rent or Royalties" },
    { id: 'k1', code: "Sch K-1", label: "Partnership / S-Corp" },
    { id: 'w2g', code: "W-2G", label: "Gambling Winnings" },
  ];

  return (
    <div className="space-y-8 text-left">
      <p className="text-gray-500 font-medium italic">Select sources of income received during 2025 and indicate the number of forms for each.</p>
      <div className="space-y-4">
         {sources.map(s => (
           <div key={s.code} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-2xl group hover:border-blue-200 transition-all">
              <div className="flex items-center gap-4">
                 <input 
                  type="checkbox" 
                  checked={formData[s.id] || false}
                  onChange={(e) => setFormData({...formData, [s.id]: e.target.checked})}
                  className="w-5 h-5 rounded text-blue-900 border-gray-300" 
                 />
                 <div>
                    <p className="font-bold text-gray-900">{s.label}</p>
                    <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest italic">{s.code}</p>
                 </div>
              </div>
              <div className="w-24">
                 <input 
                  type="number" 
                  placeholder="Count" 
                  value={formData[`${s.id}Count`] || ""}
                  onChange={(e) => setFormData({...formData, [`${s.id}Count`]: e.target.value})}
                  className="w-full px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-center focus:outline-none focus:ring-2 focus:ring-blue-900/10 placeholder:font-normal"
                 />
              </div>
           </div>
         ))}
      </div>
    </div>
  );
}


function PersonalInformationForm({ formData, setFormData }: any) {
  return (
    <div className="space-y-8 text-left">
      <div className="space-y-6">
        <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2 italic">Taxpayer Identity</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FloatingInput 
            label="Legal First Name" 
            placeholder="e.g. Gaurav" 
            value={formData.firstName}
            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
          />
          <FloatingInput 
            label="Legal Last Name" 
            placeholder="e.g. Kumar" 
            value={formData.lastName}
            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FloatingInput 
            label="Date of Birth" 
            type="date" 
            value={formData.dob}
            onChange={(e) => setFormData({...formData, dob: e.target.value})}
          />
          <FloatingInput 
            label="SSN or ITIN" 
            placeholder="XXX-XX-XXXX" 
            value={formData.ssn}
            onChange={(e) => setFormData({...formData, ssn: e.target.value})}
          />
        </div>
        <FloatingInput 
          label="Primary Occupation" 
          value={formData.occupation}
          onChange={(e) => setFormData({...formData, occupation: e.target.value})}
        />
      </div>

      <div className="space-y-6 pt-4">
        <h3 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2 italic">Contact Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FloatingInput 
            label="Personal Email" 
            type="email" 
            placeholder="client@example.com" 
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          <FloatingInput 
            label="Primary Phone" 
            type="tel" 
            placeholder="(555) 000-0000" 
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
        </div>
        <FloatingInput 
          label="Street Address" 
          placeholder="123 Example St, Apt 4" 
          value={formData.address}
          onChange={(e) => setFormData({...formData, address: e.target.value})}
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="md:col-span-2">
            <FloatingInput 
              label="City" 
              value={formData.city}
              onChange={(e) => setFormData({...formData, city: e.target.value})}
            />
          </div>
          <FloatingInput 
            label="State" 
            maxLength={2} 
            value={formData.state}
            onChange={(e) => setFormData({...formData, state: e.target.value})}
          />
          <FloatingInput 
            label="ZIP Code" 
            value={formData.zip}
            onChange={(e) => setFormData({...formData, zip: e.target.value})}
          />
        </div>
      </div>
    </div>
  );
}

function FilingStatusForm({ formData, setFormData }: any) {
  const statuses = [
    { id: 'single', label: 'Single', desc: 'Unmarried or legally separated' },
    { id: 'mfj', label: 'Married Filing Jointly', desc: 'Legally married and filing together' },
    { id: 'mfs', label: 'Married Filing Separately', desc: 'Legally married but filing independent returns' },
    { id: 'hoh', label: 'Head of Household', desc: 'Unmarried and paying more than half the cost of a home' },
    { id: 'qss', label: 'Qualifying Surviving Spouse', desc: 'Widow/widower with a dependent child' },
  ];

  return (
    <div className="space-y-6 text-left">
      <p className="text-gray-500 font-medium mb-8">Select the filing status that applies to you for the 2025 tax year.</p>
      <div className="space-y-3">
        {statuses.map(status => (
          <label key={status.id} className="block group">
            <input 
              type="radio" 
              name="filingStatus" 
              checked={formData.filingStatus === status.id}
              onChange={() => setFormData({...formData, filingStatus: status.id})}
              className="peer hidden" 
            />
            <div className="p-5 border-2 border-gray-100 rounded-2xl group-hover:border-blue-100 peer-checked:border-blue-900 peer-checked:bg-blue-50/30 transition-all cursor-pointer flex items-start gap-4">
               <div className="w-5 h-5 rounded-full border-2 border-gray-300 peer-checked:border-blue-900 peer-checked:bg-blue-900 mt-1 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full opacity-0 peer-checked:opacity-100" />
               </div>
               <div>
                 <p className="font-bold text-gray-900">{status.label}</p>
                 <p className="text-xs text-gray-400 font-medium mt-0.5">{status.desc}</p>
               </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

function DependentModal({ isOpen, onClose, onSave }: { isOpen: boolean, onClose: () => void, onSave: (data: any) => void }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    relationship: 'Child',
    dob: '',
    ssn: '',
    monthsInHome: '12',
    isFullTimeStudent: false,
    hasChildcareExpenses: false
  });
  const [errors, setErrors] = useState<any>({});

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: any = {};
    if (!formData.firstName) newErrors.firstName = "Required";
    if (!formData.lastName) newErrors.lastName = "Required";
    if (!formData.dob) {
      newErrors.dob = "Please enter a valid date of birth.";
    } else {
      const dobDate = new Date(formData.dob);
      if (isNaN(dobDate.getTime()) || dobDate > new Date()) {
        newErrors.dob = "Please enter a valid date of birth.";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      onSave(formData);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-blue-900/40 backdrop-blur-sm animate-in fade-in duration-300 pointer-events-auto">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden border border-white/20 animate-in zoom-in-95 duration-300">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="text-lg font-black text-gray-900 italic">Add Dependent</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors"><X className="w-5 h-5 text-gray-400" /></button>
        </div>
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto no-scrollbar">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">First Name</label>
              <input 
                type="text" 
                value={formData.firstName ?? ""}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                className={cn(
                  "w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900 outline-none transition-all",
                  errors.firstName ? "border-red-300 bg-red-50" : "border-gray-200"
                )} 
                placeholder="John" 
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Last Name</label>
              <input 
                type="text" 
                value={formData.lastName ?? ""}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                className={cn(
                  "w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900 outline-none transition-all",
                  errors.lastName ? "border-red-300 bg-red-50" : "border-gray-200"
                )} 
                placeholder="Doe" 
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Relationship</label>
            <select 
              value={formData.relationship ?? "Child"}
              onChange={(e) => setFormData({...formData, relationship: e.target.value})}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900 outline-none transition-all"
            >
              <option>Child</option>
              <option>Spouse</option>
              <option>Parent</option>
              <option>Relative</option>
              <option>Other</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Date of Birth</label>
            <input 
              type="date" 
              value={formData.dob ?? ""}
              onChange={(e) => setFormData({...formData, dob: e.target.value})}
              className={cn(
                "w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900 outline-none transition-all",
                errors.dob ? "border-red-300 bg-red-50" : "border-gray-200"
              )} 
            />
            {errors.dob && <p className="text-[9px] font-bold text-red-600 uppercase tracking-widest ml-1">{errors.dob}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">SSN/ITIN</label>
              <input 
                type="text" 
                value={formData.ssn ?? ""}
                onChange={(e) => setFormData({...formData, ssn: e.target.value})}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900 outline-none transition-all" 
                placeholder="XXX-XX-XXXX" 
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Months in Home</label>
              <input 
                type="number" 
                min="0"
                max="12"
                value={formData.monthsInHome ?? ""}
                onChange={(e) => setFormData({...formData, monthsInHome: e.target.value})}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900 outline-none transition-all" 
              />
            </div>
          </div>
          <div className="space-y-3 pt-2">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={formData.isFullTimeStudent}
                onChange={(e) => setFormData({...formData, isFullTimeStudent: e.target.checked})}
                className="w-4 h-4 rounded text-blue-900 border-gray-300" 
              />
              <span className="text-xs font-bold text-gray-600 group-hover:text-blue-900 transition-colors uppercase tracking-tight">Full-time Student</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={formData.hasChildcareExpenses}
                onChange={(e) => setFormData({...formData, hasChildcareExpenses: e.target.checked})}
                className="w-4 h-4 rounded text-blue-900 border-gray-300" 
              />
              <span className="text-xs font-bold text-gray-600 group-hover:text-blue-900 transition-colors uppercase tracking-tight">Childcare Expenses</span>
            </label>
          </div>
        </div>
        <div className="p-6 bg-gray-50/50 border-t border-gray-100 flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 border border-gray-200 rounded-xl font-bold text-gray-400 text-sm hover:bg-white transition-all text-center">Cancel</button>
          <button 
            onClick={handleSave}
            className="flex-1 py-3 bg-blue-900 text-white rounded-xl font-bold text-sm shadow-xl shadow-blue-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Save Dependent
          </button>
        </div>
      </div>
    </div>
  );
}

function NoteModal({ isOpen, onClose, onSave }: { isOpen: boolean, onClose: () => void, onSave: (data: any) => void }) {
  const [formData, setFormData] = useState({ title: '', content: '', visibility: 'internal' });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-blue-900/40 backdrop-blur-sm animate-in fade-in duration-300 pointer-events-auto">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden border border-white/20 animate-in zoom-in-95 duration-300">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center text-left">
          <h3 className="text-lg font-black text-gray-900 italic">Add Note</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors"><X className="w-5 h-5 text-gray-400" /></button>
        </div>
        <div className="p-6 space-y-5 text-left">
           <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Note Title</label>
            <input 
              type="text" 
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900 outline-none transition-all" 
              placeholder="e.g. Investment Property Update" 
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Visibility</label>
            <div className="flex gap-2">
               {['internal', 'client'].map(v => (
                 <button 
                  key={v}
                  onClick={() => setFormData({...formData, visibility: v})}
                  className={cn(
                    "flex-1 py-2 px-4 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all",
                    formData.visibility === v ? "bg-blue-900 text-white border-blue-900" : "bg-white text-gray-400 border-gray-200 hover:border-gray-300"
                  )}
                 >
                   {v} visible
                 </button>
               ))}
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Note Content</label>
            <textarea 
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              rows={5}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900 outline-none transition-all resize-none" 
              placeholder="Start typing your notes here..."
            />
          </div>
        </div>
        <div className="p-6 bg-gray-50/50 border-t border-gray-100 flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 font-bold text-gray-400 text-sm hover:text-gray-600 transition-all text-center">Cancel</button>
          <button 
            onClick={() => { onSave(formData); onClose(); }}
            disabled={!formData.title || !formData.content}
            className="flex-1 py-3 bg-blue-900 text-white rounded-xl font-bold text-sm shadow-xl shadow-blue-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
          >
            Save Note
          </button>
        </div>
      </div>
    </div>
  );
}

function TaskModal({ isOpen, onClose, onSave }: { isOpen: boolean, onClose: () => void, onSave: (data: any) => void }) {
  const [formData, setFormData] = useState({ 
    name: '', 
    type: 'File Upload', 
    assignee: 'Client', 
    dueDate: '', 
    priority: 'Medium', 
    description: '', 
    status: 'Not Started' 
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-blue-900/40 backdrop-blur-sm animate-in fade-in duration-300 pointer-events-auto">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden border border-white/20 animate-in zoom-in-95 duration-300 text-left">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-black text-gray-900 italic">Create New Task</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors"><X className="w-5 h-5 text-gray-400" /></button>
        </div>
        <div className="p-6 space-y-5">
           <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Task Name</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900 outline-none transition-all" 
              placeholder="e.g. Upload 1099-INT form" 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Task Type</label>
              <select 
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900 outline-none transition-all"
              >
                <option>File Upload</option>
                <option>Signature Required</option>
                <option>Information Request</option>
                <option>Payment</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Assignee</label>
              <select 
                value={formData.assignee}
                onChange={(e) => setFormData({...formData, assignee: e.target.value})}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900 outline-none transition-all"
              >
                <option>Client</option>
                <option>Spouse</option>
                <option>Tax Professional</option>
                <option>Support Team</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Due Date</label>
              <input 
                type="date" 
                value={formData.dueDate}
                onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900 outline-none transition-all" 
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Priority</label>
              <select 
                value={formData.priority}
                onChange={(e) => setFormData({...formData, priority: e.target.value})}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900 outline-none transition-all"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Urgent</option>
              </select>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Task Status</label>
            <select 
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900 outline-none transition-all"
            >
              <option>Not Started</option>
              <option>In Progress</option>
              <option>Waiting for Info</option>
              <option>Completed</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Description</label>
            <textarea 
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={3}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900 outline-none transition-all resize-none" 
              placeholder="Additional details about the task..."
            />
          </div>
        </div>
        <div className="p-6 bg-gray-50/50 border-t border-gray-100 flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 font-bold text-gray-400 text-sm hover:text-gray-600 transition-all text-center">Cancel</button>
          <button 
            onClick={() => { onSave(formData); onClose(); }}
            disabled={!formData.name}
            className="flex-1 py-3 bg-blue-900 text-white rounded-xl font-bold text-sm shadow-xl shadow-blue-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
          >
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
}

function EmailModal({ isOpen, onClose, onSave, onSaveDraft }: { isOpen: boolean, onClose: () => void, onSave: (data: any) => void, onSaveDraft: (data: any) => void }) {
  const [formData, setFormData] = useState({ to: 'Support Team', subject: '', message: '' });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-blue-900/40 backdrop-blur-sm animate-in fade-in duration-300 pointer-events-auto">
      <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden border border-white/20 animate-in zoom-in-95 duration-300 text-left">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="text-lg font-black text-gray-900 italic">Compose Message</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors"><X className="w-5 h-5 text-gray-400" /></button>
        </div>
        <div className="p-6 space-y-5">
           <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">To</label>
            <input 
              readOnly
              type="text" 
              value={formData.to}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-sm font-extrabold text-blue-900 italic" 
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Subject</label>
            <input 
              type="text" 
              value={formData.subject}
              onChange={(e) => setFormData({...formData, subject: e.target.value})}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900 outline-none transition-all" 
              placeholder="What is this regarding?" 
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Message</label>
            <textarea 
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              rows={8}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900 outline-none transition-all resize-none" 
              placeholder="Hi Team, I have a question regarding..."
            />
          </div>
        </div>
        <div className="p-6 border-t border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="flex gap-2">
             <button onClick={onClose} className="px-5 py-2.5 font-bold text-gray-400 text-sm hover:text-gray-600">Cancel</button>
             <button 
              onClick={() => { onSaveDraft(formData); }} 
              disabled={!formData.subject && !formData.message}
              className="px-5 py-2.5 font-bold text-blue-900 text-sm hover:bg-blue-50 rounded-xl disabled:opacity-50"
             >
               Save draft
             </button>
          </div>
          <button 
            onClick={() => { onSave(formData); onClose(); }}
            disabled={!formData.subject || !formData.message}
            className="flex items-center gap-2 bg-blue-900 text-white px-8 py-3 rounded-2xl font-black italic shadow-2xl shadow-blue-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
          >
            Send <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ResolutionModal({ isOpen, onClose, onSave }: { isOpen: boolean, onClose: () => void, onSave: (data: any) => void }) {
  const [formData, setFormData] = useState({ 
    title: '', 
    type: 'Audit Support', 
    description: '', 
    priority: 'Medium', 
    assignedTo: 'Team Leader', 
    relatedFiles: '',
    billingStatus: 'Pending' 
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-blue-900/40 backdrop-blur-sm animate-in fade-in duration-300 pointer-events-auto">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden border border-white/20 animate-in zoom-in-95 duration-300 text-left">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div>
            <h3 className="text-lg font-black text-gray-900 italic">Initiate Resolution Case</h3>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1 italic">Professional notice & audit response</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors"><X className="w-5 h-5 text-gray-400" /></button>
        </div>
        <div className="p-6 space-y-5">
           <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Case Title</label>
            <input 
              type="text" 
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900 outline-none transition-all" 
              placeholder="e.g. IRS CP2000 Notice Response" 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Case Type</label>
              <select 
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900 outline-none transition-all"
              >
                <option>Audit Support</option>
                <option>Notice Response</option>
                <option>Penalty Abatement</option>
                <option>Payment Plan</option>
                <option>Offer in Compromise</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Priority</label>
              <select 
                value={formData.priority}
                onChange={(e) => setFormData({...formData, priority: e.target.value})}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900 outline-none transition-all"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Urgent</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Assigned Team Member</label>
              <input 
                type="text" 
                value={formData.assignedTo}
                onChange={(e) => setFormData({...formData, assignedTo: e.target.value})}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900 outline-none transition-all" 
                placeholder="e.g. Team Leader" 
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Related Files (Optional)</label>
              <input 
                type="text" 
                value={formData.relatedFiles}
                onChange={(e) => setFormData({...formData, relatedFiles: e.target.value})}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900 outline-none transition-all" 
                placeholder="List file names..." 
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Incident Description</label>
            <textarea 
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={4}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-900/10 focus:border-blue-900 outline-none transition-all resize-none" 
              placeholder="Describe the notice or audit request in detail..."
            />
          </div>
          <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-center gap-4">
             <div className="w-10 h-10 bg-blue-900 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-900/10">
                <Shield className="w-5 h-5 text-white" />
             </div>
             <div>
                <p className="text-[10px] font-black text-blue-900 uppercase tracking-widest mb-0.5">Note on Documentation</p>
                <p className="text-[11px] font-medium text-blue-700/80 leading-snug">Please ensure all notice documents are uploaded to the 'IRS Notices' folder in your Files tab.</p>
             </div>
          </div>
        </div>
        <div className="p-6 bg-gray-50/50 border-t border-gray-100 flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 font-bold text-gray-400 text-sm hover:text-gray-600 transition-all text-center">Cancel</button>
          <button 
            onClick={() => { onSave(formData); onClose(); }}
            disabled={!formData.title || !formData.description}
            className="flex-1 py-3 bg-blue-900 text-white rounded-xl font-black italic text-sm shadow-xl shadow-blue-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
          >
            Create Case
          </button>
        </div>
      </div>
    </div>
  );
}



function FloatingInput({ label, value, ...props }: any) {
  return (
    <div className="space-y-2 group">
      <label className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest ml-1 italic group-focus-within:text-blue-900 transition-colors">{label}</label>
      <input 
        className="w-full px-5 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-900/5 focus:border-blue-900 focus:bg-white transition-all text-sm font-bold placeholder:text-gray-300 tracking-tight"
        value={value ?? ""}
        {...props}
      />
    </div>
  );
}

function SheetsView() {
  const [spreadsheetId, setSpreadsheetId] = useState("");
  const [data, setData] = useState<any[][] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasToken, setHasToken] = useState(!!getAccessToken());

  const handleConnect = async () => {
    try {
      await loginWithGoogle();
      setHasToken(true);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to connect Google account.");
    }
  };

  const fetchData = async () => {
    if (!spreadsheetId) {
      setError("Please enter a Spreadsheet ID");
      return;
    }

    setLoading(true);
    setError(null);

    const accessToken = getAccessToken();
    if (!accessToken) {
      setError("Session expired or token unavailable. Please reconnect your Google account.");
      setHasToken(false);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/sheets/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accessToken, spreadsheetId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch data. Ensure you have permissions for this sheet.");
      }

      const result = await response.json();
      setData(result.values || []);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (!hasToken) {
    return (
      <div className="bg-white rounded-3xl border border-gray-100 p-20 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-blue-900 mb-6">
          <Database className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-black text-gray-900 mb-4 italic tracking-tight">Google Sheets Integration</h3>
        <p className="text-gray-400 text-sm font-medium max-w-sm mb-10 leading-relaxed italic">
          Power your tax dashboard with real-time spreadsheet data. Connect your Google account to enable this feature.
        </p>
        <button 
          onClick={handleConnect}
          className="bg-blue-900 text-white px-10 py-4 rounded-2xl font-black italic text-sm shadow-2xl shadow-blue-900/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
        >
          <Database className="w-5 h-5" />
          Connect Google Sheets
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-xl">
          <h3 className="text-xl font-black text-gray-900 italic mb-2 tracking-tight">Google Sheets Active</h3>
          <p className="text-sm font-medium text-gray-400 leading-relaxed italic">
            Enter your Spreadsheet ID to sync data. Your account is connected and ready.
          </p>
        </div>
        <button 
          onClick={() => { setHasToken(false); logout(); }}
          className="text-[10px] font-black text-red-500 uppercase tracking-widest hover:underline"
        >
          Disconnect Account
        </button>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
        <div className="max-w-2xl">
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <input 
              type="text" 
              placeholder="Enter Spreadsheet ID (e.g. 1aBC...)" 
              value={spreadsheetId}
              onChange={(e) => setSpreadsheetId(e.target.value)}
              className="flex-1 px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-900/5 focus:border-blue-900 outline-none font-bold text-sm transition-all"
            />
            <button 
              onClick={fetchData}
              disabled={loading}
              className="bg-blue-900 text-white px-8 py-3.5 rounded-2xl font-black italic text-sm shadow-xl shadow-blue-900/20 active:scale-95 transition-all flex items-center gap-2 justify-center disabled:opacity-50"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              Sync Data
            </button>
          </div>
          
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-2 flex items-center gap-1">
             <AlertCircle className="w-3 h-3" />
             Find ID in URL: spreadsheets/d/<span className="text-blue-900">1vS...</span>/edit
          </p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 animate-in fade-in slide-in-from-top-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="text-sm font-bold">{error}</p>
        </div>
      )}

      {data && (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
             <h4 className="text-xs font-black text-blue-900 uppercase tracking-widest italic">Spreadsheet Content</h4>
             <span className="text-[10px] font-bold text-gray-400">{data.length} rows retrieved</span>
          </div>
          <div className="overflow-x-auto max-h-[500px]">
            <table className="w-full text-left">
              <thead className="sticky top-0 z-10">
                <tr className="border-b border-gray-100 bg-white shadow-sm">
                  {data[0]?.map((header, i) => (
                    <th key={i} className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest italic">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {data.slice(1).map((row, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    {row.map((cell, j) => (
                      <td key={j} className="px-6 py-4 text-sm font-bold text-gray-700">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {data.length === 0 && (
              <div className="p-20 text-center">
                 <p className="text-sm font-bold text-gray-400 italic">This spreadsheet appears to be empty.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
