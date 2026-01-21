import { useEffect, useState } from "react";
import Loader from "../Loader.jsx"
import API from "../../api/axios.js";
import {
  Card,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";

const statusColor = {
  pending: "warning",
  accepted: "success",
  rejected: "error",
};

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await API.get(
          "applications/my-applications",
        );
        setApplications(res.data.applications);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader/>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">
          My Applications
        </h1>

        {applications.length === 0 ? (
          <p className="text-gray-600">
            You haven’t applied to any jobs yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {applications.map((app) => (
              <Card key={app._id} className="shadow-md rounded-xl">
                <CardContent className="space-y-2">
                  <Typography variant="h6">
                    {app.job?.title}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {app.job?.company} • {app.job?.location}
                  </Typography>

                  <div className="flex items-center justify-between pt-2">
                    <Chip
                      label={app.status}
                      color={statusColor[app.status]}
                      size="small"
                    />

                    <span className="text-sm text-gray-500">
                      Applied on{" "}
                      {new Date(app.appliedAt).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;