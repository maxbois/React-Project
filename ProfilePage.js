




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

const ProfilePage = () => {
  const [userData, setUsersData] = useState([]);
  const { id} = useParams();
  useEffect(() => {
    
    axios.get(`https://64e998f4bf99bdcc8e66d163.mockapi.io/users/${id}`)
      .then(response => {
        setUsersData(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  return (
    <div className="profile">
      <h2>User Profiles</h2>
      
        <div>
          {userData.map(userData => (
            <div key={userData.id}>
              <h3>{userData.username}</h3>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>Mobile:</strong> {userData.mobile}</p>
              <p><strong>Role:</strong> {userData.role}</p>
            </div>
          ))}
        </div>
     
    </div>
  );
};

export default ProfilePage;
