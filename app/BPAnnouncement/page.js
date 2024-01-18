"use client"
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useEffect, useState } from "react";

const AnnouncementsPage = () => {
  const userRole = "bp";
  const [announcements, setAnnouncements] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [announcementsPerPage] = useState(5);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/announce/user-announcements",
          {
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Announcement Data:", data); // Log the data here
          setAnnouncements(data);
        } else {
          console.error("Invalid data format received:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user recipes:", error);
      }
    };
  
    fetchAnnouncements();
  }, []);

  const indexOfLastAnnouncement = currentPage * announcementsPerPage;
  const indexOfFirstAnnouncement =
    indexOfLastAnnouncement - announcementsPerPage;
  const currentAnnouncements = announcements.slice(
    indexOfFirstAnnouncement,
    indexOfLastAnnouncement
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(announcements.length / announcementsPerPage);

  return (
    <div className="flex flex-col min-h-screen bg-[#F9D548]">
      <Navbar userRole={userRole}/>
      <div className="container mx-auto p-4 flex-1">
        <div className="flex items-center mb-4">
          <Link 
            href="/home/BPHomepage" 
            className="flex justify-center items-center w-28 h-10 bg-blue-950 hover:bg-[#154083] text-white text-xl font-bold rounded-[10px] shadow self-start mt-[45px] -ml-36"
          >
            &lt;&nbsp;&nbsp;Back
          </Link>
          <h1 className="text-5xl font-extrabold text-[#0A2A67] mb-4 mt-10 ml-8">
            Your Announcements
          </h1>
        </div>
        <div className="bg-white rounded-lg p-4 mt-6">
          {announcements.map((announcement) => (
            <a 
              key={announcement.id} 
              href="#"
              onClick={() => handleAnnouncementClick(announcement.UserID)}
              className="block cursor-pointer"
            >
              <p>{announcement.file_name}</p>
              <hr className="my-4" />
            </a>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          {/* Pagination */}
          <button
            onClick={() => paginate(1)}
            className="mx-1 px-3 py-1 rounded hover:bg-gray-200"
          >
            &lt;
          </button>
          <button
            className="mx-1 px-3 py-1  rounded hover:bg-gray-200"
            disabled
          >
            {currentPage}
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => paginate(currentPage + 1)}
            className="mx-1 px-3 py-1  rounded hover:bg-gray-200"
          >
            &gt;
          </button>
        </div>
        <div className="flex flex-col items-center justify-center mt-4 font-semibold text-[#0A2A67] text-xl">
          <p>Or</p>
          <p>
            Create A New
            <a href="/BPAnnouncement/CreateBPAnnouncement" className="ml-1.5 underline font-bold">
              Announcement
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AnnouncementsPage;