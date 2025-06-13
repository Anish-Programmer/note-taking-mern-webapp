import express from "express";
import notesRoutes from "./routes/notesRouter.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";


dotenv.config();

const app= express();

// console.log(process.env.MONGO_URI)

const PORT = process.env.PORT || 5001;

connectDB()

app.use("/api/notes", notesRoutes);

app.listen(PORT,()=>{
    console.log("server running on PORT:",PORT);
})








// mongodb+srv://at7anish:GLb4v6J9YGpUMy7K@cluster0.vvdubiz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
