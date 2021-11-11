import mongoose from 'mongoose';

const commentSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        username: {
            type: String,
            required: true
        },
        comment: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
)

const admissionSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        username: {
            type: String,
            required: true
        },
        college: {
            type: String,
            required: true
        },
        year: {
            type: Number,
            required: true
        },
        semester: {
            type: String,
            required: true
        },
        degree: {
            type: String,
            required: true
        },
        program: {
            type: String,
            required: true
        },
        result: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: false
        },
        comments: [
            commentSchema
        ]
    },
    {
        timestamps: true
    }
)

const Admission = mongoose.model('Admission', admissionSchema);

export default Admission;