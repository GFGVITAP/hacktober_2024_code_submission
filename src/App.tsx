import { useState } from "react";
import React from "react";
import { ReactNode } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuroraBackground } from "./components/ui/aurora-background";
import { motion } from "framer-motion";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
      <AuroraBackground className="background-def">
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="flex flex-col gap-4 items-center justify-center min-h-screen w-screen px-4 overflow-hidden"
        >
          <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
            Empowering the farmers
          </div>
          <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4 text-center">
            using cutting edge technology to make it possible
          </div>
          <button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
            Join the revolution
          </button>
        </motion.div>
      </AuroraBackground>
    </>
  );
}

export default App;
