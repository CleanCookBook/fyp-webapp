"use client";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


const CreateRecipefirst = () => {
  const userRole = "nutritionist";
  const [recipeName, setRecipeName] = useState("");
  const [recipeDescription, setRecipeDescription] = useState("");
  const [recipeIngredients, setRecipeIngredients] = useState("");
  const [cookingTime, setCookingTime] = useState({ value: 0, unit: "minutes" });
  const [selectedImage, setSelectedImage] = useState(null);
  const [adjustingSize, setAdjustingSize] = useState(false);
  const [selectedDpTags, setSelectedDpTags] = useState([]);
  const [selectedAllergyTags, setSelectedAllergyTags] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
  const availableDpTags = [
    "Dairy-free",
    "Vegan",
    "Gluten-free",
    "Halal",
    "Nil",
  ];
  const availableAllergyTags = ["Seafood", "Dairy", "Nuts", "Eggs", "Nil"];

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
    if (e.target.value === "hours") {
      // Convert cooking time to hours
      setCookingTime((prevCookingTime) => ({
        ...prevCookingTime,
        value: prevCookingTime.value / 60, // Convert to hours
        unit: e.target.value,
      }));
    } else {
      // Convert cooking time to minutes
      setCookingTime((prevCookingTime) => ({
        ...prevCookingTime,
        value: prevCookingTime.value * 60, // Convert to minutes
        unit: e.target.value,
      }));
    }
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
    
    const img = new window.Image(); // Use the native Image constructor
  
    // Set up onload event to execute when the image has finished loading
    img.onload = () => {
      // Once the image has loaded, set the image size state
      setImageSize({ width: img.width, height: img.height });
    };
  
    // Set width and height properties explicitly to avoid missing "width" property error
    img.width = 500; // Set a default width
    img.height = 500; // Set a default height
  
    // Set the source of the image element to the loaded file object URL
    img.src = URL.createObjectURL(image);
  
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
  const handleDpTagChange = (tag) => {
    if (selectedDpTags.includes(tag)) {
      setSelectedDpTags((prevTags) => prevTags.filter((t) => t !== tag));
    } else {
      setSelectedDpTags((prevTags) => [...prevTags, tag]);
    }
  };

  const handleAllergyTagChange = (tag) => {
    if (selectedAllergyTags.includes(tag)) {
      setSelectedAllergyTags((prevTags) => prevTags.filter((t) => t !== tag));
    } else {
      setSelectedAllergyTags((prevTags) => [...prevTags, tag]);
    }
  };

  const handleFileInputChange = (e) => {
    handleFileChange(e);
  };

  // Function to check if all required fields are filled
  const checkFormCompletion = () => {
    console.log("Recipe Name:", recipeName);
    console.log("Recipe Description:", recipeDescription);
    console.log("Recipe Ingredients:", recipeIngredients);
    console.log("Cooking Time:", cookingTime.value);
    console.log("Selected Image:", selectedImage);
    console.log("Selected DP Tags:", selectedDpTags);
    console.log("Selected Allergy Tags:", selectedAllergyTags);
  
    if (
      recipeName &&
      recipeDescription &&
      recipeIngredients &&
      cookingTime.value > 0 &&
      selectedImage &&
      selectedDpTags.length > 0 &&
      selectedAllergyTags.length > 0
    ) {
      setIsFormComplete(true);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleNext = async (e) => {
    e.preventDefault();

    // Check form completion before proceeding
    checkFormCompletion();

    // If form is not complete, show modal and return
    if (!isFormComplete) {
      setIsModalOpen(true);
      return;
    }

    // Convert cooking time to minutes if unit is "hours"
    let cookingTimeInMinutes = cookingTime.value;
    if (cookingTime.unit === "hours") {
      cookingTimeInMinutes *= 60; // Convert hours to minutes
    }

    // Get the data from the state
    const recipeData = {
      recipeName,
      imageUrl: "", // Update this line based on your form structure
      recipeDescription,
      cookingTime: cookingTimeInMinutes,
      recipeIngredients,
      selectedDpTags,
      selectedAllergyTags,
    };

    const formData = new FormData();

    formData.append("recipeName", recipeData.recipeName);
    formData.append("recipeDescription", recipeData.recipeDescription);
    formData.append("cookingTimeValue", recipeData.cookingTime);
    formData.append("recipeIngredients", recipeData.recipeIngredients);
    formData.append("selectedDpTags", selectedDpTags.join(","));
    formData.append("selectedAllergyTags", selectedAllergyTags.join(","));
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
    <div className="flex flex-col min-h-screen bg-[#F9D548] text-[#0A2A67]">
      <Navbar userRole={userRole} className="fixed top-0 left-0 right-0" />
      <div className="flex items-center mb-4">
        <Link
          href="/home/BPHomepage"
          className="flex justify-center items-center w-28 h-10 bg-blue-950 hover:bg-[#154083] text-white text-xl font-bold rounded-[10px] shadow self-start mt-[45px] ml-6"
        >
          &lt;&nbsp;&nbsp;Back
        </Link>
        <h2 className="text-5xl font-extrabold text-[#0A2A67] mb-4 mt-10 ml-8">
          Create Your Recipe{" "}
        </h2>
      </div>
      <div className="w-full mx-auto flex items-center px-8 lg:px-20">
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
              Select Allergy Tags:
            </label>
            {availableAllergyTags.map((tag) => (
              <div key={tag} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`allergyTag-${tag}`}
                  checked={selectedAllergyTags.includes(tag)}
                  onChange={() => handleAllergyTagChange(tag)}
                  className="mr-2"
                />
                <label htmlFor={`allergyTag-${tag}`}>{tag}</label>
              </div>
            ))}
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
                  <Image
                    src={URL.createObjectURL(selectedImage)}
                    alt="Recipe Image"
                    width={imageSize.width}
                    height={imageSize.height}
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
                type="number" // Change the input type to "number"
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
                className="w-full h-full text-neutral-400 text-lg font-medium border-none outline-none resize-none bg-white rounded-[10px] pl-4 pr-4 py-2"
                placeholder="Write your Recipe Ingredients"
              />
            </div>
            <label className="text-blue-950 text-lg font-medium mb-2 mt-4 self-start">
              Select Dietary Preferance Tags:
            </label>
            {availableDpTags.map((tag) => (
              <div key={tag} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`dpTag-${tag}`}
                  checked={selectedDpTags.includes(tag)}
                  onChange={() => handleDpTagChange(tag)}
                  className="mr-2"
                />
                <label htmlFor={`dpTag-${tag}`}>{tag}</label>
              </div>
            ))}
          </form>
        </div>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-center mb-4">
              Please fill out all the required fields before proceeding!
            </h2>
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-blue-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-44 mt-4 focus:outline-none focus:shadow-outline"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div className="w-full flex justify-end mt-auto">
        <button
          onClick={handleNext}
          className="w-28 bg-blue-950 hover:bg-[#1c57b1] text-xl text-white font-bold py-2 px-9 rounded-lg mr-10 mb-12"
        >
          Next
        </button>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default CreateRecipefirst;
