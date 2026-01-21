import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import LazySection from "../pages/LazySection";
const PublicLayout = () => {
  return (
    <>
      <Navbar />
       <main >
        <Outlet />
      </main>
      <Footer/>
    </>
  );
};

export default PublicLayout;
