import { Card, CardContent, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const AllCourseCard = ({ course }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 120 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10, scale: 1.03 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true, margin: "-40px" }} // margin helps trigger a bit earlier
      // You can also add whileTap if you want press/click feedback
      // whileTap={{ scale: 0.98 }}
    >
      <Card
        className="rounded-xl shadow-md cursor-pointer h-full flex flex-col"
        onClick={() => navigate(`/student/dashboard/courses/${course._id}`)}
        // Optional: let Card still handle elevation/shadow changes if you want
      >
        <div className="h-40 bg-gray-200 flex items-center justify-center overflow-hidden">
          {course.thumbnail ? (
            <img
              src={course.thumbnail}
              alt={course.title}
              className="max-h-full max-w-full object-cover"
            />
          ) : (
            <span className="text-gray-500">No thumbnail</span>
          )}
        </div>

        <CardContent className="flex flex-col flex-grow">
          <h2 className="text-lg font-semibold mb-2 line-clamp-2">
            {course.title}
          </h2>

          <p className="text-gray-600 text-sm mb-3 line-clamp-3 flex-grow">
            {course.description}
          </p>

          <p className="font-semibold mb-4">₹{course.price}</p>

          <Button variant="contained" fullWidth>
            View More About
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AllCourseCard;