const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/parkplaza", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

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

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from public directory

// Set view engine to EJS (if needed)
app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html")); // Serve your HTML file
});

app.post("/book",async (req, res) => {
    const booking = new Booking({
        hours: req.body.hours,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        date: req.body.date,
        paymentMethod: req.body.paymentMethod,
        location: req.body.location,
    });

    await booking.save((err) => {
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