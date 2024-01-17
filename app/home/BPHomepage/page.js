"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const BPHomepage = () => {
  const router = useRouter();
  const userRole = 'bp';  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Perform a quick check for authentication
    const checkAuthentication = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/check-auth", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          // If authenticated, redirect to the homepage
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error during authentication check:', error.message);
      }
    };

    checkAuthentication();
  }, [router]);

  if (!isAuthenticated) {
    // If not authenticated, the user will be redirected during authentication check
    return null;
  }



  return (
    <div className="flex flex-col min-h-screen bg-[#F9D548] text-[#0A2A67]">
      <Navbar userRole={userRole} className="fixed top-0 left-0 right-0" />
      <div className="flex flex-col items-center justify-center flex-1">
        <h2 className="text-6xl font-black mt-20">What Shall We Do Today? </h2>
        <div className="flex justify-center mt-8">
          {/* Buttons container */}
          <div className="flex space-x-4 py-10">
            {/* Buttons */}
            <Link href="/CreateRecipefirst">
              <button className="bg-white hover:bg-gray-200 text-[#0A2A67] font-bold py-8 px-8 rounded-lg text-2xl">
                Create/View Recipe
              </button>
            </Link>
            <Link href="/BPAnnouncement">
            <button className="bg-white hover:bg-gray-200 text-[#0A2A67] font-bold py-8 px-8 rounded-lg text-2xl">
              Create/View Announcement
            </button>
            </Link>
            <button className="bg-white hover:bg-gray-200 text-[#0A2A67] font-bold py-8 px-8 rounded-lg text-2xl">
              Chat with Us
            </button>
          </div>
        </div>
      </div>
      <Footer className="fixed bottom-0 left-0 right-0" />
    </div>
  );
};

export default BPHomepage;
