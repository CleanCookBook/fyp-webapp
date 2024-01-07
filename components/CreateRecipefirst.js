import React, { useState } from "react";
import BPNavBar from "./BPNavBar";
import Footer from "./Footer";

const CreateRecipefirst = () => {

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
                    
                        <label className="text-blue-950 text-sm font-medium mb-2 self-start">
                            Enter recipe name:
                        </label>
                        <input
                            type="text"
                            id="recipeName"
                            className="text-neutral-400 text-lg font-medium border-none outline-none w-full h-8 pl-2.5 py-2.5 bg-white rounded-[10px] mb-4 self-start"
                            required
                        />
                    

                    <label className="text-blue-950 text-sm font-medium mb-2 mt-8 self-start">
                        Enter recipe image:
                    </label>
                    <div className="flex items-center justify-center w-1/2 h-32 pl-2.5 py-2.5 bg-white rounded-[10px] mb-4">
                        {/* Recipe image Upload */}
                        <label htmlFor="RecipeImgUpload" className="cursor-pointer">
                            <span className="mr-2 text-gray-500">Choose File</span>
                            <input
                            type="file"
                            id="RecipeImgUpload"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileChange(e, setRecipeImage)}
                            />
                        </label>
                        {/* Icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-7 w-7 text-gray-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                            fillRule="evenodd"
                            d="M14 7a2 2 0 00-2-2H8a2 2 0 00-2 2v1H4a2 2 0 00-2 2v7a2 2 0 002 2h12a2 2 0 002-2V10a2 2 0 00-2-2h-2V7zM8 7a1 1 0 011-1h2a1 1 0 011 1v1H8V7zm6 3h-2v1a1 1 0 01-1 1H9a1 1 0 01-1-1v-1H6v5h8v-5zM6 6h8a1 1 0 011 1v1H5V7a1 1 0 011-1z"
                            clipRule="evenodd"
                            />
                        </svg>
                    </div>

                    <label className="text-blue-950 text-sm font-medium mb-2 mt-8 self-start">
                        Enter recipe description:
                    </label>
                    <div className="flex items-center justify-center w-full h-32 pl-2.5 py-2.5 bg-white rounded-[10px] mb-4">
                        <textarea
                            id="recipeDescription"
                            className="w-full h-full text-neutral-400 font-medium border-none outline-none resize-none bg-white rounded-[10px] pl-4 pr-4 py-2"
                        />
                    </div>
                </form>
            </div>

            <div className="w-1/2 pl-8">
                <form className="flex flex-col items-start mb-8">
                    
                        <label className="text-blue-950 text-sm font-medium mb-2">
                            Enter Cooking Time:
                        </label>
                        <input
                            type="text"
                            id="cookingTime"
                            className="text-neutral-400 text-lg font-medium border-none outline-none w-full h-8 pl-2.5 py-2.5 bg-white rounded-[10px] mb-4 self-start"
                            required
                        />
                    
                    <label className="text-blue-950 text-sm font-medium mb-2 mt-8">
                        Enter recipe Ingredients:
                    </label>
                    <div className="flex items-center justify-center w-full h-32 pl-2.5 py-2.5 bg-white rounded-[10px] mb-4">
                        <textarea
                            id="recipeIngredients"
                            className="w-full h-full text-neutral-400 font-medium border-none outline-none resize-none bg-white rounded-[10px] pl-4 pr-4 py-2"
                        />
                    </div>

                </form>
            </div>
        </div>

        <div className="w-full mt-auto">
            <div className="fixed bottom-18 right-0 px-4 py-4">
                <button className="w-[259px] h-7 bg-blue-950 hover:bg-[#154083] text-white font-bold rounded-[10px] shadow self-end">
                    Next
                </button>
            </div>
        </div>
        <div className="mt-auto">
            <Footer />
        </div>
    </div>
  );
};

export default CreateRecipefirst;
