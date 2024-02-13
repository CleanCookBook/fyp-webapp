"use client"
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const customizedlist = () => {
  const userRole = "user";
  const [loading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState([]); // Use setFavorites to update the favorites state
  const [currentPage, setCurrentPage] = useState(1);
  const [favoritesPerPage] = useState(5);
  const [userFirstName, setUserFirstName] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

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
        setIsLoading(false);
      }
    };

    checkAuthentication();
  }, [router]);

  const fetchUserInfo = async () => {
    try {
      setIsLoading(true);

      const response = await fetch("https://ccb-backendd.onrender.com/api/bookmark/username", {
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
    } finally {
      setIsLoading(false); // Set loading to false after the request is completed
    }
  };

  // Function to fetch user's favorite recipes
  const fetchUserFavorites = async () => {
    try {
      setIsLoading(true);

      const response = await fetch("https://ccb-backendd.onrender.com/api/editRecipe/showEdit", {
        method: "GET",
        credentials: "include",  // Include credentials (cookies) in the request
      });
  
      if (!response.ok) {
        throw new Error(`Error fetching user favorites: ${response.status}`);
      }
  
      const data = await response.json();
      
      // Ensure data.favorites is an array
      const favoritesArray = Array.isArray(data.editedFavorites) ? data.editedFavorites : [];

  
      setFavorites(favoritesArray);
    } catch (error) {
      console.error("Error fetching user favorites:", error);
      // Handle error as needed
    } finally {
      setIsLoading(false);
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
          {userFirstName}'s Customized Recipe 
          </h1>
        </div>
        <div className="bg-white rounded-lg p-4 mt-6">
          {favorites.map((favorite) => (
            <a
              key={favorite.UserID}
              href={`/detailRecipe/customizedlist/customized?recipeName=${encodeURIComponent(favorite.RName)}`}
              onClick={() => handleAnnouncementClick(favorite.UserID)}
              className="block cursor-pointer"
            >
              <p>{favorite.RName}</p>
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

export default customizedlist;