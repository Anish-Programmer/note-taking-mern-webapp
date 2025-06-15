import React from 'react'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import NoteDetailPage from './pages/NoteDetailPage'
// import toast  from 'react-hot-toast'


const App = () => {
  return (
    <div data-theme="forest">
      <div class="absolute inset-0 -z-10 h-full w-full bg-#110D0D [background:radial-gradient(125%_125%_at_50%_10%,#110D0D_40%,#63e_100%)]" >
      <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/create" element={<CreatePage/>} />
          <Route path="/note/:id" element={<NoteDetailPage/>} />
      </Routes>
      </div>
    </div>
  )
}


export default App
