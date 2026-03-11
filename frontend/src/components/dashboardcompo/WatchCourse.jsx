import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../api/axios";

const WatchCourse = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const [course, setCourse] = useState(null);
    const [modules, setModules] = useState([]);
    const [currentLecture, setCurrentLecture] = useState(null);
    const [openModule, setOpenModule] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const fetchCourse = async () => {
        try {

            const res = await API.get(`/courses/watch/${id}`);

            setCourse(res.data.course);
            setModules(res.data.modules);

            if (res.data.modules.length > 0) {
                setCurrentLecture(res.data.modules[0].lectures[0]);
                setOpenModule(res.data.modules[0]._id);
            }

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCourse();
    }, []);

    const handleLectureClick = (lecture) => {
        setCurrentLecture(lecture);
        setSidebarOpen(false); // mobile par auto close
    };

    const toggleModule = (moduleId) => {
        if (openModule === moduleId) {
            setOpenModule(null);
        } else {
            setOpenModule(moduleId);
        }
    };

    if (!course) return <p className="p-6">Loading...</p>;

    return (
        <div className="flex h-screen bg-black text-white relative">

            {/* Overlay (mobile) */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={`bg-[#0f172a] w-[300px] overflow-y-auto border-r border-gray-700
                fixed md:relative z-40 h-full transition-transform duration-300
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
            >

                <div className="p-4 font-semibold text-lg border-b border-gray-700">
                    {course.title}
                </div>

                {modules.map((module, mIndex) => (

                    <div key={module._id} className="border-b border-gray-700">

                        {/* Module Title */}
                        <div
                            onClick={() => toggleModule(module._id)}
                            className="bg-gray-800 p-3 font-semibold cursor-pointer flex justify-between"
                        >
                            {mIndex + 1}. {module.title}

                            <span>
                                {openModule === module._id ? "▲" : "▼"}
                            </span>
                        </div>

                        {/* Lectures */}
                        {openModule === module._id && (

                            <div>
                                {module.lectures.map((lecture) => (

                                    <div
                                        key={lecture._id}
                                        onClick={() => handleLectureClick(lecture)}
                                        className={`p-3 text-sm cursor-pointer hover:bg-gray-700
                                        ${currentLecture?._id === lecture._id ? "bg-gray-700" : ""}`}
                                    >

                                        ▶ {lecture.title}

                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}

            </div>

            {/* Main Section */}
            <div className="flex-1 flex flex-col">

                {/* Top bar */}
                <div className="flex items-center justify-between p-4 border-b border-gray-700">

                    <div className="flex items-center gap-4">

                        {/* Mobile Menu */}
                        <button
                            className="text-xl md:hidden"
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                        >
                            ☰
                        </button>

                        <button
                            className="text-sm text-gray-400"
                            onClick={() => navigate("/student/dashboard/my-batch")}
                        >
                            ← Back to course page
                        </button>
                    </div>

                    <div className="text-sm text-gray-400">
                        <button className="mr-6">‹ previous</button>
                        <button>next ›</button>
                    </div>

                </div>

                {/* Video Player */}
                <div className="flex-1 flex items-center justify-center bg-black p-2">
                    {currentLecture ? (
                        <video
                            src={currentLecture.videoUrl}
                            controls
                            autoPlay
                            className="w-full max-h-[85vh] rounded"
                        />
                    ) : (
                        <p>No lecture selected</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WatchCourse;