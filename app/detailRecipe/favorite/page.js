"use client"
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useEffect, useState } from "react";

const FavoritePage = () => {
  const userRole = "user";
  const [favorites, setAnnouncements] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [announcementsPerPage] = useState(5);

  // Function to fetch user's favorite recipes
  const fetchUserFavorites = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/recipe/user-favorites");
      const data = await response.json();
      setUserFavorites(data.favorites);
    } catch (error) {
      console.error("Error fetching user favorites:", error);
      // Handle error as needed
    }
  };

  // Example function to add a recipe to favorites
const addToFavorites = async (recipeName) => {
  try {
    await fetch('http://localhost:3001/api/recipe/add-to-favorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recipeName }),
    });

    // Refresh the list of favorite recipes
    fetchUserFavorites();
  } catch (error) {
    console.error('Error adding to favorites:', error);
    // Handle error as needed
  }
};

// Example function to remove a recipe from favorites
const removeFromFavorites = async (recipeName) => {
  try {
    await fetch('http://localhost:3001/api/recipe/remove-from-favorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recipeName }),
    });

    // Refresh the list of favorite recipes
    fetchUserFavorites();
  } catch (error) {
    console.error('Error removing from favorites:', error);
    // Handle error as needed
  }
};

useEffect(() => {
  const fetchAnnouncements = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/announce/announcements");
      const data = await response.json();
      setAnnouncements(data);
    } catch (error) {
      console.error("Error fetching announcements:", error);
      // Handle error as needed
    }
  };

  // Fetch user favorites when the component mounts
  fetchUserFavorites();

  fetchAnnouncements();
}, []);

const indexOfLastAnnouncement = currentPage * announcementsPerPage;
const indexOfFirstAnnouncement = indexOfLastAnnouncement - announcementsPerPage;
const currentAnnouncements = favorites.slice(
  indexOfFirstAnnouncement,
  indexOfLastAnnouncement
);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(favorites.length / announcementsPerPage);

  return (
    <div className="flex flex-col min-h-screen bg-[#F9D548]">
      <Navbar userRole={userRole}/>
      <div className="container mx-auto p-4 flex-1">
        <div className="flex items-center mb-4">
          <Link 
            href="/home" 
            className="flex justify-center items-center w-28 h-10 bg-blue-950 hover:bg-[#154083] text-white text-xl font-bold rounded-[10px] shadow self-start mt-[45px] -ml-36"
          >
            &lt;&nbsp;&nbsp;Back
          </Link>
          <h1 className="text-5xl font-extrabold text-[#0A2A67] mb-4 mt-10 ml-8">
            CleanCookBookmarks
          </h1>
        </div>
        <div className="bg-white rounded-lg p-4 mt-6">
          {favorites.map((favorite) => (
            <a
              key={favorite.id}
              href="#"
              onClick={() => handleAnnouncementClick(favorite.id)}
              className="block cursor-pointer"
            >
              <p>{favorite.title}</p>
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

export default FavoritePage;