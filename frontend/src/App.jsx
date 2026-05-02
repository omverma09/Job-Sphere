import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectRoute from "./routes/ProtectRoute.jsx";
import PublicLayout from "./layouts/PublicLayout.jsx";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import VerifyOtp from "./pages/VerifyOtp.jsx";
import NotFound from "./pages/NotFound.jsx";
import Loader from "./components/Loader.jsx";

// ── Lazy (loaded only when the user navigates there) ─────────────────────────
const AllPublicPages       = lazy(() => import("./layouts/AllPublicPages.jsx"));
const DashboardLayout      = lazy(() => import("./layouts/DashboardLayout.jsx"));
const DashboardAllPages    = lazy(() => import("./components/dashboardcompo/DashboardAllPages.jsx"));
const StudentProfile       = lazy(() => import("./pages/StudentProfile.jsx"));
const UpdateProfileForm    = lazy(() => import("./components/dashboardcompo/UpdateProfileForm.jsx"));
const MyApplications       = lazy(() => import("./components/dashboardcompo/MyApplications.jsx"));
const MyBatch              = lazy(() => import("./components/dashboardcompo/MyBatch.jsx"));
const Prepration           = lazy(() => import("./components/dashboardcompo/Prepration.jsx"));
const AllCourses           = lazy(() => import("./components/dashboardcompo/AllCourses.jsx"));
const CourseDetails        = lazy(() => import("./components/dashboardcompo/CourseDetails.jsx"));
const JobsPage             = lazy(() => import("./pages/JobsPage.jsx"));
const JobDetails           = lazy(() => import("./components/dashboardcompo/JobDetails.jsx"));
const WatchCourse          = lazy(() => import("./components/dashboardcompo/WatchCourse.jsx"));

const RecruiterLayout      = lazy(() => import("./layouts/RecruiterLayout.jsx"));
const PostJob              = lazy(() => import("./components/recruiterDashboard/PostJob.jsx"));
const MyJobs               = lazy(() => import("./components/recruiterDashboard/MyJobs.jsx"));
const Applicants           = lazy(() => import("./components/recruiterDashboard/Applicants.jsx"));

const InstructorLayout     = lazy(() => import("./layouts/InstructorLayout.jsx"));
const InstructorDashboard  = lazy(() => import("./components/InstructorDashboard/InstructorDashboard.jsx"));
const InstructorCourses    = lazy(() => import("./components/InstructorDashboard/InstructorCourses.jsx"));
const CourseBuilder        = lazy(() => import("./components/InstructorDashboard/CourseBuilder.jsx"));
const MyStudents           = lazy(() => import("./components/InstructorDashboard/MyStudents.jsx"));
const MyPayments           = lazy(() => import("./components/InstructorDashboard/MyPayments.jsx"));
const InstructorSetting    = lazy(() => import("./components/InstructorDashboard/InstructorSetting.jsx"));

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<Loader />}>
          <Routes>

            <Route path="/" element={<PublicLayout />}>
              <Route index element={<AllPublicPages />} />
              <Route path="login"      element={<Login />} />
              <Route path="register"   element={<Register />} />
              <Route path="verify-otp" element={<VerifyOtp />} />
            </Route>

            <Route element={<ProtectRoute />}>
              <Route path="/student/dashboard" element={<DashboardLayout />}>
                <Route index                          element={<DashboardAllPages />} />
                <Route path="profile"                element={<StudentProfile />} />
                <Route path="update-profile"         element={<UpdateProfileForm />} />
                <Route path="my-application"         element={<MyApplications />} />
                <Route path="my-batch"               element={<MyBatch />} />
                <Route path="prepare"                element={<Prepration />} />
                <Route path="placement-courses"      element={<AllCourses />} />
                <Route path="courses/:id"            element={<CourseDetails />} />
                <Route path="jobs"                   element={<JobsPage />} />
                <Route path="jobs/:id"               element={<JobDetails />} />
              </Route>

              <Route path="/watch-course/:id" element={<WatchCourse />} />

              <Route path="/recruiter/dashboard" element={<RecruiterLayout />}>
                <Route index             element={<Applicants />} />
                <Route path="post-job"   element={<PostJob />} />
                <Route path="my-jobs"    element={<MyJobs />} />
              </Route>

              <Route path="/instructor/dashboard" element={<InstructorLayout />}>
                <Route index                     element={<InstructorDashboard />} />
                <Route path="courses"            element={<InstructorCourses />} />
                <Route path="course-builder/:id" element={<CourseBuilder />} />
                <Route path="students"           element={<MyStudents />} />
                <Route path="payments"           element={<MyPayments />} />
                <Route path="setting"            element={<InstructorSetting />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;