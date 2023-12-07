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
      <div className=" lg:w-4/5 lg:pr-8 p-8 flex flex-col h-screen bg-[#F9D548] text-[#0A2A67] justify-start items-start">
      <div className="w-full max-w-md flex flex-row">
        <Image
            src="/logo.jpg"
            alt="Profile Picture"
            width={150}
            height={150}
            className="rounded-full shadow-lg"
        />
        <div className="flex flex-col mt-8 ml-8 gap-4">
          <h1 className="flex flex-row text-xl font-bold">Clean Cook Book</h1>
          <p className="text-sm text-gray-500">@Cleancookbook</p>
        </div>
    </div>
    <div>
        <h2 className="text-xl underline font-bold left-10 mt-5">General Setting</h2> 
        </div>
    </div>
      <Footer />
      {isModalOpen && <Modal onClose={closeModal} />}
    </div>
  );
};

export default Accountpage;
