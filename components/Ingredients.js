// Ingredients.js
import React from 'react';

const Ingredients = ({ ingredients }) => {
  const ingredientsArray = Array.isArray(ingredients) && ingredients.length > 0 ? ingredients[0].split('\n') : [];
  const midpoint = Math.ceil(ingredientsArray.length / 2);

  return (
    <div name="content" className="flex">
      {/* First Column - 1/2 width */}
      <div className="w-1/2 p-4 pl-20">
        {ingredients && (
          <p className="text-[#1D5198]">
            {ingredientsArray.slice(0, midpoint).map((ingredient, index) => (
              <React.Fragment key={index}>
                {ingredient.trim()} {/* Trim leading/trailing whitespaces */}
                <br />
              </React.Fragment>
            ))}
          </p>
        )}
      </div>

      {/* Second Column - 1/2 width */}
      <div className="w-1/2 p-4">
        {ingredients && (
          <p className="text-[#1D5198]">
            {ingredientsArray.slice(midpoint).map((ingredient, index) => (
              <React.Fragment key={index}>
                {ingredient.trim()} {/* Trim leading/trailing whitespaces */}
                <br />
              </React.Fragment>
            ))}
          </p>
        )}
      </div>
    </div>
  );
};

export default Ingredients;
