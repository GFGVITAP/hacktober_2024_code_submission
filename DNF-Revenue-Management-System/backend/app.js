const express = require("express");
const app = express()
const router = require("./routes/auth")
const cors = require("cors")

const {UserDetails}=require("./models/userdetails");

const port = process.env.port || 8080
const mongoose = require("mongoose")
const url = "mongodb+srv://2mohitsoni:Mohit1234@cluster0.wjfspkb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(url)
mongoose.connection.on('connected', () => console.log('connected'));
mongoose.connection.on("error",()=>{console.log("Not Connected To Database......")})
// ----------------------------------middlewares---------------------------------
app.use(cors());
app.use(express.json());  // parse the json data comming from post request 
app.use(router)

app.get("/",(req,res)=>{
    res.json("hello")
})


app.post("/userdetails", (req, res) => {
    // Get the id from the request body
    const { id } = req.body; // Destructure id from req.body

    // Log the id to the console
    console.log(id);

    // Check if the id is not provided
    if (!id) {
        return res.status(400).send({ error: "ID is required" });
    }

    // Find the user by id in the database
    UserDetails.findById(id)
        .then((result) => {
            // If the user is not found, send a 404 error
            if (!result) {
                return res.status(404).send({ error: "User not found" });
            }
            // If the user is found, send the result
            res.send(result);
        })
        .catch((error) => {
            // Handle any errors that occur during the database operation
            console.error(error);
            res.status(500).send({ error: "Internal server error" });
        });
});


  app.listen(port ,()=>{
    console.log("Server Is Running")
})