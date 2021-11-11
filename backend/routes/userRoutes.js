import express from 'express';
import { protectedRoute } from '../middleware/authMiddleware.js';
import { login, register, getUserProfile, updateUserProfile, changePassword, getUserBackground, updateUserBackground, getAdmissionBackground } from '../controllers/userController.js';

const router = express.Router();

router.post('/login', login);

router.post('/register', register);

router.get('/profile', protectedRoute, getUserProfile);

router.put('/profile', protectedRoute, updateUserProfile);

router.put('/changepassword', protectedRoute, changePassword);

router.get('/background', protectedRoute, getUserBackground);

router.put('/background', protectedRoute, updateUserBackground);

router.get('/admissionBackground/:id', getAdmissionBackground);

export default router;