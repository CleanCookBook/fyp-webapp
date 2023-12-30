"use client";
import Footer from "@/components/Footer";
import Modal from "@/components/Modal"; // Adjust the path based on your file structure
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Homepage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [noResults, setNoResults] = useState(false);
  const [emptyQuery, setEmptyQuery] = useState(false);
  

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  if (!isAuthenticated) {
    // If not authenticated, the user will be redirected during authentication check
    return null;
  }

  const handleSearch = async () => {
    if (!isAuthenticated) {
      // Redirect to the login page if not authenticated
      router.push('/loginPage');
      // No need to return anything here
    }
    if (searchQuery.trim() === '') {
      // Display a message for the user to type something
      setEmptyQuery(true);
      return;
    }


    // Fetch data from the API endpoint
    const encodedQuery = encodeURIComponent(searchQuery);
    const response = await fetch(`http://localhost:3001/api/recipe/search?query=${encodedQuery}`);
    const data = await response.json();
  
    console.log('API Response:', data); // Add this line
  
    // Update state with search results
    setSearchResults(data);
  
    // Check for empty results (empty array or empty object)
    if (!Array.isArray(data) || data.length === 0) {
      setNoResults(true);
    } else {
      // Recipe found, navigate to RecipeList page
      const queryString = new URLSearchParams({ searchInput: searchQuery,searchResults: JSON.stringify(data)});
      const newPathname = '/recipelist?' + queryString;
      router.push(newPathname);// Change '/recipelist' to your actual RecipeList page path
    }
  };
  if (isLoading) {
    // Optional: render a loading spinner or message
    return <p>Loading...</p>;
  }


  return (
    <div className="flex flex-col h-screen bg-[#F9D548]">
      <Navbar />
      <div className="flex flex-col h-screen bg-[#F9D548] text-[#0A2A67] justify-center items-center">
        <h1 className="text-7xl font-black py-5">What's Cooking Today?</h1>
        <div className="w-[748px] bg-white rounded-[20px] flex items-center text-sm p-2 pl-9 text-stone-300">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search our library of recipes"
            className="w-full text-lg text-black outline-none"
          />
          <div className="ml-auto m-[5px]">
            <button className="ml-2" onClick={handleSearch}>
          <Image
                src="/search.png"
                alt="Filter"
                width={20}
                height={20}
                style={{ filter: "brightness(0)" }}
              />
          </button>
          </div>
          <button onClick={openModal}
          onKeyDown={(e) => {
            console.log('Key pressed:', e.key);
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSearch();
            }
          }}
          tabIndex={0} >
              <Image
                src="/filter.png"
                alt="Filter"
                width={20}
                height={20}
                style={{ filter: "brightness(0)" }}
              />
            </button>
        </div>
        {noResults && <p className="text-red-500 mt-2">No such recipe</p>}
        {emptyQuery && <p className="text-red-500 mt-2">Please type something!</p>}
      </div>
      <Footer />
      {isModalOpen && <Modal onClose={closeModal} />}
    </div>
  );
};

export default Homepage;

