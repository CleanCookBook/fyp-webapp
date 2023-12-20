"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from 'next/link';

const LowCarbMealPlan3 = () => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleRecipeClick = (recipeName) => {
    // Handle click for the recipe, e.g., redirect to the recipe page
    console.log(`Clicked recipe: ${recipeName}`);
  };

  return (
    <section className="flex flex-col h-screen bg-[#F9D548]">
      <Navbar />
      <div className="flex-grow w-[1108px] mx-auto mt-8">
        <Link href="/LowCarbsMealPlan1">
          <button className="flex justify-center items-center w-[94px] h-[38px] bg-blue-950 rounded-[10px] shadow mb-9">
            <div className="text-white font-medium focus:outline-none">
              &lt; Back
            </div>
          </button>
        </Link>
        <h1 className="text-blue-950 text-5xl font-extrabold text-left mb-8 pl-8">
          Low Carbs Diet{" "}
        </h1>
        <div className="grid grid-cols-7 gap-4 text-center">
          {days.map((day, index) => (
            <div
              key={index}
              className="bg-blue-950 rounded-lg p-4 text-white"
              onClick={() => handleRecipeClick(`Recipe ${index + 1}`)}
            >
              <h2 className="text-lg font-semibold mb-2 relative">
                {day}
                <div className="w-full h-0.5 bg-white absolute bottom-0 left-0"></div>
              </h2>
              <div className="flex flex-col">
                <button
                  onClick={() => handleRecipeClick(`Recipe 1`)}
                  className="mb-2"
                >
                  Recipe 1
                </button>
                <button
                  onClick={() => handleRecipeClick(`Recipe 2`)}
                  className="mb-2"
                >
                  Recipe 2
                </button>
                <button onClick={() => handleRecipeClick(`Recipe 3`)}>
                  Recipe 3
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-blue-950 font-medium text-start mt-8">
          <p>Check Your Progress!</p>
        </div>
        <div className="relative mt-[4rem]">
          <div className="w-full h-1 bg-blue-950 rounded-lg overflow-hidden relative"></div>
          <img
            src="pin.png"
            alt="Pin"
            className="absolute top-0 -mt-10 left-0"
            style={{ height: "40px", width: "auto" }}
          />
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default LowCarbMealPlan3;
