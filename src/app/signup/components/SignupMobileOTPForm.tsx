"use client";
import { useState } from "react";

export default function SignupMobileOTPForm() {
  const [step, setStep] = useState<"mobile" | "otp">("mobile");
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Placeholder for sending OTP (replace with Firebase logic later)
  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!mobile.match(/^\d{10,}$/)) {
      setError("Please enter a valid mobile number.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
    }, 1000); // Simulate async OTP send
  };

  // Placeholder for verifying OTP (replace with Firebase logic later)
  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!otp.match(/^\d{4,6}$/)) {
      setError("Please enter a valid OTP.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Simulate success
      alert("Signup successful!");
    }, 1000);
  };

  return (
    <form
      className="w-full flex flex-col gap-4"
      onSubmit={step === "mobile" ? handleSendOTP : handleVerifyOTP}
    >
      {step === "mobile" ? (
        <>
          <label className="text-white font-semibold text-sm">
            Mobile Number
          </label>
          <input
            type="tel"
            placeholder="Enter your mobile number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="px-4 py-2 rounded bg-black/60 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded mt-4 transition"
            disabled={loading}
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        </>
      ) : (
        <>
          <label className="text-white font-semibold text-sm">Enter OTP</label>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="px-4 py-2 rounded bg-black/60 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded mt-4 transition"
            disabled={loading}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
          <button
            type="button"
            className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 rounded mt-2 transition"
            onClick={() => setStep("mobile")}
            disabled={loading}
          >
            Change Mobile Number
          </button>
        </>
      )}
      {error && <span className="text-red-400 text-sm mt-2">{error}</span>}
    </form>
  );
}
