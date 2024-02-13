"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaTimes } from 'react-icons/fa';

const Payment = () => {
  const userRole = "user";
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("unpaid");
  const [showNotification, setShowNotification] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setIsLoading] = useState(true);
  const router = useRouter();
  const [upgradeStatus, setUpgradeStatus] = useState("notInitiated");
  const [isUpgraded, setIsUpgraded] = useState(false);

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
        setIsLoading(false);
      }
    };

    checkAuthentication();
  }, [router]);

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        const response = await fetch("https://ccb-backendd.onrender.com/api/payment/status", {
          method: "GET",
          credentials: "include",
        });
  
        if (response.ok) {
          const { status } = await response.json();
          setIsUpgraded(status === "paid");
  
          // Only show notification if user has upgraded
          if (status === "paid") {
            setShowNotification(true);
          }
        } else {
          // Handle error when fetching payment status
          console.error('Failed to fetch payment status');
        }
      } catch (error) {
        console.error('Error during payment status fetch:', error.message);
      }
    };
  
    fetchPaymentStatus();
  }, []);
  

  useEffect(() => {
    const storedUpgradeTimestamp = localStorage.getItem('upgradeTimestamp');
    
    if (storedUpgradeTimestamp) {
      const upgradeTimestamp = parseInt(storedUpgradeTimestamp, 10);
      const currentTimestamp = Date.now();

      if (currentTimestamp - upgradeTimestamp < 5 * 24 * 60 * 60 * 1000) {
        // If within the 5-day window, show the notification
        setShowNotification(true);
      } else {
        // If the 5-day period has passed, reset upgrade status
        setUpgradeStatus("notInitiated");
      }
    }
  }, []);

  const handleUpdateClick = async () => {
    try {
      if (upgradeStatus === "notInitiated") {
        // Show confirmation
        setShowConfirmation(true);

        // Wait for user input in the confirmation box
        const userResponse = await new Promise((resolve) => {
          const handleUserResponse = (response) => {
            resolve(response);
          };
          window.confirm("Are you sure you want to upgrade?") ? handleUserResponse("yes") : handleUserResponse("no");
        });

        if (userResponse === "yes") {
          // Set upgrade status to indicate initiation
          setUpgradeStatus("initiated");

          // Store the upgrade timestamp in local storage
          localStorage.setItem('upgradeTimestamp', Date.now().toString());

          setPaymentStatus("premium");

          // Send a POST request to backend to update payment status
          const response = await fetch('https://ccb-backendd.onrender.com/api/payment/updatePaidStatus', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              status: 'paid',
            }),
            credentials: "include",
        });

        if (!response.ok) {
          throw new Error('Failed to update payment status');
        }

        console.log('User clicked "Yes" to upgrade.');
        setShowNotification(true);

        // Set timeout to show notification after 5 days
        setTimeout(() => {
          setShowNotification(false);
          // Downgrade account if payment not made within 5 days
          setPaymentStatus("unpaid");
          // Reset upgrade status
          setUpgradeStatus("notInitiated");
          // Remove stored timestamp
          localStorage.removeItem('upgradeTimestamp');
        }, 5 * 24 * 60 * 60 * 1000); // 5 days in milliseconds
      } else {
        // User clicked "No"
        setShowConfirmation(false); // Hide the confirmation box
      }
    } else {
      // If upgrade status is already initiated, show a message
      alert("Upgrade process already initiated. Please contact cleancookbook@gmail.com for assistance.");
    }
  } catch (error) {
    console.error('Error updating payment status:', error.message);
    // Handle error
  }
};

  const handleNotificationDismiss = () => {
    setShowNotification(false);
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
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-[#F9D548] to-[#F1AB86] text-[#0A2A67]">
      <Navbar userRole={userRole} className="fixed top-0 left-0 right-0" />
      <div className="flex-1 container mx-auto p-4 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2">
          <h2 className="text-7xl font-bold mb-2 lg:mb-0 text-left">
            Unlock <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
              Limitless Possibilities
            </span>
            , <br />
            Elevate Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-900">
              Nutrition Experience
            </span>
          </h2>
        </div>
        <div className="lg:w-1/2">
          <div className="payment-box flex flex-col mb-4 lg:mb-0">
            <div className="bg-gradient-to-r from-blue-400 to-opacity-0 rounded-2xl p-6  mb-4">
              <h3 className="text-2xl font-bold mb-2 text-white">
                Free Users:
              </h3>
              <p className="text-white">- View up to 5 recipes a day.</p>
            </div>
            <div className="bg-gradient-to-r from-blue-400 to-opacity-0 rounded-2xl p-6  mb-4">
              <h3 className="text-2xl font-bold mb-2 text-white">
                Premium Users:
              </h3>
              <p className="text-white">
                - View unlimited recipes. <br />
                - Access to various meal plans. <br />- Chat with professional
                nutritionists.
              </p>
            </div>
          </div>
          <div className="flex justify-center">
        {isUpgraded ? (
          <p className="text-green-600 font-bold">Upgraded</p>
        ) : (
          <button
            onClick={handleUpdateClick}
            className="bg-[#0A2A67] hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-xl"
          >
            Upgrade Now
          </button>
        )}
      </div>
        </div>
      
        {showNotification && (
          <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <div className="bg-white p-6 rounded-md shadow-lg text-center relative">
              <header className="text-xl font-semibold mb-6 -mt-4 py-4" style={{ borderBottom: "2px solid #000" }}>Please Note</header>
              <div className="py-4 -mt-4">
                <p className="text-medium">
                  You have 5 days to make the payment. 
                  <br />Failure to do so will downgrade your account to the free tier.
                </p>
              </div>
              <button
                onClick={handleNotificationDismiss}
                className="absolute top-6 right-7 text-red-500 font-semibold focus:outline-none"
                style={{ fontSize: "1.2rem" }} // Adjust the font size as needed
              >
                <FaTimes /> {/* Using FaTimes icon */}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
