import { useState } from "react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";

const PostJob = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: "",
        description: "",
        company: "",
        location: "",
        salary: "",
        jobType: "full-time",
        workMode: "remote",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post("/jobs", form);
            alert("Job posted successfully");
            setForm({
                title: "",
                description: "",
                company: "",
                location: "",
                salary: "",
                jobType: "full-time",
                workMode: "remote",
            });
            navigate("/recruiter/dashboard");
        } catch (err) {
            alert("Failed to post job");
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-5">Post a Job</h2>

            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
                <input
                    name="title"
                    placeholder="Job Title"
                    value={form.title}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                />

                <input
                    name="company"
                    placeholder="Company Name"
                    value={form.company}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                />

                <input
                    name="location"
                    placeholder="Location"
                    value={form.location}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                />

                <input
                    name="salary"
                    type="number"
                    placeholder="Salary (₹)"
                    value={form.salary}
                    onChange={handleChange}
                    className="border p-2 rounded"
                />

                <select
                    name="jobType"
                    value={form.jobType}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                >
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="internship">Internship</option>
                    <option value="contract">Contract</option>
                </select>

                <select
                    name="workMode"
                    value={form.workMode}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                >
                    <option value="remote">Remote</option>
                    <option value="work-from-home">Work from Home</option>
                    <option value="on-site">On-site</option>
                </select>

                <textarea
                    name="description"
                    placeholder="Job Description"
                    value={form.description}
                    onChange={handleChange}
                    className="border p-2 rounded md:col-span-2"
                    rows="4"
                    required
                />

                <button
                    type="submit"
                    className="md:col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Post Job
                </button>
            </form>
        </div>
    );
};

export default PostJob;