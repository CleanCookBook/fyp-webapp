// Ingredients.js
const Ingredients = () => {
    return (
      <div name="content" className="flex">
        {/* First Column - 1/2 width */}
        <div className="w-1/2 p-4 pl-20">
          <p className="text-[#1D5198]">
            4 white Fish Fillet <br />
            100 g Breadcrumbs <br />
            4 Large Potatoes <br />
            400g Frozen Garden Peas <br />
          </p>
        </div>
  
        {/* Second Column - 1/2 width */}
        <div className="w-1/2 p-4">
          <p className="text-[#1D5198]">
            2 Eggs <br />
            Pinch of Salt and Pepper
            <br />
            2 teaspoons of Oil <br />
            20g Butter <br />
          </p>
        </div>
      </div>
    );
  };
  
  export default Ingredients;
  