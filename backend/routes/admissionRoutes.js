import express from 'express';
import { protectedRoute } from '../middleware/authMiddleware.js';
import { createAdmissionResult, updateAdmissionResultById, deleteAdmissionResultById, getAdmissionResults, getAdmissionResultById, getMyAdmissionResults, addComment, getAdmissionPercentage } from '../controllers/admissionController.js'

const router = express.Router();

router.get('/', getAdmissionResults);

router.post('/', protectedRoute, createAdmissionResult);

router.get('/myadmissions', protectedRoute, getMyAdmissionResults);

router.post('/percentage', protectedRoute, getAdmissionPercentage);

router.post('/:id/comments', protectedRoute, addComment);

router.get('/:id', getAdmissionResultById);

router.put('/:id', protectedRoute, updateAdmissionResultById);

router.delete('/:id', protectedRoute, deleteAdmissionResultById);

export default router;