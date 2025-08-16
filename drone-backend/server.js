//server.js

const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require("cors");
dotenv.config();
app.use(express.json());
const bookingRoutes = require("./routes/bookingRoute");
const userRoutes = require('./routes/userRoutes');
const droneRoutes = require('./routes/droneRoutes');



mongoose.connect(process.env.MONGO_URI)
.then(()=>(console.log('connected to database .....')))
.catch(()=>console.log('Database connection failed.....'))

app.use(cors()); 

app.get('/',async(req,res)=>{
    return res.json({
        success:true,
        message:"From Backend"
    })
})

app.use('/auth', userRoutes);

app.use('/drone',droneRoutes);

app.use('/booking', bookingRoutes);


const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`Server Started SuccessFully...... ${port}`);
})

