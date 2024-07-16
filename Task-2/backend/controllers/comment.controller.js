import AppError from "../utils/appError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import Comment from "../models/comment.model.js";
import Post from "../models/post.model.js";

const addComment = asyncHandler( async (req,res,next) => {
    const { content, user, postId } = req.body;
    
    if(!content || !user || !postId ){
        return next(new AppError("Please provide all the required fields",400));
    }

    const newComment = new Comment({ content, user, post: postId });

    if(!newComment){
        return next(new AppError("Something went wrong",500));
    }

    res.status(201).json({
        status: true,
        message: "Comment added successfully",
        data: newComment
    })
});

const deleteComment = asyncHandler( async (req,res,next) => {
    const { commentId, postId } = req.body;
    await Comment.findByIdAndDelete(commentId);
    await Post.findByIdAndUpdate(postId, { $pull: { comments: commentId } });

    res.status(200).json({
        status: true,
        message: "Comment deleted successfully"

    })
});

export {
    addComment,
    deleteComment
}