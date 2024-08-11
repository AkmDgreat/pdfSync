import express from 'express';
import session from 'express-session';
import passport from 'passport';
import fs from 'fs';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import router from './routes/appRoutes.mjs';

import './config/passport-config.mjs'; // Import passport configuration
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI
const PORT = process.env.PORT || 3000

const corsOptions = {
   origin: '*',
   credentials: true,       
   optionsSuccessStatus: 200,
};

const app = express();

app.use(session({
    secret: 'your_session_secret',
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(cors(corsOptions)); // Use this after the variable declaration

app.use("/", router)

// Static folder
app.use(express.static('./public'));

// Serve uploads folder
app.use('/uploads', express.static('uploads'));

// Routes
import authRoutes from './routes/authRoutes.mjs';
import appRoutes from './routes/appRoutes.mjs';

app.use('/auth', authRoutes);
app.use('/home', appRoutes);

// Create uploads directory if it doesn't exist
if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads');
}

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        app.listen(PORT, () => console.log(`listening to port ${PORT}...`))
    } catch (error) {
        console.log(error)
    }
}

connectDB()