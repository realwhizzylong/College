import asyncHandler from 'express-async-handler';
import Admission from '../models/admissionModel.js';
import User from '../models/userModel.js';

export const createAdmissionResult = asyncHandler(async (req, res) => {
    const admission = new Admission({
        user: req.user._id,
        username: req.user.username,
        college: req.body.college,
        year: req.body.year,
        semester: req.body.semester,
        degree: req.body.degree,
        program: req.body.program,
        result: req.body.result,
        date: req.body.date,
        title: req.body.title,
        content: req.body.content
    })
    const createdAdmission = await admission.save();
    res.status(201);
    res.json(createdAdmission);
})

export const updateAdmissionResultById = asyncHandler(async (req, res) => {
    const admission = await Admission.findById(req.params.id);
    if (admission) {
        admission.college = req.body.college || admission.college;
        admission.year = req.body.year || admission.year;
        admission.semester = req.body.semester || admission.semester;
        admission.degree = req.body.degree || admission.degree;
        admission.program = req.body.program || admission.program;
        admission.result = req.body.result || admission.result;
        admission.date = req.body.date || admission.date;
        admission.title = req.body.title || admission.title;
        admission.content = req.body.content || admission.content;
        const updatedAdmission = await admission.save();
        res.json({
            _id: updatedAdmission._id,
            college: updatedAdmission.college,
            year: updatedAdmission.year,
            semester: updatedAdmission.semester,
            degree: updatedAdmission.degree,
            program: updatedAdmission.program,
            result: updatedAdmission.result,
            date: updatedAdmission.date,
            title: updatedAdmission.title,
            content: updatedAdmission.content,
        })
    } else {
        res.status(404);
        throw new Error('Admission result not found');
    }
})

export const deleteAdmissionResultById = asyncHandler(async (req, res) => {
    const admission = await Admission.findById(req.params.id);
    if (admission) {
        await admission.remove();
        res.json({ message: 'Admission result removed' });
    } else {
        res.status(404);
        throw new Error('Admission result not found');
    }
})

export const getAdmissionResults = asyncHandler(async (req, res) => {
    const pageSize = 10;
    const page = Number(req.query.pageNum) || 1;
    const keyword = req.query.keyword ? {
        title: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}
    const count = await Admission.countDocuments({ ...keyword });
    const attr = { updatedAt: -1 }

    const admissions = await Admission.find({ ...keyword }).sort(attr).limit(pageSize).skip(pageSize * (page - 1));;
    res.json({
        admissions,
        page,
        pages: Math.ceil(count / pageSize)
    });
})

export const getAdmissionResultById = asyncHandler(async (req, res) => {
    const admission = await Admission.findById(req.params.id);
    if (admission) {
        res.json(admission);
    } else {
        res.status(404);
        throw new Error('Admission result not found')
    }
})

export const getMyAdmissionResults = asyncHandler(async (req, res) => {
    const attr = { updatedAt: -1 }
    const admissions = await Admission.find({ user: req.user._id }).sort(attr);
    res.json(admissions);
})

export const addComment = asyncHandler(async (req, res) => {
    const { comment } = req.body;
    const admission = await Admission.findById(req.params.id);
    if (admission) {
        const newComment = {
            user: req.user._id,
            username: req.user.username,
            comment
        };
        admission.comments.push(newComment);
        await admission.save();
        res.status(201);
        res.json({ message: 'Comment added' });
    } else {
        res.status(404);
        throw new Error('Admission Result not found');
    }
})

export const getAdmissionPercentage = asyncHandler(async (req, res) => {
    if (req.body.collegeName) {
        const admissions = await Admission.find({ college: req.body.collegeName });
        if (admissions) {
            const user = await User.findById(req.user._id);
            if (user) {
                const userGpa = user.gpa;
                const userLangScore = user.languageTest.score;
                const userGenScore = user.generalTest.score || 0;
                const userScore = (Number)(userGpa) * 100 + (Number)(userLangScore) + (Number)(userGenScore);
                let total = 0;
                let ad = 0;
                for (let admission of admissions) {
                    let sysUser = await User.findById(admission.user._id);
                    let sysUserScore = 0;
                    sysUserScore += (Number)(sysUser.gpa) * 100;
                    if (sysUser.languageTest.toeflOrIelts === 'TOEFL') {
                        sysUserScore += (Number)(sysUser.languageTest.score);
                    } else {
                        sysUserScore += (Number)(sysUser.languageTest.score) * 10 + 30;
                    }
                    if (userGenScore != 0) {
                        sysUserScore += (Number)(sysUser.generalTest.score);
                    }
                    if (sysUserScore >= userScore - 25 || sysUserScore <= userScore + 25) {
                        if (admission.result === "Admitted") {
                            ad++
                        }
                        total++;
                    }
                }
                res.status(201);
                res.json({ percentage: ((ad / total) * 100).toFixed(2) })
            } else {
                res.status(404);
                throw new Error('User not found');
            }
        } else {
            res.status(404);
            throw new Error('No admission data for this college');
        }
    } else {
        res.status(404);
        throw new Error('College not found');
    }
})