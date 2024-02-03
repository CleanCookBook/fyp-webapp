"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SmallStarRating from "@/components/SmallerStars";
import Star from "@/components/Star";
import StarRating from "@/components/StarRating";
import Pagination from "@/components/pagination";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaTrash } from 'react-icons/fa';


const Review = () => {
  const [wordCount, setWordCount] = useState(50); // Initialize word count to 50
  const [recipeName, setRecipeName] = useState("");
  const [recipeRating, setRecipeRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [commentsPerPage] = useState(5);
  const [comment, setComment] = useState("");
  const userRole ="user";
  const [userId, setUserId] = useState(""); 
  const router = useRouter();
  const [userRating, setUserRating] = useState(0);
    const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
        setLoading(false);
      }
    };

    checkAuthentication();
  }, [router]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await fetch("http://localhost:3001/api/userID", {
          method: "GET",
          credentials: "include",
        });

        if (!userResponse.ok) {
          console.error("Error fetching user ID:", userResponse.statusText);
          return;
        }

        const userData = await userResponse.json();
        const userId = userData.user.UserID;
        setUserId(userId); // Set the userId state
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };

    fetchUserData();
  }, []);

  // Calculate overall rating based on user ratings
  const calculateOverallRating = () => {
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const overallRating = totalRating / reviews.length || 0;
    setRecipeRating(overallRating);
  };

  // Handle user clicks on stars to set user rating
  const handleStarClick = (rating) => {
    setUserRating(rating);
  };

  const handleWordCount = (event) => {
    const words = event.target.value.split(/\s+/).filter((word) => word);
    setWordCount(50 - words.length);
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * commentsPerPage;
  const endIndex = startIndex + commentsPerPage;
  const commentsToShow = reviews.slice(startIndex, endIndex);

  useEffect(() => {
    // Fetch the recipe name from the search parameters in the URL
    const searchParams = new URLSearchParams(window.location.search);
    const recipeNameParam = searchParams.get("recipeName");

    if (recipeNameParam) {
      setRecipeName(decodeURIComponent(recipeNameParam));

      // Fetch the rating for the recipe using your backend endpoint
      fetch(
        `http://localhost:3001/api/recipe/${encodeURIComponent(
          recipeNameParam
        )}`
      )
        .then((response) => response.json())
        .then((data) => setRecipeRating(parseFloat(data.ratings) || 0))
        .catch((error) =>
          console.error("Error fetching rating:", error.message)
        );

      // Fetch the reviews for the recipe using your backend endpoint
      fetch(
        `http://localhost:3001/api/reviews/${encodeURIComponent(
          recipeNameParam
        )}`
      )
        .then((response) => response.json())
        .then((data) => {
          // Assuming the response has a key 'reviews' containing an array of reviews
          setReviews(data.reviews);
          console.log("Received data:", data);
        })
        .catch((error) =>
          console.error("Error fetching reviews:", error.message)
        );
    }
  }, [router.asPath]);

  const handleSubmitReview = async () => {
    try {
      // Fetch the user ID from /api/userID
      const userResponse = await fetch("http://localhost:3001/api/userID", {
        method: "GET",
        credentials: "include", // Include credentials for cookie authentication
      });

      if (!userResponse.ok) {
        console.error("Error fetching user ID:", userResponse.statusText);
        return;
      }

      const userData = await userResponse.json();
      const userId = userData.user.UserID;

      // Use the fetch API to submit the review
      const reviewResponse = await fetch("http://localhost:3001/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include credentials for cookie authentication
        body: JSON.stringify({
          recipeName: recipeName,
          comment: comment,
          userId: userId, // Pass the user ID obtained from /api/userID
          stars: userRating,
        }),
      });

      if (!reviewResponse.ok) {
        console.error("Error submitting review:", reviewResponse.statusText);
        return;
      }

      const reviewData = await reviewResponse.json();
      console.log("Review submitted successfully:", reviewData.message);
      window.location.reload();
      // You might want to update the reviews state here if needed
      // For example, refetch the reviews after submitting a new one
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      // Make a DELETE request to the backend API
      const deleteResponse = await fetch(`http://localhost:3001/api/reviews/${reviewId}`, {
        method: "DELETE",
        credentials: "include", // Include credentials for cookie authentication
      });

      if (!deleteResponse.ok) {
        console.error("Error deleting review:", deleteResponse.statusText);
        return;
      }

      const deleteData = await deleteResponse.json();
      console.log(deleteData.message);

      // Remove the deleted review from the local state
      setReviews((prevReviews) => prevReviews.filter((review) => review.reviewId !== reviewId));
    } catch (error) {
      console.error("Error deleting review:", error.message);
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
    <div className="flex flex-col min-h-screen bg-[#F9D548]">
      {/* Navbar */}
      <Navbar userRole={userRole} />
      <div className="mt-10 ml-8">
        <h1 className="text-7xl font-extrabold text-blue-950">
          {recipeName || "Recipe Title"}
        </h1>
        <StarRating rating={recipeRating} />
      </div>

      <div className="container mx-auto px-4">
        <section className="mt-1">
          {(reviews.length === 0 && (
            <div className="text-3xl font-bold mb-4 text-blue-950 text-center">
              Be the first one to comment!
            </div>
          )) || (
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-bold text-blue-950 text-center">
                Read what others are saying!
              </h2>
              <p className="text-blue-950">{reviews.length} reviews</p>
            </div>
          )}

          {/* Comments section - placeholder for dynamic content */}
          {/* Comments section - dynamically display reviews */}
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md flex items-center"
              >
                <img
                  src="profile logo.png"
                  alt="Profile Picture"
                  className="w-16 h-16 rounded-full mr-4"
                />
                {/* You can customize the display of each review here */}
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <div className="text-blue-950 font-bold">
                      @{review.Username}
                    </div>
                    {/* Display the user's rating */}
                  </div>

                  <p className="text-blue-950 font-semibold">
                    {review.comment}
                  </p>

                  <div>
                    <SmallStarRating rating={review.stars} />
                  </div>

                  {userId === review.UserID  && (
                <button
                  onClick={() => handleDeleteReview(review.reviewId)}
                  className="text-red-500 ml-right"
                >
                  <FaTrash/>
                </button>
              )}
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="flex justify-center mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(reviews.length / commentsPerPage)}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </section>

        <section className="mt-8">
          {/* Input field for user reviews - placeholder for dynamic form */}
          <div className="bg-white p-4 rounded-lg shadow-md flex flex-col items-start">
            <input
              className="w-full h-32 p-2 border rounded-md"
              placeholder="Let us know how you feel!..."
              maxLength={wordCount === 50 ? 300 : null} // Allow 300 characters initially (50 words)
              onInput={handleWordCount}
              value={comment}
              onChange={(e) => setComment(e.target.value)} // Update comment state
            />
            <p className="text-gray-500 text-sm mt-2">
              Words left(Max 50 words):
              <span
                style={{
                  marginLeft: "5px",
                  marginRight: "10px",
                  color: wordCount >= 0 ? "inherit" : "red",
                }}
              >
                {wordCount >= 0 ? wordCount : "0 !! "}
              </span>
            </p>
            <span className="text-blue-950 font-bold mr-2">
              Your Rating(click on the stars!):{" "}
            </span>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((rating) => (
                <Star
                  key={rating}
                  filled={userRating >= rating}
                  onClick={() => handleStarClick(rating)}
                />
              ))}
            </div>
            <button
              className="w-[100px] h-7 bg-blue-950 hover:bg-[#154083] text-white font-bold rounded-[10px] shadow mt-4 self-end"
              onClick={handleSubmitReview} // Add onClick handler for submitting review
            >
              Submit
            </button>
          </div>
        </section>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Review;
