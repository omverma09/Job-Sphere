// src/components/NotFound.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // optional - for nice animation

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md"
      >
        {/* Big 404 */}
        <h1 className="text-9xl font-bold text-blue-600">404</h1>

        {/* Message */}
        <h2 className="mt-4 text-3xl font-semibold text-gray-800">
          Oops! Page not found
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Helpful suggestions */}
        <div className="mt-8 space-y-4">
          <p className="text-gray-500">
            You might want to check:
          </p>
          <ul className="text-left text-gray-600 space-y-2">
            <li>• The URL is correct</li>
            <li>• You typed the address correctly</li>
            <li>• The page has been removed</li>
          </ul>
        </div>

      </motion.div>

      {/* Optional cute illustration / SVG */}
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
};

export default NotFound;