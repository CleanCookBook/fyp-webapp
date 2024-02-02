"use client";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const BPHomepage = () => {
  const router = useRouter();
  const userRole = 'bp';  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/check-auth", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          setIsAuthenticated(true);
          
        } else {
          router.push('/loginPage');
        }
      } catch (error) {
        console.error('Error during authentication check:', error.message);
      } finally {
        // Set loading to false when authentication check is complete
        setIsLoading(false);
      }
    };

    checkAuthentication();
  }, [router]);

  if (!isAuthenticated) {
    // If not authenticated, the user will be redirected during authentication check
    return null;
  }

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F9D548] text-[#0A2A67]">
      <Navbar userRole={userRole} className="fixed top-0 left-0 right-0" />
      <div className="flex flex-col items-center justify-center flex-1">
        <h2 className="text-6xl font-black mt-16">What Shall We Do Today? </h2>
          {/* Buttons container */}
          <div className="flex space-x-4 py-10">
            {/* Buttons */}
            <Link href="/ViewRecipe">
              <button className="bg-white hover:bg-gray-200 rounded-lg py-8 px-8 w-72 text-[#0A2A67] font-black text-2xl">
                Create/View Recipe
              </button>
            </Link>

            {/* Create/View Announcement */}
            <Link href="/BPAnnouncement">
              <button className="bg-white hover:bg-gray-200 rounded-lg py-8 px-8 w-72 text-[#0A2A67] font-black text-2xl">
                Create/View Announcement
              </button>
            </Link>

            {/* Chat with Us */}
            <button className="bg-white hover:bg-gray-200 rounded-lg py-8 px-8 w-72 text-[#0A2A67] font-black text-2xl">
              Chat with Us
            </button>
          </div>

          {/* Create/View MealPlan */}
          <div className="flex space-x-4 py-10 -mt-16">
            <Link href="/MealPlan">
              <button className="bg-white hover:bg-gray-200 rounded-lg py-8 px-8 w-[56rem] text-[#0A2A67] font-black text-2xl">
                Create/View MealPlan
              </button>
            </Link>
          </div>
      </div>
      <Footer className="fixed bottom-0 left-0 right-0" />
    </div>
  );
};

export default BPHomepage;
