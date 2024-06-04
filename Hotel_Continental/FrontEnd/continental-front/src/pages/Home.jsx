import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Home.css';
import axios from 'axios';
import { RiLockPasswordFill } from "react-icons/ri";
import { HiMiniUserCircle } from "react-icons/hi2";

export const Home = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [auth, setAuth] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials({
      ...credentials,
      [name]: value
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:2024/api/admin/login', credentials);
      if (response.data.success) {
        localStorage.setItem('token', response.data.token); 
        alert('Inicio de sesión exitoso');
        console.log('Inicio de sesión exitoso', response.data);
        navigate('/registro'); 
      } else {
        alert(`Error al iniciar sesión: ${response.data.message}`);
      }
    } catch (error) {
      if (error.response) {
        alert(`Error al iniciar sesión: ${error.response.data.message}`);
      } else {
        alert('Error al iniciar sesión: No se recibió respuesta del servidor');
      }
    }
  };
  return (
          <div className='login-page'>
            <div className='login-container'>
                <form className='form' onSubmit={handleSubmit}>
                  <h1>Continental</h1>
                  <div className="input-box">
                        <input type="text" placeholder='Nombre de usuario' name="username" required value={credentials.username} onChange={handleChange} />
                        <HiMiniUserCircle className='icon' />
                  </div>
                  <div className="input-box">
                        <input type="password" placeholder='Contraseña' name="password" required value={credentials.password} onChange={handleChange} />
                        <RiLockPasswordFill className='icon' />
                  </div>
                  
                  <button type='submit' className='button'>Iniciar Sesión</button>
                 
                </form>
            </div>
        </div>
  )
}
