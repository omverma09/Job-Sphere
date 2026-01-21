import { motion } from "framer-motion";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CurrencyRupeeOutlinedIcon from "@mui/icons-material/CurrencyRupeeOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { useNavigate } from "react-router-dom";

const demoJobs = [
  {
    id: 1,
    title: "Associate Graphic Designer",
    company: "StudyPad India Pvt Ltd",
    location: "Work From Home",
    salary: "₹14,00,000 - 18,00,000 / year",
    hiring: true,
  },
  {
    id: 2,
    title: "AI Full Stack Engineer",
    company: "Humanity Founders",
    location: "Work From Home",
    salary: "₹5,00,000 - 10,00,000 / year",
    hiring: true,
  },
];

const RecommendedJobs = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-[#f2fbff] py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Recommended for you
          </h2>
          <p className="text-gray-500 mt-2">
            as per your <span className="text-blue-600 cursor-pointer">preferences</span>
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {demoJobs.map((job) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 120 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10, scale: 1.03 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl cursor-pointer"
            >
              {/* Actively Hiring */}
              {job.hiring && (
                <div className="inline-flex items-center gap-1 text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-4">
                  <TrendingUpIcon fontSize="small" />
                  Actively hiring
                </div>
              )}

              {/* Job Title */}
              <h3 className="text-lg font-bold text-gray-800">
                {job.title}
              </h3>
              <p className="text-gray-500">{job.company}</p>

              {/* Details */}
              <div className="mt-5 space-y-2 text-gray-600 text-sm">
                <div className="flex items-center gap-2">
                  <LocationOnOutlinedIcon fontSize="small" />
                  {job.location}
                </div>
                <div className="flex items-center gap-2">
                  <CurrencyRupeeOutlinedIcon fontSize="small" />
                  {job.salary}
                </div>
              </div>

              {/* Footer */}
              <div className="mt-6 flex justify-between items-center">
                <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">
                  Job
                </span>
                <span className="text-blue-600 font-medium">
                  View details →
                </span>
              </div>
            </motion.div>
          ))}

          {/* View More Card */}
          <motion.div
            initial={{ opacity: 0, y: 120 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            onClick={() => navigate("/student/dashboard/jobs")}
            className="flex flex-col items-center justify-center bg-white rounded-2xl border-2 border-dashed border-blue-400 cursor-pointer hover:bg-blue-50 transition"
          >
            <h3 className="text-lg font-bold text-blue-600">
              View all jobs
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Explore 1000+ opportunities
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RecommendedJobs;