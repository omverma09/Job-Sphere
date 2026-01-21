// src/pages/recruiter/Applications.jsx
import { useState, useEffect } from 'react';
import Loader from "../Loader.jsx";
import API from "../../api/axios.js";   // ← tumhara axios instance (token ke saath)

export default function Applicants() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await API.get("/applications/recruiter/applications");
        
        if (res.data.success) {
          setApplications(res.data.applications || []);
        } else {
          setError("Failed to load applications");
        }
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const getStatusStyles = (status) => {
    const styles = {
      applied:     { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Applied' },
      shortlisted: { bg: 'bg-green-100',  text: 'text-green-800', label: 'Shortlisted' },
      rejected:    { bg: 'bg-red-100',    text: 'text-red-800',   label: 'Rejected' },
    };
    return styles[status] || { bg: 'bg-gray-100', text: 'text-gray-800', label: status };
  };

  if (loading) return <div className="text-center py-20"><Loader /></div>;

  if (error) {
    return <div className="text-red-600 text-center py-10">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Job Applications</h1>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search by name or job..."
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-64"
          />
          <select className="px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option>All Status</option>
            <option>Applied</option>
            <option>Shortlisted</option>
            <option>Rejected</option>
          </select>
        </div>
      </div>

      {applications.length === 0 ? (
        <div className="bg-white p-10 text-center rounded-lg shadow-sm">
          <h3 className="text-xl font-medium mb-2">No applications yet</h3>
          <p className="text-gray-600">When candidates apply, they'll appear here.</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Candidate</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Job Title</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Applied On</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {applications.map((app) => {
                const statusStyle = getStatusStyles(app.status);
                return (
                  <tr key={app._id} className="hover:bg-gray-50">
                    <td className="px-6 py-5">
                      <div className="font-medium text-gray-900">{app.candidateName}</div>
                      <div className="text-sm text-gray-500">{app.email}</div>
                    </td>
                    <td className="px-6 py-5 text-gray-900">{app.jobTitle}</td>
                    <td className="px-6 py-5 text-gray-600">{app.appliedDate}</td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full ${statusStyle.bg} ${statusStyle.text}`}>
                        {statusStyle.label}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex gap-4 text-sm">
                        <button className="text-indigo-600 hover:text-indigo-800">Resume</button>
                        <button className="text-green-600 hover:text-green-800">Shortlist</button>
                        <button className="text-red-600 hover:text-red-800">Reject</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}