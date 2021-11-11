import mongoose from 'mongoose';

const collegeSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        longitude: {
            type: String,
            required: true
        },
        latitude: {
            type: String,
            required: true
        },
        in_state_tuition: {
            type: Number,
            required: true
        },
        out_of_state_tuition: {
            type: Number,
            required: true
        },
        website: {
            type: String,
            required: true
        },
        ranking: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    }
)

const College = mongoose.model('College', collegeSchema);

export default College;