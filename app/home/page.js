"use client";
import Footer from "@/components/Footer";
import Modal from "@/components/Modal"; // Adjust the path based on your file structure
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";


const Homepage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [noResults, setNoResults] = useState(false);
  const router = useRouter();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSearch = async () => {
    // Fetch data from the API endpoint
    const encodedQuery = encodeURIComponent(searchQuery);
    const response = await fetch(`http://localhost:3001/api/search?query=${encodedQuery}`);
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
          <button onClick={openModal}>
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
      </div>
      <Footer />
      {isModalOpen && <Modal onClose={closeModal} />}
    </div>
  );
};

export default Homepage;

