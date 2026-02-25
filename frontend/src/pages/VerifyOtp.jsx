import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api/axios";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const tempId = location.state?.tempId;

  if (!tempId) {
    return <p className="text-center mt-10">Invalid access</p>;
  }

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await API.post("/auth/verify-otp", {
        tempId,
        otp,
      });

      alert("OTP verified successfully! Please login.");
      navigate("/login");

    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4 text-center">Verify OTP</h2>

        {error && <p className="text-red-600 mb-3">{error}</p>}

        <form onSubmit={handleVerify} className="flex flex-col gap-4">
          <TextField
            label="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOtp;