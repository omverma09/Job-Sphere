import { Card, CardContent, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const MyBatchCard = ({ course }) => {

  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <Card className="rounded-xl shadow-lg h-full flex flex-col">
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

          <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
            {course.description}
          </p>

          <div className="mb-3">
            <div className="text-sm font-medium">57% COMPLETE</div>
            <div className="w-full bg-gray-200 h-2 rounded">
              <div
                className="bg-indigo-500 h-2 rounded"
                style={{ width: "57%" }}
              />
            </div>
          </div>

          <Button variant="contained" fullWidth
            onClick={() => navigate(`/watch-course/${course._id}`)}
          >
            Continue
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MyBatchCard;