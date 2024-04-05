

import React, { useState } from 'react';
import axios from 'axios';
import '../css/SalesForm.css'

function SalesForm() {
  const [sales, setSales] = useState('');
  const [incentive, setIncentive] = useState(null);
  const [error, setError] = useState('');

  const handleSalesChange = (e) => {
    setSales(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/calculate-incentive', { sales: parseInt(sales) });
      setIncentive(response.data);
      setError('');
    } catch (error) {
      setError('Error calculating incentive. Please try again.');
      console.error(error);
    }
  };

  return (
    
    <div className="form-container">
      <h2>Sales Incentive Calculator</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="sales">Sales:</label>
          <input type="number" id="sales" value={sales} onChange={handleSalesChange} />
        </div>
        <button type="submit">Calculate Incentive</button>
      </form>
      {incentive && (
        <div>
          <h3>Incentive Details:</h3>
          <p>Incentive Percentage: {incentive.incentivePercentage}%</p>
          <p>Bonus: ${incentive.bonus}</p>
          <p>Additional Benefits: {incentive.additionalBenefits}</p>
          <p>Total Incentive Amount: ${incentive.incentiveAmount}</p>
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
      


    </div>
    

    
  );
}

export default SalesForm;