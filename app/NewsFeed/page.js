"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const handleClick = (page) => {
    if (page) {
      setCurrentPage(page);
    }
  };
  

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const goToPrevious = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const goToNext = () => {
    setCurrentPage((prevPage) =>
      prevPage < totalPages ? prevPage + 1 : prevPage
    );
  };

  return (
    <div className="flex justify-center mt-6 items-center">
      <button
        onClick={goToPrevious}
        className={`mx-2 px-3 py-1${
          currentPage === 1 ? " text-gray-500" : "bg-white"
        }`}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => handleClick(page)}
          className={`mx-2 px-3 py-1 border rounded ${
            currentPage === page ? "bg-gray-800 text-white" : "bg-white"
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={goToNext}
        className={`mx-2 px-3 py-1 ${
          currentPage === totalPages ? " text-gray-500" : "bg-white"
        }`}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
};

const userRole = "user";

const NewsFeed = () => {
  const newsPerPage = 4;
  const [newsItems, setNewsItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/news");
        const data = await response.json();
        console.log("API Response:", data);

        if (Array.isArray(data)) {
          setNewsItems(data);
        } else {
          console.error("Invalid data format:", data);
        }
      } catch (error) {
        console.error("Error fetching news data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsData();
  }, []);

  // ... rest of your component code ...

  const totalPages = Math.ceil((newsItems || []).length / newsPerPage);
  const start = (currentPage - 1) * newsPerPage;
  const end = currentPage * newsPerPage;
  const currentNews = (newsItems || []).slice(start, end);

  // ... rest of your component code ...

  return (
    <div className="flex flex-col min-h-screen bg-[#F9D548]">
      <Navbar userRole={userRole} />
      <div className="flex flex-col items-start justify-center flex-grow px-6">
        <h1 className="text-5xl text-[#0A2A67] font-black mb-8 text-left">
          Catch Up On The Latest News
        </h1>
        {/* Map through currentNews instead of newsItems */}
        {currentNews.map((news, index) => (
          <div key={index} className="w-[80%] mb-6 relative">
            <div className="text-blue-900 text-sm font-semibold mb-2">
              {news.source.name}{" "}
              {/* Use the specific property you want to display */}
            </div>
            <div className="text-blue-950 text-2xl font-extrabold">
              {news.title}
            </div>
            <div className="w-full border-b-2 border-black mt-2"></div>
            <div className="mt-2 flex justify-end items-center text-black text-sm font-medium">
            <Link href={news.url} target="_blank" passHref>
                <span className="flex items-center">
                  Read More <IoIosArrowForward className="ml-.5" />
                </span>
              </Link>
            </div>
          </div>
        ))}

        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <Footer />
    </div>
  );
};

export default NewsFeed;
