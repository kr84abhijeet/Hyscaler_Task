import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import jwt, { decode } from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import EmployeeModel from './models/Employe.js'

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials:true
}))

mongoose.connect('mongodb://localhost:27017/employee')

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


app.listen(3001, ()=> {
    console.log("Server is running")
})
