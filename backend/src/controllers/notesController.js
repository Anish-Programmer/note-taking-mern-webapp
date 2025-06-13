export function getAllNotes(req,res){
    res.status(200).send("notes fetched successfully.")
} 

export function createNote(req,res){
      res.status(200).send("notes created successfully.");
}


export function updateNote(req,res){
        res.status(200).send("notes updated successfully.");
}

export function deleteNote(req,res){
    res.status(200).send("notes deleted successfully.");
}

// export const deleteNote = (req,res)=>{
//     res.status(200).send("notes deleted successfully.");
// }

