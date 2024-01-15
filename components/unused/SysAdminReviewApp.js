import React, { useState, useEffect } from "react";
import SysAdminNavBar from "./SysAdminNavBar";
import Footer from "./Footer";

const SysAdminReviewApp = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  // Mock user data for demonstration
  const users = [
    {
      id: 1,
      username: "Bob",
      linkedInURL: "www.linkedin.com/example",
      licenseImage: "image/source",
      userPhoto: "image/source",
      experienceFile: "image/source",
      testimonyFile: "image/source",
      status: "Pending",
    },
    {
      id: 2,
      username: "Henry",
      linkedInURL: "www.linkedin.com/example",
      licenseImage: "image/source",
      userPhoto: "image/source",
      experienceFile: "image/source",
      testimonyFile: "image/source",
      status: "Pending",
    },
    // Add more user data here...
  ];

  useEffect(() => {
    // Fetch users from API or database
  }, []);

  const handleEdit = (userId) => {
    // Edit logic
    console.log(`Edit user with ID: ${userId}`);
  };

  const handleDelete = (userId) => {
    // Your delete logic here
    console.log(`Delete user with ID: ${userId}`);
  };

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (imageURL) => {
    setSelectedImage(imageURL);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(users.length / usersPerPage);

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "text-green-600 font-bold";
      case "Pending":
        return "text-yellow-600 font-bold";
      case "Rejected":
        return "text-red-600 font-bold";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F9D548] text-[#0A2A67]">
      <SysAdminNavBar />
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
                  <tr key={user.id}>
                    <td className="border p-2 text-center">{user.id}</td>
                    <td className="border p-2 text-center">{user.username}</td>
                    <td className="border p-2 text-center">
                      {user.linkedInURL}
                    </td>
                    <td className="border p-2 text-center">
                      <img
                        src={user.licenseImage}
                        alt="License"
                        className="w-24 h-24 object-cover"
                        onClick={() => handleImageClick(user.licenseImage)}
                      />
                    </td>
                    <td className="border p-2 text-center">
                      <img
                        src={user.userPhoto}
                        alt="User"
                        className="w-24 h-24 object-cover"
                        onClick={() => handleImageClick(user.userPhoto)}
                      />
                    </td>
                    <td className="border p-2 text-center">
                      <img
                        src={user.experienceFile}
                        alt="Experience"
                        className="w-24 h-24 object-cover"
                        onClick={() => handleImageClick(user.experienceFile)}
                      />
                    </td>
                    <td className="border p-2 text-center">
                      <img
                        src={user.testimonyFile}
                        alt="Testimony"
                        className="w-24 h-24 object-cover"
                        onClick={() => handleImageClick(user.testimonyFile)}
                      />
                    </td>
                    <td
                      className={`border p-2 text-center ${getStatusColor(
                        user.status
                      )}`}
                    >
                      {user.status}
                    </td>
                    <td className="border p-2">
                      <div className="flex justify-center">
                        <button
                          onClick={() => handleEdit(user.id)}
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Reject
                        </button>
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
