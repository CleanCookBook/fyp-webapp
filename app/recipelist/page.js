"use client";
// RecipeList.js
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const RecipeList = () => {
  const searchParams = useSearchParams();
  const searchInput = searchParams.get('searchInput');
  const searchResults = JSON.parse(searchParams.get('searchResults'));

  // Ensure searchResults is an array
  const resultsArray = Array.isArray(searchResults) ? searchResults : [searchResults];

  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 5; // Number of recipes per page

  const totalPages = Math.ceil(resultsArray.length / recipesPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [resultsArray]);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = resultsArray.slice(indexOfFirstRecipe, indexOfLastRecipe);

  return (
    <section className="flex flex-col h-screen bg-[#F9D548]">
      <Navbar />
      <div className="flex flex-col justify-start items-center">
        <h1 className="pr-[60rem] pt-10 text-7xl text-[#0A2A67] font-black">
          {searchInput}
        </h1>
        <div className="mt-8 bg-white w-[70%] max-w-[1114px]">
          {currentRecipes.map((recipe, index) => (
            <div
              key={index}
              className="flex items-center h-[60px] border-b-2 border-gray-300"
            >
               <Link href={`/detailRecipe/${encodeURIComponent(recipe.Rname.replace(/\s/g, '-'))}`}>
                <p className="ml-2 text-black text-xl font-medium">{recipe.Rname}</p>
              </Link>
            </div>
          ))}
        </div>
        <div className="flex items-center mt-4">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className="mr-2 p-2 text-gray-800 font-bold hover:opacity-[0.5]"
          >
            {"<"}
          </button>
          <p className="text-l font-semibold text-gray-700">
            Page {currentPage} of {totalPages}
          </p>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="ml-2 p-2 text-gray-800 font-bold hover:opacity-[0.5]"
          >
            {">"}
          </button>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default RecipeList;

