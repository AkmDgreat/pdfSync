import axios from 'axios';
import jwt from 'jsonwebtoken';
// import { promisify } from 'util';
import catchAsync from '../utils/catchAsync.mjs';
import AppError from './../utils/appError.mjs';
import { auth } from 'googleapis/build/src/apis/abusiveexperiencereport/index.js';
// import User from '../models/userModel';
import { OAuth2Client } from 'google-auth-library';

import dotenv from 'dotenv';
dotenv.config();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URL = 'http://localhost:3000'

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_TIMEOUT,
    });
};

// Create and send Cookie ->
const createSendToken = (user, statusCode, res) => {
    const token = signToken(user.id);

    console.log(process.env.JWT_COOKIE_EXPIRES_IN);
    const cookieOptions = {
        expires: new Date(Date.now() + +process.env.JWT_COOKIE_EXPIRES_IN),
        httpOnly: true,
        path: '/',
        // sameSite: "none",
        secure: false,
    };
    if (process.env.NODE_ENV === 'production') {
        cookieOptions.secure = true;
        cookieOptions.sameSite = 'none';
    }

    user.password = undefined;

    res.cookie('jwt', token, cookieOptions);

    console.log(user);

    res.status(statusCode).json({
        message: 'success',
        token,
        data: {
            user,
        },
    });
};

/* GET Google Authentication API. */
const googleAuth = catchAsync(async (req, res, next) => {
    const code = req.query.code;
    console.log("USER CREDENTIAL -> ", code);

    const oauth2Client = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, REDIRECT_URL);
    const googleRes = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(googleRes.tokens);

    const userRes = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
	);
	
    let user = await User.findOne({ email: userRes.data.email });
   
    if (!user) {
        console.log('New User found');
        user = await User.create({
            name: userRes.data.name,
            email: userRes.data.email,
            image: userRes.data.picture,
        });
    }

    createSendToken(user, 201, res);
});

export default {googleAuth}