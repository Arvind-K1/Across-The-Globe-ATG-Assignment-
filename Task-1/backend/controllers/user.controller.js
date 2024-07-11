import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import * as crypto from 'crypto';


const registerUser = asyncHandler( async (req,res) => {
    const { username, email, password } = req.body;

    if(
        [username, email, password].some((field) => field?.trim()==="")
    ){
        throw new ApiError(400,"All fields are required")
    }

    const existedUser = await User.findOne({ email });

    if (existedUser){
        throw new ApiError(409,"User already exist")
    }

    const user = new User({
        username,   
        email,
        password
    });
    
    await user.save();

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser){
        throw new ApiError(500,"Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User register Successfully")
    )

})

const loginUser = asyncHandler( async (req,res) =>{
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if (!user){
        throw new ApiError(404,"User not found")
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch){
        throw new ApiError(401,"Invalid credentials")
    }

    return res.status(201).json(
        new ApiResponse(200, '', "User login Successfully")
    )
});

const forgotPassword = asyncHandler( async(req,res) => {
    const { email } = req.body;
    const user = await User.findOne({email});

    if (!user){
        throw new ApiError(404,"User not found")
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
            user: 'your-email@gmail.com',
            pass: 'your-email-password'
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

    return res.status(201).json(
        new ApiResponse(200, '', "Password reset email sent")
    )
});

const resetPassword = asyncHandler( async(req,res) => {
    const user = await User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
        throw new ApiError(404, "Password reset token is invalid or has expired.")
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return res.status(201).json(
        new ApiResponse(200, '', "Password reset successful")
    )
})

export {
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword
}

