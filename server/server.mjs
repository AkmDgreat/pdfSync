import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import router from './routes/appRoutes.mjs';
import authRouter from './routes/authRoutes.mjs'
import cookieParser from 'cookie-parser';

import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI
const PORT = process.env.PORT || 8000

const corsOptions = {
   origin: ['http://localhost:3000', 'http://localhost:8000'],
   credentials: true,       
   optionsSuccessStatus: 200,
};

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors(corsOptions)); 

app.use('/', authRouter); // <- NEW LINE
app.use("/api/v1/", router)

// Static folder
app.use(express.static('./public'));

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        app.listen(PORT, () => console.log(`listening to port ${PORT}...`))
    } catch (error) {
        console.log(error)
    }
}

connectDB()