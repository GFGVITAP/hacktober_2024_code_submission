// src/components/UploadAskPage.js
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function UploadAskPage() {
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    // Handle file upload here
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="upload-ask-page"
    >
      <h2>Upload a PDF or Ask a Question</h2>
    <motion.div
        {...getRootProps()}
        className="dropzone"
        whileHover={{ scale: 1.05, boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.1)' }}
        whileTap={{ scale: 0.95 }}
      >
        <input {...getInputProps()} />
        <p>Drag & drop a PDF here or click to upload</p>
      </motion.div>
      <input type="text" placeholder="Type your question here" />
      <motion.button
        whileHover={{ scale: 1.1, boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.2)' }}
        whileTap={{ scale: 0.95 }}
      >
        Ask
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1, boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.2)' }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/share')}
      >
        Collaborate
      </motion.button>
    </motion.div>
  );
}

export default UploadAskPage;
