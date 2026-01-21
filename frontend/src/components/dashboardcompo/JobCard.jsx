import { useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const {
    title = "Job Title",
    company = "Company Name",
    salary,
    workMode = "on-site",
    location = "Location",
    _id, // for key or link if needed
  } = job || {};

  const salaryDisplay = salary
    ? `₹ ${salary.toLocaleString()} / year`
    : "Salary not disclosed";

  const workModeBadge =
    workMode === "remote" || workMode === "work-from-home"
      ? "WFH"
      : workMode === "on-site"
        ? "On-site"
        : "Hybrid";

  return (
    <div className="bg-white rounded-lg shadow p-5 hover:shadow-md transition"
       onClick={()=> navigate(`/student/dashboard/jobs/${job._id}`)}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex items-start gap-4 flex-1">
          <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 text-xl font-bold shrink-0">
            {company?.charAt(0) || "?"}
          </div>

          <div>
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-gray-500">{company}</p>
            <p className="text-sm text-gray-600 mt-1">{location}</p>
          </div>
        </div>

        <div
          className={`text-sm font-medium px-3 py-1 rounded-full ${workModeBadge === "WFH"
              ? "bg-blue-100 text-blue-700"
              : "bg-green-100 text-green-700"
            }`}
        >
          {workModeBadge}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-gray-600">
        <div className="font-medium">{salaryDisplay}</div>

        <button className="text-blue-600 font-medium hover:text-blue-800 transition">
          View details →
        </button>
      </div>
    </div>
  );
};

export default JobCard;