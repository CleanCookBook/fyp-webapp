// Instructions.js
import React from "react";

const Instructions = ({ instruction }) => {
  return (
    <div name="content" className="p-4 pl-20">
      {instruction && instruction.map((paragraph, index) => {
        // Extract the title and content using the regex pattern
        const match = paragraph.match(/^(.*?):(.*)$/);

        // Check if the regex pattern matches
        if (match) {
          const [, title, content] = match;
          return (
            <React.Fragment key={index}>
              <h3 className="text-xl text-[#1D5198] font-bold">
                {title.trim()}:
              </h3>
              <p className="text-[#1D5198]">{content.trim()}</p>
              <br />
            </React.Fragment>
          );
        } else {
          return (
            <React.Fragment key={index}>
              <p className="text-[#1D5198]">
                {paragraph.trim()} {/* Trim leading/trailing whitespaces */}
                <br />
              </p>
            </React.Fragment>
          );
        }
      })}
    </div>
  );
};

export default Instructions;
