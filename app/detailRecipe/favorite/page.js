"use client"
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useEffect, useState } from "react";

const FavoritePage = () => {
  const userRole = "user";
  const [favorites, setFavorites] = useState([]); // Use setFavorites to update the favorites state
  const [currentPage, setCurrentPage] = useState(1);
  const [favoritesPerPage] = useState(5);
  const [userFirstName, setUserFirstName] = useState("");

  const fetchUserInfo = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/bookmark/username", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Error fetching user information: ${response.status}`);
      }

      const data = await response.json();
      setUserFirstName(data.firstName || ""); // Set the user's first name
    } catch (error) {
      console.error("Error fetching user information:", error);
      // Handle error as needed
    }
  };

  // Function to fetch user's favorite recipes
  const fetchUserFavorites = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/bookmark/showFavorites", {
        method: "GET",
        credentials: "include",  // Include credentials (cookies) in the request
      });
  
      if (!response.ok) {
        throw new Error(`Error fetching user favorites: ${response.status}`);
      }
  
      const data = await response.json();
      
      // Ensure data.favorites is an array
      const favoritesArray = Array.isArray(data.favorites) ? data.favorites : [];
  
      setFavorites(favoritesArray);
    } catch (error) {
      console.error("Error fetching user favorites:", error);
      // Handle error as needed
    }
  };

useEffect(() => {
  // Fetch user favorites when the component mounts
  fetchUserInfo();
  fetchUserFavorites();
}, []); 

const indexOfLastFavorite = currentPage * favoritesPerPage;
  const indexOfFirstFavorite = indexOfLastFavorite - favoritesPerPage;
  const currentFavorites = favorites.slice(
    indexOfFirstFavorite,
    indexOfLastFavorite
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(favorites.length / favoritesPerPage);

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
          {userFirstName}'s Bookmarks
          </h1>
        </div>
        <div className="bg-white rounded-lg p-4 mt-6">
          {favorites.length === 0 ? (
            <p className="text-center text-black">
              You don't have any bookmarks yet.
            </p>
          ) : (
            favorites.map((favorite) => (
              <a
                key={favorite.UserID}
                href={`/detailRecipe?recipeName=${encodeURIComponent(favorite.RName)}`}
                onClick={() => handleAnnouncementClick(favorite.UserID)}
                className="block cursor-pointer"
              >
                <p>{favorite.RName}</p>
                <hr className="my-4" />
              </a>
            ))
          )}
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