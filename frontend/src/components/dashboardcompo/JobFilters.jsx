import { useState } from "react";

const JobFilters = ({ onApply }) => {
  const [filters, setFilters] = useState({
    workMode: [],
    jobType: [],
    location: "",
    minSalary: "",
    maxSalary: "",
  });

  const [open, setOpen] = useState(false);

  const toggleCheckbox = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter(v => v !== value)
        : [...prev[key], value]
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="sticky top-20">
      
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden w-full bg-blue-500 text-white py-3 rounded-lg mb-3"
      >
        {open ? "Close Filters ▲" : "Open Filters ▼"}
      </button>

      <div
        className={`
          bg-white rounded-lg shadow p-4 space-y-5
          ${open ? "block" : "hidden"} 
          md:block
        `}
      >
        <h3 className="font-semibold text-lg">Filters</h3>

        {/* Work Mode */}
        <div>
          <p className="font-medium mb-2">Work mode</p>
          {["remote", "work-from-home", "on-site"].map(mode => (
            <label key={mode} className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                onChange={() => toggleCheckbox("workMode", mode)}
              />
              {mode}
            </label>
          ))}
        </div>

        {/* Job Type */}
        <div>
          <p className="font-medium mb-2">Job type</p>
          {["full-time", "part-time", "internship", "contract"].map(type => (
            <label key={type} className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                onChange={() => toggleCheckbox("jobType", type)}
              />
              {type}
            </label>
          ))}
        </div>

        {/* Location */}
        <input
          name="location"
          value={filters.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full border rounded px-3 py-2"
        />

        {/* Salary */}
        <div className="flex gap-2">
          <input
            name="minSalary"
            type="number"
            placeholder="Min Salary"
            onChange={handleChange}
            className="w-1/2 border rounded px-3 py-2"
          />
          <input
            name="maxSalary"
            type="number"
            placeholder="Max Salary"
            onChange={handleChange}
            className="w-1/2 border rounded px-3 py-2"
          />
        </div>

        <button
          onClick={() => {
            onApply(filters);
            setOpen(false); // mobile pe apply ke baad close
          }}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default JobFilters;
