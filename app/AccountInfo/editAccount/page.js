"use client";
import Footer from "@/components/Footer";
import Modal from "@/components/Modal"; // Adjust the path based on your file structure
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const EditSysAccount = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [initialEmail, setInitialEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const userRole = 'system admin';
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    FName: "",
    LName: "",
    dob: "",
    gender: "",
    email: "",
    UserID: "",
    Paid: "",
  });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInput = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));

    if (fieldName === "email") {
      setEmail(fieldValue);
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    let isValid = true;

    // Validate email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Get the value from the email field
    const finalEmail =
      formData.email !== initialEmail ? formData.email : initialEmail;

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
      const response = await fetch(
        "https://ccb-backendd.onrender.com/api/edit/update-profile",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        if (data.success) {
          console.log("Profile updated successfully");
          router.push("/home/SysAdminHome");
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
        const searchParams = new URLSearchParams(window.location.search);
        const userID = searchParams.get("UserID");

        if (!userID) {
          console.error("User ID not provided in the URL");
          return;
        }

        const response = await fetch(
          `https://ccb-backendd.onrender.com/api/edit/${userID}`
        );
        const data = await response.json();

        console.log("Data received from the server:", data);

        if (data.success) {
          const userProfile = data.user;

          setFormData({
            username: userProfile.Username,
            FName: userProfile.FName,
            LName: userProfile.LName,
            dob: userProfile.dob,
            gender: userProfile.gender,
            email: userProfile.email,
            UserID: userID,
            Paid: userProfile.Paid,
          });

          setInitialEmail(userProfile.email);
        } else {
          console.error("User not found");
        }
      } catch (error) {
        console.error("Error during profile fetch:", error.message);
      }
    };

    fetchUserData();
  }, []); // Empty depende

  return (
    <div className="flex flex-col h-full bg-[#F9D548]">
       <Navbar userRole={userRole} />
      <div className=" lg:w-4/5 lg:pr-8 p-8 flex flex-col h-screen bg-[#F9D548] text-[#0A2A67] justify-start items-start  ml-20">
        <form onSubmit={submitForm}>
          <div>
            <h2 className="text-xl underline font-bold left-10 mt-9">
              Edit Account Information:
            </h2>
            <div className="flex flex-row mt-9 gap-4">
              <label className="flex flex-row text-xl text-black font-semibold mt-2">
                Username :
              </label>
              <input
                className="text-xl text-black w-[748px] h-12 rounded-[10px] border p-2"
                type="text"
                name="username"
                onChange={handleInput}
                value={formData.username}
                placeholder="Enter new name"
              />
            </div>
            <div className="flex flex-row mt-9 gap-4">
              <label className="flex flex-row text-xl text-black font-semibold mt-2">
                First Name :
              </label>
              <input
                className="text-xl text-black w-[748px] h-12 rounded-[10px] border p-2"
                type="text"
                name="FName"
                onChange={handleInput}
                value={formData.FName}
                placeholder="Enter new name"
              />
            </div>
            <div className="flex flex-row mt-9 gap-4">
              <label className="flex flex-row text-xl text-black font-semibold mt-2">
                Last Name :
              </label>
              <input
                className="text-xl text-black w-[748px] h-12 rounded-[10px] border p-2"
                type="text"
                name="LName"
                onChange={handleInput}
                value={formData.LName}
                placeholder="Enter new name"
              />
            </div>

            <div className="flex flex-row mt-9 gap-4">
              <label className="flex flex-row text-xl text-black font-semibold mt-2">
                Date of Birth :
              </label>
              <input
                className="text-xl text-black w-[308px] h-12 rounded-[10px] border p-2"
                type="date"
                name="dob"
                onChange={handleInput}
                value={formData.dob}
              />
            </div>
            <div className="flex flex-row mt-9 gap-4">
              <label className="flex flex-row text-xl text-black font-semibold mt-2">
                Gender :
              </label>
              <select
                className="text-xl text-black w-[735px] h-12 rounded-[10px] border p-2"
                type="text"
                name="gender"
                onChange={handleInput}
                value={formData.gender}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="flex flex-row mt-9 gap-4">
              <label className="flex flex-row text-xl text-black font-semibold mt-2">
                E-mail :
              </label>
              <input
                className="text-xl text-black w-[745px] h-12 rounded-[10px] border p-2"
                type="text"
                name="email"
                onChange={handleInput}
                value={formData.email}
                placeholder="Enter new e-mail"
              />
            </div>
            {!isEmailValid && (
              <p className="text-red-500 font-bold text-lg mt-1">
                Please enter a valid email address.
              </p>
            )}

            <div className="flex flex-row mt-9 gap-4">
              <label className="flex flex-row text-xl text-black font-semibold mt-2">
                Paid :
              </label>
              <select
                className="text-xl text-black w-[735px] h-12 rounded-[10px] border p-2"
                type="text"
                name="Paid"
                onChange={handleInput}
                value={formData.Paid}
              >
                <option value="">Select Subscription</option>
                <option value="Paid">Paid</option>
                <option value="Unpaid">Unpaid</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="flex flex-row mt-20 gap-4">
              <button
                type="submit"
                className="w-[250px] h-9 bg-blue-950 hover:bg-[#154083] text-white font-bold text-xl rounded-[10px] shadow"
              >
                Confirm Update
              </button>
            </div>
          </div>
        </form>
      </div>
      <Footer />
      {isModalOpen && <Modal onClose={closeModal} />}
    </div>
  );
};

export default EditSysAccount;
