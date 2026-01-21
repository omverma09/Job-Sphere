import {
  Facebook,
  Instagram,
  LinkedIn,
  Twitter,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

          <div>
            <h2 className="text-2xl font-bold text-white mb-3">
              JobPortal
            </h2>
            <p className="text-sm text-gray-400">
              Helping students and freshers find jobs, internships,
              and career opportunities.
            </p>
            <div className="flex gap-4 mt-4">
              <SocialIcon Icon={Facebook} />
              <SocialIcon Icon={Instagram} />
              <SocialIcon Icon={LinkedIn} />
              <SocialIcon Icon={Twitter} />
            </div>
          </div>

          <FooterColumn title="Company">
            <FooterLink >About Us</FooterLink>
            <FooterLink >How it Works</FooterLink>
            <FooterLink >Student Reviews</FooterLink>
            <FooterLink >Contact Us</FooterLink>
          </FooterColumn>

          <FooterColumn title="Services">
            <FooterLink >Jobs</FooterLink>
            <FooterLink >Our Services</FooterLink>
            <FooterLink >Courses</FooterLink>
            <FooterLink >
              Company Preparation
            </FooterLink>
          </FooterColumn>

          <FooterColumn title="Legal">
            <FooterLink>
              Privacy Policy
            </FooterLink>
            <FooterLink>
              Terms & Conditions
            </FooterLink>
            <FooterLink>
              Disclaimer
            </FooterLink>
          </FooterColumn>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} JobPortal. All rights reserved.
          </p>

          <p className="text-sm text-gray-400">
            Made with ❤️ for students & freshers
          </p>
        </div>
      </div>
    </footer>
  );
};

const FooterColumn = ({ title, children }) => (
  <div>
    <h3 className="text-white font-semibold mb-4">
      {title}
    </h3>
    <ul className="space-y-2 text-sm">
      {children}
    </ul>
  </div>
);

const FooterLink = ({ to, children }) => (
  <li>
    <Link
      to={to}
      className="hover:text-white transition"
    >
      {children}
    </Link>
  </li>
);

const SocialIcon = ({ Icon }) => (
  <div className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition cursor-pointer">
    <Icon fontSize="small" />
  </div>
);

export default Footer;