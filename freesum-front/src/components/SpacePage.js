// src/components/SpacePage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/global.css";

function SpacePage() {
  const navigate = useNavigate();
  const [spaceCode, setSpaceCode] = useState("");

  const handleJoin = () => {
    // Add logic to verify and join the space using spaceCode
    navigate("/upload-ask");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-page"
    >
      <h2>Create or Join a Space</h2>
      <div className="page-div">
        <input
          type="text"
          value={spaceCode}
          placeholder="Enter Space Code"
          onChange={(e) => setSpaceCode(e.target.value)}
        />
        <motion.button
          whileHover={{
            scale: 1.1,
            boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.2)",
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/chats-page")}
        >
          Join Space
        </motion.button>

        <motion.button
          hileHover={{
            scale: 1.1,
            boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.2)",
          }}
          whileTapw={{ scale: 0.95 }}
          onClick={handleJoin}
        >
          Create Space
        </motion.button>
      </div>
    </motion.div>
  );
}

export default SpacePage;
