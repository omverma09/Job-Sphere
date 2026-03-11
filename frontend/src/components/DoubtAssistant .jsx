import React from "react";
import { motion } from "framer-motion";

const DoubtAssistant = () => {
    return (
        <div className="w-full bg-gray-100 py-5 px-5">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, margin: "-80px" }}
                className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center"
            >
                <div className="relative flex justify-center items-center h-[380px]">
                    <motion.img
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                        src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4"
                        className="w-44 rounded-xl shadow-xl absolute left-0 top-20"
                    />
                    <motion.img
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        src="https://images.unsplash.com/photo-1555066931-4365d14bab8c"
                        className="w-52 rounded-xl shadow-xl absolute top-0"
                    />
                    <motion.img
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true }}
                        src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
                        className="w-48 rounded-xl shadow-xl absolute right-0 bottom-10"
                    />
                </div>

                {/* RIGHT SIDE TEXT */}
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.25 }}
                    viewport={{ once: true }}
                    className="text-center md:text-left"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Exclusive <span className="text-blue-600">Doubt Assistance</span>
                    </h2>

                    <p className="text-gray-600 mb-6 text-lg">
                        Get 1:1 doubt support from exclusive TAs and the batch community
                    </p>
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                        Enroll Now →
                    </button>
                </motion.div>
            </motion.div>
        </div>
    );
};
export default DoubtAssistant;