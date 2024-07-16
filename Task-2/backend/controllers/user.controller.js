import AppError from "../utils/appError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import User from "../models/user.model.js";

import * as crypto from 'crypto';
import nodemailer from "nodemailer";


const registerUser = asyncHandler( async (req,res,next) => {
    const {username, email, password } = req.body;

    if(!username || !email || !password){
        return next(new AppError("Please provide all the required fields",400));
    }

    const existedUser = await User.findOne({email});

    if(existedUser){
        return next(new AppError("Email already exists",400));
    }

    const user = new User({
        username,   
        email,
        password
    });
    
    await user.save();

    const createdUser = await User.findById(user._id).select("-password");

    if (!createdUser){
        throw new ApiError(500,"Something went wrong while registering the user")
    }

    res.status(201).json({
        status: true,
        message: "User Register Successfully",
        data: createdUser

    });
});

const loginUser = asyncHandler( async (req,res,next) => {
    const {email, password} = req.body;

    if(!email || !password){
        return next(new AppError("Please provide all the required fields",400));
    }

    const user = await User.findOne({email});

    if(!user){
        return next(new AppError("Invalid email or password",400));
    }

    const isMatched = await user.comparePassword(password);

    if(!isMatched){
        return next(new AppError("Invalid credentials",400));
    }

    res.status(200).json({
        status: true,
        message: "User Login Successfully"
    })

});

const forgotPassword = asyncHandler( async (req,res,next) => {
    const { email } = req.body;
    const user = await User.findOne({email});

    if (!user){
        return next(new AppError("User not found",404));
    }

    // Generate reset token
    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    // Send email with the token
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'email@gmail.com',
            pass: 'email-password'
        }
    });

    const mailOptions = {
        to: user.email,
        from: 'passwordreset@demo.com',
        subject: 'Password Reset',
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        http://${req.headers.host}/reset/${token}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };

    await transporter.sendMail(mailOptions);

    return res.status(201).json({
        status: true,
        message: "Email sent successfully"

    });
});

const resetPassword = asyncHandler( async (req,res,next) => {
    const user = await User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
        return next(new AppError("Token is invalid or has expired", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return res.status(201).json({
        status: true,
        message: "Password reset successfully"

    });
});

export {
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword
}
