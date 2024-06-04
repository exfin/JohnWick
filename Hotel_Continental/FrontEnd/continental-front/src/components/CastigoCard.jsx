import React from 'react';
import './styles/CastigoCard.css';

export const CastigoCard = ({ userName, userImageLink, castigoDescription, castigoDate }) => {
  return (
    <div className='castigo-card'>
        <img src={userImageLink} alt={`${userName}'s flag`} className='flag-image' />
        <h2 className='user-name'>{userName}</h2>
        <h1 className='castigo-description'>{castigoDescription}</h1>
        <p className='fecha'>{new Date(castigoDate).toLocaleDateString()} at {new Date(castigoDate).toLocaleTimeString()}</p>
    </div>
  );
}
