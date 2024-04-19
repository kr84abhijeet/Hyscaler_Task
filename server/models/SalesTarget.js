import mongoose from 'mongoose';

const SalesTargetSchema = new mongoose.Schema({
    salesTarget: {
      type: Number,
      required: true
    },
    incentivePercentage: {
      type: Number,
      required: true
    },
    bonus: {
      type: Number,
      required: true
    },
    benefits: {
        type: String,
        default: ''
      },
    additionalBenefits: {
      type: String,
      default: ''
    },
    
  });
  
  const SalesTarget = mongoose.model('salesTarget', SalesTargetSchema );
  
  export default SalesTarget;