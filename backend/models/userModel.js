import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: false
        },
        location: {
            type: String,
            required: false,
        },
        school: {
            type: String,
            required: false
        },
        schoolLevel: {
            type: String,
            required: false
        },
        major: {
            type: String,
            required: false
        },
        gpa: {
            type: String,
            required: false
        },
        languageTest: {
            toeflOrIelts: {
                type: String,
                required: false
            },
            score: {
                type: String,
                required: false
            }
        },
        generalTest: {
            greOrGmat: {
                type: String,
                required: false
            },
            score: {
                type: String,
                required: false
            }
        },
        workExp: {
            level: {
                type: String,
                required: false
            },
            years: {
                type: String,
                required: false
            }
        },
        researchExp: {
            type: String,
            required: false
        },
        competitionExp: {
            type: String,
            required: false
        },
        otherInfo: {
            type: String,
            required: false
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('User', userSchema);

export default User;