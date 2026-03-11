import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/axios";
import { Button } from "@mui/material";
import Reviews from "../Reviews";
import DoubtAssistant from "../DoubtAssistant ";
import GetCertified from "../GetCertified";
import CourseFaq from "../CourseFaq";
import { motion } from "framer-motion";
import Loader from "../Loader";

const CourseDetails = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchCourse = async () => {
        try {
            const res = await API.get(`/courses/${id}`);
            setCourse(res.data.course);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourse();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    const handleByCourse = async () => {
        try {
            const res = await API.post("/payment/create-checkout-session", {
                courseId: course._id,
            })
            window.location.href = res.data.url;

        } catch (error) {
            console.log(error);
        }
    }

    return (

        <div>
            <div>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-8 mt-10"
                >
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
                        <p className="text-gray-600 mb-4">{course.description}</p>
                        <p className="font-semibold mb-2">
                            Instructor: {course.instructor.name}
                        </p>
                        <p className="font-semibold mb-4">Category: {course.category}</p>
                        <h2 className="text-2xl font-bold mb-4">₹{course.price}</h2>
                        <Button variant="contained"
                            onClick={handleByCourse}
                        >Buy Course</Button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="flex items-center justify-center"
                    >
                        <img src={course.thumbnail} className="rounded-xl max-h-[420px] object-cover" />
                    </motion.div>
                </motion.div>
            </div>
            <Reviews />
            <DoubtAssistant />
            <GetCertified />
            <CourseFaq />

        </div>
    );
};

export default CourseDetails;