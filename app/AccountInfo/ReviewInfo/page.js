"use client";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


const SysAdminReviewApp = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [partnersInfo, setPartnersInfo] = useState([]);
  const userRole = 'system admin'; 
  const [selectedImage, setSelectedImage] = useState(null);
  // Mock user data for demonstration
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
    const fetchPartnerInfo = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/user/ReviewInfo"
        );
        const data = await response.json();
        setPartnersInfo(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchPartnerInfo();
  }, []);

  const handleEdit = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/edit/approve/${userId}`,
        {
          method: "PATCH", // Use PATCH method for updating
          method: "PATCH", // Use PATCH method for updating
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "approved" }), // Send the new status
        }
      );

      if (response.ok) {
        // If the update was successful, update the local state
        setPartnersInfo((prevUsers) =>
          prevUsers.map((user) =>
            user.UserID === userId ? { ...user, Status: "approved" } : user
          )
        );
        console.log(`User with ID ${userId} approved successfully`);
      } else {
        console.error(
          `Error approving user with ID ${userId}: ${response.statusText}`
        );
      }
    } catch (error) {
      console.error(`Error approving user with ID ${userId}:`, error);
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

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/edit/approve/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "rejected" }), // Update status to "Rejected"
        }
      );

      if (response.ok) {
        // If the update was successful, update the local state
        setPartnersInfo((prevUsers) =>
          prevUsers.map((user) =>
            user.UserID === userId ? { ...user, Status: "rejected" } : user
          )
        );
        console.log(`User with ID ${userId} rejected successfully`);
      } else {
        console.error(
          `Error rejecting user with ID ${userId}: ${response.statusText}`
        );
      }
    } catch (error) {
      console.error(`Error rejecting user with ID ${userId}:`, error);
    }
  };


  const handleImageClick = (imageURL) => {
    setSelectedImage(imageURL);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = partnersInfo.slice(indexOfFirstUser, indexOfLastUser);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(partnersInfo.length / usersPerPage);
  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "text-green-600 font-bold";
      case "Pending":
        return "text-yellow-600 font-bold";
      case "rejected":
        return "text-red-600 font-bold";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F9D548] text-[#0A2A67]">
      <Navbar userRole={userRole} />
      <div className="flex flex-col items-start flex-1">
        <div className="container mx-auto p-4">
          <h2 className="text-6xl font-black">Review Application</h2>
        </div>
        <div className="container mx-auto p-4 flex-1">
          <div className="bg-white rounded-2xl overflow-x-auto shadow-lg mt-5">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2">UserID</th>
                  <th className="border p-2">Username</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">First Name</th>
                  <th className="border p-2">Last Name</th>
                  <th className="border p-2">Gender</th>
                  <th className="border p-2">Date Of Birth</th>
                  <th className="border p-2">LinkedIn URL</th>
                  <th className="border p-2">License Image</th>
                  <th className="border p-2">User Photo</th>
                  <th className="border p-2">Experience File</th>
                  <th className="border p-2">Testimony File</th>
                  <th className="border p-2">Status</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr key={user.UserID}>
                    <td className="border p-2 text-center">{user.UserID}</td>
                    <td className="border p-2 text-center">{user.Username}</td>
                    <td className="border p-2 text-center">{user.email}</td>
                    <td className="border p-2 text-center">{user.FName}</td>
                    <td className="border p-2 text-center">{user.LName}</td>
                    <td className="border p-2 text-center">{user.gender}</td>
                    <td className="border p-2 text-center">{user.dob}</td>
                    <td className="border p-2 text-center">
                      {user.LinkedInURL}
                    </td>
                    <td className="border p-2 text-center">
                      <Image
                        src={`data:image/jpeg;base64,${user.LicenseImage}`}
                        alt="License"
                        className="w-24 h-24 object-cover"
                        onClick={() => handleImageClick(user.LicenseImage)}
                      />
                    </td>
                    <td className="border p-2 text-center">
                      <Image
                        src={`data:image/jpeg;base64,${user.UserPhoto}`}
                        alt="User"
                        className="w-24 h-24 object-cover"
                        onClick={() => handleImageClick(user.UserPhoto)}
                      />
                    </td>
                    <td className="border p-2 text-center">
                      <Image
                        src={`data:image/jpeg;base64,${user.ExperienceFile}`}
                        alt="Experience"
                        className="w-24 h-24 object-cover"
                        onClick={() => handleImageClick(user.ExperienceFile)}
                      />
                    </td>
                    <td className="border p-2 text-center">
                      <Image
                        src={`data:image/jpeg;base64,${user.TestimonyFile}`}
                        alt="Testimony"
                        className="w-24 h-24 object-cover"
                        onClick={() => handleImageClick(user.TestimonyFile)}
                      />
                    </td>
                    <td
                      className={`border p-2 text-center ${getStatusColor(
                        user.Status
                      )}`}
                    >
                      {user.Status}
                    </td>
                    <td className="border p-2">
                      <div className="flex justify-center">
                      {user.Status === "approved" ? (
                        <span className="text-green-600 font-bold">Reviewed!</span>
                      ) : user.Status === "rejected" ? (
                        <span className="text-green-600 font-bold">Reviewed!</span>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(user.UserID)}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleDelete(user.UserID)}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
      </div>
      <Footer />
    </div>
  );
};

export default SysAdminReviewApp;
