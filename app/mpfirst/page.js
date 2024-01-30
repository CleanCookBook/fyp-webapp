// Import necessary modules and components
"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useEffect, useState } from "react";

// Define the functional component
const mpfirst = () => {
  const userRole = "user";
  const [mealPlans, setMealPlans] = useState([]);

  // Function to fetch meal plan options from the backend
  const fetchMealPlans = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/mealPlan/Fp");
      const data = await response.json();

      // Check if data.mealPlans is an array
      const mealPlansArray = Array.isArray(data.mealPlans)
        ? data.mealPlans
        : [];

      setMealPlans(mealPlansArray);
    } catch (error) {
      console.error("Error fetching meal plans:", error);
    }
  };

  // useEffect to fetch meal plans when the component mounts
  useEffect(() => {
    fetchMealPlans();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#F9D548] text-[#0A2A67]">
      <Navbar userRole={userRole} />
      <div className="flex flex-col justify-center items-center mt-20">
        <div className="grid grid-cols-3 gap-20 place-items-center">
          {mealPlans.map((mealPlan) => (
            <Link
              key={mealPlan.MPName}
              href={`/mpfirst/mpDescription/?MealPlanName=${encodeURIComponent(mealPlan.MPName)}`}
            >
              <div className="relative hover:brightness-75 transition-all">
                {/* Add meal plan image */}
               
                <img
                  src={mealPlan.MP_Image}
                  alt={`${mealPlan.MPName} diet food`}
                  width={380}
                  height={380}
                  className="object-cover rounded-[20px] shadow-2xl shadow-black filter brightness-75"
                />
                <div className="absolute top-0 left-0 right-0 p-4 text-white text-start font-bold text-4xl">
                  {mealPlan.MPName.toUpperCase()} {/* Display meal plan name */}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

// Export the component as the default export
export default mpfirst;
