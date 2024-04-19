// models/Incentive.js
import mongoose from 'mongoose';



const incentiveSchema = new mongoose.Schema({
  userId: {
    type: String,
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
  additionalBenefits: {
    type: String,
    default: ''
  },
  incentiveAmount: {
    type: Number,
    required: true
  }
});

const Incentive = mongoose.model('IncentivePanel', incentiveSchema);

export default Incentive;
