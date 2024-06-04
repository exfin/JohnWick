import React from 'react'
import './styles/Infocard.css'

export const Infocard = ({ userName, imageUrl, isPenalized, missions }) => {
  return (
    <div className='infocard'>
        <img src={imageUrl} className='flag-image' alt="User flag" />
        <h2 className='user-name'>{userName}</h2>
        <h2 className='user-condition'>{isPenalized ? "Penalizado" : "Sin penalizaciones"}</h2>
        <div className='mision-info'>
            {missions.map((mission, index) => (
                <p key={index}>- {mission}</p>  
            ))}
        </div>
    </div>
  )
}
