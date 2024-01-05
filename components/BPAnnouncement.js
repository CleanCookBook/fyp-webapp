import React, { useState, useEffect } from "react";
import BPNavBar from "./BPNavBar";
import Footer from "./Footer";

const AnnouncementsPage = () => {
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: "Announcement 1" },
    { id: 2, title: "Announcement 2" },
    { id: 3, title: "Announcement 3" },
    { id: 4, title: "Announcement 4" },
    { id: 5, title: "Announcement 5" },
    { id: 6, title: "Announcement 6" },
    // Add more announcements here...
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [announcementsPerPage] = useState(5);

  useEffect(() => {
    // Fetch announcements from API or database
    // Update the announcements state with the fetched data
    // Example: fetchData()
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
      <BPNavBar />
      <div className="container mx-auto p-4 flex-1">
        <h1 className="text-5xl font-bold text-[#0A2A67] mb-4">
          Your Announcements
        </h1>
        <div className="bg-white rounded-lg p-4">
          {currentAnnouncements.map((announcement) => (
            <a
              key={announcement.id}
              href="#"
              onClick={() => handleAnnouncementClick(announcement.id)}
              className="block cursor-pointer"
            >
              <p>{announcement.title}</p>
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
            Create an
            <a href="/create-announcement" className="ml-2 underline">
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
