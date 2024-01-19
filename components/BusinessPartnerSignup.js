import { useState } from "react";


const BusinessPartnerSignup = () => {
  const [linkedinUrl, setLinkedinUrl] = useState(""); // State to hold the LinkedIn URL
  const [licenseImage, setLicenseImage] = useState(null); // State for license image
  const [userPhoto, setUserPhoto] = useState(null); // State for user photo
  const [experienceFile, setExperienceFile] = useState(null); // State for past experience
  const [testimonyFile, setTestimonyFile] = useState(null); // State for testimonies

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
  
    // Check if the file type is PDF
    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file.");
      setState(null);
      setFileName("Choose File");
  
      // Reset the file input value
      e.target.value = "";
      return;
    }
  
    setState(file); // Update the respective state with the selected file
    setFileName(file.name); // Update the UI to show the selected file name
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle submission of the LinkedIn URL and uploaded files
    console.log("Submitted LinkedIn URL:", linkedinUrl);
    console.log("Uploaded License Image:", licenseImage);
    console.log("Uploaded User Photo:", userPhoto);
    console.log("Uploaded Experience File:", experienceFile);
    console.log("Uploaded Testimony File:", testimonyFile);
    // You can add your logic for handling the data here (e.g., uploading images/files)
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
                <span className="mr-2 text-gray-500">Choose File</span>
                <input
                  type="file"
                  id="licenseUpload"
                  accept="application/pdf"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, setLicenseImage)}
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
            <label
              htmlFor="uploadUserPhoto"
              className="text-blue-950 text-sm font-medium mb-2 self-start"
            >
              Upload your Photo:
            </label>
            <div className="flex items-center justify-center w-full h-32 pl-2.5 py-2.5 bg-white rounded-[10px] mb-4">
              {/* User Photo Upload */}
              <label htmlFor="userPhotoUpload" className="cursor-pointer">
                <span className="mr-2 text-gray-500">Choose File</span>
                <input
                  type="file"
                  id="userPhotoUpload"
                  accept="application/pdf"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, setUserPhoto)}
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
            {/* Right Section */}

            {/* Experience File */}
            <label
              htmlFor="uploadExperience"
              className="text-blue-950 text-sm font-medium mb-2 self-start"
            >
              Upload Past Experience:
            </label>
            <div className="flex items-center justify-center w-full h-32 pl-2.5 py-2.5 bg-white rounded-[10px] mb-4">
              <label htmlFor="experienceUpload" className="cursor-pointer">
                <span className="mr-2 text-gray-500">Choose File</span>
                <input
                  type="file"
                  id="experienceUpload"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, setExperienceFile)}
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
            {/* Testimony File */}
            <label
              htmlFor="uploadTestimony"
              className="text-blue-950 text-sm font-medium mb-2 self-start"
            >
              Upload Testimonies:
            </label>
            <div className="flex items-center justify-center w-full h-32 pl-2.5 py-2.5 bg-white rounded-[10px] mb-4">
              <label htmlFor="testimonyUpload" className="cursor-pointer">
                <span className="mr-2 text-gray-500">Choose File</span>
                <input
                  type="file"
                  id="testimonyUpload"
                  accept="application/pdf"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, setTestimonyFile)}
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
