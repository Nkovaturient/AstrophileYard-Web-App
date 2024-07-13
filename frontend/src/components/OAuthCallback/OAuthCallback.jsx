import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OAuthCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleOAuthCallback = async () => {
            const query = new URLSearchParams(window.location.search);
            const code = query.get('code');

            if (code) {
                try {
                    const response = await fetch(`https://astroyard-backend.onrender.com/auth/google/callback?code=${code}`, {
                        method: 'GET',
                        credentials: 'include' // Include credentials if needed
                    });

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const data = await response.json();
                    console.log(data);
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
