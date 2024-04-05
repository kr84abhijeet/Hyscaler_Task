import mongoose from "mongoose";

const holidayPackageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    
  },
  duration: {
    type: Number,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  location: {
    type: String,
    
  },
  amenities: {
    type: [String],
    
  }
});

const HolidayPackage = mongoose.model('HolidayPackages', holidayPackageSchema);
export default HolidayPackage