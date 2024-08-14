import express from 'express';
import authController from '../controllers/authController.mjs';

const Router = express.Router();

Router.get("/", authController.googleAuth);

export default Router;