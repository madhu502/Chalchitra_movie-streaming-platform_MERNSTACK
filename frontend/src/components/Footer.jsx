import { Facebook, Github, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <Link to="/">
            {/* Logo now redirects to homepage */}
            <img
              src="/chalchitra-logo.png"
              alt="Chalchitra Logo"
              className="w-40 mb-4 md:mb-0"
            />
          </Link>
          <ul className="flex flex-wrap gap-6">
            <li>
              <Link to="/reviews" className="hover:underline">
                Reviews
              </Link>
            </li>
          </ul>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mb-8"></div>

        {/* Social Media Links */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            Follow us on social media:
          </p>
          <ul className="flex gap-6">
            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500"
              >
                <Facebook className="h-8 w-8" />
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400"
              >
                <Twitter className="h-8 w-8" />
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-500"
              >
                <Instagram className="h-8 w-8" />
              </a>
            </li>
            <li>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-500"
              >
                <Github className="h-8 w-8" />
              </a>
            </li>
          </ul>
        </div>

        {/* Bottom Section */}
        <div className="text-center text-sm text-gray-500 mt-8">
          &copy; {new Date().getFullYear()} Chalchitra. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
