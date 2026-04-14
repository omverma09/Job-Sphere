import { useState, useRef, useEffect } from "react";
import { Button, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api/axios";

const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 30; // seconds

const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const tempId = location.state?.tempId;
  const email = location.state?.email ?? "your email";

  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [countdown, setCountdown] = useState(RESEND_COOLDOWN);
  const inputRefs = useRef([]);

  // Redirect if arrived without a session
  useEffect(() => {
    if (!tempId) navigate("/register", { replace: true });
  }, [tempId, navigate]);

  // Resend cooldown timer
  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const handleDigitChange = (index, value) => {
    // Allow only digits
    const digit = value.replace(/\D/g, "").slice(-1);
    const updated = [...digits];
    updated[index] = digit;
    setDigits(updated);
    if (error) setError("");

    // Auto-advance
    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;
    const updated = Array(OTP_LENGTH).fill("");
    pasted.split("").forEach((ch, i) => { updated[i] = ch; });
    setDigits(updated);
    // Focus last filled or next empty
    const nextEmpty = updated.findIndex((d) => !d);
    const focusIdx = nextEmpty === -1 ? OTP_LENGTH - 1 : nextEmpty;
    inputRefs.current[focusIdx]?.focus();
  };

  const handleVerify = async () => {
    const otp = digits.join("");
    if (otp.length < OTP_LENGTH) {
      setError("Please enter the complete 6-digit OTP.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const { data } = await API.post("/auth/verify-otp", { tempId, otp });

      // Store session and redirect
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      const ROLE_ROUTES = {
        recruiter: "/recruiter/dashboard",
        user: "/student/dashboard",
        instructor: "/instructor/dashboard",
      };
      navigate(ROLE_ROUTES[data.user.role] ?? "/", { replace: true });

    } catch (err) {
      setError(err.response?.data?.message || "Verification failed. Please try again.");
      setDigits(Array(OTP_LENGTH).fill(""));
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setError("");
    setSuccess("");

    try {
      await API.post("/auth/resend-otp", { tempId });
      setCountdown(RESEND_COOLDOWN);
      setDigits(Array(OTP_LENGTH).fill(""));
      inputRefs.current[0]?.focus();
      setSuccess("A new OTP has been sent to your email.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend OTP. Please try again.");
    } finally {
      setResending(false);
    }
  };

  if (!tempId) return null;

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-50 px-4"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="bg-white rounded-2xl shadow-md p-10 w-full max-w-md text-center">
        {/* Icon */}
        <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-1">Check your email</h1>
        <p className="text-sm text-gray-500 mb-7">
          We sent a 6-digit code to <span className="font-medium text-gray-700">{email}</span>
        </p>

        {/* Error / Success banners */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-5 text-sm text-left">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-5 text-sm text-left">
            {success}
          </div>
        )}

        {/* 6-box OTP input */}
        <div className="flex justify-center gap-3 mb-6" onPaste={handlePaste}>
          {digits.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (inputRefs.current[i] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleDigitChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              disabled={loading}
              className={`
                w-11 h-12 text-center text-xl font-semibold rounded-lg border-2 outline-none transition-colors
                ${digit ? "border-blue-500 bg-blue-50" : "border-gray-300"}
                focus:border-blue-500 focus:bg-blue-50
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            />
          ))}
        </div>

        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={handleVerify}
          disabled={loading || digits.join("").length < OTP_LENGTH}
          sx={{ py: 1.4, borderRadius: 2, textTransform: "none", fontSize: 16, mb: 2 }}
        >
          {loading ? <CircularProgress size={22} color="inherit" /> : "Verify Email"}
        </Button>

        {/* Resend */}
        <p className="text-sm text-gray-500">
          Didn&apos;t receive the code?{" "}
          {countdown > 0 ? (
            <span className="text-gray-400">Resend in {countdown}s</span>
          ) : (
            <button
              onClick={handleResend}
              disabled={resending}
              className="text-blue-600 font-medium hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {resending ? "Sending..." : "Resend OTP"}
            </button>
          )}
        </p>

        <p className="text-xs text-gray-400 mt-4">
          Wrong email?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-blue-500 hover:underline"
          >
            Go back
          </button>
        </p>
      </div>
    </motion.div>
  );
};

export default VerifyOtp;