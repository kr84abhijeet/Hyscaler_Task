// components/SalesForm.js
import React, { useState } from 'react';
import axios from 'axios';
import '../css/SalesForm.css';

function SalesForm() {
  const [userId, setUserId] = useState('');
  const [sales, setSales] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/sales', { userId, sales });
      alert('Sales data submitted successfully!');
    } catch (error) {
      console.error('Error submitting sales data:', error);
      alert('Failed to submit sales data. Please try again.');
    }
  };

  return (
    <div className="sales-form-container">
      <h2>Enter Sales Data</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User ID:</label>
          <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
        </div>
        <div>
          <label>Sales:</label>
          <input type="text" value={sales} onChange={(e) => setSales(e.target.value)} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SalesForm;
