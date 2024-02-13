"use client";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


const BPCreateMealPlan = () => {
  const userRole = "nutritionist";
  const [mealPlanName, setMealPlanName] = useState("");
  const [mealPlanDescription, setMealPlanDescription] = useState("");
  const [adjustingSize, setAdjustingSize] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedDpTags, setSelectedDpTags] = useState([]);
  const [selectedAllergyTags, setSelectedAllergyTags] = useState([]);
  const [recipeOptions, setRecipeOptions] = useState([]);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const router = useRouter();
  const [loading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        // Fetch recipes from the API endpoint using the fetch function
        const response = await fetch("http://localhost:3001/api/mealPlan/recipe", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          // If the response is successful, parse the JSON data
          const data = await response.json();
          // Update the recipeOptions state with the fetched data
          setRecipeOptions(data.recipeOptions);
        } else {
          console.error("Error fetching recipes:", response.statusText);
          // Handle error appropriately (e.g., show an error message)
        }
      } catch (error) {
        console.error("Error fetching recipes:", error.message);
        // Handle error appropriately (e.g., show an error message)
      }
    };

    // Call the fetchRecipes function when the component mounts
    fetchRecipes();
  }, []); // Empty ce with actual recipe names
  const availableDpTags = [
    "Dairy-free",
    "Vegan",
    "Gluten-free",
    "Halal",
    "Nil",
  ];
  const availableAllergyTags = ["Seafood", "Dairy", "Nuts", "Eggs", "Nil"];

  const [recipes, setRecipes] = useState({
    Monday: { recipe1: "", recipe2: "", recipe3: "" },
    Tuesday: { recipe1: "", recipe2: "", recipe3: "" },
    Wednesday: { recipe1: "", recipe2: "", recipe3: "" },
    Thursday: { recipe1: "", recipe2: "", recipe3: "" },
    Friday: { recipe1: "", recipe2: "", recipe3: "" },
    Saturday: { recipe1: "", recipe2: "", recipe3: "" },
    Sunday: { recipe1: "", recipe2: "", recipe3: "" },
  });

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
  
  
  const handleFileInputChange = (e) => {
    handleFileChange(e);
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

  const handleRecipeChange = (day, field, value) => {
    setRecipes((prevRecipes) => ({
      ...prevRecipes,
      [day]: {
        ...prevRecipes[day],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !mealPlanName ||
      !selectedImage ||
      !mealPlanDescription ||
      selectedDpTags.length === 0 ||
      selectedAllergyTags.length === 0 ||
      Object.values(recipes).some(
        (day) =>
          Object.values(day).some((recipe) => !recipe) // Check if any recipe field is empty
      )
    ) {
      console.error("Please fill in all required fields");
      alert("Please upload all required files.");
      // You can also display an error message to the user or highlight the empty fields
      return;
    }

    try {
      const formData = new FormData();
      formData.append("mealPlanName", mealPlanName);
      formData.append("mealPlanDescription", mealPlanDescription);
      formData.append("selectedDpTags", JSON.stringify(selectedDpTags));
      formData.append(
        "selectedAllergyTags",
        JSON.stringify(selectedAllergyTags)
      );
      const recipesValues = Object.keys(recipes).flatMap((day) =>
        Array.from({ length: 3 }, (_, i) => {
          const recipeNumber = i + 1;
          return recipes[day][`recipe${recipeNumber}`];
        })
      );

      // Separate recipes into Recipe 1s, Recipe 2s, and Recipe 3s arrays
      const recipeArray1 = recipesValues.filter((_, index) => index % 3 === 0);
      const recipeArray2 = recipesValues.filter((_, index) => index % 3 === 1);
      const recipeArray3 = recipesValues.filter((_, index) => index % 3 === 2);

      // Append the three arrays to formData
      formData.append("recipeArray1", JSON.stringify(recipeArray1));
      formData.append("recipeArray2", JSON.stringify(recipeArray2));
      formData.append("recipeArray3", JSON.stringify(recipeArray3));
      formData.append("MP_Image", selectedImage);

      console.log("Meal Plan Name:", mealPlanName);
      console.log("Recipe Array 1:", recipeArray1);
      console.log("Recipe Array 2:", recipeArray2);
      console.log("Recipe Array 3:", recipeArray3);

      // Make a POST request to the backend API endpoint
      const response = await fetch(
        "http://localhost:3001/api/mealPlan/upload",
        {
          method: "POST",
          credentials: "include",
          body: formData, // No need to set Content-Type explicitly for FormData
        }
      );

      if (response.ok) {
        console.log("Meal plan created successfully!");
        router.push("/MealPlan")
        // Handle success (e.g., redirect to another page)
      } else {
        console.error("Error creating meal plan:", response.statusText);
        // Handle error appropriately (e.g., show an error message)
      }
    } catch (error) {
      console.error("Error creating meal plan:", error.message);
      // Handle error appropriately (e.g., show an error message)
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
    <div className="flex flex-col min-h-screen bg-[#F9D548]">
      <Navbar userRole={userRole} />
      <div className="container mx-auto p-4 flex-1">
        <div className="flex items-center mb-4">
          <Link 
            href="/MealPlan" 
            className="flex justify-center items-center w-28 h-10 bg-blue-950 hover:bg-[#154083] text-white text-xl font-bold rounded-[10px] shadow self-start mt-[45px] -ml-36"
          >
            &lt;&nbsp;&nbsp;Back
          </Link>

          <h1 className="text-5xl font-extrabold text-[#0A2A67] mb-4 mt-10 ml-8">
            Create a Meal Plan
          </h1>
        </div>
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
            value={mealPlanName} // Add this line to bind the input value to the state
            onChange={(e) => setMealPlanName(e.target.value)}
            placeholder="Enter Meal Plan Name"
          />

          <label className="text-blue-950 text-base font-medium mb-2 self-start">
            Upload Meal Plan Image:
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
                      accept="image/*" // Accept only image files
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
                  className="w-full h-full object-cover rounded-[10px]"
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

          <label className="text-blue-950 text-base font-medium mb-2 self-start">
            Enter Meal Plan Description:
          </label>
          <textarea
            id="mealPlanDescription"
            className="text-neutral-400 text-base font-medium border-none outline-none w-1/2 h-48 pl-2.5 py-2.5 bg-white rounded-[10px] mb-4"
            onChange={(e) => setMealPlanDescription(e.target.value)}
            placeholder="Enter Meal Plan Description"
          />
          <label className="text-blue-950 text-lg font-medium mb-2 mt-4 self-start">
            Select Dietary Preference Tags:
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
            className="w-[259px] h-10 bg-blue-950 hover:bg-[#154083] text-white text-lg font-bold rounded-[10px] shadow self-end"
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
