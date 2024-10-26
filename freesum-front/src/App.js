// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import SpacePage from './components/SpacePage';
import UploadAskPage from './components/UploadAskPage';
import SharePage from './components/SharePage';
import ChatsPage from './components/ChatsPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/space" element={<SpacePage />} />
        <Route path="/upload-ask" element={<UploadAskPage />} />
        <Route path="/share" element={<SharePage />} />
        <Route path="/chats-page"element={<ChatsPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
