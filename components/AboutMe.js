import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

const AboutMe = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState({
    FName: '',
    Username: '',
    DietaryPreferance: '',
    allergy: '',
    HealthGoal: '',
    height: '',
    Weight: '',
    BMI: '',
    DietMethod: '', // Corrected the variable name
    // Add other user data properties
  });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchAboutMeData = async () => {
    try {
        const response = await fetch('http://localhost:3001/api/aboutme', {
          method: 'GET',
          credentials: 'include',
        });
    
        if (response.ok) {
          const data = await response.json();
          setUserData({
            FName: data.FName,
            Username: data.Username,
            DietaryPreferance: data.DietaryPreferance ? JSON.parse(data.DietaryPreferance) : '',
            allergy: data.allergy ? JSON.parse(data.allergy) : '',
            DietMethod: data.DietMethod ? JSON.parse(data.DietMethod) : '',
            HealthGoal: data.HealthGoal ? JSON.parse(data.HealthGoal) : '',
            height: data.height,
            Weight: data.Weight,
            BMI: data.BMI,
          });
        } else if (response.status === 401) {
          console.error('Unauthorized access');
          router.push('/login');
        } else {
          console.error('Failed to fetch user data');
        }
    
        setIsLoading(false);
      } catch (error) {
        console.error('Error during user data fetch:', error.message);
        setIsLoading(false);
      }
    };
  
  

  useEffect(() => {
    fetchAboutMeData();

  }, []);

  return (
    <div className="flex flex-col h-screen bg-[#F9D548]">
      <Navbar />
      <div className="flex lg:w-4/5 lg:pr-8 p-8 bg-[#F9D548] text-[#0A2A67]">
        <div className="w-full max-w-md flex flex-col">
          <div className="flex flex-row mt-7">
            <Image
              src="/logo.jpg"
              alt="Profile Picture"
              width={150}
              height={150}
              className="rounded-full shadow-lg"
            />
              <div className="flex flex-col mt-9 ml-8 gap-1">
              <h1 className="text-2xl font-bold text-black">{userData.FName}</h1>
              <p className="text-xl text-black">@{userData.Username}</p>
            </div>
          </div>

          <h2 className="text-xl underline font-bold mt-9">Dietary Settings</h2>
          <div className="flex flex-row mt-9 gap-4">
            <p className="text-xl text-black font-semibold">Dietary Preferences :</p>
            <p className="text-xl text-black">{userData.DietaryPreferance}</p>
          </div>
          <div className="flex flex-row mt-9 gap-4">
            <p className="text-xl text-black font-semibold">Allergy :</p>
            <p className="text-xl text-black">{userData.allergy}</p>
          </div>
          <div className="flex flex-row mt-9 gap-4">
            <p className="text-xl text-black font-semibold">Diet Method :</p>
            <p className="text-xl text-black">{userData.DietMethod}</p>
          </div>
          <div className="flex flex-row mt-9 gap-4">
            <p className="text-xl text-black font-semibold">Health Goals :</p>
            <p className="text-xl text-black">{userData.HealthGoal}</p>
          </div>
          <div className="flex flex-row mt-9 gap-4">
            <p className="text-xl text-black font-semibold">Height :</p>
            <p className="text-xl text-black">{userData.height} cm</p>
          </div>
          <div className="flex flex-row mt-9 gap-4">
            <p className="text-xl text-black font-semibold">Weight :</p>
            <p className="text-xl text-black">{userData.Weight} kg</p>
          </div>
          <div className="flex flex-row mt-9 gap-4">
            <p className="text-xl text-black font-semibold">BMI :</p>
            <p className="text-xl text-black">{userData.BMI}</p>
          </div>
          <div className="flex flex-row mt-28 gap-4">
            <Link href="/EditAboutMe">
              <button className="w-[250px] h-9 bg-blue-950 hover:bg-[#154083] text-white font-bold text-xl rounded-[10px] shadow">
                Edit
              </button>
            </Link>
            <button className="w-[250px] h-9 bg-blue-950 hover:bg-[#154083] text-white font-bold text-xl rounded-[10px] shadow">
              <a href="#">Reset Password</a>
            </button>
          </div>
        </div>

        <div className="w-1/3 ml-8 justify-items-end text-center">
          <img
            src="Fish&chips.jpg"
            alt="Homemade Fish & Chips Image"
            className="w-full max-w-screen-xl rounded-2xl shadow-2xl shadow-black"
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutMe;
