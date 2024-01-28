"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const mpDescription = () => {
  const userRole = 'user';  
  const router = useRouter();
  const [mealPlanDetails, setMealPlanDetails] = useState(null);
  const searchParams = useSearchParams();
  const mealPlanName = searchParams.get("mealplanName");

  useEffect(() => {
    const fetchMealPlanDetails = async () => {
      try {

        
        if (mealPlanName) {
          const response = await fetch(`http://localhost:3001/api/mealPlan/${mealPlanName}`);
          const data = await response.json();
    
          if (response.ok) {
            setMealPlanDetails(data); // Set the entire meal plan object in state
          } else {
            console.error('Error fetching meal plan details:', data.error);
          }
        }
      } catch (error) {
        console.error('Error fetching meal plan details:', error.message);
      }
    };
    
    fetchMealPlanDetails();
  }, []);

  return (
    <section className="flex flex-col h-screen bg-[#F9D548]">
      <Navbar userRole={userRole} />
      <div className="flex-grow w-[1108px] mx-auto mt-8">
        {/* Link to navigate back */}
        <Link href="/mpfirst">
          <button className="flex justify-center items-center w-[94px] h-[38px] bg-blue-950 rounded-[10px] shadow mb-9">
            <div className="text-white font-medium focus:outline-none">
              &lt; Back
            </div>
          </button>
        </Link>

        <h1 className="text-blue-950 text-5xl font-extrabold text-left mb-8 pl-8">
          {mealPlanDetails?.MPName}
        </h1>

        <div className="text-blue-950 text-base text-center font-medium">
        {mealPlanDetails?.description.split('\r\n').map((paragraph, index) => (
          <React.Fragment key={index}>
            <p>{paragraph}</p>
            {index !== mealPlanDetails.description.split('\r\n').length - 1 && <br />} 
          </React.Fragment>
        ))}
        </div>

        <div className="flex justify-center mt-11">
          {/* Link to navigate to LCProgress */}
          <Link href={`/mpfirst/LCProgress/?MealPlan=${encodeURIComponent(mealPlanName)}`}>
            <button className="w-[234px] h-[46px] bg-blue-950 rounded-[10px] shadow flex items-center justify-center">
              <div className="text-white font-medium focus:outline-none">
                Start Your Meal Plan Now
              </div>
            </button>  
          </Link>
        </div>
      </div>
      <Footer className="mt-auto" />
    </section>
  );
};

export default mpDescription;
