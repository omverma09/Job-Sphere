import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import PeopleIcon from "@mui/icons-material/People";
import PaymentsIcon from "@mui/icons-material/Payments";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
    const {user} = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);
    const closeSidebar = () => setIsOpen(false);

    return (
        <>
            {/* Hamburger Button - Only on mobile */}
            <button
                className="md:hidden fixed top-4 left-4 z-50 text-white p-2 rounded-md bg-slate-800 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={toggleSidebar}
                aria-label="Toggle menu"
            >
                {isOpen ? <CloseIcon fontSize="small" /> : <MenuIcon fontSize="small" />}
            </button>

            {/* Sidebar */}
            <div
                className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0 md:transition-none
        `}
            >
                <div className="p-5 flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-bold">Instructor Panel</h2>
                        {/* Close button inside sidebar - only mobile */}
                        <button
                            className="md:hidden text-gray-400 hover:text-white focus:outline-none"
                            onClick={closeSidebar}
                            aria-label="Close menu"
                        >
                            <CloseIcon />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex flex-col gap-3">
                        <Link
                            to="/instructor/dashboard"
                            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 hover:text-blue-400 active:bg-slate-700 transition-colors duration-150"
                            onClick={closeSidebar} // mobile pe link click → close
                        >
                            <DashboardIcon fontSize="medium" />
                            <span>Dashboard</span>
                        </Link>

                        <Link
                            to="/instructor/dashboard/courses"
                            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 hover:text-blue-400 active:bg-slate-700 transition-colors duration-150"
                            onClick={closeSidebar}
                        >
                            <SchoolIcon fontSize="medium" />
                            <span>My Courses</span>
                        </Link>

                        <Link
                            to="/instructor/dashboard/students"
                            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 hover:text-blue-400 active:bg-slate-700 transition-colors duration-150"
                            onClick={closeSidebar}
                        >
                            <PeopleIcon fontSize="medium" />
                            <span>Students</span>
                        </Link>

                        <Link
                            to="/instructor/dashboard/payments"
                            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 hover:text-blue-400 active:bg-slate-700 transition-colors duration-150"
                            onClick={closeSidebar}
                        >
                            <PaymentsIcon fontSize="medium" />
                            <span>Payments</span>
                        </Link>

                        <Link
                            to="/instructor/dashboard/setting"
                            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-800 hover:text-blue-400 active:bg-slate-700 transition-colors duration-150"
                            onClick={closeSidebar}
                        >
                            <SettingsApplicationsIcon fontSize="medium" />
                            <span>Setting</span>
                        </Link>
                    </nav>

                    <div className="mt-auto pt-6 text-sm text-gray-500">
                        © {new Date().getFullYear()} Your App
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2 rounded-md">
                        {user ? user.name : null}
                    </div>
                </div>
            </div>

            {/* Mobile Overlay (backdrop) - click to close */}
            {isOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/60 z-30"
                    onClick={closeSidebar}
                    aria-hidden="true"
                />
            )}
        </>
    );
};

export default Sidebar;