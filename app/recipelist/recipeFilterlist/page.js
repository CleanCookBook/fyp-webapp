// RecipeList.js
"use client";
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const FilteredRecipePage = () => {
  
  const userRole = 'user';
  const searchParams = useSearchParams();
  const recipesParam = searchParams.get('recipes'); // Use 'recipes' instead of 'Rname'
  const recipesObject = JSON.parse(recipesParam) || {};
  const resultsArray = recipesObject.result || [];
  const [selectedFilters, setSelectedFilters] = useState([]);

  console.log('resultsArray:', resultsArray);
     
  // Extract the tags from the URL
  //const recipesParam = searchParams.get('recipes');
  //const title = recipesParam ? `Filtered Recipes for Tags: ${recipesParam}` : 'All Recipes';

  // Extract the tags from the URL
  const filtersParam = searchParams.get('filters');
  const filtersArray = JSON.parse(filtersParam) || [];
  const filterTags = filtersArray.map(filter => `'${filter}'`).join(', ');

  const title = filtersParam ? `Filtered Recipes for Tags: { "result": ${JSON.stringify(resultsArray)} }` : 'All Recipes';
  const queryParams = filtersParam ? `Query parameters: [ ${filterTags} ]` : '';

  console.log('FilteredresultsArray:', queryParams);

  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 5; // Number of recipes per page

  const totalPages = Math.ceil(resultsArray.length / recipesPerPage);

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = resultsArray.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const [sortOrder, setSortOrder] = useState('asc');

  const changeSortOrder = (order) => {
    console.log('Previous sortOrder:', sortOrder);
    console.log('New sortOrder:', order);
    setSortOrder(order);
  };

  const sortedResultsArray = [...resultsArray].sort((a, b) =>
    sortOrder === 'asc' ? a.Rname.localeCompare(b.Rname) : b.Rname.localeCompare(a.Rname)
  );

  const displayedRecipes = sortedResultsArray.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const goToNextPage = () => {
    setCurrentPage((prevPage) => {
      const nextPage = prevPage + 1;
      console.log('Going to next page. New Page:', nextPage);
      return nextPage;
    });
  };
  
  const goToPrevPage = () => {
    setCurrentPage((prevPage) => {
      console.log('Going to previous page. New Page:', prevPage - 1);
      return Math.max(prevPage - 1, 1); // Ensure the page doesn't go below 1
    });
  };

  const toggleSortDropdown = () => {
    const sortDropdown = document.getElementById('sortDropdown');
    sortDropdown.classList.toggle('hidden');
  };

  return (
    <section className="flex flex-col h-screen bg-[#F9D548]">
      <Navbar userRole={userRole} />
      <div className="flex flex-col justify-start items-center h-full mt-10">
        <div className="flex items-center mb-4">
          <Link
            href="/home"
            className="flex justify-center items-center w-28 h-10 bg-blue-950 hover:bg-[#154083] text-white text-xl font-bold rounded-[10px] shadow self-start mt-[39px] -ml-[660px]"
          >
            &lt;&nbsp;&nbsp;Back
          </Link>
          <h1 className="text-7xl font-extrabold text-[#0A2A67] mb-2 mt-4 ml-[550px]">{title}</h1>
        </div>
        
        <div className="flex items-end justify-end">
          <div className="relative right-[30rem] top-[0.5rem]">
            <div className="filter-box">
              {Object.entries(selectedFilters).map(([filterType, filterValue], index) => (
                <div key={index} className="filter-tag">
                  {`${filterType}: ${filterValue}`} 
                  <button onClick={() => removeFilter(filterType)}>x</button>
                </div>
              ))}
            </div>
          </div>
          {resultsArray.length > 0 && (
            <div className="relative left-[30rem] -top-2">
              <button
                onClick={() => toggleSortDropdown()}
                className="flex justify-center items-end w-20 p-2 text-xl text-white font-bold hover:opacity-[0.5] rounded-[10px] bg-[#172554] shadow-md"
              >
                Sort
              </button>
              <div
                id="sortDropdown"
                className="absolute hidden bg-white mt-1 -ml-28 py-2 w-32 rounded-[10px] shadow-md right-0"
              >
                <button
                  onClick={() => changeSortOrder('asc')}
                  className="w-full px-4 py-2 font-bold text-left border-b hover:bg-gray-200"
                >
                  Ascending
                </button>
                <button
                  onClick={() => changeSortOrder('desc')}
                  className="w-full px-4 py-2 font-bold text-left hover:bg-gray-200"
                >
                  Descending
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="mt-2 w-[70%] max-w-[1114px]">
          {resultsArray.length === 0 ? (
            <div className="flex flex-col items-center -mt-[0px]">
              <img 
                src="/noRecipe.png" 
                alt="Error" 
                className="w-3/6 h-3/6 -mt-[24px]" 
              /> 
              <p className="text-center text-6xl font-extrabold text-[#0A2A67] -mt-28 py-4">No recipes found.</p>
            </div>
          ) : (
            displayedRecipes.map((recipe, index) => (
              <div key={index} className="flex items-center h-[60px] bg-white border-b-2 border-gray-300">
                <Link href={`/detailRecipe?recipeName=${encodeURIComponent(recipe.Rname)}`}>
                  <div className="flex items-center">
                    <p className="text-black text-xl font-medium ml-2">
                      {(currentPage - 1) * recipesPerPage + index + 1}.
                    </p>
                    <p className="ml-2 text-black text-xl font-medium">{recipe.Rname}</p>
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
        {resultsArray.length > 0 && (
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
        )}
      </div>
      <Footer />
    </section>
  );
};

export default FilteredRecipePage;
