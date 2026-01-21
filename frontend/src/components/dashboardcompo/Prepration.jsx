import React from 'react'
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // optional - for nice animation

export default function Prepration() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md"
      >
        <h1 className="mt-10 text-5xl font-bold text-blue-600">
            Working on this Page
        </h1>

        <h2 className="mt-4 text-3xl font-semibold text-gray-800">
          Page visible will be soon
        </h2>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-md"
          >
            Go to Home
          </Link>

          <Link
            to="/student/dashboard"
            className="px-8 py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition"
          >
            Back to Dashboard
          </Link>
        </div>
      </motion.div>
     
      <div className="mt-12 opacity-70">
        <svg
          className="w-64 h-64"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="100" cy="100" r="80" fill="#EFF6FF" />
          <path
            d="M70 80 C80 60, 120 60, 130 80"
            stroke="#3B82F6"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <circle cx="85" cy="85" r="8" fill="#3B82F6" />
          <circle cx="115" cy="85" r="8" fill="#3B82F6" />
          <path
            d="M70 120 Q100 150, 130 120"
            stroke="#3B82F6"
            strokeWidth="8"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
