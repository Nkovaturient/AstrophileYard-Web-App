import React, { useContext } from 'react';
import GoogleLogin from 'react-google-login';
import { toast } from 'react-toastify';
import { storeContext } from '../../Context/storeContext';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID; 

const GoogleLoginComponent = () => {
    const {url, token, setToken}= useContext(storeContext);

  

  return (
    <div>GoogleLogin</div>
  );
};

export default GoogleLoginComponent;
