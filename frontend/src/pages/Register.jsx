import { useState } from "react";
import { TextField, Button, MenuItem } from "@mui/material";
import { motion } from "framer-motion";
import API from "../api/axios.js";
import { useNavigate } from "react-router-dom";

const roles = [
  { value: "user", label: "User" },
  { value: "recruiter", label: "Recruiter" },
];

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await API.post("/auth/register", form);

      const { tempId } = response.data;

      navigate("/verify-otp", { state: { tempId } });

    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="bg-white rounded-xl shadow-lg p-10 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextField label="Full Name" name="name" value={form.name} onChange={handleChange} required />
          <TextField label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
          <TextField label="Password" name="password" type="password" value={form.password} onChange={handleChange} required />

          <TextField select label="Register As" name="role" value={form.role} onChange={handleChange}>
            {roles.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <Button type="submit" variant="contained" fullWidth disabled={loading}>
            {loading ? "Sending OTP..." : "Register"}
          </Button>
        </form>
      </div>
    </motion.div>
  );
};

export default Register;