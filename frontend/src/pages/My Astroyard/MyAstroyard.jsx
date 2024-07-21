import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { storeContext } from '../../Context/storeContext';

const MyAstroyard = () => {
  const [userData, setUserData] = useState(null);
  const{url,token}=useContext(storeContext);


//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         // Check if user is logged in (e.g., using stored user data)
//         if (token) {
//           const response = await axios.get(`${url}/auth/google/callback`); // Replace with your user data endpoint
//           setUserData(response.data);
//           console.log(response.data);
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchUserData(); 
//   }, []);

  return (
    <div>
      {userData ? (
        <div>
          <h2>Welcome, {userData.name}</h2>
          {/* Display other user data as needed */}
        </div>
      ) : (
        <p>Please sign in to view your data.</p>
      )}
    </div>
  );
};

export default MyAstroyard;
