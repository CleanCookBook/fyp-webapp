// pages/videos.js
"use client";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";
import Navbar from "@/components/Navbar";
import { formatDistanceToNow } from 'date-fns';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const videos = () => {
  const userRole = "user";
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [videoList, setVideoList] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch("https://ccb-backendd.onrender.com/api/check-auth", {
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
        setLoading(false);
      }
    };

    checkAuthentication();
  }, [router]);

  useEffect(() => {
    // Fetch videos from YouTube API or your backend
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          "https://ccb-backendd.onrender.com/api/healthy-videos"
        );
        const data = await response.json();

        // Assuming the response data structure has an array of videos
        const videos = data.items.map((item) => {
          const videoId = item.id.videoId;
          const timeAgo = formatDistanceToNow(new Date(item.snippet.publishedAt), { addSuffix: true });


          return {
            id: videoId,
            title: item.snippet.title,
            publishedAt: timeAgo,
            // other properties you may need
          };
        });

        // Set the state with the newly created 'videos' array
        setVideoList(videos);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching videos:", error.message);
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    // Function to fetch payment status
    const fetchPaymentStatus = async () => {
      try {
        // Fetch payment status from the server
        const response = await fetch("https://ccb-backendd.onrender.com/api/payment/status", {
          method: "GET",
          credentials: "include", // Include credentials to send cookies with the request
        });

        const data = await response.json();
        setPaymentStatus(data.status);
        console.log("Payment Status:", data.status);
      } catch (error) {
        console.error("Error fetching payment status:", error.message);
      }
    };

    // Call the function to fetch payment status
    fetchPaymentStatus();
  }, []);

  const handleVideoClick = (videoId) => {
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    window.open(videoUrl, "_blank");
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
      <div className="flex flex-col justify-center items-center mt-20 mb-20">
        <h2 className="text-5xl text-[#0A2A67] font-black text-left mb-4"> Videos </h2>
        <div className="relative mt-2">
          {paymentStatus !== "paid" && (
            <div className="absolute inset-0 -top-40 flex items-center justify-center z-10">
              <div className="bg-[#00509D] rounded-[20px] p-8 w-[400px]">
                <img
                  src="/unlock.png"  // Replace with the correct path to your GIF file
                  alt="Unlock"
                  className="mx-auto"
                />
                <p className="text-[#FFFFFF] font-bold text-lg flex justify-center items-center -mt-4">
                  Upgrade to Unlock : <br />
                  &#10003; View unlimited recipes. <br />
                  &#10003; Access to various meal plans. <br />
                  &#10003; Chat with professional nutritionists.
                </p>
                <Link href="/Payment">
                  <button className="block mx-auto bg-white hover:bg-grey-700 text-blue-950 font-bold py-2 px-4 rounded mt-4">
                    Upgrade
                  </button>  
                </Link>
              </div>
            </div>
          )}

          <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 ${paymentStatus !== "paid" ? 'blur' : ''}`}>
            {videoList.map((video) => (
              <div
                key={video.id}
                className="cursor-pointer p-4 border border-slate-600 rounded-lg transition-transform transform hover:scale-105"
                onClick={() => handleVideoClick(video.id)}
              >
                <img
                  src={`https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`}
                  alt={video.title}
                  className="w-full h-48 object-cover rounded-lg mb-2"
                />
                <div className="flex flex-col">
                  <p className="text-blue-950 text-lg font-bold mb-1">
                    {video.title}
                  </p>
                  {/* Access publishedAt from the original API response item */}
                  <p className="text-green-900 text-sm font-medium">
                    Uploaded on {video.publishedAt}
                  </p>
                </div>
              </div>
            ))}
          </div>  
        </div>
        
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default videos;
