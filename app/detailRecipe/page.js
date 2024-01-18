"use client";
import ChefNote from "@/components/ChefNote";
import Footer from "@/components/Footer";
import FunFact from "@/components/FunFact";
import Ingredients from "@/components/Ingredients";
import Instructions from "@/components/Instructions";
import Navbar from "@/components/Navbar";
import NutritionalFact from "@/components/NutritionalFact";
import StarRating from "@/components/StarRating";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

const RecipeDetails = () => {
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();
  const [userRole, setUserRole] = useState("user");
 

  const toggleFavorite = async () => {
    try {
        console.log("Toggle Favorite Clicked!");

        if (isFavorite) {
            // If it's already red, remove from favorites
            const removeFavoriteResponse = await fetch(
                "http://localhost:3001/api/bookmark/removeFavorite",
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        recipeName: recipeDetails?.RName,
                    }),
                }
            );

            if (removeFavoriteResponse.ok) {
                // Update the local state only if removal was successful
                setIsFavorite(false);
                console.log("Recipe Removed from Favorites!");
            } else {
                console.error(
                    "Error removing recipe from favorites:",
                    removeFavoriteResponse.statusText
                );
            }
        } else {
            // If it's not red, insert into favorites (similar to your existing logic)
            const insertBookmarkResponse = await fetch(
                "http://localhost:3001/api/bookmark/favorite",
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        recipeName: recipeDetails?.RName,
                        isFavorite: !isFavorite,
                    }),
                }
            );

            if (!insertBookmarkResponse.ok) {
                console.error(
                    "Error inserting bookmark into the database:",
                    insertBookmarkResponse.statusText
                );
            } else {
                // Update the local state only if the insertion was successful
                setIsFavorite(true);
                console.log("Recipe Marked as Favorite!");
            }
        }
    } catch (error) {
        console.error("Error updating favorite status:", error.message);
    }
};

  

  const navigateToReviewPage = () => {
    const recipeName = recipeDetails?.RName;
    if (recipeName) {
      router.push(
        `/detailRecipe/review?recipeName=${encodeURIComponent(recipeName)}`
      );
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const recipeName = searchParams.get("recipeName");

    const fetchUserType = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/user/userType",
          {
            method: "POST",
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUserRole(data.userType || "user"); // Set the userRole based on the response
        } else {
          console.error("Error fetching user type:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user type:", error.message);
      }
    };

    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/recipe/${recipeName}`
        );
        const data = await response.json();

        if (response.ok) {
          // Split the ingredients and instructions strings into arrays
          const ingredientsArray = data.ingredients.split("\r\n");
          const instructionArray = data.instruction.split("\r\n");
          const factsArray = data.info.split("\r\n");

          setRecipeDetails({
            RName: recipeName,
            description: data.description,
            image: data.image,
            rating: data.ratings,
            ingredients: ingredientsArray,
            instruction: instructionArray,
            funFacts: factsArray,
            calorie: data.calorie,
            tips_tricks: data.tips_tricks,
            cookingTime: data.cTime,
          });
          const checkFavoriteResponse = await fetch(
            "http://localhost:3001/api/bookmark/isFavorite",
            {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                recipeName,
              }),
            }
          );
  
          if (checkFavoriteResponse.ok) {
            const checkFavoriteData = await checkFavoriteResponse.json();
            setIsFavorite(checkFavoriteData.isFavorite || false);
          } else {
            console.error(
              "Error checking if the recipe is a favorite:",
              checkFavoriteResponse.statusText
            );
          }
        } else {
          console.error("Error fetching recipe details:", data.error);
        }
      } catch (error) {
        console.error("Error fetching recipe details:", error.message);
      }
    };
  
    if (recipeName) {
      fetchUserType(); // Fetch user type first
      fetchRecipeDetails(); // Then fetch recipe details
    }
  }, []);
  return (
    <div className="flex flex-col min-h-screen bg-[#F9D548]">
      {/* Navbar */}
      <Navbar userRole={userRole} />

      {/* Main Content */}
      <div className="p-4 pl-20 bg-[#F9D548]">
        <div className="text-6xl font-extrabold text-blue-950">
          {recipeDetails?.RName}
          <button onClick={toggleFavorite}>
            {userRole === "user" && // Only show bookmark for "user" role
              (isFavorite ? (
                <FaBookmark className="text-red-500 text-4xl ml-5 hover:blue-950" />
              ) : (
                <FaRegBookmark className="text-4xl ml-5" />
              ))}
          </button>
        </div>

        <div className="flex p-4 pl-20 bg-[#F9D548]">
          {/* Division 1 - 1/3 width */}
          <div className="w-1/3">
            <img
              src={recipeDetails?.image || "/placeholder-image.jpg"} // Use your placeholder image or another fallback
              alt={recipeDetails?.RName || "Recipe Image"}
              width={500}
              height={500}
              className="w-full max-w-screen-xl mx-auto rounded-2xl shadow-2xl shadow-black"
            />
          </div>

          {/* Division 2 - 2/3 width */}
          <div className="w-2/3  justify-center text-center">
            {/* Content for Division 2 with blue-colored stars */}
            <StarRating rating={recipeDetails?.rating || 0} />

            <p className="text-blue-950">
              Read the{" "}
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  navigateToReviewPage(recipeDetails?.RName);
                }}
                style={{ textDecoration: "underline", cursor: "pointer" }}
              >
                reviews
              </a>
            </p>

            <div className="text-3xl text-[#1D5198] font-bold">
              Why this Recipe?
            </div>
            <div className="max-w-[600px] mx-auto">
              <div className="text-[#1D5198] leading-tight">
                {recipeDetails?.description}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* First Column - 1/3 width */}
        <div className="w-2/5 p-4">
          <div name="title" className="p-4 pl-20">
            <h2 className="text-3xl text-[#1D5198] font-bold">Ingredients</h2>
          </div>
          <Ingredients ingredients={recipeDetails?.ingredients} />

          <div className="border-t border-gray-500 my-4 pl-20"></div>
          <div name="Instruction">
            <div name="header" className="p-4 pl-20">
              <h2 className="text-3xl text-[#1D5198] font-bold">Instruction</h2>

              <div className="text-l text-[#1D5198] font-bold mt-4">
                Cooking time: Around {recipeDetails?.cookingTime} minutes{" "}
              </div>
            </div>
            <Instructions instruction={recipeDetails?.instruction} />
          </div>
        </div>
        <div className="border-l border-gray-500"></div>

        {/* Second Column - 2/3 width */}
        <div className="w-3/5 p-4">
          <div name="title" className="p-4 pl-20">
            <h2 className="text-3xl text-[#1D5198] font-bold">
              Notes From the Chef!
            </h2>
          </div>
          <ChefNote chefNote={recipeDetails?.tips_tricks} />
          <div className="border-t border-gray-500 my-4 pl-20"></div>
          <div name="title" className="p-4 pl-20">
            <h2 className="text-3xl text-[#1D5198] font-bold">Fun Facts</h2>
          </div>
          <FunFact facts={recipeDetails?.funFacts} />
          <div className="border-t border-gray-500 my-4 pl-20"></div>

          <div name="title" className="p-4 pl-20">
            <h2 className="text-3xl text-[#1D5198] font-bold">
              Nutritional Facts
            </h2>
          </div>
          <NutritionalFact calorie={recipeDetails?.calorie} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RecipeDetails;
