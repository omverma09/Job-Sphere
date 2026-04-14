import { useState } from "react";
import { TextField, Button, CircularProgress, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

const ROLE_ROUTES = {
  recruiter: "/recruiter/dashboard",
  user: "/student/dashboard",
  instructor: "/instructor/dashboard",
};

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await API.post("/auth/login", {
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      const destination = ROLE_ROUTES[data.user.role] ?? "/";
      navigate(destination, { replace: true });

    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
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
        <h1 className="text-2xl font-bold text-gray-800 mb-1 text-center">Welcome back</h1>
        <p className="text-sm text-gray-500 text-center mb-7">Sign in to your FindingJob account</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-5 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <TextField
            label="Email address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            disabled={loading}
            autoComplete="email"
            size="medium"
          />

          <TextField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={handleChange}
            required
            disabled={loading}
            autoComplete="current-password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPass((v) => !v)}
                    edge="end"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    tabIndex={-1}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={loading}
            sx={{ mt: 1, py: 1.4, borderRadius: 2, textTransform: "none", fontSize: 16 }}
          >
            {loading ? <CircularProgress size={22} color="inherit" /> : "Sign In"}
          </Button>
        </form>

        <p className="text-sm text-gray-500 mt-5 text-center">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-blue-600 font-medium hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default Login;