// Modal.js
const Modal = ({ onClose }) => {
  const handleSubmit = () => {
    // Add your submit logic here
    console.log("Submit clicked");
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
              <label className="flex items-center mb-1">
                <input type="checkbox" className="mr-2 bg-gray-300" /> Vegan
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Halal
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Pescatarian
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Gluten-Free
              </label>
              {/* Separator line */}
              <div className="border-b my-2 border-blue-900"></div>
              {/* Cooking Time heading */}
              <h2 className="text-lg font-semibold mb-2 text-blue-900">
                Cooking Time
              </h2>
              {/* Cooking Time dropdown */}
              <select className="mb-2">
                <option value="10">--- SELECT TIME ---</option>
                <option value="10">10 mins</option>
                <option value="20">20 mins</option>
                <option value="30">30 mins</option>
                <option value="60">1 hr</option>
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
                  className="mr-2 p-2 border rounded"
                  placeholder="Enter calories"
                />
                {/* Calories units dropdown */}
                <select>
                  <option value="cal">cal</option>
                  <option value="kcal">kcal</option>
                </select>
              </div>
            </div>

            {/* Right Section: Allergy */}
            <div className="flex flex-col pl-4">
              <h2 className="text-lg font-semibold mb-2 text-blue-900">
                Allergy
              </h2>
              <label className="flex items-center mb-1">
                <input type="checkbox" className="mr-2" /> Nuts
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Dairy-free
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Seafood
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Eggs
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Soy
              </label>
              {/* Separator line */}
              <div className="border-b my-2 border-blue-900"></div>
            </div>
          </div>

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
