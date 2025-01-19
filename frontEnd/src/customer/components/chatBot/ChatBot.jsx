import React, { useState } from "react";
import { Button, TextField, Paper, IconButton } from "@mui/material";
import axios from "axios";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import SendIcon from "@mui/icons-material/Send";
import "./chatbot.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Function to send message
  const handleChatRequest = async () => {
    if (!input.trim()) return;

    const newMessage = { role: "user", content: input };
    setMessages([...messages, newMessage]); // Add user message

    try {
      const response = await axios.post(
        "https://quickbazaar-acyq.onrender.com/api/v1/chat",
        { message: input },
        { headers: { "Content-Type": "application/json" } }
      );

      setMessages([
        ...messages,
        newMessage,
        { role: "bot", content: response.data.response },
      ]);
    } catch (e) {
      console.log("Chatbot error:", e);
    }

    setInput(""); // Clear input field
  };

  return (
    <div>
      {/* Floating Chat Button */}
      {!isOpen && (
        <IconButton
          className="chatbot-button"
          onClick={() => setIsOpen(true)}
          color="primary"
        >
          <ChatIcon fontSize="large" />
        </IconButton>
      )}

      {/* Chatbox Popup */}
      {isOpen && (
        <Paper className="chatbot-container">
          {/* Chatbox Header */}
          <div className="chatbot-header">
            <h3>Chatbot</h3>
            <IconButton onClick={() => setIsOpen(false)}>
              <CloseIcon />
            </IconButton>
          </div>

          {/* Chatbox Messages */}
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={msg.role === "user" ? "user-msg" : "bot-msg"}
              >
                {msg.content}
              </div>
            ))}
          </div>

          {/* Input Field */}
          <div className="chatbot-input">
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <IconButton onClick={handleChatRequest} color="primary">
              <SendIcon />
            </IconButton>
          </div>
        </Paper>
      )}
    </div>
  );
};

export default Chatbot;
