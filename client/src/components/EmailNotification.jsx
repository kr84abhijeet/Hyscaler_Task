

import React, { useState } from 'react';
import axios from 'axios';
import '../css/EmailNotification.css';

const EmployeeNotificationForm = () => {
  const [emailDetails, setEmailDetails] = useState({
    recipient: '',
    subject: '',
    body: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setEmailDetails({
      ...emailDetails,
      [e.target.name]: e.target.value
    });
  };

  const sendEmail = async () => {
    setError('');
    try {
      const response = await axios.post('/send-email', emailDetails);
      console.log(response.data);
      
      setEmailDetails({
        recipient: '',
        subject: '',
        body: ''
      });
    } catch (error) {
      setError('Error sending email');
      console.error(error);
    }
  };

  return (
    <div className="employee-notification-form">
      <h2>Employee Notification System</h2>
      <input
        type="text"
        name="recipient"
        placeholder="Recipient Email"
        value={emailDetails.recipient}
        onChange={handleChange}
      />
      <input
        type="text"
        name="subject"
        placeholder="Subject"
        value={emailDetails.subject}
        onChange={handleChange}
      />
      <textarea
        name="body"
        placeholder="Body"
        value={emailDetails.body}
        onChange={handleChange}
      ></textarea>
      <button onClick={sendEmail}>Send Email</button>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default EmployeeNotificationForm;
