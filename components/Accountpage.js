import Image from "next/image";
import { useState } from "react";
import Footer from "./Footer";
import Modal from "./Modal"; // Adjust the path based on your file structure
import Navbar from "./Navbar";

const Accountpage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col h-screen bg-[#F9D548]">
      <Navbar />
      <div className="flex flex-col h-screen bg-[#F9D548] text-[#0A2A67] justify-center items-center">
      <div className="w-full max-w-md">
        <h2 className="text-xl underline font-bold left-10">Hello!</h2>
        
        <form action="/update-account" method="post">
          <div className="flex flex-row mb-4">
            <label className="w-1/3">Name:</label>
            <input type="text" name="name" className="w-2/3 border p-2" />
          </div>

          <div className="flex flex-row mb-4">
            <label className="w-1/3">Date of Birth:</label>
            <input type="date" name="dob" className="w-2/3 border p-2" />
          </div>

          <div className="flex flex-row mb-4">
            <label className="w-1/3">Gender:</label>
            <select name="gender" className="w-2/3 border p-2">
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="flex flex-row mb-4">
            <label className="w-1/3">E-mail:</label>
            <input type="email" name="email" className="w-2/3 border p-2" />
          </div>

          <div className="flex flex-row mb-4">
            <label className="w-1/3">Height:</label>
            <input type="number" name="height" className="w-2/3 border p-2" />
          </div>

          <div className="flex flex-row mb-4">
            <label className="w-1/3">Weight:</label>
            <input type="number" name="weight" className="w-2/3 border p-2" />
          </div>
        
          <div className="pt-3">
            <button type="submit" className="w-[170px] h-7 bg-blue-950 hover:bg-[#154083] text-white font-bold text-sl rounded-[10px] shadow">
            Confirm Update
            </button>
          </div>

        </form>
      </div>
    </div>
      <Footer />
      {isModalOpen && <Modal onClose={closeModal} />}
    </div>
  );
};

export default Accountpage;
