import LoggedInHome from '../dashboardcompo/LoggedInHome.jsx'
import RecommendedJobs from './RecommendedJobs .jsx'
import LazySection from '../../pages/LazySection.jsx'
import CertificationCourses from './CertificationCourses.jsx'
import PlacementCoursesAI from './PlacementCoursesAI.jsx'
import OurPlacements from './OurPlacements.jsx'

export default function DashboardAllPages() {
  return (
    <div>
        <LoggedInHome/>
        <LazySection><RecommendedJobs/></LazySection>
        <LazySection><CertificationCourses/></LazySection>
        <LazySection><PlacementCoursesAI/></LazySection>
        <LazySection><OurPlacements/></LazySection>
    </div>
  )
}
