"use client";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useRouter } from 'next/navigation';
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
  const router = useRouter();
  const newsPerPage = 4;
  const [newsItems, setNewsItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [subscribed, setSubscribed] = useState(false); // Add state for subscription
  const [paymentStatus, setPaymentStatus] = useState('');

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

  // Update paymentStatus state based on router query parameters
  useEffect(() => {
    // Check if router is defined and router.query is not undefined
    if (router && router.query && router.query.paymentStatus) {
      const { paymentStatus } = router.query;
      setPaymentStatus(paymentStatus);
      console.log("router.query.paymentStatus:", router.query.paymentStatus);
    }
    // Inside useEffect for updating paymentStatus
    
    console.log("paymentStatus:", paymentStatus);
  }, [router]);

  useEffect(() => {
    // Function to fetch payment status
    const fetchPaymentStatus = async () => {
      try {
        // Fetch payment status from the server
        const response = await fetch("http://localhost:3001/api/payment/status", {
          method: "GET",
          credentials: "include", // Include credentials to send cookies with the request
        });

        const data = await response.json();
        setPaymentStatus(data.status);
        console.log("Payment Status:", data.status);
      } catch (error) {
        console.error("Error fetching payment status:", error.message);
      }
    };

    // Call the function to fetch payment status
    fetchPaymentStatus();
  }, []);

  const totalPages = Math.ceil((newsItems || []).length / newsPerPage);
  const start = (currentPage - 1) * newsPerPage;
  const end = currentPage * newsPerPage;
  const currentNews = (newsItems || []).slice(start, end);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F9D548]">
      <Navbar userRole={userRole} />
      <div className="flex flex-col items-start justify-center flex-grow px-6">
        <h1 className="text-5xl text-[#0A2A67] font-black mb-8 text-left">
          Catch Up On The Latest News
        </h1>
         
        <div className="w-[90%] mb-6 relative">  
          {paymentStatus !== "paid" && (
            <div className="absolute inset-0 flex items-center justify-center -mr-32 z-10">
              <div className="bg-[#00509D] rounded-[20px] p-2 w-[400px] h-[510px]">
                <img
                  src="/unlock.png"  // Replace with the correct path to your GIF file
                  alt="Unlock"
                  className="flex justify-center items-center -mt-2"
                />
                <p className="text-[#FFFFFF] font-bold text-lg flex justify-center items-center -mt-4">
                  Upgrade to Unlock : <br />
                  &#10003; View unlimited recipes. <br />
                  &#10003; Access to various meal plans. <br />
                  &#10003; Chat with professional nutritionists.
                </p>
                <Link href="/Payment">
                  <button className="items-center bg-white hover:bg-grey-700 text-blue-950 font-bold py-2 px-4 rounded mt-4 ml-32">
                    Upgrade
                  </button>  
                </Link>
              </div>
            </div>
          )}
        
          <div className={`w-[80%] mb-6 relative ${paymentStatus !== "paid" ? 'blur' : ''}`}>
            {currentNews.map((news, index) => (
              <div key={index} className="w-[80%] mb-6 relative">
                <div className="text-blue-900 text-sm font-semibold mb-2">
                  {news.source.name}
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NewsFeed;
