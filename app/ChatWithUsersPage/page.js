//delete page
"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

const ChatwithUsersPage = () => {
  const [chatUsers, setchats] = useState([
    { id: 1, title: "User 1" },
    { id: 2, title: "User 2" },
    { id: 3, title: "User 3" },
    { id: 4, title: "User 4" },
    { id: 5, title: "User 5" },
    { id: 6, title: "User 6" },
    // Add more announcements here...
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [chatsPerPage] = useState(5);

  useEffect(() => {
    // Fetch announcements from API or database
    // Update the announcements state with the fetched data
    // Example: fetchData()
  }, []);

  const indexOfLastAnnouncement = currentPage * chatsPerPage;
  const indexOfFirstAnnouncement =
    indexOfLastAnnouncement - chatsPerPage;
  const currentchats = chatUsers.slice(
    indexOfFirstAnnouncement,
    indexOfLastAnnouncement
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(chatUsers.length / chatsPerPage);

  return (
    <div className="flex flex-col min-h-screen bg-[#F9D548]">
      <Navbar />
      <div className="container mx-auto p-8 flex-1">
        <h1 className="text-5xl font-bold text-[#0A2A67] mb-4">
          Chat with Users
        </h1>
        <div className="bg-white rounded-lg p-8">
          {currentchats.map((chatUsers) => (
            <a
              key={chatUsers.id}
              href="#"
              onClick={() => handleAnnouncementClick(chatUsers.id)}
              className="block cursor-pointer"
            >
              <p>{chatUsers.title}</p>
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
      </div>
      <Footer />
    </div>
  );
};

export default ChatwithUsersPage;
