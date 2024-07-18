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
      const response=await axios.get(`${url}/musicaly/getPlaylist`);
      setLoading(false);
      console.log(response.data);
      const result=response.data;
      // localStorage.setItem('access_token', result.access_token )
      // setAccess(result.access_token)

    }catch(err){
      toast.error(`${err.message}`);
  }
  }



    if(loading){
      return <p>Loading...please wait</p>
    }


    
  return (
    <>
    
    <div>Musicaly...updates soon! stay tuned <FontAwesomeIcon icon={faMusic}/></div>
    <div>llm input</div>
    <button onClick={getToken}>Get Token</button>
    </>
  )
}

export default Musicaly