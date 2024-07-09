import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { storeContext } from '../../Context/storeContext'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

const Logout = () => {

    let{url, token, logout, loading}=useContext(storeContext);
    const navigate=useNavigate();

    useEffect(()=>{
       logout()
       toast.success(`Logout success!`);
      navigate('/');
        
    }, [])

  return (
    <div>loading..</div>
  )
}

export default Logout