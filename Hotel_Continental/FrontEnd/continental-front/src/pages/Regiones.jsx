import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import Footer from '../components/Footer';
import './styles/Regiones.css';
import { useNavigate } from 'react-router-dom';

export const Regiones = () => {
    const [leaders, setLeaders] = useState({
      america: 'Loading...',
      europa: 'Loading...',
      asia: 'Loading...',
      africa: 'Loading...',
      oceania: 'Loading...',
      antartida: 'Loading...'
    });
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
      const fetchLeaders = async () => {
        try {
          const response = await axios.get('http://localhost:2024/api/leader/get');
          const leaderMap = {};
          response.data.forEach(leader => {
            if (leader.region) {
              leaderMap[leader.region.toLowerCase()] = leader.name;
            }
          });
          setLeaders(prev => ({...prev, ...leaderMap}));
        } catch (error) {
          console.error('Failed to fetch leaders:', error);
          setLeaders(prev => {
            let newStates = {...prev};
            Object.keys(newStates).forEach(key => newStates[key] = 'Failed to load');
            return newStates;
          });
        }
      };

      fetchLeaders();
    }, []);
  
    return (
      <div className='region-page'>
        <Navbar />
        <div className='regions'>
          <div className='region'>
            <Link to='/america' className='region-title'>América</Link>
            <p className='region-leader'>{leaders.america}</p>
          </div>
          <div className='region'>
            <Link to='/europa' className='region-title'>Europa</Link>
            <p className='region-leader'>{leaders.europa}</p>
          </div>
          <div className='region'>
            <Link to='/asia' className='region-title'>Asia</Link>
            <p className='region-leader'>{leaders.asia}</p>
          </div>
          <div className='region'>
            <Link to='/africa' className='region-title'>Africa</Link>
            <p className='region-leader'>{leaders.africa}</p>
          </div>
          <div className='region'>
            <Link to='/oceania' className='region-title'>Oceania</Link>
            <p className='region-leader'>{leaders.oceania}</p>
          </div>
          <div className='region'>
            <Link to='/antartida' className='region-title'>Antartida</Link>
            <p className='region-leader'>{leaders.antartida}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
}

export default Regiones;
