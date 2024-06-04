import React from 'react'
import { Navbar } from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import './styles/Reglamento.css'
import axios from 'axios'
import { useState, useEffect } from 'react'

export const Reglamento = () => {
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
  return (
    <div className='rules-page'>
        <Navbar></Navbar>
        <div className='rules-container'>
            <h3 className='rule-text'>Dentro de nuestra venerable organización, el Medallón de Sangre representa un pacto sagrado entre miembros. Aquel que haya prestado un servicio considerable a otro recibirá este medallón, que contiene una muestra de su propia sangre. El portador del medallón tiene el derecho inalienable de reclamar una compensación por el favor prestado en cualquier momento futuro.
            </h3>
            <br></br>
            <br></br>
            <h3 className='rule-text'>La Excomunión es la pena máxima por transgredir las normas sagradas establecidas por el Continental o la Orden Suprema. El miembro excomulgado será irrevocablemente expulsado, perdiendo todos los derechos y privilegios asociados a los servicios de nuestros hoteles y la protección de la Alta Mesa. En situaciones donde un administrador de hotel infrinja nuestras leyes, su establecimiento será declarado desconsagrado y perderá toda protección de nuestra Orden.
            </h3>
            <br></br>
            <br></br>
            <h3 className='rule-text'>La Prueba de Lealtad exige de nuestros miembros un sacrificio supremo para demostrar su fidelidad al regente de la Orden. Este acto de devoción puede incluir la mutilación de parte de su propio cuerpo, ofrecido en sacrificio a cambio de un favor excepcional.
            </h3>
            <br></br>
            <br></br>
            <h3 className='rule-text'>El Duelo es un método tradicional para resolver disputas dentro de nuestra fraternidad. Cualquier miembro, incluidos los de la Orden Suprema, tiene el derecho de desafiar a otro en duelo siempre que cuente con el respaldo de uno de los doce venerables de la Alta Mesa. Los participantes deben acordar previamente la hora, el lugar y el tipo de armas a utilizar en el encuentro. Un agente de la Orden Suprema supervisará el duelo para asegurar el cumplimiento de nuestras leyes y tradiciones.</h3>
            
        </div>
        <Footer></Footer>
    </div>
  )
}
