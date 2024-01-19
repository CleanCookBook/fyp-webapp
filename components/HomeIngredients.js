// Ingredients.js
import React from 'react';

const HomeIngredients = ({ ingredients }) => {
  const totalIngredients = ingredients ? ingredients.length : 0;
  const half = Math.ceil(totalIngredients / 2);

  return (
    <div name="content" className="flex">
      {/* First Column - 1/2 width */}
      <div className="w-1/2 p-4 pl-20">
        {ingredients && (
          <p className="text-[#1D5198]">
            {ingredients.slice(0, half).map((ingredient, index) => (
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
            {ingredients.slice(half).map((ingredient, index) => (
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

export default HomeIngredients;