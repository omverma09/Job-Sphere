import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function RecruiterNavbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    closeMenu();
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="text-xl font-bold text-indigo-600">
            Job<span className="text-black">Sphere</span>
          </div>

          {/* Desktop Links + User Info */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/recruiter/dashboard"
              className={
                `py-2 px-3 rounded-md transition-colors`
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/recruiter/dashboard/post-job"
              className={({ isActive }) =>
                `font-medium pb-1 transition-colors ${isActive
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-600 hover:text-indigo-600'
                }`
              }
            >
              Post a Job
            </NavLink>

            <NavLink
              to="/recruiter/dashboard/my-jobs"
              className={({ isActive }) =>
                `font-medium pb-1 transition-colors ${isActive
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-600 hover:text-indigo-600'
                }`
              }
            >
              My Jobs
            </NavLink>

            <div className="flex items-center space-x-4 pl-6 border-l border-gray-200">
              <span className="text-gray-700 font-medium">
                {user?.name || 'Recruiter'}
              </span>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800 font-medium"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={closeMenu}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center p-5 border-b">
            <span className="text-lg font-bold text-indigo-600">Menu</span>
            <button onClick={closeMenu} aria-label="Close menu">
              <svg className="w-7 h-7 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* User Info */}
          <div className="p-5 border-b">
            <p className="font-medium text-gray-900">{user?.name || 'Recruiter'}</p>
            <p className="text-sm text-gray-600">{user?.email || ''}</p>
          </div>

          {/* Nav Links */}
          <div className="flex flex-col p-5 space-y-4 text-lg">
            <NavLink
              to="/recruiter/dashboard"
              onClick={closeMenu}
              className={
                `py-2 px-3 rounded-md transition-colors`
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/recruiter/dashboard/post-job"
              onClick={closeMenu}
              className={({ isActive }) =>
                `py-2 px-3 rounded-md ${isActive
                  ? 'bg-indigo-50 text-indigo-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              Post a Job
            </NavLink>

            <NavLink
              to="/recruiter/dashboard/my-jobs"
              onClick={closeMenu}
              className={({ isActive }) =>
                `py-2 px-3 rounded-md ${isActive
                  ? 'bg-indigo-50 text-indigo-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              My Jobs
            </NavLink>
          </div>

          {/* Logout at bottom */}
          <div className="mt-auto p-5 border-t">
            <button
              onClick={handleLogout}
              className="w-full py-3 px-4 bg-red-50 text-red-700 font-medium rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}