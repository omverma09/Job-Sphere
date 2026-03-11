import React, { useEffect, useState } from "react";
import API from "../../api/axios.js";
import AllCourseCard from "./AllCoursesCard.jsx";
import Loader from "../Loader";

const AllCourses = () => {
  const [courses, setCourses] = useState([]);       // ← good default
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      const res = await API.get("courses");
      const data = res.data;
      setCourses(Array.isArray(data) ? data : data?.courses ?? []);
    } catch (error) {
      console.error("Fetch courses failed:", error);
      setCourses([]);           // ← prevent map crash on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Explore Courses</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <AllCourseCard key={course._id} course={course} />
        ))}

        {courses.length === 0 && (
          <p className="col-span-full text-center text-gray-500 py-10">
            No courses found at the moment...
          </p>
        )}
      </div>
    </div>
  );
};

export default AllCourses;