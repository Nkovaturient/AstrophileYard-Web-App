import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {storeContext} from '../../Context/storeContext.jsx'
import axios from 'axios';

const OAuthCallback = () => {
    const navigate = useNavigate();
    const{setToken}=useContext(storeContext);

    useEffect(() => {
        const handleOAuthCallback = async () => {
            const query = new URLSearchParams(window.location.search);
            const code = query.get('code');

            //https://astrophileyard.onrender.com/auth/google/callback?response_type=code&scope=email%20profile&client_id=1041589073301-hoo78pm8o1lr5u3n8osg332q5q5mq6jt.apps.googleusercontent.com
            if (code) {
                try {
                    const response = await axios.get(`https://astroyard-backend.onrender.com/auth/google/callback?code=${code}`, {
                        headers: {
                            'Access-Control-Allow-Origin': allowedOrigins,
                        },
                        credentials: 'include' // Include credentials if needed
                    });

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const data = await response.json();
                    console.log(data);
                    // setToken()
                    toast.success(`Welcome to Astrophile Yard! You were registered successfully.`);
                    // Handle the received data (e.g., set user session, redirect)
                    navigate('/'); 
                } catch (error) {
                    console.error('Error:', error);
                }
            }
        };

        handleOAuthCallback();
    }, [navigate]);

    return <div>Loading...</div>;
};

export default OAuthCallback;
