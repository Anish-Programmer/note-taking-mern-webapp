import express from "express";


const app= express();


app.get("/api/notes",(req,res)=>{
    res.send("5 notes");
})


app.listen(5001,()=>{
    console.log("server running on PORT: 5001");
})