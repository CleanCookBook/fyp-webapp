import React from "react";

const ChefNote = ({ chefNote }) => {
  // Split the tips and tricks string into an array
  const tipsArray = chefNote ? chefNote.split('|') : [];

  return (
    <div name="content" className="p-4 pl-20">
      {tipsArray.map((tip, index) => {
        // Check if the tip contains the ":" delimiter
        const hasDelimiter = tip.includes(':');
        const paragraphs = tip.split('\n');

        // If there's no ":", treat the entire tip as content
        if (!hasDelimiter) {
          return paragraphs.map((paragraph, paragraphIndex) => (
            <React.Fragment key={`${index}-${paragraphIndex}`}>
              <p className="text-[#1D5198]">
                {paragraph.trim()}
              </p>
              <br />
            </React.Fragment>
            ));
        }

        // Extract the heading and content using the ":" delimiter
        const [heading, ...contentParts] = tip.split(':');
        const content = contentParts.join(':');

        // Check if both heading and content are present
        if (heading && content) {
          return (
            <React.Fragment key={index}>
              <h3 className="text-xl font-bold text-[#1D5198]">
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
