import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import Modal from "./Modal"; // Adjust the path based on your file structure
import Navbar from "./Navbar";

const Accountpage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState({
    username: "",
    gender: "",
    dob: "",
    email: "",
    FName: "",
    LName: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchProfile = async () => {
    try {
      setIsLoading(true); // Set loading to true when starting the fetch

      const response = await fetch("http://localhost:3001/api/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        const userProfile = data.userProfile;

        setUser({
          username: userProfile.Username,
          gender: userProfile.gender,
          dob: userProfile.dob,
          email: userProfile.email,
          FName: userProfile.FName,
          LName: userProfile.LName
        });
      } else if (response.status === 401) {
        console.error("Unauthorized access");
      } else if (response.status === 404) {
        console.error("User not found");
      } else {
        console.error("Failed to fetch profile");
      }

      setIsLoading(false); // Set loading to false when the fetch is complete
    } catch (error) {
      console.error("Error during profile fetch:", error.message);
      setIsLoading(false); // Set loading to false in case of an error
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="flex flex-col h-full bg-[#F9D548]">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="lg:w-4/5 lg:pr-8 p-8 flex flex-col h-screen bg-[#F9D548] text-[#0A2A67] justify-start items-start ml-20">
        <div className="w-full max-w-md flex flex-row mt-7">
          <Image
            src="/logo.jpg"
            alt="Profile Picture"
            width={150}
            height={150}
            className="rounded-full shadow-lg"
          />
          <div className="flex flex-col mt-9 ml-8 gap-1">
            <h1 className="flex flex-row text-2xl font-bold text-black">
            {user.FName} {user.LName}
            </h1>
            <p className="text-xl text-black">@ {user.username}</p>
          </div>
        </div>

        <div>
          {/* Division 1 - 1/3 width */}
          <div className="w-1/3 float-right justify-items-end text-center">
            <img
              src="Fish&chips.jpg"
              alt="Homemade Fish & Chips Image"
              className="w-full max-w-screen-xl mr-96 rounded-2xl shadow-2xl shadow-black"
            />
          </div>
          <h2 className="text-xl underline font-bold left-10 mt-9">
            General Settings
          </h2>
          <div className="flex flex-row mt-9 gap-4">
            <p className="text-xl text-black font-semibold">Name :</p>
            <p className="text-xl text-black">
              {user.FName} {user.LName}
            </p>
          </div>

          <div className="flex flex-row mt-9 gap-4">
            <p className="flex flex-row text-xl text-black font-semibold">
              Date of Birth :
            </p>
            <p className="text-xl text-black">{user.dob}</p>
          </div>
          <div className="flex flex-row mt-9 gap-4">
            <p className="flex flex-row text-xl text-black font-semibold">
              Gender :
            </p>
            <p className="text-xl text-black">{user.gender}</p>
          </div>
          <div className="flex flex-row mt-9 gap-4">
            <p className="flex flex-row text-xl text-black font-semibold">
              E-mail :
            </p>
            <p className="text-xl text-black">{user.email}</p>
          </div>
          <div className="flex flex-row mt-20 gap-4">
            <Link href="/editAccount">
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

export default Accountpage;