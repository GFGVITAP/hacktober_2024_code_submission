import express from "express";
import axios from "axios";
require("dotenv").config();
const port = 3000;
const app = express();
const apikey = process.env.API_KEY;
app.use(express.static("public"));
app.get("/create-checkout" , async (req , res) => {
    try{
        const response = await axiosInstance.post("/address");
        res.json(response.data);
    }
    catch(error){
        res.status(500).json(error);
    }
})
const axiosInstance = axios.create({
    baseUrl : "https://external-api.bcon.global/api/v1",
    Headers : {Authorization : `Bearer ${apikey}`}
})
app.get("/webhook" , async (req , res) => {
    const data = req.query;
    console.log(data);
})

app.listen(port , () => {
    console.log("server");
})