import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const BPNavBar = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Notification 1", isChecked: false },
    { id: 2, text: "Notification 2", isChecked: false },
    // Add more notifications as needed
  ]);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/logout", {
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
    }
  };

  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const notificationDropdownRef = useRef(null);
  const accountDropdownRef = useRef(null);

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
    if (isAccountOpen) setIsAccountOpen(false);
  };

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

  const markAsRead = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      isChecked: true,
    }));
    setNotifications(updatedNotifications);
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

  return (
    <nav className="flex w-full bg-blue-950 h-[80px] items-center">
      <div className="text-white flex w-1/2 justify-start font-black text-2xl px-10">
        {/* Circular Logo Image */}
        <div className="overflow-hidden w-16 h-16 flex-shrink-0">
          <Link href="/home/BPHomepage">
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
              <button className="px-4 hover:opacity-[0.5]">About Us</button>
            </Link>
            <div
              className="relative inline-block text-left"
              ref={notificationDropdownRef}
            >
              <button
                onClick={toggleNotification}
                className="px-4 hover:text-gray-400 focus:outline-none"
              >
                Notification
              </button>
              {isNotificationOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-2 px-4">
                    {notifications.map((notification, index) => (
                      <div
                        key={notification.id}
                        className={`flex items-center justify-between py-2 ${
                          index !== notifications.length - 1
                            ? "border-b border-gray-500"
                            : ""
                        }`}
                      >
                        <label className="flex items-center space-x-2 w-full">
                          <span className="text-gray-700 flex-grow">
                            {notification.text}
                          </span>
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            checked={notification.isChecked}
                            onChange={() =>
                              handleCheckboxChange(notification.id)
                            }
                          />
                        </label>
                      </div>
                    ))}
                    <div className="flex justify-end mt-4">
                      <button
                        onClick={markAsRead}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                      >
                        Mark as Read
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <Link href="/NewsFeed">
              <button className="px-4 hover:opacity-[0.5]">NewsFeed</button>
            </Link>
            <Link href="/mpfirst">
              <button className="px-4 hover:opacity-[0.5]">Meal Plans</button>
            </Link>
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
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </a>
                    <a
                      href="/AboutMe"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      About Me
                    </a>
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

export default BPNavBar;