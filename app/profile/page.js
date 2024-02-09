"use client";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";
import Modal from "@/components/Modal";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaTimes } from 'react-icons/fa';

const Accountpage = () => {
  const [userRole, setUserRole] = useState("user");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState({
    username: "",
    gender: "",
    dob: "",
    email: "",
    FName: "",
    LName: "",
    sub: ""
  });
  const [loading, setIsLoading] = useState(true);
  const router = useRouter();
  const [isPasswordResetOpen, setIsPasswordResetOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isOldPasswordHidden, setIsOldPasswordHidden] = useState(true);

  const openPasswordResetModal = () => {
    setIsPasswordResetOpen(true);
  };

  const closePasswordResetModal = () => {
    setIsPasswordResetOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchUserType = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/user/userType",
          {
            method: "POST",
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUserRole(data.userType || "user"); // Set the userRole based on the response
        } else {
          console.error("Error fetching user type:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user type:", error.message);
      }
    };

    // Fetch user type when the component mounts
    fetchUserType();
  }, []);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);

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
          LName: userProfile.LName,
          sub: userProfile.Paid
        });
      } else if (response.status === 401) {
        console.error("Unauthorized access");
        router.push("/loginPage"); // Redirect to login page if not authenticated
      } else if (response.status === 404) {
        console.error("User not found");
      } else {
        console.error("Failed to fetch profile");
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error during profile fetch:", error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/profile/verify-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          oldPassword,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          console.log("Password updated successfully");
          setOldPassword('');
          router.push('/resetPassword'); // Redirect to the profile page
        } else {
          setErrorMessage('Failed to update password.');
        }
      } else {
        const errorData = await response.json();
        console.error('Update Password failed:', errorData);
        setErrorMessage(errorData.error);
      }
    } catch (error) {
      console.error("Error updating password:", error.message);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
        <LoadingSpinner />
      </div>
    );
  }

  // Check if the user is not authenticated, then redirect
  if (!user || !user.username) {
    router.push("/loginPage");
    return null;
  }
  return (
    <div className="flex flex-col h-full bg-[#F9D548]">
      <Navbar userRole={userRole} />

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
          <div className="w-1/3 float-right justify-items-end text-center">
            <Image
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
          <div className="flex flex-row mt-9 gap-4">
            <p className="flex flex-row text-xl text-black font-semibold">
              Subscription :
            </p>
            <p className="text-xl text-black">{user.sub}</p>
          </div>

          <form onSubmit={handleResetPassword}>
            {isPasswordResetOpen && (
              <div>
                {/*Display Box before access to reset password page*/}
                <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50">
                  <div className="bg-white rounded-[12px] shadow-lg w-1/4 h-1/3 relative">
                    <button 
                      onClick={() => window.history.back()} 
                      className="absolute top-0 right-0 m-4 text-2xl"
                    >
                      <FaTimes />
                    </button>

                    <div className="px-4 py-2 text-center text-2xl text-black font-bold mt-6">
                      <h3>Enter your Password <br /> to Reset Password</h3>
                    </div>

                    <div className="flex flex-row mt-9 gap-4">
                      <label className="flex flex-row text-lg text-black font-medium ml-6 mt-2">Enter password :</label>
                        <input 
                          type={isOldPasswordHidden ? "password" : "text"} 
                          value={oldPassword} 
                          onChange={(e) => setOldPassword(e.target.value)} 
                          className="text-lg text-black w-[248px] h-12 rounded-[10px] border p-2"
                          placeholder="Enter Old Password"
                          required 
                        />
                        <button 
                          onClick={() => setIsOldPasswordHidden(!isOldPasswordHidden)}
                          className="flex items-center cursor-pointer -ml-12">
                          <Image 
                              src={isOldPasswordHidden ? "/hide.png" : "/show.png"} 
                              alt="Toggle password visibility" 
                              width={20} 
                              height={20} 
                          />
                        </button>
                    </div>
                        
                    {errorMessage && <p className="text-red-500 font-bold text-lg flex justify-center items-center mt-2">{errorMessage}</p>}
                        
                    <div className="flex justify-center items-center w-100 p-3 mt-4">
                      <button
                        type="submit"
                        className="w-[250px] h-9 bg-blue-950 hover:bg-[#154083] text-white font-bold text-xl rounded-[10px] shadow"
                      >
                      Enter
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>

          <div className="flex flex-row mt-20 gap-4">
            <Link href="/profile/editAccount">
              <button className="w-[250px] h-9 bg-blue-950 hover:bg-[#154083] text-white font-bold text-xl rounded-[10px] shadow">
                Edit
              </button>
            </Link>

            <button
              className="w-[250px] h-9 bg-blue-950 hover:bg-[#154083] text-white font-bold text-xl rounded-[10px] shadow"
              onClick={openPasswordResetModal} // Add this onClick handler
            >
              Reset Password
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
