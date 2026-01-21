import { motion } from "framer-motion";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import StarIcon from "@mui/icons-material/Star";

const courses = [
  {
    id: 1,
    title: "Artificial Intelligence & Machine Learning",
    duration: "6 weeks",
    rating: 4.7,
    enrolled: "884",
    img: "https://skilledmba.com/wp-content/uploads/2023/12/Artificial-Intelligence-and-Machine-Learning-480x304.png?referrer=grok.com",
  },
  {
    id: 2,
    title: "Web Development with AI",
    duration: "8 weeks",
    rating: 4.5,
    enrolled: "126783",
    img: "https://www.shutterstock.com/image-vector/web-development-courses-concept-banner-260nw-2201658653.jpg?referrer=grok.com",
  },
  {
    id: 3,
    title: "Programming in Python with AI",
    duration: "6 weeks",
    rating: 4.5,
    enrolled: "91234",
    img: "https://d3mxt5v3yxgcsr.cloudfront.net/courses/15350/course_15350_image.png?referrer=grok.com",
  },
];

const CertificationCourses = () => {
  return (
    <section className="bg-sky-50 py-14">
      <h2 className="text-3xl font-semibold text-center mb-10">
        Free' Certification courses for you
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        {courses.map((course, i) => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.15 }}
            whileHover={{ y: -6 }}
            className="bg-white rounded-xl shadow-sm hover:shadow-lg transition cursor-pointer"
          >
            <img
              src={course.img}
              alt={course.title}
              className="rounded-t-xl w-full h-40 object-cover"
            />

            <div className="p-5">
              <p className="text-sm text-gray-500 mb-1">{course.duration}</p>

              <h3 className="font-semibold text-lg leading-snug mb-3">
                {course.title}
              </h3>

              <div className="flex items-center text-sm text-gray-600 gap-2 mb-4">
                <StarIcon className="text-yellow-500 text-base" />
                <span>{course.rating}</span>
                <span className="mx-1">|</span>
                <span>{course.enrolled} Enrolled</span>
              </div>

              <button className="text-blue-600 font-medium flex items-center gap-1 hover:gap-2 transition-all">
                Know more <ArrowForwardIosIcon sx={{ fontSize: 14 }} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Skill Pass */}
      <div className="text-center mt-10 text-gray-700">
        💎 <span className="font-semibold">Internshala Skill Pass:</span> Unlock
        lifetime access to all 70+ certification courses.{" "}
        <span className="text-blue-600 cursor-pointer font-medium">
          Explore now →
        </span>
      </div>
    </section>
  );
};

export default CertificationCourses;