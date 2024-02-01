import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Modal.js
const Modal = ({ onClose }) => {

  const [dietaryPreferences, setDietaryPreferences] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [cookingTime, setCookingTime] = useState('');
  const [calories, setCalories] = useState('');
  const [recipes, setRecipes] = useState([]);
  const router = useRouter();


  const filterData = async () => {
    try {
      const params = new URLSearchParams({
        dietaryPreferences: JSON.stringify(dietaryPreferences),
        allergies: JSON.stringify(allergies),
        cookingTime: cookingTime,
        calories: calories,
      });
  
      const url = `http://localhost:3001/api/filter?${params}`;
  
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error fetching recipe details. HTTP status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Received data:', data); // Log the received data
  
      setRecipes(data);
  
      const filterParams = new URLSearchParams({
        recipes: JSON.stringify(data),
        filters: JSON.stringify({
          dietaryPreferences,
          allergies,
          cookingTime,
          calories
        })
      });
  
      router.push(`/recipelist/recipeFilterlist?${filterParams}`);
  
    } catch (error) {
      console.error('Error in filterData:', error);
    }
  };
  
  const handleCheckboxChange = (setter) => (e) => {
    // alert(e.target.value);
    if (e.target.checked) {
      setter(prev => [...prev, e.target.value]);
    } else {
      setter(prev => prev.filter(pref => pref !== e.target.value));
    }
  };

  const handleClear = () => {
    // Logic to clear checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });

    // Logic to reset dropdowns to default value
    const dropdowns = document.querySelectorAll("select");
    dropdowns.forEach((dropdown) => {
      // Set the first option as the default value
      dropdown.value = dropdown.options[0].value;
    });

    // Logic to clear calories input box
    const caloriesInput = document.querySelector('input[type="number"]');
    caloriesInput.value = ""; // Clear the input box

    // Add any additional logic as needed
    console.log("Clear clicked");
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = await filterData(dietaryPreferences, allergies, cookingTime, calories);
    setRecipes(data);
    console.log("Submit clicked");
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="bg-white p-8 rounded-3xl shadow-2xl">
        {/* Modal content goes here */}
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold mb-4 underline text-blue-900">
            Filter
          </h1>
          <div className="flex">
            {/* Left Section: Dietary Preference */}
            <div className="flex flex-col pr-4 border-r border-blue-900">
              <h2 className="text-lg font-semibold mb-2 text-blue-900">
                Dietary Preference
              </h2>
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  value="Dairy-free"
                  className="mr-2 bg-gray-300" 
                  checked={dietaryPreferences.includes('Dairy-free')}
                  onChange={handleCheckboxChange(setDietaryPreferences)}
                /> 
                Dairy-free
              </label>
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  value="Vegan"
                  className="mr-2 bg-gray-300" 
                  checked={dietaryPreferences.includes('Vegan')}
                  onChange={handleCheckboxChange(setDietaryPreferences)}
                /> 
                Vegan
              </label>
              <label className="flex items-center">
              <input 
                  type="checkbox" 
                  value="Gluten-Free"
                  className="mr-2 bg-gray-300" 
                  checked={dietaryPreferences.includes('Gluten-Free')}
                  onChange={handleCheckboxChange(setDietaryPreferences)}
                /> 
                Gluten-Free
              </label>
              <label className="flex items-center">
              <input 
                  type="checkbox" 
                  value="Halal"
                  className="mr-2 bg-gray-300" 
                  checked={dietaryPreferences.includes('Halal')}
                  onChange={handleCheckboxChange(setDietaryPreferences)}
                /> 
                Halal
              </label>
              {/* Separator line */}
              <div className="border-b my-2 border-blue-900"></div>

              {/* Cooking Time heading */}
              <h2 className="text-lg font-semibold mb-2 text-blue-900">
                Cooking Time
              </h2>
              {/* Cooking Time dropdown */}
              <select 
                name="cookingTime" 
                className="mb-2"
                value={cookingTime}
                onChange={(e) => setCookingTime(e.target.value)}
              >
                <option value="">--- SELECT TIME ---</option>
                <option value="10">10 mins</option>
                <option value="20">20 mins</option>
                <option value="30">30 mins</option>
                <option value="60">1 hr</option>
                <option value="120">2 hrs</option>
                <option value="180">3 hrs</option>
              </select>
              {/* Separator line */}
              <div className="border-b my-2 border-blue-900"></div>

              {/* Calories heading */}
              <h2 className="text-lg font-semibold mb-2 text-blue-900">
                Calories
              </h2>
              {/* Calories input box */}
              <div className="flex items-center mb-1">
              <input
                type="number"
                name="calories"
                className="mr-2 p-2 border rounded"
                placeholder="Enter calories"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
              />
                {/* Calories units dropdown */}
                <p>kcal</p>
              </div>
            </div>

            {/* Right Section: Allergy */}
            <div className="flex flex-col pl-4">
              <h2 className="text-lg font-semibold mb-2 text-blue-900">
                Allergy
              </h2>
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  value="Seafood"
                  className="mr-2 bg-gray-300" 
                  checked={allergies.includes('Seafood')}
                  onChange={handleCheckboxChange(setAllergies)}
                /> 
                Seafood
              </label>
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  value="Dairy"
                  className="mr-2 bg-gray-300" 
                  checked={allergies.includes('Dairy')}
                  onChange={handleCheckboxChange(setAllergies)}
                /> 
                Dairy
              </label>
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  value="Nuts"
                  className="mr-2 bg-gray-300" 
                  checked={allergies.includes('Nuts')}
                  onChange={handleCheckboxChange(setAllergies)}
                /> 
                Nuts
              </label>
              <label className="flex items-center">
                <input 
                  type="checkbox" 
                  value="Eggs"
                  className="mr-2 bg-gray-300" 
                  checked={allergies.includes('Eggs')}
                  onChange={handleCheckboxChange(setAllergies)}
                /> 
                Eggs
              </label>
              {/* Separator line */}
              <div className="border-b my-2 border-blue-900"></div>
            </div>
          </div>

          {/* Display recipes */}
          {recipes && recipes.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-2 text-blue-900">
                Recipes
              </h2>
              <ul>
                {recipes.map((recipe, index) => (
                  <li key={index}>{recipe.Rname}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Button Section */}
          <div className="flex justify-end mt-4 space-x-4">
            <button
              type="button"
              onClick={handleClear}
              className="font-bold text-blue-900 hover:text-blue-700"
            >
              Clear
            </button>
            <button
              type="submit"
              className="font-bold bg-blue-900 hover:bg-[#1c57b1] text-white px-4 py-2 rounded"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={onClose}
              className="font-bold bg-blue-900 hover:bg-[#1c57b1] text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Modal;
