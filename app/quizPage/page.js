"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Quizz = () => {
  const router = useRouter();
  const [currentWeight, setWeight] = useState("");
  const [currentHeight, setHeight] = useState("");
  const [selectedDietaryPreferences, setSelectedDietaryPreferences] = useState("");
  const [selectedAllergies, setSelectedAllergies] = useState("");
  const [selectedCookingTimes, setSelectedCookingTimes] = useState("");
  const [selectedHealthGoals, setSelectedHealthGoals] = useState("");
  const [selectedDietMethods, setSelectedDietMethods] = useState("");
  

const handleDietaryChange = (checkboxName) => {
  setSelectedDietaryPreferences((prevValue) => {
    // Toggle the state of the checkbox
    const isSelected = !prevValue.includes(checkboxName);

    if (isSelected) {
      // If not selected, add to the string
      return prevValue + (prevValue ? `, ${checkboxName}` : checkboxName);
    } else {
      // If already selected, remove from the string
      return prevValue.replace(`${checkboxName}, `, "").replace(`${checkboxName}`, "");
    }
  });
};
const isDairyFree = selectedDietaryPreferences.includes("Dairy-free");
  const isVegan = selectedDietaryPreferences.includes("Vegan")
  const isGlutenFree = selectedDietaryPreferences.includes("Gluten-free");
  const isHalal= selectedDietaryPreferences.includes("Halal");
  const isNil = selectedDietaryPreferences.includes("Nil");

  const handleAllergy = (checkboxName) => {
    setSelectedAllergies((prevValue) => {
      const isSelected = !prevValue.includes(checkboxName);
  
      if (isSelected) {
        // If not selected, add to the string
        return prevValue + (prevValue ? `, ${checkboxName}` : checkboxName);
      } else {
        // If already selected, remove from the string
        return prevValue.replace(`${checkboxName}, `, "").replace(`${checkboxName}`, "");
      }
    });
  };

const isSeafood = selectedAllergies.includes("Seafood");
const isDairy = selectedAllergies.includes("Dairy");
const isNuts = selectedAllergies.includes("Nuts");
const isEggs = selectedAllergies.includes("Eggs");
const isNil1= selectedAllergies.includes("Nil");

const handleCooking = (checkboxName) => {
  setSelectedCookingTimes((prevValue) => {
    // Toggle the state of the checkbox
    const isSelected = !prevValue.includes(checkboxName);

    if (isSelected) {
      // If not selected, add to the string
      return prevValue + (prevValue ? `, ${checkboxName}` : checkboxName);
    } else {
      // If already selected, remove from the string
      return prevValue.replace(`${checkboxName}, `, "").replace(`${checkboxName}`, "");
    }
  });
};

const isFifteen = selectedCookingTimes.includes("15 mins or less");
const isTwenty = selectedCookingTimes.includes("20-30 minutes");
const isFortyFive = selectedCookingTimes.includes("45-60 minutes");
const isHour = selectedCookingTimes.includes("More than an hour");
const isNil2 = selectedCookingTimes.includes("Nil");

const handleHealthGoal = (checkboxName) => {
  setSelectedHealthGoals((prevValue) => {
    const isSelected = !prevValue.includes(checkboxName);
  
    if (isSelected) {
      // If not selected, add to the string
      return prevValue + (prevValue ? `, ${checkboxName}` : checkboxName);
    } else {
      // If already selected, remove from the string
      return prevValue.replace(`${checkboxName}, `, "").replace(`${checkboxName}`, "");
    }
  });
};

const isWeightLoss = selectedHealthGoals.includes("Weight Loss");
const isDietNutrition = selectedHealthGoals.includes("Diet Nutrition");
const isOverallHealth = selectedHealthGoals.includes("Overall Health");
const isCalorieNeeds = selectedHealthGoals.includes("Calorie Needs");
const isNil3 = selectedHealthGoals.includes("Nil");

const handleDietMethod = (checkboxName) => {
  setSelectedDietMethods((prevValue) => {
    const isSelected = !prevValue.includes(checkboxName);
  
    if (isSelected) {
      // If not selected, add to the string
      return prevValue + (prevValue ? `, ${checkboxName}` : checkboxName);
    } else {
      // If already selected, remove from the string
      return prevValue.replace(`${checkboxName}, `, "").replace(`${checkboxName}`, "");
    }
  });
};

const isKeto = selectedDietMethods.includes("Keto");
const isVegetarian= selectedDietMethods.includes("Vegetarian");
const isIntermittent = selectedDietMethods.includes("Intermittent Fasting");
const isMediterranean = selectedDietMethods.includes("Mediterranean");
const isNil4 = selectedDietMethods.includes("Nil");


    const handleSubmit = async () => {
      // Gather only the user-selected data
      const userData1 = {
        currentWeight,
        currentHeight,
        dietaryPreferences: selectedDietaryPreferences,
        allergies: selectedAllergies,
        cookingTime: selectedCookingTimes,
        healthGoals: selectedHealthGoals,
        dietMethods: selectedDietMethods,
      };
      console.log(userData1);

    try {
      // Perform the HTTP POST request
      const response = await fetch("http://localhost:3001/api/quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add any additional headers if needed
        },
        body: JSON.stringify(userData1),
      });

      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        // Parse the response if needed
        const responseData = await response.json();
        console.log("Server response:", responseData);
        router.push("/termsCon");
      } else {
        // Handle errors
        console.error(
          "Server request failed:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  return (
    <html className="h-screen bg-[#F9D548] text-[#0A2A67]">
      <body className="h-screen bg-[#F9D548] text-[#0A2A67]">
        <div className="lg:w-4/5 lg:pr-8 p-8 flex flex-col items-center">
          <h2 className="text-6xl font-black py-5">
            Help us get to know you better!
          </h2>
        </div>
        <div className="lg:pr-8 p-8 grid grid-cols-3 gap-6 place-items-stretch">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-lg font-semibold mb-4">
              1. What dietary restrictions or preference do you have?
            </h2>

            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  onChange={() => handleDietaryChange("Dairy-free")}
                  checked={isDairyFree}
                />
                <span className="text-sm">Dairy-free</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  onChange={() => handleDietaryChange("Vegan")}
                  checked={isVegan}
                />
                <span className="text-sm">Vegan</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  onChange={() => handleDietaryChange("Gluten-free")}
                  checked={isGlutenFree}
                />
                <span className="text-sm">Gluten-free</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  onChange={() => handleDietaryChange("Halal")}
                  checked={isHalal}
                />
                <span className="text-sm">Halal</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  onChange={() => handleDietaryChange("Nil")}
                  checked={isNil}
                />
                <span className="text-sm">Nil</span>
              </label>
            </div>
          </div>

          

          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-lg font-semibold mb-4">
              2. What is your current weight?
            </h2>
            <div className="space-y-2">
              <label className="mx-auto px-4 items-center space-x-2">
                <span className="text-sm"></span>
                <input
                  type="text"
                  value={currentWeight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="border border-gray-300 p-1 pb-1 pr-8 rounded-md"
                />
                <span className="text-sm">kg</span>
              </label>
            </div>
          </div>

          <div class="bg-white p-6 rounded shadow-md">
            <h2 class="text-lg font-semibold mb-4">
              3. What is your current height?
            </h2>
            <div class="space-y-2">
              <label class="mx-auto px-4 items-center space-x-2">
                <span class="text-sm"></span>
                <input
                  type="text"
                  value={currentHeight}
                  onChange={(e) => setHeight(e.target.value)}
                  class="border border-gray-300 p-1 pb-1 pr-8 rounded-md"
                />
                <span class="text-sm">cm</span>
              </label>
            </div>
          </div>

          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-lg font-semibold mb-4">
              4. What foods do you think you might be allergic to?
            </h2>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  onChange={() => handleAllergy("Seafood")}
                  checked={isSeafood}
                />
                <span className="text-sm">
                  Seafood (Shrimp, Crab, Lobster, etc.)
                </span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  onChange={() => handleAllergy("Dairy")}
                  checked={isDairy}
                />
                <span className="text-sm">
                  Dairy products (Cheese, Milk, Yogurt, etc.)
                </span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  onChange={() => handleAllergy("Nuts")}
                  checked={isNuts}
                />
                <span className="text-sm">
                  Nuts and seeds (Almonds, peanuts, Sunflower seeds, etc.)
                </span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  onChange={() => handleAllergy("Eggs")}
                  checked={isEggs}
                />
                <span className="text-sm">
                  Eggs 
                </span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  onChange={() => handleAllergy("Nil")}
                  checked={isNil1}
                />
                <span className="text-sm">Nil</span>
              </label>
            </div>
          </div>

          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-lg font-semibold mb-4">
              5. How much time do you typically have to cook?
            </h2>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  onChange={() => handleCooking("15 mins or less")}
                  checked={isFifteen}
                />
                <span className="text-sm">15 minutes or less</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  onChange={() => handleCooking("20-30 minutes")}
                  checked={isTwenty}
                />
                <span className="text-sm">20-30 minutes</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  onChange={() => handleCooking("45-60 minutes")}
                  checked={isFortyFive}
                />
                <span className="text-sm">45-60 minutes</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  onChange={() => handleCooking("More than an hour")}
                  checked={isHour}
                />
                <span className="text-sm">More than an hour</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  onChange={() => handleCooking("Nil")}
                  checked={isNil2}
                />
                <span className="text-sm">Nil</span>
              </label>
            </div>
          </div>

          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-lg font-semibold mb-4">
              6. What is your primary health goal?
            </h2>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  onChange={() => handleHealthGoal("Weight Loss")}
                  checked={isWeightLoss}
                  className="form-checkbox"
                />
                <span className="text-sm">Weight Loss</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  onChange={() => handleHealthGoal("Diet Nutrition")}
                  checked={isDietNutrition}
                  className="form-checkbox"
                />
                <span className="text-sm">Improve my diet and nutrition</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  onChange={() => handleHealthGoal("Overall Health")}
                  checked={isOverallHealth}
                  className="form-checkbox"
                />
                <span className="text-sm">Improve my overall health </span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  onChange={() => handleHealthGoal("Calorie Needs")}
                  checked={isCalorieNeeds}
                  className="form-checkbox"
                />
                <span className="text-sm">Adequate Nutrients Within Calorie Needs</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  onChange={() => handleHealthGoal("Nil")}
                  checked={isNil3}
                />
                <span className="text-sm">Nil</span>
              </label>
            </div>
          </div>

          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-lg font-semibold mb-4">
              7. Are you following any specific diet plans or trends?
            </h2>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  onChange={() => handleDietMethod("Keto")}
                  checked={isKeto}
                  className="form-checkbox"
                />
                <span className="text-sm">Ketogenic diet</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  onChange={() => handleDietMethod("Vegetarian")}
                  checked={isVegetarian}
                  className="form-checkbox"
                />
                <span className="text-sm">Vegetarian diet</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  onChange={() => handleDietMethod("Intermittent Fasting")}
                  checked={isIntermittent}
                  className="form-checkbox"
                />
                <span className="text-sm">Intermittent fasting</span>
              </label>

              <label class="flex items-center space-x-2">
              <input
                  type="checkbox"
                  onChange={() => handleDietMethod("Mediterranean")}
                  checked={isMediterranean}
                  className="form-checkbox"
                />
                <span className="text-sm">Mediterranean Diet</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  onChange={() => handleDietMethod("Nil")}
                  checked={isNil4}
                />
                <span className="text-sm">Nil</span>
              </label>
            </div>
          </div>
        </div>
        <div className="fixed bottom-6 right-20">
        <button
          className="w-[350px] h-10 bg-blue-950 hover:bg-[#154083] text-white text-xl font-bold rounded-[10px] shadow"
          onClick={handleSubmit} // Call the handleSubmit function on button click
        >
          Next
        </button>
      </div>
    </body>
  </html>
);
};

export default Quizz;
