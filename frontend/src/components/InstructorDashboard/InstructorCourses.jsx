import { useState, useEffect } from "react";
import { Button, Alert } from "@mui/material";
import { Link } from "react-router-dom";
import API from "../../api/axios";      // Adjust path according to your folder structure
import Loader from "../Loader";

const InstructorCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMyCourses = async () => {
            try {
                setLoading(true);
                setError(null);

                const { data } = await API.get("courses/instructor/my-courses");

                setCourses(data?.courses ?? []);   // ← clean & safe fix

            } catch (err) {
                console.error("API Error:", err);
                setError(
                    err.response?.data?.message ||
                    "Could not fetch courses. Please check your connection."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchMyCourses();
    }, []);

    const handleDelete = async (courseId) => {
        if (!window.confirm("Are you sure you want to delete this course? This action cannot be undone.")) {
            return;
        }
        try {
            await API.delete(`/courses/${courseId}`);
            // Optimistic UI update
            setCourses((prevCourses) => prevCourses.filter((course) => course._id !== courseId));

            alert("Course deleted successfully!");
        } catch (err) {
            console.error("Delete error:", err);
            const errorMsg = err.response?.data?.message || "Failed to delete course.";
            alert(errorMsg);
        }
    };

    if (loading) {
        return (
            <Loader />
        );
    }

    if (error) {
        return (
            <div className="p-6 max-w-7xl mx-auto">
                <Alert severity="error" variant="filled">
                    {error}
                </Alert>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Courses</h1>
            </div>

            {courses.length === 0 ? (
                <div className="text-center py-16 text-gray-600 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                    <p className="text-xl font-medium mb-3">No courses found</p>
                    <p className="text-gray-500 mb-6">Start creating your first course today!</p>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="large"
                        component={Link}
                        to="/instructor/courses/new"
                    >
                        Create Course
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
                    {courses.map((course) => (
                        <div
                            key={course._id}
                            className="bg-white rounded-xl shadow hover:shadow-xl transition-all duration-200 overflow-hidden border border-gray-200 flex flex-col"
                        >
                            {/* Thumbnail */}
                            <div className="aspect-video bg-gray-100 relative">
                                {course.thumbnail ? (
                                    <img
                                        src={course.thumbnail}
                                        alt={course.title}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.src = "https://via.placeholder.com/640x360?text=Thumbnail+Not+Found";
                                            e.target.alt = "Thumbnail not available";
                                        }}
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-50">
                                        No Thumbnail
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-4 sm:p-5 flex flex-col flex-grow">
                                <h2 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                                    {course.title}
                                </h2>

                                <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
                                    {course.description || "No description provided"}
                                </p>

                                <div className="flex items-center justify-between mb-4 text-sm">
                                    <span className="font-bold text-green-600">
                                        ₹{(course.price || 0).toLocaleString()}
                                    </span>
                                    <span className="text-gray-500 bg-gray-100 px-2 py-1 rounded-full text-xs">
                                        {course.category || "Uncategorized"}
                                    </span>
                                </div>

                                {/* Buttons */}
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        component={Link}
                                        to={`/instructor/courses/${course._id}/edit`}
                                        sx={{ flex: 1 }}
                                    >
                                        Edit
                                    </Button>

                                    <Button
                                        variant="outlined"
                                        size="small"
                                        color="primary"
                                        component={Link}
                                        to={`/instructor/dashboard/course-builder/${course._id}`}
                                        sx={{ flex: 1 }}
                                    >
                                        Builder
                                    </Button>

                                    <Button
                                        variant="outlined"
                                        size="small"
                                        color="error"
                                        onClick={() => handleDelete(course._id)}
                                        sx={{ flex: 1 }}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="p-4 sm:p-5 flex flex-col bg-white rounded-xl shadow hover:shadow-xl transition-all duration-200 overflow-hidden border border-gray-200 flex flex-col">
                        <h3 className="text-lg font-bold text-blue-600">
                            + Create Course
                        </h3>
                    </div>
                </div>

            )}


        </div>
    );
};

export default InstructorCourses;