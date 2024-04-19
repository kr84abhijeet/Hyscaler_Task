// models/Sales.js
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const salesSchema = new Schema({
  sales: {
    type: Number,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
});

const Sales = mongoose.model('SalesAdd', salesSchema);

export default Sales;
