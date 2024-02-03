"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const editNutriFav = () => {
  const router = useRouter();
  const [userRole, setUserRole] = useState("user");
  const [recipeInstruction, setRecipeInstruction] = useState("");
  const [recipeIngredients, setRecipeIngredients] = useState("");
  const [noteChef,setNoteChef] = useState("");
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [funFacts, setFunFacts] = useState(""); // Add this line for fun facts
  const [nutritionalFacts, setNutritionalFacts] = useState("");
  const [description, setDescriptionChange]=useState("");

  const searchParams = useSearchParams();
  const recipeName = searchParams.get("recipeName");
  const [loading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  const handleDescriptionChange = (e) => {
    // Update the state variable for description
    setDescriptionChange(e.target.value);
  };
  
  const handleInstructionChange = (e) => {
    // Update the state variable for recipeInstruction
    setRecipeInstruction(e.target.value);
  };

  const handleIngredientChange = (e) => {
    // Update the state variable for ingredients
    setRecipeIngredients(e.target.value);
  };
  const handleChefNoteChange = (e) => {
    // Update the state variable for noteChef
    setNoteChef(e.target.value);
  };
  
  const handleFunFactsChange = (e) => {
    // Update the state variable for funFacts
    setFunFacts(e.target.value);
  };
  
  const handleNutritionalFactsChange = (e) => {
    // Update the state variable for nutritionalFacts
    setNutritionalFacts(e.target.value);
  };
  

  const handleNext = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/recipe/updating/${recipeName}`,
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({
            description:description,
            ingredients: recipeIngredients,
            instruction: recipeInstruction,
            tips_tricks: noteChef,
            funFacts: funFacts,
            calorie: nutritionalFacts,
          // Add more fields as needed
        }),
        credentials: "include",
      }
    );

      console.log("Response status:", response.status);

      if (response.ok) {
        console.log("Recipe updated successfully!");
        router.push("/ViewRecipe");
      } else {
        try {
          const errorData = await response.json();
          console.error("Error updating recipe:", errorData);
          // Handle error as needed
        } catch (error) {
          console.error("Error updating recipe:", response.statusText);
          // Handle error as needed
        }
      }
    } catch (error) {
      console.error("Error updating recipe:", error.message);
      // Handle error as needed
    }
  };

  useEffect(() => {

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
      
          if (response.ok) {
            const data = await response.json();
      
            // Split the ingredients and instructions strings into arrays
            const ingredientsArray = data.ingredients.split("\r\n");
            const instructionArray = data.instruction.split("\r\n");
            const factsArray = data.info.split("\r\n");
      
            // Set the recipe details state with the fetched data
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
            setRecipeInstruction(data.instruction);
            setRecipeIngredients(data.ingredients);
            setDescriptionChange(data.description);
            setNoteChef(data.tips_tricks);
            setFunFacts(data.info);
            setNutritionalFacts(data.calorie);
          } else {
            // If the response status is not OK, log the error
            console.log(recipeName);
            console.error("Error fetching recipe details:", response.statusText);
          }
        } catch (error) {
          // If an error occurs during the fetch or parsing the JSON, log the error
          console.error("Error fetching recipe details:", error.message);
        }
      };
      
      fetchUserType();
  fetchRecipeDetails();

  // Add any additional cleanup or dependencies as needed
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
  <div className="h-full bg-[#F9D548] text-[#0A2A67]">
    {/* Navbar */}
    <Navbar userRole={userRole} />

    <div className="h-full bg-[#F9D548] text-[#0A2A67] flex-grow">
      {/* Main Content */}
      <div className="p-4 pl-20 bg-[#F9D548]">
        <div className="flex justify-center items-center mb-4">
          <Link 
            href="/ViewRecipe" 
            className="flex justify-center items-center w-28 h-10 bg-blue-950 hover:bg-[#154083] text-white text-xl font-bold rounded-[10px] shadow self-start mt-[10px] mr-[320px]"
          >
            &lt;&nbsp;&nbsp;Back
          </Link>
          <h2 className="flex justify-center items-center text-5xl font-black pb-8 mr-[500px]">Edit your Recipe</h2>
        </div>
        <div className="text-5xl font-extrabold text-blue-950 -mt-4">
          {recipeDetails?.RName}
        </div>

        <div className="flex p-4 pl-20 bg-[#F9D548]">
          {/* Division 1 - 1/3 width */}
          <div className="w-1/3 -mt-1">
            <img
              src={recipeDetails?.image || "/placeholder-image.jpg"} // Use your placeholder image or another fallback
              alt={recipeDetails?.RName || "Recipe Image"}
              width={500}
              height={500}
              className="w-full max-w-screen-xl mx-auto rounded-2xl shadow-2xl shadow-black -ml-10"
            />
          </div>

          {/* Division 2 - 2/3 width */}
          <div className="w-2/3  justify-center text-center mt-14">
            {/* Content for Division 2 with blue-colored stars */}
            <div className="text-3xl text-[#1D5198] font-bold">
              Why this Recipe?
            </div>
            <div className="max-w-[600px] mx-auto">
              <div className="text-[#1D5198] leading-tight">
              <textarea
                id="recipeDescription"
                value={description}
                onChange={handleDescriptionChange}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* First Column - 1/3 width */}
        <div className="w-3/5 p-4">
          <div className="p-8 pl-20 -mt-4">
            <label className="text-3xl text-[#1D5198] font-bold">
              Edit Recipe Ingredients
              <span className="px-4">:</span>
            </label>
            <div className="flex items-center justify-center w-full h-48 pl-2.5 py-2.5 bg-white rounded-[10px] mt-6">
              <textarea
                id="recipeIngredients"
                value={recipeIngredients}
                onChange={handleIngredientChange}
                className="w-full h-full text-neutral-400 font-medium border-none outline-none resize-none bg-white rounded-[10px] pl-4 pr-4 py-2"
              />
            </div>

            <div className="border-t border-gray-500 my-8 pl-20 mt-10"></div>
            <label className="text-3xl text-[#1D5198] font-bold mt-20">
              Edit Recipe Instruction
              <span className="px-4">:</span>
            </label>
            <div className="text-l text-[#1D5198] font-bold mt-3">
              Cooking time: Around {recipeDetails?.cookingTime} minutes{" "}
            </div>
            <div className="flex items-center justify-center w-full h-96 pl-2.5 py-2.5 bg-white rounded-[10px] mt-6">
              <textarea
                value={recipeInstruction}
                onChange={handleInstructionChange}
                className="w-full h-full text-neutral-400 font-medium border-none outline-none resize-none bg-white rounded-[10px] pl-1.5 pt-1.5 pr-4"
              />
            </div>
          </div>
        </div>
        <div className="border-l border-gray-500"></div>

        {/* Second Column - 4/6 width */}
        <div className="w-4/6 p-4">
          <div name="title" className="p-4 pl-20 -mt-5">
            <h2 className="text-3xl text-[#1D5198] font-bold">
              Notes From the Chef!
            </h2>
          </div>
          <textarea
            id="noteChef"
            value={noteChef} 
            onChange={handleChefNoteChange}
            className="w-full text-neutral-400 font-medium border-none outline-none resize-none bg-white rounded-[10px] pl-4 pr-4 py-2"
          />
          {/* <ChefNote chefNote={recipeDetails?.tips_tricks} /> */}

          <div className="border-t border-gray-500 my-4 pl-20"></div>
            <div name="title" className="p-4 pl-20">
              <h2 className="text-3xl text-[#1D5198] font-bold">Edit Fun Facts</h2>
            </div>
            <textarea
            id="funFacts"
            value={funFacts} 
            onChange={handleFunFactsChange}
            className="w-full h-300 text-neutral-400 font-medium border-none outline-none resize-none bg-white rounded-[10px] pl-4 pr-4 py-2"
          />
          {/* <FunFact facts={recipeDetails?.funFacts} /> */}

          <div className="border-t border-gray-500 my-4 pl-20"></div>
            <div name="title" className="p-4 pl-20">
              <h2 className="text-3xl text-[#1D5198] font-bold">
              Nutritional Facts
              </h2>
            </div>
            <textarea
            id="nutritionalFacts"
            value={nutritionalFacts}  
            onChange={handleNutritionalFactsChange}
            className="w-full h-300 text-neutral-400 font-medium border-none outline-none resize-none bg-white rounded-[10px] pl-4 pr-4 py-2"
          />
        </div>

        <div className="flex justify-end items-end py-6">
          <button
            onClick={(e) => handleNext(e, recipeName)}
            className="w-[259px] h-10 bg-blue-950 hover:bg-[#154083] text-white text-xl font-bold self-end rounded-[10px] shadow mr-8"
          >
            Submit
          </button>
        </div>
      </div>

    </div>
    <Footer />
  </div>
);
};

export default editNutriFav;
