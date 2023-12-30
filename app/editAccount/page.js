"use client";
import Footer from "@/components/Footer";
import Modal from "@/components/Modal"; // Adjust the path based on your file structure
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";


const EditAccount = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: "",
        name : "",
        dob : "",
        gender : "",
        email : "",
    })

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleInput = (e) => {
        const fieldName = e.target.name
        const fieldValue = e.target.value
        setFormData((prevState) => ({
        ...prevState,
        [fieldName]: fieldValue
      }));
    }
   // ...

const submitForm = async (e) => {
  e.preventDefault();

  try {
      const response = await fetch("http://localhost:3001/api/profile/update-profile", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
      });

      if (response.ok) {
          const data = await response.json();
          if (data.success) {
              console.log("Profile updated successfully");
              router.push('/profile');
              // You might want to perform additional actions after a successful update
          } else {
              console.error("Failed to update profile");
          }
      } else if (response.status === 401) {
          console.error("Unauthorized access");
      } else {
          console.error("Failed to update profile");
      }
  } catch (error) {
      console.error("Error updating profile:", error.message);
  }
};

// ...


  useEffect(() => {
      // Fetch user data when the component mounts
      const fetchUserData = async () => {
          try {
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

                  setFormData({
                      username:userProfile.Username,
                      name: userProfile.FName + " " + userProfile.LName,
                      dob: userProfile.dob,
                      gender: userProfile.gender,
                      email: userProfile.email,
                  });
              } else if (response.status === 401) {
                  console.error("Unauthorized access");
              } else if (response.status === 404) {
                  console.error("User not found");
              } else {
                  console.error("Failed to fetch profile");
              }
          } catch (error) {
              console.error("Error during profile fetch:", error.message);
          }
      };

      fetchUserData();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts


return (
<div className="flex flex-col h-full bg-[#F9D548]">
    <Navbar />
    <div className=" lg:w-4/5 lg:pr-8 p-8 flex flex-col h-screen bg-[#F9D548] text-[#0A2A67] justify-start items-start  ml-20">
    <div className="w-full max-w-md flex flex-row mt-7">
        <Image
            src="/logo.jpg"
            alt="Profile Picture"
            width={150}
            height={150}
            className="rounded-full shadow-lg"
        />
        <div className="flex flex-col mt-9 ml-8 gap-1">
          <h1 className="flex flex-row text-2xl font-bold text-black">{formData.name}</h1>
          <p className="text-xl text-black">{formData.username}</p>
        </div>
    </div>

    <form action="/update-account" method="POST" onSubmit={submitForm}>
        <div>
            <h2 className="text-xl underline font-bold left-10 mt-9">General Settings</h2>
            <div className="flex flex-row mt-9 gap-4">
                <label className="flex flex-row text-xl text-black font-semibold mt-2">Name :</label>
                <input 
                  className="text-xl text-black w-[748px] h-12 rounded-[10px] border p-2" 
                  type="text" 
                  name="name" 
                  onChange={handleInput} 
                  value={formData.name} 
                  placeholder="Enter new name" />
            </div>
            <div className="flex flex-row mt-9 gap-4">
                <label className="flex flex-row text-xl text-black font-semibold mt-2">Date of Birth :</label>
                <input 
                  className="text-xl text-black w-[308px] h-12 rounded-[10px] border p-2" 
                  type="date" 
                  name="dob" 
                  onChange={handleInput} 
                  value={formData.dob} />
            </div>
            <div className="flex flex-row mt-9 gap-4">
                <label className="flex flex-row text-xl text-black font-semibold mt-2">Gender :</label>
                <select
                  className="text-xl text-black w-[735px] h-12 rounded-[10px] border p-2" 
                  type="text" 
                  name="gender" 
                  onChange={handleInput} 
                  value={formData.gender}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div className="flex flex-row mt-9 gap-4">
                <label className="flex flex-row text-xl text-black font-semibold mt-2">E-mail :</label>
                <input 
                  className="text-xl text-black w-[745px] h-12 rounded-[10px] border p-2" 
                  type="text" 
                  name="email" 
                  onChange={handleInput} 
                  value={formData.email} 
                  placeholder="Enter new e-mail" />
            </div>
            <div className="flex flex-row mt-20 gap-4">
            <Link href="/profile">
            <button
                         type="submit" 
                        onClick={submitForm}
                        className="w-[250px] h-9 bg-blue-950 hover:bg-[#154083] text-white font-bold text-xl rounded-[10px] shadow"
                    >
                Confirm Update
              </button>
            </Link>
            </div>
        </div>
    </form>
        
    </div>
    <Footer />
        {isModalOpen && <Modal onClose={closeModal} />}
</div>
  );
};

export default EditAccount;
