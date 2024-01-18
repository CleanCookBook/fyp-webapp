"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ViewRecipePage = () => {
  const router = useRouter();
  const userRole = "bp";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userRecipes, setUserRecipes] = useState([]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  {
    /*const [announcements, setAnnouncements] = useState([
    { id: 1, title: "Announcement 1" },
    { id: 2, title: "Announcement 2" },
    { id: 3, title: "Announcement 3" },
    { id: 4, title: "Announcement 4" },
    { id: 5, title: "Announcement 5" },
    { id: 6, title: "Announcement 6" },
    // Add more announcements here...
  ]);*/
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [announcementsPerPage] = useState(5);

  useEffect(() => {
    const fetchUserRecipes = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/recipe/user-recipes",
          {
            credentials: "include",
          }
        );
  
        if (response.ok) {
          const data = await response.json();
          console.log("User Recipes Data:", data); // Log the data here
          setUserRecipes(data);
        } else {
          console.error("Error fetching user recipes:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user recipes:", error);
      }
    };
  
    fetchUserRecipes();
  }, []);

  const indexOfLastAnnouncement = currentPage * announcementsPerPage;
  const indexOfFirstAnnouncement =
    indexOfLastAnnouncement - announcementsPerPage;
  const currentAnnouncements = userRecipes.slice(
    indexOfFirstAnnouncement,
    indexOfLastAnnouncement
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(userRecipes.length / announcementsPerPage);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [noResults, setNoResults] = useState(false);
  const [emptyQuery, setEmptyQuery] = useState(false);

  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      // Display a message for the user to type something
      setEmptyQuery(true);
      return;
    }

    // Fetch data from the API endpoint
    const encodedQuery = encodeURIComponent(searchQuery);
    const response = await fetch(
      `http://localhost:3001/api/recipe/search?query=${encodedQuery}`
    );
    const data = await response.json();

    console.log("API Response:", data); // Add this line

    // Update state with search results
    setSearchResults(data);

    // Check for empty results (empty array or empty object)
    if (!Array.isArray(data) || data.length === 0) {
      setNoResults(true);
    } else {
      // Recipe found, navigate to RecipeList page
      const queryString = new URLSearchParams({
        searchInput: searchQuery,
        searchResults: JSON.stringify(data),
      });
      const newPathname = "/recipelist?" + queryString;
      router.push(newPathname); // Change '/recipelist' to your actual RecipeList page path
    }
  };

  // Can click enter key without click the search button
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F9D548]">
      <Navbar userRole={userRole} />
      <div className="container mx-auto p-4 flex-1">
        <div className="flex items-center mb-4">
          <Link
            href="/home/BPHomepage"
            className="flex justify-center items-center w-28 h-10 bg-blue-950 hover:bg-[#154083] text-white text-xl font-bold rounded-[10px] shadow self-start mt-[45px] -ml-36"
          >
            &lt;&nbsp;&nbsp;Back
          </Link>
          <h1 className="text-5xl font-extrabold text-[#0A2A67] mb-4 mt-10 ml-8">
            View Your Recipe
          </h1>
        </div>
        <div className="w-[748px] bg-white rounded-[20px] flex items-center text-sm p-2 pl-9 text-stone-300">
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search your library of recipes"
            className="w-full text-lg text-black outline-none -ml-3"
          />
          <div className="ml-auto m-[6px] border-r border-gray-500 mr-3">
            <button className="mr-3 mt-1" onClick={handleSearch}>
              <Image
                src="/search.png"
                alt="Search"
                width={25}
                height={20}
                style={{ filter: "brightness(0)" }}
              />
            </button>
          </div>
          <button
            onClick={openModal}
            className="mr-3"
            onKeyDown={(e) => {
              console.log("Key pressed:", e.key);
              if (e.key === "Enter") {
                e.preventDefault();
                handleSearch();
              }
            }}
            tabIndex={0}
          >
            <Image
              src="/filter.png"
              alt="Filter"
              width={25}
              height={25}
              style={{ filter: "brightness(0)" }}
            />
          </button>
        </div>

        <div className="bg-white rounded-lg p-4 mt-10">
          {userRecipes.map((recipe) => (
            <a
              key={recipe.UserID}
              href={`/detailRecipe?recipeName=${encodeURIComponent(recipe.Rname)}`}
              onClick={() => handleAnnouncementClick(recipe.UserID)}
              className="block cursor-pointer"
            >
              <p>{recipe.Rname}</p>
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
            <a href="/ViewRecipe/CreateRecipeFirst" className="ml-2 underline">
              Recipe
            </a>
          </p>
        </div>
        {noResults && <p className="text-red-500 mt-2">No such recipe</p>}
        {emptyQuery && (
          <p className="text-red-500 mt-2">Please type something!</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ViewRecipePage;