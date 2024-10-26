import { useState } from "react";
import React from "react";
import { ReactNode } from "react";
import "./App.css";
import { motion } from "framer-motion";
import Navbar from "./components/ui/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Location from "./pages/Location";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/contact";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/Location" element={<Location />} />
        {/* Ensure this route exists */}
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;
