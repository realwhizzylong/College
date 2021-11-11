import dotenv from 'dotenv';
import colleges from './data/colleges.js';
import users from './data/users.js';
import College from './models/collegeModel.js';
import User from './models/userModel.js';
import Admission from './models/admissionModel.js';
import Post from './models/postModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await College.deleteMany();
        await User.deleteMany();
        await Admission.deleteMany();
        await Post.deleteMany();

        await User.insertMany(users);
        await College.insertMany(colleges);

        console.log('Data imported.');
        process.exit();
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await College.deleteMany();
        await User.deleteMany();
        await Admission.deleteMany();
        await Post.deleteMany();

        console.log('Data destroyed.');
        process.exit();
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}