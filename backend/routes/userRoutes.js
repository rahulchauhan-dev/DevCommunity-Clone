import express from "express";
const router = express.Router();
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getMyPosts,
  savedPost,
  sendOTP,
  OTPVerify,
  OTPVerifyAndPassword,
  sendOTPforPassword,
  getUserPublicProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddlerware.js";

router.route("/").post(registerUser);
router.post("/login", authUser);
router.route("/myposts").get(protect, getMyPosts);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route("/:id").get(getUserPublicProfile);
router.route("/:id/saved").get(protect, savedPost);
router.route("/send-otp").put(protect, sendOTP);
router.route("/verify-otp").put(protect, OTPVerify);
router.route("/forgot-password-otp").put(sendOTPforPassword);
router.route("/verify-password-otp").put(OTPVerifyAndPassword);

export default router;
