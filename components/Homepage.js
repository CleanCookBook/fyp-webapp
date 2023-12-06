import Image from "next/image";
import { useState } from "react";
import Footer from "./Footer";
import Modal from "./Modal"; // Adjust the path based on your file structure
import Navbar from "./Navbar";

const Homepage = () => {
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
        <h1 className="text-7xl font-black py-5">Whats Cooking Today?</h1>
        <div className="w-[748px] bg-white rounded-[20px] flex items-center text-sm p-2 pl-9 text-stone-300">
          <p>Search our library of recipes</p>
          <div className="ml-auto m-[5px]">
            <button onClick={openModal}>
              <Image
                src="/filter.png"
                alt="Filter"
                width={20}
                height={20}
                style={{ filter: "brightness(0)" }}
              />
            </button>
          </div>
        </div>
      </div>
      <Footer />
      {isModalOpen && <Modal onClose={closeModal} />}
    </div>
  );
};

export default Homepage;
