// RecipeList.js
"use client";
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const FilteredRecipePage = () => {
  
  const userRole = 'user';
  const searchParams = useSearchParams();
  const recipesParam = searchParams.get('recipes');
  const recipesObject = JSON.parse(recipesParam) || {};
  const resultsArray = recipesObject.result || [];
  const [selectedFilters, setSelectedFilters] = useState([]);

  console.log('resultsArray:', resultsArray);
  const [loading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const router = useRouter();
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
            setIsLoading(false);
          }
        };
    
        checkAuthentication();
      }, [router]);
     
  const filtersParam = searchParams.get('filters');
  const filtersArray = JSON.parse(filtersParam) || [];
  const filtersObject = JSON.parse(filtersParam) || {};
  const {
    dietaryPreferences = [],
    allergies = [],
    cookingTime = '',
    calories = ''
  } = filtersObject;

  const filterTags = [
    ...dietaryPreferences.map(pref => `${pref}`),
    ...allergies.map(allergy => `${allergy}`),
    cookingTime && `${cookingTime}`,
    calories && `${calories}`
  ].filter(Boolean).join(', ');

  // Calculate the count of recipes containing each filter
  const countByFilter = {};

  // Iterate through dietaryPreferences and initialize counts
  dietaryPreferences.forEach(pref => {
    countByFilter[pref] = 0;
  });

  // Iterate through allergies and initialize counts
  allergies.forEach(allergy => {
    countByFilter[allergy] = 0;
  });

  // Iterate through recipe results to count occurrences of each filter
  resultsArray.forEach(recipe => {
    dietaryPreferences.forEach(pref => {
      if (recipe.Rname.includes(pref)) {
        countByFilter[pref]++;
      }
    });
    allergies.forEach(allergy => {
      if (recipe.Rname.includes(allergy)) {
        countByFilter[allergy]++;
      }
    });
    // Add similar checks for other filters like cookingTime and calories
  });

  const queryParams = filterTags ? `${filterTags}` : '';

  // console.log('FilteredresultsArray:', queryParams);

  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 5;

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
      return Math.max(prevPage - 1, 1);
    });
  };

  const toggleSortDropdown = () => {
    const sortDropdown = document.getElementById('sortDropdown');
    sortDropdown.classList.toggle('hidden');
  };

  useEffect(() => {
    if (filtersArray.length > 0) {
      setSelectedFilters(filtersArray);
    }
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
    <section className="flex flex-col h-screen bg-[#F9D548]">
      <Navbar userRole={userRole} />
      <div className="flex flex-col justify-start items-center h-full mt-10">
        <div className="flex items-center mb-4">
          <Link
            href="/home"
            className="flex justify-center items-center w-28 h-10 bg-blue-950 hover:bg-[#154083] text-white text-xl font-bold rounded-[10px] shadow self-start mt-[39px] -ml-[600px]"
          >
            &lt;&nbsp;&nbsp;Back
          </Link>
          {displayedRecipes.length > 0 && (
            <h1 className="flex justify-center items-center text-7xl text-[#0A2A67] font-black ml-[28rem]">All Recipes</h1>
          )}
        </div>
        
        <div className="flex items-end justify-end mt-6">
          <div className="-top-2 w-[596px] h-11 flex flex-row space-x-4 relative right-[14rem]">
            {/* Dietary Preferences */}
            {dietaryPreferences.map((preference, index) => (
              <div key={index} className="flex items-start justify-start flex-1">
                <div className="flex items-center w-full h-full">
                  <button className="ml-2 text-xl text-white font-bold rounded-[10px] bg-[#172554] shadow-md w-full h-full flex items-center justify-center">
                    {preference}
                  </button>
                </div>
              </div>
            ))}

            {/* Allergies */}
            {allergies.map((allergy, index) => (
              <div key={index} className="flex items-center flex-1">
                <div className="flex items-center w-full h-full">
                  <p className="ml-2 text-xl text-white font-bold rounded-[10px] bg-[#172554] shadow-md w-full h-full flex items-center justify-center">
                    {allergy}
                  </p>
                </div>
              </div>
            ))}

            {/* Cooking Time */}
            {cookingTime && (
              <div className="flex items-center flex-1">
                <div className="flex items-center w-full h-full">
                  <p className="ml-2 text-xl text-white font-bold rounded-[10px] bg-[#172554] shadow-md w-full h-full flex items-center justify-center">
                    {cookingTime} minutes
                  </p>
                </div>
              </div>
            )}

            {/* Calories */}
            {calories && (
              <div className="flex items-center flex-1">
                <div className="flex items-center w-full h-full">
                  <p className="ml-2 text-xl text-white font-bold rounded-[10px] bg-[#172554] shadow-md w-full h-full flex items-center justify-center">
                    {calories} kcal
                  </p>
                </div>
              </div>
            )}
          </div>

          {resultsArray.length > 0 && (
            <div className="relative left-[14rem] -top-2">
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
        <div className="mt-4 w-[70%] max-w-[1114px]">
          {resultsArray.length === 0 ? (
            <div className="flex flex-col items-center -mt-[0px]">
              <img 
                src="/noRecipe.png" 
                alt="Error" 
                className="w-3/6 h-3/6 -mt-[80px]" 
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
                    <p className="ml-2 text-gray-500 text-lg">by {recipe.FName} {recipe.LName}</p>
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
