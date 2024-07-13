import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const storeContext= createContext(null);

const storeContextProvider = (props) => {

  const url=`https://astroyard-backend.onrender.com`; //http://localhost:5100
  const[loading, setLoading]=useState(false);
  const [token, setToken]=useState('')
  const navigate=useNavigate();
  const [result, setResult] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [image, setImage] = useState([])
 
  

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/archive`);
      setLoading(false);
      if (response.data.success) {
        setResult(response.data.archives)
        // console.log(response.data.archives);
        toast.success('Welcome to Astrophile Yard!', { 
          autoClose: 5000,
          theme: "colored",
        });
      }
      else{
        toast.warning(`${err.message}`);
      }
      if(response.data.APIData){
        setApiData(response.data.APIData)
      } 

    } catch (err) {
      toast.error(`${err.message}`);
    }
  }


  const logout=async()=>{
    try{
      
      let response=await axios.get(`${url}/logout`)
     
      // console.log(response);
      localStorage.removeItem('token', token);
      setToken('');
      // toast.success(`Logout success!`);
      // navigate('/');
  }catch(err){
      toast.error(`Logout failed. ${err.message}`);
  }
  }

  const galleryData=async()=>{
    try{
      setLoading(true);
      const response=await axios.get(`${url}/archive/gallery`);
      setLoading(false)
      if(response.data.success){
          // console.log(response.data);
          setImage(response.data.data);
      }

  }catch(err){
      toast.error(`${err.message}`);
  }
  }

  useEffect(()=>{ 
    async function loadData(){
        await fetchData();
        await galleryData();
        if(localStorage.getItem('token')){
            setToken(localStorage.getItem("token"))
            
            // await handleOnSubmit(localStorage.getItem("token"))
        } 
    }

    loadData();
}, [])


  const contextValue={
    url,
    token,
    setToken,
    logout,
    apiData,
    result,
    setImage,
    image,
    loading,
    setLoading,

  }
  
  return (
    <storeContext.Provider value={contextValue}>
      {props.children}

    </storeContext.Provider>
  )
}

export default storeContextProvider
