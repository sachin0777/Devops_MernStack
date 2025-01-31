import React, { useState } from "react";
import axios from "axios";
import { Player } from "@lottiefiles/react-lottie-player";

function ChatBotPage() {
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isChatExpanded, setIsChatExpanded] = useState(false);

  const handleMessageChange = (e) => {
    setUserMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (!userMessage) return;

    // Add user message to the chat
    setChatHistory((prev) => [
      ...prev,
      { sender: "user", message: userMessage },
    ]);

    // Send the user message to the server
    try {
      const response = await axios.post("http://127.0.0.1:5000/chat", {
        message: userMessage,
      });

      // Add chatbot's response to the chat
      setChatHistory((prev) => [
        ...prev,
        { sender: "chatbot", message: response.data.response },
      ]);
      setUserMessage("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const toggleChatWindow = () => {
    setIsChatExpanded((prev) => !prev);
  };

  const closeChatWindow = () => {
    setIsChatExpanded(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 py-6 px-4">
      {/* Header Section */}
      <div className="flex flex-col items-center mb-6">
        <img
          src="unisys_logo.png"
          alt="ZenSafe Logo"
          className="w-20 h-auto object-contain mb-2"
        />
        <div className="text-4xl font-extrabold tracking-wide">
          <span className="bg-gradient-to-t from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent">
            ZEN
          </span>{" "}
          <span className="bg-gradient-to-b from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent">
            SAFE
          </span>
        </div>
      </div>

      {/* Lottie Animation */}
      <div className="flex flex-col items-center text-center mb-6">
        <Player autoplay loop src="Chatbot.json" className="w-48 h-48 mb-4" />
        <p className="text-gray-300 text-lg max-w-md">
          Hey! I'm Zen, How can I help you?
        </p>
      </div>

      {/* Chat Window */}
      <div
        className={`bg-gray-800 w-full max-w-md ${
          isChatExpanded ? "h-[500px]" : "h-16"
        } rounded-2xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 cursor-pointer`}
        onClick={!isChatExpanded ? toggleChatWindow : undefined}
      >
        {isChatExpanded ? (
          <>
            {/* Header with Close Button */}
            <div className="bg-gray-900 p-3 flex justify-between items-center">
              <p className="text-gray-300 text-sm">Zen Chatbot</p>
              <button
                className="text-gray-300 hover:text-white text-lg"
                onClick={closeChatWindow}
              >
                ×
              </button>
            </div>

            {/* Chat History */}
            <div className="flex-1 p-4 overflow-y-auto flex flex-col space-y-3 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-700">
              {chatHistory.map((chat, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg text-sm w-fit max-w-[75%] shadow-md ${
                    chat.sender === "user"
                      ? "bg-green-500 text-white self-end"
                      : "bg-gray-300 text-gray-800 self-start"
                  }`}
                >
                  <p>{chat.message}</p>
                </div>
              ))}
            </div>

            {/* Input Section */}
            <div className="bg-gray-700 p-3 flex items-center">
              <input
                className="flex-1 p-3 rounded-lg border-none bg-gray-900 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                type="text"
                value={userMessage}
                onChange={handleMessageChange}
                placeholder="Type your message..."
              />
              <button
                className="ml-3 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition ease-in-out duration-200"
                onClick={handleSendMessage}
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <p className="text-gray-300 text-sm">Click to Chat</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatBotPage;
