import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout ";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AllPublicPages from "./layouts/AllPublicPages";
import DashboardLayout from "./layouts/dashboardLayout";
import DashboardAllPages from "./components/dashboardcompo/DashboardAllPages";
import { AuthProvider } from "./context/AuthContext";
import JobsPage from "./pages/JobsPage";
import NotFound from "./pages/NotFound";
import JobDetails from "./components/dashboardcompo/JobDetails ";
import Prepration from "./components/dashboardcompo/Prepration";
import Courses from "./components/dashboardcompo/Courses";
import RecruiterLayout from "./layouts/RecruiterLayout";
import PostJob from "./components/recruiterDashboard/PostJob";
import MyJobs from "./components/recruiterDashboard/MyJobs";
import UpdateProfileForm from "./components/dashboardcompo/UpdateProfileForm";
import Applicants from "./components/recruiterDashboard/Applicants";
import MyApplications from "./components/dashboardcompo/MyApplications";
import ProtectRoute from "./routes/ProtectRoute.jsx"

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>

          <Route path="/" element={<PublicLayout />}>
            <Route index element={<AllPublicPages />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<ProtectRoute />}>
            <Route path="/student/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardAllPages />} />
              <Route path="/student/dashboard/update-profile" element={<UpdateProfileForm />} />
              <Route path="/student/dashboard/my-application" element={<MyApplications />} />
              <Route path="/student/dashboard/prepare" element={<Prepration />} />
              <Route path="/student/dashboard/placement-courses" element={<Courses />} />
              <Route path="/student/dashboard/jobs" element={<JobsPage />} />
              <Route path="/student/dashboard/jobs/:id" element={<JobDetails />} />
            </Route>

            <Route path="/recruiter/dashboard" element={<RecruiterLayout />}>
              <Route index element={<Applicants />} />
              <Route path="/recruiter/dashboard/post-job" element={<PostJob />} />
              <Route path="/recruiter/dashboard/my-jobs" element={<MyJobs />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
