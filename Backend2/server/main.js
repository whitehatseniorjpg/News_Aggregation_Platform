import dotenv from 'dotenv';
import express from 'express';
// import mongoose from 'mongoose';
import connectDB from './config/connectDB.js';
import cors from 'cors';
 import newsController from "./controller/newsController.js";
import News from "./model/news.js";


dotenv.config();

const app = express()
app.use(cors());
app.use(express.json());

app.use(
    "/newsservice",
    newsController
);
await connectDB();
console.log("NEWS API KEY =", process.env.NEWS_API_KEY);
app.get('/',(req,res) =>{
    res.json({"code":200 , "message" : "Server is running"})
})

// app.get("/testsave", async (req, res) => {

//     try {

//         const news = await News.create({

//             title: "Test News",

//             summary: "Testing MongoDB",

//             content: "Demo Content",

//             url: "https://google.com",

//             image_url: "https://test.com/image.jpg",

//             source_id: 1,

//             category_id: 1

//         });

//         res.json({
//             code: 200,
//             news: news
//         });

//     } catch(error) {

//         res.json({
//             code: 500,
//             message: error.message
//         });
//     }
// });

const PORT = process.env.PORT||8004
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})