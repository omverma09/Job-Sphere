import { Outlet } from 'react-router-dom';
import RecruiterNavbar from '../components/recruiterDashboard/RecruiterNavbar';
import Footer from '../components/Footer';

export default function RecruiterLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <RecruiterNavbar />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
}