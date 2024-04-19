import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ViewIncentiveTable = () => {
    const [salesData, setSalesData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/view')
        .then(result => {
            setSalesData(result.data);
        })
        .catch(err => console.log(err));
    }, []);

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className='bg-white p-3 rounded w-50'>
                <Link to="/create" className='btn btn-success'>Add</Link>

                <table className='table'>
                    <thead>
                        <tr>
                            <th>Sales Target</th>
                            <th>Incentive Percentage</th>
                            <th>Bonus</th>
                            <th>Benefits</th>
                            <th>Additional Benefits</th>
                            <th>Total Incentive</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            salesData.map(sales => (
                                <tr key={sales._id}>
                                    <td>{sales.salesTarget}</td>
                                    <td>{sales.incentivePercentage}</td>
                                    <td>{sales.bonus}</td>
                                    <td>{sales.benefits}</td>
                                    <td>{sales.additionalBenefits}</td>
                                    <td>{sales.totalIncentive}</td> {/* Display total incentive */}
                                    <td>
                                        <Link to={`/update/${sales._id}`} className='btn btn-success'>Update</Link>
                                        <button className='btn btn-danger'>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewIncentiveTable;
