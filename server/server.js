const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

require('./db/dbConnection');


console.log("env ",process.env.NODE_ENV);

const app = express();

app.use(cors({
    origin: '*'
}));

app.use(express.json());

app.use(require("./routes/authRoutes"));
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})