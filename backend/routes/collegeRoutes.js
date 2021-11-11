import express from 'express';
import { getColleges, getCollegeById, getCollegeByName } from '../controllers/collegeController.js';
import { protectedRoute } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getColleges);

router.post('/name', protectedRoute, getCollegeByName);

router.get('/:id', getCollegeById);

export default router;