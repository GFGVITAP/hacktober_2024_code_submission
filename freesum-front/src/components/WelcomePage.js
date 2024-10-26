// src/components/WelcomePage.js
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function WelcomePage() {
  const navigate = useNavigate();

  const goToSpace = () => {
    navigate("/space");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className="welcome-page"
    >
      <h1>Welcome to FreeSum</h1>
      <p>Clarity & Collab at no cost!</p>
      <motion.button
        whileHover={{
          scale: 1.1,
          boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.2)",
        }}
        whileTap={{ scale: 0.95 }}
        onClick={goToSpace}
      >
        Start Summarizing
      </motion.button>
    </motion.div>
  );
}

export default WelcomePage;
