import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateIncentiveTable = () => {
    const { id } = useParams();
    const [salesTarget, setSalesTarget] = useState();
    const [incentivePercentage, setIncentivePercentage] = useState();
    const [bonus, setBonus] = useState();
    const [benefits, setBenefits] = useState();
    const [additionalBenefits, setAdditionalBenefits] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3001/getUser/${id}`)
        .then(result => {
            setSalesTarget(result.data.salesTarget);
            setIncentivePercentage(result.data.incentivePercentage);
            setBonus(result.data.bonus);
            setBenefits(result.data.benefits);
            setAdditionalBenefits(result.data.additionalBenefits);
        })
        .catch(err => console.log(err));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3001/updateSales/${id}`, {  // Updated URL to match backend route
            salesTarget,
            incentivePercentage,
            bonus,
            benefits,
            additionalBenefits
        })
        .then(() => {
            alert('Sales Target updated successfully!');
            navigate('/view');
        })
        .catch(err => console.log(err));
    };

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className='bg-white p-3 rounded w-50'>
                <form onSubmit={handleSubmit}>
                    <h2>Update Sales Information</h2>
                    <div className='mb-2'>
                        <label htmlFor=''>Sales Target</label>
                        <input type="text" placeholder='ENTER SALES TARGET' className='form-control'
                            value={salesTarget} onChange={(e) => setSalesTarget(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor=''>Incentive Percentage</label>
                        <input type="text" placeholder='ENTER PERCENTAGE' className='form-control'
                            value={incentivePercentage} onChange={(e) => setIncentivePercentage(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor=''>Bonus</label>
                        <input type="text" placeholder='BONUS' className='form-control'
                            value={bonus} onChange={(e) => setBonus(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor=''>Benefits</label>
                        <input type="text" placeholder='ENTER BENEFITS' className='form-control'
                            value={benefits} onChange={(e) => setBenefits(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor=''>Additional Benefits</label>
                        <input type="text" placeholder='ENTER ADDITIONAL BENEFITS' className='form-control'
                            value={additionalBenefits} onChange={(e) => setAdditionalBenefits(e.target.value)} />
                    </div>
                    <button className='btn btn-success'>Update</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateIncentiveTable;
