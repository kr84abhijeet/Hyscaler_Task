import React, { useState } from 'react';
import axios from 'axios';
import '../css/EmailNotification.css'

const PerformanceEmailSender = () => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const sendEmail = async () => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post('http://localhost:3001/send-email', {
        to,
        subject,
        performanceMetrics: {
          sales: 100, // Example value, replace with actual performance metrics
        },
        incentiveDetails: {
          incentivePercentage: 5, // Example value, replace with actual incentive details
          bonus: 1000,
          additionalBenefits: 'Eligibility for a holiday package',
          incentiveAmount: 10500
        }
      });

      setSuccessMessage(response.data.message);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to send email');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Send Performance Email</h2>
      <div>
        <label>Email:</label>
        <input type="email" value={to} onChange={(e) => setTo(e.target.value)} />
      </div>
      <div>
        <label>Subject:</label>
        <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
      </div>
      <button onClick={sendEmail} disabled={isLoading}>Send Email</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default PerformanceEmailSender;
