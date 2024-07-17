import React, { useContext, useEffect, useState } from 'react'
import './Musicaly.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic } from '@fortawesome/free-solid-svg-icons'
import {storeContext} from '../../Context/storeContext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'


const Musicaly = () => {

  const{url, loading, setLoading}=useContext(storeContext);
  const[access, setAccess]=useState('');


  const getToken=async()=>{
    try{
      setLoading(true);
      const response=await axios.get(`${url}/musicaly/refresh`);
      setLoading(false);
      console.log(response.data);
      localStorage.setItem('access_token', result.access_token )
      setAccess(result.access_token)

    }catch(err){
      toast.error(`${err.message}`);
  }
  }

    const fetchData=async()=>{
      
      try{
      setLoading(true);
      const response=await axios.get(`${url}/musicaly/playlist`, {headers: access});
      setLoading(false)
      if(response.data.success){
          console.log(response.data);
          // setImage(response.data.data);
      }

  }catch(err){
      toast.error(`${err.message}`);
  }
    }

    if(loading){
      return <p>Loading...please wait</p>
    }

    // useEffect(()=>{
    //   if(localStorage.getItem('access_token')){
    //     fetchData()
    //   } else {
    //     getToken()
    //   }
    // }, [])

    
  return (
    <>
    
    <div>Musicaly...updates soon! stay tuned <FontAwesomeIcon icon={faMusic}/></div>
    <div>llm input</div>
    <button onClick={getToken}>Get Token</button>
    </>
  )
}

export default Musicaly