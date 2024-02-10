// Import necessary modules and components
"use client";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";


// Define the functional component
const mpfirst = () => {
  const userRole = "user";
  const [mealPlans, setMealPlans] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState('');
  const router = useRouter();
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
      setLoading(false);
    } catch (error) {
      console.error("Error fetching meal plans:", error);
      setLoading(false);
    }
  };

  // useEffect to fetch meal plans when the component mounts
  useEffect(() => {
    fetchMealPlans();
  }, []);

    // Update paymentStatus state based on router query parameters
    useEffect(() => {
      // Check if router is defined and router.query is not undefined
      if (router && router.query && router.query.paymentStatus) {
        const { paymentStatus } = router.query;
        setPaymentStatus(paymentStatus);
        console.log("router.query.paymentStatus:", router.query.paymentStatus);
      }
      // Inside useEffect for updating paymentStatus
      
      console.log("paymentStatus:", paymentStatus);
    }, [router]);

    useEffect(() => {
      // Function to fetch payment status
      const fetchPaymentStatus = async () => {
        try {
          // Fetch payment status from the server
          const response = await fetch("http://localhost:3001/api/payment/status", {
            method: "GET",
            credentials: "include", // Include credentials to send cookies with the request
          });
  
          const data = await response.json();
          setPaymentStatus(data.status);
          console.log("Payment Status:", data.status);
        } catch (error) {
          console.error("Error fetching payment status:", error.message);
        }
      };
  
      // Call the function to fetch payment status
      fetchPaymentStatus();
    }, []);

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
    <div className="flex flex-col min-h-screen bg-[#F9D548] text-[#0A2A67]">
      <Navbar userRole={userRole} />
      <div className="flex flex-col justify-center items-center mt-20 mb-20">
        <div className="relative">  
          {paymentStatus !== "paid" && (
            <div className="absolute inset-0 -top-38 flex items-center justify-center z-10">
              <div className="bg-[#00509D] rounded-[20px] p-8 w-[400px]">
                <img
                  src="/unlock.png"  // Replace with the correct path to your GIF file
                  alt="Unlock"
                  className="mx-auto"
                />
                <p className="text-[#FFFFFF] font-bold text-lg flex justify-center items-center -mt-4">
                  Upgrade to Unlock : <br />
                  &#10003; View unlimited recipes. <br />
                  &#10003; Access to various meal plans. <br />
                  &#10003; Chat with professional nutritionists.
                </p>
                <Link href="/Payment">
                  <button className="block mx-auto bg-white hover:bg-grey-700 text-blue-950 font-bold py-2 px-4 rounded mt-4">
                    Upgrade
                  </button>  
                </Link>
              </div>
            </div>
          )}

          <div>
            <div className={`grid grid-cols-3 gap-20 place-items-center ${paymentStatus !== "paid" ? 'blur' : ''}`}>
              {mealPlans.map((mealPlan) => (
                <Link
                  key={mealPlan.MPName}
                  href={`/mpfirst/mpDescription/?MealPlanName=${encodeURIComponent(mealPlan.MPName)}`}
                >
                  <div className="relative hover:brightness-75 transition-all">
                    {/* Add meal plan image */}
                    <Image
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
