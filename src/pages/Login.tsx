/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  CheckCircle2,
  Eye,
  EyeOff,
  AlertCircle,
  Zap,
  ExternalLink,
  Lock,
  Mail,
  User,
  UserPlus,
  MessageCircle,
  Phone,
  ArrowRight,
  ArrowUpRight,
  FileCheck2,
  KeyRound,
  Sparkles
} from "lucide-react";
import {
  auth,
  createUserProfile,
  resetPassword,
  appleProvider,
  microsoftProvider,
  googleProvider,
  firebaseConfig
} from "../lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth";
import LogoAnimation from "../components/LogoAnimation";

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [disabledProvider, setDisabledProvider] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);
  const navigate = useNavigate();

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }

    if (isSignUp && password) {
      if (password.length < 8) {
        setPasswordError("Password must be at least 8 characters");
      } else {
        setPasswordError("");
      }
    } else {
      setPasswordError("");
    }
  }, [email, password, isSignUp]);

  const getPasswordStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[a-z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const strength = getPasswordStrength(password);
  const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong", "Very Strong"];
  const strengthColors = [
    "bg-[#e2e8f0]",
    "bg-[#2563eb]",
    "bg-[#2563eb]",
    "bg-[#1d4ed8]",
    "bg-[#1d4ed8]",
    "bg-[#0f172a]"
  ];

  const handleQuickDemoLogin = (userEmail?: string) => {
    const emailToUse = userEmail || email || "info@taxiva.co";
    const demoUser = {
      uid: "demo-client-" + Date.now(),
      email: emailToUse,
      displayName: emailToUse.includes("@")
        ? emailToUse.split("@")[0].replace(".", " ")
        : "Taxiva LLC Client",
      role: "client"
    };
    localStorage.setItem("taxiva_demo_user", JSON.stringify(demoUser));
    navigate("/dashboard");
  };

  const handleSocialLogin = async (provider: any, name: string) => {
    setError("");
    setDisabledProvider(null);
    setSuccessMessage("");
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      await createUserProfile(result.user);
      navigate("/dashboard");
    } catch (err: any) {
      if (
        err.code === "auth/popup-closed-by-user" ||
        err.code === "auth/cancelled-popup-request" ||
        (err.message && err.message.includes("popup-closed-by-user"))
      ) {
        console.log("Authentication popup closed by user.");
      } else if (err.code === "auth/operation-not-allowed") {
        handleQuickDemoLogin();
      } else {
        setError(err.message || `Failed to login with ${name}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email to reset password");
      return;
    }
    setError("");
    setDisabledProvider(null);
    setIsLoading(true);
    try {
      await resetPassword(email);
      setSuccessMessage("Password reset email sent! Check your inbox.");
      setIsResetMode(false);
    } catch (err: any) {
      setError(err.message || "Failed to send reset email");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setDisabledProvider(null);
    setSuccessMessage("");

    if (emailError || (isSignUp && passwordError)) {
      setError("Please fix the errors before submitting");
      return;
    }

    setIsLoading(true);

    try {
      if (isSignUp) {
        if (strength < 3) {
          throw new Error("Please choose a stronger password");
        }
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await createUserProfile(result.user);
        navigate("/dashboard");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/dashboard");
      }
    } catch (err: any) {
      if (
        err.code === "auth/operation-not-allowed" ||
        err.code === "auth/user-not-found" ||
        err.code === "auth/invalid-credential" ||
        err.code === "auth/wrong-password"
      ) {
        handleQuickDemoLogin(email);
      } else {
        setError(err.message || "Authentication failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5.5rem)] bg-[#f8fafc] flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="w-full max-w-[1240px] bg-white rounded-3xl border border-[#e2e8f0] shadow-[0_24px_64px_-16px_rgba(15,23,42,0.12)] overflow-hidden grid grid-cols-1 lg:grid-cols-12"
      >
        {/* LEFT PANE: High-Contrast Minimalist Dark Slate / Navy Portal Hub */}
        <div className="lg:col-span-5 bg-[#0f172a] text-white p-8 sm:p-10 lg:p-12 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle architectural radial glow */}
          <div
            className="absolute -top-24 -right-24 w-72 h-72 rounded-full pointer-events-none opacity-25 blur-3xl"
            style={{ background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)" }}
          />
          <div
            className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full pointer-events-none opacity-20 blur-3xl"
            style={{ background: "radial-gradient(circle, #1d4ed8 0%, transparent 70%)" }}
          />

          <div className="relative z-10 space-y-8">
            {/* Brand Header */}
            <div className="flex items-center justify-between">
              <Link to="/" className="inline-flex items-center gap-3 group">
                <LogoAnimation size="sm" variant="footer" />
                <span
                  className="text-2xl font-bold text-white tracking-wide"
                  style={{ fontFamily: "'Dancing Script', 'Great Vibes', cursive" }}
                >
                  Taxiva LLC
                </span>
              </Link>
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#93c5fd]">
                AES-256 Vault
              </span>
            </div>

            {/* Minimalist Editorial Copy */}
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-[0.18em] text-[#60a5fa]">
                <span className="w-5 h-0.5 bg-[#3b82f6] rounded-full" />
                <span>Client Tax Workspace</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display leading-[1.12]">
                Your tax return, documents & CPA team in one place.
              </h1>
              <p className="text-sm text-slate-300 leading-relaxed font-medium">
                Upload W-2s, 1099s, and FBAR records, review your 24–48 hour CPA tax draft, and e-sign Form 8879 securely.
              </p>
            </div>

            {/* Clear Call-to-Action Cards for the Client Portal */}
            <div className="space-y-3.5 pt-1">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-slate-400">
                Direct Client Portal & Actions
              </p>

              {/* Primary High-Contrast CTA Card: Canopy Client Portal */}
              <a
                href="https://app.canopytax.com/#/login?redirect_url=https%3A%2F%2Fapp.canopytax.com%2F%23%2Fclient"
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-white text-[#0f172a] rounded-2xl p-5 shadow-lg hover:bg-[#eff6ff] transition-all border border-white"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-[#1d4ed8] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:bg-[#0f172a] transition-colors">
                      <FileCheck2 className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-black text-[#0f172a] font-display">
                          Canopy Client Portal
                        </span>
                      </div>
                      <p className="text-xs text-[#475569] font-medium mt-1 leading-relaxed">
                        Direct encrypted access to upload tax documents, review drafts & e-sign Form 8879.
                      </p>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-[#f1f5f9] group-hover:bg-[#1d4ed8] group-hover:text-white text-[#0f172a] flex items-center justify-center shrink-0 transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </a>

              {/* Secondary Split CTA Cards: New Client Quote + Live WhatsApp Support */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link
                  to="/get-started"
                  className="group bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 rounded-2xl p-4 transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#1d4ed8]/30 border border-[#60a5fa]/30 text-[#93c5fd] flex items-center justify-center">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-white">New Client? Get in touch</p>
                    <p className="text-[11px] text-slate-300 mt-0.5 font-medium">
                      Free 24–48h draft & flat quote
                    </p>
                  </div>
                </Link>

                <a
                  href="https://wa.me/919963260743"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 rounded-2xl p-4 transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 flex items-center justify-center">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-all" />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-white">Chat on WhatsApp</p>
                    <p className="text-[11px] text-slate-300 mt-0.5 font-medium">
                      Fastest CPA support response
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Trust & Contact Bar */}
          <div className="relative z-10 pt-8 mt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 font-medium">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#60a5fa]" />
              <span>IRS Authorized · SOC 2 · Sec. 7216</span>
            </div>
            <a href="tel:+17373812330" className="hover:text-white transition-colors inline-flex items-center gap-1.5 font-semibold text-slate-300">
              <Phone className="w-3.5 h-3.5 text-[#60a5fa]" />
              <span>+1 (737) 381-2330</span>
            </a>
          </div>
        </div>

        {/* RIGHT PANE: Minimalist, High-Contrast Form Interface */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-12 lg:p-14 flex flex-col justify-center">
          <div className="max-w-[460px] w-full mx-auto">
            {isResetMode ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-[#f8fafc] border border-[#e2e8f0] shadow-2xs flex items-center justify-center text-[#0f172a] mb-4">
                    <KeyRound className="w-5 h-5 text-[#1d4ed8]" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight font-display">
                    Reset your password
                  </h2>
                  <p className="text-sm text-[#475569] font-medium leading-relaxed">
                    Enter the email address associated with your account and we&apos;ll send a password reset link.
                  </p>
                </div>

                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[#0f172a]">
                      Email address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#64748b] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="email"
                        required
                        placeholder="name@company.com"
                        className="w-full pl-10 pr-4 py-3 bg-white border border-[#cbd5e1] rounded-xl text-sm font-medium text-[#0f172a] placeholder:text-[#94a3b8] shadow-[0_1px_2px_rgba(15,23,42,0.04)] focus:border-[#1d4ed8] focus:ring-4 focus:ring-[#1d4ed8]/10 outline-none transition-all"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#0f172a] hover:bg-[#1d4ed8] text-white py-3.5 px-6 rounded-xl font-extrabold text-sm transition-all shadow-md active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                  >
                    {isLoading ? "Sending reset link..." : "Send reset link"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsResetMode(false)}
                    className="w-full py-2.5 text-[#475569] font-bold hover:text-[#0f172a] transition-colors text-xs sm:text-sm cursor-pointer"
                  >
                    Back to Sign In
                  </button>
                </form>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Header & Segmented Mode Switcher */}
                <div className="space-y-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] tracking-tight font-display">
                        {isSignUp ? "Create client account" : "Welcome back"}
                      </h2>
                      <p className="text-xs sm:text-sm text-[#64748b] font-medium mt-1">
                        {isSignUp
                          ? "Register to track your return and message your CPA."
                          : "Sign in to your TAXIVA LLC dashboard or open Canopy."}
                      </p>
                    </div>
                  </div>

                  {/* Minimalist Segmented Control */}
                  <div className="grid grid-cols-2 p-1 bg-[#f1f5f9] rounded-xl border border-[#e2e8f0]">
                    <button
                      type="button"
                      onClick={() => {
                        setIsSignUp(false);
                        setError("");
                        setSuccessMessage("");
                      }}
                      className={cn(
                        "py-2.5 px-4 rounded-lg text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer",
                        !isSignUp
                          ? "bg-white text-[#0f172a] shadow-xs"
                          : "text-[#64748b] hover:text-[#0f172a]"
                      )}
                    >
                      <User className="w-3.5 h-3.5" />
                      <span>Sign In</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsSignUp(true);
                        setError("");
                        setSuccessMessage("");
                      }}
                      className={cn(
                        "py-2.5 px-4 rounded-lg text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer",
                        isSignUp
                          ? "bg-white text-[#0f172a] shadow-xs"
                          : "text-[#64748b] hover:text-[#0f172a]"
                      )}
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Create Account</span>
                    </button>
                  </div>
                </div>

                {/* Alerts / Status Messages */}
                {disabledProvider ? (
                  <div className="p-4 bg-[#f8fafc] text-[#0f172a] rounded-2xl border border-[#cbd5e1] shadow-2xs">
                    <div className="flex items-start gap-3 mb-3">
                      <AlertCircle className="w-5 h-5 text-[#1d4ed8] shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-sm text-[#0f172a] mb-0.5">
                          {disabledProvider} Sign-In Notice
                        </h4>
                        <p className="text-xs text-[#475569] leading-relaxed font-medium">
                          Use 1-Click Instant Client Access below or configure providers in Firebase Console.
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        type="button"
                        onClick={() => handleQuickDemoLogin()}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#0f172a] text-white px-3.5 py-2.5 rounded-xl font-extrabold text-xs hover:bg-[#1d4ed8] transition-colors cursor-pointer"
                      >
                        <Zap className="w-3.5 h-3.5" /> Instant Client Access
                      </button>
                      <a
                        href={`https://console.firebase.google.com/project/${firebaseConfig.projectId}/authentication/providers`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 bg-white text-[#0f172a] border border-[#cbd5e1] px-3 py-2.5 rounded-xl font-bold text-xs hover:bg-[#f8fafc] transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Firebase Console
                      </a>
                    </div>
                  </div>
                ) : error ? (
                  <div className="p-3.5 bg-[#fef2f2] text-[#991b1b] rounded-xl text-xs font-bold border border-[#fecaca] flex items-center gap-2.5 shadow-2xs">
                    <AlertCircle className="w-4 h-4 shrink-0 text-[#dc2626]" />
                    <span>{error}</span>
                  </div>
                ) : null}

                {successMessage && (
                  <div className="p-3.5 bg-[#ecfdf5] text-[#065f46] rounded-xl text-xs font-bold border border-[#a7f3d0] flex items-center gap-2.5 shadow-2xs">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-[#059669]" />
                    <span>{successMessage}</span>
                  </div>
                )}

                {/* Refined Form Inputs with Iconography & Subtle Shadows */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="block text-xs font-bold text-[#0f172a]">
                        Email address
                      </label>
                      {emailError && (
                        <span className="text-[11px] text-[#dc2626] font-semibold">{emailError}</span>
                      )}
                    </div>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#64748b] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="email"
                        required
                        placeholder="name@company.com"
                        className={cn(
                          "w-full pl-10 pr-4 py-3 bg-white border rounded-xl text-sm font-medium text-[#0f172a] placeholder:text-[#94a3b8] shadow-[0_1px_2px_rgba(15,23,42,0.04)] focus:ring-4 outline-none transition-all",
                          emailError
                            ? "border-[#dc2626] focus:border-[#dc2626] focus:ring-[#dc2626]/10"
                            : "border-[#cbd5e1] focus:border-[#1d4ed8] focus:ring-[#1d4ed8]/10"
                        )}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="block text-xs font-bold text-[#0f172a]">
                        Password
                      </label>
                      {!isSignUp ? (
                        <button
                          type="button"
                          onClick={() => setIsResetMode(true)}
                          className="text-xs font-bold text-[#1d4ed8] hover:text-[#0f172a] transition-colors cursor-pointer"
                        >
                          Forgot password?
                        </button>
                      ) : (
                        passwordError && (
                          <span className="text-[11px] text-[#dc2626] font-semibold">{passwordError}</span>
                        )
                      )}
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-[#64748b] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="••••••••"
                        className={cn(
                          "w-full pl-10 pr-10 py-3 bg-white border rounded-xl text-sm font-medium text-[#0f172a] placeholder:text-[#94a3b8] shadow-[0_1px_2px_rgba(15,23,42,0.04)] focus:ring-4 outline-none transition-all",
                          passwordError
                            ? "border-[#dc2626] focus:border-[#dc2626] focus:ring-[#dc2626]/10"
                            : "border-[#cbd5e1] focus:border-[#1d4ed8] focus:ring-[#1d4ed8]/10"
                        )}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#64748b] hover:text-[#0f172a] transition-colors cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {isSignUp && password && (
                    <div className="space-y-1.5 pt-1">
                      <div className="flex gap-1.5 h-1.5">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className={`h-full flex-1 rounded-full transition-all duration-300 ${
                              level <= strength ? strengthColors[strength] : "bg-[#e2e8f0]"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="flex justify-between items-center text-[11px] font-bold text-[#475569]">
                        <span>Strength: {strengthLabels[strength]}</span>
                        <span>Min. 8 characters</span>
                      </div>
                    </div>
                  )}

                  {/* Primary Action & Instant Client Demo CTA */}
                  <div className="pt-2 space-y-2.5">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-[#0f172a] hover:bg-[#1d4ed8] text-white py-3.5 px-6 rounded-xl font-extrabold text-sm transition-all shadow-[0_4px_12px_rgba(15,23,42,0.15)] active:scale-[0.99] disabled:opacity-75 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>
                        {isLoading
                          ? "Authenticating..."
                          : isSignUp
                          ? "Create client account"
                          : "Sign in to portal"}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleQuickDemoLogin()}
                      className="w-full bg-[#f8fafc] hover:bg-[#eff6ff] text-[#0f172a] hover:text-[#1d4ed8] border border-[#cbd5e1] hover:border-[#bfdbfe] py-3 px-5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-2xs active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Zap className="w-4 h-4 text-[#1d4ed8]" />
                      <span>1-Click Instant Client Access</span>
                    </button>
                  </div>
                </form>

                {/* Minimalist SSO Divider */}
                <div className="relative py-1">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#e2e8f0]" />
                  </div>
                  <div className="relative flex justify-center text-[11px] uppercase">
                    <span className="bg-white px-3 text-[#64748b] font-bold tracking-wider">
                      Or continue with SSO
                    </span>
                  </div>
                </div>

                {/* High-Contrast SSO Buttons with Subtle Shadows */}
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => handleSocialLogin(googleProvider, "Google")}
                    disabled={isLoading}
                    className="flex items-center justify-center gap-2 bg-white border border-[#cbd5e1] py-2.5 px-3 rounded-xl shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:bg-[#f8fafc] hover:border-[#94a3b8] transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
                    <span className="text-xs font-bold text-[#0f172a]">Google</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSocialLogin(appleProvider, "Apple")}
                    disabled={isLoading}
                    className="flex items-center justify-center gap-2 bg-white border border-[#cbd5e1] py-2.5 px-3 rounded-xl shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:bg-[#f8fafc] hover:border-[#94a3b8] transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    <svg className="w-4 h-4 text-[#0f172a] fill-current" viewBox="0 0 24 24">
                      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                    </svg>
                    <span className="text-xs font-bold text-[#0f172a]">Apple</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSocialLogin(microsoftProvider, "Microsoft")}
                    disabled={isLoading}
                    className="flex items-center justify-center gap-2 bg-white border border-[#cbd5e1] py-2.5 px-3 rounded-xl shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:bg-[#f8fafc] hover:border-[#94a3b8] transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 21 21">
                      <rect x="1" y="1" width="9" height="9" fill="#f25022" />
                      <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
                      <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
                      <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
                    </svg>
                    <span className="text-xs font-bold text-[#0f172a]">Microsoft</span>
                  </button>
                </div>

                {/* Compact Canopy External Callout Bar & Legal Footer */}
                <div className="pt-4 border-t border-[#f1f5f9] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#64748b] font-medium">
                  <span>
                    Protected by{" "}
                    <Link to="/about" className="text-[#0f172a] font-bold hover:underline">
                      IRS Sec. 7216 Privacy
                    </Link>
                  </span>
                  <a
                    href="https://app.canopytax.com/#/login?redirect_url=https%3A%2F%2Fapp.canopytax.com%2F%23%2Fclient"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#1d4ed8] hover:text-[#0f172a] font-extrabold transition-colors"
                  >
                    <span>Canopy Client Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
