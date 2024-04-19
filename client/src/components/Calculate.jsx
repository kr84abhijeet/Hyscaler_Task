import React, { useState } from 'react';
import axios from 'axios';
import '../css/Calculate.css'; 

function Calculate() {
  const [salesAmount, setSalesAmount] = useState('');
  const [tier, setTier] = useState('');
  const [incentiveDetails, setIncentiveDetails] = useState(null);
  const [error, setError] = useState('');

  const handleSalesAmountChange = (event) => {
    setSalesAmount(event.target.value);
  };

  const calculateIncentive = async () => {
    try {
      const response = await axios.post('http://localhost:3001/calculate-incentive', {
        salesAmount: parseInt(salesAmount)
      });
      setTier(response.data.tier);
      setIncentiveDetails(response.data);
      setError('');
    } catch (error) {
      setError('Error calculating incentive');
      console.error('Error calculating incentive:', error);
    }
  };

  return (
    <div className="container"> 
      <h1>Incentive Calculator</h1>
      <div>
        <label htmlFor="salesAmount">Enter Sales Amount: </label>
        <input
          type="number"
          id="salesAmount"
          value={salesAmount}
          onChange={handleSalesAmountChange}
        />
      </div>
      <button onClick={calculateIncentive}>Calculate Incentive</button>
      {error && <p className="error">{error}</p>} 
      {incentiveDetails && (
        <div className="result"> 
          <h2>Tier: {tier}</h2>
          <p>Incentive Percentage: {incentiveDetails.incentivePercentage}%</p>
          <p>Bonus: ${incentiveDetails.bonus}</p>
          <p>Additional Benefits: {incentiveDetails.additionalBenefits}</p>
          <p>Total Incentive Amount: ${incentiveDetails.incentiveAmount}</p>
        </div>
      )}
    </div>
  );
}

export default Calculate;
