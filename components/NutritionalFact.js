import React from 'react';

const NutritionalFact = ({ calorie }) => {
  // Split the calorie string into an array
  const calorieArray = calorie ? calorie.split('\n') : [];

  return (
    <React.Fragment>
      <div name="content" className="p-4 pl-20">
        <ul className="list-disc text-[#1D5198] ml-4">
          {calorieArray.map((fact, index) => {
            // Split each line into label and value
            const [label, value] = fact.split('=');

            // Check if both label and value are present
            if (label && value) {
              return (
                <li key={index}>
                  <span className="font-bold">{label.trim()}</span>: {value.trim()}
                </li>
              );
            } else {
              return null; // Skip if the format is not as expected
            }
          })}
        </ul>
        <p className="text-[#1D5198] mt-4">
          Keep in mind that these values are estimations and can vary based
          on factors like specific brands of ingredients, variations in
          sizes, and preparation methods. Adjustments may be necessary based
          on the actual ingredients used.
        </p>
      </div>
    </React.Fragment>
  );
};

export default NutritionalFact;
