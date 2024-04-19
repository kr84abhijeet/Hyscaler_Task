import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import jwt, { decode } from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import EmployeeModel from './models/Employe.js'
import Sales from './models/Sales.js'
import Incentive from './models/Incentive.js'
import HolidayPackage from './models/HolidayPackage.js'
import Email from './models/EmailNotification.js'
import nodemailer from 'nodemailer'
<<<<<<< HEAD
import { MongoClient } from 'mongodb';
import SalesTarget from './models/SalesTarget.js'


=======
>>>>>>> 856196bc1a42d85e4aa485855109697a5f41c45e


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true
}))

mongoose.connect('mongodb://localhost:27017/employee')
async function insertData() {
  const uri = 'mongodb://localhost:27017/employee';
  const client = new MongoClient(uri);

  try {
    await client.connect();

    const database = client.db('employee');
    const collection = database.collection('incentivematrixes');

    const data = [
      {
        "tier": "Tier 1",
        "salesTarget": { "min": 0, "max": 9999 },
        "percentage": 1.5,
        "bonus": 0,
        "additionalBenefits": ""
      },
      {
        "tier": "Tier 2",
        "salesTarget": { "min": 10000, "max": 19999 },
        "percentage": 3,
        "bonus": 0,
        "additionalBenefits": ""
      },
      {
        "tier": "Tier 3",
        "salesTarget": { "min": 20000, "max": 29999 },
        "percentage": 3.5,
        "bonus": 1000,
        "additionalBenefits": ""
      },
      {
        "tier": "Tier 4",
        "salesTarget": { "min": 30000, "max": 49999 },
        "percentage": 5,
        "bonus": 0,
        "additionalBenefits": ""
      },
      {
        "tier": "Tier 5",
        "salesTarget": { "min": 50000, "max": Infinity },
        "percentage": 5,
        "bonus": 0,
        "additionalBenefits": "Eligibility for a holiday package"
      }
    ];

    const result = await collection.insertMany(data);
    console.log(`${result.insertedCount} documents inserted.`);
  } finally {
    await client.close();
  }
}

// Call the data insertion function
insertData().catch(console.error);
function calculateIncentive(sales) {
  let incentivePercentage = 0;
  let bonus = 0;
  let additionalBenefits = '';
  const data = [
    {
      "tier": "Tier 1",
      "salesTarget": { "min": 0, "max": 9999 },
      "percentage": 1.5,
      "bonus": 0,
      "additionalBenefits": ""
    },
    {
      "tier": "Tier 2",
      "salesTarget": { "min": 10000, "max": 19999 },
      "percentage": 3,
      "bonus": 0,
      "additionalBenefits": ""
    },
    {
      "tier": "Tier 3",
      "salesTarget": { "min": 20000, "max": 29999 },
      "percentage": 3.5,
      "bonus": 1000,
      "additionalBenefits": ""
    },
    {
      "tier": "Tier 4",
      "salesTarget": { "min": 30000, "max": 49999 },
      "percentage": 5,
      "bonus": 0,
      "additionalBenefits": ""
    },
    {
      "tier": "Tier 5",
      "salesTarget": { "min": 50000, "max": Infinity },
      "percentage": 5,
      "bonus": 0,
      "additionalBenefits": "Eligibility for a holiday package"
    }
  ];

  
  for (const tier of data) {
    if (sales >= tier.salesTarget.min && sales <= tier.salesTarget.max) {
      incentivePercentage = tier.percentage;
      bonus = tier.bonus;
      additionalBenefits = tier.additionalBenefits;
      break;
    }
  }

  
  const incentiveAmount = sales * (incentivePercentage / 100) + bonus;

  return {
    incentivePercentage,
    bonus,
    additionalBenefits,
    incentiveAmount
  };
}

// Sample route for calculating incentive
app.post('/calculate-incentive', (req, res) => {
  const { salesAmount } = req.body;
  if (!salesAmount) {
    return res.status(400).json({ error: 'Sales amount is required' });
  }

  try {
    const incentiveDetails = calculateIncentive(salesAmount);
    res.status(200).json(incentiveDetails);
  } catch (error) {
    console.error('Error calculating incentive:', error);
    res.status(500).json({ error: 'Failed to calculate incentive' });
  }
});



// function calculateIncentive(sales) {
//   let incentivePercentage = 0;
//   let bonus = 0;
//   let additionalBenefits = '';

//   // Incentive calculation logic
//   if (sales >= 10000 && sales < 20000) {
//     incentivePercentage = 1.5;
//   } else if (sales >= 20000 && sales < 30000) {
//     incentivePercentage = 3;
//   } else if (sales >= 30000 && sales < 50000) {
//     incentivePercentage = 3.5;
//     bonus = 1000;
//   } else if (sales >= 50000) {
//     incentivePercentage = 5;
//     additionalBenefits = 'Eligibility for a holiday package';
//   }

//   const incentiveAmount = sales * (incentivePercentage / 100) + bonus;

//   return {
//     incentivePercentage : incentivePercentage,
//     bonus: bonus,
//     additionalBenefits : additionalBenefits,
//     incentiveAmount : incentiveAmount
//   };
// }
app.get('/view', async (req, res) => {
  try {
    const salesTargets = await SalesTarget.find();
    const salesDataWithTotalIncentive = salesTargets.map(salesTarget => ({
      ...salesTarget.toObject(),
      totalIncentive: salesTarget.salesTarget * (salesTarget.incentivePercentage / 100)
    }));
    res.json(salesDataWithTotalIncentive);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/getUser/:id', async (req, res) => {
  try {
    const salesTarget = await SalesTarget.findById(req.params.id);
    if (!salesTarget) {
      return res.status(404).json({ message: 'Sales target not found' });
    }
    const totalIncentive = salesTarget.salesTarget * (salesTarget.incentivePercentage / 100);
    res.json({ ...salesTarget.toObject(), totalIncentive });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.post('/createSales', async (req, res) => {
  const salesTarget = new SalesTarget(req.body);
  try {
    const newSalesTarget = await salesTarget.save();
    const totalIncentive = newSalesTarget.salesTarget * (newSalesTarget.incentivePercentage / 100);
    res.status(201).json({ ...newSalesTarget.toObject(), totalIncentive });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/updateSales/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await SalesTarget.findByIdAndUpdate(id, req.body);
    res.json({ message: 'Sales target updated successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/deleteSales/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await SalesTarget.findByIdAndDelete(id);
    res.json({ message: 'Sales target deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  EmployeeModel.create({ name, email, password })
    .then(user => res.json(user))
    .catch(err => res.json(err))
})
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  EmployeeModel.findOne({ email })
    .then(user => {
      if (user) {
        if (user.password === password) {
          const accessToken = jwt.sign({ email: email },
            "jwt-access-token-secret-key", { expiresIn: '1m' })
          const refreshToken = jwt.sign({ email: email },
            "jwt-refresh-token-secret-key", { expiresIn: '5m' })

          res.cookie('accessToken', accessToken, { maxAge: 60000 })

          res.cookie('refreshToken', refreshToken,
            { maxAge: 300000, httpOnly: true, secure: true, sameSite: 'strict' })
          return res.json({ Login: true })
        }

      } else {
        return res.json({ Login: false, Message: "No record found." })
      }
    }).catch(err => res.json(err))

})
const verifyUser = (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    if (renewToken(req, res)) {
      next()
    }

  } else {
    jwt.verify(accessToken, 'jwt-access-token-secret-key', (err, decoded) => {
      if (err) {
        return res.json({ valid: false, message: "Invalid Token" })
      } else {
        req.email = decoded.email
        next()
      }
    })
  }

}
const renewToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  let exist = false;
  if (!refreshToken) {
    return res.json({ valid: false, message: "No Refresh Token" })

  } else {
    jwt.verify(refreshToken, 'jwt-refresh-token-secret-key', (err, decoded) => {
      if (err) {
        return res.json({ valid: false, message: "Invalid Refresh Token" })
      } else {
        const accessToken = jwt.sign({ email: decoded.email },
          "jwt-access-token-secret-key", { expiresIn: '1m' })
        res.cookie('accessToken', accessToken, { maxAge: 60000 })
        exist = true;
      }
    })
  }
  return exist;

}
app.get('/dashboard', verifyUser, (req, res) => {
  return res.json({ valid: true, message: "Authorized" })
})
<<<<<<< HEAD

app.post('/sales', async (req, res) => {
  const { sales, userId } = req.body;
  if (!sales || !userId) {
    return res.status(400).json({ error: 'Sales and userId are required' });
  }

  try {
    
    const newSales = await Sales.create({ sales, userId });
    const { incentivePercentage, bonus, additionalBenefits, incentiveAmount } = calculateIncentive(sales);
    await Incentive.create({ userId, incentivePercentage, bonus, additionalBenefits, incentiveAmount });
    res.status(201).json(newSales);
  } catch (error) {
    console.error('Error creating sales entry:', error);
    res.status(500).json({ error: 'Failed to create sales entry' });
  }
});


app.get('/sales-data', async (req, res) => {
  try {
    const salesData = await Sales.find();
    res.json(salesData);
  } catch (error) {
    console.error('Error fetching sales data:', error);
    res.status(500).json({ error: 'Failed to fetch sales data' });
  }
});

app.get('/incentives', async (req, res) => {
  try {
    const incentiveData = await Incentive.find();
    res.json(incentiveData);
  } catch (error) {
    console.error('Error fetching incentive data:', error);
    res.status(500).json({ error: 'Failed to fetch incentive data' });
  }
});


app.post('/holiday-packages', async (req, res) => {
  const { name, duration, destination, location, amenities, employeeId } = req.body;

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
  auth: {
    user: 'kumarideppika9931@gmail.com',
    pass: 'Deep2002@dk'
  },

});
app.post('/send-mail', async (req, res) => {
  const { recipient, subject, body } = req.body;
  try {

    const newEmail = new Email({
      recipient,
      subject,
      body
    });
    await newEmail.save();

    // Send email
    await transporter.sendMail({
      from: 'kumarideppika9931@gmail.com',
      to: recipient,
      subject: subject,
      text: body
    });

    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending email');
  }
});

app.listen(3001, () => {
  console.log("Server is running")
=======
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
  app.post('/send-mail', async (req, res) => {
    const { recipient, subject, body } = req.body;
    try {
    
      const newEmail = new Email({
        recipient,
        subject,
        body
      });
      await newEmail.save();
  
      // Send email
      await transporter.sendMail({
        from: 'kumarideppika9931@gmail.com',
        to: recipient,
        subject: subject,
        text: body
      });
  
      res.status(200).send('Email sent successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error sending email');
    }
  });
  
app.listen(3001, ()=> {
    console.log("Server is running")
>>>>>>> 856196bc1a42d85e4aa485855109697a5f41c45e
})
