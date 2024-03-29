"use client";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CreateRecipesecond = () => {
  const router = useRouter();
  const userRole = "nutritionist";
  const [recipeSteps, setRecipeSteps] = useState("");
  const [funFacts, setFunFacts] = useState("");
  const [tips, setTips] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setIsLoading] = useState(true);
  const defaultNutritionalFacts = `Calories= Kcal
Protein= 
Fat= 
Carbohydrates= 
Fiber= `;
  const [nutritionalFacts, setNutritionalFacts] = useState(
    defaultNutritionalFacts
  );
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          router.push("/loginPage");
        }
      } catch (error) {
        console.error("Error during authentication check:", error.message);
      } finally {
        // Set loading to false when authentication check is complete
        setIsLoading(false);
      }
    };

    checkAuthentication();
  }, [router]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to the login page if not authenticated
    router.push("/loginPage");
    // No need to return anything here
  }

  const handleRecipeSteps = (e) => {
    setRecipeSteps(e.target.value);
  };

  const handleNutritionalFacts = (e) => {
    setNutritionalFacts(e.target.value);
  };

  const handleFunFacts = (e) => {
    setFunFacts(e.target.value);
  };

  const handleTips = (e) => {
    setTips(e.target.value);
  };

  // Function to check if all required fields are filled
  const checkFormCompletion = () => {
    console.log("Recipe Steps :", recipeSteps);
    console.log("Nutritional Facts:", nutritionalFacts);
    console.log("Fun Facts:", funFacts);
    console.log("Tips:", tips);
  
    if (
      recipeSteps &&
      nutritionalFacts &&
      funFacts &&
      tips
    ) {
      setIsFormComplete(true);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check form completion before proceeding
    checkFormCompletion();

    // If form is not complete, show modal and return
    if (!isFormComplete) {
      setIsModalOpen(true);
      return;
    }

    const recipeData = {
      recipeSteps,
      nutritionalFacts,
      funFacts,
      tips,
    };

    try {
      const response = await fetch(
        "https://ccb-backendd.onrender.com/api/recipe/createRecipeSecond",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Set content type to JSON
          },
          body: JSON.stringify(recipeData), // Convert to JSON string
        }
      );

      console.log("Response status:", response.status);

      if (response.ok) {
        console.log("Recipe created successfully!");
        router.push("/ViewRecipe");
      } else {
        try {
          const errorData = await response.json();
          console.error("Error creating recipe:", errorData);
          // Handle error as needed
        } catch (error) {
          console.error("Error creating recipe:", response.statusText);
          // Handle error as needed
        }
      }
    } catch (error) {
      console.error("Error creating recipe:", error.message);
      // Handle error as needed
    }
  };
  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
        <LoadingSpinner />
      </div>
    );
  }


  return (
    <div className="flex flex-col min-h-screen bg-[#F9D548] text-[#0A2A67]">
      <Navbar userRole={userRole} className="fixed top-0 left-0 right-0" />
      <div className="mt-10 ml-8">
        <h2 className="text-5xl font-black pb-8">Create Your Recipe </h2>
      </div>
      <div className="w-full mx-auto flex items-center px-8 lg:px-20 mt-8">
        <div className="w-1/2 border-r border-gray-400 pr-8 -mt-[6px]">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-start mb-8"
          >
            <label className="text-blue-950 text-lg font-medium mb-2 self-start">
              Enter Recipe Steps :
            </label>
            <div className="flex items-center justify-center w-full h-48 pl-2.5 py-2.5 bg-white rounded-[10px] mb-4">
              <textarea
                id="recipeSteps"
                value={recipeSteps}
                onChange={handleRecipeSteps}
                className="w-full h-full text-neutral-400 font-medium border-none outline-none resize-none bg-white rounded-[10px] pl-4 pr-4 py-2"
                placeholder="Enter your Recipe Steps"
              />
            </div>
            <label className="text-blue-950 text-lg font-medium mb-2 mt-8 self-start">
              Enter Nutritional Facts :
            </label>
            <div className="flex items-center justify-center w-full h-48 pl-2.5 py-2.5 bg-white rounded-[10px] mb-4">
              <textarea
                id="nutritionalFacts"
                value={nutritionalFacts}
                onChange={handleNutritionalFacts}
                className="w-full h-full text-neutral-400 font-medium border-none outline-none resize-none bg-white rounded-[10px] pl-4 pr-4 py-2"
                placeholder="Enter your Nutrional Facts"
              />
            </div>
          </form>
        </div>
        <div className="w-1/2 pl-8 -mt-[34px]">
          <form className="flex flex-col items-start mb-8">
            <label className="text-blue-950 text-lg font-medium mb-2 mt-8 self-start">
              Enter Fun Facts :
            </label>
            <div className="flex items-center justify-center w-full h-48 pl-2.5 py-2.5 bg-white rounded-[10px] mb-4">
              <textarea
                id="funFacts"
                value={funFacts}
                onChange={handleFunFacts}
                className="w-full h-full text-neutral-400 font-medium border-none outline-none resize-none bg-white rounded-[10px] pl-4 pr-4 py-2"
                placeholder="Enter your Fun Facts"
              />
            </div>
            <label className="text-blue-950 text-lg font-medium mb-2 mt-8 self-start">
              Enter Tips from the Chef :
            </label>
            <div className="flex items-center justify-center w-full h-48 pl-2.5 py-2.5 bg-white rounded-[10px] mb-4">
              <textarea
                id="tips"
                value={tips}
                onChange={handleTips}
                className="w-full h-full text-neutral-400 font-medium border-none outline-none resize-none bg-white rounded-[10px] pl-4 pr-4 py-2"
                placeholder="Enter Tips from Chef"
              />
            </div>
          </form>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-center mb-4">Please fill out all the required fields before submitting!</h2>
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="bg-blue-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-44 mt-4 focus:outline-none focus:shadow-outline"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div className="w-full mt-auto flex justify-between px-4 py-4">
        <div>
          <Link href="/ViewRecipe/CreateRecipeFirst">
            <button className="w-[259px] h-10 bg-blue-950 hover:bg-[#154083] text-white font-bold text-lg rounded-[10px] shadow ml-16">
              Back
            </button>
          </Link>
        </div>
        <div>
          <Link href="/ViewRecipe">
            <button
              onClick={handleSubmit}
              className="w-[259px] h-10 bg-blue-950 hover:bg-[#154083] text-white font-bold text-lg rounded-[10px] shadow -mt-7 mr-16"
            >
              Submit
            </button>
          </Link>
        </div>
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default CreateRecipesecond;
