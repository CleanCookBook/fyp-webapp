import Image from "next/image";
import Link from 'next/link';
import { useState } from "react";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="flex w-full bg-blue-950 h-[80px] items-center">
      <div className="text-white flex w-1/2 justify-start font-black text-2xl px-10">
        {/* Circular Logo Image */}
        <div className="overflow-hidden w-16 h-16 flex-shrink-0">
        <Link href="/home"> 
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
            <button className="px-4 hover:opacity-[0.5]">
            <Link href="/recipelist">
              Recipe
               </Link>
              </button>
              <Link href="/aboutUs">
            <button className="px-4 hover:opacity-[0.5]">
                About Us
            </button>
            </Link>
            <button className="px-4 hover:opacity-[0.5]">Notification</button>
            <button className="px-4 hover:opacity-[0.5]">NewsFeed</button>
            <button className="px-4 hover:opacity-[0.5]">Meal Plans</button>
            <div className="relative inline-block text-left">
              <button
                onClick={toggleDropdown}
                className="px-4 hover:text-gray-400 focus:outline-none"
              >
                Account
              </button>
              {isDropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Profile
                    </a>
                    <a
                      href="/AboutMe"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      About Me
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
