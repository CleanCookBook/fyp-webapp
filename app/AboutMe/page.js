"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AboutMe = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState({
    FName: "",
    LName: "",
    Username: "",
    DietaryPreferance: "",
    allergy: "",
    HealthGoal: "",
    height: "",
    Weight: "",
    BMI: "",
    DietMethod: "", // Corrected the variable name
    // Add other user data properties
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchAboutMeData = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/aboutme", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        setIsLoading(true);
        const data = await response.json();
        let bmi = (data.Weight / ((data.height / 100) ** 2)).toFixed(2);
        setUserData({
          FName: data.FName,
          LName: data.LName,
          Username: data.Username,
          DietaryPreferance: data.DietaryPreferance
            ? JSON.parse(data.DietaryPreferance)
            : "",
          allergy: data.allergy ? JSON.parse(data.allergy) : "",
          DietMethod: data.DietMethod ? JSON.parse(data.DietMethod) : "",
          HealthGoal: data.HealthGoal ? JSON.parse(data.HealthGoal) : "",
          height: data.height,
          Weight: data.Weight,
          BMI: bmi,
        });
      } else if (response.status === 401) {
        console.error("Unauthorized access");
        router.push("/loginPage");
      } else {
        console.error("Failed to fetch user data");
      }

    } catch (error) {
      console.error("Error during user data fetch:", error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAboutMeData();
  }, []);
  
  if (!isLoading && !userData.Username) {
    return null; // or render a loading spinner/message
  }

  const heightInMeters = userData.height / 100;
  const minNormalWeight = 18.5 * (heightInMeters ** 2);
  const maxNormalWeight = 24.9 * (heightInMeters ** 2);

  const classifyBMI = (bmi, weight, height) => {
    const maxNormalWeight = 24.9 * ((height / 100) ** 2);
    const minNormalWeight = 18.5 * ((height / 100) ** 2);
  
    if (bmi < 18.5) {
      const underweightBy = minNormalWeight - weight;
      return ` Underweight by ${underweightBy.toFixed(2)} kg, `;
    }
    if (bmi >= 18.5 && bmi <= 24.9) {
      return ' Normal weight';
    }
    if (bmi >= 25 && bmi <= 29.9) {
      const overweightBy = weight - maxNormalWeight;
      return ` Overweight by ${overweightBy.toFixed(2)} kg, `;
    }
    if (bmi >= 30) {
      const obeseBy = weight - maxNormalWeight;
      return ` Obese by ${obeseBy.toFixed(2)} kg, `;
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F9D548]">
      <Navbar />
      <div className="lg:w-4/5 lg:pr-8 p-8 flex flex-col h-full bg-[#F9D548] text-[#0A2A67] justify-start items-start ml-20">
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
              {userData.FName} {userData.LName}
            </h1>
            <p className="text-xl text-black">@ {userData.Username}</p>
          </div>
        </div>

        <div>
        <div className="w-1/3 float-right justify-items-end text-center">
            <img
              src="Fish&chips.jpg"
              alt="Homemade Fish & Chips Image"
              className="w-full max-w-screen-xl rounded-2xl shadow-2xl shadow-black"
            />
          </div>

          <h2 className="text-xl underline font-bold left-10 mt-9">
            Dietary Settings
          </h2>
          <div className="flex flex-row mt-9 gap-4">
            <p className="text-xl text-black font-semibold">
              Dietary Preferences :
            </p>
            <p className="text-xl text-black">{userData.DietaryPreferance}</p>
          </div>
          <div className="flex flex-row mt-9 gap-4">
            <p className="flex flex-row text-xl text-black font-semibold">
              Allergy :
            </p>
            <p className="text-xl text-black">{userData.allergy}</p>
          </div>
          <div className="flex flex-row mt-9 gap-4">
            <p className="flex flex-row text-xl text-black font-semibold">
              Diet Method :
            </p>
            <p className="text-xl text-black">{userData.DietMethod}</p>
          </div>
          <div className="flex flex-row mt-9 gap-4">
            <p className="flex flex-row text-xl text-black font-semibold">
              Health Goals :
            </p>
            <p className="text-xl text-black">{userData.HealthGoal}</p>
          </div>
          <div className="flex flex-row mt-9 gap-4">
            <p className="flex flex-row text-xl text-black font-semibold">
              Height :
            </p>
            <p className="text-xl text-black">{userData.height} cm</p>
          </div>
          <div className="flex flex-row mt-9 gap-4">
            <p className="flex flex-row text-xl text-black font-semibold">
              Weight :
            </p>
            <p className="text-xl text-black">{userData.Weight} kg</p>
          </div>
          <div className="flex flex-col mt-9 gap-4">
            <div className="flex flex-row">
              <p className="flex flex-row text-xl text-black gap-4 font-semibold">
                {`BMI (Body Mass Index) : `}
              </p>
              <p className="text-xl text-black" style={{ color: (userData.BMI < 18.5 || userData.BMI >= 30) ? 'red' : (userData.BMI >= 18.5 && userData.BMI <= 24.9) ? 'green' : 'red' }}>
                {userData.BMI} kg/m²
              </p>
              <p className="text-xl text-black font-semibold ml-4">
                Healthy BMI range: 18.5 kg/m² - 24.9 kg/m²
              </p>
            </div>
            <div className="flex flex-row">
              <p className={`text-xl text-black font-semibold mt-3 ${userData.BMI >= 30 ? 'blink' : ''}`} style={{ color: (userData.BMI < 18.5 || userData.BMI >= 30) ? 'red' : (userData.BMI >= 18.5 && userData.BMI <= 24.9) ? 'green' : 'red' }}>
                {classifyBMI(userData.BMI, userData.Weight, userData.height)}
              </p>
              {(userData.BMI < 18.5 || userData.BMI >= 25) && (
                <p className="text-xl text-black font-semibold ml-4 mt-3">
                  Normal weight range for your height: {minNormalWeight.toFixed(2)} kg - {maxNormalWeight.toFixed(2)} kg
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-row mt-20 gap-4">
            <Link href="/EditAboutMe">
              <button className="w-[250px] h-9 bg-blue-950 hover:bg-[#154083] text-white font-bold text-xl rounded-[10px] shadow">
                Edit
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
      
    </div>
  );
};

export default AboutMe;
