import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ViewUserFeedback = () => {
  const [userFeedback, setUserFeedback] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [userFeedbackPerPage] = useState(5);

  // useEffect(() => {
  // Include link to the database and fetch user feedback
  // }, []);

  const handleUserFeedbackClick = (feedbackId) => {
    // Define logic to handle user feedback click
    console.log("User feedback clicked:", feedbackId);
  };

  const indexOfLastFeedback = currentPage * userFeedbackPerPage;
  const indexOfFirstFeedback = indexOfLastFeedback - userFeedbackPerPage;
  const currentFeedback = userFeedback.slice(
    indexOfFirstFeedback,
    indexOfLastFeedback
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(userFeedback.length / userFeedbackPerPage);

  return (
    <div className="flex flex-col min-h-screen bg-[#F9D548]">
      <Navbar />
      <div className="container mx-auto p-4 flex-1">
        <h1 className="text-5xl font-bold text-[#0A2A67] mb-4">
          View User Feedback
        </h1>
        <div className="bg-white rounded-lg p-4">
          {currentFeedback.map((feedback) => (
            <div
              key={feedback.id}
              onClick={() => handleUserFeedbackClick(feedback.id)}
              className="cursor-pointer"
            >
              <p>{feedback.title}</p>
              <hr className="my-4" />
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          {/* Pagination */}
          <button
            onClick={() => paginate(1)}
            className="mx-1 px-3 py-1 rounded hover:bg-gray-200"
          >
            &lt;
          </button>
          <button className="mx-1 px-3 py-1 rounded hover:bg-gray-200" disabled>
            {currentPage}
          </button>
          <button
            disabled={currentPage === totalPages}
            onClick={() => paginate(currentPage + 1)}
            className="mx-1 px-3 py-1 rounded hover:bg-gray-200"
          >
            &gt;
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ViewUserFeedback;
