import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const CreateUserFeedback = () => {
  const [formData, setFormData] = useState({
    feedbackType: "",
    comments: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send feedback to server)
    console.log("Submitted Feedback:", formData);
    // You can add logic to send the feedback data to your server or perform other actions
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F9D548] text-[#0A2A67]">
      <Navbar />
      <div className="flex-1 flex justify-center mt-20">
        <div className="max-w-xl">
          <h2 className="text-5xl font-black pb-8 text-center">
            We'd Love To Hear From You
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="feedbackType"
                className="block text-lg font-medium text-blue-950 mb-2"
              >
                Feedback Type:
              </label>
              <select
                id="feedbackType"
                name="feedbackType"
                value={formData.feedbackType}
                onChange={handleInputChange}
                className="w-full h-12 border-none outline-none pl-2.5 py-2.5 bg-white rounded-[10px]"
                required
              >
                <option value="" disabled>
                  Select Feedback Type
                </option>
                {/* Add your feedback types as options */}
                <option value="General">General</option>
                <option value="Bug Report">Bug Report</option>
                <option value="Feature Request">Feature Request</option>
              </select>
            </div>
            <div className="mb-6">
              <label
                htmlFor="comments"
                className="block text-lg font-medium text-blue-950 mb-2"
              >
                Comments:
              </label>
              <textarea
                id="comments"
                name="comments"
                value={formData.comments}
                onChange={handleInputChange}
                className="w-full h-32 border-none outline-none pl-2.5 py-2.5 bg-white rounded-[10px]"
                required
                placeholder="Enter your comments..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-950 hover:bg-[#154083] text-white font-bold rounded-full py-2 px-4"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateUserFeedback;
