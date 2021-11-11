import asyncHandler from 'express-async-handler';
import Post from '../models/postModel.js';

export const createPost = asyncHandler(async (req, res) => {
    const post = new Post({
        user: req.user._id,
        username: req.user.username,
        title: req.body.title,
        content: req.body.content
    })
    const createdPost = await post.save();
    res.status(201);
    res.json(createdPost);
})

export const updatePostById = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (post) {
        post.title = req.body.title || post.title;
        post.content = req.body.content || post.content;
        const updatedPost = await post.save();
        res.json({
            _id: updatedPost._id,
            title: updatedPost.title,
            content: updatedPost.content,
        })
    } else {
        res.status(404);
        throw new Error('Post not found');
    }
})

export const deletePostById = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (post) {
        await post.remove();
        res.json({ message: 'Post removed' });
    } else {
        res.status(404);
        throw new Error('Post not found');
    }
})

export const getPosts = asyncHandler(async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNum) || 1;
    const keyword = req.query.keyword ? {
        title: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}
    const count = await Post.countDocuments({ ...keyword });
    const attr = { updatedAt: -1 }

    const posts = await Post.find({ ...keyword }).sort(attr).limit(pageSize).skip(pageSize * (page - 1));;
    res.json({
        posts,
        page,
        pages: Math.ceil(count / pageSize)
    });
})

export const getPostById = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (post) {
        res.json(post);
    } else {
        res.status(404);
        throw new Error('Post not found')
    }
})

export const getMyPosts = asyncHandler(async (req, res) => {
    const attr = { updatedAt: -1 }
    const posts = await Post.find({ user: req.user._id }).sort(attr);
    res.json(posts);
})

export const addComment = asyncHandler(async (req, res) => {
    const { comment } = req.body;
    const post = await Post.findById(req.params.id);
    if (post) {
        const newComment = {
            user: req.user._id,
            username: req.user.username,
            comment
        };
        post.comments.push(newComment);
        await post.save();
        res.status(201);
        res.json({ message: 'Comment added' });
    } else {
        res.status(404);
        throw new Error('Post not found');
    }
})