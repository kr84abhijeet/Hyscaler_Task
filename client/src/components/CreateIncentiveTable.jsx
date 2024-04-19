import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateIncentiveTable = () => {
    const [salesTarget, setSalesTarget] = useState();
    const [incentivePercentage, setIncentivePercentage] = useState();
    const [bonus, setBonus] = useState();
    const [benefits, setBenefits] = useState();
    const [additionalBenefits, setAdditionalBenefits] = useState();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/createSales', {
            salesTarget,
            incentivePercentage,
            bonus,
            benefits,
            additionalBenefits
        })
        .then(res => {
            alert('Sales Target Entered successfully!');
            navigate('/view');
        })
        .catch(err => console.log(err));
    };

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center" >
            <div className='bg-white p-3 rounded w-50'>
                <form onSubmit={handleSubmit}>
                    <h2>Add Sales Information</h2>
                    <div className='mb-2'>
                        <label htmlFor=''>Sales Target</label>
                        <input type="text" placeholder='ENTER SALES TARGET' className='form-control'
                            onChange={(e) => setSalesTarget(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor=''>Incentive Percentage</label>
                        <input type="text" placeholder='ENTER PERCENTAGE' className='form-control'
                            onChange={(e) => setIncentivePercentage(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor=''>Bonus</label>
                        <input type="text" placeholder='BONUS' className='form-control'
                            onChange={(e) => setBonus(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor=''>Benefits</label>
                        <input type="text" placeholder='ENTER BENEFITS' className='form-control'
                            onChange={(e) => setBenefits(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor=''>Additional Benefits</label>
                        <input type="text" placeholder='ENTER ADDITIONAL BENEFITS' className='form-control'
                            onChange={(e) => setAdditionalBenefits(e.target.value)} />
                    </div>
                    <button className='btn btn-success'>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default CreateIncentiveTable;
