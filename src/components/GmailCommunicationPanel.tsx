/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Mail, Send, RefreshCw, Search, Plus, Trash2, ShieldCheck, 
  CheckCircle2, AlertCircle, FileText, ExternalLink, Paperclip, 
  Lock, ArrowRight, UserCheck, Inbox, Clock
} from "lucide-react";
import { 
  fetchGmailMessages, 
  fetchGmailProfile, 
  sendGmailEmail, 
  createGmailDraft, 
  trashGmailMessage, 
  GmailMessageSummary 
} from "../lib/gmail";
import { getAccessToken, loginWithGoogle, auth } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { cn } from "../lib/utils";

interface GmailCommunicationPanelProps {
  onAttachToFiles?: (file: { name: string; category: string; status: string }) => void;
}

export default function GmailCommunicationPanel({ onAttachToFiles }: GmailCommunicationPanelProps) {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [messages, setMessages] = useState<GmailMessageSummary[]>([]);
  const [activeMessageId, setActiveMessageId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTab, setFilterTab] = useState<"inbox" | "tax" | "drafts">("inbox");

  // Compose Modal State
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [composeTo, setComposeTo] = useState("");
  const [composeSubject, setComposeSubject] = useState("");
  const [composeBody, setComposeBody] = useState("");
  const [isSending, setIsSending] = useState(false);

  // Confirmation Modal State for Sending / Deleting
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    type: "send" | "trash";
    title: string;
    description: string;
    actionLabel: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    type: "send",
    title: "",
    description: "",
    actionLabel: "",
    onConfirm: () => {},
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (u) {
        setUserEmail(u.email || u.displayName || "Google User");
        const token = getAccessToken();
        if (token) {
          setAccessToken(token);
          setIsConnected(true);
          loadGmailMessages(token, "inbox");
        }
      } else {
        setIsConnected(false);
        setAccessToken(null);
      }
    });
    return () => unsub();
  }, []);

  const handleConnectGmail = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const res = await loginWithGoogle();
      if (res?.accessToken) {
        setAccessToken(res.accessToken);
        setIsConnected(true);
        setUserEmail(res.user.email || "Google Account");
        await loadGmailMessages(res.accessToken, filterTab);
      }
    } catch (err: any) {
      console.error("Gmail authorization error:", err);
      setErrorMsg(err.message || "Failed to authorize Gmail account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadGmailMessages = async (token: string, tab = filterTab, query = searchQuery) => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      let q = query;
      if (tab === "tax") {
        q = query ? `${query} (tax OR receipt OR form OR 1040 OR 1099 OR W2)` : "tax OR receipt OR form OR 1040 OR 1099 OR W2 OR IRS OR CPA";
      } else if (tab === "drafts") {
        q = "is:draft";
      }

      const list = await fetchGmailMessages(token, q, 20);
      setMessages(list);
      if (list.length > 0 && !activeMessageId) {
        setActiveMessageId(list[0].id);
      }
    } catch (err: any) {
      console.error("Failed to fetch Gmail emails:", err);
      setErrorMsg(err.message || "Unable to fetch emails from Gmail API");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessToken) {
      loadGmailMessages(accessToken, filterTab, searchQuery);
    }
  };

  const handlePromptSendEmail = () => {
    if (!composeTo || !composeSubject || !composeBody) {
      alert("Please fill out To, Subject, and Body fields before sending.");
      return;
    }

    setConfirmDialog({
      isOpen: true,
      type: "send",
      title: "Send Email via Gmail?",
      description: `This action will send an outbound email from your connected Gmail address (${userEmail || "me"}) directly to ${composeTo}.`,
      actionLabel: "Confirm & Send Email",
      onConfirm: executeSendEmail,
    });
  };

  const executeSendEmail = async () => {
    if (!accessToken) return;
    setIsSending(true);
    setConfirmDialog(prev => ({ ...prev, isOpen: false }));
    try {
      await sendGmailEmail(accessToken, composeTo, composeSubject, composeBody);
      setIsComposeOpen(false);
      setComposeTo("");
      setComposeSubject("");
      setComposeBody("");
      alert("Email sent successfully via Gmail!");
      loadGmailMessages(accessToken);
    } catch (err: any) {
      alert("Failed to send email: " + err.message);
    } finally {
      setIsSending(false);
    }
  };

  const handlePromptTrash = (msgId: string, subject: string) => {
    setConfirmDialog({
      isOpen: true,
      type: "trash",
      title: "Move Email to Gmail Trash?",
      description: `Are you sure you want to move "${subject}" to your Gmail Trash bin? You can recover it from your Gmail Trash within 30 days.`,
      actionLabel: "Move to Trash",
      onConfirm: () => executeTrashEmail(msgId),
    });
  };

  const executeTrashEmail = async (msgId: string) => {
    if (!accessToken) return;
    setConfirmDialog(prev => ({ ...prev, isOpen: false }));
    try {
      await trashGmailMessage(accessToken, msgId);
      setMessages(prev => prev.filter(m => m.id !== msgId));
      if (activeMessageId === msgId) {
        setActiveMessageId(null);
      }
    } catch (err: any) {
      alert("Failed to move email to trash: " + err.message);
    }
  };

  const handleSaveDraft = async () => {
    if (!accessToken) return;
    try {
      await createGmailDraft(accessToken, composeTo, composeSubject, composeBody);
      alert("Draft saved to your Gmail account!");
      setIsComposeOpen(false);
    } catch (err: any) {
      alert("Failed to save draft: " + err.message);
    }
  };

  const activeMsg = messages.find(m => m.id === activeMessageId);

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-sm flex flex-col overflow-hidden min-h-[650px]">
      {/* Header Bar */}
      <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center font-black shadow-xs">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-gray-900 tracking-tight">Gmail Inbox Integration</h3>
              <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-900 text-[10px] font-black uppercase tracking-wider border border-blue-200/80">
                Live Google Workspace
              </span>
            </div>
            <p className="text-xs text-gray-500 font-medium">
              {isConnected 
                ? `Connected as ${userEmail}` 
                : "Connect your Google Account to sync CPA communications and tax documents directly."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          {isConnected ? (
            <>
              <button 
                onClick={() => accessToken && loadGmailMessages(accessToken)}
                disabled={isLoading}
                className="p-2.5 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                title="Sync with Gmail"
              >
                <RefreshCw className={cn("w-3.5 h-3.5 text-gray-500", isLoading && "animate-spin")} />
                <span className="hidden sm:inline">Refresh</span>
              </button>

              <button 
                onClick={() => setIsComposeOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-blue-900 text-white hover:bg-blue-800 text-xs font-extrabold flex items-center gap-2 transition-all shadow-md shadow-blue-900/10 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Compose Email</span>
              </button>
            </>
          ) : (
            <button 
              onClick={handleConnectGmail}
              disabled={isLoading}
              className="gsi-material-button w-full sm:w-auto px-4 py-2 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-xs font-bold shadow-xs cursor-pointer flex items-center justify-center gap-2"
            >
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-4 h-4 shrink-0">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
              </svg>
              <span>Connect Gmail Account</span>
            </button>
          )}
        </div>
      </div>

      {!isConnected ? (
        <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-gray-50/30">
          <div className="w-16 h-16 rounded-3xl bg-red-50 text-red-600 flex items-center justify-center mb-4 shadow-sm">
            <Mail className="w-8 h-8" />
          </div>
          <h4 className="text-lg font-black text-gray-900 mb-2">Connect Your Gmail Account</h4>
          <p className="text-xs text-gray-500 max-w-md mb-6 leading-relaxed font-medium">
            Grant permission to securely view tax emails, receive official CPA notifications, and import tax document attachments directly into your Taxiva LLC vault.
          </p>
          <button 
            onClick={handleConnectGmail}
            disabled={isLoading}
            className="px-6 py-3 rounded-2xl bg-blue-900 text-white hover:bg-blue-800 text-xs font-black shadow-lg shadow-blue-900/10 flex items-center gap-2 transition-all cursor-pointer"
          >
            {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4 text-amber-400" />}
            <span>Sign in with Google & Authorize Gmail</span>
          </button>
          {errorMsg && (
            <p className="text-xs font-bold text-rose-600 mt-4 bg-rose-50 px-4 py-2 rounded-xl border border-rose-200">
              {errorMsg}
            </p>
          )}
        </div>
      ) : (
        <div className="flex-1 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-100 min-h-[550px]">
          {/* Thread List Sidebar */}
          <div className="w-full md:w-80 lg:w-96 flex flex-col bg-gray-50/20 shrink-0">
            {/* Search & Filter Bar */}
            <div className="p-4 border-b border-gray-100 space-y-3 bg-white">
              <form onSubmit={handleSearchSubmit} className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search Gmail..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-900/10"
                />
              </form>

              <div className="flex items-center gap-1.5">
                {[
                  { id: "inbox", label: "All Inbox", icon: Inbox },
                  { id: "tax", label: "Tax & Receipts", icon: FileText },
                  { id: "drafts", label: "Drafts", icon: Clock },
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setFilterTab(tab.id as any);
                        if (accessToken) loadGmailMessages(accessToken, tab.id as any);
                      }}
                      className={cn(
                        "flex-1 py-1.5 px-2 rounded-lg text-[10px] font-extrabold flex items-center justify-center gap-1 border transition-all cursor-pointer",
                        filterTab === tab.id
                          ? "bg-blue-900 text-white border-blue-900 shadow-xs"
                          : "bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100"
                      )}
                    >
                      <Icon className="w-3 h-3" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Email List */}
            <div className="flex-1 overflow-y-auto max-h-[500px] md:max-h-none divide-y divide-gray-100 no-scrollbar">
              {isLoading && messages.length === 0 ? (
                <div className="p-8 text-center text-gray-400">
                  <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-blue-900" />
                  <p className="text-xs font-bold">Syncing Gmail Inbox...</p>
                </div>
              ) : messages.length === 0 ? (
                <div className="p-8 text-center text-gray-400 space-y-2">
                  <Mail className="w-8 h-8 mx-auto text-gray-300" />
                  <p className="text-xs font-extrabold text-gray-700">No messages found</p>
                  <p className="text-[10px]">Try clearing search or switching filter tabs.</p>
                </div>
              ) : (
                messages.map((msg) => {
                  const isSelected = activeMessageId === msg.id;
                  return (
                    <button
                      key={msg.id}
                      onClick={() => setActiveMessageId(msg.id)}
                      className={cn(
                        "w-full p-4 text-left transition-all flex flex-col gap-1.5 cursor-pointer relative",
                        isSelected ? "bg-white border-l-4 border-l-blue-900 shadow-2xs" : "hover:bg-gray-50/80 bg-white/50"
                      )}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-extrabold text-gray-900 truncate max-w-[180px]">
                          {msg.from.replace(/<.*>/, '').trim() || msg.from}
                        </span>
                        <span className="text-[10px] font-bold text-gray-400 shrink-0">
                          {msg.date}
                        </span>
                      </div>

                      <p className={cn("text-xs truncate", msg.unread ? "font-black text-blue-950" : "font-bold text-gray-700")}>
                        {msg.subject}
                      </p>

                      <p className="text-[11px] text-gray-400 line-clamp-1 font-medium">
                        {msg.snippet}
                      </p>

                      <div className="flex items-center gap-1.5 mt-1">
                        {msg.unread && (
                          <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-900 text-[9px] font-black uppercase">Unread</span>
                        )}
                        {msg.hasAttachments && (
                          <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 text-[9px] font-black flex items-center gap-0.5">
                            <Paperclip className="w-2.5 h-2.5" /> Attachment
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Email Detail Viewer */}
          <div className="flex-1 flex flex-col bg-white">
            {activeMsg ? (
              <div className="flex-1 flex flex-col h-full">
                {/* Detail Header */}
                <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50/30">
                  <div className="min-w-0">
                    <h3 className="text-base font-extrabold text-gray-900 tracking-tight leading-snug mb-1">
                      {activeMsg.subject}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                      <span>From: <strong className="text-gray-900">{activeMsg.from}</strong></span>
                      <span>•</span>
                      <span>{activeMsg.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button 
                      onClick={() => handlePromptTrash(activeMsg.id, activeMsg.subject)}
                      className="p-2 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all cursor-pointer"
                      title="Delete email"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 flex-1 overflow-y-auto space-y-4 text-xs text-gray-800 leading-relaxed font-medium">
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 whitespace-pre-wrap font-sans">
                    {activeMsg.bodyPlain || activeMsg.snippet}
                  </div>

                  {/* Actions Bar inside email */}
                  <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {onAttachToFiles && activeMsg.hasAttachments && (
                        <button
                          onClick={() => {
                            if (onAttachToFiles) {
                              onAttachToFiles({
                                name: `Attachment_${activeMsg.subject.slice(0, 20)}.pdf`,
                                category: "Gmail Tax Attachment",
                                status: "Pending CPA Review"
                              });
                              alert("Attachment saved to your Tax Vault in the 'Files' tab!");
                            }
                          }}
                          className="px-3 py-2 rounded-xl bg-amber-50 text-amber-900 border border-amber-200/90 text-xs font-extrabold flex items-center gap-1.5 hover:bg-amber-100 transition-all cursor-pointer"
                        >
                          <Paperclip className="w-3.5 h-3.5 text-amber-700" />
                          <span>Import Attachment to Tax Files</span>
                        </button>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        setComposeTo(activeMsg.from.match(/<([^>]+)>/)?.[1] || activeMsg.from);
                        setComposeSubject(`Re: ${activeMsg.subject}`);
                        setIsComposeOpen(true);
                      }}
                      className="px-4 py-2 rounded-xl bg-blue-900 text-white text-xs font-extrabold flex items-center gap-1.5 hover:bg-blue-800 transition-all cursor-pointer shadow-xs"
                    >
                      <Send className="w-3 h-3" />
                      <span>Reply via Gmail</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-12 text-center text-gray-400">
                <Mail className="w-12 h-12 text-gray-200 mb-3" />
                <p className="text-sm font-extrabold text-gray-700">Select an email to read</p>
                <p className="text-xs text-gray-400 max-w-xs mt-1">
                  Choose a thread from your synced Gmail inbox on the left.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Compose Email Modal */}
      {isComposeOpen && (
        <div className="fixed inset-0 bg-blue-950/40 backdrop-blur-xs flex items-center justify-center p-4 z-[100] animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 space-y-4">
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-900" />
                <h4 className="font-extrabold text-gray-900 text-sm">Compose Outbound Gmail</h4>
              </div>
              <button 
                onClick={() => setIsComposeOpen(false)}
                className="text-gray-400 hover:text-gray-600 font-extrabold text-xs"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 block mb-1">To</label>
                <input 
                  type="email" 
                  placeholder="recipient@example.com"
                  value={composeTo}
                  onChange={(e) => setComposeTo(e.target.value)}
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-900/10"
                />
              </div>

              <div>
                <label className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 block mb-1">Subject</label>
                <input 
                  type="text" 
                  placeholder="Tax Return Query / Document Confirmation"
                  value={composeSubject}
                  onChange={(e) => setComposeSubject(e.target.value)}
                  className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-900/10"
                />
              </div>

              <div>
                <label className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 block mb-1">Message</label>
                <textarea 
                  rows={5}
                  placeholder="Type your tax message here..."
                  value={composeBody}
                  onChange={(e) => setComposeBody(e.target.value)}
                  className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-blue-900/10"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={handleSaveDraft}
                className="px-4 py-2 rounded-xl border border-gray-200 text-gray-700 text-xs font-extrabold hover:bg-gray-50 transition-all cursor-pointer"
              >
                Save Draft
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsComposeOpen(false)}
                  className="px-4 py-2 rounded-xl text-gray-500 text-xs font-bold hover:bg-gray-50 transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handlePromptSendEmail}
                  disabled={isSending}
                  className="px-5 py-2 rounded-xl bg-blue-900 text-white text-xs font-extrabold hover:bg-blue-800 transition-all shadow-md shadow-blue-900/10 flex items-center gap-1.5 cursor-pointer"
                >
                  {isSending ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                  <span>Send Email</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mandatory User Confirmation Modal for Mutating/Sending Actions */}
      {confirmDialog.isOpen && (
        <div className="fixed inset-0 bg-blue-950/50 backdrop-blur-xs flex items-center justify-center p-4 z-[120] animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 space-y-4">
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 font-bold",
                confirmDialog.type === "trash" ? "bg-rose-50 text-rose-600" : "bg-blue-50 text-blue-900"
              )}>
                {confirmDialog.type === "trash" ? <Trash2 className="w-5 h-5" /> : <Send className="w-5 h-5" />}
              </div>
              <div>
                <h4 className="font-extrabold text-gray-900 text-base">{confirmDialog.title}</h4>
                <p className="text-[10px] font-extrabold uppercase tracking-wider text-amber-600">User Confirmation Required</p>
              </div>
            </div>

            <p className="text-xs text-gray-600 font-medium leading-relaxed bg-gray-50 p-3.5 rounded-2xl border border-gray-100">
              {confirmDialog.description}
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setConfirmDialog(prev => ({ ...prev, isOpen: false }))}
                className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 text-xs font-extrabold hover:bg-gray-50 transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDialog.onConfirm}
                className={cn(
                  "px-5 py-2 rounded-xl text-white text-xs font-extrabold transition-all shadow-md cursor-pointer",
                  confirmDialog.type === "trash" ? "bg-rose-600 hover:bg-rose-700 shadow-rose-600/10" : "bg-blue-900 hover:bg-blue-800 shadow-blue-900/10"
                )}
              >
                {confirmDialog.actionLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
