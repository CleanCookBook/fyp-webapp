"use client";
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { FaTimes } from 'react-icons/fa';

const VerifyPasswordForm = () => {
    const [oldPassword, setOldPassword] = useState('');
    const userRole = 'user';  
    const [errorMessage, setErrorMessage] = useState('');
    const [isOldPasswordHidden, setIsOldPasswordHidden] = useState(true);
    const [loading, setIsLoading] = useState(true);
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  

    useEffect(() => {
      const checkAuthentication = async () => {
        try {
          const response = await fetch("http://localhost:3001/api/check-auth", {
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
  

const submitPass = async (e) => {
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

    <form onSubmit={submitPass}>
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
                            required />
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
    </form>
        
    </div>
    <Footer />
</div>
  );
};

export default VerifyPasswordForm;