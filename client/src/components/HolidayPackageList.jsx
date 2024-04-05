
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/HolidayPackageList.css'

const HolidayPackageList = () => {
  const [holidayPackages, setHolidayPackages] = useState([]);

  useEffect(() => {
    async function fetchHolidayPackage() {
        try{
            const response = await axios.get('http://localhost:3001/packages') ;
            setHolidayPackages(response.data);

        } catch(error){
            console.error('Error fetching holiday package:',error);
        }
    }
    fetchHolidayPackage();
   }, []);

  return (
    <div>
      <h2>Holiday Packages</h2>
      <ul>
        {holidayPackages.map(holidayPackage => (
          <li key={holidayPackage._id}>
            <h3>{holidayPackage.name}</h3>
            <p>Duration: {holidayPackage.duration} nights</p>
            <p>Destination: {holidayPackage.destination}</p>
            <p>Location: {holidayPackage.location}</p>
            <p>Amenities: {holidayPackage.amenities.join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HolidayPackageList;