"use client";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";
import Modal from "@/components/Modal"; // Adjust the path based on your file structure
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";


const EditAccount = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState('');
    const userRole = 'user';  
    const [initialEmail, setInitialEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true);
    const router = useRouter();
    const [loading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        const checkAuthentication = async () => {
          try {
            const response = await fetch("https://ccb-backendd.onrender.com/api/check-auth", {
              method: "GET",
              credentials: "include",
            });
    
            if (response.ok) {
              setIsAuthenticated(true);
              
            } else {
              router.push('/loginPage');
            }
          } catch (error) {
            console.error('Error during authentication check:', error.message);
          } finally {
            // Set loading to false when authentication check is complete
            setIsLoading(false);
          }
        };
    
        checkAuthentication();
      }, [router]);
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

      if (fieldName === 'email') {
        setEmail(fieldValue);
      }
    }

   

const submitForm = async (e) => {
  e.preventDefault();
  
  let isValid = true;

    // Validate email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Get the value from the email field
    const finalEmail = formData.email !== initialEmail ? formData.email : initialEmail;

    if (!emailRegex.test(finalEmail)) {
        setIsEmailValid(false);
        isValid = false;
    } else {
        setIsEmailValid(true);
    }

    if (!isValid) {
        return; // Don't proceed with the fetch request if any validation fails
    }

  try {
      const response = await fetch("https://ccb-backendd.onrender.com/api/profile/update-profile", {
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
              const response = await fetch("https://ccb-backendd.onrender.com/api/profile", {
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

                  setInitialEmail(userProfile.email);
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

  if (!isAuthenticated) {
    // If not authenticated, the user will be redirected during authentication check
    return null;
  }

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
        <LoadingSpinner />
      </div>
    );
  }
return (
<div className="flex flex-col h-full bg-[#F9D548]">
   <Navbar userRole={userRole} />
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
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
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
            {!isEmailValid && (
                <p className="text-red-500 font-bold text-lg mt-1">Please enter a valid email address.</p>
            )}
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
