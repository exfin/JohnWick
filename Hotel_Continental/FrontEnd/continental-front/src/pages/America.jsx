import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar } from '../components/Navbar';
import Footer from '../components/Footer';
import { Infocard } from '../components/Infocard';  
import './styles/Region.css';
import { useNavigate } from 'react-router-dom';

export const America = () => {
  const [users, setUsers] = useState([]);

  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
   
    const token = localStorage.getItem('token'); 

    
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    axios.get('http://localhost:2024/api/check-auth', { headers })
    .then(res => {
        if (res.data.Status === "Success") {
            setAuth(true);
        } else {
            setAuth(false);
            navigate('/home');
        }
    })
    .catch(error => {
        console.error('Error fetching data: ', error);
        setAuth(false);
        navigate('/home');
    });
  }, [navigate, setAuth]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:2024/api/user/get-america');
        setUsers(response.data);  
        console.log('Data received for America');
      } catch (error) {
        console.error('Failed to fetch users for America:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className='region-page'>
        <Navbar />
        <div className='members-container'>
            {users.map(user => (
              <Infocard
                key={user._id}  
                userName={user.name}
                imageUrl={user.imageLink}
                isPenalized={user.hasCastigos}
                missions={user.missions || []}  
              />
            ))}
        </div>
        <Footer />
    </div>
  );
}
