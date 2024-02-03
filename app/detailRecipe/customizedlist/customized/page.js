"use client";
import ChefNote from "@/components/ChefNote";
import Footer from "@/components/Footer";
import FunFact from "@/components/FunFact";
import Ingredients from "@/components/Ingredients";
import Instructions from "@/components/Instructions";
import LoadingSpinner from "@/components/LoadingSpinner";
import Navbar from "@/components/Navbar";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


const customized = () => {
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [instruction, setInstruction] = useState([]);
  const router = useRouter();
  const [userRole, setUserRole] = useState("user");
  const recipeName = useSearchParams("recipeName");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setIsLoading] = useState(true);
  
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



  const fetchIngredientsAndInstruction = async (recipeName) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/editRecipe/changed/${recipeName}`
      );
      const data = await response.json();

      if (response.ok) {
        setIngredients(data.ingredients || []);
        setInstruction(data.instruction || []);
      } else {
        console.error("Error fetching ingredients and instruction:", data.error);
      }
    } catch (error) {
      console.error("Error fetching ingredients and instruction:", error.message);
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
  const fetchRecipeDetails = async (recipeName) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/recipe/${recipeName}`
      );
      const data = await response.json();

      if (response.ok) {
        // Split the ingredients and instructions strings into arrays
        const factsArray = data.info.split("\r\n");

        setRecipeDetails({
          RName: recipeName,
          description: data.description,
          image: data.image,
          rating: data.ratings,
          funFacts: factsArray,
          calorie: data.calorie,
          tips_tricks: data.tips_tricks,
          cookingTime: data.cTime,
        });
        // Add the rest of your logic for checkFavoriteResponse here

      } else {
        console.error("Error fetching recipe details:", data.error);
      }
    } catch (error) {
      console.error("Error fetching recipe details:", error.message);
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const recipeName = searchParams.get("recipeName");

    const fetchData = async () => {
      await fetchUserType(); // Fetch user type first
      await fetchRecipeDetails(recipeName); // Then fetch recipe details
      await fetchIngredientsAndInstruction(recipeName); // Fetch ingredients and instruction
    };

    if (recipeName) {
      fetchData();
    }
  }, []);
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
      {/* Navbar */}
      <Navbar userRole={userRole} />

      {/* Main Content */}
      <div className="p-4 pl-20 bg-[#F9D548]">
        <div className="text-6xl font-extrabold text-blue-950">
          {recipeDetails?.RName}
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
          <div name="Ingredients">
            <div name="title" className="p-4 pl-20">
              <h2 className="text-3xl text-[#1D5198] font-bold">Ingredients</h2>
            </div>
            <Ingredients ingredients={ingredients} />
          </div>
          <div className="border-t border-gray-500 my-4 pl-20"></div>
          <div name="Instruction">
            <div name="header" className="p-4 pl-20">
              <h2 className="text-3xl text-[#1D5198] font-bold">Instruction</h2>
              <div className="text-l text-[#1D5198] font-bold mt-4">
                Cooking time: Around {recipeDetails?.cookingTime} minutes{" "}
              </div>
            </div>
            <Instructions instruction={instruction} />
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
              Nutritional Facts (Not available as it is edited!)
            </h2>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default customized;
