"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
// ✅ CORRECT: Import the initialized auth instance directly from your config file
import { auth } from "./lib/firebase";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult, // It's good practice to import types
} from "firebase/auth";

export default function LoginMobileOTPForm() {
  const [step, setStep] = useState<"mobile" | "otp">("mobile");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null);
  const router = useRouter();

  // The complex useEffect for initialization has been removed as it's no longer needed.

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!mobile.match(/^\d{10}$/)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setLoading(true);

    try {
      // Clear up previous verifier if it exists to avoid conflicts
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear();
      }

      // ✅ SIMPLIFIED: Create the verifier using the imported auth instance
      const recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
        },
      );

      recaptchaVerifierRef.current = recaptchaVerifier;

      const formattedNumber = "+91" + mobile;
      const confirmation = await signInWithPhoneNumber(
        auth,
        formattedNumber,
        recaptchaVerifier,
      );

      setConfirmationResult(confirmation);
      setStep("otp");
    } catch (err: any) {
      console.error("Send OTP Error:", err);

      let errorMessage = "Failed to send OTP. ";
      if (err.code === "auth/too-many-requests") {
        errorMessage = "Too many requests. Please try again in a few minutes.";
      } else if (err.code === "auth/invalid-phone-number") {
        errorMessage = "Invalid phone number format.";
      } else if (err.code === "auth/network-request-failed") {
        errorMessage = "Network error. Please check your internet connection.";
      } else {
        errorMessage += "Please try again later.";
      }
      setError(errorMessage);
    }

    setLoading(false);
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!otp.match(/^\d{6}$/)) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    if (!confirmationResult) {
      setError("OTP session expired. Please request a new OTP.");
      setStep("mobile");
      return;
    }

    setLoading(true);

    try {
      await confirmationResult.confirm(otp);
      // On success, redirect the user
      router.push("/home");
    } catch (err: any) {
      console.error("Verify OTP Error:", err);
      let errorMessage = "Invalid OTP. Please try again.";
      if (err.code === "auth/invalid-verification-code") {
        errorMessage = "Invalid OTP. Please check and try again.";
      } else if (err.code === "auth/code-expired") {
        errorMessage = "OTP has expired. Please request a new one.";
        setStep("mobile");
      }
      setError(errorMessage);
    }
    setLoading(false);
  };

  const handleChangeMobile = () => {
    if (recaptchaVerifierRef.current) {
      recaptchaVerifierRef.current.clear();
    }
    setConfirmationResult(null);
    setOtp("");
    setError("");
    setStep("mobile");
  };

  return (
    <>
      <div id="recaptcha-container" className="mb-4"></div>
      <form
        className="w-full flex flex-col gap-6"
        onSubmit={step === "mobile" ? handleSendOTP : handleVerifyOTP}
      >
        {step === "mobile" ? (
          <>
            <div>
              <label className="block text-white font-semibold text-sm mb-2">
                Mobile Number
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm font-medium">
                  +91
                </span>
                <input
                  type="tel"
                  placeholder="Enter 10-digit mobile number"
                  value={mobile}
                  onChange={(e) =>
                    setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
                  }
                  className="pl-12 pr-4 py-3 w-full rounded-lg bg-black/60 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  disabled={loading}
                  maxLength={10}
                />
              </div>
              <p className="text-gray-400 text-xs mt-1">
                We'll send you a verification code via SMS
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-red-800 disabled:to-red-900 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition duration-200"
              disabled={loading || mobile.length !== 10}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  Sending OTP...
                </span>
              ) : (
                "Send OTP"
              )}
            </button>
          </>
        ) : (
          <>
            <div>
              <label className="block text-white font-semibold text-sm mb-2">
                Enter Verification Code
              </label>
              <p className="text-gray-400 text-sm mb-3">Sent to +91{mobile}</p>
              <input
                type="text"
                placeholder="000000"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                className="px-4 py-4 w-full rounded-lg bg-black/60 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl tracking-[0.5em] font-mono transition"
                disabled={loading}
                maxLength={6}
                autoFocus
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-red-800 disabled:to-red-900 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition duration-200"
              disabled={loading || otp.length !== 6}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  Verifying...
                </span>
              ) : (
                "Verify Code"
              )}
            </button>

            <button
              type="button"
              className="w-full bg-transparent border border-gray-600 hover:bg-gray-800/50 disabled:bg-gray-600/20 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition duration-200"
              onClick={handleChangeMobile}
              disabled={loading}
            >
              Change Mobile Number
            </button>
          </>
        )}

        {error && (
          <div className="bg-red-900/30 border border-red-600/50 rounded-lg px-4 py-3 backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <span className="text-red-400 text-xl">⚠️</span>
              <p className="text-red-400 text-sm leading-relaxed flex-1">
                {error}
              </p>
            </div>
          </div>
        )}
      </form>
    </>
  );
}
