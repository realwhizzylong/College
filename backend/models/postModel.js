import mongoose from "mongoose";

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

const postSchema = mongoose.Schema(
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
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        comments: [
            commentSchema
        ]
    },
    {
        timestamps: true
    }
)

const Post = mongoose.model('Post', postSchema);

export default Post;