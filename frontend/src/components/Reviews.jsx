import { Card, CardContent, Avatar } from "@mui/material";
import { motion } from "framer-motion";

const reviews = [
  {
    name: "Aman Sharma",
    college: "IIT Indore",
    role: "Frontend Intern",
    company: "StartupHub",
    review:
      "I got my first internship within 2 weeks. The platform is super easy to use.",
    rating: 5,
  },
  {
    name: "Priya Verma",
    college: "NIT Bhopal",
    role: "Data Analyst",
    company: "DataWorks",
    review:
      "Best platform for freshers. Recruiters actually respond here!",
    rating: 4,
  },
  {
    name: "Rohit Singh",
    college: "SGSITS Indore",
    role: "MERN Developer",
    company: "NextGen Tech",
    review:
      "The job filters are very accurate. Helped me land a full-time role.",
    rating: 5,
  },
];

const Reviews = () => {
  return (
    <section className="min-h-screen bg-gray-50 px-6 py-14">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">
            Student <span className="text-blue-600">Reviews</span>
          </h1>
          <p className="mt-3 text-gray-600">
            Real experiences from students who got hired
          </p>
        </div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {reviews.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 70 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.04 }}
              transition={{
                duration: 0.8,
                ease: "easeOut"
              }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <ReviewCard data={item} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ReviewCard = ({ data }) => {
  return (
    <Card className="h-full rounded-xl shadow-md hover:shadow-xl-border-blue-900 transition">
      <CardContent>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <Avatar>{data.name[0]}</Avatar>
          <div>
            <h3 className="font-semibold">{data.name}</h3>
            <p className="text-sm text-gray-500">{data.college}</p>
          </div>
        </div>

        {/* Review */}
        <p className="text-gray-600 mb-4">“{data.review}”</p>

        {/* Footer */}
        <div className="text-sm text-gray-700">
          <p>
            <strong>Role:</strong> {data.role}
          </p>
          <p>
            <strong>Company:</strong> {data.company}
          </p>
          <p className="mt-2 text-yellow-500">
            {"⭐".repeat(data.rating)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Reviews;