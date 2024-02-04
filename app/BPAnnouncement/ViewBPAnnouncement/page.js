"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ViewBPAnnouncement = () => {
  const searchParams = useSearchParams(window.location.search);
  const name = searchParams.get("name");
  const [userRole, setUserRole] = useState("nutritionist");
  const [imageData, setImageData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const [loading,  setIsLoading] = useState(true);

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

  useEffect(() => {
    const fetchUserType = async () => {
        try {
          const response = await fetch(
            "http://localhost:3001/api/user/userType",
            {
              method: "POST",
              credentials: "include",
            }
          );
  
          if (response.ok) {
            const data = await response.json();
            setUserRole(data.userType || "user"); // Set the userRole based on the response
          } else {
            console.error("Error fetching user type:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching user type:", error.message);
        }
      };
  
      // Fetch user type when the component mounts
      fetchUserType();
    const fetchAnnouncementFile = async () => {
      try {
        const response = await fetch(
            `http://localhost:3001/api/announce/getAnnouncementFile/${name}`,
          {
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();

          setImageData(data.announcementFile);
        } else {
          console.error(
            "Error fetching announcement file:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching announcement file:", error);
      }
    };

    fetchAnnouncementFile();
}, [name]);

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
    <div className="flex flex-col min-h-screen bg-[#F9D548]">
      <Navbar userRole={userRole} />
      <div className="container mx-auto w-auto p-4 flex-1 mb-11">
        <div className="flex flex-col items-center mb-4">
          <Link
            href="/BPAnnouncement"
            className="flex justify-center items-center w-28 h-10 bg-blue-950 hover:bg-[#154083] text-white text-xl font-bold rounded-[10px] shadow self-start mt-[45px] -ml-[28rem]"
          >
            &lt;&nbsp;&nbsp;Back
          </Link>
          <h1 className="text-5xl font-extrabold text-[#0A2A67] -mt-11 ml-8">
            {name}
          </h1>
          <h2 className="text-4xl font-extrabold text-[#0A2A67]">Details:</h2>
        </div>
        <div className="bg-white w-auto rounded-lg p-4 flex justify-center items-center">
          {imageData && (
            <img src={imageData} alt="Announcement" className="max-w-full" />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ViewBPAnnouncement;
