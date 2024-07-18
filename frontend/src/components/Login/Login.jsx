import React, { useContext, useEffect, useState } from 'react'
import './Login.css'
import { storeContext } from '../../Context/storeContext.jsx';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import GoogleLogin from 'react-google-login';

const Login = ({setLoginPopup}) => {

    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID; 
    const {url, token, setToken, handleLogin}= useContext(storeContext);
    const[currState, setCurrState]=useState('LogIn')
    const[data, setData]=useState({
        username: '',
        email: '',
        password: '',
        category: 'Astrophile',
    });
    const navigate=useNavigate();

    const[loginData, setLoginData]=useState({
       
        email: '',
        password: '',
    });

    const onChangeHandler=(event)=>{
        const name=event.target.name;
        const value=event.target.value;

        setData(data => ({ ...data, [name]: value}))
        setLoginData(data => ({...data, [name]: value}))

    }


    const onLogin=async(event)=>{
        event.preventDefault();
        
        if(currState === 'LogIn'){
           
           const response= await axios.post(`${url}/login`, loginData);
           if(response.data.success){
            //    console.log(response.data)
               toast.info(`Logged in successfully! Dive your way in.`);
               setToken(response.data.token);
               localStorage.setItem('token', response.data.token);//verify sign in-console application
               setLoginPopup(false);
               navigate('/');
   
           }else if(response.data.failure){
             toast.error(`Invalid Credentials! Try signing up.`);
           } else {
               toast.error(response.data.message);
           }
        } else if(currState === 'SignUp'){
            const response= await axios.post(`${url}/signup`, data);
           if(response.data.success){
            //    console.log(response.data)
               toast.success(`Welcome to Astrophile Yard! You were registered successfully.`);
               setToken(response.data.token);
               localStorage.setItem('token', response.data.token);//verify sign in-console application
               setLoginPopup(false);
               navigate('/');
   
           } else if(response.data.failure){
            toast.error(response.data.message);
          }
            else {
               toast.error(response.data.message);
           }
        }
    }
    

  return (
    <div className='login-popup'>
    <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currState}</h2>
            <span><FontAwesomeIcon icon={faClose} onClick={() => setLoginPopup(false)} /></span>
            {/* <img onClick={() => setLoginPopup(false)} src={assets.cross_icon} alt="close" /> */}
        </div> 
          
   <div style={{textAlign: "center"}} className="g-btn">
    {/* <button className="google-btn" onClick={()=> navigate('/googleLogin')}>  SignUp with Google</button> */}
    <GoogleLogin
      clientId={clientId}
      buttonText="Login with Google"
      onSuccess={handleLogin}
      onFailure={(error) => console.error('Google Login Error:', error)}
      cookiePolicy={'single_host_origin'} // Optional for improved security
    />
   </div>
   <p style={{textAlign: "center"}}>OR</p>
   <hr />
        <div className="login-popup-inputs">
            { currState === 'LogIn'
            ? '' 
            : <input onChange={onChangeHandler} value={data.username}
            type="text" name='username' placeholder='Your Good Name' required />
             
            }
            <input onChange={onChangeHandler} value={currState === 'LogIn'? loginData.email : data.email}
            type="email" name='email' placeholder='Enter your email' required />
            <input onChange={onChangeHandler} value={currState === 'LogIn'? loginData.password : data.password}
             type="password" name='password' placeholder='Enter a strong password' required />
             {
                currState === 'LogIn'
                ? ''
                : <select name="category" onChange={onChangeHandler} >
                    <option value="student">Student</option>
                    <option value="astrophile">Astrophile</option>
                    <option value="working professional">Working Professional</option>
                    <option value="photographer">Photographer</option>
                    <option value="stargazer">Stargazer</option>
                    <option value="just checking in">Just Checking in</option>
                </select>
             }
        </div>
        
        <div className="login-popup-condition">
            <input type="checkbox" required/>
            <p>By continuing, I agree to the Terms of use and Privacy Policy</p>
        </div>
        
        <button type='submit'>{currState === 'SignUp'? 'Create a New Account' : 'LogIn'}</button>
        {
            currState === 'LogIn'
            ? <p style={{textAlign: "center"}}>Create a new account? <button onClick={()=>setCurrState('SignUp')}> SignUp</button></p>
            : <p style={{textAlign: "center"}}>Already Registered? <button onClick={()=>setCurrState('LogIn')}> LogIn</button></p>
        }
        {/* <br /> */}
      
    </form>
    
  
</div>
  )
}

export default Login