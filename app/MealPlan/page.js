"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";


const BPMealPlan = () => {
    const userRole="nutritionist";
    const [mealPlans, setMealPlans] = useState([]);


  const [currentPage, setCurrentPage] = useState(1);
  const [mealPlansPerPage] = useState(5);

  useEffect(() => {
    const fetchMealPlans = async () => {
      try {
        // Make a request to your backend API to fetch meal plans based on the logged-in user
        const response = await fetch("http://localhost:3001/api/mealPlan/name", {
          method: "GET",
          credentials: "include", // Include credentials if using cookies for authentication
        });

        if (response.ok) {
          const data = await response.json();
          setMealPlans(data.mealPlans);
        } else {
          console.error("Error fetching meal plans:", response.statusText);
          // Handle error appropriately
        }
      } catch (error) {
        console.error("Error fetching meal plans:", error.message);
        // Handle error appropriately
      }
    };

    fetchMealPlans();
  }, []); // Dependency 

  const indexOfLastMealPlan = currentPage * mealPlansPerPage;
  const indexOfFirstMealPlan = indexOfLastMealPlan - mealPlansPerPage;
  const currentMealPlans = mealPlans.slice(
    indexOfFirstMealPlan,
    indexOfLastMealPlan
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(mealPlans.length / mealPlansPerPage);

  return (
    <div className="flex flex-col h-screen bg-[#F9D548]">
        <Navbar userRole={userRole} className="fixed top-0 left-0 right-0" />
      <div className="container mx-auto p-4 flex-1">
        <h1 className="text-5xl font-bold text-[#0A2A67] mb-4">
          Your Meal Plans
        </h1>
        <div className="bg-white rounded-lg p-4">
        {currentMealPlans.map((singleMealPlan,index) => (
            <a
              key={index}
              href="#"
              onClick={() => handelMealPlansClick(singleMealPlan.ID)}
              className="block cursor-pointer"
            >
              <p>{singleMealPlan.MPName}</p>
              <hr className="my-4" />
            </a>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          {/* Pagination */}
          <button
            onClick={() => paginate(1)}
            className="mx-1 px-3 py-1 rounded hover:bg-gray-200"
          >
            &lt;
          </button>
          <button
            className="mx-1 px-3 py-1  rounded hover:bg-gray-200"
            disabled
          >
            {currentPage}
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => paginate(currentPage + 1)}
            className="mx-1 px-3 py-1  rounded hover:bg-gray-200"
          >
            &gt;
          </button>
        </div>
        <div className="flex flex-col items-center justify-center mt-4 font-semibold text-[#0A2A67] text-xl">
          <p>Or</p>
          <p>
            Create a
            <a href="/MealPlan/createMP" className="ml-2 underline">
              Meal Plan
            </a>
          </p>
        </div>
      </div>
      <Footer className="fixed bottom-0 left-0 right-0" />
    </div>
  );
};

export default BPMealPlan;