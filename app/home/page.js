"use client";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";
import Modal from "@/components/Modal"; // Adjust the path based on your file structure
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const Homepage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const userRole = 'user';  
  const router = useRouter();
  const [isPaid, setIsPaid] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    // Fetch user details including paid/unpaid status
    const fetchUserDetails = async () => {
      try {
        const response = await fetch("https://cleancookbook.vercel.app/api/payment/search", {
          method: "GET",
          credentials: "include",
        });
  
        if (response.ok) {
          const userData = await response.json();
          setIsPaid(userData.paid === 'paid');
          setUser({ searchCount: userData.searchCount }); // Update user state
        } else {
          // Handle error
        }
      } catch (error) {
        console.error('Error fetching user details:', error.message);
      }
    };
  
    fetchUserDetails();
  }, []);


  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch("https://ccb-backendd.onrender.com/api/check-auth", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
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
  const updateSearchCount = async () => {
    try {
      const response = await fetch("https://ccb-backendd.onrender.com/api/payment/update-search-count", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        console.error('Failed to update search count');
      }
    } catch (error) {
      console.error('Error updating search count:', error.message);
    }
  };

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
    setNoResults(false);
    setEmptyQuery(false);
  
    if (!isAuthenticated) {
      // Redirect to the login page if not authenticated
      router.push('/loginPage');
      // No need to return anything here
      return;
    }
  
    if (searchQuery.trim() === '') {
      // Display a message for the user to type something
      setEmptyQuery(true);
      return;
    }
  
    if (!isPaid) {
      if (user.searchCount >= 5) {
        console.log('Daily search limit exceeded for unpaid user');
        alert('You have reached the daily limit for searches. Upgrade for unlimited access!');
        return;
      }
    }

    // Set the isSearching state to true when starting the search
    setIsSearching(true);

    // Fetch data from the API endpoint
    const encodedQuery = encodeURIComponent(searchQuery);
    const response = await fetch(`https://ccb-backendd.onrender.com/api/recipe/search?query=${encodedQuery}`);
    const data = await response.json();
  
    console.log('API Response:', data); // Add this line
  
    // Update state with search results
    setSearchResults(data);
  
    // Check for empty results (empty array or empty object)
    if (!Array.isArray(data) || data.length === 0) {
      setNoResults(true);
    } else {
      // Recipe found, navigate to RecipeList page
      updateSearchCount();
      const queryString = new URLSearchParams({ searchInput: searchQuery,searchResults: JSON.stringify(data)});
      const newPathname = '/recipelist?' + queryString;
      router.push(newPathname);// Change '/recipelist' to your actual RecipeList page path
    }

    // Set the isSearching state to false when search is complete
    setIsSearching(false);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
        <LoadingSpinner />
      </div>
    );
  }

  // Can click enter key without click the search button
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Suspense fallback={<LoadingSpinner />}>
    <div className="flex flex-col h-screen bg-[#F9D548]">
        <Navbar userRole={userRole} />
      <div className="flex flex-col h-screen bg-[#F9D548] text-[#0A2A67] justify-center items-center">
        <h1 className="text-7xl font-black py-5">What's Cooking Today?</h1>
        <div className="w-[748px] bg-white rounded-[20px] flex items-center text-sm p-2 pl-9 text-stone-300">
        <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)} 
            onKeyDown={handleKeyDown}
            placeholder="Search our library of recipes"
            className="w-full text-lg text-black outline-none -ml-3"
          />
          <div className="ml-auto m-[6px] border-r border-gray-500 mr-3">
            <button className="mr-3 mt-1" onClick={handleSearch}>
            <Image
              src="/search.png"
              alt="Search"
              width={25}
              height={20}
              style={{ filter: "brightness(0)" }}
            />
            </button>
          </div>
          <button onClick={openModal} className="mr-3"
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
                width={25}
                height={25}
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
    </Suspense>
  );
};

export default Homepage;
