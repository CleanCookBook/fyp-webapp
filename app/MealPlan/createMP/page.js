"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useState } from "react";

const BPCreateMealPlan = () => {
  const [mealPlanName, setMealPlanName] = useState("");
  const [mealPlanImg, setMealPlanImg] = useState(null);
  const [mealPlanDescription, setMealPlanDescription] = useState("");

  const recipeOptions = ["Recipe1", "Recipe2", "Recipe3", "Recipe4", "Recipe5"]; // Replace with actual recipe names

  const [recipes, setRecipes] = useState({
    Monday: { recipe1: "", recipe2: "", recipe3: "" },
    Tuesday: { recipe1: "", recipe2: "", recipe3: "" },
    Wednesday: { recipe1: "", recipe2: "", recipe3: "" },
    Thursday: { recipe1: "", recipe2: "", recipe3: "" },
    Friday: { recipe1: "", recipe2: "", recipe3: "" },
    Saturday: { recipe1: "", recipe2: "", recipe3: "" },
    Sunday: { recipe1: "", recipe2: "", recipe3: "" },
  });

  const handleInputChange = (e) => {
    setMealPlanName(e.target.value);
  };

  const handleFileChange = (e, setState) => {
    const file = e.target.files[0];
    setState(file);
  };

  const handleRecipeChange = (day, field, value) => {
    setRecipes((prevRecipes) => ({
      ...prevRecipes,
      [day]: {
        ...prevRecipes[day],
        [field]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Meal Plan Name:", mealPlanName);
    console.log("Submitted Meal Plan Image:", mealPlanImg);
    console.log("Submitted Meal Plan Description:", mealPlanDescription);
    console.log("Submitted Recipes:", recipes);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F9D548]">
      <Navbar />
      <div className="container mx-auto p-4 flex-1">
        <h1 className="text-5xl font-bold text-[#0A2A67] mb-4">
          Create a Meal Plan
        </h1>
        <form
          className="flex flex-col items-start my-8"
          onSubmit={handleSubmit}
        >
          <label className="text-blue-950 text-base font-medium mb-2 self-start">
            Enter Meal Plan Name:
          </label>
          <input
            type="text"
            id="mealPlanName"
            className="text-neutral-400 text-base font-medium border-none outline-none w-1/2 h-12 pl-2.5 py-2.5 bg-white rounded-[10px] mb-4"
            required
            onChange={handleInputChange}
            placeholder="Enter Meal Plan Name"
          />

          <label className="text-blue-950 text-base font-medium mb-2 self-start">
            Upload Meal Plan Image:
          </label>
          <div className="flex items-center justify-center w-1/2 h-48 pl-2.5 py-2.5 bg-white rounded-[10px] mb-4">
            {/* Recipe image Upload */}
            <label htmlFor="mealPlanImgUpload" className="cursor-pointer">
              <span className="mr-2 text-gray-500">Choose File</span>
              <input
                type="file"
                id="mealPlanImgUpload"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileChange(e, setMealPlanImg)}
              />
            </label>
            {/* Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M14 7a2 2 0 00-2-2H8a2 2 0 00-2 2v1H4a2 2 0 00-2 2v7a2 2 0 002 2h12a2 2 0 002-2V10a2 2 0 00-2-2h-2V7zM8 7a1 1 0 011-1h2a1 1 0 011 1v1H8V7zm6 3h-2v1a1 1 0 01-1 1H9a1 1 0 01-1-1v-1H6v5h8v-5zM6 6h8a1 1 0 011 1v1H5V7a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <label className="text-blue-950 text-base font-medium mb-2 self-start">
            Enter Meal Plan Description:
          </label>
          <textarea
            id="mealPlanDescription"
            className="text-neutral-400 text-base font-medium border-none outline-none w-1/2 h-48 pl-2.5 py-2.5 bg-white rounded-[10px] mb-4"
            onChange={(e) => setMealPlanDescription(e.target.value)}
            placeholder="Enter Meal Plan Description"
          />

          {/* Loop through days and render dropdowns for recipe selection */}
          <div className="grid grid-cols-2 gap-8">
            {Object.keys(recipes).map((day, index) => (
              <div key={index} className="mt-8">
                <h2 className="text-xl font-bold text-[#0A2A67] mb-2">{day}</h2>
                {/* Display recipe choices in 1 row for Monday to Thursday and 1 row for Friday to Sunday */}
                <div className="mb-8">
                  {Array.from({ length: 3 }, (_, i) => i + 1).map(
                    (recipeIndex) => (
                      <div key={recipeIndex} className="mb-4">
                        <label className="text-blue-950 text-base font-medium mb-2 self-start">
                          Recipe {recipeIndex}:
                        </label>
                        <select
                          value={recipes[day][`recipe${recipeIndex}`]}
                          onChange={(e) =>
                            handleRecipeChange(
                              day,
                              `recipe${recipeIndex}`,
                              e.target.value
                            )
                          }
                          className="text-neutral-400 text-lg font-medium border-none outline-none w-full h-12 pl-2.5 py-2.5 bg-white rounded-[10px] mb-2"
                        >
                          <option value="" disabled>
                            Select Recipe
                          </option>
                          {recipeOptions.map((recipe) => (
                            <option key={recipe} value={recipe}>
                              {recipe}
                            </option>
                          ))}
                        </select>
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-[259px] h-7 bg-blue-950 hover:bg-[#154083] text-white font-bold rounded-[10px] shadow self-end"
          >
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default BPCreateMealPlan;
