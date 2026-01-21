import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, NavLink, useLocation } from "react-router-dom";
import UserProfileMenu from "./UserProfileMenu.jsx";
import {
    ChatBubbleOutline,
    NotificationsNone,
    KeyboardArrowDown,
    Menu as MenuIcon,        // hamburger
    Close as CloseIcon,       // close button (optional)
} from "@mui/icons-material";

const LoggedInNavbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

    return (
        <motion.nav
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="sticky top-0 z-50 bg-white shadow-sm"
        >
            <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">
                <div className="text-xl font-bold text-blue-600">
                    <h2 className="text-2xl font-bold text-blue-600">
                        <Link to="/student/dashboard">Job<span className="text-black">Sphere</span></Link>
                    </h2>
                </div>

                <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
                    <NavLink
                        to="/student/dashboard"
                        onClick={toggleMobileMenu}
                        className={
                            `py-2 px-3 rounded-md transition-colors`
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink to="/student/dashboard/prepare"
                        className={({ isActive }) =>
                            `py-2 px-3 rounded-md transition-colors
                                ${isActive
                                ? 'bg-indigo-50 text-indigo-700 font-medium underline underline-offset-4 decoration-2 decoration-indigo-600'
                                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                            }`
                        }>
                        Prepration
                    </NavLink>
                    <NavLink to="/student/dashboard/placement-courses"
                        className={({ isActive }) =>
                            `py-2 px-3 rounded-md transition-colors
                                ${isActive
                                ? 'bg-indigo-50 text-indigo-700 font-medium underline underline-offset-4 decoration-2 decoration-indigo-600'
                                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                            }`
                        }>
                        Placement Courses
                    </NavLink>
                    <NavLink to="/student/dashboard/jobs"
                        className={({ isActive }) =>
                            `py-2 px-3 rounded-md transition-colors
                                ${isActive
                                ? 'bg-indigo-50 text-indigo-700 font-medium underline underline-offset-4 decoration-2 decoration-indigo-600'
                                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                            }`
                        }>
                        Jobs
                    </NavLink>
                </div>

                <div className="flex items-center gap-5">
                    <ChatBubbleOutline className="cursor-pointer text-gray-600" />
                    <NotificationsNone className="cursor-pointer text-gray-600" />

                    <div className="items-center gap-1 cursor-pointer">
                        <KeyboardArrowDown />
                        <UserProfileMenu />
                    </div>

                    <button
                        className="md:hidden text-gray-700 focus:outline-none"
                        onClick={toggleMobileMenu}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? (
                            <CloseIcon className="w-7 h-7" />
                        ) : (
                            <MenuIcon className="w-7 h-7" />
                        )}
                    </button>
                </div>
            </div>
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden bg-white border-t shadow-lg overflow-hidden"
                    >
                        <div className="px-6 py-5 flex flex-col gap-5 text-gray-700 font-medium">
                            <NavLink
                                to="/student/dashboard"
                                onClick={toggleMobileMenu}
                                className={({ isActive }) =>
                                    `py-2 px-3 rounded-md transition-colors
                                ${isActive
                                        ? 'bg-indigo-50 text-indigo-700 font-medium underline underline-offset-4 decoration-2 decoration-indigo-600'
                                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                    }`
                                }
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/student/dashboard/prepare"
                                onClick={toggleMobileMenu}
                                className={({ isActive }) =>
                                    `py-2 px-3 rounded-md transition-colors
                                ${isActive
                                        ? 'bg-indigo-50 text-indigo-700 font-medium underline underline-offset-4 decoration-2 decoration-indigo-600'
                                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                    }`
                                }
                            >
                                Prepration
                            </NavLink>
                            <NavLink
                                to="/student/dashboard/placement-courses"
                                onClick={toggleMobileMenu}
                                className={({ isActive }) =>
                                    `py-2 px-3 rounded-md transition-colors
                                ${isActive
                                        ? 'bg-indigo-50 text-indigo-700 font-medium underline underline-offset-4 decoration-2 decoration-indigo-600'
                                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                    }`
                                }
                            >
                                Placement Courses
                            </NavLink>
                            <NavLink
                                to="/student/dashboard/jobs"
                                onClick={toggleMobileMenu}
                                className={({ isActive }) =>
                                    `py-2 px-3 rounded-md transition-colors
                                ${isActive
                                        ? 'bg-indigo-50 text-indigo-700 font-medium underline underline-offset-4 decoration-2 decoration-indigo-600'
                                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                    }`
                                }
                            >
                                Jobs
                            </NavLink>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

const NavItem = ({ label, badge, onClick }) => (
    <div
        className="relative cursor-pointer hover:text-blue-600 transition"
        onClick={onClick}
    >
        {label}
        {badge && (
            <span className="absolute -top-3 -right-6 text-xs bg-orange-500 text-white px-2 py-0.5 rounded">
                OFFER
            </span>
        )}
    </div>
);

export default LoggedInNavbar;