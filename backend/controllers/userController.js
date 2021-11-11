import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    const matchEmailWithPassword = async (passwordEntered) => {
        return await bcrypt.compare(passwordEntered, user.password);
    }

    if (user && await matchEmailWithPassword(password)) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
})

export const register = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({ username, email, password: bcrypt.hashSync(password, 10) });

    if (user) {
        res.status(201)
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
})

export const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.status(201)
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            gender: user.gender,
            location: user.location
        })
    } else {
        res.status(404);
        throw new Error('User not found');
    }
})

export const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.gender = req.body.gender || user.gender;
        user.location = req.body.location || user.location;

        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            gender: updatedUser.gender,
            location: updatedUser.location,
            token: generateToken(updatedUser._id)
        })
    } else {
        res.status(404);
        throw new Error('User not found');
    }
})

export const changePassword = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        if (req.body.newPassword) {
            user.password = bcrypt.hashSync(req.body.newPassword, 10)
        }

        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            token: generateToken(updatedUser._id)
        })
    } else {
        res.status(404);
        throw new Error('User not found');
    }
})

export const getUserBackground = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.status(201)
        res.json({
            _id: user._id,
            school: user.school,
            schoolLevel: user.schoolLevel,
            major: user.major,
            gpa: user.gpa,
            langTest: user.languageTest.toeflOrIelts,
            langScore: user.languageTest.score,
            genTest: user.generalTest.greOrGmat,
            genScore: user.generalTest.score,
            workLevel: user.workExp.level,
            workYears: user.workExp.years,
            researchExp: user.researchExp,
            competitionExp: user.competitionExp,
            otherInfo: user.otherInfo,
        })
    } else {
        res.status(404);
        throw new Error('User not found');
    }
})

export const updateUserBackground = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.school = req.body.school || user.school;
        user.schoolLevel = req.body.schoolLevel || user.schoolLevel;
        user.major = req.body.major || user.major;
        user.gpa = req.body.gpa || user.gpa;
        user.languageTest.toeflOrIelts = req.body.langTest || user.languageTest.toeflOrIelts;
        user.languageTest.score = req.body.langScore || user.languageTest.score;
        user.generalTest.greOrGmat = req.body.genTest || user.generalTest.greOrGmat;
        user.generalTest.score = req.body.genScore || user.generalTest.score;
        user.workExp.level = req.body.workLevel || user.workExp.level;
        user.workExp.years = req.body.workYears || user.workExp.years;
        user.researchExp = req.body.researchExp || user.researchExp;
        user.competitionExp = req.body.competitionExp || user.competitionExp;
        user.otherInfo = req.body.otherInfo || user.otherInfo;

        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            school: updatedUser.school,
            schoolLevel: updatedUser.schoolLevel,
            major: updatedUser.major,
            gpa: updatedUser.gpa,
            langTest: updatedUser.languageTest.toeflOrIelts,
            langScore: updatedUser.languageTest.score,
            genTest: updatedUser.generalTest.greOrGmat,
            genScore: updatedUser.generalTest.score,
            workLevel: updatedUser.workExp.level,
            workYears: updatedUser.workExp.years,
            researchExp: updatedUser.researchExp,
            competitionExp: updatedUser.competitionExp,
            otherInfo: updatedUser.otherInfo,
            token: generateToken(updatedUser._id)
        })
    } else {
        res.status(404);
        throw new Error('User not found');
    }
})

export const getAdmissionBackground = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        res.status(201)
        res.json({
            _id: user._id,
            school: user.school,
            schoolLevel: user.schoolLevel,
            major: user.major,
            gpa: user.gpa,
            langTest: user.languageTest.toeflOrIelts,
            langScore: user.languageTest.score,
            genTest: user.generalTest.greOrGmat,
            genScore: user.generalTest.score,
            workLevel: user.workExp.level,
            workYears: user.workExp.years,
            researchExp: user.researchExp,
            competitionExp: user.competitionExp,
            otherInfo: user.otherInfo,
        })
    } else {
        res.status(404);
        throw new Error('User not found');
    }
})