"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateRecipefirst = () => {
  const router = useRouter();
  const userRole = 'bp'; 
  const [recipeName, setRecipeName] = useState("");
  const [recipeDescription, setRecipeDescription] = useState("");
  const [recipeIngredients, setRecipeIngredients] = useState("");
  const [cookingTime, setCookingTime] = useState({ value: 0, unit: "minutes" });
  const [selectedImage, setSelectedImage] = useState(null);
  const [adjustingSize, setAdjustingSize] = useState(false);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  

  const handleInputChange = (e) => {
    setRecipeName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setRecipeDescription(e.target.value);
  };

  const handleDecrementTime = (e) => {
    e.preventDefault();
    if (cookingTime.value > 0) {
      setCookingTime((prevCookingTime) => ({
        ...prevCookingTime,
        value: prevCookingTime.value - 1,
      }));
    }
  };

  const handleIncrementTime = (e) => {
    e.preventDefault();
    setCookingTime((prevCookingTime) => ({
      ...prevCookingTime,
      value: prevCookingTime.value + 1,
    }));
  };

  const handleTimeUnitChange = (e) => {
    setTimeUnit(e.target.value);
    setCookingTime((prevCookingTime) => ({
      ...prevCookingTime,
      unit: e.target.value,
    }));
  };

  const setTimeUnit = (value) => {
    setCookingTime((prevCookingTime) => ({
      ...prevCookingTime,
      unit: value,
    }));
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    const image = files[0];
    const imageUrl = URL.createObjectURL(image);

    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      setImageSize({ width: img.width, height: img.height });
    };

    setSelectedImage(image);
    setAdjustingSize(true);
  };

  const handleChangePicture = () => {
    setSelectedImage(null);
    setImageSize({ width: 0, height: 0 });
    setAdjustingSize(false);
    const fileInput = document.getElementById("RecipeImgUpload");
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleIngredientChange = (e) => {
    setRecipeIngredients(e.target.value);
  };

  const handleFileInputChange = (e) => {
    handleFileChange(e);
  };

  const handleNext = async (e) => {
    e.preventDefault();

    // Get the data from the state
    const recipeData = {
      recipeName,
      imageUrl: "", // Update this line based on your form structure
      recipeDescription,
      cookingTime: cookingTime.value,
      recipeIngredients,
    };

    const formData = new FormData();

    formData.append("recipeName", recipeData.recipeName);
    formData.append("recipeDescription", recipeData.recipeDescription);
    formData.append("cookingTimeValue", recipeData.cookingTime);
    formData.append("recipeIngredients", recipeData.recipeIngredients);

    // Check if selectedImage exists before appending
    if (selectedImage) {
      formData.append("recipeImage", selectedImage);
    }

    try {
      const response = await fetch(
        "http://localhost:3001/api/recipe/createRecipe",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      console.log("Response status:", response.status);

      if (response.ok) {
        console.log("Recipe created successfully!");
        router.push("/ViewRecipe/CreateRecipeSecond");
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

  return (
    <div className="flex flex-col min-h-screen bg-[#F9D548] text-[#0A2A67]">
      <Navbar userRole={userRole} className="fixed top-0 left-0 right-0" />
      <div className="mt-10 ml-8">
        <h2 className="text-5xl font-black pb-8">Create Your Recipe </h2>
      </div>
      <div className="w-full mx-auto flex items-center px-8 lg:px-20 mt-8">
        <div className="w-1/2 border-r border-gray-400 pr-8">
          <form
            onSubmit={handleNext}
            className="flex flex-col items-start mb-8"
          >
            <label className="text-blue-950 text-lg font-medium mb-2 self-start">
              Enter Recipe Name
              <span className="px-4">:</span>
            </label>
            <input
              type="text"
              id="recipeName"
              value={recipeName}
              onChange={handleInputChange}
              className="text-neutral-400 text-lg font-medium border-none outline-none w-full h-10 pl-2.5 py-2.5 bg-white rounded-[10px] mb-4 self-start"
              placeholder="Enter your Recipe Name"
              required
            />
            <label className="text-blue-950 text-lg font-medium mb-2 mt-4 self-start">
              Enter Recipe Image
              <span className="px-4">:</span>
            </label>
            <div className="flex items-center justify-center w-96 h-52 pl-2.5 py-2.5 bg-white rounded-[10px] mb-4">
              {/* Recipe image Upload */}
              {!selectedImage && (
                <>
                  {!adjustingSize && (
                    <label htmlFor="recipeImage" className="cursor-pointer">
                      <span className="mr-2 text-gray-500">Choose Image</span>
                      <input
                        type="file"
                        id="recipeImage"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileInputChange}
                      />
                    </label>
                  )}
                  {/* Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 text-gray-500 -mt-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14 7a2 2 0 00-2-2H8a2 2 0 00-2 2v1H4a2 2 0 00-2 2v7a2 2 0 002 2h12a2 2 0 002-2V10a2 2 0 00-2-2h-2V7zM8 7a1 1 0 011-1h2a1 1 0 011 1v1H8V7zm6 3h-2v1a1 1 0 01-1 1H9a1 1 0 01-1-1v-1H6v5h8v-5zM6 6h8a1 1 0 011 1v1H5V7a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </>
              )}
              {selectedImage && (
                <>
                  <img
                    id="recipeImage"
                    src={URL.createObjectURL(selectedImage)}
                    alt="Recipe Image"
                    className="w-full h-full object-cover -ml-2 rounded-[10px]"
                  />
                  {/* Hide the "Choose File" button and icon */}
                </>
              )}
            </div>
            <div>
              {/* Change Picture button */}
              <button
                onClick={handleChangePicture}
                className="flex ml-[400px] -mt-[140px] bg-blue-950 text-white font-bold px-2 py-1 rounded-md"
              >
                Change Picture
              </button>
            </div>
            <label className="text-blue-950 text-lg font-medium mb-2 mt-4 self-start gap-4">
              Enter Recipe Description
              <span className="px-4">:</span>
            </label>
            <div className="flex items-center justify-center w-full h-32 pl-2.5 py-2.5 bg-white rounded-[10px] mb-4">
              <textarea
                value={recipeDescription}
                onChange={handleDescriptionChange}
                className="w-full h-full text-neutral-400 text-lg font-medium border-none outline-none resize-none bg-white rounded-[10px] pl-1.5 pt-1.5 pr-4"
                placeholder="Write your Description"
              />
            </div>
          </form>
        </div>
        <div className="w-1/2 pl-8 -mt-[277px]">
          <form className="flex flex-col items-start mb-8">
            <label className="text-blue-950 text-lg font-medium mb-2">
              Enter Cooking Time
              <span className="px-4">:</span>
            </label>
            <div className="flex items-center">
              <button
                className="text-2xl px-2 h-10 -mt-4 rounded-l-md bg-white"
                onClick={handleDecrementTime}
              >
                -
              </button>
              <input
                type="text"
                className="text-center text-black text-lg font-medium border-none outline-none w-20 h-10 pl-2.5 py-2.5 bg-white mb-4 mx-2 -ml-1"
                value={cookingTime.value}
                onChange={(e) =>
                  setCookingTime((prevCookingTime) => ({
                    ...prevCookingTime,
                    value: parseInt(e.target.value),
                  }))
                }
                required
              />
              <button
                className="text-2xl px-2 py-1 -mt-4 -ml-3 rounded-r-md bg-white"
                onClick={handleIncrementTime}
              >
                +
              </button>
              <select
                id="timeUnit"
                className="text-lg font-medium border-none outline-none h-10 pl-2.5 py-2.5 bg-white rounded-[10px] mb-4 ml-2"
                value={cookingTime.unit}
                onChange={handleTimeUnitChange}
              >
                <option value="minutes">Minutes</option>
                <option value="hours">Hours</option>
              </select>
            </div>
            <label className="text-blue-950 text-lg font-medium mb-2 mt-4">
              Enter Recipe Ingredients
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
          </form>
        </div>
      </div>
      <div className="w-full mt-auto">
        <div className="fixed bottom-32 right-16 px-4 py-4">
          <button
            onClick={handleNext}
            className="w-[259px] h-10 bg-blue-950 hover:bg-[#154083] text-white font-bold text-lg rounded-[10px] shadow self-end"
          >
            Next
          </button>
        </div>
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default CreateRecipefirst;
