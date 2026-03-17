import React, { useEffect, useState } from "react";
import MyBatchCard from "./MyBatchCard ";
import API from "../../api/axios";
import Loader from "../Loader";
import { useAuth } from "../../context/AuthContext";

const MyBatch = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const { user } = useAuth();

    const fetchCourses = async () => {
        try {
            const res = await API.get("courses/my-batch");
            setCourses(res.data);
        } catch (error) {
            console.log(error);
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
            <div className="flex flex-col items-center justify-center mb-8">
                {user ? (
                    <>
                        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
                            Welcome back to Your course,
                        </h1>
                        <h2 className="mt-2 text-2xl md:text-3xl font-bold text-indigo-600 tracking-tight">
                            {user.name}
                        </h2>
                    </>
                ) : null}
            </div>
            <h1 className="text-2xl font-semibold mb-6">
                {courses.length > 0 ? "Your Courses" : "You dont have any Batch"}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                {courses.map((course) => (
                    <MyBatchCard key={course._id} course={course} />
                ))}
            </div>
        </div>
    );
};
export default MyBatch;