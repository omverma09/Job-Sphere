import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import UserProfileMenu from "./UserProfileMenu.jsx";
import {
    ChatBubbleOutline,
    NotificationsNone,
    KeyboardArrowDown,
    Menu as MenuIcon,
    Close as CloseIcon,
    Home as HomeIcon,
    School as PreparationIcon,
    MenuBook as CoursesIcon,
    Work as JobsIcon,
    Person as ProfileIcon,
} from "@mui/icons-material";

const LoggedInNavbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Handle Profile click on mobile → redirect to profile page
    const handleProfileClick = () => {
        navigate("/student/dashboard/profile");
    };

    const isActive = (path) => location.pathname === path;

    return (
        <>
            <motion.nav
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="sticky top-0 z-50 bg-white shadow-sm"
            >
                <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
                    {/* Logo - Same for both */}
                    <div className="text-2xl font-bold text-blue-600">
                        <Link to="/student/dashboard">Job<span className="text-black">Sphere</span></Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
                        <NavLink
                            to="/student/dashboard"
                            className={({ isActive }) =>
                                `py-2 px-3 rounded-md transition-colors ${isActive
                                    ? 'bg-indigo-50 text-indigo-700 font-medium underline underline-offset-4 decoration-2 decoration-indigo-600'
                                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                }`
                            }
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/student/dashboard/prepare"
                            className={({ isActive }) =>
                                `py-2 px-3 rounded-md transition-colors ${isActive
                                    ? 'bg-indigo-50 text-indigo-700 font-medium underline underline-offset-4 decoration-2 decoration-indigo-600'
                                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                }`
                            }
                        >
                            Preparation
                        </NavLink>
                        <NavLink
                            to="/student/dashboard/placement-courses"
                            className={({ isActive }) =>
                                `py-2 px-3 rounded-md transition-colors ${isActive
                                    ? 'bg-indigo-50 text-indigo-700 font-medium underline underline-offset-4 decoration-2 decoration-indigo-600'
                                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                }`
                            }
                        >
                            Placement Courses
                        </NavLink>
                        <NavLink
                            to="/student/dashboard/jobs"
                            className={({ isActive }) =>
                                `py-2 px-3 rounded-md transition-colors ${isActive
                                    ? 'bg-indigo-50 text-indigo-700 font-medium underline underline-offset-4 decoration-2 decoration-indigo-600'
                                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                }`
                            }
                        >
                            Jobs
                        </NavLink>
                    </div>

                    {/* Right Side Icons */}
                    <div className="flex items-center gap-5">
                        <ChatBubbleOutline className="cursor-pointer text-gray-600 hover:text-gray-900 transition-colors" />
                        <NotificationsNone className="cursor-pointer text-gray-600 hover:text-gray-900 transition-colors" />

                        {/* Desktop Profile Menu */}
                        <div className="hidden md:flex items-center gap-1 cursor-pointer">
                            <UserProfileMenu />
                        </div>
        
                    </div>
                </div>

                {/* Optional Mobile Dropdown (if you still want it for very small cases) */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-white border-t shadow-lg"
                        >
                            {/* You can keep or remove this - since bottom nav is main */}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>

            {/* MOBILE BOTTOM NAVIGATION */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 py-2">
                    <div className="flex items-center justify-around text-gray-600">
                        {/* Home */}
                        <NavLink
                            to="/student/dashboard"
                            className={({ isActive }) =>
                                `flex flex-col items-center py-1 px-3 transition-colors ${isActive
                                    ? 'text-indigo-600'
                                    : 'hover:text-gray-900'
                                }`
                            }
                        >
                            <HomeIcon className="text-2xl" />
                            <span className="text-[10px] mt-0.5 font-medium">Home</span>
                        </NavLink>

                        {/* Preparation */}
                        <NavLink
                            to="/student/dashboard/prepare"
                            className={({ isActive }) =>
                                `flex flex-col items-center py-1 px-3 transition-colors ${isActive
                                    ? 'text-indigo-600'
                                    : 'hover:text-gray-900'
                                }`
                            }
                        >
                            <PreparationIcon className="text-2xl" />
                            <span className="text-[10px] mt-0.5 font-medium">Prep</span>
                        </NavLink>

                        {/* Placement Courses */}
                        <NavLink
                            to="/student/dashboard/placement-courses"
                            className={({ isActive }) =>
                                `flex flex-col items-center py-1 px-3 transition-colors ${isActive
                                    ? 'text-indigo-600'
                                    : 'hover:text-gray-900'
                                }`
                            }
                        >
                            <CoursesIcon className="text-2xl" />
                            <span className="text-[10px] mt-0.5 font-medium">Courses</span>
                        </NavLink>

                        {/* Jobs */}
                        <NavLink
                            to="/student/dashboard/jobs"
                            className={({ isActive }) =>
                                `flex flex-col items-center py-1 px-3 transition-colors ${isActive
                                    ? 'text-indigo-600'
                                    : 'hover:text-gray-900'
                                }`
                            }
                        >
                            <JobsIcon className="text-2xl" />
                            <span className="text-[10px] mt-0.5 font-medium">Jobs</span>
                        </NavLink>

                        {/* Profile - Redirects to Profile Page */}
                        <button
                            onClick={handleProfileClick}
                            className={`flex flex-col items-center py-1 px-3 transition-colors ${isActive('/student/dashboard/profile')
                                ? 'text-indigo-600'
                                : 'hover:text-gray-900'
                                }`}
                        >
                            <ProfileIcon className="text-2xl" />
                            <span className="text-[10px] mt-0.5 font-medium">Profile</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Add padding to main content so bottom nav doesn't overlap content on mobile */}
            <div className="md:hidden h-16"></div>
        </>
    );
};

export default LoggedInNavbar;