"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const BusinessPartnerSignup = () => {
  const [linkedinUrl, setLinkedinUrl] = useState(""); // State to hold the LinkedIn URL
  const [licenseImage, setLicenseImage] = useState(null); // State for license image
  const [userPhoto, setUserPhoto] = useState(null); // State for user photo
  const [experienceFile, setExperienceFile] = useState(null); // State for past experience
  const [testimonyFile, setTestimonyFile] = useState(null); // State for testimonies
  const [licenseFileName, setLicenseFileName] = useState("Choose File");
  const [userPhotoFileName, setUserPhotoFileName] = useState("Choose File");
  const [experienceFileName, setExperienceFileName] = useState("Choose File");
  const [testimonyFileName, setTestimonyFileName] = useState("Choose File");
  const router = useRouter();
  

  const handleInputChange = (e) => {
    setLinkedinUrl(e.target.value); // Update the state with the input value
  };

  const handleFileChange = (e, setState, setFileName) => {
    const file = e.target.files[0];
  
    // Check if a file is selected
    if (!file) {
      setState(null);
      setFileName("Choose File");
      return;
    }
  
    setState(file); // Update the respective state with the selected file
    setFileName(file.name); // Update the UI to show the selected file name
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;

    // Check if all required files are uploaded
    if (!linkedinUrl|| !licenseImage || !userPhoto || !experienceFile || !testimonyFile) {
      alert("Please upload all required files.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    // Create a FormData object to append data and files
    const formData = new FormData();
    formData.append("linkedinUrl", linkedinUrl);
    formData.append("licenseImage", licenseImage);
    formData.append("userPhoto", userPhoto);
    formData.append("experienceFile", experienceFile);
    formData.append("testimonyFile", testimonyFile);


    try {
      const response = await fetch("https://ccb-backendd.onrender.com/api/user/upload", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        console.log("Received Files!");
        router.push('/signUp/termsCon?userType=nutritionist');
      } else {
        try {
          const errorData = await response.json();
          console.error("Error creating nutritionist account:", errorData);
        } catch (error) {
          console.error(
            "Error creating nutritionist account:",
            response.statusText
          );
        }
      }
    } catch (error) {
      console.error("Error creating nutritionist account:", error.message);
    }
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center bg-[#F9D548] text-[#0A2A67]">
      <h2 className="text-6xl font-black pb-8">
        Join Us and Change the World{" "}
      </h2>
      <div className="lg:w-4/5 lg:pr-8 p-8 flex items-center">
        <div className="w-1/2 border-r border-gray-400 pr-8">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-start mb-8"
          >
            {/* Left Section */}
            <label
              htmlFor="linkedinUrl"
              className="text-blue-950 text-sm font-medium mb-2 self-start"
            >
              Enter your LinkedIn URL:
            </label>
            <input
              type="text"
              id="linkedinUrl"
              value={linkedinUrl}
              onChange={handleInputChange}
              className="text-neutral-400 text-[10px] font-medium border-none outline-none w-full h-8 pl-2.5 py-2.5 bg-white rounded-[10px] mb-4 self-start"
              placeholder="https://www.linkedin.com/in/yourprofile"
              required
            />
            <label
              htmlFor="uploadLicense"
              className="text-blue-950 text-sm font-medium mb-2 self-start"
            >
              Upload your License:
            </label>
            <div className="flex items-center justify-center w-full h-32 pl-2.5 py-2.5 bg-white rounded-[10px] mb-4">
              {/* License Upload */}
              <label htmlFor="licenseUpload" className="cursor-pointer">
                <span className="file-name-display mr-2 text-gray-500">
                  {licenseFileName}
                </span>
                <input
                  type="file"
                  id="licenseUpload"
                  accept="image/jpeg"
                  className="hidden"
                  onChange={(e) =>
                    handleFileChange(e, setLicenseImage, setLicenseFileName)
                  }
                />
              </label>
              {/* Display selected file name */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M14 7a2 2 0 00-2-2H8a2 2 0 00-2 2v1H4a2 2 0 00-2 2v7a2 2 0 002 2h12a2 2 0 002-2V10a2 2 0 00-2-2h-2V7zM8 7a1 1 0 011-1h2a1 1 0 011 1v1H8V7zm6 3h-2v1a1 1 0 01-1 1H9a1 1 0 01-1-1v-1H6v5h8v-5zM6 6h8a1 1 0 011 1v1H5V7a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <label
              htmlFor="uploadUserPhoto"
              className="text-blue-950 text-sm font-medium mb-2 self-start"
            >
              Upload your Photo:
            </label>
            <div className="flex items-center justify-center w-full h-32 pl-2.5 py-2.5 bg-white rounded-[10px] mb-4">
              {/* User Photo Upload */}
              <label htmlFor="userPhotoUpload" className="cursor-pointer">
                <span className="file-name-display mr-2 text-gray-500">
                  {userPhotoFileName}
                </span>
                <input
                  type="file"
                  id="userPhotoUpload"
                  accept="image/jpeg"
                  className="hidden"
                  onChange={(e) =>
                    handleFileChange(e, setUserPhoto, setUserPhotoFileName)
                  }
                />
              </label>

              {/* Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M14 7a2 2 0 00-2-2H8a2 2 0 00-2 2v1H4a2 2 0 00-2 2v7a2 2 0 002 2h12a2 2 0 002-2V10a2 2 0 00-2-2h-2V7zM8 7a1 1 0 011-1h2a1 1 0 011 1v1H8V7zm6 3h-2v1a1 1 0 01-1 1H9a1 1 0 01-1-1v-1H6v5h8v-5zM6 6h8a1 1 0 011 1v1H5V7a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </form>
        </div>
        <div className="w-1/2 pl-8">
          <form onSubmit={handleSubmit} className="flex flex-col items-start">
            {/* Experience File */}
            <label
              htmlFor="uploadExperience"
              className="text-blue-950 text-sm font-medium mb-2 self-start"
            >
              Upload Past Experience:
            </label>
            <div className="flex items-center justify-center w-full h-32 pl-2.5 py-2.5 bg-white rounded-[10px] mb-4">
              <label htmlFor="experienceUpload" className="cursor-pointer">
                <span className="file-name-display mr-2 text-gray-500">
                  {experienceFileName}
                </span>
                <input
                  type="file"
                  id="experienceUpload"
                  accept="image/jpeg"
                  className="hidden"
                  onChange={(e) =>
                    handleFileChange(
                      e,
                      setExperienceFile,
                      setExperienceFileName
                    )
                  }
                />
              </label>
              {/* Display selected file name or 'No file chosen' */}
              {/* Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M14 7a2 2 0 00-2-2H8a2 2 0 00-2 2v1H4a2 2 0 00-2 2v7a2 2 0 002 2h12a2 2 0 002-2V10a2 2 0 00-2-2h-2V7zM8 7a1 1 0 011-1h2a1 1 0 011 1v1H8V7zm6 3h-2v1a1 1 0 01-1 1H9a1 1 0 01-1-1v-1H6v5h8v-5zM6 6h8a1 1 0 011 1v1H5V7a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            {/* Testimony File */}
            <label
              htmlFor="uploadTestimony"
              className="text-blue-950 text-sm font-medium mb-2 self-start"
            >
              Upload Testimonies:
            </label>
            <div className="flex items-center justify-center w-full h-32 pl-2.5 py-2.5 bg-white rounded-[10px] mb-4">
              <label htmlFor="testimonyUpload" className="cursor-pointer">
              <span className="file-name-display mr-2 text-gray-500">
                {testimonyFileName}
              </span>
                <input
                  type="file"
                  id="testimonyUpload"
                  accept="image/jpeg"
                  className="hidden"
                  onChange={(e) =>
                    handleFileChange(e, setTestimonyFile, setTestimonyFileName)
                  }
                />
              </label>
              {/* Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M14 7a2 2 0 00-2-2H8a2 2 0 00-2 2v1H4a2 2 0 00-2 2v7a2 2 0 002 2h12a2 2 0 002-2V10a2 2 0 00-2-2h-2V7zM8 7a1 1 0 011-1h2a1 1 0 011 1v1H8V7zm6 3h-2v1a1 1 0 01-1 1H9a1 1 0 01-1-1v-1H6v5h8v-5zM6 6h8a1 1 0 011 1v1H5V7a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <button
              type="submit"
              className="w-[259px] h-7 bg-blue-950 hover:bg-[#154083] text-white font-bold rounded-[10px] shadow self-end"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BusinessPartnerSignup;
