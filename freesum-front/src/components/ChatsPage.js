import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import axios from "axios";
import "../styles/global.css";

function UploadAskPage() {
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
    setMessages((prev) => [
      ...prev,
      { type: "file", content: acceptedFiles.map((file) => file.name) },
    ]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
  });

  const handleSubmitPrompt = async () => {
    if (files.length > 0 && prompt.trim()) {
      setMessages((prev) => [...prev, { type: "user", content: prompt }]);
      setPrompt("");

      const formData = new FormData();
      files.forEach((file) => formData.append("files", file)); // Append all files
      formData.append("user_question", prompt); // Append the user question

      try {
        // Send PDFs and question in one request
        const uploadResponse = await axios.post(
          "http://localhost:3500/process-pdfs/", // Update this URL if necessary
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // Handle response
        const { message, answer } = uploadResponse.data;

        setMessages((prev) => [
          ...prev,
          { type: "bot", content: message },
          {
            type: "bot",
            content: answer
              ? `Answer: ${answer}`
              : "No answer found for the question.",
          },
        ]);
      } catch (error) {
        console.error("Error:", error);
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            content: "Error occurred while processing the request.",
          },
        ]);
      }
    } else {
      setMessages((prev) => [
        ...prev,
        { type: "bot", content: "Please upload files and enter a question." },
      ]);
    }
  };

  return (
    <div className="container">
      <div className="sidebar">
        <h2>Chat History</h2>
        <ul>
          {messages.map((msg, index) => (
            <li key={index} className="history-item">
              {msg.type === "file"
                ? `Uploaded Files: ${msg.content.join(", ")}`
                : msg.content}
            </li>
          ))}
        </ul>
      </div>

      <div className="chatbox-div">
        <div className="messages">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              className={`message ${msg.type === "user" ? "user" : "bot"}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p>
                {msg.type === "file"
                  ? `Uploaded files: ${msg.content.join(", ")}`
                  : msg.content}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="chatInput-div">
          <motion.div
            {...getRootProps()}
            className="dropzone"
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.1)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <input {...getInputProps()} />
            <p>Drag & drop PDFs here or click to upload multiple files</p>
          </motion.div>
          <input
            type="text"
            placeholder="Enter a question or prompt for summarization"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <motion.button
            onClick={handleSubmitPrompt}
            whileHover={{
              scale: 1.1,
              boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.2)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Submit Prompt
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default UploadAskPage;
