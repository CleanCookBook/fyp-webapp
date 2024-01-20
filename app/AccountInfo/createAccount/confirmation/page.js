"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

const Confirmation = () => {
  const router = useRouter();
  const userRole = 'system admin';
  const [isChecked, setIsChecked] = useState(false);
  const [userType, setUserType] = useState("user");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const userTypeFromQuery = params.get("userType");
    setUserType(userTypeFromQuery === "nutritionist" ? "nutritionist" : "user");
  }, []);

  const handleCheckChange = (event) => {
    setIsChecked(event.target.checked);
    if (!event.target.checked) {
      document.getElementById('required-error').classList.remove('hidden');
    } else {
      document.getElementById('required-error').classList.add('hidden');
    }
  };

  const createUserAccount = async () => {
    if (isChecked) {
      try {
        const response = await fetch('http://localhost:3001/api/user/create-account', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ checked: isChecked }),
        });

        if (response.ok) {
          // Successfully created account, navigate to the home page
          console.log('Account created successfully');
          router.push('/home/SysAdminHome'); // Change '/home' to the actual path of your home page
        } else {
          console.error('Error creating account:', response.statusText);
        }
      } catch (error) {
        console.error('Error creating account:', error.message);
      }
    } else {
      // Handle the case where the checkbox is not checked
      document.getElementById('required-error').classList.remove('hidden');
    }
  };

  const createNutritionistAccount = async () => {
    // Implement the API call for creating a nutritionist account
    // Adjust the API endpoint and request format accordingly
    try {
      const response = await fetch('http://localhost:3001/api/user/create-account-n', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ checked: isChecked }),
      });

      if (response.ok) {
        // Successfully created nutritionist account, navigate to the nutritionist dashboard
        console.log('Nutritionist account being submitted');
        router.push('/home/SysAdminHome'); // Change to the actual path of your nutritionist dashboard
      } else {
        console.error('Error creating nutritionist account:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating nutritionist account:', error.message);
    }
  };

return (
  <div className="h-screen bg-[#F9D548] text-[#0A2A67]">
    <Navbar userRole={userRole} />
    <div className="h-screen bg-[#F9D548] text-[#0A2A67] flex-grow">
      <div className="flex-grow lg:pr-8 p-8 flex flex-col items-center">
        <div className="flex justify-center items-center ml-86">
          <h1 className="text-5xl font-black text-[#0A2A67] mb-4 mt-2">
            User's account is now ready for launch!
          </h1>
        </div>
      </div>

      <div className="bg-white w-[990px] h-[585px] mx-auto font-black text-2xl shadow-md flex-row -mt-4">
        <p className="text-xl font-bold flex py-5 px-5 top-0 left-75"></p>
        <div className="flex space-x-2 justify-end items-center cursor-pointer mt-8">
          <img
            src="/chef.gif"  // Replace with the correct path to your GIF file
            alt="Your alt text"
            className="flex justify-center items-center ml-50 -mt-4"
          />
          <input
            type="checkbox"
            id="required-checkbox"
            checked={isChecked}
            onChange={handleCheckChange}
            className="form-checkbox h-3 w-3 text-blue-600 -mt-[76px] mr-8">
          </input>
          <label htmlFor="required-checkbox">
            <p className="text-gray-900 text-sm font-medium -mt-12 mr-8"> The account is validated and ready for launch.</p>
          </label>
          <span
            id="required-error"
            className={`text-sm text-red-500 absolute left-90 ${
            isChecked ? 'hidden' : ''
            }`}>
            <p className="flex flex-col mr-6 -mt-20">*Please check this box if you want to proceed.</p>
          </span>
        </div>
        <div className="flex justify-center items-center mt-3">
          {isChecked && (
            <button
              onClick={userType === "nutritionist" ? createNutritionistAccount : createUserAccount}
              className="w-[259px] h-[35px] bg-blue-950 hover:bg-[#154083] text-white text-xl font-bold rounded-[10px] drop-shadow-xl mt-4">
              Create Account {userType === "nutritionist" ? "(N)" : "(U)"}
            </button>
          )}
        </div>

      </div>
    
    </div> 
    <Footer />
  </div>
);
};

export default Confirmation;

