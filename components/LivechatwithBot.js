import React, { useState } from "react";
import BPNavBar from "./BPNavBar";
import Footer from "./Footer";

const LivechatwithBot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [selectedOption, setSelectedOption] = useState(null); // Track user selection

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add user's message to the messages array
    setMessages((prevMessages) => [...prevMessages, { type: "user", message: userInput }]);
    // Clear the input field
    setUserInput("");

    // Respond with a question about user intent
    setMessages((prevMessages) => [...prevMessages, { type: "bot", message: "What would you like to do today?" }]);
  };

  const handleOptionSelect = (selectedOption) => {
    // Implement specific actions based on the chosen option
    switch (selectedOption) {
      case "nutritionist":
        // Open chat with nutritionist logic
        break;
      case "issue":
        // Report an issue logic
        break;
      case "end":
        // End chat gracefully
        break;
      case "others":
        // Display additional options or prompt for further details
        break;
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-[#F9D548]">
      <BPNavBar className="fixed top-0 left-0 right-0" />
        <div className="container mx-auto px-4 mt-12">
          <section className="mt-6">
            <h2 className="text-3xl font-bold mb-4 text-blue-950">Live chat with Bot</h2>
          </section>

        <section className="mt-4">
        <div className="bg-white rounded-lg shadow-md p-4 flex flex-col h-80">
          <div className="flex-grow">
            {/* ... message rendering omitted for brevity */}

            {selectedOption === null && (
              <div className="mt-1">
                <p className="text-lg font-bold mb-2">Hello! How can I help you today?</p>
                <button
                  className="mr-2 px-4 py-2 rounded bg-blue-500 text-white"
                  onClick={() => setSelectedOption("nutritionist")}
                >
                  Chat with Nutritionist
                </button>
                <button
                  className="mr-2 px-4 py-2 rounded bg-red-500 text-white"
                  onClick={() => setSelectedOption("issue")}
                >
                  Report an Issue
                </button>
                <button
                  className="mr-2 px-4 py-2 rounded bg-gray-500 text-white"
                  onClick={() => setSelectedOption("end")}
                >
                  End
                </button>
                <button
                  className="px-4 py-2 rounded bg-gray-200 text-gray-700"
                  onClick={() => setSelectedOption("others")}
                >
                  Others
                </button>
              </div>
            )}

            {selectedOption !== null && (
              <div className="mt-2">
                {handleOptionSelect(selectedOption)}
              </div>
            )}
          </div>
            <form className="flex items-center mt-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="w-full rounded-md bg-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your message here"
              />
              <button type="submit" onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md ml-4">
                Send
              </button>
            </form>
          </div>
        </section>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default LivechatwithBot;