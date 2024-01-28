"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { toast } from 'react-toastify';
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';

const LCProgress = () => {
  const userRole = 'user'; 
  const [mealPlanRecipes, setMealPlanRecipes] = useState(null);
  const searchParams = useSearchParams();
  const mealPlanName = searchParams.get("MealPlan");
  const [checkedDays, setCheckedDays] = useState([]);
  const [movePin, setMovePin] = useState(false); // State to track checkbox state
  const [notification, setNotification] = useState(null);
  const [gifPaths, setGifPaths] = useState([]);
  
  const router = useRouter();

  useEffect(() => {
    const fetchMealPlanRecipes = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/mealPlan/${encodeURIComponent(mealPlanName)}/recipes`);
        const data = await response.json();

        if (response.ok) {
          console.log('Fetched meal plan recipes:', data);

          // Organize recipes into separate arrays
          const recipes = {
            Recipe1: data.recipes.Recipe1 || [],
            Recipe2: data.recipes.Recipe2 || [],
            Recipe3: data.recipes.Recipe3 || [],
          };

          console.log('Organized recipes:', recipes);
          setMealPlanRecipes(recipes);
        } else {
          console.error('Error fetching meal plan recipes:', data.error);
        }
      } catch (error) {
        console.error('Error fetching meal plan recipes:', error.message);
      }
    };

    fetchMealPlanRecipes();
  }, [mealPlanName]);

  useEffect(() => {
    // Initialize the GIF paths array
    const paths = [
      "/Eggs.gif",
      "/Spoons.gif",
      "/finished.gif",
      "/bowl.gif",
      "/apples.gif",
      "/pea.gif",
      "/orange.gif"
    ];
    setGifPaths(paths);
  }, []);

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

    // Function to handle checkbox state change
    const handleCheckboxChange = (dayIndex) => {
      // Toggle the checked state for the clicked day
      if (checkedDays.includes(dayIndex)) {
        setCheckedDays(checkedDays.filter((index) => index !== dayIndex));
      } else {
        setCheckedDays([...checkedDays, dayIndex]);
        // Show a notification with a custom message based on the day
        switch (dayIndex) {
          case 0:
            setNotification('Start your week with healthy food choices!');
            break;
          case 1:
            setNotification('Nourish your body with nutritious ingredients!');
            break;
          case 2:
            setNotification('Stay committed to your health and wellnes!');
            break;
          case 3:
            setNotification('Every healthy choice brings you closer to success!');
            break;
          case 4:
            setNotification('Fuel your body for energy and vitality!');
            break;
          case 5:
            setNotification('Embrace the benefits of mindful eating!');
            break;
          case 6:
            setNotification('Celebrate your progress and healthy habits!');
            break;
          default:
            setNotification('Good progress!');
            break;
        }
      }
    }

  // Function to calculate the transformation for the pin image
  const calculatePinTransformation = () => {
    // Calculate the total movement based on the number of checked days
    const totalMovement = checkedDays.length * 4; // Assuming each day moves the pin by 4cm
    
    // Apply the total movement as translation along the x-axis
    return `translateX(${totalMovement}cm)`;
  };

  const handleRecipeClick = (recipeName) => {
    // Handle click for the recipe, e.g., redirect to the recipe page
    console.log(`Clicked recipe: ${recipeName}`);
  };

return(
<section className="flex flex-col h-screen bg-[#F9D548]">
  <Navbar userRole={userRole} />
    <div className="flex-grow w-[1108px] mx-auto mt-8">
      <button
        onClick={() => router.push('/mpfirst/LowCarbsMP')}
        className="flex justify-center items-center w-[94px] h-[38px] bg-blue-950 rounded-[10px] shadow mb-9"
      >
        <div className="text-white font-medium focus:outline-none">
          &lt; Back
        </div>
      </button>
      
      <div className="grid grid-cols-7 gap-4 text-center">
        {days.map((day, dayIndex) => (
          <div key={dayIndex} className="bg-blue-950 rounded-lg p-10 text-white flex flex-col items-center">
            <h2 className="text-lg font-semibold mb-2 relative">
              <input
                type="checkbox"
                id={`day-${dayIndex}`}
                onChange={() => handleCheckboxChange(dayIndex)} // Connect handleCheckboxChange to onChange event
              />
              <label htmlFor={`day-${dayIndex}`}>
                {day} 
              </label>
              <div className="w-full h-0.5 bg-white absolute bottom-0 left-0"></div>
            </h2>
            <div className="flex flex-col">
              {mealPlanRecipes && (
                <>
                  <button
                    onClick={() => {
                      router.push(`/detailRecipe?recipeName=${encodeURIComponent(mealPlanRecipes.Recipe1[dayIndex])}`);
                      handleRecipeClick(mealPlanRecipes.Recipe1[dayIndex] || 'No recipes available');
                    }}
                    className="mb-2"
                  >
                    {mealPlanRecipes.Recipe1[dayIndex] || 'No recipes available'}
                  </button>
                  <button
                    onClick={() => {
                      router.push(`/detailRecipe?recipeName=${encodeURIComponent(mealPlanRecipes.Recipe2[dayIndex])}`);
                      handleRecipeClick(mealPlanRecipes.Recipe2[dayIndex] || 'No recipes available');
                    }}
                    className="mb-2"
                  >
                    {mealPlanRecipes.Recipe2[dayIndex] || 'No recipes available'}
                  </button>
                  <button
                    onClick={() => {
                      router.push(`/detailRecipe?recipeName=${encodeURIComponent(mealPlanRecipes.Recipe3[dayIndex])}`);
                      handleRecipeClick(mealPlanRecipes.Recipe3[dayIndex] || 'No recipes available');
                    }}
                  >
                    {mealPlanRecipes.Recipe3[dayIndex] || 'No recipes available'}
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="text-blue-950 font-medium text-start mt-8">
        <p>Check Your Progress!</p>
      </div>

      <div className="relative mt-[4rem]">
        <div
          className="w-full h-1 bg-blue-950 rounded-lg overflow-hidden relative"
        ></div>
        <Image
          src="/pin.png"
          alt="Pin"
          className="absolute top-0 -mt-12 left-0"
          height={50}
          width={50} // Set the width to a numeric value in pixels
          style={{
            transform: calculatePinTransformation(),
          }}
        />
      </div>

      {notification && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
          <div className="bg-blue-900 text-white font-bold h-auto w-auto p-4 rounded-[20px] flex flex-col items-center">
            <p className="mt-6 text-lg">{notification}</p>
            {/* Include the GIF based on the day index */}
            <img
              src={gifPaths[checkedDays.length - 1]}
              alt="GIF"
              className="-mt-2"
              style={{ width: '200px', height: 'auto' }} // Adjust the width and height as needed
            />
            <button onClick={() => setNotification(null)} className="mt-4 bg-white hover:bg-grey-700 text-blue-950 font-bold py-2 px-4 rounded">
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  <Footer />
</section>
);
};

export default LCProgress;
