"use client";
import DeleteRecipe from "@/components/DeleteRecipe";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ViewRecipePage = () => {
  const userRole = "nutritionist";
  const [userRecipes, setUserRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [announcementsPerPage] = useState(5);
  const [loading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const router = useRouter();
  useEffect(() => {
      const checkAuthentication = async () => {
        try {
          const response = await fetch("http://localhost:3001/api/check-auth", {
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

  const handleDeleteClick = (recipe) => {
    setSelectedRecipe(recipe);
    setShowConfirmation(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/editRecipe/${selectedRecipe.Rname}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        // Remove the deleted recipe from userRecipes state
        setUserRecipes(userRecipes.filter(recipe => recipe.Rname !== selectedRecipe.Rname));
        console.log('Recipe deleted successfully');
      } else {
        // Handle the error
        console.error("Error deleting recipe:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting recipe:", error);
    } finally {
      // Close the confirmation dialog
      handleDeleteCancel();
    }
  };
  
  const handleDeleteCancel = () => {
    setSelectedRecipe(null);
    setShowConfirmation(false);
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

        <div className="bg-white rounded-lg p-4 mt-6">
          {userRecipes.map((recipe) => (
            <div key={recipe.UserID}>
              <div className="flex items-center justify-between">
                <a
                  href={`/detailRecipe?recipeName=${encodeURIComponent(recipe.Rname)}`}
                  className="block cursor-pointer"
                >
                  <p>{recipe.Rname}</p>
                </a>
                  <div className="flex justify-center">
                    {/* Delete buttons */}
                    <button
                      onClick={() => handleDeleteClick(recipe)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                  </div>
              </div>
              <hr className="my-4" />
            </div>
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
        {/* Confirmation Pop-up */}
        {showConfirmation && (
          <DeleteRecipe
            recipe={selectedRecipe}
            onConfirm={handleDeleteConfirm}
            onCancel={handleDeleteCancel}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ViewRecipePage;
