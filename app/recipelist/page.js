// RecipeList.js
"use client";
import Footer from '@/components/Footer';
import LoadingSpinner from '@/components/LoadingSpinner';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

const RecipeList = () => {
  const searchParams = useSearchParams();
  const userRole = 'user'; 
  const searchInput = searchParams.get('searchInput');
  const searchResults = JSON.parse(searchParams.get('searchResults'));

  // Ensure searchResults is an array
  const resultsArray = Array.isArray(searchResults) ? searchResults : [searchResults];

  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 5; // Number of recipes per page

  const totalPages = Math.ceil(resultsArray.length / recipesPerPage);

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = resultsArray.slice(indexOfFirstRecipe, indexOfLastRecipe);
  

  const [sortOrder, setSortOrder] = useState('asc');
  const [loading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const router = useRouter();
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
    <Suspense fallback={<LoadingSpinner />}>
    <section className="flex flex-col h-screen bg-[#F9D548]">
       <Navbar userRole={userRole} />
      <div className="flex flex-col justify-start items-center h-full mt-20">
        <h1 className="pt-10 text-7xl text-[#0A2A67] font-black max-w-[58.5%] w-full">
          {searchInput}
        </h1>
        <div className="flex items-end -mt-14 justify-end">
          <div className="relative left-[32.3rem] top-[0.5rem]">
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
        </div>
        <div className="mt-8 bg-white w-[70%] max-w-[1114px]">
          {displayedRecipes.map((recipe, index) => (
            <div key={index} className="flex items-center h-[60px] border-b-2 border-gray-300">
              <Link href={`/detailRecipe?recipeName=${encodeURIComponent(recipe.Rname)}`}>
                <div className="flex items-center">
                  <p className="text-black text-xl font-medium ml-2">
                    {(currentPage - 1) * recipesPerPage + index + 1}.
                  </p>
                  {/* Render the image */}
                  <p className="ml-2 text-black text-xl font-medium">{recipe.Rname}</p>
                  <p className="ml-2 text-gray-500 text-lg">by {recipe.createdBy}</p>
                </div>
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
    </Suspense>
  );
};

export default RecipeList;