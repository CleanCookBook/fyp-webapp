"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const handleClick = (page) => {
    setCurrentPage(page);
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

const NewsFeed = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 5;
  const newsItems = [
    {
      title:
        "Why is healthy eating so hard to do in a food paradise like Singapore?",
      source: "CNA",
    },
    {
      title:
        "The best New Year's Eve dinner and parties in Singapore to count down to 2024",
      source: "AsiaOne",
    },
    {
      title:
        "Ex-Kilo Kitchen Head Chef, 27, Sells Tasty Handmade Duck Ramen From HDB Flat",
      source: "Today",
    },
    // Add more news items here if needed
  ];

  const totalPages = Math.ceil(newsItems.length / newsPerPage);
  const start = (currentPage - 1) * newsPerPage;
  const end = currentPage * newsPerPage;
  const currentNews = newsItems.slice(start, end);

  return (
    <div className="flex flex-col min-h-screen bg-[#F9D548]">
      <Navbar />
      <div className="flex flex-col items-start justify-center flex-grow px-6">
        <h1 className="text-5xl text-[#0A2A67] font-black mb-8 text-left">
          Catch Up On The Latest News
        </h1>
        {/* Map through currentNews instead of newsItems */}
        {currentNews.map((news, index) => (
          <div key={index} className="w-[80%] mb-6 relative">
            <div className="text-blue-900 text-sm font-semibold mb-2">
              {news.source}
            </div>
            <div className="text-blue-950 text-2xl font-extrabold">
              {news.title}
            </div>
            <div className="w-full border-b-2 border-black mt-2"></div>
            <div className="mt-2 flex justify-end items-center text-black text-sm font-medium">
              <Link href="#" passHref>
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

