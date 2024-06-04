import React, { useState } from 'react';
import axios from 'axios';
import './styles/ConflictCard.css';

export const Conflictcard = ({ conflictId, conflictName, usersGroup1, usersGroup2 }) => {
    const [selectedUsersGroup1, setSelectedUsersGroup1] = useState(new Set());
    const [selectedUsersGroup2, setSelectedUsersGroup2] = useState(new Set());
    const [castigoDescription, setCastigoDescription] = useState('');

   
    const toggleUserSelectionGroup1 = (userId) => {
        setSelectedUsersGroup1(prev => {
            const updated = new Set(prev);
            if (updated.has(userId)) {
                updated.delete(userId);
            } else {
                updated.add(userId);
            }
            return updated;
        });
    };

    
    const toggleUserSelectionGroup2 = (userId) => {
        setSelectedUsersGroup2(prev => {
            const updated = new Set(prev);
            if (updated.has(userId)) {
                updated.delete(userId);
            } else {
                updated.add(userId);
            }
            return updated;
        });
    };

    
    const handleConfirm = async () => {
        const selectedUsers = [...selectedUsersGroup1, ...selectedUsersGroup2];
        if (selectedUsers.length === 0 || !castigoDescription) {
            alert('Please select at least one user and specify a castigo.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:2024/api/user/add-castigo', {
                userIDs: selectedUsers,
                castigoDescription
            });
            console.log('Castigo added:', response.data);
           
            setSelectedUsersGroup1(new Set());
            setSelectedUsersGroup2(new Set());
            setCastigoDescription('');
        } catch (error) {
            console.error('Error adding castigo:', error);
        }
    };

    
    const handleResolve = async () => {
        try {
            const response = await axios.post('http://localhost:2024/api/conflict/solve-conflict', {
                conflictId
            });
            console.log('Conflict resolved:', response.data);
            alert('Conflict has been marked as solved.');
        } catch (error) {
            console.error('Error resolving conflict:', error);
            alert('Failed to mark conflict as solved.');
        }
    };

    return (
        <div className='conflict-card'>
            <div className='left-boxes'>
                {usersGroup1.map((user) => (
                    <div key={user._id}>
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedUsersGroup1.has(user._id)}
                                onChange={() => toggleUserSelectionGroup1(user._id)}
                            />
                            {user.name}
                        </label>
                    </div>
                ))}
            </div>
            <div className='buttons-input'>
                <h3>{conflictName}</h3>
                <input
                    value={castigoDescription}
                    onChange={(e) => setCastigoDescription(e.target.value)}
                    placeholder="Castigo Description"
                />
                <div className='buttons'>
                    <button className='confirm-button' onClick={handleConfirm}>Confirmar</button>
                    <button className='erase-button' onClick={handleResolve}>Resolver</button>
                </div>
            </div>
            <div className='right-boxes'>
                {usersGroup2.map((user) => (
                    <div key={user._id}>
                        <label>
                            <input
                                type="checkbox"
                                checked={selectedUsersGroup2.has(user._id)}
                                onChange={() => toggleUserSelectionGroup2(user._id)}
                            />
                            {user.name}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};
