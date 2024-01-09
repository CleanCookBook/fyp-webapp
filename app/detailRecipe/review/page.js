"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Pagination from "@/components/pagination";
import StarRating from "@/components/StarRating";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Review = () => {
  const [wordCount, setWordCount] = useState(50); // Initialize word count to 50
  const [recipeName, setRecipeName] = useState("");
  const [recipeRating, setRecipeRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
const [commentsPerPage] = useState(5);

  const router = useRouter();

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
        })
        .catch((error) =>
          console.error("Error fetching reviews:", error.message)
        );
    }
  }, [router.asPath]);

  return (
    <div className="flex flex-col min-h-screen bg-[#F9D548]">
      {/* Navbar */}
      <Navbar />
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
            <h2 className="text-3xl font-bold mb-4 text-blue-950 text-center">
              Read what others are saying!
            </h2>
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
                  </div>
                  <p className="text-blue-950 font-semibold">
                    {review.comment}
                  </p>
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
              className="w-full h-25 p-2 border rounded-md"
              placeholder="Let us know how you feel!..."
              maxLength={wordCount === 50 ? 300 : null} // Allow 300 characters initially (50 words)
              onInput={handleWordCount}
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
            <button className="w-[100px] h-7 bg-blue-950 hover:bg-[#154083] text-white font-bold rounded-[10px] shadow mt-4 self-end">
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
