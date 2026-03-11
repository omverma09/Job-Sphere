import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const faqData = [
    {
        question: "I don't know anything about Coding, is this batch good for me?",
        answer: "Yes. This course starts from basics and gradually moves to advanced concepts."
    },
    {
        question: "Do I need to be a Computer Science student to take up this batch?",
        answer: "No. Anyone from any background can join and learn coding."
    },
    {
        question: "How will I ask my doubts?",
        answer: "You can ask doubts in the batch community and get help from TAs."
    },
    {
        question: "What is the batch duration?",
        answer: "The course duration is around 4–6 months depending on pace."
    },
    {
        question: "Is the batch in Hindi or English?",
        answer: "The course is taught in Hindi with easy English technical terms."
    }
];

const CourseFaq = () => {
    const [active, setActive] = useState(null);

    const toggle = (index) => {
        setActive(active === index ? null : index);
    };

    return (
        <div className="bg-gray-100 py-16 px-6">

            <h2 className="text-center text-3xl md:text-4xl font-bold mb-4">
                FREQUENTLY ASKED QUESTIONS
            </h2>

            <p className="text-center text-blue-600 mb-10">
                Batch related Doubts
            </p>

            <div className="max-w-4xl mx-auto space-y-4">

                {faqData.map((faq, index) => (

                    <div
                        key={index}
                        className="bg-white rounded-lg shadow-sm"
                    >

                        <div
                            onClick={() => toggle(index)}
                            className="flex justify-between items-center p-5 cursor-pointer"
                        >

                            <h3 className="font-medium">
                                {faq.question}
                            </h3>

                            <KeyboardArrowDownIcon
                                className={`transition-transform ${active === index ? "rotate-180" : ""
                                    }`}
                            />

                        </div>
                        
                        {active === index && (
                            <div className="px-5 pb-5 text-gray-600 text-sm">
                                {faq.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
export default CourseFaq;