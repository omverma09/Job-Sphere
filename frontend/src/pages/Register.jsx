import { useState } from "react";
import { TextField, Button, MenuItem, CircularProgress, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

const ROLES = [
  { value: "user", label: "Job Seeker" },
  { value: "recruiter", label: "Recruiter" },
  { value: "instructor", label: "Instructor" },
];

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "", role: "user" });
  const [showPassword, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      const { data } = await API.post("/auth/register", {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password,
        role: form.role,
      });

      navigate("/verify-otp", { state: { tempId: data.tempId, email: form.email.trim() } });

    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gray-50 px-4"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="bg-white rounded-2xl shadow-md p-10 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-1 text-center">Create account</h1>
        <p className="text-sm text-gray-500 text-center mb-7">Join FindingJob and start your journey</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-5 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <TextField
            label="Full name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            disabled={loading}
            autoComplete="name"
          />

          <TextField
            label="Email address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            disabled={loading}
            autoComplete="email"
          />

          <TextField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
            required
            disabled={loading}
            helperText="Minimum 8 characters"
            autoComplete="new-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPass((v) => !v)}
                    edge="end"
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            select
            label="I am a"
            name="role"
            value={form.role}
            onChange={handleChange}
            disabled={loading}
          >
            {ROLES.map((r) => (
              <MenuItem key={r.value} value={r.value}>
                {r.label}
              </MenuItem>
            ))}
          </TextField>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={loading}
            sx={{ mt: 1, py: 1.4, borderRadius: 2, textTransform: "none", fontSize: 16 }}
          >
            {loading ? <CircularProgress size={22} color="inherit" /> : "Create Account"}
          </Button>
        </form>

        <p className="text-sm text-gray-500 mt-5 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Register;