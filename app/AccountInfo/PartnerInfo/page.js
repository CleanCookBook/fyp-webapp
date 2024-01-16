"use client";
import Footer from "@/components/Footer";
import ImageModel from "@/components/ImageModel";
import SysAdminNavBar from "@/components/SysAdminNavBar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function SysAdminViewPartnerInfo() {
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [partnersInfo, setPartnersInfo] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPartnerInfo = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/user/partnerInfo");
        const data = await response.json();
        setPartnersInfo(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchPartnerInfo();
  }, []);

  const handleEdit = (userId) => {
    // Edit logic
    console.log(`Edit user with ID: ${userId}`);
    router.push(`/AccountInfo/EditBPInfo?UserID=${userId}`);
  };


  const handleImageClick = (imageData) => {
    console.log("Image clicked");
    setSelectedImage(imageData);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

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
          <div className="flex items-center">
            <h2 className="text-6xl font-black">Partner Information</h2>
            <button className="bg-[#0A2A67] hover:bg-blue-900 text-white font-bold py-2 px-4 rounded ml-5">
              <Link href="/AccountInfo/ViewPartner">
              Partner Accounts
              </Link>
            </button>
          </div>
        </div>
        <div className="container mx-auto p-4 flex-1">
          <div className="bg-white rounded-2xl overflow-x-auto shadow-lg mt-5">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2">UserID</th>
                  <th className="border p-2">LinkedIn URL</th>
                  <th className="border p-2">License Image</th>
                  <th className="border p-2">User Photo</th>
                  <th className="border p-2">Experience File</th>
                  <th className="border p-2">Testimony File</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {partnersInfo.map((user) => (
                  <tr key={user.id}>
                    <td className="border p-2 text-center">{user.UserID}</td>
                    <td className="border p-2 text-center">
                      {user.LinkedInURL}
                    </td>
                    <td className="border p-2 text-center">
                      <img
                        src={`data:image/jpeg;base64,${user.LicenseImage}`}
                        alt="License"
                        className="w-24 h-24 object-cover"
                        onClick={() => handleImageClick(user.LicenseImage)} />
                    </td>
                    <td className="border p-2 text-center">
                      <img
                        src={`data:image/jpeg;base64,${user.UserPhoto}`}
                        alt="User"
                        className="w-24 h-24 object-cover"
                        onClick={() => handleImageClick(user.UserPhoto)} />
                    </td>
                    <td className="border p-2 text-center">
                      <img
                        src={`data:image/jpeg;base64,${user.ExperienceFile}`}
                        alt="Experience"
                        className="w-24 h-24 object-cover"
                        onClick={() => handleImageClick(user.ExperienceFile)} />
                    </td>
                    <td className="border p-2 text-center">
                      <img
                        src={`data:image/jpeg;base64,${user.TestimonyFile}`}
                        alt="Testimony"
                        className="w-24 h-24 object-cover"
                        onClick={() => handleImageClick(user.TestimonyFile)} />
                    </td>
                    <td className="border p-2">
                      <div className="flex justify-center">
                        <button
                          onClick={() => handleEdit(user.UserID)}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                        >
                          Edit
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
              onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
              className="mx-1 px-3 py-1 hover:font-extrabold"
            >
              &lt;
            </button>
            {[...Array(Math.ceil(partnersInfo.length / usersPerPage))].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`mx-1 px-3 py-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white font-extrabold' : 'hover:font-extrabold'}`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))}
              className="mx-1 px-3 py-1 hover:font-extrabold"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
      <Footer />
      {selectedImage && <ImageModel imageURL={selectedImage} onClose={handleCloseModal} />}
    </div>
  );
}

export default SysAdminViewPartnerInfo;
