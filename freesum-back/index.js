const express = require("express");
const axios = require("axios");
const fs = require("fs");
const multer = require("multer");
const FormData = require("form-data");

const app = express();
const PORT = 3500;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const upload = multer({ dest: "uploads/" });

async function uploadPDFs(files) {
  try {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", fs.createReadStream(file.path));
    });

    const response = await axios.post(
      "http://13.60.86.225:8000/process-pdfs/", // Adjusted to local address
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    throw new Error("PDF upload failed");
  }
}

async function askQuestion(question) {
  try {
    const response = await axios.post(
      "http://13.60.86.225:8000/ask-question/", // Adjusted to local address
      { user_question: question } // Correctly formatted request body
    );
    return response.data;
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    throw new Error("Question answering failed");
  }
}

app.post("/process", upload.array("files"), async (req, res) => {
  const { question } = req.body;
  if (req.files && req.files.length > 0) {
    try {
      // Send PDFs to the first endpoint
      const uploadResponse = await uploadPDFs(req.files);

      // Check for the successful response message
      if (
        uploadResponse.message === "Text extraction and vectorization complete!"
      ) {
        // Send the question to the second endpoint
        const answerResponse = await askQuestion(question);
        // Return the answer to the frontend
        res.json({ answer: answerResponse.answer });
      } else {
        res.status(500).json({ error: "PDF processing not completed" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to process request" });
    } finally {
      // Clean up uploaded files
      req.files.forEach((file) => fs.unlinkSync(file.path));
    }
  } else {
    res.status(400).json({ error: "No files uploaded" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
