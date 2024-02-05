"use client"
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

const AnnouncementsPage = () => {
  const [userRole, setUserRole] = useState("nutritionist");
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [announcements, setAnnouncements] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [announcementsPerPage] = useState(5);
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
    const fetchUserType = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/user/userType",
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
    fetchUserType().then(() => {
      const fetchAnnouncements = async () => {
        try {
          let apiUrl = "";
          if (userRole === "nutritionist") {
            apiUrl = "http://localhost:3001/api/announce/user-announcements";
          } else {
            apiUrl = "http://localhost:3001/api/announce/all-announcements";
          }
  
          const response = await fetch(apiUrl, {
            credentials: "include",
          });
  
          if (response.ok) {
            const data = await response.json();
            console.log("Announcement Data:", data); // Log the data here
            setAnnouncements(data);
          } else {
            console.error("Invalid data format received:", response.statusText);
          }
        } catch (error) {
          console.error("Error fetching user recipes:", error);
        } finally {
          setLoading(false); // Set loading to false when announcements are fetched
        }
      };
  
      fetchAnnouncements();
    });
  
  }, [userRole]);

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

  // Calculate the index of the last announcement for the current page
  const indexOfLastAnnouncement = currentPage * announcementsPerPage;

  // Calculate the index of the first announcement for the current page
  const indexOfFirstAnnouncement = indexOfLastAnnouncement - announcementsPerPage;

  // Slice the announcements array to get only the announcements for the current page
  const currentAnnouncements = announcements.slice(indexOfFirstAnnouncement, indexOfLastAnnouncement);

  // Update the total pages calculation based on the total number of announcements and announcements per page
  const totalPages = Math.ceil(announcements.length / announcementsPerPage);

  // Pagination Handlers
  const goToNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
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
            {userRole === "nutritionist" && (
              <Link 
                href="/home/BPHomepage" 
                className="flex justify-center items-center w-28 h-10 bg-blue-950 hover:bg-[#154083] text-white text-xl font-bold rounded-[10px] shadow self-start mt-[45px] -ml-36"
              >
                &lt;&nbsp;&nbsp;Back
              </Link>
            )}
            {userRole === "user" && (
              <Link 
                href="/home"
                className="flex justify-center items-center w-28 h-10 bg-blue-950 hover:bg-[#154083] text-white text-xl font-bold rounded-[10px] shadow self-start mt-[45px] -ml-36"
              >
                &lt;&nbsp;&nbsp;Back
              </Link>
            )}
            <h1 className="text-5xl font-extrabold text-[#0A2A67] mb-4 mt-10 ml-8">
              {userRole === "nutritionist" ? "Your Announcements" : "All Announcements"}
            </h1>
          </div>

          <div className="relative">
            {userRole !== "nutritionist" && paymentStatus !== "paid" && (
              <div className="absolute inset-0 -top-38 flex items-center justify-center z-10">
                <div className="bg-[#00509D] rounded-[20px] p-8 w-[400px]">
                  <img
                    src="/unlock.png"  // Replace with the correct path to your GIF file
                    alt="Unlock"
                    className="mx-auto"
                  />
                  <p className="text-[#FFFFFF] font-bold text-lg flex justify-center items-center -mt-4">
                    Upgrade to Unlock : <br />
                    &#10003; View unlimited recipes. <br />
                    &#10003; Access to various meal plans. <br />
                    &#10003; Chat with professional nutritionists.
                  </p>
                  <Link href="/Payment">
                    <button className="block mx-auto bg-white hover:bg-grey-700 text-blue-950 font-bold py-2 px-4 rounded mt-4">
                      Upgrade
                    </button>  
                  </Link>
                </div>
              </div>
            )}

            <div className={`bg-white rounded-lg p-4 mt-6 ${userRole !== "nutritionist" && paymentStatus !== "paid" ? 'blur' : ''}`}>
              {currentAnnouncements.map((announcement, index) => (
                <a 
                  key={announcement.id} 
                  href={`/BPAnnouncement/ViewBPAnnouncement?name=${encodeURIComponent(announcement.file_name)}`}
                  onClick={() => handleAnnouncementClick(announcement.UserID)}
                  className="block cursor-pointer"
                >
                  <p>{announcement.file_name}</p>
                  <hr className="my-4" />
                </a>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center mt-4">
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className="mr-2 p-2 text-gray-800 font-bold hover:opacity-[0.5]"
              >
                {"<"}
              </button>
              <p className="text-l font-semibold text-gray-700">
                Page {currentPage} of {totalPages}
              </p>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="ml-2 p-2 text-gray-800 font-bold hover:opacity-[0.5]"
              >
                {">"}
              </button>
            </div>
            {userRole === "nutritionist" && (
              <div className="flex flex-col items-center justify-center mt-4 font-semibold text-[#0A2A67] text-xl">
                <p>Or</p>
                <p>
                  Create A New
                  <a href="/BPAnnouncement/CreateBPAnnouncement" className="ml-1.5 underline font-bold">
                    Announcement
                  </a>
                </p>
              </div>
            )}              
          </div>
      
        </div>
      <Footer />
    </div>
  );
};

export default AnnouncementsPage;