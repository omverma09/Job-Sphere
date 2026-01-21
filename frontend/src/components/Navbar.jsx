import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <>
        <div className="w-full upper-nav">Build Your career with us</div>
        <nav className="w-full border-b bg-white px-4 py-3">

          <div className="mx-auto flex max-w-7xl items-center justify-between">

            {/* Logo */}
            <h2 className="text-2xl font-bold text-blue-600"
               onClick={()=> navigate("/")}
            >
              Job<span className="text-black">Sphere</span>
            </h2>

            {/* Search (hidden on mobile) */}
            <div className="hidden md:block">
              <TextField
                size="small"
                placeholder="Search jobs..."
                sx={{ width: 280 }}
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="outlined">Login</Button>
              </Link>

              <Link to="/register">
                <Button variant="contained">Register</Button>
              </Link>

              <Link
                className="hidden md:block text-blue-600 text-sm"
              >
                Employer sign up →
              </Link>
            </div>
          </div>
        </nav>
    </>
  );
};

export default Navbar;