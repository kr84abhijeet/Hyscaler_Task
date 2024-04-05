import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import jwt, { decode } from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import EmployeeModel from './models/Employe.js'
import Sales from './models/Sales.js'
import HolidayPackage from './models/HolidayPackage.js'
import nodemailer from 'nodemailer'
// import Email from './models/EmailNotification.js'

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials:true
}))

mongoose.connect('mongodb://localhost:27017/employee')
function calculateIncentive(sales) {
    let incentivePercentage = 0;
    let bonus = 0;
    let additionalBenefits = '';
  
    //incentive calculation logic
    if (sales >= 10000 && sales < 20000) {
      incentivePercentage = 1.5;
    } else if (sales >= 20000 && sales < 30000) {
      incentivePercentage = 3;
    } else if (sales >= 30000 && sales < 50000) {
      incentivePercentage = 3.5;
      bonus = 1000;
    } else if (sales >= 50000) {
      incentivePercentage = 5;
      additionalBenefits = 'Eligibility for a holiday package';
    }
  
    const incentiveAmount = sales * (incentivePercentage / 100) + bonus;
  
    return {
      incentivePercentage: incentivePercentage,
      bonus: bonus,
      additionalBenefits: additionalBenefits,
      incentiveAmount: incentiveAmount
    };
  }

app.post('/register',(req,res) =>{
    const {name,email,password} = req.body;
    EmployeeModel.create({name,email,password})
    .then(user => res.json(user))
    .catch(err => res.json(err))
})
app.post('/login', (req,res)=> {
    const {email,password }= req.body;
    EmployeeModel.findOne({email})
    .then(user => {
        if(user ) {
            if(user.password === password){
                const accessToken = jwt.sign({email: email},
                    "jwt-access-token-secret-key",{expiresIn: '1m'})
                const refreshToken = jwt.sign({email: email},
                    "jwt-refresh-token-secret-key",{expiresIn: '5m'})

                res.cookie('accessToken' , accessToken, {maxAge: 60000})

                res.cookie('refreshToken' , refreshToken,
                 {maxAge: 300000, httpOnly: true,secure: true,sameSite: 'strict'})   
                return res.json({Login: true})    
            }

        } else {
            return res.json({Login: false, Message: "No record found." })
        }
    }).catch(err => res.json(err))

})
const verifyUser = (req,res,next) => {
    const accessToken = req.cookies.accessToken;
    if(!accessToken) {
        if(renewToken(req,res)) {
            next()
        }

    }else {
        jwt.verify(accessToken, 'jwt-access-token-secret-key', (err ,decoded) => {
            if(err){
                return res.json({valid: false, message: "Invalid Token"})
            }else{
                req.email = decoded.email
                next()
            }
        })
    }

} 
const renewToken = (req,res) =>{
    const refreshToken = req.cookies.refreshToken;
    let exist = false;
    if(!refreshToken) {
        return res.json({valid: false , message: "No Refresh Token"})

    }else {
        jwt.verify(refreshToken, 'jwt-refresh-token-secret-key', (err ,decoded) => {
            if(err){
                return res.json({valid: false, message: "Invalid Refresh Token"})
            }else{
                const accessToken = jwt.sign({email: decoded.email},
                    "jwt-access-token-secret-key",{expiresIn: '1m'})
                res.cookie('accessToken' , accessToken, {maxAge: 60000})
                exist = true;
            }
        })
    }
    return exist;

}
app.get('/dashboard',verifyUser,(req,res) => {
    return res.json({valid:true ,message: "Authorized"})
})
app.post('/calculate-incentive', async (req, res) => {
    const { sales } = req.body;
  
    try {
    
      const newSalesEntry = await Sales.create({ sales });
      console.log('New sales entry created:', newSalesEntry);
  
      
      const incentive = calculateIncentive(sales);
  
      
      res.json(incentive);
    } catch (error) {
      console.error('Error creating sales entry:', error);
      res.status(500).json({ error: 'Failed to calculate incentive' });
    }
  });
  app.post('/holiday-packages', async (req, res) => {
    const { name, duration, destination, location, amenities ,employeeId} = req.body;
  
    try {
      const newPackage = await HolidayPackage.create({
        name,
        duration,
        destination,
        location,
        amenities,
        employee: employeeId
      });
      res.status(201).json(newPackage);
    } catch (error) {
      console.error('Error creating holiday package:', error);
      res.status(500).json({ error: 'Failed to create holiday package' });
    }
  });
  app.get('/packages', async (req, res) => {
    try {
      const packages = await HolidayPackage.find();
      res.json(packages);
    } catch (error) {
      console.error('Error fetching holiday packages:', error);
      res.status(500).json({ error: 'Failed to fetch holiday packages' });
    }
  });
  
  // Route to get a single holiday package by ID
  app.get('/packages/:id', async (req, res) => {
    try {
      const holidaypackage = await HolidayPackage.findById(req.params.id);
      if (!holidaypackage) {
        return res.status(404).json({ error: 'Holiday package not found' });
      }
      res.json(holidaypackage);
    } catch (error) {
      console.error('Error fetching holiday package:', error);
      res.status(500).json({ error: 'Failed to fetch holiday package' });
    }
  });
  
  // Route to update a holiday package
  app.put('/packages/:id', async (req, res) => {
    try {
      const updatedPackage = await HolidayPackage.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedPackage) {
        return res.status(404).json({ error: 'Holiday package not found' });
      }
      res.json(updatedPackage);
    } catch (error) {
      console.error('Error updating holiday package:', error);
      res.status(500).json({ error: 'Failed to update holiday package' });
    }
  });
  
  // Route to delete a holiday package
  app.delete('/packages/:id', async (req, res) => {
    try {
      const deletedPackage = await HolidayPackage.findByIdAndDelete(req.params.id);
      if (!deletedPackage) {
        return res.status(404).json({ error: 'Holiday package not found' });
      }
      res.json({ message: 'Holiday package deleted successfully' });
    } catch (error) {
      console.error('Error deleting holiday package:', error);
      res.status(500).json({ error: 'Failed to delete holiday package' });
    }
  });
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth:{
      user: 'kumarideppika9931@gmail.com',
      pass: 'Deep2002@dk'
    },
    
  });
//   app.post('/send-email',async(req,res) => {
//     const { to, subject, performanceMetrics, incentiveDetails } = req.body;

//   try {
    
//     // const emailBody = `
//     //   <p>Hello,</p>
//     //   <p>Your performance metrics for the day:</p>
//     //   <ul>
//     //     <li>Total Sales: ${performanceMetrics.sales}</li>
//     //     <li>Incentive Percentage: ${incentiveDetails.incentivePercentage}%</li>
//     //     <li>Bonus: ${incentiveDetails.bonus}</li>
//     //     <li>Additional Benefits: ${incentiveDetails.additionalBenefits}</li>
//     //     <li>Incentive Amount: ${incentiveDetails.incentiveAmount}</li>
//     //   </ul>
//     //   <p>Thank you.</p>
//     // `;

//     // Send email
//     await transporter.sendMail({
//       from: 'kumarideppika9931@gmail.com',
//       to: to,
//       subject: subject,
//       html: emailBody
//     });

    
//     const email = new Email({
//       to,
//       subject,
//       message: emailBody
//     });
//     await email.save();

//     res.json({ success: true, message: 'Email sent successfully' });
//   } catch (error) {
//     console.error('Error sending email:', error);
//     res.status(500).json({ success: false, message: 'Failed to send email' });
//   }
// });
  
app.listen(3001, ()=> {
    console.log("Server is running")
})
