"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";


const BPMealPlan = () => {
    const userRole="Bp";
  const [mealPlans, setMealPlans] = useState([
    { id: 1, title: "Meal Plan 1" },
    { id: 2, title: "Meal Plan  2" },
    { id: 3, title: "Meal Plan  3" },
    { id: 4, title: "Meal Plan  4" },
    { id: 5, title: "Meal Plan  5" },
    { id: 6, title: "Meal Plan  6" },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [mealPlansPerPage] = useState(5);

  useEffect(() => {
    // Fetch announcements from API or database
    // Update the announcements state with the fetched data
    // Example: fetchData()
  }, []);

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
          {currentMealPlans.map((mealPlans) => (
            <a
              key={mealPlans.id}
              href="#"
              onClick={() => handelMealPlansClick(mealPlans.id)}
              className="block cursor-pointer"
            >
              <p>{mealPlans.title}</p>
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
