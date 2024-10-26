const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require('cors');
const app = express();

// Connect to MongoDB
async function connectDB() {
    try {
      await mongoose.connect("mongodb://127.0.0.1:27017/parkPlaza", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      console.log("Database connected successfully");
    } catch (error) {
      console.error("Database connection error:", error);
    }
  }
  
  connectDB();
// Define a schema for bookings
const bookingSchema = new mongoose.Schema({
    hours: Number,
    startTime: String,
    endTime: String,
    date: Date,
    paymentMethod: String,
    location: String,
});

// Create a model from the schema
const Booking = mongoose.model("Booking", bookingSchema);

  app.use(cors());
// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from public directory

// Routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html")); // Serve your HTML file
});

app.post("/book", (req, res) => {
    console.log(req.body);
    const booking = new Booking({
        hours: req.body.hours,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        date: req.body.date,
        paymentMethod: req.body.paymentMethod,
        location: req.body.location,
    });

    booking.save((err) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error saving booking.");
        } else {
           return res.redirect("/thank-you"); // Redirect after successful booking
       }
   });
});

app.get("/thank-you", (req, res) => {
   res.send("<h1>Thank you for your booking!</h1>");
});

// Start server
app.listen(3000, () => {
   console.log("Server is running on port 3000");
});