"use client";
import React, { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";
import { FaSync } from "react-icons/fa";

const LivechatwithBot = () => {
  const userRole = 'user';
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const chatBottomRef = useRef(null);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  useEffect(() => {
    // Scroll to the bottom of the chat when a new message is added
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Add user's message to the messages array
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "user", message: userInput },
    ]);

    // Simulate bot response based on user input
    const botResponse = await getBotResponse(userInput);
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "bot", message: botResponse },
    ]);

    // Clear the input field
    setUserInput("");
  };

  const handleOptionSelect = async (selectedOption) => {
    setSelectedOption(selectedOption);

    // Simulate bot response based on the selected option
    const botResponse = await getBotResponse(selectedOption);
    setMessages((prevMessages) => [
      ...prevMessages,
      { type: "bot", message: botResponse },
    ]);
  };

  const getBotResponse = (input) => {
    const lowercasedInput = input.toLowerCase();

    // Check for specific user greetings
    if (lowercasedInput.includes("hello") || lowercasedInput.includes("hi")) {
      return "Hello! 😊 How can I assist you today?";
    }

    // Simulate other bot responses based on user input or selected options
    switch (lowercasedInput) {
      case "nutritionist":
        return "Connecting you with our nutritionist...";
      case "issue":
        return "Thank you for reporting the issue. Our team will look into it.";
      case "end":
        return "Chat ended. If you have more questions, feel free to start a new chat.";
      case "others":
        return "Please provide more details about your query.";
      default:
        return "I'm sorry, I didn't understand that. How can I assist you?";
    }
  };

  const handleRegenerate = () => {
    // Clear the chat history
    setMessages([]);
    // Clear the selected option
    setSelectedOption(null);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#F9D548]">
      <Navbar userRole={userRole} />
      <div className="container mx-auto px-4 mt-12">
        <section className="mt-6">
          <h2 className="text-6xl font-extrabold -mt-10 text-blue-950">Live chat with Bot</h2>
        </section>

        <section className="mt-4 flex-grow">
          <div className="bg-white rounded-t-lg shadow-md p-4 flex flex-col h-[470px] overflow-auto relative">
            <p className="text-lg font-bold mb-2">
              Hello! How can I help you today?
            </p>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  msg.type === "user" ? "text-right" : "text-left"
                }`}
              >
                <div
                  className={`p-2 ${
                    msg.type === "user"
                      ? "bg-blue-500 text-white text-[18px] font-medium"
                      : "bg-gray-200 text-gray-700 text-[18px] font-medium"
                  } bubble-container`}
                >
                  {msg.message}
                </div>
              </div>
            ))}
            <div ref={chatBottomRef} />
          </div>

          <div className="bg-white rounded-b-lg shadow-md p-4 flex flex-col h-[128px] overflow-auto relative">
            {/* Button section */}
            <section className="mt-2">
              <div className="flex items-start justify-start">
                <button
                  className="mr-2 px-4 py-2 rounded bg-blue-500 text-white"
                  onClick={() => handleOptionSelect("nutritionist")}
                >
                  Chat with Nutritionist
                </button>
                <button
                  className="mr-2 px-4 py-2 rounded bg-red-500 text-white"
                  onClick={() => handleOptionSelect("issue")}
                >
                  Report an Issue
                </button>
                <button
                  className="mr-2 px-4 py-2 rounded bg-gray-500 text-white"
                  onClick={() => handleOptionSelect("end")}
                >
                  End
                </button>
                <button
                  className="px-4 py-2 rounded bg-gray-200 text-gray-700"
                  onClick={() => handleOptionSelect("others")}
                >
                  Others
                </button>
                <button
                  className="ml-2 mt-1 px-4 py-2 rounded bg-gray-200 text-gray-700"
                  onClick={handleRegenerate}
                >
                  <FaSync />
                </button>
              </div>
            </section>  

            {/* User input form */}
            <section className="mt-2">
              <form className="flex items-end justify-end">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="w-full rounded-md bg-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Type your message here"
                />
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md ml-4"
                >
                  Send
                </button>
              </form>
            </section>
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