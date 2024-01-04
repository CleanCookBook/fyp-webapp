import React from 'react';

const NutritionalFact = ({ calorie }) => {
  // Split the calorie string into an array
  const calorieArray = calorie ? calorie.split(',') : [];

  // Static labels
  const labels = [
    'Calories',
    'Protein',
    'Fat',
    'Carbohydrates',
    'Fiber'
  ];

  return (
    <React.Fragment>
      <div name="content" className="p-4 pl-20">
        <ul className="list-disc text-[#1D5198] ml-4">
          {labels.map((label, index) => (
            <li key={index}>
              <b>{label}:</b> {calorieArray[index] ? calorieArray[index].trim() : ''}
            </li>
          ))}
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
