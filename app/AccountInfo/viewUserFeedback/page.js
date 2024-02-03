"use client"
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ViewUserFeedback = () => {
  const [userFeedback, setUserFeedback] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState(null); // Add this line
  const userRole = 'system admin';  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setIsLoading] = useState(true);
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

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/feedback/user-feedback");
        const data = await response.json();
        setUserFeedback(data); // Update state to store user feedback
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchFeedback();
  }, []);

  const handleUserFeedbackClick = (feedbackId) => {
    // Implement logic to handle user feedback click
    console.log("User feedback clicked:", feedbackId);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(users.length / usersPerPage);
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
    <div className="flex flex-col min-h-screen bg-[#F9D548] text-[#0A2A67]">
      <Navbar userRole={userRole} />
      <div className="container mx-auto p-4 flex-1">
        <div className="flex items-center">
          <h1 className="text-6xl font-black">
            View User Feedback
          </h1>  
        </div>
        <div className="container mx-auto p-4 flex-1">
          <div className="bg-white rounded-2xl overflow-x-auto shadow-lg mt-5">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2">FeedbackID</th>
                  <th className="border p-2">UserID</th>
                  <th className="border p-2">Feedback</th>
                  <th className="border p-2">Feedback Type</th>
                </tr>
              </thead>
              <tbody>
                {userFeedback.map((feedback) => (
                  <tr key={feedback.FeedbackID}>
                    <td className="border p-2 text-center">{feedback.FeedbackID}</td>
                    <td className="border p-2 text-center">{feedback.UserID}</td>
                    <td className="border p-2 text-center">{feedback.Feedback}</td>
                    <td className="border p-2 text-center">{feedback.FeedbackType}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          {/* Pagination */}
          <button
            onClick={() => paginate(1)}
            className="mx-1 px-3 py-1 hover:font-extrabold"
          >
            &lt;
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`mx-1 px-3 py-1  ${currentPage === index + 1}`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(totalPages)}
            className="mx-1 px-3 py-1  hover:font-extrabold"
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