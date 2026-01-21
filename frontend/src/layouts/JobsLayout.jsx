import { useState, useEffect } from "react";
import API from "../api/axios.js";
import JobFilters from "../components/dashboardcompo/JobFilters.jsx";
import JobList from "../components/dashboardcompo/JobList.jsx";

const JobLayout = () => {
  const [filters, setFilters] = useState({});
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchJobs = async (appliedFilters = {}) => {
    try {
      setLoading(true);

      const params = {
        ...appliedFilters,
        workMode: appliedFilters.workMode?.join(","),
        jobType: appliedFilters.jobType?.join(","),
      };

      const res = await API.get("/jobs", { params });
      setJobs(res.data.jobs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleApplyFilters = (appliedFilters) => {
    setFilters(appliedFilters);
    fetchJobs(appliedFilters);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-4 gap-6">

        <div className="md:col-span-1">
          <JobFilters onApply={handleApplyFilters} />
        </div>

        <div className="md:col-span-3">
          <JobList jobs={jobs} loading={loading} />
        </div>

      </div>
    </div>
  );
};

export default JobLayout;