import { Button } from "@mui/material";
import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <section className="bg-gradient-to-r from-blue-700 to-blue-900 text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-2 gap-10 px-6 py-16 items-center">

        {/* LEFT CONTENT */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            India’s <span className="text-yellow-400">#1 platform</span>
          </h1>

          <p className="mt-4 text-lg">
            For fresher jobs, internships and remote opportunities
          </p>

          {/* Signup Box */}
          <div className="mt-8 rounded-xl bg-white p-6 text-black w-full md:w-[380px] hover:scale-[1.01]">
            <h3 className="font-semibold mb-4">Candidate sign up</h3>

            <Button
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
            >
              Continue with Google
            </Button>

            <Button
              fullWidth
              variant="contained"
            >
              Continue with Email
            </Button>

            <p className="mt-3 text-xs text-gray-500">
              By continuing, you agree to our{" "}
              <span className="text-blue-600 cursor-pointer">T&C</span>
            </p>
          </div>

          {/* Mobile employer link */}
          <p className="mt-4 md:hidden text-sm underline">
            Employer sign up →
          </p>
        </div>

        {/* RIGHT IMAGE */}
        <div className="hidden md:flex justify-center">
          <div className="relative overflow-hidden rounded-xl shadow-lg group">
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
              alt="jobs"
              className="w-[420px] transition-transform duration400 ease-out 
                group-hover:scale-110
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
