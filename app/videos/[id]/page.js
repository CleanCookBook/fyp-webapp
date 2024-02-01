// pages/video/[id].js
"use client";
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';

const VideoDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const { searchParams } = new URL(window.location.href);
  const searchTerm = searchParams.get('term');

  // Fetch the video details using the video ID and searchTerm (you need to implement this)
  // const videoDetails = fetchVideoDetails(id, searchTerm);

  // Example videoDetails structure (replace with actual data)
  const videoDetails = {
    title: 'Video Title',
    description: 'Video Description',
    views: 1000,
    // Add more details as needed
  };

  if (!id) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F9D548]">
      <Navbar userRole="user" />

      <div className="flex flex-col justify-center items-center mt-20">
        <h2 className="text-3xl font-semibold mb-4">{videoDetails.title}</h2>
        <p className="text-gray-400 text-sm mb-2">{videoDetails.views} views</p>
        <p className="text-gray-400 text-sm mb-2">Search Term: {searchTerm}</p>
        {/* Render video player or any other details you want */}
        {/* You might want to use a YouTube Embed component here */}
        <div className="w-full h-96 bg-gray-800">
          {/* Replace this with your video player or embed code */}
          {/* <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${id}`}
            title={videoDetails.title}
            frameBorder="0"
            allowFullScreen
          ></iframe> */}
        </div>
        <p className="text-gray-400 text-lg mt-4">{videoDetails.description}</p>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default VideoDetail;
