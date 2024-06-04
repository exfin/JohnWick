import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar } from '../components/Navbar';
import Footer from '../components/Footer';
import { CastigoCard } from '../components/CastigoCard';
import './styles/Castigos.css';
import { useNavigate } from 'react-router-dom';


export const Castigos = () => {
  const [castigos, setCastigos] = useState([]); 

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
    const fetchCastigos = async () => {
      try {
        const response = await axios.get('http://localhost:2024/api/user/get-castigos');
        setCastigos(response.data); 
      } catch (error) {
        console.error('Failed to fetch castigos:', error);
      }
    };

    fetchCastigos();
  }, []);

  return (
    <div className='castigos-page'>
        <Navbar />
        <div className='castigos-container'>
            {castigos.map((castigo) => (
                <CastigoCard
                  key={castigo.castigoId}
                  userName={castigo.userName}
                  userImageLink={castigo.userImageLink}
                  castigoDescription={castigo.castigoDescription}
                  castigoDate={castigo.castigoDate}
                />
            ))}
        </div> 
        <Footer />
    </div>
  );
}
