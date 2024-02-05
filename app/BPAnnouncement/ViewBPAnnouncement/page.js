"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ViewBPAnnouncement = () => {
  const [searchParams, setSearchParams] = useState(null);
  const [name, setName] = useState(null);
  const [userRole, setUserRole] = useState("nutritionist");
  const [imageData, setImageData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const [loading,  setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    // Ensure the code runs only in the browser environment
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      setSearchParams(params);
      const paramName = params.get("name");
      setName(paramName);
    }
  }, [router]);

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

  // Define handleLikeClick function to toggle the isLiked state
  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    // Fetch like status or set it based on some condition
    // For demonstration purposes, let's set it to true initially
    setIsLiked(true);
  }, []);

  const handleSubmitComment = () => {
    // Handle comment submission
  };

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
    <div className="container mx-auto w-auto p-4 flex-1 mb-16 flex flex-col items-center">
      {/* Back link and details */}
      <div className="flex justify-start items-start mt-4 mb-4  text-center">
        <Link
          href="/BPAnnouncement"
          className="flex justify-center items-center w-28 h-10 bg-blue-950 hover:bg-[#154083] text-white text-xl font-bold rounded-[10px] shadow -ml-[28rem]"
        >
          &lt;&nbsp;&nbsp;Back
        </Link>
        <div className="relative ml-[28rem]">
          <h1 className="text-5xl font-extrabold text-[#0A2A67]">
            {name}
          </h1>
          <h2 className="text-4xl font-extrabold text-[#0A2A67]">Details:</h2>
        </div>
      </div>

      <div className="container mx-auto w-auto p-4 flex-1 flex">
        {/* Left Section: Announcement */}
        <div className="w-1/2 mr-4">
          <div className="relative">
            <div className="bg-white rounded-lg p-4">
              {imageData && (
                <img 
                  src={imageData} 
                  alt="Announcement" 
                  className="max-w-full" 
                  style={{ height: "auto" }} />
              )}
              {/* Like button */}
              <div className="mt-4">
                <button 
                  className="text-red-500 hover:text-red-700 text-3xl"
                  onClick={handleLikeClick}
                >
                  {!isLiked ? (
                    <FaHeart className="text-red-500 text-4xl ml-5" />
                  ) : (
                    <FaRegHeart className="text-blue-950 text-4xl ml-5" />
                  )}
                </button> 
              </div>              
            </div>   
          </div>
        </div>
        
        {/* Right Section: Comments */}
        <div className="w-1/2">
          <div className="mt-1">
            <div className="mt-1">
              {/* Comment section goes here */}
              <h2 className="text-3xl font-bold text-[#0A2A67]">Comments :</h2>
              {/* Add your comment components or form here */}
              <div className="bg-white h-96 p-4 rounded-t-lg shadow-md mt-4">
                <div className="flex items-center mb-4">
                  <img
                    src="profile logo.png"
                    alt="Profile Picture"
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <div className="text-blue-950 font-bold">@JohnDoe</div>
                      {/* Display the user's rating */}
                    </div>
                    <p className="text-blue-950 font-semibold">
                      This is a sample comment.
                    </p>
                    <div>
                      {/* Display star rating */}
                      {/* You can customize this or remove it if not needed */}
                    </div>
                    {/* Display delete button */}
                    {/* You can customize this or remove it if not needed */}
                  </div>
                </div>
                <div className="flex items-center">
                  <img
                    src="profile logo.png"
                    alt="Profile Picture"
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <div className="text-blue-950 font-bold">@JaneDoe</div>
                      {/* Display the user's rating */}
                    </div>
                    <p className="text-blue-950 font-semibold">
                      Another sample comment.
                    </p>
                    <div>
                      {/* Display star rating */}
                      {/* You can customize this or remove it if not needed */}
                    </div>
                    {/* Display delete button */}
                    {/* You can customize this or remove it if not needed */}
                  </div>
                </div>
              </div>
              {/* Add more static comments as needed */}

              {/* New Comment Form */}
              <div className="bg-white p-4 shadow-md flex rounded-b-lg">
                {/* Comment Input Field */}
                <div className="mb-4 flex-1">
                  <input
                    className="shadow appearance-none border-t border-b border-l rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="comment"
                    placeholder="Write your comment here..."
                  />
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    className="bg-white shadow text-blue-950 border-t border-b border-r rounded-r appearance-none font-bold py-2 px-3 w-full leading-tight focus:outline-none"
                    type="button"
                    onClick={handleSubmitComment}
                  >
                    Send
                  </button>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
  );

};

export default ViewBPAnnouncement;