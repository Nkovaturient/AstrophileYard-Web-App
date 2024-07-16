import React, { useContext, useEffect } from 'react'
import './Musicaly.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic } from '@fortawesome/free-solid-svg-icons'
import {storeContext} from '../../Context/storeContext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'


const Musicaly = () => {

  const{url, loading, setLoading}=useContext(storeContext);

    const fetchData=async()=>{
      const apiToken='BQCvM0EImNCU0jS7uJ6O1BHIVsE-wOQRS9PdTjZ1_WvDfA-LL-QqfHn8YxrMciDKJZ7fU_jrIE76aC6DXj4v4bmV4Fu3a9OVYt9-0dp7G0Pacjkj1ag'
      try{
      setLoading(true);
      const response=await axios.get(`${url}/musicaly/refresh?refresh_token=${apiToken}`);
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
    <button onClick={fetchData}>Fetch</button>
    </>
  )
}

export default Musicaly