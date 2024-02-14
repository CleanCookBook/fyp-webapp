"use client";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";
import Navbar from "@/components/Navbar";
import SmallStarRating from "@/components/SmallerStars";
import Star from "@/components/Star";
import StarRating from "@/components/StarRating";
import Pagination from "@/components/pagination";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaComment, FaTimes, FaTrash } from 'react-icons/fa';


const Review = () => {
  const [userRole, setUserRole] = useState("user");
  const router = useRouter();
  const [wordCount, setWordCount] = useState(50); // Initialize word count to 50
  const [recipeName, setRecipeName] = useState("");
  const [recipeRating, setRecipeRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [commentsPerPage] = useState(5);
  const [replyText, setReplyText] = useState("");
  const [reply, setReply] = useState("");
  const [replyingToReviewId, setReplyingToReviewId] = useState(null);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [comment, setComment] = useState("");
  const [userId, setUserId] = useState(""); 
  const [userRating, setUserRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedUsername, setSelectedUsername] = useState(null);
  const [reviewId, setReviewId] = useState(null);
  const [replies, setReplies] = useState({});
  const [recipeNameParam, setRecipeNameParam] = useState(null);
  const [showReplies, setShowReplies] = useState(false);

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
        const userResponse = await fetch("https://ccb-backendd.onrender.com/api/userID", {
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

  useEffect(() => {
    const fetchUserType = async () => {
      try {
        const response = await fetch(
          "https://ccb-backendd.onrender.com/api/user/userType",
          {
            method: "POST",
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUserRole(data.userType || "user"); // Set the userRole based on the response
        } else {
          console.error("Error fetching user type:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user type:", error.message);
      }
    };

    // Fetch user type when the component mounts
    fetchUserType();
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

  // Function to handle initiating reply to a review
  const handleReplyClick = async (userReview) => {
    setReplyingToReviewId(userReview.reviewId);
    setReviewId(userReview.reviewId); // Use 'reviewID' instead of 'reviewId'
    setSelectedUsername(userReview.Username);
    setReplyText(`${userReview.comment}`);
    setReply("");
    setShowReplyBox(true);
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
        `https://ccb-backendd.onrender.com/api/recipe/${encodeURIComponent(
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
        `https://ccb-backendd.onrender.com/api/reviews/${encodeURIComponent(
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
      const userResponse = await fetch("https://ccb-backendd.onrender.com/api/userID", {
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
      const reviewResponse = await fetch("https://ccb-backendd.onrender.com/api/reviews", {
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
      const deleteResponse = await fetch(`https://ccb-backendd.onrender.com/api/reviews/${reviewId}`, {
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

  const handleSubmitReply = async (reviewId, userID, recipeName, reply, replyText) => {
    try {
      // Fetch the user ID from /api/userID
      const userResponse = await fetch("https://ccb-backendd.onrender.com/api/userID", {
        method: "GET",
        credentials: "include", // Include credentials for cookie authentication
      });

      if (!userResponse.ok) {
        console.error("Error fetching user ID:", userResponse.statusText);
        return;
      }

      const userData = await userResponse.json();
      const userId = userData.user.UserID;
      
  
      // Send a POST request to the backend API to submit the reply
      const response = await fetch(`https://ccb-backendd.onrender.com/api/reply/replies/${reviewId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          userId: userId, // Use the userId obtained from the backend
          reviewId: reviewId, // Ensure reviewId is included in the request body
          Rname: recipeName, // Assuming Rname is not needed for reply
          reply: reply, // Pass the reply text
          comment: replyText, // Include the comment field
        }),
      });

      if (!response.ok) {
        throw new Error("Error submitting reply");
      }

      const responseData = await response.json();
      console.log("Reply submitted successfully:", responseData.message);

      // Clear reply text and hide reply input box after successful submission
      setReplyText("");
      setShowReplyBox(false);

      // Optionally, you may update the replies state to reflect the new reply
      // For example, refetch the replies after submitting a new reply
    } catch (error) {
      console.error("Error submitting reply:", error.message);
    }
  };

  // Function to fetch replies for a specific review
  const fetchReplies = async (reviewId) => {
    try {
      const response = await fetch(`https://ccb-backendd.onrender.com/api/reply/${reviewId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch replies');
      }
      const data = await response.json();
      // Update the replies state with the fetched replies
      setReplies(data.repliesWithUsernames);
    } catch (error) {
      console.error('Error fetching replies:', error);
    }
  };

  // Function to handle clicking on the comment button
  const handleCommentButtonClick = async (userReview) => {
    try {
      // Fetch replies for the selected review
      await fetchReplies(userReview.reviewId);
      // Set the state to show the reply input box and populate the necessary data
      setReplyingToReviewId(userReview.reviewId);
      setSelectedUsername(userReview.Username);
      setReplyText(userReview.comment); // Assuming you want to include the original comment in the reply input box
      setReply(""); // Clear any previous reply text
      setShowReplyBox(true); // Show the reply input box
    } catch (error) {
      console.error('Error handling comment button click:', error);
    }
  };

  const navigateToRecipe = () => {
    router.push(`/detailRecipe?recipeName=${encodeURIComponent(recipeName)}`)
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
      <div className="flex flex-col min-h-screen bg-[#F9D548] mb-16">
        <div className="flex flex-col mt-10 ml-8">
          <div className="flex items-center">
            {" "}
            {/* Flex container for back button and recipe name */}
            <button
              onClick={navigateToRecipe}
              className="w-28 h-10 bg-blue-950 hover:bg-[#154083] text-white text-xl font-bold rounded-[10px] shadow ml-4 -mt-10"
            >
              &lt;&nbsp;&nbsp;Back
            </button>
            <div className="flex flex-col ml-9">
              {" "}
              {/* Flex container for recipe name and star rating */}
              <h1 className="text-7xl font-extrabold text-blue-950">
                {recipeName || "Recipe Title"}
              </h1>
              <StarRating rating={recipeRating} />
            </div>
          </div>
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
              {reviews.map((userReview, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-md flex items-center"
                >
                  <Image
                    src="/logo.jpg"
                    alt="Profile Picture"
                    width={150}
                    height={150}
                    className="w-16 h-16 rounded-full mr-4"
                    unoptimized={true}
                  />
                  <div className="flex flex-col flex-grow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-blue-950 font-bold">
                          @{userReview.Username}
                        </div>
                        <div className="ml-2 -mt-1">
                          {" "}
                          {/* Add margin to the star rating */}
                          <SmallStarRating rating={userReview.stars} />
                        </div>
                      </div>
                    </div>
                    <p className="text-blue-950 font-semibold">
                      {userReview.comment}
                    </p>

                      <div className="flex items-center mt-2">
                        {/* Display reply button/icon */}
                        <div className="flex items-center">
                          <button
                            onClick={() => handleCommentButtonClick(userReview)}
                            className="flex items-center"
                          >
                            <FaComment />
                            {replies.length > 0 && ( // Check if there are replies
                              <span className="text-blue-950 ml-2 font-medium">
                                {replies.length}
                              </span> // Show the number of replies
                            )}
                          </button>
                        </div>

                        {/* Trash button */}
                        {userId === userReview.UserID && (
                          <button onClick={() => handleDeleteReview(userReview.reviewId)} className="text-red-500 ml-4">
                            <FaTrash/>
                          </button>
                        )}
                      </div>

                      {/* Display reply input box if replyingToReviewId matches current review ID */}
                      {showReplyBox && replyingToReviewId === userReview.reviewId && (
                        <div className="fixed inset-0 flex flex-row items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                          <div className="mt-1">
                            <div className="bg-white p-8 rounded-t-lg w-[56rem] h-[28rem] relative overflow-y-auto scrollbar-container">
                              {/* Render selected user's review */}
                              <div className="mb-4 flex items-start">
                                <Image 
                                  src="/logo.jpg"
                                  alt="Profile Picture" 
                                  width={150}
                                  height={150}
                                  className="w-16 h-16 rounded-full mr-4"
                                  unoptimized={true}
                                />
                                <div>
                                  <div className="text-blue-950 font-bold">@{selectedUsername}</div>
                                  <p className="text-blue-950 font-semibold">{replyText}</p>
                                  <div class1Name="flex items-center mt-2">
                                    <div className="border-b border-solid border-black w-6 ml-5 "></div> {/* Long dash */}
                                    <span className="mx-2">View Replies</span>
                                    {replies.length > 0 && (
                                      <span className="text-blue-950">
                                        ({replies.length})
                                      </span>
                                    )}
                                  </div>
                                  
                                  {/* Render the replies */}
                                  <div className=" ml-4">
                                    {replies.map((reply, index) => (
                                      <div key={index} className="flex items-start">
                                        <Image 
                                          src="/logo.jpg"
                                          alt="Profile Picture" 
                                          width={150}
                                          height={150}
                                          className="w-12 h-12 rounded-full mr-2 mt-6" 
                                          unoptimized={true}
                                        />
                                        <div>
                                          <div className="text-blue-950 font-bold mt-6">@{reply.Username}</div>
                                          <p className="text-blue-950 font-semibold">{reply.Reply}</p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>                              
                              </div>
                              <button 
                                onClick={() => {
                                  setReplyingToReviewId(null);
                                  setReplyText(""); // Clear reply text if cancelled
                                  setShowReplyBox(false);
                                }}
                                className="absolute top-0 right-0 m-4 text-2xl"
                              >
                                <FaTimes />
                              </button>
                            </div>

                            <div className="bg-white p-4 rounded-b-lg border-t">
                              {/* Render the username of the user being replied to */}
                              <div className="text-blue-950 font-bold mb-2">
                                Replying to @{selectedUsername}
                              </div>

                              {/* Reply input field */}
                              <textarea
                                type="text"
                                className="w-[49rem] h-20 p-2 mt-1 flex-grow"
                                placeholder="Write a reply ..."
                                value={reply}
                                onChange={(e) => setReply(e.target.value)}
                              />

                              {/* Reply button */}
                              <div className="flex justify-end -mr-5 -mt-[6.5rem] p-4 h-28">
                                <button
                                  onClick={() => {
                                    console.log(
                                      "Review ID:",
                                      userReview.reviewId
                                    );
                                    console.log("User Review:", userReview);
                                    handleSubmitReply(
                                      userReview.reviewId,
                                      userId,
                                      recipeName,
                                      reply,
                                      replyText
                                    ); // Pass reviewId, userId, recipeName, and replyText
                                  }}
                                  className="px-4 py-2 bg-white text-blue-950 hover:text-blue-550 text-md font-extrabold"
                                >
                                  Reply
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
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
                Words left (Max 50 words) :
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
                Your Rating (click on the stars !) :{" "}
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
                className="w-[100px] h-10 bg-blue-950 hover:bg-[#154083] text-white font-bold rounded-[10px] shadow mt-4 self-end"
                onClick={handleSubmitReview} // Add onClick handler for submitting review
              >
                Submit
              </button>
            </div>
          </section>
        </div>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Review;
