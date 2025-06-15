import express, { json, urlencoded } from "express";
import cors from "cors";
import notesRoutes from "./routes/notesRouter.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import path from "path";


dotenv.config();

const app= express();


// console.log(process.env.MONGO_URI)

const PORT = process.env.PORT || 5001;

const __dirname = path.resolve(); // to get the current directory path


// connectDB()
if(process.env.NODE_ENV !== "production"){
app.use(
    cors({
        origin: "http://localhost:5173",
    })
)
}

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


if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist"))); // serve static files from the frontend build directory

    app.get("*", (req,res)=>{
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    })
}




connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("server running on PORT:",PORT);
    })
})




