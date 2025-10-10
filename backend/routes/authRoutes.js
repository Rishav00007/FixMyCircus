import express from "express";
import {
  signup,
  login,
  forgotPassword,
  resetPassword,
  sendOTP, //
  verifyOTP,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/send-otp", sendOTP); // send OTP to user email
router.post("/verify-otp", verifyOTP); // verify OTP and create account

router.post("/signup", signup); // original signup (optional now)
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
