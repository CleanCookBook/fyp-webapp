import React from "react";
import BPNavBar from "./BPNavBar";
import Footer from "./Footer";

const BPHomepage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#F9D548] text-[#0A2A67]">
      <BPNavBar className="fixed top-0 left-0 right-0" />
      <div className="flex flex-col items-center flex-1">
        <h2 className="text-6xl font-black mt-20">What Shall We Do Today? </h2>
        <div className="flex justify-center mt-8">
          {/* Buttons container */}
          <div className="grid grid-cols-2 gap-4 py-10">
            {/* Buttons */}
            <button className="bg-white hover:bg-gray-200 text-[#0A2A67] font-bold py-8 px-8 rounded-lg text-2xl w-full">
              Create/View
              <br />
              Recipe
            </button>
            <button className="bg-white hover:bg-gray-200 text-[#0A2A67] font-bold py-8 px-8 rounded-lg text-2xl w-full">
              Create/View
              <br />
              Announcement
            </button>
            <button className="bg-white hover:bg-gray-200 text-[#0A2A67] font-bold py-8 px-8 rounded-lg text-2xl w-full">
              Chat with Us
            </button>
            <button className="bg-white hover:bg-gray-200 text-[#0A2A67] font-bold py-8 px-8 rounded-lg text-2xl w-full">
              Create/View
              <br />
              Meal Plans
            </button>
          </div>
        </div>
      </div>
      <Footer className="fixed bottom-0 left-0 right-0" />
    </div>
  );
};

export default BPHomepage;
