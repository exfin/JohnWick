import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import Footer from '../components/Footer';
import { Conflictcard } from '../components/Conflictcard';
import './styles/Conflictos.css';

export const Conflictos = () => {
  const [auth, setAuth] = useState(false);
  const [conflicts, setConflicts] = useState([]); 
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const token = localStorage.getItem('token');
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    axios.get('http://localhost:2024/api/check-auth', { headers })
    .then(res => {
        if (res.data.Status === "Success") {
            setAuth(true);
            fetchConflicts(headers); 
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

    function fetchConflicts(headers) {
      axios.get('http://localhost:2024/api/conflict/get', { headers })
      .then(response => {
        setConflicts(response.data);  
      })
      .catch(error => console.error('Failed to fetch conflicts:', error));
    }
  }, [navigate]);

  return (
    <div className='conflicts-page'>
        <Navbar />
        <div className='conflicts-container'>
            {conflicts.map((conflict) => (
                <Conflictcard
                  key={conflict._id}  
                  conflictId={conflict._id}  
                  conflictName={conflict.conflictName}
                  usersGroup1={conflict.usersGroup1}
                  usersGroup2={conflict.usersGroup2}
                />
            ))}
        </div>
        <Footer />
    </div>
  );
}

export default Conflictos;
