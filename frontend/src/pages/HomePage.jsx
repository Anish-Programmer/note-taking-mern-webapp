import React from 'react'
import NavBar from '../components/NavBar'
import { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import RateLimitedUI from '../components/RateLimitedUI';
import NoteCard from '../components/NoteCard';
import api from '../lib/axios.js';
import NoteNotFound from '../components/NoteNotFound.jsx';



const HomePage = () => {

  const [isRateLimited, setIsRateLimited] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);


   useEffect(()=>{

    const fetchAllNotes = async ()=>{
      try {
        const res = await api.get("/notes");
        // console.log(res.data); debug
        setNotes(res.data.notes);
        // setNotes(res.data);
        // console.log(notes);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error in fetching notes.");
        console.log(error);
        if(error.response?.status === 429){
            setIsRateLimited(true);
        }else {
          toast.error("Error fetching all notes.");
        }
      } finally {
          setLoading(false);
      }
    }
      fetchAllNotes(); 
   },[])

  return (
    <div className='min-h-screen'>
      <NavBar />

      {isRateLimited && <RateLimitedUI />}

      <div className='max-w-7xl mx-auto p-4 mt-6 text-white'>
        {loading && <div className='text-center text-primary py-10'>Loading notes...</div> }


        {/* debug code */}
        {/* {console.log("Notes length:", notes.length)} */}
{/* {console.log("Is rate limited:", isRateLimited)} */}


        {notes.length === 0 && !isRateLimited && <NoteNotFound />}

        {notes.length > 0 && !isRateLimited && (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {notes.map((note)=>(
                    <NoteCard key={note._id} note={note} setNotes={setNotes} />
              ))}
            </div>
        )}
      </div>

    </div>
  )
}

export default HomePage
