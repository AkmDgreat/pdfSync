import { Signup, Login } from "../controllers/authController.mjs"
import { userVerification } from "../middlewares/authMiddleware.mjs";
import { Router } from "express";

const router = Router();


router.post("/signup", Signup);
router.post('/login', Login)
router.post('/', userVerification)

export default router;