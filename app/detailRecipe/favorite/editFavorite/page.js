"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const editFavorite = () => {
    const router = useRouter();
    const userRole = 'bp'; 
    const [recipeInstruction, setRecipeInstruction] = useState("");
    const [recipeIngredients, setRecipeIngredients] = useState("");
    const recipeName = searchParams.get("recipeName");
  
    const fetchRecipeDetails = async (recipeName) => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/bookmark/${recipeName}`,
          {
            credentials: "include", // Include credentials (cookies) in the request
          }
        );
        const data = await response.json();
  
        if (response.ok) {
          // Set existing instruction and ingredients
          setRecipeInstruction(data.instruction);
          setRecipeIngredients(data.ingredients);
        } else {
          console.error("Error fetching recipe details:", data.error);
        }
      } catch (error) {
        console.error("Error fetching recipe details:", error.message);
      }
    };
  
    useEffect(() => {
      fetchRecipeDetails(recipeName.toString());
    }, [recipeName]);
  
    const handleInstructionChange = (e) => {
      setRecipeInstruction(e.target.value);
    };
  
    const handleIngredientChange = (e) => {
      setRecipeIngredients(e.target.value);
    };
  
    const handleNext = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/bookmark/updating/${recipeName}`,
          {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              recipeIngredients,
              recipeInstructions: recipeInstruction,
            }),
            credentials: "include",
          }
        );
  
        console.log("Response status:", response.status);
  
        if (response.ok) {
          console.log("Recipe updated successfully!");
          router.push("/home");
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

  return (
    <div className="flex flex-col min-h-screen bg-[#F9D548] text-[#0A2A67]">
      <Navbar userRole={userRole} className="fixed top-0 left-0 right-0" />
      <div className="mt-10 ml-8">
        <h2 className="text-5xl font-black pb-8">Customise Your Favourite Recipe </h2>
      </div>
      <div className="w-full mx-auto flex items-center px-8 lg:px-20 mt-8">
        <div className="w-1/2 border-r border-gray-400 pr-8">
             <label className="text-blue-950 text-lg font-medium mb-2 mt-4">
              Edit Recipe Ingredients
              <span className="px-4">:</span>
            </label>
            <div className="flex items-center justify-center w-full h-32 pl-2.5 py-2.5 bg-white rounded-[10px] mb-4">
              <textarea
                id="recipeIngredients"
                value={recipeIngredients}
                onChange={handleIngredientChange}
                className="w-full h-full text-neutral-400 font-medium border-none outline-none resize-none bg-white rounded-[10px] pl-4 pr-4 py-2"
              />
            </div>
            
            <label className="text-blue-950 text-lg font-medium mb-2 mt-4 self-start gap-4">
              Edit Recipe Instruction
              <span className="px-4">:</span>
            </label>
            <div className="flex items-center justify-center w-full h-32 pl-2.5 py-2.5 bg-white rounded-[10px] mb-4">
              <textarea
                value={recipeInstruction}
                onChange={handleInstructionChange}
                className="w-full h-full text-neutral-400 text-lg font-medium border-none outline-none resize-none bg-white rounded-[10px] pl-1.5 pt-1.5 pr-4"
                placeholder="Write your Description"
              />
            </div>
        </div>
        <div className="w-1/2 pl-8 -mt-[277px]">
        </div>
      </div>
      <div className="w-full mt-auto">
        <div className="fixed bottom-32 right-16 px-4 py-4">
          <button
            onClick={(e) => handleNext(e, recipeName)}
            className="w-[259px] h-10 bg-blue-950 hover:bg-[#154083] text-white font-bold text-lg rounded-[10px] shadow self-end"
          >
            Submit
          </button>
        </div>
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default editFavorite;
