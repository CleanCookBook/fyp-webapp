import React from "react";
const ChefNote = ({ chefNote }) => {
  // Split the tips and tricks string into an array
  const tipsArray = chefNote ? chefNote.split('|') : [];

  return (
    <div name="content" className="p-4 pl-20">
      {tipsArray.map((tip, index) => {
        // Extract the heading and content using the ":" delimiter
        const [heading, content] = tip.split(':');

        // Check if both heading and content are present
        if (heading && content) {
          return (
            <React.Fragment key={index}>
              <h3 className="text-xl text-[#1D5198] font-bold">
                {heading.trim()}:
              </h3>
              <p className="text-[#1D5198]">{content.trim()}</p>
            </React.Fragment>
          );
        } else {
          return null; // Skip if the format is not as expected
        }
      })}
    </div>
  );
};

export default ChefNote;
