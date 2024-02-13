"use client";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

const mpDescription = () => {
  const [userRole, setUserRole] = useState("user");
  const router = useRouter();
  const [mealPlanDetails, setMealPlanDetails] = useState(null);
  const searchParams = useSearchParams();
  const mealPlanName = searchParams.get("MealPlanName");
  const [mealPlanStatus, setMealPlanStatus] = useState("start");

  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isNutritionist = userRole === "nutritionist";

  
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch("https://ccb-backendd.onrender.com/api/check-auth", {
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
    const fetchUserType = async () => {
      try {
        const response = await fetch(
          "https://ccb-backendd.onrender.com/api/user/userType",
          {
            method: "POST",
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUserRole(data.userType || "user"); // Set the userRole based on the response
        } else {
          console.error("Error fetching user type:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user type:", error.message);
      }
    };

    // Fetch user type when the component mounts
    fetchUserType();
  }, []);

  useEffect(() => {
    const fetchMealPlanDetails = async () => {
      try {
        if (mealPlanName) {
          const response = await fetch(
            `https://ccb-backendd.onrender.com/api/mealPlan/${mealPlanName}`
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
        `https://ccb-backendd.onrender.com/api/mealPlan/TrackStatus/${encodeURIComponent(
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
  
        if (data.status === "warning" && data.ongoingMealPlan) {
          // Handle the warning status with information about the ongoing meal plan
          // You may show a warning message to the user and prevent them from starting a new meal plan
          // Example: alert("Warning: You have an ongoing meal plan. Cannot start a new one.");
        } else {
          // Handle other statuses ("start" or "continue")
          setMealPlanStatus(data.status);
        }
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
      const response = await fetch("https://ccb-backendd.onrender.com/api/registration", {
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
  <Suspense fallback={<LoadingSpinner />}>
  <section className="flex flex-col h-screen bg-[#F9D548]">
    <Navbar userRole={userRole} />
      <div className="flex-grow w-[1208px] mx-auto mt-8">
        {/* Link to navigate back */}
        <Link href="/mpfirst">
          <button
            onClick={handleStartMealPlan}
            className="w-28 h-10 bg-blue-950 hover:bg-[#154083] text-white text-xl font-bold rounded-[10px] shadow mr-4"
          >
            &lt; Back
          </button>
        </Link>

        <h1 className="text-blue-950 text-5xl font-black text-left mt-8 pl-8 -ml-8">
          {mealPlanName}
        </h1>

        <div className="text-blue-950 text-lg text-center font-medium mt-4">
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
          {/* Render "Start" and "Continue" buttons only for users */}
          {/* Render buttons based on meal plan status */}
          {!isNutritionist && (
            <>
              {mealPlanStatus === "start" && (
                <button
                  onClick={handleStartMealPlan}
                  className="w-[234px] h-[46px] bg-blue-950 rounded-[10px] shadow flex items-center justify-center"
                >
                  <div className="text-white font-medium focus:outline-none">
                    Start Your Meal Plan Now
                  </div>
                </button>
              )}

              {mealPlanStatus === "cannot_start" && (
                <button
                  onClick={() => {
                    // Handle warning action, e.g., show a modal or alert
                    alert("Warning: Another meal plan is ongoing. You cannot start a new one.");
                  }}
                  className="w-[234px] h-[46px] bg-blue-950 rounded-[10px] shadow flex items-center justify-center"
                >
                  <div className="text-white font-medium focus:outline-none">
                    Start Your Meal Plan Now
                  </div>
                </button>
              )}

              {mealPlanStatus === "continue" && (
                <Link href={`/mpfirst/LCProgress/?MealPlan=${encodeURIComponent(mealPlanName)}`}>
                  <button className="w-[234px] h-[46px] bg-blue-950 rounded-[10px] shadow flex items-center justify-center">
                    <div className="text-white font-medium focus:outline-none">
                      Continue Your Meal Plan
                    </div>
                  </button>
                </Link>
              )}
            </>
          )}

          {isNutritionist && (
            <Link href={`/mpfirst/LCProgress/?MealPlan=${encodeURIComponent(mealPlanName)}`}>
              <button className="w-[234px] h-[46px] bg-blue-950 rounded-[10px] shadow flex items-center justify-center">
                <div className="text-white font-medium focus:outline-none">
                  Next
                </div>
              </button>
            </Link>
          )}
        </div>
      </div>
    <Footer className="mt-auto" />
  </section>
  </Suspense>
);
};

export default mpDescription;
