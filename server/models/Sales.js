

import mongoose from 'mongoose';

const { Schema } = mongoose;

const salesSchema = new Schema({
    
  sales: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Sales = mongoose.model('Sales', salesSchema);

export default Sales;