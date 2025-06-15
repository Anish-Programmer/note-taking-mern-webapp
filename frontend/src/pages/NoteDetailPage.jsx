import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from 'lucide-react';


const NoteDetailPage = () => {

  const [notes, setNotes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();

  // to get id from URL
  const { id } = useParams();

  // debug
  // console.log({id}) 

  

  useEffect(() => {
    const fetchNotesById = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        // console.log(res.data);
        setNotes(res.data);
      } catch (error) {
        console.log("Error fetching note by id:", error);
        toast.error("Error fetching note by id. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
      fetchNotesById();
    // fetch notes by id
  }, [id])


  // console.log( {notes} )
  const handleDelete = async ()=>{
    // delete confirmation
    if(!window.confirm("Are you sure you want to delete this note?")) return;

    // delete note
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully.");
      navigate("/"); // redirect to home page
    } catch (error) {
      console.log("Error deleting note:", error);
      toast.error("Error deleting note. Please try again later.");
    }
  }

  const handleSave = async () => {
    // client-side validation
    if(!notes.title.trim() || !notes.content.trim()){
      toast.error("Title and content are required.");
      return;
    }

    // update note
    setSaving(true);

    try {
      await api.put(`/notes/${id}`, notes)
      toast.success("Note updated successfully.");
      navigate("/"); // redirect to home page
    } catch (error) {
      console.log("Error updating note:", error);
      toast.error("Error updating note. Please try again later.");
    } finally {
      setSaving(false);
    }

  }

  if (loading){
    return (
      <div className='min-h-screen bg-base-200 flex items-center justify-center'>
        <LoaderIcon className="animate-spin size-10" />
      </div>
    )
  }


  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
      <div className='max-w-2xl mx-auto'>
        <div className='flex items-center justify-between mb-6  '>
            <Link to="/" className='btn btn-ghost' >
              <ArrowLeftIcon className='h-5 w-5' />
              Back to Notes
            </Link>
            <button onClick={handleDelete} className='btn btn-error btn-outline'>
              <Trash2Icon className="h-5 w-5"/>
              Delete Note
            </button>
          </div>

        <div className='card bg-base-100'>
          <div className='card-body'>
            <div className='form-control mb-4'>
              <label className='label'>
                <span className='label-text'>Title</span>
              </label>

              <input 
                type="text"
                placeholder='Note Title'
                className='input input-bordered'
                value={notes.title}
                onChange={(e) => setNotes({ ...notes, title: e.target.value })}
              />

            </div>

            <div className='form-control mb-4'>
              <label className='label'>
                <span className='label-text'>Content</span>
              </label>

              <textarea 
                placeholder='Write your note here...'
                className='textarea textarea-bordered h-32'
                value={notes.content}
                onChange={(e) => setNotes({ ...notes, content: e.target.value })}
              />

            </div>

            <div className="card-actions justify-end">
              <button className='btn btn-primary' disabled={saving} onClick={handleSave}>
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>

          </div>

        </div>


        </div>

      </div>
      
    </div>
  )
}

export default NoteDetailPage
