"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import LoadingSpinner from "@/components/LoadingSpinner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaHeart, FaRegHeart, FaTrash, FaComment } from "react-icons/fa";

const ViewBPAnnouncement = () => {
  const router = useRouter();
  const [userRole, setUserRole] = useState("nutritionist");
  const [searchParams, setSearchParams] = useState(null);
  const [name, setName] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const nameRef = useRef(null);
  const[userId,setUserId]=useState(null);
  
  useEffect(() => {
    // Ensure the code runs only in the browser environment
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setSearchParams(params);
      const paramName = params.get("name");
      setName(paramName);
      nameRef.current = paramName;
    }
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authResponse = await fetch("http://localhost:3001/api/check-auth", {
          method: "GET",
          credentials: "include",
        });

        if (authResponse.ok) {
          setIsAuthenticated(true);
          setLoading(false);

          // Fetch user ID
          const userResponse = await fetch("http://localhost:3001/api/userID", {
            method: "GET",
            credentials: "include",
          });

          if (userResponse.ok) {
            const userData = await userResponse.json();
            const userId = userData.user.UserID;
            setUserId(userId);
          } else {
            console.error("Error fetching user ID:", userResponse.statusText);
          }

          // Fetch user type
          const userTypeResponse = await fetch("http://localhost:3001/api/user/userType", {
            method: "POST",
            credentials: "include",
          });

          if (userTypeResponse.ok) {
            const userTypeData = await userTypeResponse.json();
            setUserRole(userTypeData.userType || "user");
          } else {
            console.error("Error fetching user type:", userTypeResponse.statusText);
          }

          // Fetch announcement file
          const announcementFileResponse = await fetch(`http://localhost:3001/api/announce/getAnnouncementFile/${name}`, {
            credentials: "include",
          });

          if (announcementFileResponse.ok) {
            const announcementFileData = await announcementFileResponse.json();
            setImageData(announcementFileData.announcementFile);
          } else {
            console.error("Error fetching announcement file:", announcementFileResponse.statusText);
          }

          // Fetch comments
          const commentsResponse = await fetch(`http://localhost:3001/api/comments/${name}`);

          if (commentsResponse.ok) {
            const commentsData = await commentsResponse.json();
            setComments(commentsData);
          } else {
            console.error("Error fetching comments:", commentsResponse.statusText);
          }

          // Fetch like count
          const likeCountResponse = await fetch(`http://localhost:3001/api/comments/likeCount/${name}`);

          if (likeCountResponse.ok) {
            const likeCountData = await likeCountResponse.json();
            setLikeCount(likeCountData.likeCount || 0);
          } else {
            console.error("Error fetching like count:", likeCountResponse.statusText);
          }

          // Fetch like status
          const likeStatusResponse = await fetch(
            `http://localhost:3001/api/comments/likeStatus/${name}`,
            {
              credentials: "include",
            }
          );
          if (likeStatusResponse.ok) {
            const likeStatusData = await likeStatusResponse.json();
            console.log("Did I click like?", likeStatusData);
    
            setIsLiked(likeStatusData.isLiked);
            
          } else {
            console.error("Error fetching like status:", likeStatusResponse.statusText);
          }
        } else {
          router.push("/loginPage");
        }
      } catch (error) {
        console.error("Error during authentication check:", error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [router, name]);// Assuming you have currentUser state set with the current user's username
      
  const handleLikeClick = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/comments/like", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          announcementName: name,
          like: isLiked ? "no" : "like", // Toggle between like and unlike
        }),
      });

      if (response.ok) {
        window.location.reload();
        // Toggle the isLiked state based on the response
        // You can update the like count here if needed
      } else {
        console.error("Error handling like:", response.statusText);
      }
    } catch (error) {
      console.error("Error handling like:", error.message);
    }
  };
  
  const handleSubmitComment = async () => {
    try {
  
      // Use the fetch API to submit the comment
      const commentInput = document.getElementById("comment").value;
      if (!commentInput) {
        // Don't submit empty comments
        return;
      }
  
      const response = await fetch("http://localhost:3001/api/comments/addComment", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          announcementName: name,
          comment: commentInput,
        }),
      });
  
      if (response.ok) {
        // Clear the comment input field after successful submission
        document.getElementById("comment").value = "";
  
        // Fetch the updated comments from the server
        const updatedCommentsResponse = await fetch(`http://localhost:3001/api/comments/${name}`);
        if (updatedCommentsResponse.ok) {
          const updatedCommentsData = await updatedCommentsResponse.json();
          setComments(updatedCommentsData);
        } else {
          console.error("Error fetching updated comments:", updatedCommentsResponse.statusText);
        }
      } else {
        console.error("Error handling comment submission:", response.statusText);
      }
    } catch (error) {
      console.error("Error handling comment submission:", error.message);
    }
  }

  const handleDeleteComment = async (commentId) => {
    try {
      // Make a DELETE request to the backend API
      const deleteResponse = await fetch(`http://localhost:3001/api/comments/${commentId}`, {
        method: "DELETE",
        credentials: "include", // Include credentials for cookie authentication
      });

      if (!deleteResponse.ok) {
        console.error("Error deleting comment:", deleteResponse.statusText);
        return;
      }

      const deleteData = await deleteResponse.json();
      console.log(deleteData.message);

      // Remove the deleted comment from the local state
      setComments((prevComments) => prevComments.filter((comment) => comment.commentID !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error.message);
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
      <Navbar userRole={userRole} />
      <div className="container mx-auto w-auto p-4 flex-1 mb-16 flex flex-col items-center">
        {/* Back link and details */}
        <div className="flex justify-start items-start mt-4 mb-4  text-center">
          <Link
            href="/BPAnnouncement"
            className="flex justify-center items-center w-28 h-10 bg-blue-950 hover:bg-[#154083] text-white text-xl font-bold rounded-[10px] shadow -ml-[28rem]"
          >
            &lt;&nbsp;&nbsp;Back
          </Link>
          <div className="relative ml-[28rem]">
            <h1 className="text-5xl font-extrabold text-[#0A2A67]">{name}</h1>
          </div>
        </div>

        <div className="container mx-auto w-auto p-4 flex-1 flex">
          {/* Left Section: Announcement */}
          <div className="w-1/2 mr-4">
            <div className="relative">
              <div className="bg-white rounded-lg p-4">
                {imageData && (
                  <img
                    src={imageData}
                    alt="Announcement"
                    className="max-w-full"
                    style={{ height: "auto" }}
                  />
                )}

                {/* Like button */}
                <div className="mt-4 flex items-center">
                  <button
                    className="text-red-500 hover:text-red-700 text-3xl"
                    onClick={handleLikeClick}
                  >
                    {isLiked ? (
                      <FaHeart className="text-red-500 text-3xl ml-2" />
                    ) : (
                      <FaRegHeart className="text-blue-950 text-3xl ml-2" />
                    )}
                  </button>
                  <div className="ml-2">
                    <span className="text-blue-950 font-medium">{likeCount}</span>
                  </div>
                  <div className="ml-2 flex items-center">
                    <FaComment className="text-blue-950 text-3xl ml-10" />
                    <span className="text-blue-950 ml-3 font-medium">{comments.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section: Comments */}
          <div className="w-1/2">
            <div className="mt-1">
              <div className="mt-1">
                {/* Comment section goes here */}
                <h2 className="text-3xl font-bold text-[#0A2A67]">
                  Comments :
                </h2>
                {/* Display comments */}
                <section 
                  className="bg-white h-96 flex-grow p-4 rounded-t-lg shadow-md mt-4 overflow-y-auto scrollbar-container"
                  style={{ 
                    scrollbarWidth: "thin"
                  }}
                >
                  <div>
                    {comments.map((comment) => (
                      <div key={comment.commentID} className="flex items-start mb-4">
                        {/* Display profile picture, username, and comment details */}
                        {comment.comment && (
                          <>
                            <img
                              src="profile logo.png"
                              alt="Profile Picture"
                              className="w-16 h-16 rounded-full mr-4"
                            />
                            <div className="flex flex-col flex-grow">
                              {/* Username */}
                              <div className="text-blue-950 font-bold">@{comment.Username}</div>

                              {/* Comment */}
                              <div className="relative">
                                <p className="text-blue-950 font-semibold">{comment.comment}</p>
                                {comment.UserID === userId && (
                                  <button
                                    onClick={() => handleDeleteComment(comment.commentID)}
                                    className="absolute top-0 right-4 text-red-500"
                                  >
                                    <FaTrash />
                                  </button>
                                )}                                
                              </div>

                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                  {/* Add more static comments as needed */}
                </section>

                {/* New Comment Form */}
                <div className="bg-white p-4 shadow-md flex rounded-b-lg">
                  {/* Comment Input Field */}
                  <div className="mb-2 flex-1">
                    <input
                      className="mt-2 shadow appearance-none border-t border-b border-l rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="comment"
                      placeholder="Write your comment here..."
                    />
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      className="mt-2 bg-white shadow-left text-blue-950 border-t border-b border-r rounded-r appearance-none font-bold py-2 px-3 w-full leading-tight focus:outline-none"
                      type="button"
                      onClick={handleSubmitComment}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ViewBPAnnouncement;
