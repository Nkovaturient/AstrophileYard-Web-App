import React, { useContext } from 'react';
import { storeContext } from '../../Context/storeContext';
import GoogleLogin from '@leecheuk/react-google-login';
import { toast } from 'react-toastify';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID; 

const GoogleLoginComponent = () => {
    const {url, token, setToken}= useContext(storeContext);

    const onSuccess = async(response) => {
      try{
        console.log('Login Success:', response);
      const code=response.code;
      // Send the response.code (authorization code) to your backend for verification
     if(code){
        const result=await axios.post(`${url}/auth/google`, {code})
        if(result.data.success){
          console.log(`User Data`, result.data);
        }else {
          console.error('Error fetching user data:', result.data.error);
        }
     }
      } catch(err){
        toast.error(`${err.message}`);
        console.log(err.message);
      }
    };
  
    const onError = (error) => {
      toast.error('Login Failed:', {
        theme:'colored',
      });
      console.log(error);
    };
  

  return (
    <>
    <div>GoogleLogin</div>
    <GoogleLogin
      clientId={clientId}
      buttonText="Login with Google"
      onSuccess={onSuccess}
      onFailure={onError}
    //   cookiePolicy={'single_host_origin'}
    />
    </>
  );
};

export default GoogleLoginComponent;
