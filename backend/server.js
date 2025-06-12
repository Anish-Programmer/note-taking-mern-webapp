import express from "express";


const app= express();


app.get("/api/notes",(req,res)=>{
    res.status(200).send("5 notes retrieved");
})


app.post("api/notes",(req,res)=>{
    res.status(201).json({message:"notes posted successfully"});
})

app.put("api/notes/:id",(req,res)=>{
    res.status(200).json({message:"notes updated successfully"});
})

app.delete("api/notes:id",(req,res)=>{
    res.status(200).json({message:"notes deleted successfully"});
})

app.listen(5001,()=>{
    console.log("server running on PORT: 5001");
})