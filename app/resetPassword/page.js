"use client";
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

const ResetPasswordForm = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const userRole = 'user'; 
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isOldPasswordHidden, setIsOldPasswordHidden] = useState(true);
    const [isNewPasswordHidden, setIsNewPasswordHidden] = useState(true);
    const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(true);
    const [isNewPasswordValid, setIsNewPasswordValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);

    const router = useRouter();
    const [formData, setFormData] = useState({
        username: "",
        name : "",
    })

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

const submitForm = async (e) => {
    e.preventDefault();
    
    let isValid = true;

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
    if (!passwordRegex.test(newPassword)) {
      setIsPasswordValid(false);
      isValid = false;
      return;
    } else {
      setIsPasswordValid(true);
    }

    // Validate New Password
    if (newPassword !== confirmNewPassword) {
      setIsNewPasswordValid(false);
      isValid = false;
    } else {
      setIsNewPasswordValid(true);
    }

    if (!isValid) {
        return; // Don't proceed with the fetch request if any validation fails
    }

    try {
        const response = await fetch("http://localhost:3001/api/profile/update-password", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              oldPassword,
              newPassword,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            if (data.success) {
              console.log("Password updated successfully");
              setOldPassword('');
              setNewPassword('');
              setConfirmNewPassword('');
              router.push('/profile'); // Redirect to the profile page
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
          <p className="text-xl text-black">@ {formData.username}</p>
        </div>
    </div>

    <form action="/reset-password" method="POST" onSubmit={submitForm}>
        <div>
          {/* Division 1 - 1/3 width */}
          <div className="w-1/3 float-right justify-items-end text-center">
            <img
              src="Fish&chips.jpg"
              alt="Homemade Fish & Chips Image"
              className="w-full max-w-screen-xl mr-96 rounded-2xl shadow-2xl shadow-black"
            />
          </div>
            <h2 className="text-xl underline font-bold left-10 mt-9">Password Settings</h2>
            <div className="flex flex-row mt-9 gap-4">
                <label className="flex flex-row text-xl text-black font-semibold mt-2">Old password :</label>
                    <input 
                        type={isOldPasswordHidden ? "password" : "text"} 
                        value={oldPassword} 
                        onChange={(e) => setOldPassword(e.target.value)} 
                        className="text-xl text-black w-[648px] h-12 rounded-[10px] border p-2"
                        placeholder="Enter Old Password"
                        required />
                    <button 
                        onClick={() => setIsOldPasswordHidden(!isOldPasswordHidden)}
                        className="flex items-center cursor-pointer -ml-12">
                    <Image 
                        src={isOldPasswordHidden ? "/hide.png" : "/show.png"} 
                        alt="Toggle password visibility" 
                        width={20} 
                        height={20} />
                    </button>
            </div>
            {errorMessage && <p className="text-red-500 font-bold text-lg mt-1">{errorMessage}</p>}
            
            <div className="flex flex-row mt-9 gap-4">
                <label className="flex flex-row text-xl text-black font-semibold mt-2">New password :</label>
                <input 
                    type={isNewPasswordHidden ? "password" : "text"} 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    className="text-xl text-black w-[637px] h-12 rounded-[10px] border p-2"
                    placeholder="Enter New Password"
                    required />
                <button 
                    onClick={() => setIsNewPasswordHidden(!isNewPasswordHidden)}
                    className="flex items-center cursor-pointer -ml-12">
                <Image 
                    src={isNewPasswordHidden ? "/hide.png" : "/show.png"} 
                    alt="Toggle password visibility" 
                    width={20} 
                    height={20} />
                </button>
            </div>
            {!isPasswordValid && (
                <p className="text-red-500 font-bold text-lg mt-1">Password must contain at least 6 characters, 1 uppercase letter, and 1 symbol.</p>
            )}

            <div className="flex flex-row mt-9 gap-4">
                <label className="flex flex-row text-xl text-black font-semibold mt-2">Confirm new password :</label>
                <input 
                    type={isConfirmPasswordHidden ? "password" : "text"} 
                    value={confirmNewPassword} 
                    onChange={(e) => setConfirmNewPassword(e.target.value)} 
                    className="text-xl text-black w-[550px] h-12 rounded-[10px] border p-2"
                    placeholder="Confirm New Password"
                    required />
                <button 
                    onClick={() => setIsConfirmPasswordHidden(!isConfirmPasswordHidden)}
                    className="flex items-center cursor-pointer -ml-12">
                <Image 
                    src={isConfirmPasswordHidden ? "/hide.png" : "/show.png"} 
                    alt="Toggle password visibility" 
                    width={20} 
                    height={20} />
                </button>
            </div>
            {!isNewPasswordValid && (
                <p className="text-red-500 font-bold text-lg mt-1">New passwords don't match.</p>
            )}
            
            <div className="flex flex-row mt-20 gap-4">
                <Link href="/profile">
                    <button
                        type="submit" 
                        onClick={submitForm}
                        className="w-[250px] h-9 bg-blue-950 hover:bg-[#154083] text-white font-bold text-xl rounded-[10px] shadow"
                    >
                        Reset Password
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

export default ResetPasswordForm;

