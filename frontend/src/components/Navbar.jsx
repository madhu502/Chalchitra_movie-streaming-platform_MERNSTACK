import { LogOut, Menu, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authUser";
import { useContentStore } from "../store/content";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false); // State for logout confirmation dialog
  const { user, logout } = useAuthStore();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const { setContentType } = useContentStore();

  const handleLogout = () => {
    logout(); // Call the logout function
    setIsLogoutDialogOpen(false); // Close the dialog after logout
  };

  return (
    <header className="max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20">
      <div className="flex items-center gap-10 z-50">
        <Link to="/">
          <img
            src="/chalchitra-logo.png"
            alt="Chalchitra Logo"
            className="w-32 sm:w-40"
          />
        </Link>

        {/* desktop navbar items */}
        <div className="hidden sm:flex gap-5 items-center">
          <Link
            to="/"
            className="hover:underline"
            onClick={() => setContentType("movie")}
          >
            Movies
          </Link>
          <Link
            to="/"
            className="hover:underline"
            onClick={() => setContentType("tv")}
          >
            Tv Shows
          </Link>
          <Link to="/history" className="hover:underline">
            Search History
          </Link>
        </div>
      </div>
      <div className="flex gap-8 items-center z-50">
        <Link to={"/search"}>
          <Search className="size-6 cursor-pointer" />
        </Link>
        <img
          src={user.image}
          alt="Avatar"
          className="h-8 rounded cursor-pointer"
        />
        <LogOut
          className="size-6 cursor-pointer"
          onClick={() => setIsLogoutDialogOpen(true)} // Open the logout confirmation dialog
        />
        <div className="sm:hidden">
          <Menu className="size-6 cursor-pointer" onClick={toggleMobileMenu} />
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800">
          <Link
            to={"/"}
            className="block hover:underline p-2"
            onClick={toggleMobileMenu}
          >
            Movies
          </Link>
          <Link
            to={"/"}
            className="block hover:underline p-2"
            onClick={toggleMobileMenu}
          >
            Tv Shows
          </Link>
          <Link
            to={"/history"}
            className="block hover:underline p-2"
            onClick={toggleMobileMenu}
          >
            Search History
          </Link>
        </div>
      )}

      {/* Logout Confirmation Dialog */}
      {isLogoutDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 text-center max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4 text-orange-500">
              Confirm Logout
            </h2>
            <p className="text-gray-900 mb-6">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={handleLogout} // Confirm logout
              >
                Yes, Logout
              </button>
              <button
                className="bg-gray-500 px-4 py-2 rounded hover:bg-gray-600"
                onClick={() => setIsLogoutDialogOpen(false)} // Cancel logout
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
