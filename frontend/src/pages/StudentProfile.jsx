import { useNavigate } from "react-router-dom";
import {
    Home as HomeIcon,
    Description as ApplicationsIcon,
    Group as BatchIcon,
    Settings as SettingsIcon,
    Logout as LogoutIcon,
    Edit as EditIcon
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const StudentProfile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        alert("You logged-out");
        navigate("/")
        handleClose();
    };

    const menuItems = [
        {
            icon: <HomeIcon className="text-2xl" />,
            label: "Home",
            path: "/student/dashboard",
            color: "text-gray-700"
        },
        {
            icon: <ApplicationsIcon className="text-2xl" />,
            label: "My Applications",
            path: "/student/dashboard/my-application",
            color: "text-gray-700"
        },
        {
            icon: <BatchIcon className="text-2xl" />,
            label: "My Batch",
            path: "/student/dashboard/my-batch",
            color: "text-gray-700"
        },
        {
            icon: <SettingsIcon className="text-2xl" />,
            label: "Settings",
            path: "/student/dashboard/settings",
            color: "text-gray-700"
        },
        {
            icon: <LogoutIcon className="text-2xl text-red-500" />,
            label: "Logout",
            action: handleLogout,
            color: "text-red-500"
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-3xl mx-auto px-6 py-6">
                    <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-6 pt-8">
                {/* Profile Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-sm p-8 mb-8"
                >
                    <div className="flex flex-col items-center text-center">
                        {/* Profile Photo */}
                        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-md mb-4">
                            <img
                                src={user.profilePic?.url || user.avatarUrl}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Name & Email */}
                        <h2 className="text-2xl font-semibold text-gray-900 mb-1">
                            {user.name}
                        </h2>
                        <p className="text-gray-600 mb-6">{user.email}</p>

                        {/* Edit Profile Button */}
                        <button
                            onClick={() => navigate("/student/dashboard/update-profile")}
                            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-medium transition-colors"
                        >
                            <EditIcon />
                            Edit Profile
                        </button>
                    </div>
                </motion.div>

                {/* Menu Options */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="px-6 py-5 border-b">
                        <h3 className="font-semibold text-gray-900">Account</h3>
                    </div>

                    {menuItems.map((item, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                if (item.action) {
                                    item.action();
                                } else if (item.path) {
                                    navigate(item.path);
                                }
                            }}
                            className="flex items-center gap-4 px-6 py-5 border-b last:border-b-0 hover:bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer"
                        >
                            <div className={`${item.color}`}>
                                {item.icon}
                            </div>
                            <span className={`font-medium text-lg ${item.color}`}>
                                {item.label}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Extra Info Section (Optional) */}
                <div className="mt-10 text-center text-xs text-gray-500">
                    JobSphere Student Portal • Version 1.0
                </div>
            </div>
        </div>
    );
};

export default StudentProfile;