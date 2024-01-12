"use client";
import DeleteUser from "@/components/DeleteUser";
import Footer from "@/components/Footer";
import SysAdminNavBar from "@/components/SysAdminNavBar";
import Link from "next/link";
import { useEffect, useState } from "react";

const SysAdminViewPartner = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState(null); // Add this line
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Mock user data for demonstratio

  // Mock user data for demonstration

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/user/partner");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleEdit = (userID) => {
    // Edit logic
    console.log(`Edit user with ID: ${userId}`);
  };

  const handleDeleteClick = (user) => {
    setSelectedUsers(user);
    setShowConfirmation(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/edit/partner/${selectedUsers.UserID}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Successful deletion
        console.log("Partner deleted successfully");
        window.location.reload(); // Reload the page or update the partners state as needed
      } else {
        // Handle the error
        console.error("Error deleting partner:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting partner:", error);
    } finally {
      // Close the confirmation dialog
      handleDeleteCancel();
    }
  };

  const handleDeleteCancel = () => {
    setSelectedUsers(null);
    setShowConfirmation(false);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(users.length / usersPerPage);
  return (
    <div className="flex flex-col min-h-screen bg-[#F9D548] text-[#0A2A67]">
      <SysAdminNavBar />
      <div className="flex flex-col items-start flex-1">
        <div className="container mx-auto p-4">
          <div className="flex items-center">
            <h2 className="text-6xl font-black">Partner Accounts</h2>
            <button className="bg-[#0A2A67] hover:bg-blue-900 text-white font-bold py-2 px-4 rounded ml-5">
              <Link href="/AccountInfo/PartnerInfo">Partner Info</Link>
            </button>
          </div>
        </div>
        <div className="container mx-auto p-4 flex-1">
          <div className="bg-white rounded-2xl overflow-x-auto shadow-lg mt-5">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2">UserID</th>
                  <th className="border p-2">Username</th>
                  <th className="border p-2">Password</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">First Name</th>
                  <th className="border p-2">Last Name</th>
                  <th className="border p-2">Gender</th>
                  <th className="border p-2">Date of Birth</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr key={user.UserID}>
                    <td className="border p-2 text-center">{user.UserID}</td>
                    <td className="border p-2 text-center">{user.Username}</td>
                    <td className="border p-2 text-center">{user.password}</td>
                    <td className="border p-2 text-center">{user.email}</td>
                    <td className="border p-2 text-center">{user.FName}</td>
                    <td className="border p-2 text-center">{user.LName}</td>
                    <td className="border p-2 text-center">{user.gender}</td>
                    <td className="border p-2 text-center">{user.dob}</td>
                    <td className="border p-2">
                      <div className="flex justify-center">
                        {/* Edit/Delete buttons */}
                        <button
                          onClick={() => handleEdit(user.UserID)} // Replace handleEdit with your edit function
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                        >
                          Edit
                        </button>
                        <button
      onClick={() => handleDeleteClick(user)} // Use 'user'
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    >
      Delete
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
          {showConfirmation && (
            <DeleteUser user={selectedUsers} onConfirm={handleDeleteConfirm} onCancel={handleDeleteCancel} />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SysAdminViewPartner;
