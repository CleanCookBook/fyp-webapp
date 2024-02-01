"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import { FaTimes } from 'react-icons/fa';

const Payment = () => {
  const userRole = "user";
  const [paymentStatus, setPaymentStatus] = useState("free");
  const [showNotification, setShowNotification] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleUpdateClick = async () => {
    try {
      // Show confirmation
      setShowConfirmation(true);
  
      // Set timeout to hide confirmation after 5 seconds
      setTimeout(async () => {
        setShowConfirmation(false);
  
        // Check if the user confirmed the upgrade
        if (paymentStatus === "premium") {
          // Send a POST request to backend to update payment status
          const response = await fetch('http://localhost:3001/api/payment/updatePaidStatus', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              status: 'paid',
            }), // Pass the userId here
            credentials: "include",
          });
  
          if (!response.ok) {
            throw new Error('Failed to update payment status');
          }
  
          // Set timeout to hide notification after 5 days
          setTimeout(() => {
            setShowNotification(false);
  
            // Downgrade account if payment not made within 5 days
            setPaymentStatus("free");
          }, 5 * 24 * 60 * 60 * 1000); // 5 days in milliseconds
        }
      }, 5000); // 5 seconds in milliseconds
    } catch (error) {
      console.error('Error updating payment status:', error.message);
      // Handle error
    }
  };
  

  const handleNotificationDismiss = () => {
    setShowNotification(false);
  };

  const handleConfirmationDismiss = () => {
    setShowConfirmation(false);
    // Reset payment status to the previous state (free in this case)
    setPaymentStatus("unpaid");
  };
  

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
              <button
                onClick={handleUpdateClick}
                className="bg-[#0A2A67] hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-xl"
              >
                Upgrade Now
              </button>
            </div>
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

        {showConfirmation && (
          <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <div className="bg-white p-6 rounded-md shadow-lg text-center">
              <p>Are you sure you want to upgrade?</p>
              <div className="flex justify-center mt-4">
                <button
                  onClick={handleUpdateClick}
                  className="bg-[#0A2A67] hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-xl mr-2"
                >
                  Yes
                </button>
                <button
                  onClick={handleConfirmationDismiss}
                  className="text-blue-500 font-semibold py-2 px-4 rounded-xl focus:outline-none"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      <Footer className="mt-auto" />
    </div>
  );
};

export default Payment;
