import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import React, { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth, provider } from '../firebase';

export const storeContext= createContext(null);

const storeContextProvider = (props) => {

  const url=`https://astroyard-backend.onrender.com`;
  // const url= `http://localhost:5100`;
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

  const handleGoogleSignIn=async()=>{

    setLoading(true);
    await signInWithPopup(auth, provider)
  .then((result) => {
    setLoading(false);
    const user = result.user;
  const { email, displayName, photoURL, refreshToken}=user
  
//   setUserData(user);
//   setPhotoUrl(photoURL);
  setToken(refreshToken || token);
//  setUserEmail(email);

    // console.log("user=", userData);
    toast.success("Registered Successfully!", {
      position: "top-left",
      theme: "dark",
    });

  }).catch((error) => {

    setLoading(false);
    toast.error(`${error.message}`, {
      position: "top-left",
      autoClose: 5000,
      theme: "dark",
    });
  });
  }

  const handleLogin = (response) => {
    const { tokenId } = response; // Access the access token from the response

    // Send the access token to your backend for authentication
    fetch(`${url}/auth/google`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tokenId })
    })
    .then(async (res) => {
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
        setToken('user', data.user)
        // navigate('/'); // Example redirect to homepage
      } else {
        console.error('Authentication error:', data.error);
        toast.error(data.error);
      }
    })
    .catch((error) => {
      console.error('Error fetching user data:', error);
      toast.error(error.message);
    });
  };

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
        } 
          // setToken(localStorage.getItem("user"))

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
    handleLogin,
    handleGoogleSignIn,

  }
  
  return (
    <storeContext.Provider value={contextValue}>
      {props.children}

    </storeContext.Provider>
  )
}

export default storeContextProvider
