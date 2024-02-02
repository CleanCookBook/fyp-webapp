"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const mpDescription = () => {
  const userRole = "user";
  const router = useRouter();
  const [mealPlanDetails, setMealPlanDetails] = useState(null);
  const searchParams = useSearchParams();
  const mealPlanName = searchParams.get("MealPlanName");
  const [mealPlanStatus, setMealPlanStatus] = useState("start");

  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/check-auth", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          setIsAuthenticated(true);
          
        } else {
          router.push('/loginPage');
        }
      } catch (error) {
        console.error('Error during authentication check:', error.message);
      } finally {
        // Set loading to false when authentication check is complete
        setLoading(false);
      }
    };

    checkAuthentication();
  }, [router]);

  useEffect(() => {
    const fetchMealPlanDetails = async () => {
      try {
        if (mealPlanName) {
          const response = await fetch(
            `http://localhost:3001/api/mealPlan/${mealPlanName}`
          );
          if (response.ok) {
            const data = await response.json();
            setMealPlanDetails(data);
          } else {
            console.error(
              "Error fetching meal plan details:",
              response.statusText
            );
          }
        }
      } catch (error) {
        console.error("Error fetching meal plan details:", error.message);
      }
    };

    const fetchInitialMealPlanStatus = async () => {
      await fetchMealPlanStatus();
    };

    fetchMealPlanDetails();
    fetchInitialMealPlanStatus(); // Add this line to fetch the initial status
  }, [mealPlanName]);

  const fetchMealPlanStatus = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/mealPlan/TrackStatus/${encodeURIComponent(
          mealPlanName
        )}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setMealPlanStatus(data.status);
      } else {
        console.error("Error fetching meal plan status:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching meal plan status:", error.message);
    }
  };

  const handleStartMealPlan = async () => {
    try {
      // Update the "MealPlanTrack" table
      const response = await fetch("http://localhost:3001/api/registration", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          MPName: mealPlanName,
          Monday: null,
          Tuesday: null,
          Wednesday: null,
          Thursday: null,
          Friday: null,
          Saturday: null,
          Sunday: null,
        }),
      });

      if (response.ok) {
        console.log("Meal plan track updated successfully.");

        // Redirect to LCProgress or perform any other necessary actions
        router.push(
          `/mpfirst/LCProgress/?MealPlan=${encodeURIComponent(mealPlanName)}`
        );
      } else {
        console.error("Error updating meal plan track:", response.statusText);
        // Handle the error, e.g., show an error message to the user
      }
    } catch (error) {
      console.error("Error handling start meal plan:", error.message);
    }
  };
  if (!isAuthenticated) {
    // If not authenticated, the user will be redirected during authentication check
    return null;
  }

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <section className="flex flex-col h-screen bg-[#F9D548]">
      <Navbar userRole={userRole} />
      <div className="flex-grow w-[1108px] mx-auto mt-8">
        {/* Link to navigate back */}
        <Link href="/mpfirst">
          <button
            onClick={handleStartMealPlan}
            className="flex justify-center items-center w-[94px] h-[38px] bg-blue-950 rounded-[10px] shadow mb-9"
          >
            <div className="text-white font-medium focus:outline-none">
              &lt; Back
            </div>
          </button>
        </Link>

        <h1 className="text-blue-950 text-5xl font-extrabold text-left mb-8 pl-8">
          {mealPlanName}
        </h1>

        <div className="text-blue-950 text-base text-center font-medium">
          {mealPlanDetails?.description
            .split("\r\n")
            .map((paragraph, index) => (
              <React.Fragment key={index}>
                <p>{paragraph}</p>
                {index !==
                  mealPlanDetails.description.split("\r\n").length - 1 && (
                  <br />
                )}
              </React.Fragment>
            ))}
        </div>

        <div className="flex justify-center mt-11">
          {/* Render different buttons based on mealPlanStatus */}
          {mealPlanStatus === "start" ? (
            <button
              onClick={handleStartMealPlan}
              className="w-[234px] h-[46px] bg-blue-950 rounded-[10px] shadow flex items-center justify-center"
            >
              <div className="text-white font-medium focus:outline-none">
                Start Your Meal Plan Now
              </div>
            </button>
          ) : (
            <Link href={`/mpfirst/LCProgress/?MealPlan=${encodeURIComponent(mealPlanName)}`}>
            <button className="w-[234px] h-[46px] bg-blue-950 rounded-[10px] shadow flex items-center justify-center">
              <div className="text-white font-medium focus:outline-none">
                Continue Your Meal Plan
              </div>
            </button>
          </Link>
          )}
        </div>
      </div>
      <Footer className="mt-auto" />
    </section>
  );
};

export default mpDescription;
