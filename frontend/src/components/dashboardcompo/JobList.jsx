import Loader from "../Loader";
import JobCard from "./JobCard";
import { Box } from "@mui/material";

const JobList = ({ jobs, loading }) => {
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", minHeight: "60vh", alignItems: "center" }}>
        <Loader />
      </Box>
    );
  }

  if (!jobs) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography variant="h5" color="error">Job not found</Typography>
      </Box>
    );
  }

  return (
    <div className="md:col-span-3 space-y-4">
      {jobs.map(job => (
        <JobCard key={job._id} job={job} />
      ))}
    </div>
  );
};

export default JobList;