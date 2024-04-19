import  mongoose from "mongoose";

const EmailSchema = new mongoose.Schema({
  recipient: String,
  subject: String,
  body: String
});

const Email = mongoose.model('Email', EmailSchema);
<<<<<<< HEAD
export default Email
=======
export default Email
>>>>>>> 856196bc1a42d85e4aa485855109697a5f41c45e
