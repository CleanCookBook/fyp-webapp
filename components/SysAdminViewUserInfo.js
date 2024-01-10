import React, { useState, useEffect } from "react";
import SysAdminNavBar from "./SysAdminNavBar";
import Footer from "./Footer";

const SysAdminViewUserInfo = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  // Mock user data for demonstration
  const users = [
    {
      id: 1,
      height: "175 cm",
      weight: "75 kg",
      age: 31,
      allergies: "Peanuts, Shellfish",
      dietaryPreferences: "Vegetarian",
      healthGoals: "Loose Weight",
      dietMethod: "Intermitten Fasting",
      cookTime: "1 hour",
      bmi: "24.5",
    },
    {
      id: 2,
      height: "160 cm",
      weight: "60 kg",
      age: 33,
      allergies: "Dairy",
      dietaryPreferences: "Gluten-free",
      healthGoals: "Gain Muscles",
      dietMethod: "High Protien Diet",
      cookTime: "30 minutes",
      bmi: "23.4",
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
            <h2 className="text-6xl font-black">User Information</h2>
            <button className="bg-[#0A2A67] hover:bg-blue-900 text-white font-bold py-2 px-4 rounded ml-5">
              User Accounts
            </button>
          </div>
        </div>
        <div className="container mx-auto p-4 flex-1">
          <div className="bg-white rounded-2xl overflow-x-auto shadow-lg mt-5">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2">UserID</th>
                  <th className="border p-2">Height</th>
                  <th className="border p-2">Weight</th>
                  <th className="border p-2">Age</th>
                  <th className="border p-2">Allergies</th>
                  <th className="border p-2">Dietary Preferences</th>
                  <th className="border p-2">Health Goals</th>
                  <th className="border p-2">Diet Method</th>
                  <th className="border p-2">Amount of Time to Cook</th>
                  <th className="border p-2">BMI</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="border p-2 text-center">{user.id}</td>
                    <td className="border p-2 text-center">{user.height}</td>
                    <td className="border p-2 text-center">{user.weight}</td>
                    <td className="border p-2 text-center">{user.age}</td>
                    <td className="border p-2 text-center">{user.allergies}</td>
                    <td className="border p-2 text-center">
                      {user.dietaryPreferences}
                    </td>
                    <td className="border p-2 text-center">
                      {user.healthGoals}
                    </td>
                    <td className="border p-2 text-center">
                      {user.dietMethod}
                    </td>
                    <td className="border p-2 text-center">{user.cookTime}</td>
                    <td className="border p-2 text-center">{user.bmi}</td>
                    <td className="border p-2">
                      <div className="flex justify-center">
                        {/* Edit/Delete buttons */}
                        <button
                          onClick={() => handleEdit(user.id)} // Replace handleEdit with your edit function
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)} // Replace handleDelete with your delete function
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SysAdminViewUserInfo;
