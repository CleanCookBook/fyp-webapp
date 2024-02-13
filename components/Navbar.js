import LoadingSpinner from "@/components/LoadingSpinner";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const Navbar = ({ userRole }) => {

  const [loading, setLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://ccb-backendd.onrender.com/api/logout", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        // Redirect the user to the login page or perform other actions as needed
        window.location.href = "/loginPage";
      } else {
        console.error("Logout failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during logout:", error.message);
    } finally {
      setLoading(false); // Set loading back to false when logout operation completes
    }
  };


  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const notificationDropdownRef = useRef(null);
  const accountDropdownRef = useRef(null);

  const toggleAccount = () => {
    setIsAccountOpen(!isAccountOpen);
    if (isNotificationOpen) setIsNotificationOpen(false);
  };

  const handleCheckboxChange = (id) => {
    const updatedNotifications = notifications.map((notification) =>
      notification.id === id
        ? { ...notification, isChecked: !notification.isChecked }
        : notification
    );
    setNotifications(updatedNotifications);
  };


  const getLogoLink = (userRole) => {
    switch (userRole) {
      case 'user':
        return '/home';
      case 'nutritionist':
        return '/home/BPHomepage'; // Update this to the desired link for 'bp'
      case 'system admin':
        return '/home/SysAdminHome'; // Update this to the desired link for 'sysadmin'
      default:
        return '/home'; // Default link for unknown roles
    }
  };

  // Handle link click
  const handleLinkClick = () => {
    setLoading(true); // Set loading to true when a link is clicked
    setShowLoader(true); // Show the loader overlay
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationDropdownRef.current &&
        !notificationDropdownRef.current.contains(event.target) &&
        accountDropdownRef.current &&
        !accountDropdownRef.current.contains(event.target)
      ) {
        setIsNotificationOpen(false);
        setIsAccountOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  if (showLoader) {
    // Display loading spinner overlay
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <nav className="flex w-full bg-blue-950 h-[80px] items-center">
      <div className="text-white flex w-1/2 justify-start font-black text-2xl px-10">
        {/* Circular Logo Image */}
        <div className="overflow-hidden w-16 h-16 flex-shrink-0">
        <Link href={getLogoLink(userRole)}>
            <Image
              src="/logo.jpg" // Update the path based on your actual file structure
              alt="Logo"
              width={80} // Adjust the width as needed
              height={80} // Adjust the height as needed
            />
          </Link>
        </div>
      </div>
      <div className="container mx-auto">
        <ul>
          <li className="text-white font-bold flex justify-end">
            <Link href="/aboutUs">
              <button 
                className="px-4 hover:opacity-[0.5]"
                onClick={handleLinkClick}
              >
                About Us
              </button>
            </Link>
            {userRole === "user" && (
              <>
                <Link href="/NewsFeed">
                  <button className="px-4 hover:opacity-[0.5]" onClick={handleLinkClick}>NewsFeed</button>
                </Link>
                <Link href="/mpfirst">
                  <button className="px-4 hover:opacity-[0.5]" onClick={handleLinkClick}>
                    Meal Plans
                  </button>
                </Link>
                <Link href="/videos">
                  <button className="px-4 hover:opacity-[0.5]" onClick={handleLinkClick}>
                    Videos
                  </button>
                </Link>
                <Link href="/BPAnnouncement">
                  <button className="px-4 hover:opacity-[0.5]" onClick={handleLinkClick}>
                    Socials
                  </button>
                </Link>
                <Link href="/LivechatwithBot">
                  <button className="px-4 hover:opacity-[0.5]" onClick={handleLinkClick}>
                    FAQ
                  </button>
                </Link>
                <Link href="/Payment">
                  <button className="px-4 hover:opacity-[0.5]" onClick={handleLinkClick}>
                    Premium
                  </button>
                </Link>
              </>
            )}
            <div
              className="relative inline-block text-left"
              ref={accountDropdownRef}
            >
              <button
                onClick={toggleAccount}
                className="px-4 hover:text-gray-400 focus:outline-none"
              >
                Account
              </button>
              {isAccountOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    {userRole !== "system admin" && (
                      <>
                        <a
                          href="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Profile
                        </a>
                      </>
                    )}
                    {userRole === "user" && (
                      <>
                        <a
                          href="/AboutMe"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          About Me
                        </a>
                        
                    <a
                      href="/detailRecipe/favorite"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      My Favorite Recipe
                    </a>
                    <a
                      href="/detailRecipe/customizedlist"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      My Customised Recipe
                    </a>
                    <a
                      href="/CreateUserFeedback"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Feedback
                    </a>
                    </>
                    )}
                    <a
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      Log Out
                    </a>
                  </div>
                </div>
              )}
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;