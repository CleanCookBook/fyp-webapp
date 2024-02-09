"use client"
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CreateBPAnnouncement = () => {
  const router = useRouter();
  const [userRole, setUserRole] = useState("nutritionist");
  const [userId, setUserId] = useState("");
  const [announcementImageURL, setAnnouncementImageURL] = useState("");
  const [announcementName, setAnnouncementName] = useState("");
  const [announcementImage, setAnnouncementImage] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading,  setIsLoading] = useState(true);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleInputChange = (e) => {
    setAnnouncementName(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Set the file object itself, not the URL
      setAnnouncementImage(file);
  
      // Create a temporary URL for the image
      const imageURL = URL.createObjectURL(file);
      setAnnouncementImageURL(imageURL);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

     // Check form completion before proceeding
     checkFormCompletion();

     // If form is not complete, show modal and return
     if (!isFormComplete) {
      setIsModalOpen(true);
      return;
     }

    // If you're planning to upload the file to a server, use FormData
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("announcementName", announcementName);
    formData.append("announcementImage", announcementImage);

    // Example: send formData to the server using fetch or axios
    try {
      const response = await fetch("http://localhost:3001/api/announce/announcement", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (response.ok) {
        console.log("Upload successful!");
        router.push("/home/BPHomepage");
      } else {
        console.error("Upload failed.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const checkFormCompletion = () => {
    // Check if all required fields are filled
    if (announcementName && announcementImage) {
      setIsFormComplete(true);
    } else {
      setIsModalOpen(true);
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
      <Navbar userRole={userRole}/>
      <div className="container mx-auto p-4 flex-1">
        <div className="flex items-center mb-4">
          <button 
            onClick={() => router.back()}
            className="flex justify-center items-center w-28 h-10 bg-blue-950 hover:bg-[#154083] text-white text-xl font-bold rounded-[10px] shadow self-start mt-[45px] -ml-36"
          >
            &lt;&nbsp;&nbsp;Back
          </button>
        <h1 className="text-5xl font-extrabold text-[#0A2A67] mb-4 mt-10 ml-7">
          Create Your Announcement
        </h1>
        </div>
        <p className="text-black-200 text-2xl font-medium">
          Upload Your Files Here
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col items-start mb-8">
          <input
            type="text"
            id="announcementName"
            value={announcementName}
            onChange={handleInputChange}
            className="text-neutral-400 text-m font-medium border-none outline-none w-1/2 h-10 pl-2.5 py-2.5 bg-white rounded-[10px] my-4 self-start drop-shadow-md"
            placeholder="Enter Announcement Name Here"
            required
          />
          <div className="flex items-center justify-center w-1/2 pl-2.5 py-2.5 bg-white rounded-[10px] mb-4 drop-shadow-md">
            {/* License Upload */}
            {!announcementImage && (
              <label htmlFor="announcementImage" className="cursor-pointer">
                <span className="mr-2 text-gray-500">Choose File</span>
                <input
                  type="file"
                  id="announcementImage"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            )}
            {/* Display the image */}
            {announcementImageURL && (
              <img
                src={announcementImageURL}
                alt="Selected Announcement Image"
                className="object-cover -ml-4"
                style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '100%' }}
              />
            )}
            {/* Icon */}
            {!announcementImage && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M14 7a2 2 0 00-2-2H8a2 2 0 00-2 2v1H4a2 2 0 00-2 2v7a2 2 0 002 2h12a2 2 0 002-2V10a2 2 0 00-2-2h-2V7zM8 7a1 1 0 011-1h2a1 1 0 011 1v1H8V7zm6 3h-2v1a1 1 0 01-1 1H9a1 1 0 01-1-1v-1H6v5h8v-5zM6 6h8a1 1 0 011 1v1H5V7a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
          <div>
            {/* Change Picture button */}
            {announcementImage && (
              <button
                className="ml-2 flex justify-center items-center w-64 h-10 bg-blue-950 hover:bg-[#154083] text-white text-xl font-bold rounded-[10px] shadow"
                onClick={() => {
                  setAnnouncementImage(null);
                  setAnnouncementImageURL(null);
                }}
              >
                Change Picture
              </button>
            )}
          </div>
          {/* Modal for incomplete form notification */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-center mb-4">Please fill out all the required fields before proceeding!</h2>
                <button 
                  onClick={() => setIsModalOpen(false)} 
                  className="bg-blue-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-44 mt-4 focus:outline-none focus:shadow-outline"
                >
                  Close
                </button>
              </div>
            </div>
          )}
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-64 h-10 bg-blue-950 hover:bg-[#154083] text-white text-xl font-bold rounded-[10px] shadow self-end mt-4"
          >
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CreateBPAnnouncement;
