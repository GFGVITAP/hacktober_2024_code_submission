import { useState } from "react";
import React from "react";
import { ReactNode } from "react";
import "./App.css";
import { motion } from "framer-motion";
import { BackgroundLines } from "./components/ui/background-lines";
import Navbar from "./components/ui/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Location from "./pages/Location";
import Home from "./pages/Home";
import Navigator from "./components/ui/navbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navigator />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="/Location" element={<Location />} />{" "}
        {/* Ensure this route exists */}
        {/* <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </>
  );
}

export default App;
