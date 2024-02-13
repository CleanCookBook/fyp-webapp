"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const createAccount = () => {
  const userRole = 'system admin';  
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDOB] = useState("");
  const [userType, setUserType] = useState("");
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isUsernameTaken, setIsUsernameTaken] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const handleNext = async () => {
    const userData = {
      firstName,
      lastName,
      email,
      username,
      password,
      gender,
      dob,
      userType, // Add this line
    };
    

    let isValid = true;

    // Validate email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      setIsEmailValid(false);
      isValid = false;
    } else {
      setIsEmailValid(true);
    }

    if (
      !firstName ||
      !lastName ||
      !email ||
      !username ||
      !gender ||
      !dob ||
      !password||
      !userType
    ) {
      // Display an error message or prevent the user from proceeding
      alert("Please fill in all fields before proceeding.");
      isValid = false;
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setIsPasswordValid(false);
      isValid = false;
      return;
    } else {
      setIsPasswordValid(true);
    }

    if (!isValid) {
      return; // Don't proceed with the fetch request if any validation fails
    }

    try {
      const response = await fetch("https://ccb-backendd.onrender.com/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Server response:", responseData);
        if (userType === "user") {
          router.push("/AccountInfo/createAccount/quizPage");
        } else if (userType === "nutritionist") {
          router.push("/AccountInfo/createAccount/nutritionistPage");
        } else {
          // Handle other user types or provide a default redirection
          console.error("Unknown userType:", userType);
        }
      } else {
        const errorData = await response.json();
        if (errorData.error === "Username already exists") {
          setIsUsernameTaken(true);
          isValid = false;
        } else {
          setIsUsernameTaken(false);
        }
        console.error("Error submitting signup data:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting signup data:", error.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F9D548]">
      <Navbar userRole={userRole}/>

      <div className="flex-grow lg:w-4/5 lg:pr-8 p-8 flex flex-col items-center">
        <div className="flex items-center mt-[30px]">
          <Link 
            href="/home/SysAdminHome" 
            className="flex justify-center items-center w-28 h-10 bg-blue-950 hover:bg-[#154083] text-white text-xl font-bold rounded-[10px] shadow self-start -mt-6 -ml-[650px]"
          >
            &lt;&nbsp;&nbsp;Back
          </Link>
        </div>
        <div className="flex justify-center items-center ml-96">
          <h1 className="text-6xl font-black text-[#0A2A67] mb-4 -mt-10">
            Let's Create New Account
          </h1>
        </div>

        <div className="flex lg:flex-row mx-12 items-center justify-center">
          <div>
            {/* First name and Last name Div */}
            <div className="flex items-center justify-center gap-4 ml-96">
              <div className="w-[440px] h-10 pl-2.5 py-2.5 bg-white rounded-[10px] justify-center items-center mt-10">
                <div className="flex flex-col">
                  <div className="text-blue-950 text-lg font-medium -mt-10">First Name :</div>
                  <input
                    type="text"
                    placeholder="Enter User's First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="text-neutral-400 text-medium font-medium border-none outline-none w-full mt-2.5"
                  />
                </div>
              </div>
              <div className="w-[440px] h-10 pl-2.5 py-2.5 bg-white rounded-[10px] justify-start items-start mt-10">
                <div className="flex flex-col">
                  <div className="text-blue-950 text-lg font-medium -mt-10">Last Name :</div>
                  <input
                    type="text"
                    placeholder="Enter User's Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="text-neutral-400 text-medium font-medium border-none outline-none w-full mt-2.5"
                  />
                </div>
              </div>
            </div>
            <br />

            {/* Email Div */}
            <div className="w-[400px] flex-col justify-start items-start inline-flex ml-[42rem]">
              <div className="justify-start items-start gap-2.5 inline-flex ">
                <div className="text-blue-950 text-lg font-medium -mt-5 ml-2.5">Email :</div>
              </div>
              <div className="w-[896px] h-10 pl-2.5 py-2.5 bg-white rounded-[10px] justify-start items-start gap-2.5 inline-flex">
                <input
                  type="text"
                  value={email}
                  placeholder="Enter User's Email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-neutral-400 text-medium font-medium border-none outline-none w-full -mt-0.5"
                />
              </div>
              {!isEmailValid && (
                <p className="text-red-500 font-bold text-medium ml-2.5 mt-1">
                  Please enter a valid email address.
                </p>
              )}
            </div>
            <br />

            {/* Username Div */}
            <div className="w-[400px] flex-col justify-start items-start inline-flex ml-[42rem]">
              <div className="justify-start items-start gap-2.5 inline-flex">
                <div className="text-blue-950 text-lg font-medium mt-5 ml-2.5">Username :</div>
                {/*username cannot be the same*/}
              </div>
              <div className="w-[896px] h-10 pl-2.5 py-2.5 bg-white rounded-[10px] justify-start items-start gap-2.5 inline-flex">
                <input
                  type="text"
                  placeholder="Enter User's Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="text-neutral-400 text-medium font-medium border-none outline-none w-full -mt-0.5"
                />
              </div>
              {isUsernameTaken && (
                <p className="text-red-500 font-bold text-medium ml-2.5 mt-1">
                  This username is already taken. Please choose another one.
                </p>
              )}
            </div>
            <br />

            {/* Gender Div */}
            <div className="w-[400px] flex-col justify-start items-start inline-flex ml-[42rem]">
              <div className="justify-start items-start gap-2.5 inline-flex">
                <div className="text-blue-950 text-lg font-medium mt-5 ml-2.5">Gender :</div>
              </div>
              <div className="w-[896px] h-10 pl-2.5 py-2.5 bg-white rounded-[10px] justify-start items-start gap-2.5 inline-flex">
                <select
                  type="text"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="text-neutral-400 text-medium font-medium border-none outline-none w-full "
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <br />

            {/* DOB Div */}
            <div className="w-[400px] flex-col justify-start items-start inline-flex ml-[42rem]">
              <div className="justify-start items-start gap-2.5 inline-flex">
                <div className="text-blue-950 text-lg font-medium mt-5 ml-2.5">
                  Date of Birth :
                </div>
              </div>
              <div className="w-[896px] h-10 pl-2.5 py-2.5 bg-white rounded-[10px] justify-start items-start gap-2.5 inline-flex">
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDOB(e.target.value)}
                  className="text-neutral-400 text-medium font-medium border-none outline-none w-[880px] -mt-0.5"
                />
              </div>
            </div>
            <br />

            {/* Password Div */}
            <div className="w-[400px] flex-col justify-start items-start inline-flex ml-[42rem]">
              <div className="justify-start items-start gap-2.5 inline-flex">
                <div className="text-blue-950 text-lg font-medium mt-5 ml-2.5">Password :</div>
              </div>
              <div className="w-[896px] h-10 pl-2.5 py-2.5 bg-white rounded-[10px] justify-start items-start gap-2.5 inline-flex">
                <input
                  type={isPasswordHidden ? "password" : "text"}
                  placeholder="Enter User's Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="text-neutral-400 text-medium font-medium border-none outline-none w-full"
                />
                <button
                  onClick={() => setIsPasswordHidden(!isPasswordHidden)}
                  className="flex items-center cursor-pointer mr-1.5 mt-0.5"
                >
                  <Image
                    src={isPasswordHidden ? "/hide.png" : "/show.png"}
                    alt="Toggle password visibility"
                    width={20}
                    height={20}
                  />
                </button>
              </div>
              {!isPasswordValid && (
                <p className="text-red-500 font-bold text-medium ml-2.5 mt-1 w-full">
                  Password must contain at least 6 characters, 1 uppercase letter, and 1 symbol.
                </p>
              )}
            </div>
            <br />

            {/*User Type Div */}
            <div className="w-[400px] flex-col justify-start items-start inline-flex ml-[42rem]">
              <div className="justify-start items-start gap-2.5 inline-flex">
                <div className="text-blue-950 text-lg font-medium mt-5 ml-2.5">User Type:</div>
              </div>
              <div className="w-[896px] h-10 pl-2.5 py-2.5 bg-white rounded-[10px] justify-start items-start gap-2.5 inline-flex">
                <select
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                  className="text-neutral-400 text-medium font-medium border-none outline-none w-full"
                >
                  <option value="">Select User Type</option>
                  <option value="user">Normal User</option>
                  <option value="nutritionist">Nutritionist</option>
                </select>
              </div>
            </div>
            <br />

            {/* Next Button Div */}
            <div>
              <button
                onClick={handleNext}
                className="w-64 h-10 bg-blue-950 hover:bg-[#154083] text-white text-xl font-bold rounded-[10px] shadow ml-[100rem] mt-6"
              >
                Next
              </button>
            </div>
            <div className="text-sm mt-[1rem]">
              
            </div>
          </div>

          <div className="w-1/2">
            
          </div>
        </div>
      </div>
      <Footer />
    </div>
    
  );
};

export default createAccount;
