"use client";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LCProgress = () => {
  const [userRole, setUserRole] = useState("user"); 
  const [mealPlanRecipes, setMealPlanRecipes] = useState(null);
  const searchParams = useSearchParams();
  const mealPlanName = searchParams.get("MealPlan");
  const [checkedDays, setCheckedDays] = useState([]);
  const [movePin, setMovePin] = useState(false); // State to track checkbox state
  const [notification, setNotification] = useState(null);
  const [gifPaths, setGifPaths] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isNutritionist = userRole === "nutritionist";

  
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
    const fetchUserType = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/user/userType",
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
    const fetchMealPlanRecipes = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/mealPlan/${encodeURIComponent(mealPlanName)}/recipes`);
        const data = await response.json();

        if (response.ok) {
          console.log('Fetched meal plan recipes:', data);

          // Organize recipes into separate arrays
          const recipes = {
            Recipe1: data.recipes.Recipe1 || [],
            Recipe2: data.recipes.Recipe2 || [],
            Recipe3: data.recipes.Recipe3 || [],
          };

          console.log('Organized recipes:', recipes);
          setMealPlanRecipes(recipes);
        } else {
          console.error('Error fetching meal plan recipes:', data.error);
        }
      } catch (error) {
        console.error('Error fetching meal plan recipes:', error.message);
      }
    };

    fetchMealPlanRecipes();
  }, [mealPlanName]);

  useEffect(() => {
    // Initialize the GIF paths array
    const paths = [
      "/Eggs.gif",
      "/Spoons.gif",
      "/finished.gif",
      "/bowl.gif",
      "/apples.gif",
      "/pea.gif",
      "/orange.gif"
    ];
    setGifPaths(paths);
  }, []);

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    const fetchInitialCheckedDays = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/mealPlan/getMealPlanTrack/${encodeURIComponent(mealPlanName)}`, {
          method: 'GET',
          credentials: 'include',
        });
  
        if (response.ok) {
          const data = await response.json();
          const initialCheckedDays = days.reduce((acc, day, index) => {
            // Check if the data exists and has a valid value
            if (data && Object.prototype.hasOwnProperty.call(data, day)) {
              switch (data[day]) {
                case 'checked':
                  acc.push(index);
                  break;
                case 'unchecked':
                  // Do nothing for 'unchecked'
                  break;
                case null:

                  break;
                default:
                  acc.push(index);
              }
            } else {
              acc.push(index);
            }
            return acc;
          }, []);
  
          setCheckedDays(initialCheckedDays.length > 0 ? initialCheckedDays : []);
        } else {
          console.error('Error fetching initial checked days:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching initial checked days:', error.message);
      }
    };
  
    fetchInitialCheckedDays();
  }, []);
  
  // Function to handle checkbox state change
  const handleCheckboxChange = async (dayIndex) => {
    try {
      setCheckedDays((prevCheckedDays) => {
        // Toggle the checked state for the clicked day
        const updatedDays = prevCheckedDays.includes(dayIndex)
          ? prevCheckedDays.filter((index) => index !== dayIndex)
          : [...prevCheckedDays, dayIndex];
  
        // Show a notification with a custom message based on the day
        switch (dayIndex) {
          case 0:
            setNotification('Start your week with healthy food choices!');
            break;
          case 1:
            setNotification('Nourish your body with nutritious ingredients!');
            break;
          case 2:
            setNotification('Stay committed to your health and wellness!');
            break;
          case 3:
            setNotification('Every healthy choice brings you closer to success!');
            break;
          case 4:
            setNotification('Fuel your body for energy and vitality!');
            break;
          case 5:
            setNotification('Embrace the benefits of mindful eating!');
            break;
          case 6:
            setNotification('Celebrate your progress and healthy habits!');
            break;
          default:
            setNotification('Good progress!');
            break;
        }
  
        // Update the meal plan tracking in the database
        fetch('http://localhost:3001/api/mealPlan/updateMealPlanTrack', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            dayOfWeek: days[dayIndex],
            updatedInfo: updatedDays.includes(dayIndex) ? 'checked' : 'unchecked',
          }),
        })
          .then((response) => {
            if (!response.ok) {
              console.error('Error updating meal plan track:', response.statusText);
              toast.error('Failed to update meal plan track. Please try again.');
            }
          })
          .catch((error) => {
            console.error('Error handling checkbox change:', error.message);
          });
  
        return updatedDays;
      });
  
      // Fetch the updated data after updating the meal plan tracking
      const response = await fetch('http://localhost:3001/api/mealPlan/updateMealPlanTrack', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dayOfWeek: days[dayIndex],
          updatedInfo: updatedDays.includes(dayIndex) ? 'checked' : 'unchecked',
        }),
      });
  
      if (!response.ok) {
        console.error('Error updating meal plan track:', response.statusText);
        toast.error('Failed to update meal plan track. Please try again.');
      } else {
        // Update the state of checkedDays based on the backend response
        const responseData = await response.json();
        const updatedCheckedDays = days.reduce((acc, day, index) => {
          if (responseData[day] === 'checked') {
            acc.push(index);
          }
          return acc;
        }, []);
        setCheckedDays(updatedCheckedDays);
      }
    } catch (error) {
      console.error('Error handling checkbox change:', error.message);
    }
  };
    
  // Function to calculate the transformation for the pin image
  const calculatePinTransformation = () => {
    // Calculate the total movement based on the number of checked days
    const totalMovement = checkedDays.length * 4; // Assuming each day moves the pin by 4cm
    
    // Apply the total movement as translation along the x-axis
    return `translateX(${totalMovement}cm)`;
  };

  const handleRecipeClick = (recipeName) => {
    // Handle click for the recipe, e.g., redirect to the recipe page
    console.log(`Clicked recipe: ${recipeName}`);
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

return(
  <section className="flex flex-col h-screen bg-[#F9D548]">
    <Navbar userRole={userRole} />
      <div className="flex-grow w-[1108px] mx-auto mt-8">

        {checkedDays.length === 7 && (
          <div className="flex justify-end absolute right-4 top">
            <button
              onClick={async () => {
                try {
                  const response = await fetch(`http://localhost:3001/api/registration/delete/${encodeURIComponent(mealPlanName)}`, {
                    method: 'POST',
                    credentials: 'include',
                  });

                  if (response.ok) {
                    console.log('Meal plan data deleted successfully!');
                    router.push("/mpfirst");
                    // You can optionally redirect the user to another page or show a success message
                  } else {
                    console.error('Error deleting meal plan data:', response.statusText);
                    // Handle the error, show an error message, or redirect the user accordingly
                  }
                } catch (error) {
                  console.error('Error deleting meal plan data:', error.message);
                  // Handle the error, show an error message, or redirect the user accordingly
                }
              }}
              className="bg-blue-950 text-white px-4 py-2 rounded-lg"
            >
              End
            </button>
          </div>
        )}
        
        <div className="grid grid-cols-7 gap-4 text-center">
          {days.map((day, dayIndex) => (
            <div key={dayIndex} className="bg-blue-950 rounded-lg p-10 text-white flex flex-col items-center">
              <h2 className="text-lg font-semibold mb-2 relative">
                {!isNutritionist && (
                  <input
                    type="checkbox"
                    id={`day-${dayIndex}`}
                    onChange={() => handleCheckboxChange(dayIndex)}
                    checked={checkedDays.includes(dayIndex)} // Set the checked attribute based on state
                  />
                )}
                <label htmlFor={`day-${dayIndex}`}>
                  {day} 
                </label>
                <div className="w-full h-0.5 bg-white absolute bottom-0 left-0"></div>
              </h2>
              <div className="flex flex-col">
                {mealPlanRecipes && (
                  <>
                    <button
                      onClick={() => {
                        router.push(`/detailRecipe?recipeName=${encodeURIComponent(mealPlanRecipes.Recipe1[dayIndex])}`);
                        handleRecipeClick(mealPlanRecipes.Recipe1[dayIndex] || 'No recipes available');
                      }}
                      className="mb-2"
                    >
                      {mealPlanRecipes.Recipe1[dayIndex] || 'No recipes available'}
                    </button>
                    <button
                      onClick={() => {
                        router.push(`/detailRecipe?recipeName=${encodeURIComponent(mealPlanRecipes.Recipe2[dayIndex])}`);
                        handleRecipeClick(mealPlanRecipes.Recipe2[dayIndex] || 'No recipes available');
                      }}
                      className="mb-2"
                    >
                      {mealPlanRecipes.Recipe2[dayIndex] || 'No recipes available'}
                    </button>
                    <button
                      onClick={() => {
                        router.push(`/detailRecipe?recipeName=${encodeURIComponent(mealPlanRecipes.Recipe3[dayIndex])}`);
                        handleRecipeClick(mealPlanRecipes.Recipe3[dayIndex] || 'No recipes available');
                      }}
                    >
                      {mealPlanRecipes.Recipe3[dayIndex] || 'No recipes available'}
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {!isNutritionist && (
          <> 
            <div className="text-blue-950 font-medium text-start mt-8">
              <p>Check Your Progress!</p>
            </div>

            <div className="relative mt-[4rem]">
              <div
                className="w-full h-1 bg-blue-950 rounded-lg overflow-hidden relative"
              ></div>
              <Image
                src="/pin.png"
                alt="Pin"
                className="absolute top-0 -mt-12 left-0"
                height={50}
                width={50} // Set the width to a numeric value in pixels
                style={{
                  transform: calculatePinTransformation(),
                }}
              />
            </div>
          
            {notification && (
              <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
                <div className="bg-blue-900 text-white font-bold h-auto w-auto p-4 rounded-[20px] flex flex-col items-center">
                  <p className="mt-6 text-lg">{notification}</p>
                  {/* Include the GIF based on the day index */}
                  <Image
                    src={gifPaths[checkedDays.length - 1]}
                    alt="GIF"
                    className="-mt-2"
                    style={{ width: '200px', height: 'auto' }} // Adjust the width and height as needed
                  />
                  <button onClick={() => setNotification(null)} className="mt-4 bg-white hover:bg-grey-700 text-blue-950 font-bold py-2 px-4 rounded">
                    OK
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    <Footer />
  </section>
);
};

export default LCProgress;
