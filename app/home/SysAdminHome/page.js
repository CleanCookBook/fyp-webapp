"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SysAdminHome = () => {

  const userRole = 'system admin';  
  const [loading, setIsLoading] = useState(true);
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
      <div className="flex flex-col justify-center items-center flex-1">
        <h2 className="text-6xl font-black">What Shall We Do Today?</h2>
        <div className="flex space-x-4 py-10">
          <button className="bg-white hover:bg-gray-200 rounded-lg py-8 px-8 w-72 text-[#0A2A67] font-black text-2xl">
            <Link href="/AccountInfo/ViewUser" className="text-[#0A2A67]">
              View Users
            </Link>
          </button>

          <button className="bg-white hover:bg-gray-200 rounded-lg py-8 px-8 w-72 text-[#0A2A67] font-black text-2xl">
            <Link href="/AccountInfo/ViewPartner" className="text-[#0A2A67]">
              View Partners
            </Link>
          </button>

          <button className="bg-white hover:bg-gray-200 rounded-lg py-8 px-8 w-72 text-[#0A2A67] font-black text-2xl">
            <Link href="/AccountInfo/viewUserFeedback" className="text-[#0A2A67]">
              View User's Feedback
            </Link>
          </button>
        </div>
        <div className="flex space-x-4 py-10 -mt-16">
          <button className="bg-white hover:bg-gray-200 rounded-lg py-8 px-8 w-[27.5rem] text-[#0A2A67] font-black text-2xl">
              <Link href="/AccountInfo/ReviewInfo" className="text-[#0A2A67]">
                Review Partner's
              <br /> Application
              </Link>
            </button>
          <button className="bg-white hover:bg-gray-200 rounded-lg py-8 px-8 w-[27.5rem] text-[#0A2A67] font-black text-2xl">
            <Link href="/AccountInfo/createAccount" className="text-[#0A2A67]">
              Create Account
            </Link>
          </button>
        </div>
      </div>
      <Footer className="fixed bottom-0 left-0 right-0" />
    </div>
  );
};

export default SysAdminHome;
