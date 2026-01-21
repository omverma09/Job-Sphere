import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout.jsx"
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AllPublicPages from "./layouts/AllPublicPages.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx"
import DashboardAllPages from "./components/dashboardcompo/DashboardAllPages.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import JobsPage from "./pages/JobsPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import JobDetails from "./components/dashboardcompo/JobDetails.jsx";
import Prepration from "./components/dashboardcompo/Prepration.jsx";
import Courses from "./components/dashboardcompo/Courses.jsx";
import RecruiterLayout from "./layouts/RecruiterLayout.jsx";
import PostJob from "./components/recruiterDashboard/PostJob.jsx";
import MyJobs from "./components/recruiterDashboard/MyJobs.jsx";
import UpdateProfileForm from "./components/dashboardcompo/UpdateProfileForm.jsx";
import Applicants from "./components/recruiterDashboard/Applicants.jsx";
import MyApplications from "./components/dashboardcompo/MyApplications.jsx";
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
