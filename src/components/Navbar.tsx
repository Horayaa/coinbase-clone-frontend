import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import Avatar from "react-avatar";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await axios.delete("/api/auth/logout", { withCredentials: true });
      logout();
      toast.success("Logged out");
      navigate("/");
    } catch(err) { 
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.error || "Failed to log out");
      }
    }
  };

  const navLinkClass = (path: string) =>
    `text-sm font-medium transition-all duration-200 ${location.pathname === path ? "text-blue-600" : "text-gray-600 hover:text-blue-600"
    }`;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-blue-600 font-bold text-xl tracking-tight hover:opacity-80 transition-opacity">
              Coinbase
            </Link>
            <div className="hidden sm:flex items-center gap-6">
              <Link to="/crypto" className={navLinkClass("/crypto")}>
                Explore
              </Link>
              <Link to="/crypto/gainers" className={navLinkClass("/crypto/gainers")}>
                Gainers
              </Link>
              <Link to="/crypto/new" className={navLinkClass("/crypto/new")}>
                New Listings
              </Link>
              {user && (
                <Link
                  to="/add-crypto"
                  className="text-sm bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-lg font-semibold transition-all border border-blue-100"
                >
                  Add Coin
                </Link>
              )}
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-4">
              
            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/profile" className="flex items-center gap-2 group">
                  <Avatar
                    name={user.name}
                    size="32"
                    round={true}
                    className=" rounded-full object-cover ring-2 ring-transparent group-hover:ring-blue-200 transition-all"
                  />
                  <span className="text-md capitalize text-blue-500 group-hover:text-gray-700 font-medium group-hover:text-blue-600 hidden md:inline">
                    {user.name}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm bg-black text-white px-4 py-2 rounded-lg font-semibold transition-colors shadow-sm"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-sm text-gray-700 font-medium hover:text-blue-600 transition-colors">
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all shadow-sm hover:shadow-md"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-4 shadow-inner">
          <div className="flex flex-col gap-4">
            <Link to="/crypto" onClick={() => setIsOpen(false)} className={navLinkClass("/crypto")}>Explore</Link>
            <Link to="/crypto/gainers" onClick={() => setIsOpen(false)} className={navLinkClass("/crypto/gainers")}>Gainers</Link>
            <Link to="/crypto/new" onClick={() => setIsOpen(false)} className={navLinkClass("/crypto/new")}>New Listings</Link>
            {user && (
              <Link
                to="/add-crypto"
                onClick={() => setIsOpen(false)}
                className="text-sm text-blue-600 font-semibold"
              >
                Add Coin
              </Link>
            )}
          </div>
          <hr className="border-gray-100" />
          <div className="flex flex-col gap-4">
            {user ? (
              <div className="flex ">
                <Link to="/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-3">
                  <Avatar
                    name={user.name}
                    size="32"
                    round={true}
                    className="rounded-full object-cover ring-2 ring-transparent hover:ring-blue-200 transition-all"
                  />
                  <span className="font-medium text-gray-900">{user.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm bg-black text-white px-4 py-2 rounded-lg font-semibold transition-colors shadow-sm ml-auto"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsOpen(false)} className="font-bold text-blue-500 border-2 border-blue-500 py-3 px-4 flex items-center justify-center rounded-md">Sign in</Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="w-full bg-blue-600 text-white text-center py-3 rounded-lg font-bold"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
