import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../../api/axios';
import Loader from '../Loader';

export default function MyJobs() {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        const res = await API.get('/jobs/recruiter');
        setJobs(res.data.jobs || res.data || []);
      } catch (err) {
        console.error(err);
        setError(
          err.response?.data?.message ||
          'Failed to load your jobs. Please try again.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMyJobs();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader/>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg">
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">My Posted Jobs</h1>
          <p className="mt-1 text-gray-600">
            Manage all the job openings you have created
          </p>
        </div>

        <Link
          to="/recruiter/dashboard/post-job"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium shadow-sm transition-colors flex items-center gap-2"
        >
          <span>+ Post New Job</span>
        </Link>
      </div>

      {/* No jobs state */}
      {jobs.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-10 text-center">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No jobs posted yet</h3>
          <p className="text-gray-600 mb-6">
            Start attracting talent by posting your first job opening.
          </p>
          <Link
            to="/recruiter/post-job"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Post Your First Job
          </Link>
        </div>
      ) : (
        /* Jobs Grid / List */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
            >
              <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {job.title}
                  </h3>
                  <span
                    className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${
                      job.workMode === 'remote' || job.workMode === 'work-from-home'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {job.workMode === 'work-from-home' ? 'WFH' : job.workMode}
                  </span>
                </div>

                <p className="text-gray-600 font-medium mb-1">{job.company}</p>
                <p className="text-sm text-gray-500 mb-4">{job.location}</p>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <span>💼</span>
                    <span>{job.jobType}</span>
                  </div>
                  {job.salary && (
                    <div className="flex items-center gap-1">
                      <span>₹</span>
                      <span>{job.salary} LPA</span>
                    </div>
                  )}
                </div>

                <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                  {job.description}
                </p>
              </div>

              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center text-sm">
                <div className="text-gray-500">
                  Posted: {formatDate(job.createdAt)}
                </div>
                <Link
                  className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
                >
                  View Applications →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}