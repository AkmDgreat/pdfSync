import express from 'express';
import authController from '../controllers/authController.mjs';

const Router = express.Router();

Router.get("/google", authController.googleAuth);

export default Router;