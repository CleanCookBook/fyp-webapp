"use client";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AboutMe = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userRole = 'user';
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
    gender: "", // Add other user data properties
  });
  const [loading, setIsLoading] = useState(true);
  const router = useRouter();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fetchAboutMeData = async () => {
    try {
      const response = await fetch("https://ccb-backendd.onrender.com/api/aboutme", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
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
          gender: data.gender,
          BMI: bmi,
        });
      } else if (response.status === 401) {
        console.error("Unauthorized access");
        router.push("https://cleancookbook.vercel.app/loginPage");
      } else {
        console.error("Failed to fetch user data");
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Error during user data fetch:", error.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAboutMeData();
  }, [fetchAboutMeData]);

  const heightInMeters = userData.height / 100;
  const minNormalWeight = 18.5 * (heightInMeters ** 2);
  const maxNormalWeight = 24.9 * (heightInMeters ** 2);

  const classifyBMI = (bmi, weight, height) => {
    const maxNormalWeight = 24.9 * ((height / 100) ** 2);
    const minNormalWeight = 18.5 * ((height / 100) ** 2);
  
    if (bmi < 18.5) {
      const underweightBy = minNormalWeight - weight;
      return ` Underweight by ${underweightBy.toFixed(1)} kg `;
    }
    if (bmi >= 18.5 && bmi <= 24.9) {
      return ' Normal weight';
    }
    if (bmi >= 25 && bmi <= 29.9) {
      const overweightBy = weight - maxNormalWeight;
      return ` Overweight by ${overweightBy.toFixed(1)} kg `;
    }
    if (bmi >= 30) {
      const obeseBy = weight - maxNormalWeight;
      return ` Obese by ${obeseBy.toFixed(1)} kg `;
    }
  };

  const calculateTDEE = (weight, height, gender) => {
    // Basal Metabolic Rate (BMR) calculation without age
    const bmr = gender === 'male'
      ? (10 * weight) + (6.25 * height) + 5
      : (10 * weight) + (6.25 * height) - 161;
  
    // Assuming sedentary lifestyle for TDEE calculation
    return bmr * 1.2;
  };

  const genderBasedCalorieAdvice = (bmi, gender) => {
    let advice;
    if (gender === 'male') {
      if (bmi < 18.5) {
        advice = '🥗 To gain weight, you might need to consume between 2500 to 3000 calories per day, or even more.';
      } else if (bmi >= 18.5 && bmi < 24.9) {
        advice = '🥗 Your weight is in the healthy range. Continue with your current caloric intake to maintain your weight.';
      } else if (bmi >= 25 && bmi < 29.9) {
        advice = '🥗 For weight loss, you might aim for about 2000 to 2500 calories per day.';
      } else {
        advice = '🥗 You might be advised to follow a low-calorie diet of around 1500 to 2000 calories per day for weight loss, under medical supervision.';
      }
    } else {
      if (bmi < 18.5) {
        advice = '🥗 To gain weight, you might need to consume between 2200 to 2500 calories per day.';
      } else if (bmi >= 18.5 && bmi < 24.9) {
        advice = '🥗 Your weight is in the healthy range. Continue with your current caloric intake to maintain your weight.';
      } else if (bmi >= 25 && bmi < 29.9) {
        advice = '🥗 For weight loss, you might aim for about 1500 to 2000 calories per day.';
      } else {
        advice = '🥗 You might be advised to follow a low-calorie diet of around 1200 to 1500 calories per day for weight loss, under medical supervision.';
      }
    }
    return advice;
  };

  const adviceForCalories = (bmi, tdee, gender) => {
    let advice = genderBasedCalorieAdvice(bmi, gender);
    let recommendedCalories;
  
    if (bmi < 18.5) {
      // Underweight
      recommendedCalories = tdee + 500; // Aim to gain weight
    } else if (bmi >= 18.5 && bmi < 24.9) {
      // Normal weight
      recommendedCalories = tdee; // Maintain weight
    } else if (bmi >= 25 && bmi < 29.9) {
      // Overweight
      recommendedCalories = tdee - 500; // Aim to lose weight
    } else {
      // Obese
      recommendedCalories = tdee - 1000; // Aim to lose weight
    }
  
    return { advice, recommendedCalories };
};

  const { advice, recommendedCalories } = adviceForCalories(userData.BMI, calculateTDEE(userData.Weight, userData.height), userData.gender);
  
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
      <div className="lg:w-4/5 lg:pr-8 p-8 flex flex-col h-full bg-[#F9D548] text-[#0A2A67] justify-start items-start ml-20">
        <div className="w-full max-w-md flex flex-row mt-7">
          <img
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
            <p className="text-xl text-black font-medium">{userData.DietaryPreferance}</p>
          </div>
          <div className="flex flex-row mt-9 gap-4">
            <p className="flex flex-row text-xl text-black font-semibold">
              Allergy :
            </p>
            <p className="text-xl text-black font-medium">{userData.allergy}</p>
          </div>
          <div className="flex flex-row mt-9 gap-4">
            <p className="flex flex-row text-xl text-black font-semibold">
              Diet Method :
            </p>
            <p className="text-xl text-black font-medium">{userData.DietMethod}</p>
          </div>
          <div className="flex flex-row mt-9 gap-4">
            <p className="flex flex-row text-xl text-black font-semibold">
              Health Goals :
            </p>
            <p className="text-xl text-black font-medium">{userData.HealthGoal}</p>
          </div>
          <div className="flex flex-row mt-9 gap-4">
            <p className="flex flex-row text-xl text-black font-semibold">
              Height :
            </p>
            <p className="text-xl text-black font-medium">{userData.height} cm</p>
          </div>
          <div className="flex flex-row mt-9 gap-4">
            <p className="flex flex-row text-xl text-black font-semibold">
              Weight :
            </p>
            <p className="text-xl text-black font-medium">{userData.Weight} kg</p>
          </div>
          <div className="flex flex-col mt-9 gap-4">
            <div className="flex flex-row">
              <p className="flex flex-row text-xl text-black gap-4 font-semibold">
                {`BMI (Body Mass Index) : `}
              </p>
              <p className="text-xl text-black ml-4 font-medium" style={{ color: (userData.BMI < 18.5 || userData.BMI >= 30) ? 'red' : (userData.BMI >= 18.5 && userData.BMI <= 24.9) ? 'green' : 'red' }}>
                {parseFloat(userData.BMI).toFixed(1)} kg/m² &nbsp;<span style={{ color: 'black' }}>=</span>
              </p>
              <p className={`text-xl text-black font-semibold ml-3 ${userData.BMI >= 30 ? 'blink' : ''}`} style={{ color: (userData.BMI < 18.5 || userData.BMI >= 30) ? 'red' : (userData.BMI >= 18.5 && userData.BMI <= 24.9) ? 'green' : 'red' }}>
                {classifyBMI(userData.BMI, userData.Weight, userData.height)}
              </p>
            </div>
            <div className="flex flex-row">
              <p className="text-xl text-black">
                🥗 Healthy BMI range : <span style={{ fontWeight: '500' }}>18.5 kg/m²</span> - <span style={{ fontWeight: '500' }}>24.9 kg/m²</span>
              </p>
            </div>
            <div className="flex flex-row">
              <p className="text-xl text-black">
                🥗 Normal weight range for your height : <span style={{ fontWeight: '500' }}>{minNormalWeight.toFixed(1)} kg</span> - <span style={{ fontWeight: '500' }}>{maxNormalWeight.toFixed(1)} kg</span>
              </p>
            </div>
            <div className="flex flex-row mt-4 gap-4">
              <p className="flex flex-row text-xl text-black font-semibold">
                Recommended Daily Calorie Intake :
              </p>
              <p className="text-xl text-black font-medium">
                {recommendedCalories.toFixed(1)} kcal
              </p>
            </div>
            <div>
              <p className="text-xl text-black font-normal">
                {advice}
              </p>
            </div>
            <div className="flex flex-row mt-20 gap-4">
              <Link href="/AboutMe/EditAboutMe">
                <button className="w-[250px] h-9 bg-blue-950 hover:bg-[#154083] text-white font-bold text-xl rounded-[10px] shadow">
                  Edit
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      
    </div>
  );
};

export default AboutMe;