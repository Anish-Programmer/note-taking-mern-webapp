import express, { json, urlencoded } from "express";
import cors from "cors";
import notesRoutes from "./routes/notesRouter.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";


dotenv.config();

const app= express();


// console.log(process.env.MONGO_URI)

const PORT = process.env.PORT || 5001;

// connectDB()

app.use(
    cors({
        origin: "http://localhost:5173",
    })
)
// middleware
app.use(express.json()); // it will help to access req.body i.e fields e.g. title, content
app.use(express.urlencoded({extended:true}));

// middleware
app.use(rateLimiter)



// custome middleware
// app.use((req,res,next)=>{
//     console.log(`Request method is ${req.method} and URL is ${req.url}`);
//     next();
// })

app.use("/api/notes", notesRoutes);

// 1. at first connect database
// 2. then run server

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("server running on PORT:",PORT);
    })
})




