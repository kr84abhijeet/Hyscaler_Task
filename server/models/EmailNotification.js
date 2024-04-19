import  mongoose from "mongoose";

const EmailSchema = new mongoose.Schema({
  recipient: String,
  subject: String,
  body: String
});

const Email = mongoose.model('Email', EmailSchema);
export default Email