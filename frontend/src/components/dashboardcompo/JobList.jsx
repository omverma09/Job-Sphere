import Loader from "../Loader";
import JobCard from "./JobCard";
import { Typography } from "@mui/material";

const JobList = ({ jobs, loading, lastJobRef }) => {
  if (loading && (!jobs || jobs.length === 0)) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader />
      </div>
    );
  }

  if (!jobs || jobs.length === 0) {
    return (
      <div className="text-center py-8">
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No jobs found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Try adjusting your filters or check back later
        </Typography>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {jobs.map((job, index) => {
        if (jobs.length === index + 1) {
          return (
            <div ref={lastJobRef} key={job._id}>
              <JobCard job={job} />
            </div>
          );
        }
        return <JobCard key={job._id} job={job} />;
      })}
    </div>
  );
};

export default JobList;