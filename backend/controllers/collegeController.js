import asyncHandler from 'express-async-handler';
import College from '../models/collegeModel.js';

export const getColleges = asyncHandler(async (req, res) => {
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}
    const attr = { ranking: 1 }
    const colleges = await College.find({ ...keyword }).sort(attr);
    res.json(colleges);
})

export const getCollegeById = asyncHandler(async (req, res) => {
    const college = await College.findById(req.params.id);
    if (college) {
        res.json(college);
    } else {
        res.status(404);
        throw new Error('College not found')
    }
})

export const getCollegeByName = asyncHandler(async (req, res) => {
    const college = await College.findOne({ name: req.body.collegeName });
    if (college) {
        res.json(college);
    } else {
        res.status(404);
        throw new Error('College not found')
    }
})