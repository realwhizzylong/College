import express from 'express';
import { protectedRoute } from '../middleware/authMiddleware.js';
import { createPost, updatePostById, deletePostById, getPosts, getPostById, getMyPosts, addComment } from '../controllers/postController.js';

const router = express.Router();

router.get('/', getPosts);

router.post('/', protectedRoute, createPost);

router.get('/myposts', protectedRoute, getMyPosts);

router.post('/:id/comments', protectedRoute, addComment);

router.get('/:id', getPostById);

router.put('/:id', protectedRoute, updatePostById);

router.delete('/:id', protectedRoute, deletePostById);

export default router;