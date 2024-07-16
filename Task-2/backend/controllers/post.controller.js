 import AppError from "../utils/appError.js";
 import { asyncHandler } from "../utils/asyncHandler.js";
 
 import Post from "../models/post.model.js";
 import Comment from "../models/comment.model.js";
 import Like from "../models/like.model.js";

 const createPost = asyncHandler( async (req,res,next) => {
    const { title, content, author } = req.body;
    
    if(!title || !content || !author){
        return next(new AppError("Please provide all the required fields",400));
    }

    const newPost = new Post({
        title,
        content,
        author
    });

    if(!newPost){
        return next(new AppError("Something went wrong",500));
    }

    await newPost.save();

    res.status(201).json({
        status: true,
        message: "Post created successfully",
        data: newPost
    });
 });

 const getPosts = asyncHandler( async (req,res,next) => {
    const posts = await Post.find().populate('author').populate('comments').populate('likes');

    if(!posts){
        return next(new AppError("Something went wrong",500));
    }

    res.status(200).json({
        status: true,
        message: "Posts fetched successfully",
        data: posts
    })
 });

 const getPostById = asyncHandler( async (req,res,next) => {
    const post = await Post.findById(req.params.id).populate('author').populate('comments').populate('likes');

    if(!post){
        return next(new AppError("Post not found",404));
    }

    res.status(200).json({
        status: true,
        message: "Post fetched successfully",
        data: post
    })

 });

 const updatePost = asyncHandler( async (req,res,next) => {
    const { title, content } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, { title, content }, { new: true });

    if(!updatePost){
        return next(new AppError("Post not found",404));
    }

    res.status(200).json({
        status: true,
        message: "Post updated successfully",
        data: updatedPost
    })
 
 });

 const deletePost = asyncHandler( async (req,res,next) => {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);

    if(!deletePost){
        return next(new AppError("Post not found",404));
    }

    await Comment.deleteMany({ post: req.params.id });
    await Like.deleteMany({ post: req.params.id });

    res.status(200).json({
        status: true,
        message: "Post deleted successfully",
    })
 });

 export {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost
 }