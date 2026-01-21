import { motion } from "framer-motion";
import StarIcon from "@mui/icons-material/Star";
import BusinessIcon from "@mui/icons-material/Business";

const placements = [
  {
    id: 1,
    name: "Aman Verma",
    role: "Frontend Developer",
    company: "TCS",
    salary: "₹6 LPA",
    rating: 5,
  },
  {
    id: 2,
    name: "Neha Sharma",
    role: "Digital Marketer",
    company: "Infosys",
    salary: "₹5.5 LPA",
    rating: 4,
  },
  {
    id: 3,
    name: "Rahul Meena",
    role: "Product Analyst",
    company: "Accenture",
    salary: "₹8 LPA",
    rating: 5,
  },
  {
    id: 4,
    name: "Pooja Jain",
    role: "HR Executive",
    company: "Wipro",
    salary: "₹4.8 LPA",
    rating: 4,
  },
];

const OurPlacements = () => {
  return (
    <section className="bg-sky-50 py-14">
      <h2 className="text-3xl font-semibold text-center mb-10">
        Our Successful Students 🎉
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4">
        {placements.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.12 }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="bg-white rounded-xl p-5 shadow-sm hover:shadow-lg transition"
          >
            {/* Name */}
            <h3 className="font-semibold text-lg">{p.name}</h3>
            <p className="text-sm text-gray-500 mb-2">{p.role}</p>

            {/* Company */}
            <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
              <BusinessIcon sx={{ fontSize: 18 }} />
              {p.company}
            </div>

            {/* Salary */}
            <p className="text-sm text-gray-700 mb-3">
              💰 Salary Offered:{" "}
              <span className="font-medium">{p.salary}</span>
            </p>

            {/* Rating */}
            <div className="flex gap-1">
              {[...Array(5)].map((_, idx) => (
                <StarIcon
                  key={idx}
                  sx={{
                    fontSize: 18,
                    color: idx < p.rating ? "#f59e0b" : "#e5e7eb",
                  }}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-20">
        <img src="../companyImg.png" alt="companies"/>
      </div>
    </section>
  );
};

export default OurPlacements;