import AppError from "../utils/appError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import Like from "../models/like.model.js";
import Post from "../models/post.model.js";

const likePost = asyncHandler( async (req,res,next) => {
    const { user, postId } = req.body;
    
    if ( !user || !postId) {
        return next(new AppError("Please provide user and post id", 400));
    }

    const newLike = new Like({user, post: postId});

    if(!newLike){
        return next(new AppError("Something went wrong", 500));
    }

    await newLike.save();

    await Post.findByIdAndUpdate(postId, { $push: { likes: newLike._id } });


    res.status(200).json({
        status: true,
        message: "Like added successfully",
        data: newLike
    })
});

const unlikePost = asyncHandler( async (req,res,next) => {
    const { userId, postId } = req.body;

    const like = await Like.findOneAndDelete({ user: userId, post: postId });

    if(!like){
        return next(new AppError("Like not found", 500));
    }

    await Post.findByIdAndUpdate(postId, { $pull: { likes: like._id } });

    res.status(200).json({
        status: true,
        message: "Like removed successfully",
    })

});

export {
    likePost,
    unlikePost
}