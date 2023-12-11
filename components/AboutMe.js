import Image from "next/image";
import { useState } from "react";
import Footer from "./Footer";
import Modal from "./Modal"; // Adjust the path based on your file structure
import Navbar from "./Navbar";
import Link from 'next/link';

const AboutMe = () => {
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
    <div className="w-full max-w-md flex flex-row mt-7">
        <Image
            src="/logo.jpg"
            alt="Profile Picture"
            width={150}
            height={150}
            className="rounded-full shadow-lg"
        />
        <div className="flex flex-col mt-9 ml-8 gap-1">
          <h1 className="flex flex-row text-2xl font-bold text-black">Clean Cook Book</h1>
          <p className="text-xl text-black">@Cleancookbook</p>
        </div>
    </div>

    <div>
        <h2 className="text-xl underline font-bold left-10 mt-9">Dietary Settings</h2>
        <div className="flex flex-row mt-9 gap-4">
            <p className="flex flex-row text-xl text-black font-semibold">Dietary Preferences :</p>
            <p className="text-xl text-black">Gluten-free</p>
        </div>
        <div className="flex flex-row mt-9 gap-4">
            <p className="flex flex-row text-xl text-black font-semibold">Allergies :</p>
            <p className="text-xl text-black">Nuts</p>
        </div>
        <div className="flex flex-row mt-9 gap-4">
            <p className="flex flex-row text-xl text-black font-semibold">Health Goals :</p>
            <p className="text-xl text-black">Weight Loss</p>
        </div>
        <div className="flex flex-row mt-9 gap-4">

        </div>
        <div className="flex flex-row mt-28 gap-4">
            <Link href="/editAboutMe">
                <button className="w-[250px] h-9 bg-blue-950 hover:bg-[#154083] text-white font-bold text-xl rounded-[10px] shadow">
                    Edit
                </button>
            </Link>
            
            <button className="w-[250px] h-9 bg-blue-950 hover:bg-[#154083] text-white font-bold text-xl rounded-[10px] shadow">
                <a href="#">Reset Password</a>
            </button>
        </div>
        
      
    </div>
    </div>
    <Footer />
        {isModalOpen && <Modal onClose={closeModal} />}
</div>
  );
};

export default AboutMe;