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
      const response=await axios.post(`${url}/musicaly/getToken`);
      setLoading(false);
      console.log(response.data);

    }catch(err){
      toast.error(`${err.message}`);
  }
  }

    const fetchData=async()=>{

      // const result= await getToken();
      // localStorage.setItem('access_token', result.access_token )
      // setAccess(result.access_token)
      
      try{
      setLoading(true);
      const response=await axios.get(`${url}/musicaly/refresh?refresh_token=${access}`);
      setLoading(false)
      if(response.data.success){
          console.log(response.data);
          // setImage(response.data.data);
      }

  }catch(err){
      toast.error(`${err.message}`);
  }
    }

    
  return (
    <>
    
    <div>Musicaly...updates soon! stay tuned <FontAwesomeIcon icon={faMusic}/></div>
    <div>llm input</div>
    <button onClick={getToken}>Refresh Token</button>
    <button onClick={fetchData}>Fetch</button>
    </>
  )
}

export default Musicaly