// import express from 'express';
// import authController from '../controllers/authController.mjs';

// const Router = express.Router();

// Router.get("/", authController.googleAuth);

// export default Router;

// CHATGPT:
import express from "express";
import { OAuth2Client } from "google-auth-library";
import User from "../models/User.mjs";

const router = express.Router();
const CLIENT_ID =
  "650511107339-a4avh4qp1i87h4a3ed4su7m43ddk10m1.apps.googleusercontent.com";
const client = new OAuth2Client();

router.post("/api/v1/auth/google", async (req, res) => {
    console.log("in the backend")
  const { token } = req.body;

  try {
    // Verify the token with Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub, email, name, picture } = payload;

    // Find or create the user in the database
    let user = await User.findOne({ googleId: sub });
    if (!user) {
      user = new User({ googleId: sub, email, name, picture });
      await user.save();
    }

    // Optionally generate a session or JWT token
    // const jwtToken = generateJWT(user);

    res
      .status(200)
      .json({ message: "User authenticated", user /*, token: jwtToken */ });
  } catch (error) {
    console.error("Error verifying Google token:", error);
    res.status(401).json({ message: "Invalid Google token" });
  }
});

export default router;
