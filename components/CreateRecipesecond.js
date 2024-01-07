import React, { useState } from "react";
import BPNavBar from "./BPNavBar";
import Footer from "./Footer";

const CreateRecipesecond = () => {

  return (
    <div className="flex flex-col min-h-screen bg-[#F9D548] text-[#0A2A67]">

      <BPNavBar className="fixed top-0 left-0 right-0" />

        <div className="mt-10 ml-8">
            <h2 className="text-5xl font-black pb-8">
                Create Your Recipe{" "}
            </h2>
        </div>
        <div className="w-full mx-auto flex items-center px-8 lg:px-20 mt-8">
            <div className="w-1/2 border-r border-gray-400 pr-8">
                <form className="flex flex-col items-start mb-8">

                    <label className="text-blue-950 text-base font-medium mb-2 mt-8 self-start">
                        Enter Recipe Steps:
                    </label>
                    <div className="flex items-center justify-center w-full h-48 pl-2.5 py-2.5 bg-white rounded-[10px] mb-4">
                        <textarea
                            id="recipesteps"
                            className="w-full h-full text-neutral-400 font-medium border-none outline-none resize-none bg-white rounded-[10px] pl-4 pr-4 py-2"
                        />
                    </div>

                    <label className="text-blue-950 text-base font-medium mb-2 mt-8 self-start">
                        Enter Nutritional Facts:
                    </label>
                    <div className="flex items-center justify-center w-full h-48 pl-2.5 py-2.5 bg-white rounded-[10px] mb-4">
                        <textarea
                            id="nutritionalFacts"
                            className="w-full h-full text-neutral-400 font-medium border-none outline-none resize-none bg-white rounded-[10px] pl-4 pr-4 py-2"
                        />
                    </div>
                </form>
            </div>

            <div className="w-1/2 pl-8">
                <form className="flex flex-col items-start mb-8">
                    
                <label className="text-blue-950 text-base font-medium mb-2 mt-8 self-start">
                        Enter Fun Facts:
                    </label>
                    <div className="flex items-center justify-center w-full h-48 pl-2.5 py-2.5 bg-white rounded-[10px] mb-4">
                        <textarea
                            id="funFacts"
                            className="w-full h-full text-neutral-400 font-medium border-none outline-none resize-none bg-white rounded-[10px] pl-4 pr-4 py-2"
                        />
                    </div>

                    <label className="text-blue-950 text-base font-medium mb-2 mt-8 self-start">
                        Enter Tips from the Chef:
                    </label>
                    <div className="flex items-center justify-center w-full h-48 pl-2.5 py-2.5 bg-white rounded-[10px] mb-4">
                        <textarea
                            id="tipsfromthechef"
                            className="w-full h-full text-neutral-400 font-medium border-none outline-none resize-none bg-white rounded-[10px] pl-4 pr-4 py-2"
                        />
                    </div>

                </form>
            </div>
        </div>

        <div className="w-full mt-auto">
            <div className="fixed bottom-32 right-16 px-4 py-4">
                <button className="w-[259px] h-7 bg-blue-950 hover:bg-[#154083] text-white font-bold rounded-[10px] shadow self-end">
                    Submit
                </button>
            </div>
        </div>
        <div className="mt-auto">
            <Footer />
        </div>
    </div>
  );
};

export default CreateRecipesecond;
