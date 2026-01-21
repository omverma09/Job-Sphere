import { useState, useEffect } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Paper,
  Chip,
  Stack,
  Divider,
  IconButton,
  Breadcrumbs,
  Link,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  LocationOn as LocationIcon,
  Work as WorkIcon,
  Home as HomeIcon,
  CurrencyRupee as CurrencyRupeeIcon,
} from "@mui/icons-material";

import API from "../../api/axios.js"       // ← your axios instance (with token)
import Loader from "../Loader.jsx"

const JobDetails = () => {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [applying, setApplying] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await API.get(`/jobs/${id}`);
        setJob(res.data.job);
      } catch (err) {
        console.error("Failed to load job:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleApply = async () => {
    if (hasApplied) return;

    setApplying(true);
    setErrorMsg("");

    try {
      const res = await API.post(`/applications/apply/${id}`);

      if (res.data.success) {
        setHasApplied(true);
        alert("Application submitted successfully!"); // ← replace with better UI later
      }
    } catch (err) {
      console.error("Apply failed:", err);
      const msg =
        err.response?.data?.message ||
        "Failed to apply. Please try again later.";
      setErrorMsg(msg);
    } finally {
      setApplying(false);
    }
  };

  const toggleSave = () => {
    setIsSaved((prev) => !prev);
    // TODO: call save/unsave API when you implement it
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", minHeight: "60vh", alignItems: "center" }}>
        <Loader />
      </Box>
    );
  }

  if (!job) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography variant="h5" color="error">Job not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 2, md: 4 }, py: { xs: 2, md: 4 } }}>
      {/* Breadcrumb + Back + Save */}
      <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
        <IconButton
          component={RouterLink}
          to="/student/dashboard/jobs"
          sx={{ color: "text.secondary" }}
        >
          <ArrowBackIcon />
        </IconButton>

        <Breadcrumbs aria-label="breadcrumb" separator="›">
          <Link component={RouterLink} to="/student/dashboard" underline="hover" color="inherit">
            Home
          </Link>
          <Link component={RouterLink} to="/student/dashboard/jobs" underline="hover" color="inherit">
            Jobs
          </Link>
          <Typography color="text.primary" fontWeight={500}>
            {job.title}
          </Typography>
        </Breadcrumbs>

        <IconButton
          onClick={toggleSave}
          color={isSaved ? "error" : "default"}
          sx={{
            ml: "auto",
            bgcolor: isSaved ? "error.light" : "action.hover",
            "&:hover": { bgcolor: isSaved ? "error.main" : "action.selected" },
          }}
        >
          {isSaved ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </Box>

      <Box sx={{ display: "flex", flexDirection: { xs: "column", lg: "row" }, gap: 4 }}>
        <Paper
          elevation={2}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 3,
            flex: 1,
            background: "linear-gradient(145deg, #ffffff, #f9fbff)",
          }}
        >
          <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
            {job.title}
          </Typography>

          <Typography variant="h6" color="primary.main" gutterBottom>
            {job.company}
          </Typography>

          <Stack direction="row" flexWrap="wrap" gap={1.5} sx={{ mt: 3, mb: 4 }}>
            <Chip icon={<LocationIcon />} label={job.location || "Not specified"} variant="outlined" />
            <Chip icon={<WorkIcon />} label={job.jobType || "—"} variant="outlined" />
            <Chip icon={<HomeIcon />} label={job.workMode || "—"} variant="outlined" />
            <Chip
              icon={<CurrencyRupeeIcon />}
              label={job.salary ? `${job.salary} LPA` : "Not disclosed"}
              color="success"
              variant="outlined"
            />
          </Stack>

          <Divider sx={{ my: 4 }} />

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Job Description
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ whiteSpace: "pre-wrap", lineHeight: 1.8 }}>
            {job.description || "No description provided."}
          </Typography>

          <Box sx={{ mt: 6, textAlign: "center" }}>
            <Button
              variant="contained"
              color={hasApplied ? "success" : "primary"}
              size="large"
              disabled={applying || hasApplied}
              onClick={handleApply}
              sx={{ px: 8, py: 1.5, fontSize: "1.1rem", borderRadius: 2, minWidth: 180 }}
            >
              {applying
                ? "Applying..."
                : hasApplied
                ? "Applied ✓"
                : "Apply Now"}
            </Button>

            {errorMsg && (
              <Typography color="error" sx={{ mt: 2 }}>
                {errorMsg}
              </Typography>
            )}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default JobDetails;