import React, { useState } from 'react'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom'

import Home from './pages/Home/Home.jsx' 
import Navbar from './components/Navbar/Navbar.jsx';
import Sidebar from './components/Sidebar/Sidebar.jsx';
import Footer from './components/Footer/Footer.jsx';
import Upload from './pages/Upload/Upload.jsx';
import Archive from './pages/Archive/Archive.jsx';
import EditArchive from './pages/EditArchive/EditArchive.jsx';
import DeleteArchive from './pages/DeleteArchive/DeleteArchive.jsx';
import Login from './components/Login/Login.jsx';
import Gallery from './pages/Gallery/Gallery.jsx';
import Logout from './components/Logout/Logout.jsx';

const App = () => {

  const[loginPopup, setLoginPopup]=useState(false);

  return (
    <>
    <ToastContainer />
    {
      loginPopup ? <Login setLoginPopup={setLoginPopup} /> : ''
    }
    
    <div className='app-content'>
    <Sidebar setLoginPopup={setLoginPopup} /> 
      <Routes>
        <Route path='/' element={<Home  />} />
        <Route path='/archive/new' element={<Upload />} /> 
        <Route path='/archive/:id' element={<Archive  />} /> 
        <Route path='/archive/:id/edit' element={<EditArchive />} />
        <Route path='/archive/:id/delete' element={<DeleteArchive />} />
        <Route path='/archive/gallery' element={<Gallery />} /> 
        <Route path='/logout' element={<Logout />} /> 
      </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App