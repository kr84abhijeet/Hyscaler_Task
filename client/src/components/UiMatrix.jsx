// components/UIMatrix.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/UiMatrix.css';

function UIMatrix() {
  const [salesData, setSalesData] = useState([]);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    if (userId) {
      const fetchSalesData = async () => {
        try {
          const response = await axios.get('http://localhost:3001/sales-data', {
            params: { userId }
          });
          setSalesData(response.data);
        } catch (error) {
          console.error('Error fetching sales data:', error);
        }
      };

      fetchSalesData();
    }
  }, [userId]);

  return (
    <div className="ui-matrix-container">
      <h2>Sales Data with Incentives</h2>
      <div>
        <label>User ID:</label>
        <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
      </div>
      <table>
        <thead>
          <tr>
            <th>Sales</th>
            <th>Incentive Percentage</th>
            <th>Bonus</th>
            <th>Additional Benefits</th>
            <th>Incentive Amount</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map((sale) => (
            <tr key={sale._id}>
              <td>{sale.sales}</td>
              <td>{sale.incentivePercentage}</td>
              <td>{sale.bonus}</td>
              <td>{sale.additionalBenefits}</td>
              <td>{sale.incentiveAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UIMatrix;
