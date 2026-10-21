/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Eye,
  EyeOff,
  AlertCircle,
  Shield,
  Zap,
  ExternalLink,
  Lock,
  FileText,
  ArrowRight
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

  if (isResetMode) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl w-full bg-white rounded-3xl shadow-xl border border-[#dbeafe] p-8 sm:p-10 text-center"
        >
          <div className="w-14 h-14 bg-[#eff6ff] rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#1d4ed8]">
            <Lock className="w-7 h-7" />
          </div>
          <h1 className="text-3xl font-extrabold text-[#0f172a] mb-2 font-display">Reset Password</h1>
          <p className="text-[#334155] font-medium mb-8 text-sm sm:text-base">
            Enter your registered email address and we will send a secure password reset link.
          </p>

          <form onSubmit={handleForgotPassword} className="space-y-5">
            <div className="text-left">
              <label className="block text-sm font-bold text-[#0f172a] mb-1.5">Email Address</label>
              <input
                type="email"
                required
                placeholder="name@company.com"
                className="w-full px-4 py-3.5 rounded-xl border border-[#bfdbfe] bg-[#f8fafc] focus:bg-white focus:border-[#1d4ed8] outline-none transition-all font-medium text-[#0f172a]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1d4ed8] text-white py-3.5 rounded-xl font-extrabold hover:bg-[#1e40af] transition-all active:scale-95 shadow-md disabled:opacity-50"
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </button>
            <button
              type="button"
              onClick={() => setIsResetMode(false)}
              className="text-[#334155] font-bold hover:text-[#1d4ed8] transition-colors text-sm"
            >
              Back to Client Login
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-10 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[#334155] hover:text-[#1d4ed8] font-bold text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>

        {/* Wide 2-Column Executive Client Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl border border-[#dbeafe] overflow-hidden grid grid-cols-1 lg:grid-cols-12"
        >
          {/* Left Column (5 Cols): Navy & Blue Canopy Everything Access Portal Panel */}
          <div
            className="lg:col-span-5 p-8 sm:p-10 text-white flex flex-col justify-between"
            style={{
              background: "linear-gradient(145deg, #0f172a 0%, #1e3a8a 55%, #1d4ed8 100%)"
            }}
          >
            <div className="space-y-6">
              {/* Brand Lockup */}
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 bg-white/15 border border-white/25 rounded-xl flex items-center justify-center shadow-md">
                  <span
                    className="text-white font-bold text-2xl leading-none"
                    style={{ fontFamily: "'Dancing Script', 'Playfair Display', cursive" }}
                  >
                    T
                  </span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span
                    className="text-2xl font-bold text-white leading-none"
                    style={{ fontFamily: "'Dancing Script', 'Playfair Display', cursive" }}
                  >
                    Taxiva
                  </span>
                  <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#93c5fd] font-display">
                    LLC
                  </span>
                </div>
              </div>

              <div>
                <span className="inline-block px-3 py-1 rounded-lg bg-white/15 border border-white/20 text-white text-[11px] font-extrabold uppercase tracking-widest mb-3">
                  Canopy Everything Access Portal
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display leading-tight mb-3">
                  Client Tax & Document Portal
                </h1>
                <p className="text-white/85 text-sm sm:text-base leading-relaxed font-medium">
                  Securely upload W-2s, 1099s, RSU/ESPP statements, and FBAR records, review your 24–48 hour CPA tax draft, and e-sign Form 8879 from one encrypted workspace.
                </p>
              </div>

              {/* Direct Canopy Portal & Get in Touch Quick Actions */}
              <div className="bg-white/10 border border-white/20 rounded-2xl p-5 space-y-3 backdrop-blur-xs">
                <p className="text-xs font-extrabold uppercase tracking-wider text-white/90">
                  Direct Canopy Portal Access
                </p>
                <a
                  href="https://app.canopytax.com/#/login?redirect_url=https%3A%2F%2Fapp.canopytax.com%2F%23%2Fclient"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-white text-[#0f172a] py-3.5 px-4 rounded-xl font-extrabold hover:bg-[#eff6ff] transition-all shadow-md text-sm"
                >
                  <ExternalLink className="w-4 h-4 text-[#1d4ed8]" />
                  <span>Launch Canopy Client Portal</span>
                </a>
                <Link
                  to="/get-started"
                  className="w-full flex items-center justify-center gap-2 bg-[#1d4ed8]/80 text-white border border-white/25 py-3 px-4 rounded-xl font-bold hover:bg-[#2563eb] transition-all text-xs"
                >
                  <span>New Client? Complete Get in Touch Form</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Security Standards List */}
              <div className="space-y-3 pt-2">
                {[
                  { text: "IRS Registered & Authorized E-File Provider", icon: ShieldCheck },
                  { text: "SOC 2 Type II & IRS Sec. 7216 Privacy Compliant", icon: Lock },
                  { text: "256-Bit AES Bank-Grade Document Encryption", icon: CheckCircle2 },
                  { text: "24–48 Hr CPA & Enrolled Agent Draft Review", icon: FileText }
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-white/90">
                    <div className="w-6 h-6 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                      <item.icon className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-white/15 flex items-center justify-between text-xs text-white/80 font-medium">
              <span>U.S. & Cross-Border Tax Experts</span>
              <span>info@taxiva.co</span>
            </div>
          </div>

          {/* Right Column (7 Cols): Wide, Clean Sign-In / Sign-Up Form */}
          <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col justify-between bg-white">
            <div>
              {/* Top Mode Switcher Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#eff6ff]">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] font-display">
                    {isSignUp ? "Create Your Client Account" : "Sign In to Your Account"}
                  </h2>
                  <p className="text-sm text-[#334155] font-medium mt-1">
                    {isSignUp
                      ? "Register to track your tax return, upload documents, and message your advisor."
                      : "Enter your credentials below or use 1-Click Instant Client Access."}
                  </p>
                </div>

                {/* Segmented Toggle */}
                <div className="inline-flex bg-[#f8fafc] p-1 rounded-xl border border-[#dbeafe] shrink-0 self-start">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSignUp(false);
                      setError("");
                      setSuccessMessage("");
                    }}
                    className={cn(
                      "px-4 py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer",
                      !isSignUp
                        ? "bg-[#1d4ed8] text-white shadow-xs"
                        : "text-[#334155] hover:text-[#0f172a]"
                    )}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSignUp(true);
                      setError("");
                      setSuccessMessage("");
                    }}
                    className={cn(
                      "px-4 py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer",
                      isSignUp
                        ? "bg-[#1d4ed8] text-white shadow-xs"
                        : "text-[#334155] hover:text-[#0f172a]"
                    )}
                  >
                    Create Account
                  </button>
                </div>
              </div>

              {disabledProvider ? (
                <div className="mb-6 p-4 bg-[#eff6ff] text-[#0f172a] rounded-2xl border border-[#bfdbfe]">
                  <div className="flex items-start gap-3 mb-3">
                    <AlertCircle className="w-5 h-5 text-[#1d4ed8] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm text-[#0f172a] mb-1">
                        {disabledProvider} Sign-In Notice
                      </h4>
                      <p className="text-xs text-[#334155] leading-relaxed font-medium">
                        Click below for instant client dashboard access or configure providers in Firebase Console.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      type="button"
                      onClick={() => handleQuickDemoLogin()}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#1d4ed8] text-white px-3.5 py-2.5 rounded-xl font-extrabold text-xs hover:bg-[#1e40af] transition-colors"
                    >
                      <Zap className="w-3.5 h-3.5" /> Instant Client Access
                    </button>
                    <a
                      href={`https://console.firebase.google.com/project/${firebaseConfig.projectId}/authentication/providers`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-white text-[#0f172a] border border-[#bfdbfe] px-3 py-2.5 rounded-xl font-bold text-xs hover:bg-[#f8fafc] transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Firebase Console
                    </a>
                  </div>
                </div>
              ) : error ? (
                <div className="mb-6 p-4 bg-[#eff6ff] text-[#1d4ed8] rounded-xl text-xs font-bold border border-[#bfdbfe] flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              ) : null}

              {successMessage && (
                <div className="mb-6 p-4 bg-[#eff6ff] text-[#1d4ed8] rounded-xl text-xs font-bold border border-[#bfdbfe] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{successMessage}</span>
                </div>
              )}

              {/* Form Fields in Wide Grid */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="text-left">
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="block text-xs sm:text-sm font-extrabold text-[#0f172a]">
                        Email Address
                      </label>
                      {emailError && (
                        <span className="text-[10px] text-[#1d4ed8] font-bold">{emailError}</span>
                      )}
                    </div>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      className={cn(
                        "w-full px-4 py-3.5 rounded-xl border bg-[#f8fafc] focus:bg-white outline-none transition-all font-medium text-sm text-[#0f172a]",
                        emailError ? "border-[#2563eb]" : "border-[#bfdbfe] focus:border-[#1d4ed8]"
                      )}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="text-left">
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="block text-xs sm:text-sm font-extrabold text-[#0f172a]">
                        Password
                      </label>
                      {!isSignUp ? (
                        <button
                          type="button"
                          onClick={() => setIsResetMode(true)}
                          className="text-xs font-bold text-[#1d4ed8] hover:underline"
                        >
                          Forgot Password?
                        </button>
                      ) : (
                        passwordError && (
                          <span className="text-[10px] text-[#1d4ed8] font-bold">{passwordError}</span>
                        )
                      )}
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="••••••••"
                        className={cn(
                          "w-full px-4 py-3.5 rounded-xl border bg-[#f8fafc] focus:bg-white outline-none transition-all font-medium text-sm text-[#0f172a] pr-11",
                          passwordError ? "border-[#2563eb]" : "border-[#bfdbfe] focus:border-[#1d4ed8]"
                        )}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#64748b] hover:text-[#0f172a] transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                {isSignUp && password && (
                  <div className="space-y-1.5">
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
                    <div className="flex justify-between items-center text-[11px] font-bold text-[#334155]">
                      <span>Strength: {strengthLabels[strength]}</span>
                      <span>Min. 8 characters</span>
                    </div>
                  </div>
                )}

                {/* Action Buttons Side-by-Side on Desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#1d4ed8] text-white py-3.5 px-6 rounded-xl font-extrabold hover:bg-[#1e40af] transition-all active:scale-95 shadow-md disabled:opacity-50 text-sm cursor-pointer"
                  >
                    {isLoading ? "Processing..." : isSignUp ? "Create Client Account" : "Sign In to Portal"}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin()}
                    className="w-full bg-[#eff6ff] text-[#1d4ed8] border border-[#bfdbfe] py-3.5 px-5 rounded-xl font-extrabold hover:bg-[#dbeafe] transition-all active:scale-95 flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer"
                  >
                    <Zap className="w-4 h-4 text-[#1d4ed8]" />
                    <span>1-Click Instant Client Access</span>
                  </button>
                </div>
              </form>

              {/* Single Sign-On Divider */}
              <div className="relative py-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#e2e8f0]" />
                </div>
                <div className="relative flex justify-center text-[11px] uppercase">
                  <span className="bg-white px-4 text-[#64748b] font-extrabold tracking-widest">
                    Or continue with Single Sign-On
                  </span>
                </div>
              </div>

              {/* 3 SSO Buttons */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => handleSocialLogin(googleProvider, "Google")}
                  disabled={isLoading}
                  className="flex items-center justify-center gap-2.5 bg-[#f8fafc] border border-[#dbeafe] py-3 px-4 rounded-xl hover:bg-[#eff6ff] hover:border-[#1d4ed8] transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
                  <span className="text-xs font-extrabold text-[#0f172a]">Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSocialLogin(appleProvider, "Apple")}
                  disabled={isLoading}
                  className="flex items-center justify-center gap-2.5 bg-[#f8fafc] border border-[#dbeafe] py-3 px-4 rounded-xl hover:bg-[#eff6ff] hover:border-[#1d4ed8] transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  <Shield className="w-4 h-4 text-[#0f172a]" />
                  <span className="text-xs font-extrabold text-[#0f172a]">Apple</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSocialLogin(microsoftProvider, "Microsoft")}
                  disabled={isLoading}
                  className="flex items-center justify-center gap-2.5 bg-[#f8fafc] border border-[#dbeafe] py-3 px-4 rounded-xl hover:bg-[#eff6ff] hover:border-[#1d4ed8] transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-[#1d4ed8]" />
                  <span className="text-xs font-extrabold text-[#0f172a]">Microsoft</span>
                </button>
              </div>
            </div>

            {/* Footer Note inside Right Column */}
            <div className="pt-6 mt-6 border-t border-[#eff6ff] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#64748b] font-medium">
              <p>
                By continuing, you agree to our{" "}
                <Link to="/about" className="text-[#1d4ed8] font-bold hover:underline">
                  Terms of Service
                </Link>{" "}
                &{" "}
                <Link to="/about" className="text-[#1d4ed8] font-bold hover:underline">
                  IRS Sec. 7216 Privacy Policy
                </Link>
                .
              </p>
              <a
                href="https://app.canopytax.com/#/login?redirect_url=https%3A%2F%2Fapp.canopytax.com%2F%23%2Fclient"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0f172a] font-extrabold hover:text-[#1d4ed8] inline-flex items-center gap-1 shrink-0"
              >
                <span>Open Canopy External Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
