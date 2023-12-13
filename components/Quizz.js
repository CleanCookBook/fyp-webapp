import { useRouter } from "next/navigation";
import { useState } from "react";

const Quizz = () => {
  const router = useRouter();
  const [currentWeight, setWeight] = useState("");
  const [currentHeight, setHeight] = useState("");
  const [isDairyFree, setDairyFree] = useState(false);
  const [isVegan, setVegan] = useState(false);
  const [isGlutenFree, setGlutenFree] = useState(false);
  const [isOther, setOther] = useState(false);
  const [currentDiet, setDiet] = useState("");
  const [isSeafood, setSeafood] = useState(false);
  const [isDairy, setDairy] = useState(false);
  const [isNuts, setNuts] = useState(false);
  const [isOther1, setOther1] = useState(false);
  const [otherAllergy, setAllergy] = useState("");
  const [isFifteen, setFifteen] = useState(false);
  const [isTwenty, setTwenty] = useState(false);
  const [isFortyFive, setFortyFive] = useState(false);
  const [isHour, setHour] = useState(false);
  const [isWeightLoss, setWeightLoss] = useState(false);
  const [isDietNutrition, setDietNutrition] = useState(false);
  const [isOverallHealth, setOverallHealth] = useState(false);
  const [isOther2, setOther2] = useState(false);
  const [otherHealth, setHealth] = useState("");
  const [isKeto, setKeto] = useState(false);
  const [isVegetarian, setVegetarian] = useState(false);
  const [isIntermittent, setIntermittent] = useState(false);
  const [isOther3, setOther3] = useState(false);
  const [otherDietMethod, setDietMethod] = useState("");

  const handleDietMethod = (checkboxName) => {
    switch (checkboxName) {
      case "Keto":
        setKeto((prevValue) => !prevValue);
        break;
      case "Vegetarian":
        setVegetarian((prevValue) => !prevValue);
        break;
      case "Intermittent":
        setIntermittent((prevValue) => !prevValue);
        break;

      case "Other":
        setOther3((prevValue) => !prevValue);
        setDietMethod("");
        break;
      // Add more cases for other checkboxes
      default:
        break;
    }
  };

  const handleDietaryChange = (checkboxName) => {
    switch (checkboxName) {
      case "Dairy-free":
        setDairyFree((prevValue) => !prevValue);
        break;
      case "Vegan":
        setVegan((prevValue) => !prevValue);
        break;
      case "Gluten-free":
        setGlutenFree((prevValue) => !prevValue);
        break;

      case "Other":
        setOther((prevValue) => !prevValue);
        setDiet("");
        break;
      // Add more cases for other checkboxes
      default:
        break;
    }
  };

  const handleAllergy = (checkboxName) => {
    // Toggle the state of the checkbox
    switch (checkboxName) {
      case "seaFood":
        setSeafood((prevValue) => !prevValue);
        break;
      case "Dairy":
        setDairy((prevValue) => !prevValue);
        break;
      case "Nuts":
        setNuts((prevValue) => !prevValue);
        break;

      case "Other":
        setOther1((prevValue) => !prevValue);
        setAllergy("");
        break;
      // Add more cases for other checkboxes
      default:
        break;
    }
  };

  const handleCooking = (checkboxName) => {
    // Toggle the state of the checkbox
    switch (checkboxName) {
      case "fifteen":
        setFifteen((prevValue) => !prevValue);
        break;
      case "twenty":
        setTwenty((prevValue) => !prevValue);
        break;
      case "fortyfive":
        setFortyFive((prevValue) => !prevValue);
        break;

      case "hour":
        setHour((prevValue) => !prevValue);
        break;
      // Add more cases for other checkboxes
      default:
        break;
    }
  };

  const handleHealthGoal = (checkboxName) => {
    // Toggle the state of the checkbox
    switch (checkboxName) {
      case "WeightLoss":
        setWeightLoss((prevValue) => !prevValue);
        break;
      case "DietNutrition":
        setDietNutrition((prevValue) => !prevValue);
        break;
      case "OverallHealth":
        setOverallHealth((prevValue) => !prevValue);
        break;

      case "Other":
        setOther2((prevValue) => !prevValue);
        setHealth("");
        break;
      // Add more cases for other checkboxes
      default:
        break;
    }
  };

    const handleSubmit = async () => {
      // Gather only the user-selected data
      const userData1 = {
        currentWeight,
        currentHeight,
        dietaryPreferences: {
          ...(isDairyFree && { dietaryPreference: "Dairy-Free" }),
          ...(isVegan && { dietaryPreference: "Vegan" }),
          ...(isGlutenFree && { dietaryPreference: "Gluten-Free" }),
          ...(isOther && currentDiet && { dietaryPreference: currentDiet }), 
        },
        allergies: {
          ...(isSeafood && { allergy: "Seafood" }),
          ...(isDairy && { allergy: "Dairy" }),
          ...(isNuts && { allergy: "Nuts" }),
          ...(isOther1 && otherAllergy && { allergy: otherAllergy }),
        },
        cookingTime: {
          ...(isFifteen && { isFifteen: "Less than 15" }),
          ...(isTwenty && { isTwenty: "20 to 30 minutes" }),
          ...(isFortyFive && { isFortyFive: "45 to 60 minutes" }),
          ...(isHour && { isHour: "More than an hour" }),
        },
        healthGoals: {
          ...(isWeightLoss && { healthGoal: "Weight Loss" }),
          ...(isDietNutrition && { healthGoal: "Diet and Nutrition" }),
          ...(isOverallHealth && { healthGoal: "Overall Health" }),
          ...(isOther2 && otherHealth && { healthGoal: otherHealth }), 
        },
        dietMethods: {
          ...(isKeto && { dietMethod: "Keto" }), // Map isKeto to 'Keto'
          ...(isVegetarian && { dietMethod: "Vegetarian" }), // Map isVegetarian to 'Another String'
          ...(isIntermittent && { dietMethod: "Intermittent" }),
          ...(isOther3 && otherDietMethod && { dietMethod: otherDietMethod })
        },
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
                  onChange={() => handleDietaryChange("Other")}
                  checked={isOther}
                />
                <span className="text-sm">Other (please specify)</span>
                <input
                  type="text"
                  value={currentDiet}
                  onChange={(e) => setDiet(e.target.value)}
                  className="border border-gray-300 p-1 pb-1 pr-8 rounded-md"
                />
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
                  onChange={() => handleAllergy("seaFood")}
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
                  onChange={() => handleAllergy("Other")}
                  checked={isOther1}
                />
                <span className="text-sm">Other(please specify) </span>
                <input
                  type="text"
                  value={otherAllergy}
                  onChange={(e) => setAllergy(e.target.value)}
                  className="border border-gray-300 p-1 pb-1 pr-8 rounded-md"
                />
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
                  onChange={() => handleCooking("fifteen")}
                  checked={isFifteen}
                />
                <span className="text-sm">15 minutes or less</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  onChange={() => handleCooking("twenty")}
                  checked={isTwenty}
                />
                <span className="text-sm">20-30 minutes</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  onChange={() => handleCooking("fortyfive")}
                  checked={isFortyFive}
                />
                <span className="text-sm">45-60 minutes</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  onChange={() => handleCooking("hour")}
                  checked={isHour}
                />
                <span className="text-sm">More than an hour</span>
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
                  onChange={() => handleHealthGoal("WeightLoss")}
                  checked={isWeightLoss}
                  className="form-checkbox"
                />
                <span className="text-sm">Weight Loss</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  onChange={() => handleHealthGoal("DietNutrition")}
                  checked={isDietNutrition}
                  className="form-checkbox"
                />
                <span className="text-sm">Improve my diet and nutrition</span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  onChange={() => handleHealthGoal("OverallHealth")}
                  checked={isOverallHealth}
                  className="form-checkbox"
                />
                <span className="text-sm">Improve my overall health </span>
              </label>

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  onChange={() => handleHealthGoal("Other")}
                  checked={isOther2}
                  className="form-checkbox"
                />
                <span className="text-sm">Other(please specify) </span>
                <input
                  type="text"
                  value={otherHealth}
                  onChange={(e) => setHealth(e.target.value)}
                  className="border border-gray-300 p-1 pb-1 pr-8 rounded-md"
                />
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
                  onChange={() => handleDietMethod("Intermittent")}
                  checked={isIntermittent}
                  className="form-checkbox"
                />
                <span className="text-sm">Intermittent fasting</span>
              </label>

              <label class="flex items-center space-x-2">
                <input type="checkbox" class="form-checkbox" />
                <span class="text-sm">Other(please specify) </span>
                <input
                  type="text"
                  class="border border-gray-300 p-1 pb-1 pr-8 rounded-md"
                />
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
