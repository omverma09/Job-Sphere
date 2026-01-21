import { motion } from "framer-motion";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import StarIcon from "@mui/icons-material/Star";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const courses = [
  {
    id: 1,
    role: "HR Manager",
    title: "Human Resource Management Course",
    duration: "3 months course with LIVE sessions",
    salary: "₹11.5 LPA",
    rating: 4.4,
    bg: "from-pink-100 to-purple-100",
    img: "https://img.freepik.com/free-vector/human-resources-characters-with-banner-white_24908-61103.jpg?referrer=grok.com",
  },
  {
    id: 2,
    role: "Digital Marketer",
    title: "Digital Marketing Course",
    duration: "5 months course with LIVE sessions",
    salary: "₹10 LPA",
    rating: 4.4,
    bg: "from-blue-100 to-cyan-100",
    img: "https://www.kindpng.com/picc/m/124-1247356_digital-marketing-courses-png-png-download-digital-marketing.png?referrer=grok.com",
  },
  {
    id: 3,
    role: "Product Manager",
    title: "Product Management Course",
    duration: "5 months course with LIVE sessions",
    salary: "₹14 LPA",
    rating: 4.4,
    bg: "from-green-100 to-emerald-100",
    img: "https://leinadstudios.com/wp-content/uploads/2024/03/Product-Management.png?referrer=grok.com",
  },
];

const PlacementCoursesAI = () => {
  return (
    <section className="py-14 bg-white">
      <h2 className="text-3xl font-semibold text-center mb-10">
        Placement Courses with AI
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        {courses.map((course, i) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.15 }}
            whileHover={{ y: -8 }}
            className="border rounded-xl shadow-sm hover:shadow-lg transition bg-white overflow-hidden"
          >
            {/* Top Banner */}
            <div
              className={`p-5 bg-gradient-to-r ${course.bg} relative`}
            >
              <span className="absolute top-3 right-3 bg-orange-400 text-white text-sm px-2 py-1 rounded-full flex items-center gap-1">
                <StarIcon sx={{ fontSize: 14 }} /> {course.rating}
              </span>

              <p className="text-gray-600 text-sm">Become a</p>
              <h3 className="text-xl font-bold">
                {course.role}
              </h3>

              <p className="text-sm text-orange-600 mt-2">
                Placement Course with AI ✨
              </p>

              <img
                src={course.img}
                alt={course.role}
                className="absolute right-3 bottom-2 w-20"
              />
            </div>

            {/* Content */}
            <div className="p-5">
              <h4 className="font-semibold text-lg mb-3">
                {course.title}
              </h4>

              <div className="text-sm text-gray-600 flex items-center gap-2 mb-2">
                <AccessTimeIcon sx={{ fontSize: 18 }} />
                {course.duration}
              </div>

              <div className="text-sm text-gray-600 flex items-center gap-2 mb-4">
                <TrendingUpIcon sx={{ fontSize: 18 }} />
                Highest salary offered:{" "}
                <span className="font-medium">{course.salary}</span>
              </div>

              {/* CTA */}
              <button
                onClick={() => window.location.href = "/placement-courses"}
                className="text-blue-600 font-medium flex items-center gap-1 hover:gap-2 transition-all"
              >
                Know more <ArrowForwardIosIcon sx={{ fontSize: 14 }} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PlacementCoursesAI;