"use client";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CreateUserFeedback = () => {
  const userRole = 'user';
  const [userId, setUserId] = useState("");
  const [feedbackType, setFeedbackType] = useState("");
  const [comments, setComments] = useState("");
  const [notification, setNotification] = useState(null);
  const [loading, setIsLoading] = useState(true);
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
          router.push('https://cleancookbook.vercel.app/loginPage');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const payload = {
      userId,
      feedbackType,
      comments,
    };
  
    try {
      const response = await fetch("https://ccb-backendd.onrender.com/api/feedback/feedbackForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (response.ok) {
        console.log("Feedback submitted successfully");
        setNotification("Thank you for submitting your valuable feedback!");
        setTimeout(() => {
          setNotification(null);
          router.push("/home");
        }, 3000);
      } else {
        console.error("Error submitting feedback");
        setNotification("Error submitting feedback");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setNotification("Error submitting feedback");
    }
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
    <div className="flex flex-col min-h-screen bg-[#F9D548] text-[#0A2A67]">
      <Navbar userRole={userRole} />
      <div className="flex-1 flex justify-center mt-20">
        <div className="max-w-xl">
          <h2 className="text-5xl font-black pb-8 text-center">
            We'd Love To Hear From You
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Feedback Type */}
            <div className="mb-6">
              <div className="justify-start items-start gap-2.5 inline-flex">
                <div className="block text-lg font-medium text-blue-950 mb-2">Feedback Type :</div>
              </div>
                <select
                  type="text"
                  id="feedbackType"
                  value={feedbackType}
                  onChange={(e) => setFeedbackType(e.target.value)}
                  className="w-full h-12 border-none outline-none pl-2.5 py-2.5 bg-white rounded-[10px]"
                  required
                >
                  <option value="" disabled>Select Feedback Type</option>
                  <option value="General">General</option>
                  <option value="Bug Report">Bug Report</option>
                  <option value="Feature Request">Feature Request</option>
                </select>
            </div>
              
            {/* Comments */}
            <div className="mb-6">
              <div className="justify-start items-start gap-2.5 inline-flex">
                <div className="block text-lg font-medium text-blue-950 mb-2">Comments :</div>
              </div>
              <textarea
                id="comments"
                name="comments"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="w-full h-32 border-none outline-none pl-2.5 py-2.5 bg-white rounded-[10px]"
                required
                placeholder="Enter your comments..."
              ></textarea>
            </div>
            <Link href="/home">
              <button
                type="submit"
                className="w-2/5 bg-blue-950 hover:bg-[#154083] text-white text-lg font-bold rounded-full py-2 px-4 ml-11"
              >
                Back
              </button>
            </Link>
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-2/5 bg-blue-950 hover:bg-[#154083] text-white text-lg font-bold rounded-full py-2 px-4 ml-6"
            >
              Submit
            </button>
          </form>
          {notification && (
            <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
              <div className="bg-blue-900 text-white font-bold h-10 px-4 py-2 rounded">
                <p>{notification}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateUserFeedback;
