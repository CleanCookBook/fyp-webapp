"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
const userRole = "user";

const Payment = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-[#F9D548] to-[#F1AB86] text-[#0A2A67]">
       <Navbar userRole={userRole}  className="fixed top-0 left-0 right-0" />
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
            <div className="flex justify-center">
              {/* Your button placed below the premium user section */}
              <button className="bg-[#0A2A67] hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-xl">
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer className="mt-auto" />
    </div>
  );
};

export default Payment;
