"use client";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const LiveChat = () => {
  const [userMessage, setUserMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [preChatQuestions, setPreChatQuestions] = useState({
    age: "",
    healthCondition: "",
  });

  const getSessionId = () => {
    const cookies = document.cookie.split(';');
    const sessionIdCookie = cookies.find(cookie => cookie.trim().startsWith('your_session_cookie_name='));

    if (sessionIdCookie) {
      return sessionIdCookie.split('=')[1];
    }
    return null;
  };
  
  const [isChatStarted, setIsChatStarted] = useState(false);  // Track whether the chat is started
  const socketRef = useRef(null);

  const connectSocket = () => {
    // Initialize the socket when the chat starts
    socketRef.current = io('http://localhost:3001', { transports: ['websocket'] });
  
    // Event listeners
    socketRef.current.on("connect", () => {
      // Retrieve the session ID from the cookie
      const sessionId = getSessionId();
      console.log("Connected to the server. Session ID:", sessionId);
  
      // You can send the session ID to the server if needed
      socketRef.current.emit("session", { sessionId });
    });
  }

  const disconnectSocket = () => {
    // Disconnect the socket when the chat ends
    socketRef.current.disconnect();
    console.log('Disconnected from server');
  };

  useEffect(() => {
    console.log('LiveChat component mounted');
    
    // Cleanup
    return () => {
      console.log('LiveChat component unmounted');
      if (isChatStarted) {
        disconnectSocket();
      }
    };
  }, [isChatStarted]);

  const handlePreChatSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isChatStarted) {
        connectSocket();
        // Send pre-chat questions to the server
        if (socketRef.current) {
          await socketRef.current.emit("preChatQuestions", preChatQuestions);
          setIsChatStarted(true);  // Set isChatStarted to true when the chat starts
        }
      }
    } catch (error) {
      console.error('Error during pre-chat submission:', error);
    }
  };
  
  const handleEndChat = () => {
    setIsChatStarted(false);  // Set isChatStarted to false when the chat ends
    if (socketRef.current) {
      // Disconnect the socket when the chat ends
      socketRef.current.disconnect();
      console.log('Disconnected from server');
    }
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    // Send user's message to the server
    socketRef.current.emit("message", userMessage);
    setUserMessage("");
  };


  return (
    <div>
      <h2>Live Chat</h2>

      {/* Pre-chat questions */}
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

      {/* Chat messages */}
      <div>
        {chatMessages.map((message, index) => (
          <div key={index}>
            {typeof message === 'string' ? message : message.toString()}
          </div>
        ))}
      </div>

      {/* Chat input */}
      {isChatStarted && (
        <form onSubmit={handleChatSubmit}>
          <input
            type="text"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      )}

      {/* "End Chat" button */}
      {isChatStarted && (
        <button onClick={handleEndChat}>End Chat</button>
      )}
    </div>  
  );
};

export default LiveChat;
