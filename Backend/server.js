import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import db from './Configs/dbConnection.js'
import authRoute from './Routes/authRoute.js';

const app=express();
const port=process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // your frontend domain
  credentials: true                //  Allow cookies to be sent
}));

app.get('/',(req,res)=>{
    res.send(`Server is started at port ${port}`);
})
app.use('/api/auth',authRoute);

app.listen(port,()=>{
     console.log(`Server is started at ${port}`)
//   console.log("object")
})