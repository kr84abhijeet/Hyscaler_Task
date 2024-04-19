
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/HolidayPackage.css'

const HolidayPackageForm = () => {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [destination, setDestination] = useState('');
  const [location, setLocation] = useState('');
  const [amenities, setAmenities] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get('http://localhost:3001/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3001/holiday-packages', {
        name,
        duration: parseInt(duration),
        destination,
        location,
        amenities: amenities.split(',').map(item => item.trim()),
        userId: selectedUser
      });
      alert('Holiday package added successfully!');
      
      setName('');
      setDuration('');
      setDestination('');
      setLocation('');
      setAmenities('');
      setSelectedUser('');
    } catch (error) {
      console.error('Error adding holiday package:', error);
      alert('Failed to add holiday package. Please try again.');
    }
  };

  return (
    <div>
      <h2>Add Holiday Package</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Duration (Nights):</label>
          <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Destination:</label>
          <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Location:</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Amenities :</label>
          <input type="text" value={amenities} onChange={(e) => setAmenities(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Select User:</label>
          <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
            <option value="">Select User</option>
            {users.map(user => (
              <option key={user._id} value={user._id}>{user.name}</option>
            ))}
          </select>
        </div>
        <button type="submit">Add Holiday Package</button>
      </form>
    </div>
  );
};

export default HolidayPackageForm;