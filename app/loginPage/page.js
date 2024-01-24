"use client";
import Image from "next/image";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include", // Include credentials (cookies) with the request
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
        setIsAuthenticated(true);
        console.log("UserType:", data.userType);
        console.log("Status:", data.status);

        // Check the user type and redirect accordingly
        if (data.userType === "nutritionist" && data.status === "approved") {
          // Redirect to the BPHomepage for approved nutritionists
          router.push("/home/BPHomepage");
        } else if (data.userType === "system admin") {
          // Redirect to the SysAdminHome for system admins
          router.push("/home/SysAdminHome");
        } else {
          // Redirect to the Homepage after successful login for other user types
          router.push("/home");
        }
      } else {
        const errorData = await response.json();
        console.error("Login failed:", errorData);

        // Display error message
        setErrorMessage("Invalid credentials");
      }
    } catch (error) {
      console.error("Error during login:", error.message);
    } 
  };

  // Can now login by either pressing the Enter key or clicking the login button
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen justify-center items-center bg-[#F9D548] text-[#0A2A67]">
      <div className="lg:w- lg:pr-8 p-8 flex flex-col items-center h-[600px]">
        <div>
          <h2 className="text-6xl font-black py-5">Welcome Back!</h2>
        </div>

        <div className="w-[800px] h-[250px] flex-row justify-start items-start inline-flex">
          <div className="w-[800px] h-[250px] flex-col justify-start items-start inline-flex">
            <div className="justify-start items-start gap-2.5 inline-flex">
              <div className="text-blue-950 text-lg font-medium">
                Username :
              </div>
            </div>
            <div className="w-[404px] h-10 pl-2.5 py-2.5 bg-white rounded-[10px] justify-start items-start gap-2.5 inline-flex">
              <input
                type="text"
                placeholder="Enter your Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="text-neutral-400 text-[20px] -mt-1 font-medium border-none outline-none"
              />
            </div>

            <br />

            <div className="justify-start items-start gap-2.5 inline-flex">
              <div className="text-blue-950 text-lg font-medium">
                Password :
              </div>
            </div>
            <div className="w-[404px] h-10 pl-2.5 py-2.5 bg-white rounded-[10px] justify-start items-start gap-2.5 inline-flex">
              <input
                type={isPasswordHidden ? "password" : "text"}
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-neutral-400 text-[20px] -mt-1 font-medium border-none outline-none"
                onKeyDown={handleKeyDown}
              />
              <button
                onClick={() => setIsPasswordHidden(!isPasswordHidden)}
                className="flex items-center cursor-pointer ml-28 mt-0.5"
              >
                <Image
                  src={isPasswordHidden ? "/hide.png" : "/show.png"}
                  alt="Toggle password visibility"
                  width={20}
                  height={20}
                />
              </button>
            </div>

            <div className="pt-3">
              <button
                className="w-[170px] h-8 bg-blue-950 hover:bg-[#154083] text-white font-bold text-lg rounded-[10px] shadow"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
            <div className="text-red-500 text-lg py-2">{errorMessage}</div>

            <div className="text-lg mt-[1rem]">
              <p>
                Do not have an account?{" "}
                <span className="font-semibold underline hover:opacity-[0.5]">
                  <Link href="/signUp">Sign Up here</Link>
                </span>
              </p>
            </div>
          </div>
          <div className="flex-row justify-normal items-start inline-flex">
            <img
              className="w-[400px] h-[400px] object-cover drop-shadow-lg"
              src="login-signupPage.jpg"
              alt="Sign Up Image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
