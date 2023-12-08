// RecipeDetails.js

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const RecipeDetails = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#F9D548]">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="p-4 pl-20 bg-[#F9D548]">
     <h1 className="text-6xl font-extrabold text-blue-950">Homemade Fish & Chips</h1>
       </div>

       <div className="p-4 pl-20 bg-[#F9D548]  w-1/3">
        <img
          src="Fish&chips.jpg"  // Replace with the actual path to your image
          alt="Homemade Fish & Chips Image"
          className="w-full max-w-screen-xl mx-auto rounded-2xl shadow-2xl shadow-black"
        />
      </div>


      {/* Footer */}
      <Footer />
    </div>
  );
};

export default RecipeDetails;
