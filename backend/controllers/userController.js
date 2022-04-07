import asyncHandler from "express-async-handler";
import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  service: "Gmail",

  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

//@desc Auth user & get token
//@route POST /api/users/login
//@access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
      verified: user.verified,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

//@desc Register a new User
//@route POST /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, gender, email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  const user = await User.create({
    name,
    gender,
    email,
    password,
    avatar: `https://avatars.dicebear.com/api/${gender}/${name
      .split(" ")[0]
      .toLowerCase()}.svg`,
    verified: true /*making it true cause smtp mail not working in heroku */,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      gender: user.gender,
      bio: user.bio,
      work: user.work,
      location: user.location,
      avatar: user.avatar,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user Data");
  }
});

//@desc Get user profile
//@route GET /api/users/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      bio: user.bio,
      work: user.work,
      location: user.location,
      avatar: user.avatar,
      savedPost: user.savedPost,
      verified: user.verified,
    });
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

//@desc Update user profile
//@route PUT /api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.gender = req.body.gender || user.gender;
    user.bio = req.body.bio || user.bio;
    user.work = req.body.work || user.work;
    user.location = req.body.location || user.location;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(201).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      bio: updatedUser.bio,
      work: updatedUser.work,
      location: updatedUser.location,
      avatar: updatedUser.avatar,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

//@desc Fetch logged user all Posts
//@route GET /api/users/myposts
//@access Private
const getMyPosts = asyncHandler(async (req, res) => {
  const myposts = await Post.find({ user: req.user._id });
  res.json(myposts);
});

//@desc Fetch Saved Posts
//@route GET /api/saved
//@access Private
const savedPost = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).populate({
    path: "savedPost.post",
    select: "_id title",
  });

  if (user) {
    res.json(user.savedPost);
  } else {
    res.status(404);
    throw new Error("Posts not Found");
  }
});

//@desc PUT send otp
//@route PUT /api/otp
//@access Private
const sendOTP = asyncHandler(async (req, res) => {
  const data = req.body;

  const user = await User.findOne({ email: data.data });

  if (user) {
    var otp = Math.random();
    otp = otp * 1000000;
    otp = parseInt(otp);

    var mailOptions = {
      to: data.data,
      subject: "OTP Verification",
      html:
        "<h3>OTP for account verification for HowTo Community is </h3>" +
        "<h1 style='font-weight:bold;'>" +
        otp +
        "</h1>", // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });
    res.json("OTP SENT!");
    user.otp = otp || user.otp;
    await user.save();
  } else {
    res.status(404);
    throw new Error("OTP not Sent");
  }
});

//@desc PUT OTPVerify
//@route PUT /api/otp
//@access Private
const OTPVerify = asyncHandler(async (req, res) => {
  const data = req.body;
  const user = await User.findOne({ email: data.data.email });

  if (user) {
    if (user.otp === data.data.enteredOTP) {
      user.verified = true;

      await user.save();
      res.json({ success: "Email Verified!" });
    } else {
      res.json({ error: "Wrong OTP Please Try Again." });
    }
  } else {
    res.status(404);
    throw new Error("Cant Verify");
  }
});

//@desc PUT send otp
//@route PUT /api/forgot-password
//@access Public
const sendOTPforPassword = asyncHandler(async (req, res) => {
  const data = req.body;

  const user = await User.findOne({ email: data.data });

  if (user) {
    var otp = Math.random();
    otp = otp * 1000000;
    otp = parseInt(otp);

    var mailOptions = {
      to: data.data,
      subject: "Forgot Password",
      html:
        "<h3>OTP for Password Change request is </h3>" +
        "<h1 style='font-weight:bold;'>" +
        otp +
        "</h1>", // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });
    res.json("OTP SENT!");
    user.passotp = otp || user.passotp;
    await user.save();
  } else {
    res.status(404);
    throw new Error("OTP not Sent");
  }
});

//@desc PUT OTPVerify and ChangePassword
//@route PUT /api/forgot-password
//@access Private
const OTPVerifyAndPassword = asyncHandler(async (req, res) => {
  const data = req.body;
  const user = await User.findOne({ email: data.data.email });

  if (user) {
    if (user.passotp === data.data.enteredOTP) {
      user.password = data.data.newPassword;

      await user.save();
      res.json({ success: "Password Chagned! Plesase Re-Login" });
    } else {
      res.json({ error: "Wrong OTP or Email Please Try Again." });
    }
  } else {
    res.status(404);
    throw new Error("Cant Verify");
  }
});

export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getMyPosts,
  savedPost,
  sendOTP,
  OTPVerify,
  sendOTPforPassword,
  OTPVerifyAndPassword,
};
