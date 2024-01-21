import { useState } from "react";
import Footer from "./Footer";
import BPNavBar from "./unused/BPNavBar";

const CreateBPAnnouncement = () => {
  const [announcementName, setAnnouncementName] = useState("");
  const [announcementImage, setAnnouncementImage] = useState(null);

  const handleInputChange = (e) => {
    setAnnouncementName(e.target.value);
  };

  const handleFileChange = (e, setState) => {
    const file = e.target.files[0];
    setState(file); // Update the respective state with the selected file
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle submission of the LinkedIn URL and uploaded files
    console.log("Submitted Announcement Name:", announcementName);
    console.log("Submitted Announcement Image:", announcementImage);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F9D548]">
      <BPNavBar />
      <div className="container mx-auto p-4 flex-1">
        <h1 className="text-5xl font-bold text-[#0A2A67] mb-4">
          Create Your Announcement
        </h1>
        <p className="text-black-200 text-2xl font-medium">
          Upload Your Files Here
        </p>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-start mb-8"
        >
          <input
            type="text"
            id="announcementName"
            value={announcementName}
            onChange={handleInputChange}
            className="text-neutral-400 text-m font-medium border-none outline-none w-1/2 h-8 pl-2.5 py-2.5 bg-white rounded-[10px] my-4 self-start drop-shadow-md"
            placeholder="Enter File Name Here"
            required
          />
          <div className="flex items-center justify-center w-1/2 h-32 pl-2.5 py-2.5 bg-white rounded-[10px] mb-4 drop-shadow-md">
            {/* License Upload */}
            <label htmlFor="announcementImage" className="cursor-pointer">
              <span className="mr-2 text-gray-500">Choose File</span>
              <input
                type="file"
                id="announcementImage"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileChange(e, setAnnouncementImage)}
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
            className="w-[259px] h-7 bg-blue-950 hover:bg-[#154083] text-white font-bold rounded-[10px] shadow self-start"
          >
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CreateBPAnnouncement;
