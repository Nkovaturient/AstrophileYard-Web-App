import React, { useContext } from 'react'
import './Musicaly.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic } from '@fortawesome/free-solid-svg-icons'
import {storeContext} from '../../Context/storeContext.jsx'
import axios from 'axios'


const Musicaly = () => {

  const{url, loading, setLoading}=useContext(storeContext);

    const fetchData=async()=>{
      try{
      setLoading(true);
      const response=await axios.get(`${url}/archive/musicaly`);
      setLoading(false)
      if(response.data.success){
          // console.log(response.data);
          setImage(response.data.data);
      }

  }catch(err){
      toast.error(`${err.message}`);
  }
    }
    
  return (
    <>
    
    <div>Musicaly...updates soon! stay tuned <FontAwesomeIcon icon={faMusic}/></div>
    <div>llm input</div>
    </>
  )
}

export default Musicaly