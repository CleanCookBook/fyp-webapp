"use client"
import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io('http://localhost:3001', { transports: ['websocket'] });
 // Change the URL to your Socket.IO server

const LiveChat = () => {
  const [userMessage, setUserMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [preChatQuestions, setPreChatQuestions] = useState({
    age: "",
    healthCondition: "",
  });

  useEffect(() => {
    // Event listener for incoming messages
    socket.on("message", (message) => {
      setChatMessages((prevMessages) => [...prevMessages, message]);
    });
    // Clean up socket connection on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const handlePreChatSubmit = (e) => {
    e.preventDefault();
    // Send pre-chat questions to the server
    socket.emit("preChatQuestions", preChatQuestions);
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    // Send user's message to the server
    socket.emit("message", userMessage);
    setUserMessage("");
  };
return (
    <div>
      <h2>Live Chat</h2>

      {/* Pre-chat questions /}
      {chatMessages.length === 0 && (
        <form onSubmit={handlePreChatSubmit}>
          <label>
            Age:
            <input
              type="text"
              value={preChatQuestions.age}
              onChange={(e) =>
                setPreChatQuestions({ ...preChatQuestions, age: e.target.value })
              }
            />
          </label>
          <label>
            Health Condition:
            <input
              type="text"
              value={preChatQuestions.healthCondition}
              onChange={(e) =>
                setPreChatQuestions({
                  ...preChatQuestions,
                  healthCondition: e.target.value,
                })
              }
            />
          </label>
          <button type="submit">Start Chat</button>
        </form>
      )}

      {/ Chat messages /}
      <div>
        {chatMessages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>

      {/ Chat input */}
      {chatMessages.length > 0 && (
        <form onSubmit={handleChatSubmit}>
          <input
            type="text"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      )}
    </div>
  );
};

export default LiveChat;