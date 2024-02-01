// pages/videos.js
"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { formatDistanceToNow } from 'date-fns';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const videos = () => {
  const userRole = "user";
  const router = useRouter();
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    // Fetch videos from YouTube API or your backend
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/healthy-videos"
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
      } catch (error) {
        console.error("Error fetching videos:", error.message);
      }
    };

    fetchVideos();
  }, []);

  const handleVideoClick = (videoId) => {
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    window.open(videoUrl, "_blank");
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F9D548]">
      <Navbar userRole={userRole} />

      <div className="flex flex-col justify-center items-center mt-20">
        <h2 className="text-3xl font-semibold mb-4"> Recipes </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {videoList.map((video) => (
            <div
              key={video.id}
              className="cursor-pointer p-4 border border-blue-950 rounded-lg transition-transform transform hover:scale-105"
              onClick={() => handleVideoClick(video.id)}
            >
              <img
                src={`https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`}
                alt={video.title}
                className="w-full h-36 object-cover rounded-lg mb-2"
              />
              <div className="flex flex-col">
                <p className="text-blue-950 text-lg font-semibold mb-1">
                  {video.title}
                </p>
                {/* Access publishedAt from the original API response item */}
                <p className="text-green-900 text-sm">
                  Uploaded on {video.publishedAt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default videos;
